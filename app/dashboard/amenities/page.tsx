"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AmenityManagementSystem } from "@/components/amenity-management-system"
import {
  Settings,
  Plus,
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Building2,
  Users,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AmenitiesPage() {
  const [managementDialogOpen, setManagementDialogOpen] = useState(false)

  const amenityStats = [
    {
      title: "Total Amenities",
      value: "12",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Active Amenities",
      value: "10",
      icon: Settings,
      color: "text-green-600",
    },
    {
      title: "Properties Covered",
      value: "4",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      title: "Tenant Access Points",
      value: "156",
      icon: Users,
      color: "text-orange-600",
    },
  ]

  const configuredAmenities = [
    {
      id: 1,
      name: "Building WiFi",
      type: "WiFi",
      icon: Wifi,
      status: "active",
      properties: ["All Buildings"],
      tenantAccess: "All Tenants",
      lastUpdated: "2024-01-15",
      details: {
        networkName: "PropertyWiFi_Guest",
        speed: "100 Mbps",
        provider: "Verizon FiOS",
      },
    },
    {
      id: 2,
      name: "Fitness Center",
      type: "Gym",
      icon: Dumbbell,
      status: "active",
      properties: ["Sunset Apartments", "Downtown Lofts"],
      tenantAccess: "Premium & VIP",
      lastUpdated: "2024-01-10",
      details: {
        hours: "5:00 AM - 11:00 PM",
        location: "Building A, Ground Floor",
        capacity: "15 people",
      },
    },
    {
      id: 3,
      name: "Parking Garage",
      type: "Parking",
      icon: Car,
      status: "active",
      properties: ["All Buildings"],
      tenantAccess: "Assigned Tenants",
      lastUpdated: "2024-01-08",
      details: {
        totalSpots: "120",
        guestSpots: "15",
        evCharging: "Yes",
      },
    },
    {
      id: 4,
      name: "Swimming Pool",
      type: "Pool",
      icon: Waves,
      status: "seasonal",
      properties: ["Garden View Complex"],
      tenantAccess: "All Tenants",
      lastUpdated: "2024-01-05",
      details: {
        season: "May - September",
        hours: "6:00 AM - 10:00 PM",
        guestPolicy: "Max 2 guests per resident",
      },
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "seasonal":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Amenities Management</h1>
            <p className="text-muted-foreground">Configure and manage building amenities across your properties</p>
          </div>
          <Button onClick={() => setManagementDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <Settings className="w-4 h-4 mr-2" />
            Manage Amenities
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenityStats.map((stat, index) => (
            <Card key={stat.title}>
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
          ))}
        </div>

        {/* Configured Amenities */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Configured Amenities</CardTitle>
                <CardDescription>Manage your active amenity configurations</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setManagementDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Amenity
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {configuredAmenities.map((amenity) => {
                const IconComponent = amenity.icon
                return (
                  <div
                    key={amenity.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{amenity.name}</h4>
                          <Badge className={getStatusColor(amenity.status)}>{amenity.status}</Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {amenity.properties.join(", ")}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {amenity.tenantAccess}
                          </div>
                          <div>Updated: {new Date(amenity.lastUpdated).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
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
                            Edit Configuration
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="w-4 h-4 mr-2" />
                            Manage Access
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove Amenity
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => setManagementDialogOpen(true)}
          >
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Add New Amenity</h3>
              <p className="text-sm text-muted-foreground">Configure a new amenity using our templates</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Building2 className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Property Assignments</h3>
              <p className="text-sm text-muted-foreground">Manage amenity assignments across properties</p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tenant Access</h3>
              <p className="text-sm text-muted-foreground">Configure tier-based amenity access</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <AmenityManagementSystem open={managementDialogOpen} onOpenChange={setManagementDialogOpen} />
    </DashboardLayout>
  )
}
