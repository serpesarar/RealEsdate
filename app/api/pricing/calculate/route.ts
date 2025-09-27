import { type NextRequest, NextResponse } from "next/server"
import { pricingService } from "@/lib/pricing-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { packageId, monthlyVolume, paymentOption, customPricing } = body

    // Validate required fields
    if (!packageId || !monthlyVolume || !paymentOption) {
      return NextResponse.json(
        { error: "Missing required fields: packageId, monthlyVolume, and paymentOption" },
        { status: 400 },
      )
    }

    // Calculate screening cost
    const cost = pricingService.calculateScreeningCost(packageId, monthlyVolume, paymentOption, customPricing)

    return NextResponse.json({
      success: true,
      cost,
    })
  } catch (error) {
    console.error("Error calculating pricing:", error)
    return NextResponse.json({ error: "Failed to calculate pricing" }, { status: 500 })
  }
}
