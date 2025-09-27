import { type NextRequest, NextResponse } from "next/server"
import { notificationService, type NotificationData } from "@/lib/notification-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const notificationData: NotificationData = body

    // Validate required fields
    if (!notificationData.to || !notificationData.template || !notificationData.variables) {
      return NextResponse.json({ error: "Missing required fields: to, template, and variables" }, { status: 400 })
    }

    // Send notification
    const success = await notificationService.sendNotification(notificationData)

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Notification sent successfully",
      })
    } else {
      return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
