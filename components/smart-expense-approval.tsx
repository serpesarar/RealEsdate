"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  FileText,
  Eye,
  MessageSquare,
  Zap,
} from "lucide-react"
import { format } from "date-fns"

// Mock expense data with approval workflow
const expenseRequests = [
  {
    id: "EXP-001",
    title: "Kitchen Faucet Replacement Parts",
    amount: 85.5,
    category: "plumbing",
    submittedBy: "Mike Rodriguez",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "auto-approved",
    approvalLevel: "auto",
    description: "Replacement cartridge and O-rings for kitchen faucet repair in Unit 2A",
    receipt: "/receipt-001.jpg",
    workOrder: "MNT-001",
    tenant: "Sarah Johnson",
    property: "Sunset Apartments - Unit 2A",
    approvedBy: "System",
    approvedAt: "2024-01-15T10:30:00Z",
    notes: "Auto-approved: Amount under $100 threshold",
  },
  {
    id: "EXP-002",
    title: "HVAC Repair - Compressor Unit",
    amount: 350.0,
    category: "hvac",
    submittedBy: "Tom Wilson",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "pending-manager",
    approvalLevel: "manager",
    description: "Replacement compressor unit for AC system in Unit 15B",
    receipt: "/receipt-002.jpg",
    workOrder: "MNT-002",
    tenant: "Michael Chen",
    property: "Downtown Lofts - Unit 15B",
    estimatedTotal: 350.0,
    notes: "Requires manager approval: Amount between $100-500",
  },
  {
    id: "EXP-003",
    title: "Electrical Panel Upgrade",
    amount: 750.0,
    category: "electrical",
    submittedBy: "John Smith",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    submittedAt: "2024-01-13T09:15:00Z",
    status: "pending-owner",
    approvalLevel: "owner",
    description: "Complete electrical panel replacement for safety compliance",
    receipt: "/receipt-003.jpg",
    workOrder: "MNT-003",
    tenant: "Emily Rodriguez",
    property: "Garden View Complex - Unit 8C",
    estimatedTotal: 750.0,
    managerApprovedBy: "Jane Manager",
    managerApprovedAt: "2024-01-13T11:30:00Z",
    managerNotes: "Approved by manager, forwarded to owner for final approval",
    notes: "Requires owner approval: Amount over $500",
  },
  {
    id: "EXP-004",
    title: "Plumbing Snake Rental",
    amount: 45.0,
    category: "plumbing",
    submittedBy: "Mike Rodriguez",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    submittedAt: "2024-01-12T16:45:00Z",
    status: "auto-approved",
    approvalLevel: "auto",
    description: "Professional drain snake rental for clogged bathroom drain",
    receipt: "/receipt-004.jpg",
    workOrder: "MNT-004",
    tenant: "David Wilson",
    property: "Riverside Condos - Unit 12A",
    approvedBy: "System",
    approvedAt: "2024-01-12T16:45:00Z",
    notes: "Auto-approved: Amount under $100 threshold",
  },
  {
    id: "EXP-005",
    title: "Door Hardware Replacement",
    amount: 125.0,
    category: "general",
    submittedBy: "Sarah Davis",
    submittedByAvatar: "/placeholder.svg?height=32&width=32",
    submittedAt: "2024-01-11T13:20:00Z",
    status: "approved",
    approvalLevel: "manager",
    description: "New door hinges and lock mechanism for squeaky door",
    receipt: "/receipt-005.jpg",
    workOrder: "MNT-005",
    tenant: "Lisa Thompson",
    property: "Modern Heights - Unit 7D",
    approvedBy: "Jane Manager",
    approvedAt: "2024-01-11T15:30:00Z",
    notes: "Approved by manager: Standard maintenance expense",
  },
]

const approvalStats = {
  totalExpenses: 1355.5,
  autoApproved: 130.5,
  pendingManager: 350.0,
  pendingOwner: 750.0,
  approved: 125.0,
  averageProcessingTime: "1.2 hours",
}

function getStatusColor(status: string) {
  switch (status) {
    case "auto-approved":
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending-manager":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "pending-owner":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "auto-approved":
      return <Zap className="h-4 w-4" />
    case "approved":
      return <CheckCircle className="h-4 w-4" />
    case "pending-manager":
    case "pending-owner":
      return <Clock className="h-4 w-4" />
    case "rejected":
      return <XCircle className="h-4 w-4" />
    default:
      return <AlertTriangle className="h-4 w-4" />
  }
}

function getApprovalLevelColor(level: string) {
  switch (level) {
    case "auto":
      return "bg-blue-100 text-blue-800"
    case "manager":
      return "bg-purple-100 text-purple-800"
    case "owner":
      return "bg-amber-100 text-amber-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

interface SmartExpenseApprovalProps {
  userRole?: "owner" | "manager" | "handyman"
}

export function SmartExpenseApproval({ userRole = "manager" }: SmartExpenseApprovalProps) {
  const [selectedExpense, setSelectedExpense] = useState<any>(null)
  const [approvalNotes, setApprovalNotes] = useState("")

  const handleApprove = (expenseId: string, notes: string) => {
    console.log("Approving expense:", expenseId, notes)
    // Handle approval logic
    setApprovalNotes("")
  }

  const handleReject = (expenseId: string, notes: string) => {
    console.log("Rejecting expense:", expenseId, notes)
    // Handle rejection logic
    setApprovalNotes("")
  }

  const canApprove = (expense: any) => {
    if (userRole === "owner") return true
    if (userRole === "manager" && expense.approvalLevel !== "owner") return true
    return false
  }

  const filteredExpenses = expenseRequests.filter((expense) => {
    if (userRole === "owner") return expense.status === "pending-owner" || expense.approvalLevel === "owner"
    if (userRole === "manager") return expense.status === "pending-manager" || expense.approvalLevel === "manager"
    return true
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Smart Expense Approval</h2>
          <p className="text-muted-foreground">Automated workflow for maintenance expense approvals</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {userRole === "owner" ? "Owner Level" : userRole === "manager" ? "Manager Level" : "View Only"}
        </Badge>
      </div>

      {/* Approval Rules Card */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Zap className="w-5 h-5" />
            Approval Workflow Rules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-green-800">Under $100</div>
                <div className="text-sm text-green-600">Auto-approved</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-yellow-600" />
              </div>
              <div>
                <div className="font-medium text-yellow-800">$100 - $500</div>
                <div className="text-sm text-yellow-600">Manager approval</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-orange-600" />
              </div>
              <div>
                <div className="font-medium text-orange-800">Over $500</div>
                <div className="text-sm text-orange-600">Owner approval</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${approvalStats.totalExpenses}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Auto-Approved</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${approvalStats.autoApproved}</div>
            <p className="text-xs text-muted-foreground">Under $100</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Manager</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">${approvalStats.pendingManager}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Owner</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${approvalStats.pendingOwner}</div>
            <p className="text-xs text-muted-foreground">High value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${approvalStats.approved}</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvalStats.averageProcessingTime}</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Expense Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Requests</CardTitle>
          <CardDescription>
            {userRole === "owner"
              ? "Review high-value expenses requiring owner approval"
              : userRole === "manager"
                ? "Review expenses requiring manager approval"
                : "View all expense requests and their approval status"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList>
              <TabsTrigger value="pending">Pending Approval</TabsTrigger>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <div className="space-y-4">
                {filteredExpenses
                  .filter((exp) => exp.status.includes("pending"))
                  .map((expense) => (
                    <Card key={expense.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-lg">{expense.title}</h3>
                              <Badge variant="outline" className={getStatusColor(expense.status)}>
                                {getStatusIcon(expense.status)}
                                <span className="ml-1 capitalize">{expense.status.replace("-", " ")}</span>
                              </Badge>
                              <Badge variant="outline" className={getApprovalLevelColor(expense.approvalLevel)}>
                                {expense.approvalLevel === "auto"
                                  ? "Auto"
                                  : expense.approvalLevel === "manager"
                                    ? "Manager"
                                    : "Owner"}{" "}
                                Level
                              </Badge>
                            </div>

                            <div className="text-3xl font-bold text-green-600 mb-3">${expense.amount.toFixed(2)}</div>

                            <p className="text-muted-foreground mb-3">{expense.description}</p>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                              <div>
                                <span className="font-medium">Submitted by:</span>
                                <div className="flex items-center gap-2 mt-1">
                                  <Avatar className="w-5 h-5">
                                    <AvatarImage src={expense.submittedByAvatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {expense.submittedBy
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-muted-foreground">{expense.submittedBy}</span>
                                </div>
                              </div>
                              <div>
                                <span className="font-medium">Work Order:</span>
                                <div className="text-muted-foreground">{expense.workOrder}</div>
                              </div>
                              <div>
                                <span className="font-medium">Property:</span>
                                <div className="text-muted-foreground">{expense.property}</div>
                              </div>
                              <div>
                                <span className="font-medium">Submitted:</span>
                                <div className="text-muted-foreground">
                                  {format(new Date(expense.submittedAt), "MMM d, h:mm a")}
                                </div>
                              </div>
                            </div>

                            {expense.managerApprovedBy && (
                              <div className="p-3 bg-green-50 rounded-lg border border-green-200 mb-3">
                                <div className="text-sm">
                                  <span className="font-medium text-green-800">Manager Approved:</span>
                                  <span className="text-green-600 ml-1">{expense.managerApprovedBy}</span>
                                  <span className="text-green-600 ml-2">
                                    {format(new Date(expense.managerApprovedAt!), "MMM d, h:mm a")}
                                  </span>
                                </div>
                                {expense.managerNotes && (
                                  <div className="text-sm text-green-600 mt-1">{expense.managerNotes}</div>
                                )}
                              </div>
                            )}

                            <div className="text-sm text-muted-foreground">
                              <span className="font-medium">Notes:</span> {expense.notes}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 ml-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[600px]">
                                <DialogHeader>
                                  <DialogTitle>Expense Details - {expense.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Amount</Label>
                                      <div className="text-2xl font-bold text-green-600">
                                        ${expense.amount.toFixed(2)}
                                      </div>
                                    </div>
                                    <div>
                                      <Label>Category</Label>
                                      <div className="capitalize">{expense.category}</div>
                                    </div>
                                  </div>
                                  <div>
                                    <Label>Description</Label>
                                    <p className="text-sm text-muted-foreground">{expense.description}</p>
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>Tenant</Label>
                                      <div>{expense.tenant}</div>
                                    </div>
                                    <div>
                                      <Label>Property</Label>
                                      <div>{expense.property}</div>
                                    </div>
                                  </div>
                                  {expense.receipt && (
                                    <div>
                                      <Label>Receipt</Label>
                                      <div className="mt-2">
                                        <Button variant="outline" size="sm">
                                          <FileText className="w-4 h-4 mr-1" />
                                          View Receipt
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>

                            {canApprove(expense) && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm">
                                    <MessageSquare className="w-4 h-4 mr-1" />
                                    Review
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Review Expense - ${expense.amount.toFixed(2)}</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label>Approval Notes</Label>
                                      <Textarea
                                        placeholder="Add notes about this approval decision..."
                                        value={approvalNotes}
                                        onChange={(e) => setApprovalNotes(e.target.value)}
                                        rows={3}
                                      />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                      <Button
                                        variant="outline"
                                        onClick={() => handleReject(expense.id, approvalNotes)}
                                        className="text-red-600 border-red-200 hover:bg-red-50"
                                      >
                                        <XCircle className="w-4 h-4 mr-1" />
                                        Reject
                                      </Button>
                                      <Button
                                        onClick={() => handleApprove(expense.id, approvalNotes)}
                                        className="bg-green-600 hover:bg-green-700"
                                      >
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        Approve
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="space-y-4">
                {expenseRequests.map((expense) => (
                  <Card key={expense.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="font-semibold">{expense.title}</div>
                            <div className="text-sm text-muted-foreground">{expense.submittedBy}</div>
                          </div>
                          <Badge variant="outline" className={getStatusColor(expense.status)}>
                            {getStatusIcon(expense.status)}
                            <span className="ml-1 capitalize">{expense.status.replace("-", " ")}</span>
                          </Badge>
                          <Badge variant="outline" className={getApprovalLevelColor(expense.approvalLevel)}>
                            {expense.approvalLevel === "auto"
                              ? "Auto"
                              : expense.approvalLevel === "manager"
                                ? "Manager"
                                : "Owner"}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold">${expense.amount.toFixed(2)}</div>
                          <div className="text-sm text-muted-foreground">
                            {format(new Date(expense.submittedAt), "MMM d")}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="approved" className="space-y-4">
              <div className="space-y-4">
                {expenseRequests
                  .filter((exp) => exp.status === "approved" || exp.status === "auto-approved")
                  .map((expense) => (
                    <Card key={expense.id} className="hover:shadow-md transition-shadow border-green-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-semibold">{expense.title}</div>
                              <div className="text-sm text-muted-foreground">
                                Approved by {expense.approvedBy} •{" "}
                                {format(new Date(expense.approvedAt!), "MMM d, h:mm a")}
                              </div>
                            </div>
                            <Badge variant="outline" className={getStatusColor(expense.status)}>
                              {getStatusIcon(expense.status)}
                              <span className="ml-1 capitalize">{expense.status.replace("-", " ")}</span>
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">${expense.amount.toFixed(2)}</div>
                            <div className="text-sm text-muted-foreground">{expense.workOrder}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
