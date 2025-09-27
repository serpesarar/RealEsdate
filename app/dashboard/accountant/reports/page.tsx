"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  PieChart,
  BarChart3,
  DollarSign,
  Building2,
  Filter,
} from "lucide-react"

export default function AccountantReports() {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [selectedProperty, setSelectedProperty] = useState("all")

  const reports = [
    {
      id: 1,
      title: "Profit & Loss Statement",
      description: "Comprehensive income and expense analysis",
      period: "December 2024",
      status: "ready",
      size: "2.4 MB",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      id: 2,
      title: "Cash Flow Report",
      description: "Monthly cash flow analysis and projections",
      period: "Q4 2024",
      status: "generating",
      size: "1.8 MB",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      id: 3,
      title: "Property Performance",
      description: "Individual property financial performance",
      period: "December 2024",
      status: "ready",
      size: "3.2 MB",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      id: 4,
      title: "Tax Summary Report",
      description: "Annual tax preparation summary",
      period: "2024",
      status: "ready",
      size: "1.5 MB",
      icon: FileText,
      color: "text-orange-600",
    },
    {
      id: 5,
      title: "Expense Breakdown",
      description: "Detailed expense categorization and analysis",
      period: "December 2024",
      status: "ready",
      size: "2.1 MB",
      icon: PieChart,
      color: "text-red-600",
    },
    {
      id: 6,
      title: "Budget vs Actual",
      description: "Budget performance and variance analysis",
      period: "Q4 2024",
      status: "ready",
      size: "1.9 MB",
      icon: BarChart3,
      color: "text-indigo-600",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return "bg-green-100 text-green-800 border-green-200"
      case "generating":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "error":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financial Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive financial reports</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter Reports
          </Button>
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Custom Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Report Filters</CardTitle>
          <CardDescription>Customize report parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Property</label>
              <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="sunset">Sunset Apartments</SelectItem>
                  <SelectItem value="downtown">Downtown Plaza</SelectItem>
                  <SelectItem value="riverside">Riverside Complex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gray-100 ${report.color}`}>
                      <report.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{report.title}</CardTitle>
                      <CardDescription className="text-sm">{report.description}</CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>{report.period}</span>
                  </div>
                  <Badge className={getStatusColor(report.status)}>{report.status}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Size: {report.size}</span>
                  <Button size="sm" className="gap-2" disabled={report.status === "generating"}>
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
