import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest, { params }: { params: { batchId: string } }) {
  try {
    const { batchId } = params

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

    // Get batch details with items
    const { data: batch, error: batchError } = await supabase
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
        payout_batch_items(
          id,
          item_type,
          amount,
          description,
          handyman_id,
          profiles!payout_batch_items_handyman_id_fkey(full_name, email)
        )
      `)
      .eq("id", batchId)
      .single()

    if (batchError) {
      console.error("[v0] Error fetching batch details:", batchError)
      return NextResponse.json({ error: "Batch not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      batch,
    })
  } catch (error) {
    console.error("[v0] Error fetching batch details:", error)
    return NextResponse.json({ error: "Failed to fetch batch details" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { batchId: string } }) {
  try {
    const { batchId } = params
    const body = await request.json()
    const { action, notes } = body

    if (!action || !["approve", "reject", "mark_paid"].includes(action)) {
      return NextResponse.json(
        { error: "Invalid action. Must be 'approve', 'reject', or 'mark_paid'" },
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

    let updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (action === "approve") {
      updateData = {
        ...updateData,
        status: "approved",
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      }
    } else if (action === "reject") {
      updateData = {
        ...updateData,
        status: "cancelled",
      }
    } else if (action === "mark_paid") {
      updateData = {
        ...updateData,
        status: "paid",
        paid_at: new Date().toISOString(),
      }
    }

    if (notes) {
      updateData.notes = notes
    }

    const { data: batch, error: updateError } = await supabase
      .from("payout_batches")
      .update(updateData)
      .eq("id", batchId)
      .select()
      .single()

    if (updateError) {
      console.error("[v0] Error updating batch:", updateError)
      return NextResponse.json({ error: "Failed to update batch" }, { status: 500 })
    }

    // Create notifications for handymen in this batch
    if (action === "approve" || action === "mark_paid") {
      const { data: batchItems } = await supabase
        .from("payout_batch_items")
        .select("handyman_id")
        .eq("batch_id", batchId)

      if (batchItems && batchItems.length > 0) {
        const uniqueHandymen = [...new Set(batchItems.map((item) => item.handyman_id))]

        const notifications = uniqueHandymen.map((handymanId) => ({
          user_id: handymanId,
          title: action === "approve" ? "Payout Batch Approved" : "Payout Processed",
          message:
            action === "approve"
              ? `Your payout batch "${batch.batch_name}" has been approved and will be processed soon.`
              : `Your payout batch "${batch.batch_name}" has been paid.`,
          type: action === "approve" ? "payout_batch_approved" : "payout_paid",
          related_id: batchId,
        }))

        await supabase.from("notifications").insert(notifications)
      }
    }

    return NextResponse.json({
      success: true,
      batch,
      message: `Batch ${action}d successfully`,
    })
  } catch (error) {
    console.error("[v0] Error updating batch:", error)
    return NextResponse.json({ error: "Failed to update batch" }, { status: 500 })
  }
}
