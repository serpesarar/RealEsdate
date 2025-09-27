"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart3,
  Download,
  Calendar,
  Target,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function PropertyOwnerFinancials() {
  const incomeData = [
    { category: "Rental Income", amount: 116000, percentage: 78, trend: "up", change: 12.5 },
    { category: "Late Fees", amount: 2400, percentage: 2, trend: "down", change: -5.2 },
    { category: "Application Fees", amount: 1800, percentage: 1, trend: "up", change: 8.7 },
    { category: "Other Income", amount: 3200, percentage: 2, trend: "up", change: 15.3 },
  ]

  const expenseData = [
    { category: "Maintenance & Repairs", amount: 12400, percentage: 44, trend: "down", change: -8.2 },
    { category: "Property Management", amount: 5800, percentage: 20, trend: "stable", change: 0.5 },
    { category: "Insurance", amount: 3600, percentage: 13, trend: "up", change: 3.2 },
    { category: "Property Taxes", amount: 4200, percentage: 15, trend: "up", change: 2.1 },
    { category: "Utilities", amount: 2400, percentage: 8, trend: "down", change: -12.3 },
  ]

  const cashFlowData = [
    { month: "Jan", income: 98000, expenses: 24000, net: 74000 },
    { month: "Feb", income: 102000, expenses: 26000, net: 76000 },
    { month: "Mar", income: 108000, expenses: 22000, net: 86000 },
    { month: "Apr", income: 112000, expenses: 28000, net: 84000 },
    { month: "May", income: 116000, expenses: 28400, net: 87600 },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            Financial Overview
          </motion.h1>
          <p className="text-muted-foreground mt-1">Comprehensive financial analysis and reporting</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            This Month
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Revenue", value: "$123,400", change: "+12.5%", trend: "up", icon: DollarSign },
          { title: "Total Expenses", value: "$28,400", change: "-8.2%", trend: "down", icon: TrendingDown },
          { title: "Net Cash Flow", value: "$87,600", change: "+18.7%", trend: "up", icon: BarChart3 },
          { title: "Profit Margin", value: "71.2%", change: "+4.3%", trend: "up", icon: Target },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={metric.trend === "up" ? "text-green-600" : "text-red-600"}>{metric.change}</span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Income Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Income Breakdown
            </CardTitle>
            <CardDescription>Revenue sources for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incomeData.map((item, index) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.trend === "up" ? "default" : item.trend === "down" ? "destructive" : "secondary"}
                      >
                        {item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"} {Math.abs(item.change)}%
                      </Badge>
                      <span className="text-sm font-semibold">${item.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-red-600" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Operating expenses for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expenseData.map((item, index) => (
                <div key={item.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.category}</span>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.trend === "down" ? "default" : item.trend === "up" ? "destructive" : "secondary"}
                      >
                        {item.trend === "up" ? "↗" : item.trend === "down" ? "↘" : "→"} {Math.abs(item.change)}%
                      </Badge>
                      <span className="text-sm font-semibold">${item.amount.toLocaleString()}</span>
                    </div>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Cash Flow Analysis
          </CardTitle>
          <CardDescription>Monthly income vs expenses trend</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-4">
              <PieChart className="w-16 h-16 text-blue-600 mx-auto" />
              <div>
                <p className="text-lg font-semibold text-gray-900">Interactive Cash Flow Chart</p>
                <p className="text-sm text-muted-foreground">5-month trend analysis</p>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span>Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span>Expenses</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span>Net Cash Flow</span>
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4 mt-6">
                {cashFlowData.map((data, index) => (
                  <div key={data.month} className="text-center">
                    <div className="text-xs font-medium text-gray-600 mb-1">{data.month}</div>
                    <div className="text-sm font-semibold text-green-600">${(data.net / 1000).toFixed(0)}k</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-orange-600" />
            Financial Alerts & Recommendations
          </CardTitle>
          <CardDescription>Important financial insights and action items</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                type: "warning",
                title: "High Maintenance Costs",
                description: "Maintenance expenses are 15% above budget. Consider preventive maintenance program.",
                action: "Review Maintenance",
                priority: "medium",
              },
              {
                type: "success",
                title: "Strong Cash Flow",
                description: "Net cash flow increased 18.7% this month. Consider expansion opportunities.",
                action: "Explore Growth",
                priority: "low",
              },
              {
                type: "info",
                title: "Tax Optimization",
                description: "Q1 tax filing deadline approaching. Ensure all deductions are documented.",
                action: "Schedule Review",
                priority: "high",
              },
            ].map((alert, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === "warning"
                      ? "bg-orange-500"
                      : alert.type === "success"
                        ? "bg-green-500"
                        : "bg-blue-500"
                  }`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">{alert.title}</h4>
                    <Badge
                      variant={
                        alert.priority === "high"
                          ? "destructive"
                          : alert.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>
                  <Button size="sm" variant="outline">
                    {alert.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
