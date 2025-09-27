"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, TrendingUp, Calendar, Star, Download, CreditCard, Wallet, Target, Award } from "lucide-react"

const earningsData = {
  today: { amount: 320, jobs: 4, hours: 8 },
  week: { amount: 1250, jobs: 18, hours: 36 },
  month: { amount: 4800, jobs: 72, hours: 144 },
  year: { amount: 52000, jobs: 850, hours: 1700 },
}

const recentPayments = [
  {
    id: 1,
    date: "2024-01-15",
    amount: 85,
    job: "Light Fixture Installation",
    tenant: "John Smith",
    unit: "Apt 178",
    status: "paid",
    rating: 5,
  },
  {
    id: 2,
    date: "2024-01-14",
    amount: 120,
    job: "Garbage Disposal Fix",
    tenant: "Anna Brown",
    unit: "Apt 143",
    status: "pending",
    rating: 4,
  },
  {
    id: 3,
    date: "2024-01-13",
    amount: 95,
    job: "Bathroom Faucet Repair",
    tenant: "Mike Johnson",
    unit: "Apt 205",
    status: "paid",
    rating: 5,
  },
  {
    id: 4,
    date: "2024-01-12",
    amount: 150,
    job: "AC Unit Maintenance",
    tenant: "Sarah Davis",
    unit: "Apt 301",
    status: "paid",
    rating: 4,
  },
]

const monthlyGoals = {
  earnings: { current: 4800, target: 5000, percentage: 96 },
  jobs: { current: 72, target: 80, percentage: 90 },
  rating: { current: 4.8, target: 4.5, percentage: 100 },
}

export default function HandymanEarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <DashboardLayout userRole="handyman">
      <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Header */}
        <motion.div className="flex items-center justify-between" variants={cardVariants}>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Earnings & Performance</h1>
            <p className="text-muted-foreground">Track your income and job performance</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </motion.div>

        {/* Earnings Overview */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer}>
          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-2xl font-bold text-green-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      ${earningsData.today.amount}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-2xl font-bold text-blue-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      ${earningsData.week.amount}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-2xl font-bold text-purple-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      ${earningsData.month.amount}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Award className="w-5 h-5 text-orange-600" />
                  </motion.div>
                  <div>
                    <motion.p
                      className="text-2xl font-bold text-orange-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      ${earningsData.year.amount}
                    </motion.p>
                    <p className="text-sm text-muted-foreground">This Year</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Monthly Goals */}
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Monthly Goals Progress
              </CardTitle>
              <CardDescription>Track your progress towards monthly targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Earnings Goal</span>
                    <span className="text-sm text-muted-foreground">
                      ${monthlyGoals.earnings.current} / ${monthlyGoals.earnings.target}
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <Progress value={monthlyGoals.earnings.percentage} className="h-2" />
                  </motion.div>
                  <div className="text-center">
                    <motion.span
                      className="text-lg font-bold text-green-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {monthlyGoals.earnings.percentage}%
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Jobs Completed</span>
                    <span className="text-sm text-muted-foreground">
                      {monthlyGoals.jobs.current} / {monthlyGoals.jobs.target}
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <Progress value={monthlyGoals.jobs.percentage} className="h-2" />
                  </motion.div>
                  <div className="text-center">
                    <motion.span
                      className="text-lg font-bold text-blue-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      {monthlyGoals.jobs.percentage}%
                    </motion.span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Average Rating</span>
                    <span className="text-sm text-muted-foreground">
                      {monthlyGoals.rating.current} / {monthlyGoals.rating.target}
                    </span>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1, delay: 0.7 }}
                  >
                    <Progress value={monthlyGoals.rating.percentage} className="h-2" />
                  </motion.div>
                  <div className="text-center">
                    <motion.span
                      className="text-lg font-bold text-yellow-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      Exceeded!
                    </motion.span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <Tabs defaultValue="recent" className="space-y-4">
          <TabsList>
            <TabsTrigger value="recent">Recent Payments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="payout">Payout Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="recent">
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Your latest completed jobs and payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPayments.map((payment, index) => (
                      <motion.div
                        key={payment.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <Card className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <motion.div
                                className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <DollarSign className="w-6 h-6 text-green-600" />
                              </motion.div>
                              <div>
                                <h4 className="font-semibold">{payment.job}</h4>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <span>{payment.tenant}</span>
                                  <span>•</span>
                                  <span>{payment.unit}</span>
                                  <span>•</span>
                                  <span>{payment.date}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <motion.div
                                className="text-lg font-bold text-green-600"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                              >
                                ${payment.amount}
                              </motion.div>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <motion.div
                                      key={i}
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ delay: 0.1 * i }}
                                    >
                                      <Star
                                        className={`w-3 h-3 ${i < payment.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                      />
                                    </motion.div>
                                  ))}
                                </div>
                                <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="analytics">
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Detailed breakdown of your earnings and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Earnings by Category</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Plumbing</span>
                          <span className="font-medium">$1,850 (38%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Electrical</span>
                          <span className="font-medium">$1,200 (25%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">HVAC</span>
                          <span className="font-medium">$980 (20%)</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">General</span>
                          <span className="font-medium">$770 (17%)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Performance Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Average Job Value</span>
                          <span className="font-medium">$67</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Jobs per Week</span>
                          <span className="font-medium">18</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Customer Rating</span>
                          <span className="font-medium">4.8/5</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">On-Time Rate</span>
                          <span className="font-medium">95%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="payout">
            <motion.div variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Payout Settings</CardTitle>
                  <CardDescription>Manage how and when you receive payments</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <CreditCard className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium">Bank Account</h4>
                          <p className="text-sm text-muted-foreground">****1234</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Primary</Badge>
                    </Card>

                    <Card className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <Wallet className="w-8 h-8 text-purple-600" />
                        <div>
                          <h4 className="font-medium">Digital Wallet</h4>
                          <p className="text-sm text-muted-foreground">PayPal</p>
                        </div>
                      </div>
                      <Badge variant="outline">Backup</Badge>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Payout Schedule</h4>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" className="bg-transparent">
                        Weekly
                      </Button>
                      <Button>Bi-weekly</Button>
                      <Button variant="outline" className="bg-transparent">
                        Monthly
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Next Payout</h4>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between">
                        <span>Pending Amount</span>
                        <span className="font-bold text-green-600">$450</span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span>Payout Date</span>
                        <span>Friday, Jan 19</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </DashboardLayout>
  )
}
