import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    console.log("[v0] Creating new tenant:", body)

    // Validate required fields
    const { fullName, monthlyRent, propertyId, unitNumber, leaseStartDate, leaseDuration } = body

    if (!fullName || !monthlyRent || !propertyId || !unitNumber || !leaseStartDate || !leaseDuration) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Here you would typically save to database
    // For now, we'll simulate a successful creation
    const newTenant = {
      id: Date.now(), // Generate a temporary ID
      ...body,
      status: "active",
      paymentStatus: "current",
      createdAt: new Date().toISOString(),
    }

    console.log("[v0] Tenant created successfully:", newTenant)

    return NextResponse.json({
      success: true,
      message: "Tenant created successfully",
      tenant: newTenant,
    })
  } catch (error) {
    console.error("[v0] Error creating tenant:", error)
    return NextResponse.json({ error: "Failed to create tenant" }, { status: 500 })
  }
}

export async function GET() {
  try {
    // Here you would typically fetch from database
    // For now, return empty array or mock data
    const tenants = []

    return NextResponse.json({
      success: true,
      tenants,
    })
  } catch (error) {
    console.error("[v0] Error fetching tenants:", error)
    return NextResponse.json({ error: "Failed to fetch tenants" }, { status: 500 })
  }
}
