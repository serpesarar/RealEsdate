import { type NextRequest, NextResponse } from "next/server"
import { screeningService, type ApplicantData } from "@/lib/screening-api"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicantData, packageType } = body

    // Validate required fields
    if (!applicantData || !packageType) {
      return NextResponse.json({ error: "Missing required fields: applicantData and packageType" }, { status: 400 })
    }

    // Validate applicant data
    const requiredFields = ["firstName", "lastName", "email", "ssn", "dateOfBirth"]
    for (const field of requiredFields) {
      if (!applicantData[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Initiate screening
    const screeningId = await screeningService.initiateScreening(applicantData as ApplicantData, packageType)

    return NextResponse.json({
      success: true,
      screeningId,
      message: "Screening initiated successfully",
    })
  } catch (error) {
    console.error("Error in screening initiation API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
