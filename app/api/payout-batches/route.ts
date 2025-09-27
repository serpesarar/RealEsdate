import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyId, periodStart, periodEnd, batchName, notes } = body

    // Validate required fields
    if (!propertyId || !periodStart || !periodEnd || !batchName) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, periodStart, periodEnd, batchName" },
        { status: 400 },
      )
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get approved work logs and expenses for the period
    const { data: workLogs, error: workLogsError } = await supabase
      .from("work_logs")
      .select(`
        id,
        handyman_id,
        hours_worked,
        description,
        work_date,
        handyman_assignments!inner(hourly_rate, payment_type, monthly_salary)
      `)
      .eq("property_id", propertyId)
      .eq("status", "approved")
      .gte("work_date", periodStart)
      .lte("work_date", periodEnd)
      .is("payout_batch_items.batch_id", null) // Not already in a batch

    if (workLogsError) {
      console.error("[v0] Error fetching work logs:", workLogsError)
      return NextResponse.json({ error: "Failed to fetch work logs" }, { status: 500 })
    }

    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("id, handyman_id, amount, description, expense_date")
      .eq("property_id", propertyId)
      .eq("status", "approved")
      .gte("expense_date", periodStart)
      .lte("expense_date", periodEnd)
      .is("payout_batch_items.batch_id", null) // Not already in a batch

    if (expensesError) {
      console.error("[v0] Error fetching expenses:", expensesError)
      return NextResponse.json({ error: "Failed to fetch expenses" }, { status: 500 })
    }

    // Calculate total amount
    let totalAmount = 0
    const batchItems = []

    // Process work logs
    for (const log of workLogs || []) {
      const assignment = log.handyman_assignments
      let amount = 0

      if (assignment.payment_type === "hourly") {
        amount = log.hours_worked * assignment.hourly_rate
      }
      // For salary, we don't add work log amounts to batch (salary is fixed monthly)

      if (amount > 0) {
        totalAmount += amount
        batchItems.push({
          handyman_id: log.handyman_id,
          item_type: "work_log",
          work_log_id: log.id,
          amount,
          description: `Work log: ${log.description} (${log.hours_worked}h on ${log.work_date})`,
        })
      }
    }

    // Process expenses
    for (const expense of expenses || []) {
      totalAmount += expense.amount
      batchItems.push({
        handyman_id: expense.handyman_id,
        item_type: "expense",
        expense_id: expense.id,
        amount: expense.amount,
        description: `Expense: ${expense.description} (${expense.expense_date})`,
      })
    }

    // Create payout batch
    const { data: batch, error: batchError } = await supabase
      .from("payout_batches")
      .insert({
        property_id: propertyId,
        batch_name: batchName,
        period_start: periodStart,
        period_end: periodEnd,
        total_amount: totalAmount,
        status: "draft",
        created_by: user.id,
        notes,
      })
      .select()
      .single()

    if (batchError) {
      console.error("[v0] Error creating payout batch:", batchError)
      return NextResponse.json({ error: "Failed to create payout batch" }, { status: 500 })
    }

    // Create batch items
    if (batchItems.length > 0) {
      const itemsWithBatchId = batchItems.map((item) => ({
        ...item,
        batch_id: batch.id,
      }))

      const { error: itemsError } = await supabase.from("payout_batch_items").insert(itemsWithBatchId)

      if (itemsError) {
        console.error("[v0] Error creating batch items:", itemsError)
        return NextResponse.json({ error: "Failed to create batch items" }, { status: 500 })
      }
    }

    return NextResponse.json({
      success: true,
      batch: {
        ...batch,
        items_count: batchItems.length,
      },
      message: "Payout batch created successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating payout batch:", error)
    return NextResponse.json({ error: "Failed to create payout batch" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")
    const status = searchParams.get("status")

    if (!propertyId) {
      return NextResponse.json({ error: "Missing propertyId parameter" }, { status: 400 })
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = supabase
      .from("payout_batches")
      .select(`
        id,
        batch_name,
        period_start,
        period_end,
        total_amount,
        status,
        created_at,
        approved_at,
        paid_at,
        notes,
        created_by,
        approved_by,
        profiles!payout_batches_created_by_fkey(full_name),
        payout_batch_items(count)
      `)
      .eq("property_id", propertyId)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: batches, error: batchesError } = await query

    if (batchesError) {
      console.error("[v0] Error fetching payout batches:", batchesError)
      return NextResponse.json({ error: "Failed to fetch payout batches" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      batches: batches || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching payout batches:", error)
    return NextResponse.json({ error: "Failed to fetch payout batches" }, { status: 500 })
  }
}
