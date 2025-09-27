"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Plus,
  Search,
  Phone,
  Mail,
  MapPin,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  FileText,
  Filter,
  TrendingUp,
  Star,
  CreditCard,
  User,
  Grid3X3,
  List,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { TenantDialog } from "@/components/tenant-dialog"
import { motion } from "framer-motion"
import Link from "next/link"

const tenants = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    property: "Sunset Apartments",
    unit: "4B",
    rent: 2400,
    leaseStart: "2024-01-01",
    leaseEnd: "2024-12-31",
    status: "active",
    paymentStatus: "current",
    emergencyContact: "John Johnson - (555) 987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
    creditScore: 780,
    monthsRemaining: 8,
    onTimePayments: 12,
    maintenanceRequests: 1,
    rating: 4.8,
    occupation: "Software Engineer",
    monthlyIncome: 8500,
    moveInDate: "2024-01-01",
    lastPayment: "2024-04-01",
    paymentMethod: "Auto-pay",
    daysLate: 0,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike.chen@email.com",
    phone: "(555) 234-5678",
    property: "Downtown Lofts",
    unit: "12A",
    rent: 2800,
    leaseStart: "2023-08-15",
    leaseEnd: "2024-08-14",
    status: "active",
    paymentStatus: "late",
    emergencyContact: "Lisa Chen - (555) 876-5432",
    avatar: "/placeholder.svg?height=40&width=40",
    creditScore: 720,
    monthsRemaining: 4,
    onTimePayments: 8,
    maintenanceRequests: 2,
    rating: 4.2,
    occupation: "Marketing Manager",
    monthlyIncome: 7200,
    moveInDate: "2023-08-15",
    lastPayment: "2024-03-15",
    paymentMethod: "Check",
    daysLate: 15,
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    email: "lisa.rodriguez@email.com",
    phone: "(555) 345-6789",
    property: "Garden View Complex",
    unit: "8C",
    rent: 2200,
    leaseStart: "2024-03-01",
    leaseEnd: "2025-02-28",
    status: "active",
    paymentStatus: "current",
    emergencyContact: "Carlos Rodriguez - (555) 765-4321",
    avatar: "/placeholder.svg?height=40&width=40",
    creditScore: 810,
    monthsRemaining: 10,
    onTimePayments: 2,
    maintenanceRequests: 0,
    rating: 5.0,
    occupation: "Nurse",
    monthlyIncome: 6800,
    moveInDate: "2024-03-01",
    lastPayment: "2024-04-01",
    paymentMethod: "Auto-pay",
    daysLate: 0,
  },
  {
    id: 4,
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "(555) 456-7890",
    property: "Riverside Condos",
    unit: "3A",
    rent: 2600,
    leaseStart: "2023-12-01",
    leaseEnd: "2024-11-30",
    status: "notice",
    paymentStatus: "current",
    emergencyContact: "Emma Thompson - (555) 654-3210",
    avatar: "/placeholder.svg?height=40&width=40",
    creditScore: 750,
    monthsRemaining: 7,
    onTimePayments: 5,
    maintenanceRequests: 1,
    rating: 4.5,
    occupation: "Teacher",
    monthlyIncome: 5800,
    moveInDate: "2023-12-01",
    lastPayment: "2024-04-01",
    paymentMethod: "Bank Transfer",
    daysLate: 0,
  },
]

export default function OwnerTenantsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPayment, setFilterPayment] = useState("all")
  const [filterProperty, setFilterProperty] = useState("all")
  const [viewMode, setViewMode] = useState<"table" | "cards">("cards")

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || tenant.status === filterStatus
    const matchesPayment = filterPayment === "all" || tenant.paymentStatus === filterPayment
    const matchesProperty = filterProperty === "all" || tenant.property === filterProperty

    return matchesSearch && matchesStatus && matchesPayment && matchesProperty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "notice":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "inactive":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "late":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      case "partial":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600"
    if (score >= 650) return "text-yellow-600"
    return "text-red-600"
  }

  // Calculate tenant metrics
  const totalTenants = tenants.length
  const activeLeases = tenants.filter((t) => t.status === "active").length
  const latePayments = tenants.filter((t) => t.paymentStatus === "late").length
  const moveOutNotices = tenants.filter((t) => t.status === "notice").length
  const totalRent = tenants.reduce((sum, t) => sum + t.rent, 0)
  const avgCreditScore = Math.round(tenants.reduce((sum, t) => sum + t.creditScore, 0) / tenants.length)
  const onTimePaymentRate = Math.round(
    (tenants.reduce((sum, t) => sum + t.onTimePayments, 0) /
      tenants.reduce((sum, t) => sum + t.onTimePayments + (t.paymentStatus === "late" ? 1 : 0), 0)) *
      100,
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            My Tenants
          </h1>
          <p className="text-muted-foreground mt-2">Comprehensive tenant relationship management</p>
        </motion.div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Tenant
        </Button>
      </div>

      {/* Tenant Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Tenants",
            value: totalTenants.toString(),
            subtitle: `${activeLeases} Active Leases`,
            icon: Users,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
          },
          {
            title: "Monthly Rent Roll",
            value: `$${totalRent.toLocaleString()}`,
            subtitle: "Total Monthly Income",
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
          },
          {
            title: "Payment Performance",
            value: `${onTimePaymentRate}%`,
            subtitle: "On-time Payment Rate",
            icon: CreditCard,
            gradient: "from-purple-500 to-pink-600",
            bgGradient: "from-purple-50 to-pink-50",
          },
          {
            title: "Avg Credit Score",
            value: avgCreditScore.toString(),
            subtitle: "Portfolio Average",
            icon: TrendingUp,
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50 to-red-50",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-50`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.gradient}`}>
                  <metric.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-sm text-gray-600 mt-1">{metric.subtitle}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Quick Alerts */}
      {(latePayments > 0 || moveOutNotices > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {latePayments > 0 && (
            <Card className="border-red-200 bg-red-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">{latePayments} Late Payment(s)</p>
                    <p className="text-sm text-red-700">Requires immediate attention</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                    Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {moveOutNotices > 0 && (
            <Card className="border-yellow-200 bg-yellow-50/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-semibold text-yellow-900">{moveOutNotices} Move-out Notice(s)</p>
                    <p className="text-sm text-yellow-700">Plan for unit turnover</p>
                  </div>
                  <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                    Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants by name, email, property, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <MapPin className="w-4 h-4" />
                    Property: {filterProperty === "all" ? "All" : filterProperty}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterProperty("all")}>All Properties</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterProperty("Sunset Apartments")}>
                    Sunset Apartments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterProperty("Downtown Lofts")}>
                    Downtown Lofts
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterProperty("Garden View Complex")}>
                    Garden View Complex
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterProperty("Riverside Condos")}>
                    Riverside Condos
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Filter className="w-4 h-4" />
                    Status: {filterStatus === "all" ? "All" : filterStatus}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("notice")}>Notice</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <CreditCard className="w-4 h-4" />
                    Payment: {filterPayment === "all" ? "All" : filterPayment}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterPayment("all")}>All Payments</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPayment("current")}>Current</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPayment("late")}>Late</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterPayment("partial")}>Partial</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex border rounded-lg">
                <Button
                  variant={viewMode === "cards" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("cards")}
                  className="rounded-r-none"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                  className="rounded-l-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Tenants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTenants.map((tenant, index) => (
          <motion.div
            key={tenant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={tenant.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {tenant.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{tenant.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                          {tenant.rating}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{tenant.occupation}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(tenant.status)}>{tenant.status}</Badge>
                        <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                          {tenant.paymentStatus === "current" ? "Current" : `${tenant.daysLate} days late`}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/owner/tenants/${tenant.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Tenant
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="w-4 h-4 mr-2" />
                        View Lease
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove Tenant
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Contact & Property Info */}
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    {tenant.email}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-3 h-3" />
                    {tenant.phone}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    {tenant.property} - Unit {tenant.unit}
                  </div>
                </div>

                {/* Financial & Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Monthly Rent</span>
                      <span className="font-semibold text-green-600">${tenant.rent.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Credit Score</span>
                      <span className={`font-semibold ${getCreditScoreColor(tenant.creditScore)}`}>
                        {tenant.creditScore}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Income Ratio</span>
                      <span className="font-semibold">
                        {Math.round((tenant.monthlyIncome / tenant.rent) * 10) / 10}:1
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Lease Ends</span>
                      <span className="font-semibold">{new Date(tenant.leaseEnd).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">On-time Payments</span>
                      <span className="font-semibold text-green-600">{tenant.onTimePayments}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Last Payment</span>
                      <span className="font-semibold">{new Date(tenant.lastPayment).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Lease Progress */}
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Lease Progress</span>
                    <span className="font-semibold">{tenant.monthsRemaining} months remaining</span>
                  </div>
                  <Progress
                    value={
                      ((new Date(tenant.leaseEnd).getTime() - new Date().getTime()) /
                        (new Date(tenant.leaseEnd).getTime() - new Date(tenant.leaseStart).getTime())) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                {/* Quick Status Indicators */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-4 text-xs">
                    {tenant.maintenanceRequests > 0 ? (
                      <div className="flex items-center gap-1 text-orange-600">
                        <AlertTriangle className="w-3 h-3" />
                        {tenant.maintenanceRequests} Issues
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-3 h-3" />
                        No Issues
                      </div>
                    )}
                    <div className="text-muted-foreground">Payment: {tenant.paymentMethod}</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/dashboard/owner/tenants/${tenant.id}`}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Message
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredTenants.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tenants found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first tenant"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Tenant
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <TenantDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
