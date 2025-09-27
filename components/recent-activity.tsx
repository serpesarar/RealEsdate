"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Wrench, UserPlus, FileText, Clock } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "payment",
    title: "Payment Received",
    description: "Sarah Johnson - Apt 4B - $2,400",
    time: "2 hours ago",
    icon: DollarSign,
    status: "success",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: 2,
    type: "maintenance",
    title: "Maintenance Request",
    description: "Leaky faucet in Unit 12A - Assigned to Mike",
    time: "4 hours ago",
    icon: Wrench,
    status: "pending",
    gradient: "from-orange-500 to-orange-600",
  },
  {
    id: 3,
    type: "tenant",
    title: "New Tenant Application",
    description: "Alex Chen applied for Unit 8C",
    time: "6 hours ago",
    icon: UserPlus,
    status: "review",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: 4,
    type: "lease",
    title: "Lease Renewal",
    description: "Maria Rodriguez renewed lease for Unit 3A",
    time: "1 day ago",
    icon: FileText,
    status: "success",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: 5,
    type: "maintenance",
    title: "Work Order Completed",
    description: "HVAC repair in Unit 15B completed",
    time: "2 days ago",
    icon: Wrench,
    status: "success",
    gradient: "from-teal-500 to-teal-600",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "success":
      return "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 backdrop-blur-sm"
    case "pending":
      return "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200/50 backdrop-blur-sm"
    case "review":
      return "bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 backdrop-blur-sm"
    default:
      return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200/50 backdrop-blur-sm"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest updates from your properties</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm border border-white/20 dark:border-slate-700/30 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-200"
            >
              <div
                className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-lg flex items-center justify-center shadow-lg`}
              >
                <activity.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{activity.title}</h4>
                  <Badge className={getStatusColor(activity.status)}>{activity.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
