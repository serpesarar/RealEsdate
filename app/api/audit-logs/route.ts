import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const tableName = searchParams.get("tableName")
    const recordId = searchParams.get("recordId")
    const action = searchParams.get("action")
    const limit = Number.parseInt(searchParams.get("limit") || "100")

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let query = supabase
      .from("audit_logs")
      .select(`
        id,
        table_name,
        record_id,
        action,
        old_values,
        new_values,
        created_at,
        profiles!audit_logs_user_id_fkey(full_name, email)
      `)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (tableName) {
      query = query.eq("table_name", tableName)
    }

    if (recordId) {
      query = query.eq("record_id", recordId)
    }

    if (action) {
      query = query.eq("action", action)
    }

    const { data: auditLogs, error: auditLogsError } = await query

    if (auditLogsError) {
      console.error("[v0] Error fetching audit logs:", auditLogsError)
      return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      auditLogs: auditLogs || [],
    })
  } catch (error) {
    console.error("[v0] Error fetching audit logs:", error)
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { tableName, recordId, action, oldValues, newValues } = body

    // Validate required fields
    if (!tableName || !recordId || !action) {
      return NextResponse.json({ error: "Missing required fields: tableName, recordId, action" }, { status: 400 })
    }

    // Create Supabase client
    const cookieStore = cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    })

    // Get current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Create audit log entry
    const { data: auditLog, error: auditLogError } = await supabase
      .from("audit_logs")
      .insert({
        table_name: tableName,
        record_id: recordId,
        action,
        old_values: oldValues || null,
        new_values: newValues || null,
        user_id: user.id,
      })
      .select()
      .single()

    if (auditLogError) {
      console.error("[v0] Error creating audit log:", auditLogError)
      return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      auditLog,
      message: "Audit log created successfully",
    })
  } catch (error) {
    console.error("[v0] Error creating audit log:", error)
    return NextResponse.json({ error: "Failed to create audit log" }, { status: 500 })
  }
}
