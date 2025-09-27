import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { handymanId, date, time, tenant, issue, priority, notes } = body

    // Validate required fields
    if (!handymanId || !date || !time || !tenant || !issue) {
      return NextResponse.json(
        {
          error: "Missing required fields: handymanId, date, time, tenant, issue",
        },
        { status: 400 },
      )
    }

    // Generate booking ID
    const bookingId = `BOOK-${Date.now()}`

    // Mock booking creation - in real app, save to database
    const booking = {
      id: bookingId,
      handymanId,
      date,
      time,
      tenant,
      issue,
      priority: priority || "medium",
      notes: notes || "",
      status: "SCHEDULED",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("[v0] Created new maintenance booking:", booking)

    return NextResponse.json({
      success: true,
      booking,
      message: "Maintenance slot booked successfully",
    })
  } catch (error) {
    console.error("Error creating maintenance booking:", error)
    return NextResponse.json({ error: "Failed to book maintenance slot" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Mock bookings data - in real app, fetch from database
    const bookings = [
      {
        id: "BOOK-1704067200000",
        handymanId: 1,
        date: "2024-01-15",
        time: "10:00",
        tenant: "Sarah Johnson",
        issue: "Kitchen Faucet Leak",
        priority: "high",
        notes: "Urgent repair needed",
        status: "SCHEDULED",
        createdAt: "2024-01-01T10:00:00Z",
        updatedAt: "2024-01-01T10:00:00Z",
      },
    ]

    return NextResponse.json({
      success: true,
      bookings,
    })
  } catch (error) {
    console.error("Error fetching bookings:", error)
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
  }
}
