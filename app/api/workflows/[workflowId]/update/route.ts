import { type NextRequest, NextResponse } from "next/server"
import { workflowService } from "@/lib/notification-service"

export async function POST(request: NextRequest, { params }: { params: { workflowId: string } }) {
  try {
    const { workflowId } = params
    const body = await request.json()
    const { stepId, status, data } = body

    // Validate required fields
    if (!stepId || !status) {
      return NextResponse.json({ error: "Missing required fields: stepId and status" }, { status: 400 })
    }

    // Update workflow step
    await workflowService.updateWorkflowStep(workflowId, stepId, status, data)

    return NextResponse.json({
      success: true,
      message: `Workflow step ${stepId} updated to ${status}`,
    })
  } catch (error) {
    console.error("Error updating workflow:", error)
    return NextResponse.json({ error: "Failed to update workflow" }, { status: 500 })
  }
}
