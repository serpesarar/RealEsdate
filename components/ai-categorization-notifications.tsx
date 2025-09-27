"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bell,
  Brain,
  AlertTriangle,
  CheckCircle,
  Clock,
  Settings,
  Eye,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
} from "lucide-react"
import { format } from "date-fns"

// Mock AI categorization data
const aiCategorizations = [
  {
    id: "AI-001",
    requestId: "MNT-001",
    originalDescription: "Kitchen faucet has been dripping constantly for the past week",
    aiCategory: "plumbing",
    aiSubcategory: "faucet_repair",
    confidence: 0.95,
    suggestedPriority: "medium",
    estimatedDuration: "1-2 hours",
    requiredSkills: ["plumbing", "basic_tools"],
    suggestedMaterials: ["faucet_cartridge", "o_rings", "pipe_compound"],
    urgencyScore: 6.5,
    complexityScore: 3.2,
    aiInsights: [
      "Dripping faucets typically indicate worn cartridge or O-rings",
      "Issue duration suggests moderate urgency to prevent water waste",
      "Standard repair with common materials available in inventory",
    ],
    processedAt: "2024-01-15T10:30:00Z",
    status: "confirmed",
  },
  {
    id: "AI-002",
    requestId: "MNT-002",
    originalDescription: "AC unit not cooling properly, making loud noises",
    aiCategory: "hvac",
    aiSubcategory: "compressor_issue",
    confidence: 0.88,
    suggestedPriority: "high",
    estimatedDuration: "3-4 hours",
    requiredSkills: ["hvac_certified", "electrical"],
    suggestedMaterials: ["compressor_unit", "refrigerant", "electrical_components"],
    urgencyScore: 8.7,
    complexityScore: 7.8,
    aiInsights: [
      "Loud noises combined with poor cooling suggest compressor failure",
      "High priority due to tenant comfort and potential system damage",
      "Requires HVAC certified technician for refrigerant handling",
    ],
    processedAt: "2024-01-14T14:20:00Z",
    status: "confirmed",
  },
  {
    id: "AI-003",
    requestId: "MNT-003",
    originalDescription: "Light fixture in master bathroom is flickering",
    aiCategory: "electrical",
    aiSubcategory: "lighting_issue",
    confidence: 0.92,
    suggestedPriority: "low",
    estimatedDuration: "30-60 minutes",
    requiredSkills: ["electrical_basic"],
    suggestedMaterials: ["led_bulbs", "light_fixture"],
    urgencyScore: 4.2,
    complexityScore: 2.1,
    aiInsights: [
      "Flickering typically indicates bulb replacement or fixture issue",
      "Low safety risk but should be addressed for tenant satisfaction",
      "Simple repair with standard electrical knowledge",
    ],
    processedAt: "2024-01-10T11:20:00Z",
    status: "confirmed",
  },
]

const notifications = [
  {
    id: "NOTIF-001",
    type: "ai_categorization",
    title: "New Request Auto-Categorized",
    message: "Kitchen faucet repair automatically categorized as plumbing with 95% confidence",
    priority: "medium",
    timestamp: "2024-01-15T10:30:00Z",
    read: false,
    actionRequired: false,
    relatedId: "MNT-001",
    aiGenerated: true,
  },
  {
    id: "NOTIF-002",
    type: "priority_alert",
    title: "High Priority Issue Detected",
    message: "HVAC compressor failure detected - requires immediate attention",
    priority: "high",
    timestamp: "2024-01-14T14:20:00Z",
    read: false,
    actionRequired: true,
    relatedId: "MNT-002",
    aiGenerated: true,
  },
  {
    id: "NOTIF-003",
    type: "inventory_prediction",
    title: "Inventory Shortage Predicted",
    message: "AI predicts faucet cartridge shortage in 2 weeks based on usage patterns",
    priority: "medium",
    timestamp: "2024-01-14T09:15:00Z",
    read: true,
    actionRequired: true,
    relatedId: "INV-001",
    aiGenerated: true,
  },
  {
    id: "NOTIF-004",
    type: "efficiency_insight",
    title: "Efficiency Improvement Suggested",
    message: "Grouping electrical repairs in Building A could save 30% travel time",
    priority: "low",
    timestamp: "2024-01-13T16:45:00Z",
    read: true,
    actionRequired: false,
    relatedId: null,
    aiGenerated: true,
  },
  {
    id: "NOTIF-005",
    type: "maintenance_request",
    title: "New Maintenance Request",
    message: "Tenant Sarah Johnson submitted a new plumbing request",
    priority: "medium",
    timestamp: "2024-01-13T11:30:00Z",
    read: true,
    actionRequired: true,
    relatedId: "MNT-001",
    aiGenerated: false,
  },
]

const aiSettings = {
  autoCategorization: true,
  priorityDetection: true,
  inventoryPrediction: true,
  efficiencyInsights: true,
  notificationFrequency: "immediate",
  confidenceThreshold: 0.8,
  autoAssignment: false,
  learningMode: true,
}

const aiStats = {
  totalProcessed: 127,
  accuracyRate: 94.2,
  timesSaved: "15.3 hours",
  correctPredictions: 89,
  falsePositives: 8,
  avgConfidence: 0.91,
}

function getPriorityColor(priority: string) {
  switch (priority) {
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

function getNotificationIcon(type: string) {
  switch (type) {
    case "ai_categorization":
      return <Brain className="h-4 w-4" />
    case "priority_alert":
      return <AlertTriangle className="h-4 w-4" />
    case "inventory_prediction":
      return <Target className="h-4 w-4" />
    case "efficiency_insight":
      return <TrendingUp className="h-4 w-4" />
    default:
      return <Bell className="h-4 w-4" />
  }
}

function getConfidenceColor(confidence: number) {
  if (confidence >= 0.9) return "text-green-600"
  if (confidence >= 0.8) return "text-yellow-600"
  return "text-red-600"
}

interface AiCategorizationNotificationsProps {
  userRole?: "manager" | "owner" | "handyman"
}

export function AiCategorizationNotifications({ userRole = "manager" }: AiCategorizationNotificationsProps) {
  const [settings, setSettings] = useState(aiSettings)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [filterType, setFilterType] = useState("all")
  const [showOnlyUnread, setShowOnlyUnread] = useState(false)

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    console.log("AI setting changed:", key, value)
  }

  const markAsRead = (notificationId: string) => {
    console.log("Marking notification as read:", notificationId)
  }

  const markAllAsRead = () => {
    console.log("Marking all notifications as read")
  }

  const filteredNotifications = notifications.filter((notif) => {
    const matchesType = filterType === "all" || notif.type === filterType
    const matchesRead = !showOnlyUnread || !notif.read
    return matchesType && matchesRead
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">AI Categorization & Notifications</h2>
          <p className="text-muted-foreground">Intelligent automation and smart alerts for maintenance management</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
          {unreadCount > 0 && <Badge variant="destructive">{unreadCount} unread</Badge>}
        </div>
      </div>

      {/* AI Performance Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processed</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiStats.totalProcessed}</div>
            <p className="text-xs text-muted-foreground">Total requests</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{aiStats.accuracyRate}%</div>
            <p className="text-xs text-muted-foreground">Classification accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Saved</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{aiStats.timesSaved}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{aiStats.correctPredictions}</div>
            <p className="text-xs text-muted-foreground">Correct predictions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confidence</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(aiStats.avgConfidence * 100)}%</div>
            <p className="text-xs text-muted-foreground">Average confidence</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">False Positives</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{aiStats.falsePositives}</div>
            <p className="text-xs text-muted-foreground">Incorrect classifications</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="notifications">Smart Notifications</TabsTrigger>
          <TabsTrigger value="categorization">AI Categorization</TabsTrigger>
          <TabsTrigger value="settings">AI Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Notifications</SelectItem>
                      <SelectItem value="ai_categorization">AI Categorization</SelectItem>
                      <SelectItem value="priority_alert">Priority Alerts</SelectItem>
                      <SelectItem value="inventory_prediction">Inventory Predictions</SelectItem>
                      <SelectItem value="efficiency_insight">Efficiency Insights</SelectItem>
                      <SelectItem value="maintenance_request">Maintenance Requests</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="flex items-center space-x-2">
                    <Switch id="unread-only" checked={showOnlyUnread} onCheckedChange={setShowOnlyUnread} />
                    <Label htmlFor="unread-only">Unread only</Label>
                  </div>
                </div>

                <Button variant="outline" size="sm" onClick={markAllAsRead}>
                  Mark All Read
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`hover:shadow-md transition-shadow ${
                  !notification.read ? "border-blue-200 bg-blue-50/30" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`p-2 rounded-full ${notification.aiGenerated ? "bg-blue-100" : "bg-gray-100"}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {notification.aiGenerated && (
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                              <Sparkles className="w-2 h-2 mr-1" />
                              AI
                            </Badge>
                          )}
                          <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                            {notification.priority}
                          </Badge>
                          {!notification.read && (
                            <Badge variant="destructive" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{notification.message}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{format(new Date(notification.timestamp), "MMM d, h:mm a")}</span>
                          {notification.relatedId && <span>Related: {notification.relatedId}</span>}
                          {notification.actionRequired && (
                            <Badge variant="outline" className="text-orange-600 border-orange-200">
                              Action Required
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{notification.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label>Message</Label>
                              <p className="text-sm text-muted-foreground">{notification.message}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Priority</Label>
                                <Badge variant="outline" className={getPriorityColor(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                              <div>
                                <Label>Type</Label>
                                <div className="text-sm capitalize">{notification.type.replace("_", " ")}</div>
                              </div>
                              <div>
                                <Label>Timestamp</Label>
                                <div className="text-sm">
                                  {format(new Date(notification.timestamp), "MMM d, yyyy h:mm a")}
                                </div>
                              </div>
                              <div>
                                <Label>AI Generated</Label>
                                <div className="text-sm">{notification.aiGenerated ? "Yes" : "No"}</div>
                              </div>
                            </div>
                            {notification.relatedId && (
                              <div>
                                <Label>Related Item</Label>
                                <div className="text-sm">{notification.relatedId}</div>
                              </div>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                      {!notification.read && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(notification.id)}>
                          Mark Read
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorization" className="space-y-6">
          {/* AI Categorization Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent AI Categorizations</CardTitle>
              <CardDescription>Automatic categorization and analysis of maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiCategorizations.map((categorization) => (
                  <Card key={categorization.id} className="p-4 border-l-4 border-l-blue-500">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">Request {categorization.requestId}</h3>
                            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              <Brain className="w-3 h-3 mr-1" />
                              AI Categorized
                            </Badge>
                            <Badge variant="outline" className={`${getConfidenceColor(categorization.confidence)}`}>
                              {Math.round(categorization.confidence * 100)}% confidence
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">"{categorization.originalDescription}"</p>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          {format(new Date(categorization.processedAt), "MMM d, h:mm a")}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-xs">Category</Label>
                          <div className="font-medium capitalize">{categorization.aiCategory}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {categorization.aiSubcategory.replace("_", " ")}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Priority</Label>
                          <Badge variant="outline" className={getPriorityColor(categorization.suggestedPriority)}>
                            {categorization.suggestedPriority}
                          </Badge>
                        </div>
                        <div>
                          <Label className="text-xs">Duration</Label>
                          <div className="text-sm">{categorization.estimatedDuration}</div>
                        </div>
                        <div>
                          <Label className="text-xs">Complexity</Label>
                          <div className="text-sm">{categorization.complexityScore}/10</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-xs">Required Skills</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {categorization.requiredSkills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label className="text-xs">Suggested Materials</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {categorization.suggestedMaterials.map((material, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {material.replace("_", " ")}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs">AI Insights</Label>
                        <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                          {categorization.aiInsights.map((insight, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Confirm
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="w-3 h-3 mr-1" />
                          Adjust
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* AI Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI Configuration</CardTitle>
              <CardDescription>Configure AI behavior and notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Automation Features</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Categorization</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically categorize new maintenance requests
                        </div>
                      </div>
                      <Switch
                        checked={settings.autoCategorization}
                        onCheckedChange={(value) => handleSettingChange("autoCategorization", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Priority Detection</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically detect and flag high-priority issues
                        </div>
                      </div>
                      <Switch
                        checked={settings.priorityDetection}
                        onCheckedChange={(value) => handleSettingChange("priorityDetection", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Inventory Prediction</Label>
                        <div className="text-sm text-muted-foreground">
                          Predict inventory shortages based on usage patterns
                        </div>
                      </div>
                      <Switch
                        checked={settings.inventoryPrediction}
                        onCheckedChange={(value) => handleSettingChange("inventoryPrediction", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Efficiency Insights</Label>
                        <div className="text-sm text-muted-foreground">
                          Generate suggestions for operational improvements
                        </div>
                      </div>
                      <Switch
                        checked={settings.efficiencyInsights}
                        onCheckedChange={(value) => handleSettingChange("efficiencyInsights", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Auto-Assignment</Label>
                        <div className="text-sm text-muted-foreground">
                          Automatically assign requests to best-suited handymen
                        </div>
                      </div>
                      <Switch
                        checked={settings.autoAssignment}
                        onCheckedChange={(value) => handleSettingChange("autoAssignment", value)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Learning Mode</Label>
                        <div className="text-sm text-muted-foreground">
                          Allow AI to learn from corrections and feedback
                        </div>
                      </div>
                      <Switch
                        checked={settings.learningMode}
                        onCheckedChange={(value) => handleSettingChange("learningMode", value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Notification Settings</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Notification Frequency</Label>
                      <Select
                        value={settings.notificationFrequency}
                        onValueChange={(value) => handleSettingChange("notificationFrequency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Immediate</SelectItem>
                          <SelectItem value="hourly">Hourly Digest</SelectItem>
                          <SelectItem value="daily">Daily Summary</SelectItem>
                          <SelectItem value="weekly">Weekly Report</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Confidence Threshold</Label>
                      <Select
                        value={settings.confidenceThreshold.toString()}
                        onValueChange={(value) => handleSettingChange("confidenceThreshold", Number.parseFloat(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.6">60% - More suggestions</SelectItem>
                          <SelectItem value="0.7">70% - Balanced</SelectItem>
                          <SelectItem value="0.8">80% - High confidence</SelectItem>
                          <SelectItem value="0.9">90% - Very high confidence</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">AI Performance</h3>
                      <p className="text-sm text-muted-foreground">Current AI model accuracy and learning progress</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </Button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{aiStats.accuracyRate}%</div>
                      <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{aiStats.totalProcessed}</div>
                      <div className="text-sm text-muted-foreground">Requests Processed</div>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{aiStats.timesSaved}</div>
                      <div className="text-sm text-muted-foreground">Time Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
