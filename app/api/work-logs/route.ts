import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { propertyId, assignmentId, workDate, hoursWorked, description, expenses } = body

    // Validate required fields
    if (!propertyId || !assignmentId || !workDate || !hoursWorked || !description) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, assignmentId, workDate, hoursWorked, description" },
        { status: 400 },
      )
    }

    // Validate hours worked
    if (hoursWorked <= 0 || hoursWorked > 24) {
      return NextResponse.json({ error: "Hours worked must be between 0.1 and 24" }, { status: 400 })
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

    // Create work log
    const { data: workLog, error: workLogError } = await supabase
      .from("work_logs")
      .insert({
        handyman_id: user.id,
        property_id: propertyId,
        assignment_id: assignmentId,
        work_date: workDate,
        hours_worked: hoursWorked,
        description,
        status: "pending",
      })
      .select()
      .single()

    if (workLogError) {
      console.error("[v0] Error creating work log:", workLogError)
      return NextResponse.json({ error: "Failed to create work log" }, { status: 500 })
    }

    // Create expenses if provided
    if (expenses && expenses.length > 0) {
      const expenseRecords = expenses.map((expense: any) => ({
        handyman_id: user.id,
        property_id: propertyId,
        work_log_id: workLog.id,
        expense_date: expense.date || workDate,
        amount: expense.amount,
        category: expense.category || "Materials",
        description: expense.description,
        receipt_url: expense.receiptUrl,
        status: "pending",
      }))

      const { error: expensesError } = await supabase.from("expenses").insert(expenseRecords)

      if (expensesError) {
        console.error("[v0] Error creating expenses:", expensesError)
        return NextResponse.json({ error: "Failed to create expenses" }, { status: 500 })
      }
    }

    // Get property manager/owner for notification
    const { data: property } = await supabase
      .from("properties")
      .select("manager_id, owner_id")
      .eq("id", propertyId)
      .single()

    if (property) {
      const notificationRecipient = property.manager_id || property.owner_id
      if (notificationRecipient) {
        await supabase.from("notifications").insert({
          user_id: notificationRecipient,
          title: "New Work Log Submitted",
          message: `A handyman has submitted a work log for ${hoursWorked} hours: ${description}`,
          type: "work_log_submitted",
          related_id: workLog.id,
        })
      }
    }

    return NextResponse.json({
      success: true,
      workLog,
      message: "Work log submitted successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating work log:", error)
    return NextResponse.json({ error: "Failed to create work log" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")
    const handymanId = searchParams.get("handymanId")
    const status = searchParams.get("status")

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
      .from("work_logs")
      .select(`
        id,
        work_date,
        hours_worked,
        description,
        status,
        review_notes,
        created_at,
        reviewed_at,
        handyman_id,
        property_id,
        profiles!work_logs_handyman_id_fkey(full_name, email),
        properties(name, address),
        expenses(id, amount, category, description, receipt_url, status)
      `)
      .order("created_at", { ascending: false })

    if (propertyId) {
      query = query.eq("property_id", propertyId)
    }

    if (handymanId) {
      query = query.eq("handyman_id", handymanId)
    }

    if (status) {
      query = query.eq("status", status)
    }

    const { data: workLogs, error: workLogsError } = await query

    if (workLogsError) {
      console.error("[v0] Error fetching work logs:", workLogsError)
      return NextResponse.json({ error: "Failed to fetch work logs" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      workLogs: workLogs || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching work logs:", error)
    return NextResponse.json({ error: "Failed to fetch work logs" }, { status: 500 })
  }
}
