"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  DollarSign,
  Star,
  Upload,
  MessageSquare,
  Phone,
  MapPin,
  Menu,
} from "lucide-react"

export default function ContractorPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const contractorInfo = {
    name: "Mike Johnson",
    avatar: "MJ",
    specialty: "Plumbing",
    rating: 4.8,
    completedJobs: 156,
    activeJobs: 3,
    totalEarnings: 24500,
    thisMonthEarnings: 3200,
  }

  const assignedTasks = [
    {
      id: 1,
      title: "Kitchen sink leaking",
      property: "Park Avenue Towers",
      unit: "12A",
      tenant: "John Smith",
      priority: "HIGH",
      status: "in_progress",
      scheduledDate: "Today, 2:00 PM",
      estimatedDuration: "2 hours",
      description: "Water is dripping constantly under the kitchen sink. Tenant reports it's getting worse.",
      contactInfo: "(555) 123-4567",
    },
    {
      id: 2,
      title: "Bathroom pipe repair",
      property: "Sunset Gardens",
      unit: "8B",
      tenant: "Sarah Wilson",
      priority: "MEDIUM",
      status: "scheduled",
      scheduledDate: "Tomorrow, 10:00 AM",
      estimatedDuration: "3 hours",
      description: "Pipe behind bathroom wall needs repair. Water damage visible.",
      contactInfo: "(555) 234-5678",
    },
    {
      id: 3,
      title: "Water heater maintenance",
      property: "Metro Plaza",
      unit: "5C",
      tenant: "Emily Johnson",
      priority: "LOW",
      status: "pending",
      scheduledDate: "Dec 18, 9:00 AM",
      estimatedDuration: "1 hour",
      description: "Routine maintenance check for water heater.",
      contactInfo: "(555) 345-6789",
    },
  ]

  const recentCompletedJobs = [
    {
      id: 1,
      title: "Toilet repair",
      property: "Downtown Heights",
      completedDate: "Dec 10, 2024",
      rating: 5,
      earnings: 150,
    },
    {
      id: 2,
      title: "Faucet installation",
      property: "Park Avenue Towers",
      completedDate: "Dec 8, 2024",
      rating: 4,
      earnings: 200,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "scheduled":
        return <Calendar className="w-4 h-4 text-purple-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Welcome back, {contractorInfo.name}</h1>
                <p className="text-sm text-muted-foreground">{contractorInfo.specialty} Specialist</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="font-semibold">{contractorInfo.rating}</span>
              </div>
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary text-primary-foreground">{contractorInfo.avatar}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Active Jobs</p>
                        <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                          {contractorInfo.activeJobs}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-700 dark:text-green-300">Completed</p>
                        <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                          {contractorInfo.completedJobs}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-0 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700 dark:text-purple-300">This Month</p>
                        <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                          ${contractorInfo.thisMonthEarnings.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">Total Earnings</p>
                        <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">
                          ${contractorInfo.totalEarnings.toLocaleString()}
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Assigned Tasks */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="lg:col-span-2"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Assigned Tasks</CardTitle>
                    <CardDescription>Your current and upcoming maintenance jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {assignedTasks.map((task) => (
                        <div
                          key={task.id}
                          className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(task.status)}
                                <h4 className="font-medium">{task.title}</h4>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {task.property} • Unit {task.unit}
                              </p>
                            </div>
                            <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          </div>

                          <p className="text-sm text-muted-foreground mb-3">{task.description}</p>

                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-muted-foreground" />
                              <span>{task.scheduledDate}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>{task.estimatedDuration}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                              <span>{task.contactInfo}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{task.tenant}</span>
                            </div>
                          </div>

                          <div className="flex space-x-2 mt-4">
                            <Button size="sm" className="flex-1">
                              Update Status
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Contact
                            </Button>
                            <Button size="sm" variant="outline">
                              <Upload className="w-4 h-4 mr-1" />
                              Photos
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Recent Completed Jobs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Completed</CardTitle>
                    <CardDescription>Your latest finished jobs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentCompletedJobs.map((job) => (
                        <div key={job.id} className="border border-border rounded-lg p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-sm">{job.title}</h4>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{job.rating}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{job.property}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">{job.completedDate}</span>
                              <span className="text-sm font-medium text-green-600">+${job.earnings}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
