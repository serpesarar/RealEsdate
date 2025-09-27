import { type NextRequest, NextResponse } from "next/server"
import { workflowService } from "@/lib/notification-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicantId, propertyId, applicantData, propertyData } = body

    // Validate required fields
    if (!applicantId || !propertyId) {
      return NextResponse.json({ error: "Missing required fields: applicantId and propertyId" }, { status: 400 })
    }

    // Create workflow
    const workflow = await workflowService.createScreeningWorkflow(applicantId, propertyId)

    // Send initial consent request
    if (applicantData && propertyData) {
      const { notificationService } = await import("@/lib/notification-service")
      await notificationService.sendConsentRequest(applicantData, propertyData)

      // Update workflow step
      await workflowService.updateWorkflowStep(workflow.id, "consent_request", "completed", {
        applicant: applicantData,
        property: propertyData,
      })
    }

    return NextResponse.json({
      success: true,
      workflow,
      message: "Screening workflow created and consent request sent",
    })
  } catch (error) {
    console.error("Error creating workflow:", error)
    return NextResponse.json({ error: "Failed to create workflow" }, { status: 500 })
  }
}
