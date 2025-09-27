"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, DollarSign, Users, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { format } from "date-fns"

interface PayoutBatch {
  id: string
  batch_name: string
  period_start: string
  period_end: string
  total_amount: number
  status: "draft" | "pending_approval" | "approved" | "paid" | "cancelled"
  created_at: string
  approved_at?: string
  paid_at?: string
  notes?: string
  profiles?: { full_name: string }
  payout_batch_items?: Array<{
    id: string
    item_type: "work_log" | "expense"
    amount: number
    description: string
    profiles: { full_name: string; email: string }
  }>
}

interface PayoutBatchDashboardProps {
  propertyId: string
  userRole: "manager" | "owner"
}

export function PayoutBatchDashboard({ propertyId, userRole }: PayoutBatchDashboardProps) {
  const [batches, setBatches] = useState<PayoutBatch[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedBatch, setSelectedBatch] = useState<PayoutBatch | null>(null)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [createLoading, setCreateLoading] = useState(false)

  // Create batch form state
  const [batchName, setBatchName] = useState("")
  const [periodStart, setPeriodStart] = useState("")
  const [periodEnd, setPeriodEnd] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    fetchBatches()
  }, [propertyId])

  const fetchBatches = async () => {
    try {
      const response = await fetch(`/api/payout-batches?propertyId=${propertyId}`)
      const data = await response.json()

      if (data.success) {
        setBatches(data.batches)
      }
    } catch (error) {
      console.error("[v0] Error fetching batches:", error)
    } finally {
      setLoading(false)
    }
  }

  const createBatch = async () => {
    if (!batchName || !periodStart || !periodEnd) return

    setCreateLoading(true)
    try {
      const response = await fetch("/api/payout-batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyId,
          batchName,
          periodStart,
          periodEnd,
          notes,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setBatches((prev) => [data.batch, ...prev])
        setShowCreateDialog(false)
        setBatchName("")
        setPeriodStart("")
        setPeriodEnd("")
        setNotes("")
      }
    } catch (error) {
      console.error("[v0] Error creating batch:", error)
    } finally {
      setCreateLoading(false)
    }
  }

  const updateBatchStatus = async (batchId: string, action: "approve" | "reject" | "mark_paid") => {
    try {
      const response = await fetch(`/api/payout-batches/${batchId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      const data = await response.json()

      if (data.success) {
        setBatches((prev) => prev.map((batch) => (batch.id === batchId ? data.batch : batch)))
        if (selectedBatch?.id === batchId) {
          setSelectedBatch(data.batch)
        }
      }
    } catch (error) {
      console.error("[v0] Error updating batch:", error)
    }
  }

  const fetchBatchDetails = async (batchId: string) => {
    try {
      const response = await fetch(`/api/payout-batches/${batchId}`)
      const data = await response.json()

      if (data.success) {
        setSelectedBatch(data.batch)
      }
    } catch (error) {
      console.error("[v0] Error fetching batch details:", error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: "Draft", variant: "secondary" as const, icon: AlertCircle },
      pending_approval: { label: "Pending", variant: "default" as const, icon: Clock },
      approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
      paid: { label: "Paid", variant: "default" as const, icon: CheckCircle },
      cancelled: { label: "Cancelled", variant: "destructive" as const, icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    const Icon = config.icon

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    )
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading payout batches...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Payout Batches</h2>
          <p className="text-muted-foreground">Manage handyman payouts and expense reimbursements</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>Create New Batch</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Payout Batch</DialogTitle>
              <DialogDescription>Create a new payout batch for approved work logs and expenses</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="batchName">Batch Name</Label>
                <Input
                  id="batchName"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  placeholder="e.g., December 2024 Payouts"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="periodStart">Period Start</Label>
                  <Input
                    id="periodStart"
                    type="date"
                    value={periodStart}
                    onChange={(e) => setPeriodStart(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="periodEnd">Period End</Label>
                  <Input id="periodEnd" type="date" value={periodEnd} onChange={(e) => setPeriodEnd(e.target.value)} />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes for this batch..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={createBatch} disabled={createLoading}>
                  {createLoading ? "Creating..." : "Create Batch"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {batches.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center py-12">
              <div className="text-center">
                <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No payout batches yet</h3>
                <p className="text-muted-foreground mb-4">Create your first payout batch to get started</p>
                <Button onClick={() => setShowCreateDialog(true)}>Create Batch</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          batches.map((batch) => (
            <Card key={batch.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {batch.batch_name}
                      {getStatusBadge(batch.status)}
                    </CardTitle>
                    <CardDescription>
                      {format(new Date(batch.period_start), "MMM d")} -{" "}
                      {format(new Date(batch.period_end), "MMM d, yyyy")}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold">${batch.total_amount.toFixed(2)}</div>
                    <div className="text-sm text-muted-foreground">
                      Created {format(new Date(batch.created_at), "MMM d, yyyy")}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {batch.payout_batch_items?.length || 0} items
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      {batch.profiles?.full_name || "Unknown"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => fetchBatchDetails(batch.id)}>
                      View Details
                    </Button>
                    {batch.status === "draft" && (
                      <Button size="sm" onClick={() => updateBatchStatus(batch.id, "approve")}>
                        Approve
                      </Button>
                    )}
                    {batch.status === "approved" && (
                      <Button size="sm" onClick={() => updateBatchStatus(batch.id, "mark_paid")}>
                        Mark Paid
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Batch Details Dialog */}
      <Dialog open={!!selectedBatch} onOpenChange={() => setSelectedBatch(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedBatch?.batch_name}
              {selectedBatch && getStatusBadge(selectedBatch.status)}
            </DialogTitle>
            <DialogDescription>Batch details and items breakdown</DialogDescription>
          </DialogHeader>

          {selectedBatch && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Period</Label>
                  <p className="text-sm">
                    {format(new Date(selectedBatch.period_start), "MMM d")} -{" "}
                    {format(new Date(selectedBatch.period_end), "MMM d, yyyy")}
                  </p>
                </div>
                <div>
                  <Label>Total Amount</Label>
                  <p className="text-2xl font-bold">${selectedBatch.total_amount.toFixed(2)}</p>
                </div>
              </div>

              {selectedBatch.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm text-muted-foreground">{selectedBatch.notes}</p>
                </div>
              )}

              <div>
                <Label>Batch Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Handyman</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBatch.payout_batch_items?.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.profiles.full_name}</TableCell>
                        <TableCell>
                          <Badge variant={item.item_type === "work_log" ? "default" : "secondary"}>
                            {item.item_type === "work_log" ? "Work Log" : "Expense"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                        <TableCell className="text-right font-mono">${item.amount.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end gap-2">
                {selectedBatch.status === "draft" && (
                  <>
                    <Button variant="outline" onClick={() => updateBatchStatus(selectedBatch.id, "reject")}>
                      Cancel Batch
                    </Button>
                    <Button onClick={() => updateBatchStatus(selectedBatch.id, "approve")}>Approve Batch</Button>
                  </>
                )}
                {selectedBatch.status === "approved" && (
                  <Button onClick={() => updateBatchStatus(selectedBatch.id, "mark_paid")}>Mark as Paid</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
