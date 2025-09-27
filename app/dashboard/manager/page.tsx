"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MapPin, Clock, TrendingUp, AlertTriangle, CheckCircle, Users, Eye, MessageSquare } from "lucide-react"

export default function ManagerDashboard() {
  const liveIssues = [
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      property: "Sunset Apartments",
      unit: "2B",
      priority: "high",
      time: "2 min ago",
    },
    {
      id: 2,
      title: "AC Not Working",
      property: "Oak Street Complex",
      unit: "5A",
      priority: "urgent",
      time: "5 min ago",
    },
    { id: 3, title: "Broken Window", property: "Pine View", unit: "1C", priority: "medium", time: "12 min ago" },
  ]

  const handymanLocations = [
    { id: 1, name: "Mike Johnson", location: "Sunset Apartments", status: "on-site", eta: "Working" },
    { id: 2, name: "Tom Rodriguez", location: "En route to Oak Street", status: "traveling", eta: "15 min" },
    { id: 3, name: "Sarah Wilson", location: "Available", status: "available", eta: "Ready" },
  ]

  const approvalQueue = [
    { id: 1, type: "High-cost repair", description: "HVAC replacement - $2,400", property: "Oak Street", urgent: true },
    {
      id: 2,
      type: "Contractor application",
      description: "New plumber - Rodriguez Plumbing",
      property: "All",
      urgent: false,
    },
    {
      id: 3,
      type: "Lease renewal",
      description: "Unit 3B - 12 month extension",
      property: "Sunset Apartments",
      urgent: false,
    },
  ]

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Operations Center</h1>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 text-xs md:text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            All Systems Operational
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <MapPin className="w-4 h-4 md:w-5 md:h-5" />
              Live Property Map
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">
              Real-time overview of properties and active maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted rounded-lg h-48 md:h-64 flex items-center justify-center">
              <div className="text-center space-y-2 p-4">
                <MapPin className="w-8 h-8 md:w-12 md:h-12 text-muted-foreground mx-auto" />
                <p className="text-xs md:text-sm text-muted-foreground">Interactive map with property pins</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span>Urgent Issues</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span>Handyman Locations</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>Completed Today</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Clock className="w-4 h-4 md:w-5 md:h-5" />
              Live Activity Feed
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Real-time updates from all properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              {liveIssues.map((issue) => (
                <div key={issue.id} className="flex items-center gap-3 p-2 md:p-3 rounded-lg border border-border">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${
                      issue.priority === "urgent"
                        ? "bg-red-500"
                        : issue.priority === "high"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs md:text-sm">{issue.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {issue.property} - Unit {issue.unit}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground flex-shrink-0">{issue.time}</div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full bg-transparent h-8 text-xs md:text-sm">
                <Eye className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                View All Activity
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
            Performance Metrics
          </CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Key performance indicators for property management
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium">Response Time</span>
                <span className="text-xs md:text-sm text-muted-foreground">Avg: 12 min</span>
              </div>
              <Progress value={85} className="h-2" />
              <div className="text-xs text-muted-foreground">Target: &lt;15 min</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium">Resolution Rate</span>
                <span className="text-xs md:text-sm text-muted-foreground">94%</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="text-xs text-muted-foreground">Target: &gt;90%</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium">Tenant Satisfaction</span>
                <span className="text-xs md:text-sm text-muted-foreground">4.7/5</span>
              </div>
              <Progress value={94} className="h-2" />
              <div className="text-xs text-muted-foreground">Based on 127 ratings</div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm font-medium">Cost Efficiency</span>
                <span className="text-xs md:text-sm text-muted-foreground">-8% vs last month</span>
              </div>
              <Progress value={78} className="h-2" />
              <div className="text-xs text-muted-foreground">$2,340 saved</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              Handyman Locations
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Real-time tracking of maintenance staff</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              {handymanLocations.map((handyman) => (
                <div key={handyman.id} className="flex items-center gap-3 p-2 md:p-3 rounded-lg border border-border">
                  <Avatar className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                    <AvatarFallback className="text-xs">
                      {handyman.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-xs md:text-sm">{handyman.name}</div>
                    <div className="text-xs text-muted-foreground">{handyman.location}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge
                      variant={
                        handyman.status === "on-site"
                          ? "default"
                          : handyman.status === "traveling"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {handyman.eta}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" />
              Approval Queue
            </CardTitle>
            <CardDescription className="text-xs md:text-sm">Items requiring manager approval</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 md:space-y-3">
              {approvalQueue.map((item) => (
                <div key={item.id} className="p-2 md:p-3 rounded-lg border border-border">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {item.type}
                      </Badge>
                      {item.urgent && (
                        <Badge variant="destructive" className="text-xs">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-xs md:text-sm font-medium mb-1">{item.description}</div>
                  <div className="text-xs text-muted-foreground mb-3">{item.property}</div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button size="sm" className="h-8 text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Approve
                    </Button>
                    <Button variant="outline" size="sm" className="h-8 text-xs bg-transparent">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
