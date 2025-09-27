"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building2,
  Users,
  Download,
  Filter,
  BarChart3,
  PieChartIcon,
  Activity,
} from "lucide-react"

export default function OwnerAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedProperty, setSelectedProperty] = useState("all")

  const revenueData = [
    { month: "Jan", revenue: 168100, expenses: 45200, profit: 122900 },
    { month: "Feb", revenue: 172300, expenses: 48100, profit: 124200 },
    { month: "Mar", revenue: 175800, expenses: 46800, profit: 129000 },
    { month: "Apr", revenue: 178200, expenses: 49300, profit: 128900 },
    { month: "May", revenue: 181500, expenses: 47600, profit: 133900 },
    { month: "Jun", revenue: 184200, expenses: 51200, profit: 133000 },
    { month: "Jul", revenue: 187600, expenses: 48900, profit: 138700 },
    { month: "Aug", revenue: 189300, expenses: 50100, profit: 139200 },
    { month: "Sep", revenue: 192100, expenses: 49800, profit: 142300 },
    { month: "Oct", revenue: 194800, expenses: 52300, profit: 142500 },
    { month: "Nov", revenue: 197200, expenses: 51100, profit: 146100 },
    { month: "Dec", revenue: 199500, expenses: 53200, profit: 146300 },
  ]

  const occupancyData = [
    { month: "Jan", occupancy: 92.5 },
    { month: "Feb", occupancy: 94.2 },
    { month: "Mar", occupancy: 95.8 },
    { month: "Apr", occupancy: 93.1 },
    { month: "May", occupancy: 96.3 },
    { month: "Jun", occupancy: 94.7 },
    { month: "Jul", occupancy: 97.2 },
    { month: "Aug", occupancy: 95.9 },
    { month: "Sep", occupancy: 96.8 },
    { month: "Oct", occupancy: 94.3 },
    { month: "Nov", occupancy: 95.7 },
    { month: "Dec", occupancy: 96.1 },
  ]

  const propertyPerformance = [
    { name: "Sunset Apartments", revenue: 578400, profit: 423600, occupancy: 95.8, roi: 28.2 },
    { name: "Downtown Lofts", revenue: 625200, profit: 443400, occupancy: 88.9, roi: 24.6 },
    { name: "Garden View Complex", revenue: 813600, profit: 590400, occupancy: 93.8, roi: 24.6 },
    { name: "Riverside Condos", revenue: 460800, profit: 342000, occupancy: 87.5, roi: 28.5 },
  ]

  const expenseBreakdown = [
    { category: "Maintenance", amount: 156800, percentage: 26.2, color: "#3b82f6" },
    { category: "Insurance", amount: 89400, percentage: 14.9, color: "#10b981" },
    { category: "Property Tax", amount: 134200, percentage: 22.4, color: "#f59e0b" },
    { category: "Management", amount: 78600, percentage: 13.1, color: "#ef4444" },
    { category: "Utilities", amount: 67200, percentage: 11.2, color: "#8b5cf6" },
    { category: "Other", amount: 72800, percentage: 12.2, color: "#6b7280" },
  ]

  const kpiMetrics = [
    {
      title: "Total Portfolio Value",
      value: "$8.05M",
      change: "+12.3%",
      trend: "up",
      icon: Building2,
      color: "text-blue-600",
    },
    {
      title: "Annual Revenue",
      value: "$2.28M",
      change: "+8.7%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Average Occupancy",
      value: "94.8%",
      change: "+2.1%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Average ROI",
      value: "26.5%",
      change: "+1.8%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio Analytics</h1>
          <p className="text-muted-foreground">Comprehensive performance insights and financial analysis</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Advanced Filters
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="12months">Last 12 Months</SelectItem>
            <SelectItem value="24months">Last 24 Months</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-full sm:w-48">
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
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiMetrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p
                  className={`text-xs flex items-center gap-1 ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {metric.change} from last period
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="occupancy" className="gap-2">
            <Activity className="w-4 h-4" />
            Occupancy
          </TabsTrigger>
          <TabsTrigger value="properties" className="gap-2">
            <Building2 className="w-4 h-4" />
            Properties
          </TabsTrigger>
          <TabsTrigger value="expenses" className="gap-2">
            <PieChartIcon className="w-4 h-4" />
            Expenses
          </TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Profit Analysis</CardTitle>
              <CardDescription>Monthly revenue, expenses, and profit trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, ""]} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stackId="2"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="profit"
                    stackId="3"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.8}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate Trends</CardTitle>
              <CardDescription>Monthly occupancy percentage across all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={occupancyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[85, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Occupancy"]} />
                  <Line
                    type="monotone"
                    dataKey="occupancy"
                    stroke="#10b981"
                    strokeWidth={3}
                    dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance Comparison</CardTitle>
              <CardDescription>Revenue and ROI comparison across properties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={propertyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "revenue" || name === "profit"
                        ? `$${Number(value).toLocaleString()}`
                        : name === "occupancy"
                          ? `${value}%`
                          : `${value}%`,
                      name === "revenue"
                        ? "Revenue"
                        : name === "profit"
                          ? "Profit"
                          : name === "occupancy"
                            ? "Occupancy"
                            : "ROI",
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                  <Bar dataKey="profit" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {propertyPerformance.map((property, index) => (
              <Card key={property.name}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{property.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue</span>
                    <span className="font-semibold">${(property.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profit</span>
                    <span className="font-semibold text-green-600">${(property.profit / 1000).toFixed(0)}K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Occupancy</span>
                    <span className="font-semibold">{property.occupancy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ROI</span>
                    <span className="font-semibold text-blue-600">{property.roi}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
                <CardDescription>Breakdown of annual operating expenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {expenseBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Amount"]} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>Detailed expense breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenseBreakdown.map((expense) => (
                  <div key={expense.category} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: expense.color }} />
                      <span className="font-medium">{expense.category}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${expense.amount.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{expense.percentage}%</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
