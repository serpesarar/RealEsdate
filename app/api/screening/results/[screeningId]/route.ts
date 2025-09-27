import { type NextRequest, NextResponse } from "next/server"
import { screeningService } from "@/lib/screening-api"

export async function GET(request: NextRequest, { params }: { params: { screeningId: string } }) {
  try {
    const { screeningId } = params

    if (!screeningId) {
      return NextResponse.json({ error: "Screening ID is required" }, { status: 400 })
    }

    // Fetch screening results
    const results = await screeningService.getScreeningResults(screeningId)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Error fetching screening results:", error)
    return NextResponse.json({ error: "Failed to fetch screening results" }, { status: 500 })
  }
}
