import { type NextRequest, NextResponse } from "next/server"
import { platformBillingService, platformAPIService, PLATFORM_SERVICES } from "@/lib/platform-services"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicantData, packageType, ownerId, propertyId } = body

    // Validate required fields
    if (!applicantData || !packageType || !ownerId) {
      return NextResponse.json(
        {
          error: "Missing required fields: applicantData, packageType, and ownerId",
        },
        { status: 400 },
      )
    }

    console.log("[v0] Checking platform service status...")
    const serviceStatus = await platformBillingService.checkServiceStatus()
    console.log("[v0] Platform services status:", serviceStatus)

    // Step 1: Check if owner has valid payment method
    const paymentMethod = await platformBillingService.getOwnerPaymentMethod(ownerId)
    if (!paymentMethod) {
      return NextResponse.json(
        {
          error: "Please add a payment method before running background checks",
          requiresPaymentSetup: true,
        },
        { status: 402 },
      )
    }

    // Step 2: Get service price based on package type
    let servicePrice = 0
    const serviceType: keyof typeof PLATFORM_SERVICES.screening = "transUnion"

    switch (packageType) {
      case "basic":
        servicePrice = 25
        break
      case "standard":
        servicePrice = 40
        break
      case "premium":
        servicePrice = 65
        break
      default:
        return NextResponse.json({ error: "Invalid package type" }, { status: 400 })
    }

    // Step 3: Show confirmation (in real app, this would be handled on frontend)
    const confirmed = await platformBillingService.showConfirmationModal({
      title: "Confirm Background Check",
      message: `This will charge $${servicePrice} to your ${paymentMethod.brand} ending in ${paymentMethod.last4}`,
      applicant: `${applicantData.firstName} ${applicantData.lastName}`,
      service: packageType,
    })

    if (!confirmed) {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 400 })
    }

    // Step 4: Charge the owner's card using platform Stripe account
    console.log("[v0] Processing payment through platform...")
    const chargeResult = await platformBillingService.chargeOwner(
      ownerId,
      servicePrice,
      `Background check for ${applicantData.firstName} ${applicantData.lastName}`,
      {
        propertyId,
        applicantId: applicantData.id,
        serviceType: "background_check",
        packageType,
      },
    )

    if (!chargeResult.success) {
      return NextResponse.json(
        {
          error: chargeResult.error || "Payment failed",
        },
        { status: 402 },
      )
    }

    console.log("[v0] Payment successful, initiating screening with platform APIs...")

    const screeningResults: any = {}

    if (packageType === "basic" || packageType === "standard" || packageType === "premium") {
      // Call TransUnion API using platform credentials
      screeningResults.backgroundCheck = await platformAPIService.callTransUnionAPI(applicantData)
    }

    if (packageType === "standard" || packageType === "premium") {
      // Call Jumio API for ID verification
      screeningResults.idVerification = await platformAPIService.callJumioAPI(applicantData)
    }

    if (packageType === "premium") {
      // Call Plaid API for income verification
      screeningResults.incomeVerification = await platformAPIService.callPlaidAPI(applicantData)
    }

    // Step 6: Create screening record with results
    const screeningId = `scr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log("[v0] Screening completed successfully:", {
      screeningId,
      results: screeningResults,
    })

    // Step 7: Record transaction for billing history
    const transactionId = await platformBillingService.recordTransaction({
      ownerId,
      type: "background_check",
      amount: servicePrice,
      status: "completed",
      chargeId: chargeResult.chargeId!,
      propertyId,
      applicantId: applicantData.id,
      completedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      screeningId,
      transactionId,
      chargeId: chargeResult.chargeId,
      results: screeningResults,
      message: "Screening completed successfully using platform services",
      platformStatus: {
        transUnion: PLATFORM_SERVICES.screening.transUnion.status,
        jumio: PLATFORM_SERVICES.screening.jumio.status,
        plaid: PLATFORM_SERVICES.screening.plaid.status,
        stripe: PLATFORM_SERVICES.payments.stripe.status,
      },
    })
  } catch (error) {
    console.error("Error in screening with payment API:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
