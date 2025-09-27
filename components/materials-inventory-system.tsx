"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Package,
  AlertTriangle,
  CheckCircle,
  Plus,
  Search,
  Filter,
  ShoppingCart,
  BarChart3,
  Clock,
  DollarSign,
  TrendingUp,
  Eye,
} from "lucide-react"
import { format } from "date-fns"

// Mock inventory data
const inventoryItems = [
  {
    id: "INV-001",
    name: "Kitchen Faucet Cartridge",
    category: "plumbing",
    sku: "KFC-001",
    currentStock: 5,
    minStock: 10,
    maxStock: 50,
    unitCost: 12.5,
    totalValue: 62.5,
    supplier: "PlumbCorp Supply",
    location: "Warehouse A - Shelf 3",
    lastRestocked: "2024-01-10T09:00:00Z",
    status: "low-stock",
    description: "Universal kitchen faucet cartridge for most standard models",
    usageHistory: [
      { date: "2024-01-15", quantity: 2, workOrder: "MNT-001", handyman: "Mike Rodriguez" },
      { date: "2024-01-12", quantity: 1, workOrder: "MNT-004", handyman: "Mike Rodriguez" },
    ],
  },
  {
    id: "INV-002",
    name: "LED Light Bulbs (60W Equivalent)",
    category: "electrical",
    sku: "LED-60W",
    currentStock: 25,
    minStock: 15,
    maxStock: 100,
    unitCost: 3.99,
    totalValue: 99.75,
    supplier: "ElectroMax",
    location: "Warehouse B - Shelf 1",
    lastRestocked: "2024-01-08T14:30:00Z",
    status: "in-stock",
    description: "Energy-efficient LED bulbs, warm white 3000K",
    usageHistory: [{ date: "2024-01-10", quantity: 3, workOrder: "MNT-003", handyman: "John Smith" }],
  },
  {
    id: "INV-003",
    name: "HVAC Air Filter (16x25x1)",
    category: "hvac",
    sku: "AF-16251",
    currentStock: 2,
    minStock: 8,
    maxStock: 40,
    unitCost: 8.75,
    totalValue: 17.5,
    supplier: "AirFlow Systems",
    location: "Warehouse A - Shelf 5",
    lastRestocked: "2024-01-05T11:15:00Z",
    status: "critical",
    description: "High-efficiency pleated air filter for residential HVAC systems",
    usageHistory: [{ date: "2024-01-14", quantity: 4, workOrder: "MNT-002", handyman: "Tom Wilson" }],
  },
  {
    id: "INV-004",
    name: "Door Hinges (3.5 inch)",
    category: "general",
    sku: "DH-35",
    currentStock: 18,
    minStock: 12,
    maxStock: 60,
    unitCost: 4.25,
    totalValue: 76.5,
    supplier: "Hardware Plus",
    location: "Warehouse B - Shelf 2",
    lastRestocked: "2024-01-12T16:00:00Z",
    status: "in-stock",
    description: "Heavy-duty steel door hinges with removable pin",
    usageHistory: [{ date: "2024-01-08", quantity: 2, workOrder: "MNT-005", handyman: "Sarah Davis" }],
  },
  {
    id: "INV-005",
    name: "Pipe Joint Compound",
    category: "plumbing",
    sku: "PJC-001",
    currentStock: 8,
    minStock: 5,
    maxStock: 25,
    unitCost: 6.99,
    totalValue: 55.92,
    supplier: "PlumbCorp Supply",
    location: "Warehouse A - Shelf 4",
    lastRestocked: "2024-01-09T10:45:00Z",
    status: "in-stock",
    description: "Thread sealing compound for pipe fittings",
    usageHistory: [],
  },
]

const restockRequests = [
  {
    id: "REQ-001",
    itemId: "INV-003",
    itemName: "HVAC Air Filter (16x25x1)",
    requestedBy: "Tom Wilson",
    requestedByAvatar: "/placeholder.svg?height=32&width=32",
    requestedAt: "2024-01-16T08:30:00Z",
    quantity: 20,
    urgency: "high",
    reason: "Critical stock level - needed for multiple HVAC maintenance jobs",
    status: "pending",
    estimatedCost: 175.0,
  },
  {
    id: "REQ-002",
    itemId: "INV-001",
    itemName: "Kitchen Faucet Cartridge",
    requestedBy: "Mike Rodriguez",
    requestedByAvatar: "/placeholder.svg?height=32&width=32",
    requestedAt: "2024-01-15T14:20:00Z",
    quantity: 15,
    urgency: "medium",
    reason: "Low stock - anticipating more faucet repairs this month",
    status: "approved",
    estimatedCost: 187.5,
    approvedBy: "Jane Manager",
    approvedAt: "2024-01-15T16:00:00Z",
  },
  {
    id: "REQ-003",
    itemId: "INV-002",
    itemName: "LED Light Bulbs (60W Equivalent)",
    requestedBy: "John Smith",
    requestedByAvatar: "/placeholder.svg?height=32&width=32",
    requestedAt: "2024-01-14T11:10:00Z",
    quantity: 30,
    urgency: "low",
    reason: "Routine restocking for upcoming lighting maintenance",
    status: "ordered",
    estimatedCost: 119.7,
    approvedBy: "Jane Manager",
    approvedAt: "2024-01-14T13:30:00Z",
    orderNumber: "ORD-2024-001",
    expectedDelivery: "2024-01-18T00:00:00Z",
  },
]

const inventoryStats = {
  totalItems: 58,
  totalValue: 4250.75,
  lowStockItems: 8,
  criticalItems: 3,
  pendingRequests: 5,
  monthlyUsage: 125,
}

function getStatusColor(status: string) {
  switch (status) {
    case "in-stock":
      return "bg-green-100 text-green-800 border-green-200"
    case "low-stock":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "out-of-stock":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case "in-stock":
      return <CheckCircle className="h-4 w-4" />
    case "low-stock":
      return <AlertTriangle className="h-4 w-4" />
    case "critical":
      return <AlertTriangle className="h-4 w-4" />
    case "out-of-stock":
      return <Package className="h-4 w-4" />
    default:
      return <Package className="h-4 w-4" />
  }
}

function getRequestStatusColor(status: string) {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "ordered":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getUrgencyColor(urgency: string) {
  switch (urgency) {
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

interface MaterialsInventorySystemProps {
  userRole?: "handyman" | "manager" | "owner"
}

export function MaterialsInventorySystem({ userRole = "manager" }: MaterialsInventorySystemProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [restockDialog, setRestockDialog] = useState<{
    isOpen: boolean
    item: any
  }>({
    isOpen: false,
    item: null,
  })
  const [restockForm, setRestockForm] = useState({
    quantity: "",
    urgency: "medium",
    reason: "",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const handleRequestRestock = () => {
    console.log("Requesting restock:", restockForm)
    setRestockDialog({ isOpen: false, item: null })
    setRestockForm({ quantity: "", urgency: "medium", reason: "" })
  }

  const handleApproveRequest = (requestId: string) => {
    console.log("Approving restock request:", requestId)
  }

  const handleRejectRequest = (requestId: string) => {
    console.log("Rejecting restock request:", requestId)
  }

  const filteredItems = inventoryItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStockLevel = (item: any) => {
    const percentage = (item.currentStock / item.maxStock) * 100
    return Math.min(percentage, 100)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Materials Inventory</h2>
          <p className="text-muted-foreground">
            {userRole === "handyman"
              ? "Check available supplies and request restocking"
              : "Manage inventory levels and approve restock requests"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {userRole !== "handyman" && (
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          )}
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.totalItems}</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${inventoryStats.totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inventoryStats.lowStockItems}</div>
            <p className="text-xs text-muted-foreground">Need restocking</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{inventoryStats.criticalItems}</div>
            <p className="text-xs text-muted-foreground">Urgent action</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryStats.monthlyUsage}</div>
            <p className="text-xs text-muted-foreground">Items used</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="inventory" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="inventory">Inventory Items</TabsTrigger>
          <TabsTrigger value="requests">Restock Requests</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items by name or SKU..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="in-stock">In Stock</SelectItem>
                    <SelectItem value="low-stock">Low Stock</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Items */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <CardDescription>SKU: {item.sku}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(item.status)}>
                      {getStatusIcon(item.status)}
                      <span className="ml-1 capitalize">{item.status.replace("-", " ")}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stock Level */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Stock Level</span>
                      <span>
                        {item.currentStock} / {item.maxStock}
                      </span>
                    </div>
                    <Progress value={getStockLevel(item)} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      Min: {item.minStock} • Max: {item.maxStock}
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">Category:</span>
                      <div className="text-muted-foreground capitalize">{item.category}</div>
                    </div>
                    <div>
                      <span className="font-medium">Unit Cost:</span>
                      <div className="text-muted-foreground">${item.unitCost}</div>
                    </div>
                    <div>
                      <span className="font-medium">Total Value:</span>
                      <div className="text-muted-foreground">${item.totalValue}</div>
                    </div>
                    <div>
                      <span className="font-medium">Location:</span>
                      <div className="text-muted-foreground text-xs">{item.location}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                          <Eye className="w-3 h-3 mr-1" />
                          Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>{item.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>SKU</Label>
                              <div>{item.sku}</div>
                            </div>
                            <div>
                              <Label>Category</Label>
                              <div className="capitalize">{item.category}</div>
                            </div>
                            <div>
                              <Label>Current Stock</Label>
                              <div>{item.currentStock} units</div>
                            </div>
                            <div>
                              <Label>Unit Cost</Label>
                              <div>${item.unitCost}</div>
                            </div>
                            <div>
                              <Label>Supplier</Label>
                              <div>{item.supplier}</div>
                            </div>
                            <div>
                              <Label>Location</Label>
                              <div>{item.location}</div>
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                          <div>
                            <Label>Recent Usage</Label>
                            <div className="space-y-2 mt-2">
                              {item.usageHistory.length > 0 ? (
                                item.usageHistory.map((usage, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center justify-between text-sm p-2 bg-muted rounded"
                                  >
                                    <div>
                                      <div>{format(new Date(usage.date), "MMM d, yyyy")}</div>
                                      <div className="text-xs text-muted-foreground">
                                        {usage.workOrder} • {usage.handyman}
                                      </div>
                                    </div>
                                    <div className="font-medium">{usage.quantity} used</div>
                                  </div>
                                ))
                              ) : (
                                <div className="text-sm text-muted-foreground">No recent usage</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={restockDialog.isOpen && restockDialog.item?.id === item.id}
                      onOpenChange={(open) => setRestockDialog({ isOpen: open, item: open ? item : null })}
                    >
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Request Restock - {item.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium">Current Stock:</span>
                                <div>{item.currentStock} units</div>
                              </div>
                              <div>
                                <span className="font-medium">Min Stock:</span>
                                <div>{item.minStock} units</div>
                              </div>
                              <div>
                                <span className="font-medium">Unit Cost:</span>
                                <div>${item.unitCost}</div>
                              </div>
                              <div>
                                <span className="font-medium">Supplier:</span>
                                <div>{item.supplier}</div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label>Quantity Needed</Label>
                              <Input
                                type="number"
                                placeholder="Enter quantity"
                                value={restockForm.quantity}
                                onChange={(e) => setRestockForm((prev) => ({ ...prev, quantity: e.target.value }))}
                              />
                              {restockForm.quantity && (
                                <div className="text-sm text-muted-foreground mt-1">
                                  Estimated cost: $
                                  {(Number.parseFloat(restockForm.quantity) * item.unitCost).toFixed(2)}
                                </div>
                              )}
                            </div>

                            <div>
                              <Label>Urgency</Label>
                              <Select
                                value={restockForm.urgency}
                                onValueChange={(value) => setRestockForm((prev) => ({ ...prev, urgency: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="low">Low - Routine restocking</SelectItem>
                                  <SelectItem value="medium">Medium - Needed soon</SelectItem>
                                  <SelectItem value="high">High - Urgent need</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label>Reason for Request</Label>
                              <Textarea
                                placeholder="Explain why this restock is needed..."
                                value={restockForm.reason}
                                onChange={(e) => setRestockForm((prev) => ({ ...prev, reason: e.target.value }))}
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setRestockDialog({ isOpen: false, item: null })}>
                              Cancel
                            </Button>
                            <Button
                              onClick={handleRequestRestock}
                              disabled={!restockForm.quantity || !restockForm.reason}
                            >
                              Submit Request
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          {/* Restock Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Restock Requests</CardTitle>
              <CardDescription>
                {userRole === "handyman"
                  ? "Your submitted restock requests"
                  : "Review and approve restock requests from handymen"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restockRequests.map((request) => (
                  <Card key={request.id} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{request.itemName}</h3>
                          <Badge variant="outline" className={getRequestStatusColor(request.status)}>
                            <span className="capitalize">{request.status}</span>
                          </Badge>
                          <Badge variant="outline" className={getUrgencyColor(request.urgency)}>
                            <span className="capitalize">{request.urgency} Priority</span>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-3">
                          <div>
                            <span className="font-medium">Requested by:</span>
                            <div className="text-muted-foreground">{request.requestedBy}</div>
                          </div>
                          <div>
                            <span className="font-medium">Quantity:</span>
                            <div className="text-muted-foreground">{request.quantity} units</div>
                          </div>
                          <div>
                            <span className="font-medium">Est. Cost:</span>
                            <div className="text-muted-foreground">${request.estimatedCost}</div>
                          </div>
                          <div>
                            <span className="font-medium">Requested:</span>
                            <div className="text-muted-foreground">
                              {format(new Date(request.requestedAt), "MMM d, h:mm a")}
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{request.reason}</p>

                        {request.status === "approved" && request.approvedBy && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <div className="text-sm text-green-800">
                              Approved by {request.approvedBy} on{" "}
                              {format(new Date(request.approvedAt!), "MMM d, h:mm a")}
                            </div>
                          </div>
                        )}

                        {request.status === "ordered" && (
                          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                            <div className="text-sm text-blue-800">
                              Order #{request.orderNumber} placed • Expected delivery:{" "}
                              {format(new Date(request.expectedDelivery!), "MMM d, yyyy")}
                            </div>
                          </div>
                        )}
                      </div>

                      {userRole !== "handyman" && request.status === "pending" && (
                        <div className="flex items-center gap-2 ml-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRejectRequest(request.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleApproveRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-6">
          {/* Usage Analytics */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Used Items</CardTitle>
                <CardDescription>Most frequently used materials this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inventoryItems
                    .filter((item) => item.usageHistory.length > 0)
                    .sort(
                      (a, b) =>
                        b.usageHistory.reduce((sum, usage) => sum + usage.quantity, 0) -
                        a.usageHistory.reduce((sum, usage) => sum + usage.quantity, 0),
                    )
                    .slice(0, 5)
                    .map((item, index) => {
                      const totalUsed = item.usageHistory.reduce((sum, usage) => sum + usage.quantity, 0)
                      return (
                        <div key={item.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">{item.category}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{totalUsed} used</div>
                            <div className="text-sm text-muted-foreground">#{index + 1}</div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Usage</CardTitle>
                <CardDescription>Usage breakdown by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["plumbing", "electrical", "hvac", "general"].map((category) => {
                    const categoryItems = inventoryItems.filter((item) => item.category === category)
                    const totalUsed = categoryItems.reduce(
                      (sum, item) => sum + item.usageHistory.reduce((itemSum, usage) => itemSum + usage.quantity, 0),
                      0,
                    )
                    const percentage = totalUsed > 0 ? (totalUsed / inventoryStats.monthlyUsage) * 100 : 0

                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="capitalize font-medium">{category}</span>
                          <span className="text-sm text-muted-foreground">{totalUsed} items</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
