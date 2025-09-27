import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, CreditCard, AlertCircle, CheckCircle, Clock, Search, Download, Plus } from "lucide-react"
import { PaymentDialog } from "@/components/payment-dialog"
import { cn } from "@/lib/utils"

// Mock payment data
const payments = [
  {
    id: "PAY-001",
    tenant: "Sarah Johnson",
    property: "Sunset Apartments - Unit 2A",
    amount: 2500,
    dueDate: "2024-01-01",
    paidDate: "2023-12-28",
    status: "paid",
    method: "Bank Transfer",
    type: "rent",
  },
  {
    id: "PAY-002",
    tenant: "Michael Chen",
    property: "Downtown Lofts - Unit 15B",
    amount: 3200,
    dueDate: "2024-01-01",
    paidDate: null,
    status: "overdue",
    method: null,
    type: "rent",
  },
  {
    id: "PAY-003",
    tenant: "Emily Rodriguez",
    property: "Garden View Complex - Unit 8C",
    amount: 1800,
    dueDate: "2024-01-05",
    paidDate: null,
    status: "pending",
    method: null,
    type: "rent",
  },
  {
    id: "PAY-004",
    tenant: "David Wilson",
    property: "Riverside Condos - Unit 12A",
    amount: 500,
    dueDate: "2023-12-15",
    paidDate: "2023-12-14",
    status: "paid",
    method: "Credit Card",
    type: "deposit",
  },
  {
    id: "PAY-005",
    tenant: "Lisa Thompson",
    property: "Modern Heights - Unit 7D",
    amount: 150,
    dueDate: "2024-01-10",
    paidDate: null,
    status: "pending",
    method: null,
    type: "utilities",
  },
]

const paymentStats = {
  totalCollected: 125400,
  pendingAmount: 8950,
  overdueAmount: 4200,
  collectionRate: 94.2,
}

function getStatusColor(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "paid":
      return <CheckCircle className="h-4 w-4" />
    case "pending":
      return <Clock className="h-4 w-4" />
    case "overdue":
      return <AlertCircle className="h-4 w-4" />
    default:
      return null
  }
}

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track rent payments, deposits, and other charges</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <PaymentDialog>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Record Payment
            </Button>
          </PaymentDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentStats.totalCollected.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Amount</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${paymentStats.pendingAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${paymentStats.overdueAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentStats.collectionRate}%</div>
            <p className="text-xs text-muted-foreground">On-time payments</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View and manage all payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-8" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="rent">Rent</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="utilities">Utilities</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 gap-4 p-4 font-medium text-sm bg-muted/50">
                  <div>Payment ID</div>
                  <div>Tenant</div>
                  <div>Property</div>
                  <div>Amount</div>
                  <div>Due Date</div>
                  <div>Status</div>
                  <div>Actions</div>
                </div>
                {payments.map((payment) => (
                  <div key={payment.id} className="grid grid-cols-7 gap-4 p-4 border-t items-center">
                    <div className="font-mono text-sm">{payment.id}</div>
                    <div>
                      <div className="font-medium">{payment.tenant}</div>
                      <div className="text-sm text-muted-foreground capitalize">{payment.type}</div>
                    </div>
                    <div className="text-sm">{payment.property}</div>
                    <div className="font-medium">${payment.amount.toLocaleString()}</div>
                    <div className="text-sm">
                      {new Date(payment.dueDate).toLocaleDateString()}
                      {payment.paidDate && (
                        <div className="text-xs text-muted-foreground">
                          Paid: {new Date(payment.paidDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    <div>
                      <Badge variant="outline" className={getStatusColor(payment.status)}>
                        {getStatusIcon(payment.status)}
                        <span className="ml-1 capitalize">{payment.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      {payment.status !== "paid" && (
                        <Button variant="outline" size="sm">
                          <CreditCard className="h-4 w-4 mr-1" />
                          Pay
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="calendar">
              <Card className="bg-white/50 dark:bg-slate-800/50">
                <CardHeader>
                  <CardTitle>Payment Calendar</CardTitle>
                  <CardDescription>View payment due dates and history by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="p-2 text-center font-medium text-sm text-muted-foreground">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 6 + 1
                      const isCurrentMonth = day > 0 && day <= 31
                      const hasPayment = isCurrentMonth && [1, 5, 15, 28].includes(day)
                      const isOverdue = isCurrentMonth && [15].includes(day)

                      return (
                        <div
                          key={i}
                          className={cn(
                            "p-2 text-center text-sm border rounded-lg cursor-pointer hover:bg-muted/50",
                            !isCurrentMonth && "text-muted-foreground bg-muted/20",
                            hasPayment && !isOverdue && "bg-green-100 text-green-800 border-green-200",
                            isOverdue && "bg-red-100 text-red-800 border-red-200",
                          )}
                        >
                          {isCurrentMonth ? day : ""}
                          {hasPayment && <div className="w-1 h-1 bg-current rounded-full mx-auto mt-1" />}
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-100 border border-green-200 rounded" />
                      <span>Paid</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-100 border border-red-200 rounded" />
                      <span>Overdue</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
