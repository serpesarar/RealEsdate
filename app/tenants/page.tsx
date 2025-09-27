"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Users,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  Home,
  Calendar,
  Menu,
} from "lucide-react"
import { AddTenantDialog } from "@/components/reference/add-tenant-dialog"

export default function TenantsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const tenants = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+1 (555) 123-4567",
      property: "Park Avenue Towers",
      unit: "12A",
      monthlyRent: 2500,
      leaseStart: "2024-01-15",
      leaseEnd: "2024-12-15",
      status: "active",
      referenceCode: "TE-1K2L3M4N-5O6P7Q",
      registrationStatus: "completed",
      avatar: "/placeholder.svg?height=40&width=40",
      lastPayment: "2024-01-01",
      paymentStatus: "paid",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 987-6543",
      property: "Sunset Gardens",
      unit: "5B",
      monthlyRent: 2200,
      leaseStart: "2024-02-01",
      leaseEnd: "2025-01-31",
      status: "active",
      referenceCode: "TE-2A3B4C5D-6E7F8G",
      registrationStatus: "completed",
      avatar: "/placeholder.svg?height=40&width=40",
      lastPayment: "2024-01-01",
      paymentStatus: "paid",
    },
    {
      id: "3",
      name: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 456-7890",
      property: "Metro Plaza",
      unit: "8C",
      monthlyRent: 1800,
      leaseStart: "2024-03-01",
      leaseEnd: "2025-02-28",
      status: "pending",
      referenceCode: "TE-3H4I5J6K-7L8M9N",
      registrationStatus: "pending",
      avatar: "/placeholder.svg?height=40&width=40",
      lastPayment: null,
      paymentStatus: "pending",
    },
    {
      id: "4",
      name: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 321-0987",
      property: "Downtown Heights",
      unit: "3A",
      monthlyRent: 2800,
      leaseStart: "2023-12-01",
      leaseEnd: "2024-11-30",
      status: "active",
      referenceCode: "TE-4O5P6Q7R-8S9T0U",
      registrationStatus: "completed",
      avatar: "/placeholder.svg?height=40&width=40",
      lastPayment: "2024-01-01",
      paymentStatus: "overdue",
    },
  ]

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || tenant.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getRegistrationStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "expired":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "overdue":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const copyReferenceCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  const stats = [
    {
      title: "Total Tenants",
      value: tenants.length.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Active Leases",
      value: tenants.filter((t) => t.status === "active").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Pending Registration",
      value: tenants.filter((t) => t.registrationStatus === "pending").length.toString(),
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Monthly Revenue",
      value: `$${tenants
        .filter((t) => t.status === "active")
        .reduce((sum, t) => sum + t.monthlyRent, 0)
        .toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Tenant Management</h1>
                  <p className="text-sm text-muted-foreground">Manage tenants, leases, and reference codes</p>
                </div>
              </div>
              <AddTenantDialog
                trigger={
                  <Button>
                    <Users className="w-4 h-4 mr-2" />
                    Add New Tenant
                  </Button>
                }
              />
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                          </div>
                          <stat.icon className={`w-8 h-8 ${stat.color}`} />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Tenants</CardTitle>
                      <CardDescription>Manage tenant information and reference codes</CardDescription>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search tenants..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 w-64"
                        />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Filter className="w-4 h-4 mr-2" />
                            Filter
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Tenants</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active Only</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending Only</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tenant</TableHead>
                        <TableHead>Property & Unit</TableHead>
                        <TableHead>Lease Info</TableHead>
                        <TableHead>Registration</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Reference Code</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTenants.map((tenant) => (
                        <TableRow key={tenant.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={tenant.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {tenant.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{tenant.name}</p>
                                <p className="text-sm text-muted-foreground">{tenant.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Home className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">{tenant.property}</p>
                                <p className="text-sm text-muted-foreground">Unit {tenant.unit}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <div>
                                <p className="font-medium">${tenant.monthlyRent}/month</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(tenant.leaseStart).toLocaleDateString()} -{" "}
                                  {new Date(tenant.leaseEnd).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getRegistrationStatusIcon(tenant.registrationStatus)}
                              <Badge className={getStatusColor(tenant.status)}>{tenant.registrationStatus}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getPaymentStatusColor(tenant.paymentStatus)}>
                              {tenant.paymentStatus}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <code className="text-xs bg-muted px-2 py-1 rounded">{tenant.referenceCode}</code>
                              <Button size="sm" variant="ghost" onClick={() => copyReferenceCode(tenant.referenceCode)}>
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
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
                                  Edit Tenant
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove Tenant
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
