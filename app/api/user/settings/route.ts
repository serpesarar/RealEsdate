import { type NextRequest, NextResponse } from "next/server"

interface UserSettings {
  profile: {
    name: string
    email: string
    phone: string
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

// Mock user data - in a real app, this would come from a database
let mockUserSettings: UserSettings = {
  profile: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  },
  notifications: {
    email: true,
    sms: true,
    push: false,
  },
}

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: mockUserSettings,
    })
  } catch (error) {
    console.error("[v0] Error fetching user settings:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch user settings" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { profile, notifications } = body

    // Validate required fields
    if (!profile?.name || !profile?.email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 })
    }

    // Update mock data - in a real app, this would update the database
    mockUserSettings = {
      profile: {
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
      },
      notifications: {
        email: notifications?.email ?? true,
        sms: notifications?.sms ?? true,
        push: notifications?.push ?? false,
      },
    }

    return NextResponse.json({
      success: true,
      message: "Settings updated successfully",
      data: mockUserSettings,
    })
  } catch (error) {
    console.error("[v0] Error updating user settings:", error)
    return NextResponse.json({ success: false, error: "Failed to update user settings" }, { status: 500 })
  }
}
