"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calculator,
  Building2,
  DollarSign,
  Upload,
  Eye,
} from "lucide-react"

export default function AccountantTax() {
  const [selectedYear, setSelectedYear] = useState("2024")

  const taxDocuments = [
    {
      id: 1,
      title: "Form 1120 - Corporate Income Tax",
      description: "Annual corporate tax return",
      year: "2024",
      status: "draft",
      dueDate: "2024-03-15",
      progress: 75,
      size: "2.1 MB",
    },
    {
      id: 2,
      title: "Schedule E - Rental Income",
      description: "Supplemental income and loss",
      year: "2024",
      status: "completed",
      dueDate: "2024-04-15",
      progress: 100,
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Form 4562 - Depreciation",
      description: "Depreciation and amortization",
      year: "2024",
      status: "in-progress",
      dueDate: "2024-04-15",
      progress: 45,
      size: "1.2 MB",
    },
    {
      id: 4,
      title: "State Tax Returns",
      description: "New York State tax filings",
      year: "2024",
      status: "pending",
      dueDate: "2024-04-15",
      progress: 0,
      size: "0.9 MB",
    },
  ]

  const taxSummary = {
    totalTaxLiability: 156921,
    estimatedPayments: 120000,
    remainingBalance: 36921,
    refundExpected: 0,
    deductions: 89450,
    depreciation: 45200,
  }

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Q1 Estimated Tax Payment",
      date: "2024-01-15",
      amount: 30000,
      status: "upcoming",
      daysLeft: 7,
    },
    {
      id: 2,
      title: "Annual Corporate Return Filing",
      date: "2024-03-15",
      amount: 0,
      status: "upcoming",
      daysLeft: 66,
    },
    {
      id: 3,
      title: "Property Tax Assessment Review",
      date: "2024-02-01",
      amount: 0,
      status: "upcoming",
      daysLeft: 24,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "pending":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "overdue":
        return "bg-red-100 text-red-800 border-red-200"
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
          <h1 className="text-3xl font-bold text-foreground">Tax Management</h1>
          <p className="text-muted-foreground">Manage tax documents, deadlines, and compliance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Upload className="w-4 h-4" />
            Upload Document
          </Button>
          <Button className="gap-2">
            <Calculator className="w-4 h-4" />
            Tax Calculator
          </Button>
        </div>
      </div>

      {/* Tax Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Tax Liability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">${taxSummary.totalTaxLiability.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total for 2024</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Payments Made</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">${taxSummary.estimatedPayments.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Estimated payments</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Remaining Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">${taxSummary.remainingBalance.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Amount due</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tax Documents */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Tax Documents
              </CardTitle>
              <CardDescription>Manage and track tax document preparation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {taxDocuments.map((doc) => (
                <div key={doc.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">{doc.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Due: {doc.dueDate}
                          </div>
                          <span>Size: {doc.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{doc.progress}%</span>
                    </div>
                    <Progress value={doc.progress} className="h-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Eye className="w-3 h-3" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                      <Download className="w-3 h-3" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Deadlines & Quick Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{deadline.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {deadline.daysLeft} days
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {deadline.date}
                    </div>
                    {deadline.amount > 0 && (
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />${deadline.amount.toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tax Deductions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Property Depreciation</span>
                </div>
                <span className="font-semibold">${taxSummary.depreciation.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Business Expenses</span>
                </div>
                <span className="font-semibold">
                  ${(taxSummary.deductions - taxSummary.depreciation).toLocaleString()}
                </span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between font-semibold">
                  <span>Total Deductions</span>
                  <span>${taxSummary.deductions.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
