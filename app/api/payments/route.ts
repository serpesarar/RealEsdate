import { type NextRequest, NextResponse } from "next/server"
import { platformBillingService } from "@/lib/platform-services"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, description, tenantId, propertyId, paymentType, paymentMethodId } = body

    // Validate required fields
    if (!amount || !description || !tenantId) {
      return NextResponse.json({ error: "Missing required fields: amount, description, and tenantId" }, { status: 400 })
    }

    // Process payment using platform billing service
    const paymentResult = await platformBillingService.chargeOwner(tenantId, amount, description, {
      propertyId,
      paymentType,
      paymentMethodId,
    })

    if (!paymentResult.success) {
      return NextResponse.json({ error: paymentResult.error || "Payment failed" }, { status: 400 })
    }

    // Record transaction
    const transactionId = await platformBillingService.recordTransaction({
      ownerId: tenantId,
      type: paymentType || "rent",
      amount,
      status: "completed",
      chargeId: paymentResult.chargeId!,
      propertyId,
      completedAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      transactionId,
      chargeId: paymentResult.chargeId,
      message: "Payment processed successfully",
    })
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Failed to process payment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tenantId = searchParams.get("tenantId")

    if (!tenantId) {
      return NextResponse.json({ error: "Missing tenantId parameter" }, { status: 400 })
    }

    // Mock payment history - in real app would query database
    const paymentHistory = [
      {
        id: "tx_001",
        date: "2024-12-01",
        amount: 1850,
        status: "completed",
        type: "rent",
        method: "•••• 4242",
        chargeId: "ch_123456789",
      },
      {
        id: "tx_002",
        date: "2024-11-01",
        amount: 1850,
        status: "completed",
        type: "rent",
        method: "•••• 4242",
        chargeId: "ch_987654321",
      },
      {
        id: "tx_003",
        date: "2024-10-01",
        amount: 1850,
        status: "completed",
        type: "rent",
        method: "•••• 4242",
        chargeId: "ch_456789123",
      },
    ]

    return NextResponse.json({
      success: true,
      payments: paymentHistory,
    })
  } catch (error) {
    console.error("Error fetching payment history:", error)
    return NextResponse.json({ error: "Failed to fetch payment history" }, { status: 500 })
  }
}
