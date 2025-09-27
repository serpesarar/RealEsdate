import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wrench, AlertTriangle, Clock, CheckCircle, Search, Filter, Plus, Calendar } from "lucide-react"
import { MaintenanceDialog } from "@/components/maintenance-dialog"
import { MaintenanceSchedulingCalendar } from "@/components/maintenance-scheduling-calendar"
import { SmartExpenseApproval } from "@/components/smart-expense-approval"
import { RatingsReviewSystem } from "@/components/ratings-review-system"
import { MaterialsInventorySystem } from "@/components/materials-inventory-system"
import { cn } from "@/lib/utils"

// Mock maintenance data
const maintenanceRequests = [
  {
    id: "MNT-001",
    title: "Leaking Kitchen Faucet",
    description: "Kitchen faucet has been dripping constantly for the past week",
    tenant: "Sarah Johnson",
    property: "Sunset Apartments - Unit 2A",
    category: "plumbing",
    priority: "medium",
    status: "in-progress",
    createdAt: "2024-01-15",
    assignedTo: "Mike Rodriguez",
    estimatedCost: 150,
    images: ["/modern-kitchen-faucet.png"],
  },
  {
    id: "MNT-002",
    title: "Broken Air Conditioning",
    description: "AC unit not cooling properly, making loud noises",
    tenant: "Michael Chen",
    property: "Downtown Lofts - Unit 15B",
    category: "hvac",
    priority: "high",
    status: "open",
    createdAt: "2024-01-14",
    assignedTo: null,
    estimatedCost: 500,
    images: [],
  },
  {
    id: "MNT-003",
    title: "Bathroom Light Fixture",
    description: "Light fixture in master bathroom is flickering",
    tenant: "Emily Rodriguez",
    property: "Garden View Complex - Unit 8C",
    category: "electrical",
    priority: "low",
    status: "completed",
    createdAt: "2024-01-10",
    assignedTo: "John Smith",
    estimatedCost: 75,
    completedAt: "2024-01-12",
    images: [],
  },
  {
    id: "MNT-004",
    title: "Clogged Bathroom Drain",
    description: "Bathroom sink drain is completely blocked",
    tenant: "David Wilson",
    property: "Riverside Condos - Unit 12A",
    category: "plumbing",
    priority: "high",
    status: "scheduled",
    createdAt: "2024-01-13",
    assignedTo: "Mike Rodriguez",
    scheduledDate: "2024-01-16",
    estimatedCost: 200,
    images: [],
  },
  {
    id: "MNT-005",
    title: "Squeaky Door Hinges",
    description: "Front door hinges need lubrication, very noisy",
    tenant: "Lisa Thompson",
    property: "Modern Heights - Unit 7D",
    category: "general",
    priority: "low",
    status: "open",
    createdAt: "2024-01-12",
    assignedTo: null,
    estimatedCost: 25,
    images: [],
  },
]

const pendingApprovals = [
  {
    id: "APP-001",
    title: "Replace Water Heater",
    property: "Sunset Apartments",
    unit: "2A",
    description: "Water heater is leaking and needs immediate replacement",
    estimatedCost: 1200,
    assignedVendor: "ABC Plumbing Services",
    quote: 1150,
    priority: "high",
    requestedBy: "Sarah Johnson",
    createdAt: "2024-01-15",
  },
  {
    id: "APP-002",
    title: "HVAC System Repair",
    property: "Downtown Lofts",
    unit: "15B",
    description: "AC compressor needs replacement, system not cooling",
    estimatedCost: 800,
    assignedVendor: "Cool Air Solutions",
    quote: 750,
    priority: "high",
    requestedBy: "Michael Chen",
    createdAt: "2024-01-14",
  },
  {
    id: "APP-003",
    title: "Kitchen Cabinet Repair",
    property: "Garden View Complex",
    unit: "8C",
    description: "Cabinet door hinges broken, drawer slides need replacement",
    estimatedCost: 300,
    assignedVendor: "Handyman Plus",
    quote: 275,
    priority: "medium",
    requestedBy: "Emily Rodriguez",
    createdAt: "2024-01-13",
  },
]

const costAnalysisData = {
  monthlyTrends: [
    { month: "Jan", cost: 4500 },
    { month: "Feb", cost: 3200 },
    { month: "Mar", cost: 5800 },
    { month: "Apr", cost: 2900 },
    { month: "May", cost: 4100 },
    { month: "Jun", cost: 3700 },
  ],
  costByCategory: [
    { category: "Plumbing", cost: 8500, percentage: 35 },
    { category: "HVAC", cost: 6200, percentage: 26 },
    { category: "Electrical", cost: 4800, percentage: 20 },
    { category: "General", cost: 4500, percentage: 19 },
  ],
  costByProperty: [
    { property: "Sunset Apartments", cost: 12000, units: 24 },
    { property: "Downtown Lofts", cost: 8500, units: 18 },
    { property: "Garden View Complex", cost: 6200, units: 16 },
    { property: "Riverside Condos", cost: 4300, units: 12 },
  ],
  vendorComparison: [
    { vendor: "ABC Plumbing Services", jobs: 15, avgCost: 425, rating: 4.8 },
    { vendor: "Cool Air Solutions", jobs: 12, avgCost: 650, rating: 4.6 },
    { vendor: "Handyman Plus", jobs: 20, avgCost: 275, rating: 4.7 },
    { vendor: "Elite Electrical", jobs: 8, avgCost: 380, rating: 4.9 },
  ],
}

const maintenanceStats = {
  totalRequests: 45,
  openRequests: 12,
  inProgress: 8,
  completedThisMonth: 25,
  averageResponseTime: "2.3 hours",
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800 border-green-200"
    case "in-progress":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "scheduled":
      return "bg-purple-100 text-purple-800 border-purple-200"
    case "open":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="h-4 w-4" />
    case "in-progress":
      return <Wrench className="h-4 w-4" />
    case "scheduled":
      return <Calendar className="h-4 w-4" />
    case "open":
      return <AlertTriangle className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}

export default function MaintenancePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Maintenance</h1>
          <p className="text-muted-foreground">Manage maintenance requests and work orders</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <MaintenanceDialog>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </MaintenanceDialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceStats.totalRequests}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{maintenanceStats.openRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting assignment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{maintenanceStats.inProgress}</div>
            <p className="text-xs text-muted-foreground">Being worked on</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Awaiting Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingApprovals.length}</div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{maintenanceStats.completedThisMonth}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{maintenanceStats.averageResponseTime}</div>
            <p className="text-xs text-muted-foreground">Response time</p>
          </CardContent>
        </Card>
      </div>

      {/* Approval Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Approval Queue
          </CardTitle>
          <CardDescription>Review and approve maintenance requests requiring authorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApprovals.map((request) => (
              <Card key={request.id} className="border-l-4 border-l-orange-500">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{request.title}</h3>
                        <Badge variant="outline" className={getPriorityColor(request.priority)}>
                          {request.priority}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Property & Unit</div>
                          <div>
                            {request.property} - Unit {request.unit}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground">Requested By</div>
                          <div>{request.requestedBy}</div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{request.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-muted-foreground">Estimated Cost</div>
                          <div className="text-lg font-semibold">${request.estimatedCost}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Assigned Vendor</div>
                          <div>{request.assignedVendor}</div>
                        </div>
                        <div>
                          <div className="font-medium text-muted-foreground">Vendor Quote</div>
                          <div className="text-lg font-semibold text-green-600">${request.quote}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                      <Button variant="destructive" size="sm">
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        Request Info
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="requests" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
          <TabsTrigger value="scheduling">Booking</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="ratings">Ratings</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="space-y-6">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Requests</CardTitle>
              <CardDescription>View and manage all maintenance requests and work orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search requests..." className="pl-8" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Tabs defaultValue="list" className="w-full">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="space-y-4">
                  <div className="space-y-4">
                    {maintenanceRequests.map((request) => (
                      <Card key={request.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{request.title}</h3>
                                <Badge variant="outline" className={getStatusColor(request.status)}>
                                  {getStatusIcon(request.status)}
                                  <span className="ml-1 capitalize">{request.status.replace("-", " ")}</span>
                                </Badge>
                                <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                  <span className="capitalize">{request.priority}</span>
                                </Badge>
                              </div>
                              <p className="text-muted-foreground mb-3">{request.description}</p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                <div>
                                  <span className="font-medium">Tenant:</span>
                                  <div className="text-muted-foreground">{request.tenant}</div>
                                </div>
                                <div>
                                  <span className="font-medium">Property:</span>
                                  <div className="text-muted-foreground">{request.property}</div>
                                </div>
                                <div>
                                  <span className="font-medium">Category:</span>
                                  <div className="text-muted-foreground capitalize">{request.category}</div>
                                </div>
                                <div>
                                  <span className="font-medium">Est. Cost:</span>
                                  <div className="text-muted-foreground">${request.estimatedCost}</div>
                                </div>
                              </div>
                              {request.assignedTo && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Assigned to:</span>
                                  <span className="text-muted-foreground ml-1">{request.assignedTo}</span>
                                </div>
                              )}
                              {request.scheduledDate && (
                                <div className="mt-2 text-sm">
                                  <span className="font-medium">Scheduled:</span>
                                  <span className="text-muted-foreground ml-1">
                                    {new Date(request.scheduledDate).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button variant="outline" size="sm">
                                Update Status
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="kanban">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                      { status: "open", title: "Open", color: "bg-yellow-100 border-yellow-200", count: 5 },
                      { status: "in-progress", title: "In Progress", color: "bg-blue-100 border-blue-200", count: 3 },
                      { status: "scheduled", title: "Scheduled", color: "bg-purple-100 border-purple-200", count: 2 },
                      { status: "completed", title: "Completed", color: "bg-green-100 border-green-200", count: 8 },
                    ].map((column) => (
                      <div key={column.status} className="space-y-4">
                        <div className={cn("p-3 rounded-lg border", column.color)}>
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{column.title}</h3>
                            <Badge variant="secondary">{column.count}</Badge>
                          </div>
                        </div>
                        <div className="space-y-3">
                          {maintenanceRequests
                            .filter((req) => req.status === column.status)
                            .map((request) => (
                              <Card key={request.id} className="p-3 cursor-pointer hover:shadow-md transition-shadow">
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-sm">{request.title}</h4>
                                    <Badge variant="outline" className={getPriorityColor(request.priority)}>
                                      {request.priority}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground line-clamp-2">{request.description}</p>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-muted-foreground">{request.property}</span>
                                    <span className="font-medium">${request.estimatedCost}</span>
                                  </div>
                                  {request.assignedTo && (
                                    <div className="text-xs text-muted-foreground">Assigned: {request.assignedTo}</div>
                                  )}
                                </div>
                              </Card>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Schedule Tab */}
        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
              <CardDescription>
                View scheduled maintenance, preventive maintenance, and inspection schedules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-blue-800">Scheduled Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">8</div>
                      <p className="text-xs text-blue-600">This week</p>
                    </CardContent>
                  </Card>
                  <Card className="border-green-200 bg-green-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-green-800">Preventive Maintenance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <p className="text-xs text-green-600">This month</p>
                    </CardContent>
                  </Card>
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-purple-800">Inspections</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-600">5</div>
                      <p className="text-xs text-purple-600">Due soon</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-4">Calendar View</h3>
                  <div className="grid grid-cols-7 gap-2 mb-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                      <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 35 }, (_, i) => {
                      const day = i - 6 + 1
                      const hasScheduled = [3, 7, 12, 18, 25].includes(day)
                      const hasPreventive = [5, 14, 22, 28].includes(day)
                      const hasInspection = [10, 20].includes(day)

                      return (
                        <div key={i} className="min-h-[80px] border rounded p-1 text-sm">
                          {day > 0 && day <= 31 && (
                            <>
                              <div className="font-medium">{day}</div>
                              {hasScheduled && (
                                <div className="text-xs bg-blue-100 text-blue-800 rounded px-1 mb-1">Scheduled</div>
                              )}
                              {hasPreventive && (
                                <div className="text-xs bg-green-100 text-green-800 rounded px-1 mb-1">Preventive</div>
                              )}
                              {hasInspection && (
                                <div className="text-xs bg-purple-100 text-purple-800 rounded px-1">Inspection</div>
                              )}
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Cost Analysis Tab */}
        <TabsContent value="costs" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Cost Trends</CardTitle>
                <CardDescription>Monthly maintenance costs over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-end justify-between gap-2">
                  {costAnalysisData.monthlyTrends.map((data, index) => (
                    <div key={data.month} className="flex flex-col items-center flex-1">
                      <div
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${(data.cost / 6000) * 250}px` }}
                      />
                      <div className="text-xs font-medium mt-2">{data.month}</div>
                      <div className="text-xs text-muted-foreground">${data.cost}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost by Category</CardTitle>
                  <CardDescription>Breakdown of maintenance costs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costAnalysisData.costByCategory.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{category.category}</span>
                          <span className="font-medium">${category.cost}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${category.percentage}%` }} />
                        </div>
                        <div className="text-xs text-muted-foreground">{category.percentage}% of total</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost by Property</CardTitle>
                  <CardDescription>Maintenance costs per property</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {costAnalysisData.costByProperty.map((property) => (
                      <div key={property.property} className="flex justify-between items-center p-3 border rounded">
                        <div>
                          <div className="font-medium">{property.property}</div>
                          <div className="text-sm text-muted-foreground">{property.units} units</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">${property.cost}</div>
                          <div className="text-sm text-muted-foreground">
                            ${Math.round(property.cost / property.units)}/unit
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Comparison</CardTitle>
                <CardDescription>Performance and cost comparison of maintenance vendors</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Vendor</th>
                        <th className="text-left p-2">Jobs Completed</th>
                        <th className="text-left p-2">Avg Cost</th>
                        <th className="text-left p-2">Rating</th>
                        <th className="text-left p-2">Performance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costAnalysisData.vendorComparison.map((vendor) => (
                        <tr key={vendor.vendor} className="border-b">
                          <td className="p-2 font-medium">{vendor.vendor}</td>
                          <td className="p-2">{vendor.jobs}</td>
                          <td className="p-2">${vendor.avgCost}</td>
                          <td className="p-2">
                            <div className="flex items-center gap-1">
                              <span>{vendor.rating}</span>
                              <div className="flex">
                                {Array.from({ length: 5 }, (_, i) => (
                                  <div
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(vendor.rating) ? "bg-yellow-400" : "bg-gray-200"
                                    } rounded-sm`}
                                  />
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="p-2">
                            <Badge
                              variant={
                                vendor.rating >= 4.7 ? "default" : vendor.rating >= 4.5 ? "secondary" : "outline"
                              }
                            >
                              {vendor.rating >= 4.7 ? "Excellent" : vendor.rating >= 4.5 ? "Good" : "Average"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <MaintenanceSchedulingCalendar
            onBookSlot={(handymanId, date, time, details) => {
              console.log("Booking slot:", { handymanId, date, time, details })
              // Handle booking logic here
            }}
          />
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <SmartExpenseApproval userRole="manager" />
        </TabsContent>

        <TabsContent value="ratings" className="space-y-6">
          <RatingsReviewSystem userRole="manager" />
        </TabsContent>

        <TabsContent value="inventory" className="space-y-6">
          <MaterialsInventorySystem userRole="manager" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
