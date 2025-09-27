import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export interface AuditLogData {
  tableName: string
  recordId: string
  action: "INSERT" | "UPDATE" | "DELETE"
  oldValues?: Record<string, any>
  newValues?: Record<string, any>
  userId?: string
}

export class AuditService {
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

  static async logAction(data: AuditLogData): Promise<boolean> {
    try {
      const supabase = await this.getSupabaseClient()

      // Get current user if not provided
      let userId = data.userId
      if (!userId) {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        userId = user?.id
      }

      const { error } = await supabase.from("audit_logs").insert({
        table_name: data.tableName,
        record_id: data.recordId,
        action: data.action,
        old_values: data.oldValues || null,
        new_values: data.newValues || null,
        user_id: userId,
      })

      if (error) {
        console.error("[v0] Error creating audit log:", error)
        return false
      }

      return true
    } catch (error) {
      console.error("[v0] Error in audit service:", error)
      return false
    }
  }

  static async logWorkLogUpdate(workLogId: string, oldValues: any, newValues: any, userId?: string) {
    return this.logAction({
      tableName: "work_logs",
      recordId: workLogId,
      action: "UPDATE",
      oldValues,
      newValues,
      userId,
    })
  }

  static async logExpenseUpdate(expenseId: string, oldValues: any, newValues: any, userId?: string) {
    return this.logAction({
      tableName: "expenses",
      recordId: expenseId,
      action: "UPDATE",
      oldValues,
      newValues,
      userId,
    })
  }

  static async logPayoutBatchUpdate(batchId: string, oldValues: any, newValues: any, userId?: string) {
    return this.logAction({
      tableName: "payout_batches",
      recordId: batchId,
      action: "UPDATE",
      oldValues,
      newValues,
      userId,
    })
  }
}
