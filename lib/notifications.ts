export interface NotificationConfig {
  channels: ("in_app" | "email" | "sms" | "push" | "desktop")[]
  types: string[]
  smartAlerts?: boolean
}

export const notificationConfigs: Record<string, NotificationConfig> = {
  tenant: {
    channels: ["in_app", "email", "sms"],
    types: ["maintenance_updates", "payment_reminders", "building_alerts"],
  },
  handyman: {
    channels: ["push", "in_app"],
    types: ["new_jobs", "urgent_issues", "delegated_tasks"],
    smartAlerts: true, // Based on location and availability
  },
  manager: {
    channels: ["email", "in_app", "desktop"],
    types: ["escalations", "approvals_needed", "tenant_complaints"],
  },
  owner: {
    channels: ["email", "in_app"],
    types: ["financial_reports", "major_issues", "lease_renewals"],
  },
  accountant: {
    channels: ["email", "in_app"],
    types: ["payment_processed", "expense_reports", "tax_documents"],
  },
}

export class SmartNotificationService {
  static async sendNotification(
    userRole: string,
    type: string,
    message: string,
    priority: "low" | "medium" | "high" = "medium",
    metadata?: any,
  ) {
    const config = notificationConfigs[userRole]
    if (!config || !config.types.includes(type)) return

    // Smart routing based on priority and user preferences
    const channels = this.selectChannels(config, priority, metadata)

    for (const channel of channels) {
      await this.sendToChannel(channel, message, priority, metadata)
    }
  }

  private static selectChannels(config: NotificationConfig, priority: string, metadata?: any): string[] {
    if (priority === "high") {
      return config.channels // Use all available channels for urgent notifications
    }

    if (config.smartAlerts && metadata?.location) {
      // For handymen, consider location and availability
      return ["push", "in_app"]
    }

    return config.channels.slice(0, 2) // Use primary channels for normal notifications
  }

  private static async sendToChannel(channel: string, message: string, priority: string, metadata?: any) {
    console.log(`[v0] Sending ${priority} notification via ${channel}:`, message)

    switch (channel) {
      case "push":
        // Push notification implementation
        break
      case "in_app":
        // In-app notification implementation
        break
      case "email":
        // Email notification implementation
        break
      case "sms":
        // SMS notification implementation
        break
      case "desktop":
        // Desktop notification implementation
        break
    }
  }
}
