"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, BarChart3 } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { OverviewStats } from "@/components/overview-stats"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your properties.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Building2 className="w-4 h-4 mr-2" />
            Add Property
          </Button>
        </div>

        {/* Overview Stats */}
        <OverviewStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <RecentActivity />
          </div>

          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Property Performance
            </CardTitle>
            <CardDescription>Top performing properties this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sunset Apartments", units: 24, occupancy: 96, revenue: "$48,200" },
                { name: "Downtown Lofts", units: 18, occupancy: 89, revenue: "$52,100" },
                { name: "Garden View Complex", units: 32, occupancy: 94, revenue: "$67,800" },
              ].map((property, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{property.name}</h4>
                      <p className="text-sm text-muted-foreground">{property.units} units</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={property.occupancy > 90 ? "default" : "secondary"}>
                        {property.occupancy}% occupied
                      </Badge>
                    </div>
                    <p className="font-semibold text-green-600">{property.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
