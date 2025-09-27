"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
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
  ComposedChart,
  Scatter,
  ScatterChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import {
  TrendingUp,
  DollarSign,
  Home,
  Users,
  Wrench,
  Download,
  BarChart3,
  Activity,
  Target,
  Calendar,
  Filter,
  Eye,
  Share,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Trash2,
  GripVertical,
  Settings,
  FileText,
  Clock,
  PieChartIcon,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("12months")
  const [selectedMetrics, setSelectedMetrics] = useState(["revenue", "occupancy", "maintenance"])
  const [reportType, setReportType] = useState("executive")
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date } | undefined>()
  const [customReportMetrics, setCustomReportMetrics] = useState<string[]>([])
  const [scheduledReports, setScheduledReports] = useState<any[]>([])

  // Enhanced analytics data
  const revenueData = [
    { month: "Jan", revenue: 186000, expenses: 48000, profit: 138000, occupancy: 92, units: 94 },
    { month: "Feb", revenue: 192000, expenses: 52000, profit: 140000, occupancy: 89, units: 96 },
    { month: "Mar", revenue: 198000, expenses: 46000, profit: 152000, occupancy: 94, units: 98 },
    { month: "Apr", revenue: 204000, expenses: 54000, profit: 150000, occupancy: 91, units: 100 },
    { month: "May", revenue: 210000, expenses: 50000, profit: 160000, occupancy: 96, units: 102 },
    { month: "Jun", revenue: 216000, expenses: 58000, profit: 158000, occupancy: 98, units: 104 },
    { month: "Jul", revenue: 222000, expenses: 62000, profit: 160000, occupancy: 97, units: 106 },
    { month: "Aug", revenue: 218000, expenses: 56000, profit: 162000, occupancy: 95, units: 108 },
    { month: "Sep", revenue: 224000, expenses: 60000, profit: 164000, occupancy: 93, units: 110 },
    { month: "Oct", revenue: 230000, expenses: 64000, profit: 166000, occupancy: 96, units: 112 },
    { month: "Nov", revenue: 226000, expenses: 58000, profit: 168000, occupancy: 94, units: 114 },
    { month: "Dec", revenue: 232000, expenses: 66000, profit: 166000, occupancy: 97, units: 116 },
  ]

  const propertyPerformanceData = [
    { name: "Sunset Apartments", revenue: 48200, occupancy: 98, satisfaction: 4.8, maintenance: 2, roi: 14.2 },
    { name: "Downtown Lofts", revenue: 52100, occupancy: 95, satisfaction: 4.6, maintenance: 1, roi: 12.8 },
    { name: "Garden View Complex", revenue: 67800, occupancy: 92, satisfaction: 4.9, maintenance: 0, roi: 13.5 },
    { name: "Riverside Condos", revenue: 38400, occupancy: 100, satisfaction: 4.4, maintenance: 4, roi: 11.9 },
    { name: "Modern Heights", revenue: 44600, occupancy: 94, satisfaction: 4.7, maintenance: 3, roi: 13.1 },
  ]

  const tenantAnalytics = [
    { segment: "Long-term (2+ years)", count: 45, revenue: 108000, satisfaction: 4.9, retention: 95 },
    { segment: "Medium-term (1-2 years)", count: 32, revenue: 76800, satisfaction: 4.6, retention: 87 },
    { segment: "Short-term (<1 year)", count: 28, revenue: 67200, satisfaction: 4.3, retention: 72 },
    { segment: "New tenants", count: 15, revenue: 36000, satisfaction: 4.5, retention: 85 },
  ]

  const marketComparison = [
    { metric: "Average Rent", portfolio: 2850, market: 2920, variance: -2.4 },
    { metric: "Occupancy Rate", portfolio: 94.2, market: 91.8, variance: 2.6 },
    { metric: "Tenant Turnover", portfolio: 12.5, market: 18.3, variance: -31.7 },
    { metric: "Maintenance Cost/Unit", portfolio: 145, market: 168, variance: -13.7 },
    { metric: "Collection Rate", portfolio: 96.8, market: 94.2, variance: 2.8 },
  ]

  const predictiveAnalytics = [
    { month: "Jan 2025", predictedRevenue: 238000, confidence: 92, trend: "up" },
    { month: "Feb 2025", predictedRevenue: 242000, confidence: 89, trend: "up" },
    { month: "Mar 2025", predictedRevenue: 245000, confidence: 87, trend: "up" },
    { month: "Apr 2025", predictedRevenue: 248000, confidence: 85, trend: "up" },
    { month: "May 2025", predictedRevenue: 251000, confidence: 83, trend: "up" },
    { month: "Jun 2025", predictedRevenue: 254000, confidence: 81, trend: "up" },
  ]

  const kpiData = {
    totalRevenue: 2568000,
    revenueGrowth: 18.7,
    avgOccupancy: 94.2,
    occupancyChange: 2.1,
    totalProperties: 45,
    propertiesChange: 3,
    avgRent: 2850,
    rentChange: 5.2,
    maintenanceRequests: 156,
    maintenanceChange: -8.3,
    collectionRate: 96.8,
    collectionChange: 1.4,
    tenantSatisfaction: 4.6,
    satisfactionChange: 0.3,
    portfolioValue: 12500000,
    valueChange: 8.9,
  }

  const reportTemplates = [
    { id: "executive", name: "Executive Summary", description: "High-level KPIs and trends" },
    { id: "financial", name: "Financial Performance", description: "Revenue, expenses, and profitability" },
    { id: "operational", name: "Operational Metrics", description: "Occupancy, maintenance, and efficiency" },
    { id: "tenant", name: "Tenant Analytics", description: "Satisfaction, retention, and demographics" },
    { id: "market", name: "Market Analysis", description: "Competitive positioning and benchmarks" },
    { id: "custom", name: "Custom Report", description: "Build your own analytics dashboard" },
  ]

  const occupancyTrendsData = [
    { month: "Jan", occupancy: 92, forecast: 94, seasonal: 89, market: 88 },
    { month: "Feb", occupancy: 89, forecast: 91, seasonal: 87, market: 86 },
    { month: "Mar", occupancy: 94, forecast: 96, seasonal: 92, market: 90 },
    { month: "Apr", occupancy: 91, forecast: 93, seasonal: 94, market: 92 },
    { month: "May", occupancy: 96, forecast: 98, seasonal: 97, market: 95 },
    { month: "Jun", occupancy: 98, forecast: 99, seasonal: 98, market: 96 },
    { month: "Jul", occupancy: 97, forecast: 98, seasonal: 97, market: 95 },
    { month: "Aug", occupancy: 95, forecast: 96, seasonal: 96, market: 94 },
    { month: "Sep", occupancy: 93, forecast: 94, seasonal: 94, market: 92 },
    { month: "Oct", occupancy: 96, forecast: 97, seasonal: 95, market: 93 },
    { month: "Nov", occupancy: 94, forecast: 95, seasonal: 92, market: 90 },
    { month: "Dec", occupancy: 97, forecast: 98, seasonal: 94, market: 91 },
  ]

  const tenantAnalyticsData = [
    { month: "Jan", turnoverRate: 8.5, avgTenancy: 24, satisfaction: 4.6, punctuality: 94 },
    { month: "Feb", turnoverRate: 12.3, avgTenancy: 23, satisfaction: 4.5, punctuality: 92 },
    { month: "Mar", turnoverRate: 6.8, avgTenancy: 25, satisfaction: 4.8, punctuality: 96 },
    { month: "Apr", turnoverRate: 9.2, avgTenancy: 24, satisfaction: 4.7, punctuality: 95 },
    { month: "May", turnoverRate: 5.4, avgTenancy: 26, satisfaction: 4.9, punctuality: 97 },
    { month: "Jun", turnoverRate: 7.1, avgTenancy: 25, satisfaction: 4.8, punctuality: 96 },
    { month: "Jul", turnoverRate: 11.6, avgTenancy: 23, satisfaction: 4.6, punctuality: 93 },
    { month: "Aug", turnoverRate: 8.9, avgTenancy: 24, satisfaction: 4.7, punctuality: 94 },
    { month: "Sep", turnoverRate: 6.3, avgTenancy: 25, satisfaction: 4.8, punctuality: 95 },
    { month: "Oct", turnoverRate: 7.8, avgTenancy: 24, satisfaction: 4.7, punctuality: 94 },
    { month: "Nov", turnoverRate: 9.5, avgTenancy: 23, satisfaction: 4.6, punctuality: 93 },
    { month: "Dec", turnoverRate: 5.2, avgTenancy: 26, satisfaction: 4.9, punctuality: 98 },
  ]

  const expenseAnalysisData = [
    { month: "Jan", maintenance: 48000, utilities: 12000, management: 8000, predicted: 52000, budget: 50000 },
    { month: "Feb", maintenance: 52000, utilities: 11500, management: 8200, predicted: 54000, budget: 52000 },
    { month: "Mar", maintenance: 46000, utilities: 10800, management: 8100, predicted: 49000, budget: 48000 },
    { month: "Apr", maintenance: 54000, utilities: 10200, management: 8300, predicted: 56000, budget: 54000 },
    { month: "May", maintenance: 50000, utilities: 9800, management: 8000, predicted: 52000, budget: 50000 },
    { month: "Jun", maintenance: 58000, utilities: 11200, management: 8400, predicted: 60000, budget: 58000 },
  ]

  const availableMetrics = [
    { id: "revenue", name: "Revenue", category: "Financial", icon: DollarSign },
    { id: "occupancy", name: "Occupancy Rate", category: "Operational", icon: Home },
    { id: "maintenance", name: "Maintenance Costs", category: "Operational", icon: Wrench },
    { id: "satisfaction", name: "Tenant Satisfaction", category: "Tenant", icon: Users },
    { id: "turnover", name: "Tenant Turnover", category: "Tenant", icon: Activity },
    { id: "expenses", name: "Operating Expenses", category: "Financial", icon: TrendingDown },
    { id: "roi", name: "Return on Investment", category: "Financial", icon: Target },
    { id: "collection", name: "Collection Rate", category: "Financial", icon: CheckCircle },
  ]

  const getTrendIcon = (trend: string, value: number) => {
    if (value > 0) return <ArrowUpRight className="w-3 h-3 text-green-600" />
    if (value < 0) return <ArrowDownRight className="w-3 h-3 text-red-600" />
    return <Activity className="w-3 h-3 text-gray-600" />
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 0) return "text-green-600"
    if (variance < 0) return "text-red-600"
    return "text-gray-600"
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Analytics & Reports
          </h1>
          <p className="text-muted-foreground mt-2">Advanced business intelligence and performance insights</p>
        </motion.div>
        <div className="flex items-center gap-2">
          <DatePickerWithRange date={dateRange} onDateChange={setDateRange} className="w-64" />
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="3months">Last 3 months</SelectItem>
              <SelectItem value="6months">Last 6 months</SelectItem>
              <SelectItem value="12months">Last 12 months</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
        {[
          {
            title: "Total Revenue",
            value: `$${(kpiData.totalRevenue / 1000000).toFixed(1)}M`,
            change: kpiData.revenueGrowth,
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-600",
          },
          {
            title: "Avg Occupancy",
            value: `${kpiData.avgOccupancy}%`,
            change: kpiData.occupancyChange,
            icon: Home,
            gradient: "from-blue-500 to-indigo-600",
          },
          {
            title: "Properties",
            value: kpiData.totalProperties.toString(),
            change: kpiData.propertiesChange,
            icon: Home,
            gradient: "from-purple-500 to-pink-600",
          },
          {
            title: "Avg Rent",
            value: `$${kpiData.avgRent}`,
            change: kpiData.rentChange,
            icon: DollarSign,
            gradient: "from-orange-500 to-red-600",
          },
          {
            title: "Maintenance",
            value: kpiData.maintenanceRequests.toString(),
            change: kpiData.maintenanceChange,
            icon: Wrench,
            gradient: "from-yellow-500 to-orange-600",
          },
          {
            title: "Collection Rate",
            value: `${kpiData.collectionRate}%`,
            change: kpiData.collectionChange,
            icon: Users,
            gradient: "from-teal-500 to-cyan-600",
          },
          {
            title: "Satisfaction",
            value: kpiData.tenantSatisfaction.toString(),
            change: kpiData.satisfactionChange,
            icon: Target,
            gradient: "from-pink-500 to-rose-600",
          },
          {
            title: "Portfolio Value",
            value: `$${(kpiData.portfolioValue / 1000000).toFixed(1)}M`,
            change: kpiData.valueChange,
            icon: TrendingUp,
            gradient: "from-indigo-500 to-purple-600",
          },
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="relative overflow-hidden border-0 shadow-lg">
              <div className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-10`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
                <CardTitle className="text-xs font-medium text-gray-700">{metric.title}</CardTitle>
                <div className={`p-1.5 rounded-lg bg-gradient-to-r ${metric.gradient}`}>
                  <metric.icon className="h-3 w-3 text-white" />
                </div>
              </CardHeader>
              <CardContent className="relative">
                <div className="text-xl font-bold text-gray-900">{metric.value}</div>
                <p className="text-xs text-gray-600 mt-1 flex items-center gap-1">
                  {getTrendIcon("up", metric.change)}
                  {metric.change > 0 ? "+" : ""}
                  {metric.change}%
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Performance Metrics Dashboard
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of occupancy trends, revenue, expenses, and tenant analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="occupancy" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="occupancy">Occupancy Trends</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
              <TabsTrigger value="expenses">Expense Analysis</TabsTrigger>
              <TabsTrigger value="tenants">Tenant Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="occupancy" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Historical Occupancy & Forecast</CardTitle>
                    <CardDescription>Actual vs predicted occupancy with seasonal patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={occupancyTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[80, 100]} />
                        <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                        <Area
                          type="monotone"
                          dataKey="seasonal"
                          fill="#e0e7ff"
                          fillOpacity={0.3}
                          stroke="none"
                          name="Seasonal Pattern"
                        />
                        <Line
                          type="monotone"
                          dataKey="occupancy"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          name="Actual Occupancy"
                        />
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          stroke="#10b981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ r: 3 }}
                          name="Predicted Occupancy"
                        />
                        <Line
                          type="monotone"
                          dataKey="market"
                          stroke="#6b7280"
                          strokeWidth={2}
                          dot={{ r: 2 }}
                          name="Market Average"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Occupancy Insights</CardTitle>
                    <CardDescription>Key performance indicators and trends</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-900">94.2%</div>
                        <div className="text-sm text-blue-700">Current Occupancy</div>
                        <div className="text-xs text-blue-600 mt-1">+2.1% vs last month</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-900">96.5%</div>
                        <div className="text-sm text-green-700">Predicted Next Month</div>
                        <div className="text-xs text-green-600 mt-1">High confidence</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Peak Season (May-Aug)</span>
                        <span className="font-semibold">97.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Off Season (Nov-Feb)</span>
                        <span className="font-semibold">91.8%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Market Outperformance</span>
                        <span className="font-semibold text-green-600">+2.4%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue by Property & Unit Type</CardTitle>
                    <CardDescription>Breakdown of revenue streams across portfolio</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <BarChart data={propertyPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
                        <Bar dataKey="revenue" fill="#3b82f6" name="Monthly Revenue" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>YoY Growth Comparison</CardTitle>
                    <CardDescription>Year-over-year revenue growth analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                        <Line
                          type="monotone"
                          dataKey="revenue"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          name="2024 Revenue"
                        />
                        <Line
                          type="monotone"
                          dataKey="profit"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          name="Net Profit"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenses" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Expense Trends & Predictions</CardTitle>
                    <CardDescription>Maintenance cost predictions and budget analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={expenseAnalysisData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                        <Bar dataKey="maintenance" fill="#ef4444" name="Maintenance" />
                        <Bar dataKey="utilities" fill="#f59e0b" name="Utilities" />
                        <Bar dataKey="management" fill="#8b5cf6" name="Management" />
                        <Line
                          type="monotone"
                          dataKey="predicted"
                          stroke="#10b981"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Predicted"
                        />
                        <Line type="monotone" dataKey="budget" stroke="#6b7280" strokeWidth={2} name="Budget" />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost per Square Foot Analysis</CardTitle>
                    <CardDescription>Efficiency metrics and benchmarking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 rounded-lg">
                        <div className="text-2xl font-bold text-red-900">$2.45</div>
                        <div className="text-sm text-red-700">Cost per Sq Ft</div>
                        <div className="text-xs text-red-600 mt-1">-8.3% vs last year</div>
                      </div>
                      <div className="p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-900">$2.68</div>
                        <div className="text-sm text-orange-700">Market Average</div>
                        <div className="text-xs text-orange-600 mt-1">Industry benchmark</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Maintenance Efficiency</span>
                        <Badge variant="outline" className="text-green-600">
                          Excellent
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Budget Variance</span>
                        <span className="font-semibold text-green-600">-4.2%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Predicted Savings</span>
                        <span className="font-semibold text-blue-600">$12,400</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tenants" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tenant Turnover & Satisfaction</CardTitle>
                    <CardDescription>Retention metrics and satisfaction trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <ComposedChart data={tenantAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Bar yAxisId="left" dataKey="turnoverRate" fill="#ef4444" name="Turnover Rate %" />
                        <Line
                          yAxisId="right"
                          type="monotone"
                          dataKey="satisfaction"
                          stroke="#10b981"
                          strokeWidth={3}
                          dot={{ r: 4 }}
                          name="Satisfaction Score"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Punctuality Analysis</CardTitle>
                    <CardDescription>Tenant payment behavior and trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={350}>
                      <AreaChart data={tenantAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[90, 100]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Punctuality"]} />
                        <Area
                          type="monotone"
                          dataKey="punctuality"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.3}
                          name="Payment Punctuality %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            Custom Report Builder
          </CardTitle>
          <CardDescription>
            Drag & drop metrics to create custom reports and schedule automated delivery
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Available Metrics */}
            <div className="space-y-4">
              <h3 className="font-semibold">Available Metrics</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {availableMetrics.map((metric) => (
                  <div
                    key={metric.id}
                    className="flex items-center gap-3 p-3 border rounded-lg cursor-move hover:bg-gray-50 transition-colors"
                    draggable
                  >
                    <GripVertical className="w-4 h-4 text-gray-400" />
                    <metric.icon className="w-4 h-4 text-blue-600" />
                    <div className="flex-1">
                      <div className="font-medium text-sm">{metric.name}</div>
                      <div className="text-xs text-muted-foreground">{metric.category}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCustomReportMetrics([...customReportMetrics, metric.id])}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Report Builder */}
            <div className="space-y-4">
              <h3 className="font-semibold">Report Configuration</h3>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 min-h-64">
                {customReportMetrics.length === 0 ? (
                  <div className="text-center text-muted-foreground">
                    <PieChartIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Drag metrics here to build your custom report</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {customReportMetrics.map((metricId, index) => {
                      const metric = availableMetrics.find((m) => m.id === metricId)
                      if (!metric) return null
                      const IconComponent = metric.icon
                      return (
                        <div key={index} className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                          <IconComponent className="w-4 h-4 text-blue-600" />
                          <span className="flex-1 text-sm">{metric.name}</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setCustomReportMetrics(customReportMetrics.filter((_, i) => i !== index))}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="report-name">Report Name</Label>
                  <Input id="report-name" placeholder="My Custom Report" />
                </div>
                <div>
                  <Label htmlFor="report-description">Description</Label>
                  <Input id="report-description" placeholder="Report description..." />
                </div>
              </div>
            </div>

            {/* Export & Schedule */}
            <div className="space-y-4">
              <h3 className="font-semibold">Export & Schedule</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Export Options</h4>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Export to PDF
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <FileText className="w-4 h-4 mr-2" />
                      Export to Excel
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Share className="w-4 h-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Schedule Automated Reports</h4>
                  <div className="space-y-3">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input placeholder="Email recipients" />
                    <Button className="w-full">
                      <Clock className="w-4 h-4 mr-2" />
                      Schedule Report
                    </Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-2">Scheduled Reports</h4>
                  <div className="text-sm text-muted-foreground">No scheduled reports yet</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            Market Comparison & Competitive Analysis
          </CardTitle>
          <CardDescription>Portfolio performance vs local market benchmarks and competition analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="benchmarks" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="benchmarks">Market Benchmarks</TabsTrigger>
              <TabsTrigger value="competition">Competition Analysis</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>

            <TabsContent value="benchmarks" className="space-y-6">
              <div className="space-y-6">
                {marketComparison.map((item, index) => (
                  <div key={item.metric} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Portfolio</div>
                          <div className="font-semibold">
                            {item.metric.includes("$")
                              ? `$${item.portfolio}`
                              : `${item.portfolio}${item.metric.includes("Rate") || item.metric.includes("Occupancy") ? "%" : ""}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Market</div>
                          <div className="font-semibold">
                            {item.metric.includes("$")
                              ? `$${item.market}`
                              : `${item.market}${item.metric.includes("Rate") || item.metric.includes("Occupancy") ? "%" : ""}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Variance</div>
                          <div className={`font-semibold ${getVarianceColor(item.variance)}`}>
                            {item.variance > 0 ? "+" : ""}
                            {item.variance}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (item.portfolio / Math.max(item.portfolio, item.market)) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (item.market / Math.max(item.portfolio, item.market)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="competition" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { name: "Metro Properties", avgRent: 3100, occupancy: 89, satisfaction: 4.2, units: 850 },
                  { name: "Urban Living Co", avgRent: 2950, occupancy: 92, satisfaction: 4.4, units: 650 },
                  { name: "City Residential", avgRent: 2800, occupancy: 87, satisfaction: 4.1, units: 920 },
                ].map((competitor) => (
                  <Card key={competitor.name}>
                    <CardHeader>
                      <CardTitle className="text-lg">{competitor.name}</CardTitle>
                      <CardDescription>{competitor.units} units in portfolio</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Avg Rent</span>
                        <span className="font-semibold">${competitor.avgRent}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Occupancy</span>
                        <span className="font-semibold">{competitor.occupancy}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Satisfaction</span>
                        <span className="font-semibold">{competitor.satisfaction}/5</span>
                      </div>
                      <div className="pt-2">
                        <Badge variant={competitor.avgRent > 2850 ? "destructive" : "default"}>
                          {competitor.avgRent > 2850 ? "Above Market" : "Below Market"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      Growth Opportunities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="font-medium text-green-900">Rent Optimization</div>
                      <div className="text-sm text-green-700">Potential +$180/month per unit</div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="font-medium text-blue-900">Occupancy Improvement</div>
                      <div className="text-sm text-blue-700">Target 97% occupancy rate</div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <div className="font-medium text-purple-900">Amenity Upgrades</div>
                      <div className="text-sm text-purple-700">Smart home features demand</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                      Risk Areas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <div className="font-medium text-orange-900">Maintenance Costs</div>
                      <div className="text-sm text-orange-700">Above market average</div>
                    </div>
                    <div className="p-3 bg-red-50 rounded-lg">
                      <div className="font-medium text-red-900">Tenant Turnover</div>
                      <div className="text-sm text-red-700">Q3 spike needs attention</div>
                    </div>
                    <div className="p-3 bg-yellow-50 rounded-lg">
                      <div className="font-medium text-yellow-900">Market Saturation</div>
                      <div className="text-sm text-yellow-700">New supply coming online</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="tenants">Tenants</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Profit Trends</CardTitle>
                <CardDescription>12-month financial performance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip formatter={(value, name) => [`$${value.toLocaleString()}`, name]} />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      fill="#3b82f6"
                      fillOpacity={0.3}
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="expenses"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      stroke="#ef4444"
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="occupancy"
                      stroke="#10b981"
                      strokeWidth={3}
                      dot={{ r: 4 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Performance Matrix</CardTitle>
                <CardDescription>Revenue vs Occupancy scatter analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <ScatterChart data={propertyPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="occupancy" name="Occupancy %" />
                    <YAxis dataKey="revenue" name="Revenue" />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "revenue" ? `$${value.toLocaleString()}` : `${value}%`,
                        name,
                      ]}
                      labelFormatter={(label) => `Property: ${label}`}
                    />
                    <Scatter dataKey="revenue" fill="#3b82f6" />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Property Performance Ranking</CardTitle>
              <CardDescription>Comprehensive performance metrics by property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyPerformanceData.map((property, index) => (
                  <div key={property.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-900">
                          {index + 1}
                        </div>
                        <h3 className="font-semibold">{property.name}</h3>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="font-semibold text-green-600">${property.revenue.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Occupancy</div>
                        <div className="font-semibold text-blue-600">{property.occupancy}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Satisfaction</div>
                        <div className="font-semibold text-purple-600">{property.satisfaction}/5</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Maintenance</div>
                        <div
                          className={`font-semibold ${property.maintenance === 0 ? "text-green-600" : "text-orange-600"}`}
                        >
                          {property.maintenance} issues
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">ROI</div>
                        <div className="font-semibold text-indigo-600">{property.roi}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue & Profit Trends</CardTitle>
                <CardDescription>Monthly revenue, expenses, and profit over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stackId="1"
                      stroke="#8884d8"
                      fill="#8884d8"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stackId="2"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Portfolio breakdown by property type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={propertyPerformanceData.map((property) => ({
                        name: property.name,
                        value: property.revenue,
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {propertyPerformanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Properties</CardTitle>
              <CardDescription>Properties ranked by revenue performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {propertyPerformanceData.map((property, index) => (
                  <div key={property.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{property.name}</h4>
                        <p className="text-sm text-muted-foreground">{property.units} units</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">${property.revenue.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">{property.occupancy}% occupied</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45</div>
                <p className="text-xs text-muted-foreground">Total Properties</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Apartments</span>
                    <span>20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Condos</span>
                    <span>15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Houses</span>
                    <span>7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commercial</span>
                    <span>3</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Unit Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,247</div>
                <p className="text-xs text-muted-foreground">Total Units</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Studio</span>
                    <span>156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>1 Bedroom</span>
                    <span>423</span>
                  </div>
                  <div className="flex justify-between">
                    <span>2 Bedroom</span>
                    <span>512</span>
                  </div>
                  <div className="flex justify-between">
                    <span>3+ Bedroom</span>
                    <span>156</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$2,850</div>
                <p className="text-xs text-muted-foreground">Average Rent</p>
                <div className="mt-4 text-sm">
                  <div className="flex justify-between">
                    <span>Market Rate</span>
                    <span>$2,920</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Variance</span>
                    <span className="text-red-500">-2.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rent Growth</span>
                    <span className="text-green-500">+5.2%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tenants" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Tenant Segmentation Analysis</CardTitle>
                <CardDescription>Performance by tenant tenure segments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tenantAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}`, ""]} />
                    <Bar dataKey="count" fill="#3b82f6" name="Tenant Count" />
                    <Bar dataKey="retention" fill="#10b981" name="Retention %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tenant Satisfaction Radar</CardTitle>
                <CardDescription>Multi-dimensional satisfaction analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart
                    data={[
                      { subject: "Communication", A: 4.8, fullMark: 5 },
                      { subject: "Maintenance", A: 4.2, fullMark: 5 },
                      { subject: "Property Condition", A: 4.6, fullMark: 5 },
                      { subject: "Value for Money", A: 4.1, fullMark: 5 },
                      { subject: "Amenities", A: 4.4, fullMark: 5 },
                      { subject: "Location", A: 4.7, fullMark: 5 },
                    ]}
                  >
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 5]} />
                    <Radar name="Satisfaction" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tenant Segment Performance</CardTitle>
              <CardDescription>Detailed analysis by tenant tenure groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tenantAnalytics.map((segment, index) => (
                  <div key={segment.segment} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{segment.segment}</h3>
                      <Badge variant="outline">{segment.count} tenants</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                        <div className="font-semibold text-green-600">${segment.revenue.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Satisfaction Score</div>
                        <div className="font-semibold text-blue-600">{segment.satisfaction}/5</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Retention Rate</div>
                        <div className="font-semibold text-purple-600">{segment.retention}%</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Progress value={segment.retention} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Comparison Analysis</CardTitle>
              <CardDescription>Portfolio performance vs market benchmarks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {marketComparison.map((item, index) => (
                  <div key={item.metric} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.metric}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Portfolio</div>
                          <div className="font-semibold">
                            {item.metric.includes("$")
                              ? `$${item.portfolio}`
                              : `${item.portfolio}${item.metric.includes("Rate") || item.metric.includes("Occupancy") ? "%" : ""}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Market</div>
                          <div className="font-semibold">
                            {item.metric.includes("$")
                              ? `$${item.market}`
                              : `${item.market}${item.metric.includes("Rate") || item.metric.includes("Occupancy") ? "%" : ""}`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Variance</div>
                          <div className={`font-semibold ${getVarianceColor(item.variance)}`}>
                            {item.variance > 0 ? "+" : ""}
                            {item.variance}%
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-1 bg-blue-100 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (item.portfolio / Math.max(item.portfolio, item.market)) * 100)}%`,
                          }}
                        />
                      </div>
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-gray-600 h-2 rounded-full"
                          style={{
                            width: `${Math.min(100, (item.market / Math.max(item.portfolio, item.market)) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecasting</CardTitle>
              <CardDescription>AI-powered 6-month revenue predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">
                      $
                      {(predictiveAnalytics.reduce((sum, item) => sum + item.predictedRevenue, 0) / 1000000).toFixed(1)}
                      M
                    </div>
                    <div className="text-sm text-blue-700">6-Month Forecast</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">
                      {Math.round(
                        predictiveAnalytics.reduce((sum, item) => sum + item.confidence, 0) /
                          predictiveAnalytics.length,
                      )}
                      %
                    </div>
                    <div className="text-sm text-green-700">Avg Confidence</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">+12.8%</div>
                    <div className="text-sm text-purple-700">Projected Growth</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {predictiveAnalytics.map((forecast, index) => (
                    <div key={forecast.month} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold">{forecast.month}</div>
                          <div className="text-sm text-muted-foreground">Predicted Revenue</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-blue-600">${forecast.predictedRevenue.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">{forecast.confidence}% confidence</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate Trends</CardTitle>
              <CardDescription>Monthly occupancy rates across all properties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip formatter={(value) => [`${value}%`, "Occupancy Rate"]} />
                  <Line type="monotone" dataKey="occupancy" stroke="#8884d8" strokeWidth={3} dot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Request Trends</CardTitle>
              <CardDescription>Monthly maintenance requests and completion rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="maintenance" fill="#8884d8" name="Total Requests" />
                  {/* Additional maintenance data can be added here */}
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
