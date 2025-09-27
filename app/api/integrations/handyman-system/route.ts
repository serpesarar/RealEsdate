import { type NextRequest, NextResponse } from "next/server"
import { CrossSystemIntegrationService } from "@/lib/cross-system-integration"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log("[v0] Received handyman system event:", event)

    switch (event) {
      case "maintenance_approved":
        await CrossSystemIntegrationService.onMaintenanceApproved(data)
        break
      case "job_completed":
        await CrossSystemIntegrationService.onHandymanJobCompleted(data)
        break
      case "expense_submitted":
        await CrossSystemIntegrationService.onHandymanExpenseSubmitted(data)
        break
      case "rating_updated":
        await CrossSystemIntegrationService.onHandymanRatingUpdated(data)
        break
      default:
        return NextResponse.json({ error: "Unknown event type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Handyman system event '${event}' processed successfully`,
    })
  } catch (error) {
    console.error("[v0] Error processing handyman system event:", error)
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 })
  }
}
