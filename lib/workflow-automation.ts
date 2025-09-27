export interface WorkflowTrigger {
  type: "issue_reported" | "job_completed" | "payment_due" | "lease_expiring" | "high_cost" | "emergency"
  data: any
}

export interface WorkflowAction {
  type: "assign_job" | "send_invoice" | "send_reminder" | "start_renewal" | "request_approval" | "escalate"
  params: any
}

export class WorkflowEngine {
  private static workflows: Record<string, WorkflowAction[]> = {
    issue_reported: [{ type: "assign_job", params: { useAI: true } }],
    job_completed: [{ type: "send_invoice", params: { autoGenerate: true } }],
    payment_due: [{ type: "send_reminder", params: { template: "payment_reminder" } }],
    lease_expiring: [{ type: "start_renewal", params: { daysBeforeExpiry: 60 } }],
    high_cost: [{ type: "request_approval", params: { threshold: 1000 } }],
    emergency: [{ type: "escalate", params: { priority: "immediate" } }],
  }

  static async processTrigger(trigger: WorkflowTrigger): Promise<void> {
    const actions = this.workflows[trigger.type]
    if (!actions) return

    for (const action of actions) {
      await this.executeAction(action, trigger.data)
    }
  }

  private static async executeAction(action: WorkflowAction, data: any): Promise<void> {
    switch (action.type) {
      case "assign_job":
        await this.assignJob(data, action.params)
        break
      case "send_invoice":
        await this.sendInvoice(data, action.params)
        break
      case "send_reminder":
        await this.sendReminder(data, action.params)
        break
      case "start_renewal":
        await this.startRenewal(data, action.params)
        break
      case "request_approval":
        await this.requestApproval(data, action.params)
        break
      case "escalate":
        await this.escalateIssue(data, action.params)
        break
    }
  }

  private static async assignJob(data: any, params: any): Promise<void> {
    console.log("[v0] Auto-assigning job:", data.jobId)
    // Integration with AI job router
  }

  private static async sendInvoice(data: any, params: any): Promise<void> {
    console.log("[v0] Auto-generating invoice for job:", data.jobId)
    // Auto-invoice generation
  }

  private static async sendReminder(data: any, params: any): Promise<void> {
    console.log("[v0] Sending payment reminder to tenant:", data.tenantId)
    // Payment reminder system
  }

  private static async startRenewal(data: any, params: any): Promise<void> {
    console.log("[v0] Starting lease renewal process for:", data.leaseId)
    // Lease renewal automation
  }

  private static async requestApproval(data: any, params: any): Promise<void> {
    console.log("[v0] Requesting manager approval for high-cost item:", data.amount)
    // Approval workflow
  }

  private static async escalateIssue(data: any, params: any): Promise<void> {
    console.log("[v0] Escalating emergency issue:", data.issueId)
    // Emergency escalation
  }
}

export class NotificationRouter {
  static async routeNotification(userId: string, userRole: string, notification: any): Promise<void> {
    const routingRules: Record<string, string[]> = {
      owner: ["financial_alerts", "property_performance", "major_issues"],
      manager: ["all_issues", "staff_updates", "tenant_requests"],
      tenant: ["maintenance_updates", "payment_reminders", "building_notices"],
      handyman: ["job_assignments", "schedule_changes", "material_requests"],
      accountant: ["payment_updates", "invoice_approvals", "financial_reports"],
    }

    const allowedTypes = routingRules[userRole] || []

    if (allowedTypes.includes(notification.type) || allowedTypes.includes("all_issues")) {
      await this.sendNotification(userId, notification)
    }
  }

  private static async sendNotification(userId: string, notification: any): Promise<void> {
    console.log(`[v0] Sending ${notification.type} notification to user ${userId}`)
    // WebSocket notification delivery
  }
}
