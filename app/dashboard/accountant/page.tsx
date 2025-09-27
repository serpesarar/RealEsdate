"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DollarSign,
  TrendingUp,
  FileText,
  Calculator,
  PieChart,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  Users,
  Receipt,
} from "lucide-react"

export default function AccountantDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")

  const financialMetrics = [
    {
      title: "Total Revenue",
      value: "$847,250",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Operating Expenses",
      value: "$324,180",
      change: "-3.2%",
      trend: "down",
      icon: TrendingUp,
      color: "text-blue-600",
    },
    {
      title: "Net Profit",
      value: "$523,070",
      change: "+18.7%",
      trend: "up",
      icon: PieChart,
      color: "text-purple-600",
    },
    {
      title: "Tax Liability",
      value: "$156,921",
      change: "+5.4%",
      trend: "up",
      icon: Calculator,
      color: "text-orange-600",
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      title: "Q4 Tax Filing Preparation",
      priority: "high",
      dueDate: "2024-01-15",
      status: "in-progress",
      properties: 12,
    },
    {
      id: 2,
      title: "Monthly Reconciliation - Building A",
      priority: "medium",
      dueDate: "2024-01-10",
      status: "pending",
      properties: 1,
    },
    {
      id: 3,
      title: "Expense Report Review",
      priority: "low",
      dueDate: "2024-01-20",
      status: "pending",
      properties: 8,
    },
    {
      id: 4,
      title: "Audit Documentation Update",
      priority: "high",
      dueDate: "2024-01-12",
      status: "overdue",
      properties: 15,
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      type: "income",
      description: "Rent Collection - Sunset Apartments",
      amount: 45600,
      date: "2024-01-08",
      category: "Rental Income",
    },
    {
      id: 2,
      type: "expense",
      description: "Maintenance - HVAC Repair",
      amount: 2850,
      date: "2024-01-07",
      category: "Maintenance",
    },
    {
      id: 3,
      type: "income",
      description: "Late Fee Collection",
      amount: 750,
      date: "2024-01-06",
      category: "Fees",
    },
    {
      id: 4,
      type: "expense",
      description: "Property Insurance Premium",
      amount: 8200,
      date: "2024-01-05",
      category: "Insurance",
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in-progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive financial overview and accounting management</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="w-4 h-4" />
            Export Reports
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Statement
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {financialMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p
                  className={`text-xs ${metric.trend === "up" ? "text-green-600" : "text-red-600"} flex items-center gap-1`}
                >
                  <TrendingUp className={`w-3 h-3 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Pending Tasks
              </CardTitle>
              <CardDescription>Financial tasks requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(task.status)}
                    <div>
                      <h4 className="font-medium">{task.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        Due: {task.dueDate}
                        <Building2 className="w-3 h-3 ml-2" />
                        {task.properties} properties
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Total Properties</span>
                </div>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Active Tenants</span>
                </div>
                <span className="font-semibold">187</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Monthly Transactions</span>
                </div>
                <span className="font-semibold">1,245</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between text-sm mb-2">
                  <span>Collection Rate</span>
                  <span>94.2%</span>
                </div>
                <Progress value={94.2} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentTransactions.slice(0, 4).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between text-sm">
                  <div className="flex-1">
                    <p className="font-medium truncate">{transaction.description}</p>
                    <p className="text-muted-foreground text-xs">{transaction.date}</p>
                  </div>
                  <div className={`font-semibold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString()}
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                View All Transactions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
