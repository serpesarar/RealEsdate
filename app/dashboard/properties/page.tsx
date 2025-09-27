"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Building2,
  Plus,
  MapPin,
  Users,
  DollarSign,
  MoreHorizontal,
  Edit,
  Eye,
  Trash2,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { PropertyDialog } from "@/components/property-dialog"
import { SearchAndFilter } from "@/components/search-and-filter"
import { ConfirmationModal } from "@/components/confirmation-modal"
import { ExportService } from "@/lib/export-utils"
import { motion } from "framer-motion"
import Link from "next/link"

const properties = [
  {
    id: 1,
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA",
    type: "Apartment Complex",
    units: 24,
    occupied: 23,
    monthlyRevenue: 48200,
    expenses: 12400,
    status: "active",
    image: "/modern-apartment-building.png",
    yearBuilt: 2018,
    marketValue: 1750000,
    purchasePrice: 1500000,
    rating: 4.8,
    maintenanceRequests: 2,
    leaseRenewals: 3,
    vacantUnits: 1,
    avgRent: 2008,
    occupancyTrend: "up",
    revenueTrend: "up",
  },
  {
    id: 2,
    name: "Downtown Lofts",
    address: "456 Main St, New York, NY",
    type: "Loft Building",
    units: 18,
    occupied: 16,
    monthlyRevenue: 52100,
    expenses: 15200,
    status: "active",
    image: "/placeholder-umfsb.png",
    yearBuilt: 2020,
    marketValue: 2100000,
    purchasePrice: 1800000,
    rating: 4.6,
    maintenanceRequests: 1,
    leaseRenewals: 2,
    vacantUnits: 2,
    avgRent: 2894,
    occupancyTrend: "stable",
    revenueTrend: "up",
  },
  {
    id: 3,
    name: "Garden View Complex",
    address: "789 Garden Ave, San Francisco, CA",
    type: "Residential Complex",
    units: 32,
    occupied: 30,
    monthlyRevenue: 67800,
    expenses: 18600,
    status: "active",
    image: "/garden-view-apartment-complex.jpg",
    yearBuilt: 2019,
    marketValue: 2800000,
    purchasePrice: 2400000,
    rating: 4.9,
    maintenanceRequests: 0,
    leaseRenewals: 5,
    vacantUnits: 2,
    avgRent: 2260,
    occupancyTrend: "up",
    revenueTrend: "up",
  },
  {
    id: 4,
    name: "Riverside Condos",
    address: "321 River Rd, Portland, OR",
    type: "Condominium",
    units: 16,
    occupied: 14,
    monthlyRevenue: 38400,
    expenses: 9800,
    status: "maintenance",
    image: "/riverside-condominium-building.jpg",
    yearBuilt: 2017,
    marketValue: 1400000,
    purchasePrice: 1200000,
    rating: 4.4,
    maintenanceRequests: 4,
    leaseRenewals: 1,
    vacantUnits: 2,
    avgRent: 2400,
    occupancyTrend: "down",
    revenueTrend: "stable",
  },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddDialog, setShowAddDialog] = useState(false)
  const [filterStatus, setFilterStatus] = useState("all")
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; propertyId: number | null }>({
    isOpen: false,
    propertyId: null,
  })

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterStatus === "all" || property.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const getOccupancyRate = (occupied: number, total: number) => {
    return Math.round((occupied / total) * 100)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "vacant":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-600" />
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-600" />
      default:
        return <BarChart3 className="w-3 h-3 text-gray-600" />
    }
  }

  const totalProperties = properties.length
  const totalUnits = properties.reduce((sum, p) => sum + p.units, 0)
  const totalOccupied = properties.reduce((sum, p) => sum + p.occupied, 0)
  const totalRevenue = properties.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  const totalExpenses = properties.reduce((sum, p) => sum + p.expenses, 0)
  const portfolioOccupancy = Math.round((totalOccupied / totalUnits) * 100)
  const netIncome = totalRevenue - totalExpenses

  const handleSearch = (query: string) => {
    setSearchTerm(query)
  }

  const handleFilter = (filters: Record<string, any>) => {
    setFilterStatus(filters.status || "all")
  }

  const handleExport = async () => {
    const exportData = filteredProperties.map((property) => ({
      Name: property.name,
      Address: property.address,
      Type: property.type,
      Units: property.units,
      Occupied: property.occupied,
      "Occupancy Rate": `${getOccupancyRate(property.occupied, property.units)}%`,
      "Monthly Revenue": property.monthlyRevenue,
      "Monthly Expenses": property.expenses,
      "Net Income": property.monthlyRevenue - property.expenses,
      Status: property.status,
      Rating: property.rating,
      "Year Built": property.yearBuilt,
    }))

    await ExportService.exportToCSV(exportData, "properties-report")
  }

  const handleDeleteProperty = (propertyId: number) => {
    setDeleteConfirm({ isOpen: true, propertyId })
  }

  const confirmDelete = () => {
    console.log("Deleting property:", deleteConfirm.propertyId)
    setDeleteConfirm({ isOpen: false, propertyId: null })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Properties Portfolio
          </h1>
          <p className="text-muted-foreground mt-2">Comprehensive property management and analytics</p>
        </motion.div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Properties",
            value: totalProperties.toString(),
            subtitle: `${totalUnits} Total Units`,
            icon: Building2,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
          },
          {
            title: "Portfolio Occupancy",
            value: `${portfolioOccupancy}%`,
            subtitle: `${totalOccupied}/${totalUnits} Occupied`,
            icon: Users,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
          },
          {
            title: "Monthly Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            subtitle: "Gross Income",
            icon: DollarSign,
            gradient: "from-purple-500 to-pink-600",
            bgGradient: "from-purple-50 to-pink-50",
          },
          {
            title: "Net Income",
            value: `$${netIncome.toLocaleString()}`,
            subtitle: `${Math.round((netIncome / totalRevenue) * 100)}% Margin`,
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

      <SearchAndFilter
        searchPlaceholder="Search properties by name or address..."
        filters={[
          {
            label: "Status",
            key: "status",
            options: [
              { label: "Active", value: "active" },
              { label: "Maintenance", value: "maintenance" },
              { label: "Vacant", value: "vacant" },
            ],
          },
        ]}
        onSearch={handleSearch}
        onFilter={handleFilter}
        onExport={handleExport}
        showExport={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <div className="aspect-video relative">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={getStatusColor(property.status)}>{property.status}</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="outline" className="bg-white/90 backdrop-blur-sm">
                    <Star className="w-3 h-3 mr-1 text-yellow-500 fill-current" />
                    {property.rating}
                  </Badge>
                </div>
                {(property.maintenanceRequests > 0 || property.vacantUnits > 0) && (
                  <div className="absolute bottom-4 left-4 flex gap-2">
                    {property.maintenanceRequests > 0 && (
                      <Badge variant="destructive" className="text-xs">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        {property.maintenanceRequests} Issues
                      </Badge>
                    )}
                    {property.vacantUnits > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {property.vacantUnits} Vacant
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold">{property.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" />
                      {property.address}
                    </CardDescription>
                    <Badge variant="outline" className="mt-2 text-xs">
                      {property.type}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/properties/${property.id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Property
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive" onClick={() => handleDeleteProperty(property.id)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>

              <CardContent className="pt-0 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        Occupancy
                      </span>
                      {getTrendIcon(property.occupancyTrend)}
                    </div>
                    <div className="font-semibold">
                      {property.occupied}/{property.units} ({getOccupancyRate(property.occupied, property.units)}%)
                    </div>
                    <Progress value={getOccupancyRate(property.occupied, property.units)} className="h-1" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        Revenue
                      </span>
                      {getTrendIcon(property.revenueTrend)}
                    </div>
                    <div className="font-semibold text-green-600">${property.monthlyRevenue.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Net: ${(property.monthlyRevenue - property.expenses).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm pt-2 border-t">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      <span className="text-xs">{property.leaseRenewals} Renewals</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Avg: ${property.avgRent}/unit</div>
                  </div>
                  <div className="text-xs text-muted-foreground">Built {property.yearBuilt}</div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent" asChild>
                    <Link href={`/dashboard/properties/${property.id}`}>
                      <Building2 className="w-4 h-4 mr-2" />
                      Manage
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Try adjusting your search terms" : "Get started by adding your first property"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setShowAddDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      <PropertyDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
      <ConfirmationModal
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, propertyId: null })}
        onConfirm={confirmDelete}
        title="Delete Property"
        description="Are you sure you want to delete this property? This action cannot be undone and will remove all associated data including tenants, leases, and financial records."
        confirmText="Delete Property"
        cancelText="Cancel"
        type="danger"
        icon="delete"
      />
    </div>
  )
}
