"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Eye, FileText } from "lucide-react"
import { format } from "date-fns"

interface AuditLog {
  id: string
  table_name: string
  record_id: string
  action: "INSERT" | "UPDATE" | "DELETE"
  old_values?: Record<string, any>
  new_values?: Record<string, any>
  created_at: string
  profiles?: {
    full_name: string
    email: string
  }
}

interface AuditLogViewerProps {
  tableName?: string
  recordId?: string
}

export function AuditLogViewer({ tableName, recordId }: AuditLogViewerProps) {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null)

  // Filters
  const [filterTable, setFilterTable] = useState(tableName || "work_logs")
  const [filterAction, setFilterAction] = useState("")
  const [filterRecordId, setFilterRecordId] = useState(recordId || "")

  useEffect(() => {
    fetchAuditLogs()
  }, [filterTable, filterAction, filterRecordId])

  const fetchAuditLogs = async () => {
    try {
      const params = new URLSearchParams()
      if (filterTable) params.append("tableName", filterTable)
      if (filterAction) params.append("action", filterAction)
      if (filterRecordId) params.append("recordId", filterRecordId)

      const response = await fetch(`/api/audit-logs?${params.toString()}`)
      const data = await response.json()

      if (data.success) {
        setAuditLogs(data.auditLogs)
      }
    } catch (error) {
      console.error("[v0] Error fetching audit logs:", error)
    } finally {
      setLoading(false)
    }
  }

  const getActionBadge = (action: string) => {
    const actionConfig = {
      INSERT: { label: "Created", variant: "default" as const, color: "text-green-600" },
      UPDATE: { label: "Updated", variant: "secondary" as const, color: "text-blue-600" },
      DELETE: { label: "Deleted", variant: "destructive" as const, color: "text-red-600" },
    }

    const config = actionConfig[action as keyof typeof actionConfig] || actionConfig.UPDATE

    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  const formatTableName = (tableName: string) => {
    return tableName
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const renderValueDiff = (oldValues: any, newValues: any) => {
    if (!oldValues && !newValues) return null

    const allKeys = new Set([...Object.keys(oldValues || {}), ...Object.keys(newValues || {})])

    return (
      <div className="space-y-2">
        {Array.from(allKeys).map((key) => {
          const oldValue = oldValues?.[key]
          const newValue = newValues?.[key]
          const hasChanged = oldValue !== newValue

          if (!hasChanged && oldValue === undefined) return null

          return (
            <div key={key} className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium">{key}:</div>
              <div className={hasChanged ? "text-red-600 line-through" : ""}>
                {oldValue !== undefined ? String(oldValue) : "—"}
              </div>
              <div className={hasChanged ? "text-green-600 font-medium" : ""}>
                {newValue !== undefined ? String(newValue) : "—"}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Audit Logs
          </CardTitle>
          <CardDescription>Track all changes and actions performed in the system</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="filterTable">Table</Label>
              <Select value={filterTable} onValueChange={setFilterTable}>
                <SelectTrigger>
                  <SelectValue placeholder="All tables" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work_logs">Work Logs</SelectItem>
                  <SelectItem value="expenses">Expenses</SelectItem>
                  <SelectItem value="payout_batches">Payout Batches</SelectItem>
                  <SelectItem value="handyman_assignments">Handyman Assignments</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="filterAction">Action</Label>
              <Select value={filterAction} onValueChange={setFilterAction}>
                <SelectTrigger>
                  <SelectValue placeholder="All actions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INSERT">Created</SelectItem>
                  <SelectItem value="UPDATE">Updated</SelectItem>
                  <SelectItem value="DELETE">Deleted</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Label htmlFor="filterRecordId">Record ID</Label>
              <Input
                id="filterRecordId"
                value={filterRecordId}
                onChange={(e) => setFilterRecordId(e.target.value)}
                placeholder="Filter by record ID..."
              />
            </div>
          </div>

          {/* Audit Logs Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Table</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Record ID</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading audit logs...
                    </TableCell>
                  </TableRow>
                ) : auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{format(new Date(log.created_at), "MMM d, yyyy h:mm a")}</TableCell>
                      <TableCell>{formatTableName(log.table_name)}</TableCell>
                      <TableCell>{getActionBadge(log.action)}</TableCell>
                      <TableCell className="font-mono text-xs">{log.record_id.slice(0, 8)}...</TableCell>
                      <TableCell>{log.profiles?.full_name || "System"}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedLog(log)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Audit Log Details</DialogTitle>
                              <DialogDescription>
                                {formatTableName(log.table_name)} • {log.action} •{" "}
                                {format(new Date(log.created_at), "MMM d, yyyy h:mm a")}
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="max-h-96">
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <Label>Record ID</Label>
                                    <p className="font-mono text-sm">{log.record_id}</p>
                                  </div>
                                  <div>
                                    <Label>User</Label>
                                    <p className="text-sm">{log.profiles?.full_name || "System"}</p>
                                  </div>
                                </div>

                                {(log.old_values || log.new_values) && (
                                  <div>
                                    <Label>Changes</Label>
                                    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                                      <div className="grid grid-cols-3 gap-2 text-xs font-medium mb-2 text-muted-foreground">
                                        <div>Field</div>
                                        <div>Old Value</div>
                                        <div>New Value</div>
                                      </div>
                                      {renderValueDiff(log.old_values, log.new_values)}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </ScrollArea>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
