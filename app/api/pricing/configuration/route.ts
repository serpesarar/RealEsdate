import { type NextRequest, NextResponse } from "next/server"
import { pricingService, type PricingConfiguration } from "@/lib/pricing-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const propertyId = searchParams.get("propertyId")

    if (!propertyId) {
      return NextResponse.json({ error: "Property ID is required" }, { status: 400 })
    }

    const configuration = await pricingService.getPricingConfiguration(propertyId)

    return NextResponse.json({
      success: true,
      configuration,
    })
  } catch (error) {
    console.error("Error fetching pricing configuration:", error)
    return NextResponse.json({ error: "Failed to fetch pricing configuration" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const configuration: PricingConfiguration = body

    // Validate required fields
    if (!configuration.propertyId || !configuration.paymentOption || !configuration.volumeTier) {
      return NextResponse.json(
        { error: "Missing required fields: propertyId, paymentOption, and volumeTier" },
        { status: 400 },
      )
    }

    const success = await pricingService.savePricingConfiguration(configuration)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Pricing configuration saved successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to save pricing configuration" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error saving pricing configuration:", error)
    return NextResponse.json({ error: "Failed to save pricing configuration" }, { status: 500 })
  }
}
