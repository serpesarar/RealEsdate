"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, CheckCircle, MessageSquare, Camera, Star } from "lucide-react"

const stats = {
  openIssues: 2,
  inProgress: 1,
  resolved: 8,
  avgResolutionTime: 24,
}

const issues = [
  {
    id: 1,
    title: "Kitchen Faucet Leak",
    category: "Plumbing",
    urgency: "medium",
    status: "in-progress",
    description:
      "The kitchen faucet has been dripping constantly for the past 3 days. Water is pooling under the sink.",
    reportedAt: "2024-01-15 09:30 AM",
    assignedAt: "2024-01-15 10:15 AM",
    assignedTo: "Mike Johnson",
    scheduledFor: "2024-01-16 02:00 PM",
    photos: [
      { id: 1, url: "/placeholder.svg?height=100&width=100" },
      { id: 2, url: "/placeholder.svg?height=100&width=100" },
    ],
  },
  {
    id: 2,
    title: "HVAC Not Heating",
    category: "HVAC",
    urgency: "high",
    status: "scheduled",
    description:
      "The heating system is not working properly. Temperature hasn't gone above 65°F despite thermostat being set to 72°F.",
    reportedAt: "2024-01-14 06:45 PM",
    assignedAt: "2024-01-14 07:30 PM",
    assignedTo: "Sarah Wilson",
    scheduledFor: "2024-01-17 09:00 AM",
    photos: [],
  },
  {
    id: 3,
    title: "Bathroom Light Fixture",
    category: "Electrical",
    urgency: "low",
    status: "completed",
    description: "Light fixture in master bathroom is flickering intermittently.",
    reportedAt: "2024-01-10 02:15 PM",
    assignedAt: "2024-01-10 03:00 PM",
    assignedTo: "Tom Davis",
    completedAt: "2024-01-12 11:30 AM",
    photos: [],
  },
]

const history = [
  {
    id: 1,
    date: "2024-01-12",
    title: "Bathroom Light Fixture",
    resolution: "Replaced flickering light fixture with new LED fixture",
    cost: "$85",
  },
  {
    id: 2,
    date: "2024-01-08",
    title: "Garbage Disposal Repair",
    resolution: "Cleared jam and reset disposal unit",
    cost: "$45",
  },
  {
    id: 3,
    date: "2023-12-20",
    title: "Window Lock Replacement",
    resolution: "Replaced broken window lock mechanism",
    cost: "$35",
  },
]

function getCategoryIcon(category: string) {
  switch (category.toLowerCase()) {
    case "plumbing":
      return "🔧"
    case "hvac":
      return "🌡️"
    case "electrical":
      return "⚡"
    default:
      return "🔨"
  }
}

function getUrgencyColor(urgency: string) {
  switch (urgency) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200"
    case "medium":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "low":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-500 text-white"
    case "in-progress":
      return "bg-blue-500 text-white"
    case "scheduled":
      return "bg-purple-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function TenantMaintenancePage() {
  const [reportModalOpen, setReportModalOpen] = useState(false)

  return (
    <DashboardLayout userRole="tenant">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Maintenance & Repairs</h1>
            <p className="text-muted-foreground">Track and manage your maintenance requests</p>
          </div>
          <Button onClick={() => setReportModalOpen(true)} className="bg-orange-500 hover:bg-orange-600">
            <Plus className="w-4 h-4 mr-2" />
            Report New Issue
          </Button>
        </div>

        {/* Maintenance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.openIssues}</div>
              <div className="text-sm text-muted-foreground">Open Issues</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.resolved}</div>
              <div className="text-sm text-muted-foreground">Resolved</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.avgResolutionTime}h</div>
              <div className="text-sm text-muted-foreground">Avg Resolution</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Active Maintenance Requests</CardTitle>
            <CardDescription>Current issues being tracked and resolved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {issues
              .filter((issue) => issue.status !== "completed")
              .map((issue) => (
                <Card key={issue.id} className="border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getCategoryIcon(issue.category)}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{issue.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{issue.category}</Badge>
                            <Badge className={getUrgencyColor(issue.urgency)}>{issue.urgency}</Badge>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(issue.status)}>{issue.status.replace("-", " ")}</Badge>
                    </div>

                    <p className="text-muted-foreground mb-4">{issue.description}</p>

                    {issue.photos && issue.photos.length > 0 && (
                      <div className="flex gap-2 mb-4">
                        {issue.photos.map((photo) => (
                          <img
                            key={photo.id}
                            src={photo.url || "/placeholder.svg"}
                            alt="Issue photo"
                            className="w-20 h-20 object-cover rounded-lg border cursor-pointer hover:opacity-80"
                          />
                        ))}
                      </div>
                    )}

                    {/* Timeline */}
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        <span className="text-muted-foreground">{issue.reportedAt}</span>
                        <span>Issue Reported</span>
                      </div>
                      {issue.assignedAt && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-muted-foreground">{issue.assignedAt}</span>
                          <span>Assigned to {issue.assignedTo}</span>
                        </div>
                      )}
                      {issue.scheduledFor && (
                        <div className="flex items-center gap-3 text-sm">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-muted-foreground">{issue.scheduledFor}</span>
                          <span>Scheduled Visit</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                      <Button size="sm" variant="outline">
                        <Camera className="w-4 h-4 mr-1" />
                        Add Update
                      </Button>
                      {issue.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <Star className="w-4 h-4 mr-1" />
                          Rate Service
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </CardContent>
        </Card>

        {/* Maintenance History */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance History</CardTitle>
            <CardDescription>Previously completed maintenance requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.resolution}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.cost}</p>
                    <p className="text-sm text-muted-foreground">{item.date}</p>
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
