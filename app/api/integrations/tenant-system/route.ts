import { type NextRequest, NextResponse } from "next/server"
import { CrossSystemIntegrationService } from "@/lib/cross-system-integration"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, data } = body

    console.log("[v0] Received tenant system event:", event)

    switch (event) {
      case "application_approved":
        await CrossSystemIntegrationService.onTenantApplicationApproved(data)
        break
      case "lease_created":
        await CrossSystemIntegrationService.onLeaseCreated(data)
        break
      case "issue_reported":
        await CrossSystemIntegrationService.onTenantIssueReported(data)
        break
      case "payment_made":
        await CrossSystemIntegrationService.onTenantPaymentMade(data)
        break
      default:
        return NextResponse.json({ error: "Unknown event type" }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Tenant system event '${event}' processed successfully`,
    })
  } catch (error) {
    console.error("[v0] Error processing tenant system event:", error)
    return NextResponse.json({ error: "Failed to process event" }, { status: 500 })
  }
}
