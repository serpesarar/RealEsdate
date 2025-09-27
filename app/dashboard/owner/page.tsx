"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  DollarSign,
  Building2,
  BarChart3,
  Lightbulb,
  AlertTriangle,
  Target,
  Calendar,
  PieChart,
  Users,
  Plus,
  FileText,
  CheckCircle,
  Clock,
  Home,
} from "lucide-react"
import { motion } from "framer-motion"

export default function OwnerDashboard() {
  const portfolioProperties = [
    { id: 1, name: "Sunset Apartments", units: 24, occupied: 22, revenue: 48000, maintenance: 2400, score: 4.8 },
    { id: 2, name: "Oak Street Complex", units: 18, occupied: 16, revenue: 32000, maintenance: 1800, score: 4.6 },
    { id: 3, name: "Pine View Condos", units: 12, occupied: 12, revenue: 36000, maintenance: 1200, score: 4.9 },
  ]

  const aiInsights = [
    {
      type: "predictive",
      title: "Maintenance Alert",
      description:
        "HVAC systems in Sunset Apartments showing early wear patterns. Recommend inspection within 30 days.",
      priority: "high",
      savings: "$3,200",
    },
    {
      type: "market",
      title: "Rent Optimization",
      description: "Market analysis suggests 8% rent increase potential for Oak Street units.",
      priority: "medium",
      savings: "$2,560",
    },
    {
      type: "retention",
      title: "Tenant Risk",
      description: "3 tenants showing payment delay patterns. Early intervention recommended.",
      priority: "medium",
      savings: "$1,800",
    },
  ]

  const revenueData = [
    { month: "Jan", revenue: 98000, expenses: 24000, net: 74000 },
    { month: "Feb", revenue: 102000, expenses: 26000, net: 76000 },
    { month: "Mar", revenue: 108000, expenses: 22000, net: 86000 },
    { month: "Apr", revenue: 112000, expenses: 28000, net: 84000 },
    { month: "May", revenue: 116000, expenses: 28400, net: 87600 },
    { month: "Jun", revenue: 118000, expenses: 25000, net: 93000 },
    { month: "Jul", revenue: 120000, expenses: 27000, net: 93000 },
    { month: "Aug", revenue: 115000, expenses: 29000, net: 86000 },
    { month: "Sep", revenue: 119000, expenses: 26500, net: 92500 },
    { month: "Oct", revenue: 121000, expenses: 28000, net: 93000 },
    { month: "Nov", revenue: 123000, expenses: 30000, net: 93000 },
    { month: "Dec", revenue: 125000, expenses: 32000, net: 93000 },
  ]

  const recentActivities = [
    {
      type: "application",
      title: "New Tenant Application",
      description: "Sarah Johnson applied for Unit 2B at Oak Street Complex",
      time: "2 hours ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      type: "maintenance",
      title: "Maintenance Approval Needed",
      description: "HVAC repair request for Sunset Apartments - $850",
      time: "4 hours ago",
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      type: "payment",
      title: "Payment Received",
      description: "Rent payment from Pine View Condos Unit 3A - $3,200",
      time: "6 hours ago",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      type: "lease",
      title: "Lease Renewal Pending",
      description: "Unit 1C lease expires in 30 days - renewal required",
      time: "1 day ago",
      icon: FileText,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent">
            Executive Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">Complete portfolio overview and strategic insights</p>
        </motion.div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">
            <TrendingUp className="w-3 h-3 mr-1" />
            Portfolio Growing +8.5%
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Portfolio Value",
            value: "$4.2M",
            change: "+8.5%",
            icon: Building2,
            gradient: "from-blue-500 to-indigo-600",
            bgGradient: "from-blue-50 to-indigo-50",
          },
          {
            title: "Monthly Revenue",
            value: "$116,000",
            change: "+12.5%",
            icon: DollarSign,
            gradient: "from-green-500 to-emerald-600",
            bgGradient: "from-green-50 to-emerald-50",
          },
          {
            title: "Total Properties",
            value: "12",
            sublabel: "156 Units",
            icon: Home,
            gradient: "from-purple-500 to-pink-600",
            bgGradient: "from-purple-50 to-pink-50",
          },
          {
            title: "Occupancy Rate",
            value: "94.2%",
            change: "+3.1%",
            icon: Target,
            gradient: "from-orange-500 to-red-600",
            bgGradient: "from-orange-50 to-red-50",
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
                {metric.sublabel && <p className="text-sm text-gray-600 mt-1">{metric.sublabel}</p>}
                {metric.change && (
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-600 font-medium">{metric.change}</span> from last month
                  </p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used management tools and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: "Add New Property", icon: Plus, color: "bg-blue-500 hover:bg-blue-600" },
              { name: "Create Lease", icon: FileText, color: "bg-green-500 hover:bg-green-600" },
              { name: "View Reports", icon: BarChart3, color: "bg-purple-500 hover:bg-purple-600" },
              { name: "Approve Maintenance", icon: CheckCircle, color: "bg-orange-500 hover:bg-orange-600" },
            ].map((action) => (
              <Button
                key={action.name}
                variant="outline"
                className={`h-16 flex-col gap-2 border-2 hover:border-transparent transition-all ${action.color} hover:text-white`}
              >
                <action.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{action.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              Revenue Trend Analysis
            </CardTitle>
            <CardDescription>12-month revenue vs expenses with net income projection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <span>Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span>Expenses</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full" />
                    <span>Net Income</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Last 12 Months
                </Button>
              </div>
              <div className="grid grid-cols-6 gap-2 h-48">
                {revenueData.slice(-6).map((data, index) => (
                  <div key={data.month} className="flex flex-col justify-end items-center gap-1">
                    <div className="text-xs font-medium text-green-600">${(data.net / 1000).toFixed(0)}k</div>
                    <div
                      className="w-8 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                      style={{ height: `${(data.net / 100000) * 100}%` }}
                    />
                    <div className="text-xs text-gray-600 mt-1">{data.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              Expense Breakdown
            </CardTitle>
            <CardDescription>Monthly operating expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { category: "Maintenance", amount: 12400, percentage: 44, color: "bg-red-500" },
                { category: "Management", amount: 5800, percentage: 20, color: "bg-blue-500" },
                { category: "Insurance", amount: 3600, percentage: 13, color: "bg-green-500" },
                { category: "Taxes", amount: 4200, percentage: 15, color: "bg-purple-500" },
                { category: "Utilities", amount: 2400, percentage: 8, color: "bg-orange-500" },
              ].map((expense) => (
                <div key={expense.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{expense.category}</span>
                    <span className="text-sm font-semibold">${expense.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={expense.percentage} className="h-2 flex-1" />
                    <span className="text-xs text-muted-foreground w-8">{expense.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and notifications across your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-gray-100`}>
                    <activity.icon className={`w-4 h-4 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{activity.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent">
              View All Activity
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Performance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Portfolio Performance
          </CardTitle>
          <CardDescription>Individual property metrics and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {portfolioProperties.map((property) => (
              <div key={property.id} className="p-4 rounded-lg border border-border">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{property.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {property.occupied}/{property.units} units occupied (
                      {Math.round((property.occupied / property.units) * 100)}%)
                    </p>
                  </div>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    {property.score}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Revenue</div>
                    <div className="font-semibold text-green-600">${property.revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Maintenance Costs</div>
                    <div className="font-semibold text-red-600">${property.maintenance.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Net Income</div>
                    <div className="font-semibold">${(property.revenue - property.maintenance).toLocaleString()}</div>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Occupancy Rate</span>
                    <span>{Math.round((property.occupied / property.units) * 100)}%</span>
                  </div>
                  <Progress value={(property.occupied / property.units) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Strategic Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            AI Strategic Insights
          </CardTitle>
          <CardDescription>Predictive analytics and optimization recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div key={index} className="p-4 rounded-lg border border-border">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={insight.priority === "high" ? "destructive" : "secondary"} className="text-xs">
                      {insight.priority === "high" ? <AlertTriangle className="w-3 h-3 mr-1" /> : null}
                      {insight.priority.toUpperCase()}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {insight.type}
                    </Badge>
                  </div>
                  <div className="text-sm font-semibold text-green-600">Save {insight.savings}</div>
                </div>
                <h4 className="font-semibold mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 text-xs">
                    Take Action
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    Learn More
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    Schedule
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
