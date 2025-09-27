"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, MapPin, Users, DollarSign, Edit, Calendar, Wrench, TrendingUp, Home } from "lucide-react"

// Mock data for property details
const property = {
  id: 1,
  name: "Sunset Apartments",
  address: "123 Sunset Blvd, Los Angeles, CA 90028",
  type: "Apartment Complex",
  units: 24,
  occupied: 23,
  floors: 4,
  yearBuilt: 2018,
  purchasePrice: 1500000,
  marketValue: 1750000,
  monthlyRevenue: 48200,
  status: "active",
  description:
    "Modern apartment complex with premium amenities including rooftop pool, fitness center, and underground parking.",
  amenities: ["Pool", "Gym", "Parking", "Laundry", "Rooftop Deck", "Security"],
  image: "/modern-apartment-exterior.png",
}

const units = [
  { number: "1A", tenant: "Sarah Johnson", rent: 2400, status: "occupied", lease: "12 months" },
  { number: "1B", tenant: "Mike Chen", rent: 2200, status: "occupied", lease: "6 months" },
  { number: "2A", tenant: null, rent: 2500, status: "vacant", lease: null },
  { number: "2B", tenant: "Lisa Rodriguez", rent: 2300, status: "occupied", lease: "12 months" },
]

const maintenanceRequests = [
  { id: 1, unit: "3B", issue: "Leaky faucet", priority: "medium", status: "in-progress", date: "2024-01-15" },
  { id: 2, unit: "1A", issue: "HVAC not working", priority: "high", status: "pending", date: "2024-01-14" },
  { id: 3, unit: "4C", issue: "Light fixture replacement", priority: "low", status: "completed", date: "2024-01-12" },
]

export default function PropertyDetailsPage() {
  const occupancyRate = Math.round((property.occupied / property.units) * 100)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{property.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {property.address}
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Edit className="w-4 h-4 mr-2" />
            Edit Property
          </Button>
        </div>

        {/* Property Image and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <img
                  src={property.image || "/placeholder.svg"}
                  alt={property.name}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                      {property.status}
                    </Badge>
                    <Badge variant="outline">{property.type}</Badge>
                  </div>
                  <p className="text-muted-foreground">{property.description}</p>

                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <Badge key={index} variant="secondary">
                          {amenity}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Property Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Total Units
                  </span>
                  <span className="font-semibold">{property.units}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Occupancy
                  </span>
                  <span className="font-semibold">
                    {property.occupied}/{property.units} ({occupancyRate}%)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Monthly Revenue
                  </span>
                  <span className="font-semibold text-green-600">${property.monthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Floors
                  </span>
                  <span className="font-semibold">{property.floors}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Year Built
                  </span>
                  <span className="font-semibold">{property.yearBuilt}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Financial Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Purchase Price</span>
                  <span className="font-semibold">${property.purchasePrice.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Market Value</span>
                  <span className="font-semibold">${property.marketValue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Appreciation
                  </span>
                  <span className="font-semibold text-green-600">
                    +{Math.round(((property.marketValue - property.purchasePrice) / property.purchasePrice) * 100)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="units" className="space-y-4">
          <TabsList>
            <TabsTrigger value="units">Units</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
          </TabsList>

          <TabsContent value="units">
            <Card>
              <CardHeader>
                <CardTitle>Unit Management</CardTitle>
                <CardDescription>Overview of all units in this property</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {units.map((unit, index) => (
                    <Card key={index} className="border">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">Unit {unit.number}</CardTitle>
                          <Badge variant={unit.status === "occupied" ? "default" : "secondary"}>{unit.status}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {unit.tenant && (
                          <div>
                            <p className="text-sm text-muted-foreground">Tenant</p>
                            <p className="font-medium">{unit.tenant}</p>
                          </div>
                        )}
                        <div>
                          <p className="text-sm text-muted-foreground">Monthly Rent</p>
                          <p className="font-medium text-green-600">${unit.rent.toLocaleString()}</p>
                        </div>
                        {unit.lease && (
                          <div>
                            <p className="text-sm text-muted-foreground">Lease Term</p>
                            <p className="font-medium">{unit.lease}</p>
                          </div>
                        )}
                        <Button variant="outline" size="sm" className="w-full bg-transparent">
                          {unit.status === "occupied" ? "View Details" : "List Unit"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance">
            <Card>
              <CardHeader>
                <CardTitle>Maintenance Requests</CardTitle>
                <CardDescription>Recent maintenance issues and work orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {maintenanceRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                          <Wrench className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <h4 className="font-semibold">Unit {request.unit}</h4>
                          <p className="text-sm text-muted-foreground">{request.issue}</p>
                          <p className="text-xs text-muted-foreground">{request.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            request.priority === "high"
                              ? "destructive"
                              : request.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {request.priority}
                        </Badge>
                        <p className="text-sm text-muted-foreground mt-1">{request.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="financials">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Breakdown</CardTitle>
                  <CardDescription>Monthly income sources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Rental Income</span>
                    <span className="font-semibold">${property.monthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Parking Fees</span>
                    <span className="font-semibold">$2,400</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Laundry Income</span>
                    <span className="font-semibold">$800</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Monthly Income</span>
                      <span className="text-green-600">${(property.monthlyRevenue + 2400 + 800).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                  <CardDescription>Operating costs and maintenance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Property Management</span>
                    <span className="font-semibold">$3,600</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="font-semibold">$2,800</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Insurance</span>
                    <span className="font-semibold">$1,200</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Utilities</span>
                    <span className="font-semibold">$1,800</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Monthly Expenses</span>
                      <span className="text-red-600">$9,400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
