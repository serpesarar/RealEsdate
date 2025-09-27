"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  CreditCard,
  FileText,
  Phone,
  Plus,
  CheckCircle,
  Clock,
  Home,
  Calendar,
  Download,
  Eye,
  Menu,
} from "lucide-react"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"

export default function TenantDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createIssueOpen, setCreateIssueOpen] = useState(false)

  const tenantInfo = {
    name: "John Smith",
    unit: "12A",
    property: "Park Avenue Towers",
    leaseEnd: "December 31, 2025",
    rentAmount: 3500,
    nextPaymentDue: "January 1, 2025",
    paymentStatus: "paid",
  }

  const recentIssues = [
    {
      id: 1,
      title: "Kitchen sink leaking",
      status: "in_progress",
      priority: "high",
      createdAt: "2 days ago",
      assignedTo: "Mike Johnson",
    },
    {
      id: 2,
      title: "Broken light bulb in hallway",
      status: "completed",
      priority: "low",
      createdAt: "1 week ago",
      assignedTo: "Maintenance Team",
    },
  ]

  const documents = [
    {
      id: 1,
      name: "Lease Agreement",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "Dec 1, 2024",
    },
    {
      id: 2,
      name: "Move-in Checklist",
      type: "PDF",
      size: "1.2 MB",
      uploadedAt: "Dec 1, 2024",
    },
    {
      id: 3,
      name: "Building Rules",
      type: "PDF",
      size: "800 KB",
      uploadedAt: "Dec 1, 2024",
    },
  ]

  const paymentHistory = [
    {
      id: 1,
      month: "December 2024",
      amount: 3500,
      status: "paid",
      paidDate: "Dec 1, 2024",
    },
    {
      id: 2,
      month: "November 2024",
      amount: 3500,
      status: "paid",
      paidDate: "Nov 1, 2024",
    },
    {
      id: 3,
      month: "October 2024",
      amount: 3500,
      status: "paid",
      paidDate: "Oct 1, 2024",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

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
                  <h1 className="text-2xl font-bold text-foreground">Welcome back, {tenantInfo.name}</h1>
                  <p className="text-sm text-muted-foreground">
                    {tenantInfo.property} • Unit {tenantInfo.unit}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setCreateIssueOpen(true)}
                size="lg"
                className="bg-primary hover:bg-primary/90 shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Report Issue
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-green-700 dark:text-green-300">Rent Status</p>
                          <p className="text-2xl font-bold text-green-800 dark:text-green-200">Paid</p>
                          <p className="text-sm text-green-600 dark:text-green-400">
                            Next due: {tenantInfo.nextPaymentDue}
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
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Active Issues</p>
                          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                            {recentIssues.filter((i) => i.status !== "completed").length}
                          </p>
                          <p className="text-sm text-blue-600 dark:text-blue-400">
                            {recentIssues.filter((i) => i.status === "in_progress").length} in progress
                          </p>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-white" />
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
                          <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Lease Expires</p>
                          <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">11 months</p>
                          <p className="text-sm text-purple-600 dark:text-purple-400">{tenantInfo.leaseEnd}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="lg:col-span-2"
                >
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle>Recent Issues</CardTitle>
                          <CardDescription>Your maintenance requests and their status</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentIssues.map((issue) => (
                          <div
                            key={issue.id}
                            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center space-x-4">
                              {getStatusIcon(issue.status)}
                              <div>
                                <h4 className="font-medium">{issue.title}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Assigned to {issue.assignedTo} • {issue.createdAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}

                        {recentIssues.length === 0 && (
                          <div className="text-center py-8">
                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">No active issues</h3>
                            <p className="text-muted-foreground">Everything looks good! Report any new issues above.</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start bg-red-50 hover:bg-red-100 text-red-700 border-red-200">
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Contact
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Rent
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <FileText className="w-4 h-4 mr-2" />
                        View Lease
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Home className="w-4 h-4 mr-2" />
                        Building Info
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Documents</CardTitle>
                      <CardDescription>Your lease and important documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {documents.map((doc) => (
                          <div
                            key={doc.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                                <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{doc.name}</h4>
                                <p className="text-xs text-muted-foreground">
                                  {doc.size} • {doc.uploadedAt}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment History</CardTitle>
                      <CardDescription>Recent rent payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {paymentHistory.map((payment) => (
                          <div
                            key={payment.id}
                            className="flex items-center justify-between p-3 border border-border rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-sm">{payment.month}</h4>
                                <p className="text-xs text-muted-foreground">Paid on {payment.paidDate}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-sm">${payment.amount.toLocaleString()}</p>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Paid
                              </Badge>
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

        <CreateIssueDialog open={createIssueOpen} onOpenChange={setCreateIssueOpen} />
      </div>
    </div>
  )
}
