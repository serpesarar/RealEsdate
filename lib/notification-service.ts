import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export interface NotificationData {
  userId: string
  title: string
  message: string
  type:
    | "work_log_submitted"
    | "work_log_approved"
    | "work_log_rejected"
    | "expense_submitted"
    | "expense_approved"
    | "expense_rejected"
    | "payout_batch_created"
    | "payout_batch_approved"
    | "payout_paid"
  relatedId?: string
}

export class NotificationService {
  private static async getSupabaseClient() {
    const cookieStore = cookies()
    return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })
  }

  static async createNotification(data: NotificationData): Promise<boolean> {
    try {
      const supabase = await this.getSupabaseClient()

      const { error } = await supabase.from("notifications").insert({
        user_id: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        related_id: data.relatedId,
        read: false,
      })

      if (error) {
        console.error("[v0] Error creating notification:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("[v0] Error in notification service:", error)
      return false
    }
  }

  static async createBulkNotifications(notifications: NotificationData[]): Promise<boolean> {
    try {
      const supabase = await this.getSupabaseClient()

      const notificationRecords = notifications.map((data) => ({
        user_id: data.userId,
        title: data.title,
        message: data.message,
        type: data.type,
        related_id: data.relatedId,
        read: false,
      }))

      const { error } = await supabase.from("notifications").insert(notificationRecords)

      if (error) {
        console.error("[v0] Error creating bulk notifications:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("[v0] Error in bulk notification service:", error)
      return false
    }
  }

  static async notifyWorkLogSubmitted(
    handymanId: string,
    managerId: string,
    workLogId: string,
    description: string,
    hours: number,
  ) {
    return this.createNotification({
      userId: managerId,
      title: "New Work Log Submitted",
      message: `A handyman has submitted a work log for ${hours} hours: ${description}`,
      type: "work_log_submitted",
      relatedId: workLogId,
    })
  }

  static async notifyWorkLogApproved(handymanId: string, workLogId: string, adjustedHours?: number) {
    return this.createNotification({
      userId: handymanId,
      title: "Work Log Approved",
      message: `Your work log has been approved${adjustedHours ? ` with ${adjustedHours} hours` : ""}.`,
      type: "work_log_approved",
      relatedId: workLogId,
    })
  }

  static async notifyWorkLogRejected(handymanId: string, workLogId: string, reason?: string) {
    return this.createNotification({
      userId: handymanId,
      title: "Work Log Rejected",
      message: `Your work log has been rejected. ${reason || ""}`,
      type: "work_log_rejected",
      relatedId: workLogId,
    })
  }

  static async notifyPayoutBatchCreated(handymenIds: string[], batchName: string, batchId: string) {
    const notifications = handymenIds.map((handymanId) => ({
      userId: handymanId,
      title: "Payout Batch Created",
      message: `A new payout batch "${batchName}" has been created with your approved work.`,
      type: "payout_batch_created" as const,
      relatedId: batchId,
    }))

    return this.createBulkNotifications(notifications)
  }

  static async notifyPayoutBatchApproved(handymenIds: string[], batchName: string, batchId: string) {
    const notifications = handymenIds.map((handymanId) => ({
      userId: handymanId,
      title: "Payout Batch Approved",
      message: `Your payout batch "${batchName}" has been approved and will be processed soon.`,
      type: "payout_batch_approved" as const,
      relatedId: batchId,
    }))

    return this.createBulkNotifications(notifications)
  }

  static async notifyPayoutPaid(handymenIds: string[], batchName: string, batchId: string) {
    const notifications = handymenIds.map((handymanId) => ({
      userId: handymanId,
      title: "Payout Processed",
      message: `Your payout batch "${batchName}" has been paid.`,
      type: "payout_paid" as const,
      relatedId: batchId,
    }))

    return this.createBulkNotifications(notifications)
  }
}

export const notificationService = NotificationService

export const workflowService = {
  async createWorkflow(data: any) {
    // Placeholder implementation
    console.log("[v0] Creating workflow:", data)
    return { success: true, workflowId: `workflow_${Date.now()}` }
  },

  async updateWorkflow(workflowId: string, data: any) {
    // Placeholder implementation
    console.log("[v0] Updating workflow:", workflowId, data)
    return { success: true }
  },
}
