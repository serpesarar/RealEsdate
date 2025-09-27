"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  FileText,
  Plus,
  Search,
  Calendar,
  DollarSign,
  MapPin,
  MoreHorizontal,
  Edit,
  Eye,
  Download,
  AlertTriangle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LeaseDialog } from "@/components/lease-dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"

const leases = [
  {
    id: 1,
    tenant: "Sarah Johnson",
    tenantAvatar: "/placeholder.svg?height=40&width=40",
    property: "Sunset Apartments",
    unit: "4B",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    monthlyRent: 2400,
    securityDeposit: 2400,
    status: "active",
    type: "fixed",
    renewalStatus: "pending",
    daysUntilExpiry: 245,
  },
  {
    id: 2,
    tenant: "Mike Chen",
    tenantAvatar: "/placeholder.svg?height=40&width=40",
    property: "Downtown Lofts",
    unit: "12A",
    startDate: "2023-08-15",
    endDate: "2024-08-14",
    monthlyRent: 2800,
    securityDeposit: 2800,
    status: "active",
    type: "fixed",
    renewalStatus: "expiring",
    daysUntilExpiry: 45,
  },
  {
    id: 3,
    tenant: "Lisa Rodriguez",
    tenantAvatar: "/placeholder.svg?height=40&width=40",
    property: "Garden View Complex",
    unit: "8C",
    startDate: "2024-03-01",
    endDate: "2025-02-28",
    monthlyRent: 2200,
    securityDeposit: 2200,
    status: "active",
    type: "fixed",
    renewalStatus: "renewed",
    daysUntilExpiry: 335,
  },
  {
    id: 4,
    tenant: "Alex Thompson",
    tenantAvatar: "/placeholder.svg?height=40&width=40",
    property: "Riverside Condos",
    unit: "3A",
    startDate: "2023-12-01",
    endDate: "2024-11-30",
    monthlyRent: 2600,
    securityDeposit: 2600,
    status: "notice",
    type: "fixed",
    renewalStatus: "terminating",
    daysUntilExpiry: 120,
  },
]

export default function OwnerLeasesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [activeTab, setActiveTab] = useState("all")

  const filteredLeases = leases.filter((lease) => {
    const matchesSearch =
      lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lease.unit.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "expiring") return matchesSearch && lease.daysUntilExpiry <= 90
    if (activeTab === "renewals") return matchesSearch && lease.renewalStatus === "pending"
    if (activeTab === "terminating") return matchesSearch && lease.status === "notice"

    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "notice":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRenewalStatusColor = (status: string) => {
    switch (status) {
      case "renewed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "expiring":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "terminating":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const expiringLeases = leases.filter((lease) => lease.daysUntilExpiry <= 90)
  const pendingRenewals = leases.filter((lease) => lease.renewalStatus === "pending")
  const terminatingLeases = leases.filter((lease) => lease.status === "notice")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            My Lease Management
          </h1>
          <p className="text-muted-foreground mt-2">Track and manage all lease agreements</p>
        </motion.div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Lease
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: "Total Leases",
            value: leases.length.toString(),
            subtitle: "Active Agreements",
            icon: FileText,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
          },
          {
            title: "Expiring Soon",
            value: expiringLeases.length.toString(),
            subtitle: "Within 90 Days",
            icon: AlertTriangle,
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50 to-red-50",
          },
          {
            title: "Pending Renewals",
            value: pendingRenewals.length.toString(),
            subtitle: "Awaiting Decision",
            icon: Calendar,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
          },
          {
            title: "Terminating",
            value: terminatingLeases.length.toString(),
            subtitle: "Notice Given",
            icon: FileText,
            gradient: "from-red-500 to-pink-600",
            bgGradient: "from-red-50 to-pink-50",
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

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leases by tenant, property, or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Lease Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Leases ({leases.length})</TabsTrigger>
          <TabsTrigger value="expiring">Expiring ({expiringLeases.length})</TabsTrigger>
          <TabsTrigger value="renewals">Renewals ({pendingRenewals.length})</TabsTrigger>
          <TabsTrigger value="terminating">Terminating ({terminatingLeases.length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === "all" && "All Lease Agreements"}
                {activeTab === "expiring" && "Expiring Leases"}
                {activeTab === "renewals" && "Pending Renewals"}
                {activeTab === "terminating" && "Terminating Leases"}
              </CardTitle>
              <CardDescription>
                {activeTab === "all" && "Complete overview of all lease agreements"}
                {activeTab === "expiring" && "Leases expiring within 90 days"}
                {activeTab === "renewals" && "Leases pending renewal decisions"}
                {activeTab === "terminating" && "Leases with termination notices"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredLeases.map((lease) => (
                  <div
                    key={lease.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={lease.tenantAvatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {lease.tenant
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{lease.tenant}</h4>
                          <Badge className={getStatusColor(lease.status)}>{lease.status}</Badge>
                          <Badge className={getRenewalStatusColor(lease.renewalStatus)}>{lease.renewalStatus}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {lease.property} - Unit {lease.unit}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(lease.startDate).toLocaleDateString()} -{" "}
                            {new Date(lease.endDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />${lease.monthlyRent.toLocaleString()}/mo
                          </div>
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            {lease.daysUntilExpiry} days remaining
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {lease.daysUntilExpiry <= 30 && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Lease
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="w-4 h-4 mr-2" />
                            Renew Lease
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {filteredLeases.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No leases found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by creating your first lease"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Lease
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <LeaseDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  )
}
