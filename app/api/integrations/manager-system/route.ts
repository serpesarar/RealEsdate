import { type NextRequest, NextResponse } from "next/server"
import { CrossSystemIntegrationService } from "@/lib/cross-system-integration"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log("[v0] Received manager system event:", event)

    switch (event) {
      case "property_assigned":
        await CrossSystemIntegrationService.onPropertyAssignedToManager(data)
        break
      case "action_taken":
        await CrossSystemIntegrationService.onManagerActionTaken(data)
        break
      case "financial_report":
        await CrossSystemIntegrationService.onManagerFinancialReport(data)
        break
      case "override_requested":
        await CrossSystemIntegrationService.onOwnerOverrideRequested(data)
        break
      default:
        return NextResponse.json({ error: "Unknown event type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Manager system event '${event}' processed successfully`,
    })
  } catch (error) {
    console.error("[v0] Error processing manager system event:", error)
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 })
  }
}
