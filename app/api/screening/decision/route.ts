import { type NextRequest, NextResponse } from "next/server"
import { screeningService, type ApplicantData } from "@/lib/screening-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { screeningId, decision, applicantData } = body

    // Validate required fields
    if (!screeningId || !decision || !applicantData) {
      return NextResponse.json(
        { error: "Missing required fields: screeningId, decision, and applicantData" },
        { status: 400 },
      )
    }

    // Validate decision type
    if (!["approve", "deny", "conditional"].includes(decision)) {
      return NextResponse.json(
        { error: "Invalid decision type. Must be approve, deny, or conditional" },
        { status: 400 },
      )
    }

    // Process the decision
    await screeningService.processScreeningDecision(screeningId, decision, applicantData as ApplicantData)

    return NextResponse.json({
      success: true,
      message: `Screening decision processed: ${decision}`,
    })
  } catch (error) {
    console.error("Error processing screening decision:", error)
    return NextResponse.json({ error: "Failed to process screening decision" }, { status: 500 })
  }
}
