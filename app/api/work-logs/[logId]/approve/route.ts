import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(request: NextRequest, { params }: { params: { logId: string } }) {
  try {
    const { logId } = params
    const body = await request.json()
    const { action, reviewNotes, adjustedHours } = body

    if (!action || !["approve", "reject"].includes(action)) {
      return NextResponse.json({ error: "Invalid action. Must be 'approve' or 'reject'" }, { status: 400 })
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

    // Get the work log to check current status
    const { data: workLog, error: fetchError } = await supabase
      .from("work_logs")
      .select("id, handyman_id, status, hours_worked")
      .eq("id", logId)
      .single()

    if (fetchError || !workLog) {
      return NextResponse.json({ error: "Work log not found" }, { status: 404 })
    }

    if (workLog.status !== "pending") {
      return NextResponse.json({ error: "Work log has already been reviewed" }, { status: 400 })
    }

    // Update work log
    const updateData: any = {
      status: action === "approve" ? "approved" : "rejected",
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
      review_notes: reviewNotes,
      updated_at: new Date().toISOString(),
    }

    // If approving with adjusted hours
    if (action === "approve" && adjustedHours && adjustedHours !== workLog.hours_worked) {
      updateData.hours_worked = adjustedHours
    }

    const { data: updatedLog, error: updateError } = await supabase
      .from("work_logs")
      .update(updateData)
      .eq("id", logId)
      .select()
      .single()

    if (updateError) {
      console.error("[v0] Error updating work log:", updateError)
      return NextResponse.json({ error: "Failed to update work log" }, { status: 500 })
    }

    // Create notification for handyman
    await supabase.from("notifications").insert({
      user_id: workLog.handyman_id,
      title: `Work Log ${action === "approve" ? "Approved" : "Rejected"}`,
      message:
        action === "approve"
          ? `Your work log has been approved${adjustedHours ? ` with ${adjustedHours} hours` : ""}.`
          : `Your work log has been rejected. ${reviewNotes || ""}`,
      type: action === "approve" ? "work_log_approved" : "work_log_rejected",
      related_id: logId,
    })

    return NextResponse.json({
      success: true,
      workLog: updatedLog,
      message: `Work log ${action}d successfully`,
    })
  } catch (error) {
    console.error("[v0] Error reviewing work log:", error)
    return NextResponse.json({ error: "Failed to review work log" }, { status: 500 })
  }
}
