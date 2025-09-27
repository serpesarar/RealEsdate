"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  TrendingUp,
  DollarSign,
  Download,
  AlertCircle,
  Calculator,
  Building2,
  Wallet,
  Receipt,
  TrendingUpIcon,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  CreditCard,
  Banknote,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  Upload,
  PlusCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function FinancialCenterPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedProperty, setSelectedProperty] = useState("all")
  const [pendingExpenses, setPendingExpenses] = useState([
    {
      id: 1,
      category: "Maintenance",
      amount: 1250,
      description: "HVAC repair - Unit 3B",
      property: "Sunset Apartments",
      date: "2024-01-15",
      status: "pending",
    },
    {
      id: 2,
      category: "Utilities",
      amount: 890,
      description: "Electric bill - December",
      property: "Downtown Lofts",
      date: "2024-01-14",
      status: "pending",
    },
    {
      id: 3,
      category: "Insurance",
      amount: 2100,
      description: "Property insurance renewal",
      property: "Garden View Complex",
      date: "2024-01-13",
      status: "pending",
    },
  ])

  const portfolioMetrics = {
    totalRevenue: 206800,
    totalExpenses: 58400,
    netCashFlow: 148400,
    profitMargin: 71.8,
    roi: 12.4,
    capRate: 8.9,
    cashOnCashReturn: 14.2,
    totalEquity: 2850000,
    totalDebt: 1200000,
    debtToEquity: 42.1,
    monthlyGrowth: 8.7,
    yearlyGrowth: 24.3,
  }

  const incomeStreams = [
    { category: "Rental Income", amount: 186000, percentage: 90, trend: "up", change: 12.5, monthly: 15500 },
    { category: "Parking Fees", amount: 9600, percentage: 5, trend: "up", change: 8.2, monthly: 800 },
    { category: "Late Fees", amount: 4800, percentage: 2, trend: "down", change: -5.2, monthly: 400 },
    { category: "Application Fees", amount: 3600, percentage: 2, trend: "up", change: 15.3, monthly: 300 },
    { category: "Laundry Income", amount: 2800, percentage: 1, trend: "stable", change: 2.1, monthly: 233 },
  ]

  const expenseCategories = [
    { category: "Maintenance & Repairs", amount: 18600, percentage: 32, trend: "down", change: -8.2, monthly: 1550 },
    { category: "Property Management", amount: 12400, percentage: 21, trend: "stable", change: 0.5, monthly: 1033 },
    { category: "Insurance", amount: 8400, percentage: 14, trend: "up", change: 3.2, monthly: 700 },
    { category: "Property Taxes", amount: 9600, percentage: 16, trend: "up", change: 2.1, monthly: 800 },
    { category: "Utilities", amount: 4800, percentage: 8, trend: "down", change: -12.3, monthly: 400 },
    { category: "Marketing & Advertising", amount: 2400, percentage: 4, trend: "up", change: 18.5, monthly: 200 },
    { category: "Legal & Professional", amount: 2200, percentage: 4, trend: "stable", change: 1.2, monthly: 183 },
  ]

  const propertyPerformance = [
    { name: "Sunset Apartments", revenue: 48200, expenses: 12400, netIncome: 35800, roi: 14.2, capRate: 9.1 },
    { name: "Downtown Lofts", revenue: 52100, expenses: 15200, netIncome: 36900, roi: 12.8, capRate: 8.7 },
    { name: "Garden View Complex", revenue: 67800, expenses: 18600, netIncome: 49200, roi: 13.5, capRate: 8.9 },
    { name: "Riverside Condos", revenue: 38400, expenses: 9800, netIncome: 28600, roi: 11.9, capRate: 8.2 },
  ]

  const taxOptimization = [
    { category: "Depreciation", amount: 24000, savings: 7200, description: "Building depreciation deduction" },
    { category: "Repairs & Maintenance", amount: 18600, savings: 5580, description: "Deductible repair expenses" },
    {
      category: "Professional Services",
      amount: 8400,
      savings: 2520,
      description: "Legal, accounting, and management fees",
    },
    { category: "Interest Expense", amount: 36000, savings: 10800, description: "Mortgage interest deduction" },
    {
      category: "Travel & Transportation",
      amount: 3200,
      savings: 960,
      description: "Property-related travel expenses",
    },
  ]

  const cashFlowForecast = [
    { month: "Jan", income: 198000, expenses: 54000, net: 144000, cumulative: 144000 },
    { month: "Feb", income: 202000, expenses: 56000, net: 146000, cumulative: 290000 },
    { month: "Mar", income: 206000, expenses: 52000, net: 154000, cumulative: 444000 },
    { month: "Apr", income: 208000, expenses: 58000, net: 150000, cumulative: 594000 },
    { month: "May", income: 212000, expenses: 60000, net: 152000, cumulative: 746000 },
    { month: "Jun", income: 215000, expenses: 55000, net: 160000, cumulative: 906000 },
  ]

  const revenueStreams = {
    rentCollection: {
      currentMonth: 186000,
      collected: 178500,
      outstanding: 7500,
      latePayments: 3,
      collectionRate: 96.0,
    },
    additionalIncome: {
      parkingFees: 9600,
      laundryIncome: 2800,
      lateFeesCollected: 4800,
      applicationFees: 3600,
      petFees: 1800,
      storageRental: 1200,
    },
  }

  const bankAccounts = [
    {
      id: 1,
      name: "Operating Account",
      type: "Checking",
      balance: 145600,
      bank: "Chase Business",
      accountNumber: "****1234",
      lastTransaction: "2024-01-15",
    },
    {
      id: 2,
      name: "Security Deposits",
      type: "Savings",
      balance: 89400,
      bank: "Wells Fargo",
      accountNumber: "****5678",
      lastTransaction: "2024-01-12",
    },
    {
      id: 3,
      name: "Reserve Fund",
      type: "Money Market",
      balance: 234800,
      bank: "Bank of America",
      accountNumber: "****9012",
      lastTransaction: "2024-01-10",
    },
  ]

  const recentTransactions = [
    {
      id: 1,
      date: "2024-01-15",
      description: "Rent Payment - Unit 2A",
      amount: 2400,
      type: "income",
      account: "Operating Account",
    },
    {
      id: 2,
      date: "2024-01-15",
      description: "HVAC Repair Invoice",
      amount: -1250,
      type: "expense",
      account: "Operating Account",
    },
    {
      id: 3,
      date: "2024-01-14",
      description: "Security Deposit - New Tenant",
      amount: 2400,
      type: "deposit",
      account: "Security Deposits",
    },
    {
      id: 4,
      date: "2024-01-14",
      description: "Property Management Fee",
      amount: -1850,
      type: "expense",
      account: "Operating Account",
    },
    {
      id: 5,
      date: "2024-01-13",
      description: "Late Fee Collection",
      amount: 150,
      type: "income",
      account: "Operating Account",
    },
  ]

  const taxDocuments = [
    { type: "1099-MISC", year: 2023, status: "ready", count: 12, dueDate: "2024-01-31" },
    { type: "Schedule E", year: 2023, status: "draft", count: 1, dueDate: "2024-04-15" },
    { type: "Depreciation Schedule", year: 2023, status: "ready", count: 4, dueDate: "2024-04-15" },
    { type: "Expense Summary", year: 2023, status: "ready", count: 1, dueDate: "2024-04-15" },
  ]

  const approveExpense = (id: number) => {
    setPendingExpenses((prev) => prev.map((exp) => (exp.id === id ? { ...exp, status: "approved" } : exp)))
  }

  const rejectExpense = (id: number) => {
    setPendingExpenses((prev) => prev.map((exp) => (exp.id === id ? { ...exp, status: "rejected" } : exp)))
  }

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === "up") return <ArrowUpRight className="w-3 h-3 text-green-600" />
    if (trend === "down") return <ArrowDownRight className="w-3 h-3 text-red-600" />
    return <TrendingUpIcon className="w-3 h-3 text-gray-600" />
  }

  const getTrendColor = (trend: string) => {
    if (trend === "up") return "text-green-600"
    if (trend === "down") return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Financial Center
          </h1>
          <p className="text-muted-foreground mt-2">Comprehensive financial management and portfolio insights</p>
        </motion.div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="sunset">Sunset Apartments</SelectItem>
              <SelectItem value="downtown">Downtown Lofts</SelectItem>
              <SelectItem value="garden">Garden View Complex</SelectItem>
              <SelectItem value="riverside">Riverside Condos</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Total Revenue",
            value: `$${portfolioMetrics.totalRevenue.toLocaleString()}`,
            change: `+${portfolioMetrics.monthlyGrowth}%`,
            trend: "up",
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
          },
          {
            title: "Total Expenses",
            value: `$${portfolioMetrics.totalExpenses.toLocaleString()}`,
            change: "-3.2%",
            trend: "down",
            icon: Receipt,
            gradient: "from-red-500 to-rose-600",
            bgGradient: "from-red-50 to-rose-50",
          },
          {
            title: "Net Operating Income",
            value: `$${portfolioMetrics.netCashFlow.toLocaleString()}`,
            change: `+${portfolioMetrics.yearlyGrowth}%`,
            trend: "up",
            icon: TrendingUp,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
          },
          {
            title: "Cash Flow",
            value: `$${(portfolioMetrics.netCashFlow * 0.85).toLocaleString()}`,
            change: "+5.8%",
            trend: "up",
            icon: Banknote,
            gradient: "from-purple-500 to-pink-600",
            bgGradient: "from-purple-50 to-pink-50",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.bgGradient} opacity-50`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-sm font-medium text-gray-700">{metric.title}</CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.gradient}`}>
                  <metric.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  {getTrendIcon(metric.trend, 0)}
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Financial Tabs */}
      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="taxes">Tax Documents</TabsTrigger>
          <TabsTrigger value="forecast">Forecast</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-blue-600" />
                  Portfolio Financial Health
                </CardTitle>
                <CardDescription>Key financial ratios and performance indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Profit Margin</span>
                      <span className="font-semibold text-green-600">{portfolioMetrics.profitMargin}%</span>
                    </div>
                    <Progress value={portfolioMetrics.profitMargin} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Cash-on-Cash Return</span>
                      <span className="font-semibold text-blue-600">{portfolioMetrics.cashOnCashReturn}%</span>
                    </div>
                    <Progress value={portfolioMetrics.cashOnCashReturn * 5} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Debt-to-Equity Ratio</span>
                      <span className="font-semibold text-orange-600">{portfolioMetrics.debtToEquity}%</span>
                    </div>
                    <Progress value={portfolioMetrics.debtToEquity} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-900">
                        ${(portfolioMetrics.totalEquity / 1000000).toFixed(1)}M
                      </div>
                      <div className="text-sm text-blue-700">Total Equity</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-900">
                        ${((portfolioMetrics.netCashFlow * 12) / 1000).toFixed(0)}K
                      </div>
                      <div className="text-sm text-green-700">Annual Cash Flow</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  Financial Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    type: "success",
                    title: "Strong Performance",
                    description: "Portfolio ROI exceeds market average by 3.2%",
                    priority: "low",
                  },
                  {
                    type: "warning",
                    title: "High Maintenance Costs",
                    description: "Q1 maintenance 15% above budget",
                    priority: "medium",
                  },
                  {
                    type: "info",
                    title: "Tax Deadline",
                    description: "Quarterly filing due in 15 days",
                    priority: "high",
                  },
                ].map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
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
                        <h4 className="font-semibold text-sm">{alert.title}</h4>
                        <Badge
                          variant={
                            alert.priority === "high"
                              ? "destructive"
                              : alert.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                          className="text-xs"
                        >
                          {alert.priority}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rent Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Rent Collection
                </CardTitle>
                <CardDescription>Current month collection status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Collection Rate</span>
                  <span className="font-semibold text-green-600">{revenueStreams.rentCollection.collectionRate}%</span>
                </div>
                <Progress value={revenueStreams.rentCollection.collectionRate} className="h-2" />

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-900">
                      ${revenueStreams.rentCollection.collected.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700">Collected</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-lg font-bold text-orange-900">
                      ${revenueStreams.rentCollection.outstanding.toLocaleString()}
                    </div>
                    <div className="text-xs text-orange-700">Outstanding</div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Late Payments</span>
                  <Badge variant="destructive">{revenueStreams.rentCollection.latePayments} units</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Additional Income */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusCircle className="w-5 h-5 text-blue-600" />
                  Additional Income
                </CardTitle>
                <CardDescription>Non-rental revenue streams</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(revenueStreams.additionalIncome).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                    <span className="font-semibold text-blue-600">${value.toLocaleString()}</span>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Total Additional</span>
                    <span className="font-bold text-blue-600">
                      $
                      {Object.values(revenueStreams.additionalIncome)
                        .reduce((sum, val) => sum + val, 0)
                        .toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-red-600" />
                  Expense Categories
                </CardTitle>
                <CardDescription>Monthly expense breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseCategories.slice(0, 6).map((expense, index) => (
                  <div key={expense.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{expense.category}</span>
                      <span className="font-semibold text-red-600">${expense.amount.toLocaleString()}</span>
                    </div>
                    <Progress value={expense.percentage} className="h-1" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Expense Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  Pending Approvals
                  <Badge variant="secondary">{pendingExpenses.filter((e) => e.status === "pending").length}</Badge>
                </CardTitle>
                <CardDescription>Expenses awaiting approval</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingExpenses
                  .filter((expense) => expense.status === "pending")
                  .map((expense) => (
                    <div key={expense.id} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{expense.category}</span>
                        <span className="font-semibold text-red-600">${expense.amount.toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{expense.description}</p>
                      <div className="text-xs text-muted-foreground">
                        {expense.property} • {expense.date}
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => approveExpense(expense.id)}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => rejectExpense(expense.id)}>
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Upload className="w-3 h-3 mr-1" />
                          Receipt
                        </Button>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bank Accounts List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Bank Accounts
                </CardTitle>
                <CardDescription>Connected business accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{account.name}</h3>
                      <Badge variant="outline">{account.type}</Badge>
                    </div>
                    <div className="text-2xl font-bold text-blue-600 mb-2">${account.balance.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>
                        {account.bank} {account.accountNumber}
                      </div>
                      <div>Last transaction: {account.lastTransaction}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest account activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-2 border-b">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.date} • {transaction.account}
                      </div>
                    </div>
                    <div className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toLocaleString()}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                Property Performance Comparison
              </CardTitle>
              <CardDescription>Individual property financial analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyPerformance.map((property, index) => (
                  <div key={property.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="font-semibold text-green-600">${property.revenue.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Expenses</div>
                        <div className="font-semibold text-red-600">${property.expenses.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Net Income</div>
                        <div className="font-semibold text-blue-600">${property.netIncome.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">ROI</div>
                        <div className="font-semibold text-purple-600">{property.roi}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Cap Rate</div>
                        <div className="font-semibold text-orange-600">{property.capRate}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="taxes" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tax Documents Generation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Tax Documents
                </CardTitle>
                <CardDescription>Generate and download tax forms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {taxDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">
                        {doc.type} ({doc.year})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {doc.count} document{doc.count > 1 ? "s" : ""} • Due: {doc.dueDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={doc.status === "ready" ? "default" : "secondary"}>{doc.status}</Badge>
                      <Button size="sm" variant="outline">
                        <Download className="w-3 h-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Schedule E Helper */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" />
                  Schedule E Helper
                </CardTitle>
                <CardDescription>Rental income and expense summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-900">
                      ${portfolioMetrics.totalRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-green-700">Total Rental Income</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-900">
                      ${portfolioMetrics.totalExpenses.toLocaleString()}
                    </div>
                    <div className="text-xs text-red-700">Total Expenses</div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span className="text-sm">Net Rental Income</span>
                    <span className="font-semibold">${portfolioMetrics.netCashFlow.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Depreciation</span>
                    <span className="font-semibold">$24,000</span>
                  </div>
                  <div className="flex justify-between font-bold pt-2 border-t">
                    <span>Taxable Income</span>
                    <span>${(portfolioMetrics.netCashFlow - 24000).toLocaleString()}</span>
                  </div>
                </div>

                <Button className="w-full mt-4">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Schedule E
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="forecast" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Cash Flow Forecast
              </CardTitle>
              <CardDescription>6-month financial projection and planning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">
                      ${cashFlowForecast[cashFlowForecast.length - 1].cumulative.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">Projected 6-Month Cash Flow</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">
                      ${(cashFlowForecast[cashFlowForecast.length - 1].cumulative / 6).toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">Average Monthly Net</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">8.5%</div>
                    <div className="text-sm text-purple-700">Projected Growth Rate</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {cashFlowForecast.map((month, index) => (
                    <div key={month.month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="font-semibold text-blue-900">{month.month}</span>
                        </div>
                        <div>
                          <div className="font-semibold">Net: ${month.net.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            Income: ${month.income.toLocaleString()} | Expenses: ${month.expenses.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">${month.cumulative.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Cumulative</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
