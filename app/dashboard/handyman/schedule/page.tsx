"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, User, CheckCircle, AlertCircle, Plus } from "lucide-react"
import { format, addDays, isToday } from "date-fns"

const scheduleData = [
  {
    id: 1,
    time: "09:00",
    duration: "2 hours",
    title: "Kitchen Faucet Repair",
    tenant: "Sarah Johnson",
    unit: "Apt 204",
    location: "Building A, Floor 2",
    status: "confirmed",
    priority: "high",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    time: "11:30",
    duration: "1.5 hours",
    title: "Light Fixture Installation",
    tenant: "Mike Chen",
    unit: "Apt 156",
    location: "Building B, Floor 1",
    status: "confirmed",
    priority: "medium",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    time: "14:00",
    duration: "3 hours",
    title: "AC Unit Maintenance",
    tenant: "Lisa Rodriguez",
    unit: "Apt 301",
    location: "Building A, Floor 3",
    status: "pending",
    priority: "high",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    time: "16:30",
    duration: "1 hour",
    title: "Outlet Repair",
    tenant: "David Wilson",
    unit: "Apt 102",
    location: "Building A, Floor 1",
    status: "completed",
    priority: "low",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const upcomingWeek = [
  { date: new Date(), jobs: 4, earnings: 320 },
  { date: addDays(new Date(), 1), jobs: 3, earnings: 240 },
  { date: addDays(new Date(), 2), jobs: 5, earnings: 400 },
  { date: addDays(new Date(), 3), jobs: 2, earnings: 160 },
  { date: addDays(new Date(), 4), jobs: 4, earnings: 320 },
  { date: addDays(new Date(), 5), jobs: 3, earnings: 240 },
  { date: addDays(new Date(), 6), jobs: 1, earnings: 80 },
]

export default function HandymanSchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"day" | "week">("day")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
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

  return (
    <DashboardLayout userRole="handyman">
      <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Header */}
        <motion.div className="flex items-center justify-between" variants={cardVariants}>
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
            <p className="text-muted-foreground">Manage your appointments and work orders</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setViewMode(viewMode === "day" ? "week" : "day")}>
              {viewMode === "day" ? "Week View" : "Day View"}
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Appointment
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={staggerContainer}>
          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 text-center">
                <motion.div
                  className="text-2xl font-bold text-blue-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  4
                </motion.div>
                <div className="text-sm text-muted-foreground">Today's Jobs</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 text-center">
                <motion.div
                  className="text-2xl font-bold text-green-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  $320
                </motion.div>
                <div className="text-sm text-muted-foreground">Today's Earnings</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 text-center">
                <motion.div
                  className="text-2xl font-bold text-purple-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  22
                </motion.div>
                <div className="text-sm text-muted-foreground">This Week</div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-4 text-center">
                <motion.div
                  className="text-2xl font-bold text-orange-600"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                >
                  95%
                </motion.div>
                <div className="text-sm text-muted-foreground">On-Time Rate</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {viewMode === "day" ? (
          <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={staggerContainer}>
            {/* Today's Schedule */}
            <motion.div className="lg:col-span-2" variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Schedule - {format(selectedDate, "MMM d, yyyy")}
                  </CardTitle>
                  <CardDescription>Your appointments and work orders for today</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <AnimatePresence>
                    {scheduleData.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="cursor-pointer"
                      >
                        <Card className="p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start gap-4">
                            <motion.div
                              className="text-center min-w-[60px]"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.2 }}
                            >
                              <div className="text-lg font-bold">{appointment.time}</div>
                              <div className="text-xs text-muted-foreground">{appointment.duration}</div>
                            </motion.div>

                            <div className="flex-1 space-y-2">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold">{appointment.title}</h4>
                                <div className="flex items-center gap-2">
                                  <Badge className={getPriorityColor(appointment.priority)}>
                                    {appointment.priority}
                                  </Badge>
                                  <Badge className={getStatusColor(appointment.status)}>
                                    {appointment.status === "confirmed" && <CheckCircle className="w-3 h-3 mr-1" />}
                                    {appointment.status === "pending" && <AlertCircle className="w-3 h-3 mr-1" />}
                                    {appointment.status === "completed" && <CheckCircle className="w-3 h-3 mr-1" />}
                                    {appointment.status}
                                  </Badge>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {appointment.tenant}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {appointment.unit}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="w-6 h-6">
                                    <AvatarImage src={appointment.avatar || "/placeholder.svg"} />
                                    <AvatarFallback>
                                      {appointment.tenant
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm text-muted-foreground">{appointment.location}</span>
                                </div>
                                <div className="flex gap-2">
                                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="sm" variant="outline">
                                      View Details
                                    </Button>
                                  </motion.div>
                                  {appointment.status === "pending" && (
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                      <Button size="sm">Confirm</Button>
                                    </motion.div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Actions & Stats */}
            <motion.div className="space-y-6" variants={cardVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full justify-start">
                      <Clock className="w-4 h-4 mr-2" />
                      Clock In/Out
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <MapPin className="w-4 h-4 mr-2" />
                      Update Location
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Plus className="w-4 h-4 mr-2" />
                      Request Time Off
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Today</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Jobs Completed</span>
                    <motion.span
                      className="font-bold text-green-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      1/4
                    </motion.span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">On-Time Rate</span>
                    <motion.span
                      className="font-bold text-blue-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      100%
                    </motion.span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Customer Rating</span>
                    <motion.span
                      className="font-bold text-yellow-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      4.8/5
                    </motion.span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div variants={cardVariants}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Week Overview
                </CardTitle>
                <CardDescription>Your schedule for the upcoming week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {upcomingWeek.map((day, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-pointer"
                    >
                      <Card className={`p-4 text-center ${isToday(day.date) ? "border-blue-500 bg-blue-50" : ""}`}>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">{format(day.date, "EEE")}</div>
                          <div className="text-lg font-bold">{format(day.date, "d")}</div>
                          <div className="text-sm text-muted-foreground">{day.jobs} jobs</div>
                          <div className="text-sm font-medium text-green-600">${day.earnings}</div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </DashboardLayout>
  )
}
