"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Clock, CheckCircle, Calendar, MapPin, User, Phone, MessageSquare, Star } from "lucide-react"

const workOrdersData = {
  active: [
    {
      id: "WO-2024-001",
      title: "Kitchen Sink Leak",
      unit: "Unit 4B",
      address: "245 Park Ave",
      tenant: "Sarah Johnson",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      priority: "urgent",
      category: "plumbing",
      description: "Water dripping from under the kitchen sink. Tenant reports it started yesterday evening.",
      timePosted: "2 hours ago",
      estimatedTime: "2-3 hours",
    },
    {
      id: "WO-2024-002",
      title: "Electrical Outlet Not Working",
      unit: "Unit 2A",
      address: "245 Park Ave",
      tenant: "Mike Chen",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      priority: "high",
      category: "electrical",
      description: "Bedroom outlet has no power. Tenant needs it for medical equipment.",
      timePosted: "4 hours ago",
      estimatedTime: "1-2 hours",
    },
    {
      id: "WO-2024-003",
      title: "AC Unit Maintenance",
      unit: "Unit 5C",
      address: "245 Park Ave",
      tenant: "Lisa Rodriguez",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      priority: "medium",
      category: "hvac",
      description: "Regular maintenance check for AC unit. Filter replacement needed.",
      timePosted: "1 day ago",
      estimatedTime: "1 hour",
    },
  ],
  scheduled: [
    {
      id: "WO-2024-004",
      title: "Bathroom Tile Repair",
      unit: "Unit 3A",
      address: "245 Park Ave",
      tenant: "David Wilson",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      priority: "low",
      category: "maintenance",
      description: "Replace cracked tiles in bathroom shower area.",
      scheduledDate: "Tomorrow 9:00 AM",
      estimatedTime: "3-4 hours",
    },
  ],
  completed: [
    {
      id: "WO-2024-005",
      title: "Light Fixture Installation",
      unit: "Unit 1B",
      address: "245 Park Ave",
      tenant: "Emma Davis",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      priority: "medium",
      category: "electrical",
      description: "Install new LED light fixture in living room.",
      completedTime: "2 hours ago",
      rating: 5,
      cost: 85,
    },
  ],
}

const priorityColors = {
  urgent: "bg-red-100 text-red-800 border-red-200",
  high: "bg-orange-100 text-orange-800 border-orange-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export default function HandymanWorkOrdersPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

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

  const startJob = (orderId: string) => {
    console.log("[v0] Starting job:", orderId)
    // Handle job start logic
  }

  const contactTenant = (orderId: string) => {
    console.log("[v0] Contacting tenant for order:", orderId)
    // Handle tenant contact logic
  }

  return (
    <DashboardLayout userRole="handyman">
      <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
        {/* Header */}
        <motion.div variants={cardVariants}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Work Orders Management
              </h1>
              <p className="text-muted-foreground mt-2">Manage and track all your assigned work orders</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div className="grid grid-cols-1 md:grid-cols-4 gap-4" variants={staggerContainer}>
          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">New Orders</p>
                    <motion.p
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      5
                    </motion.p>
                  </div>
                  <motion.div
                    className="bg-orange-100 p-3 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertCircle className="w-6 h-6 text-orange-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">In Progress</p>
                    <motion.p
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      3
                    </motion.p>
                  </div>
                  <motion.div
                    className="bg-blue-100 p-3 rounded-full"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Clock className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Completed Today</p>
                    <motion.p
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      8
                    </motion.p>
                  </div>
                  <motion.div
                    className="bg-green-100 p-3 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="hover:shadow-lg transition-shadow duration-300 border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">This Week</p>
                    <motion.p
                      className="text-3xl font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      24
                    </motion.p>
                  </div>
                  <motion.div
                    className="bg-purple-100 p-3 rounded-full"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tab Navigation and Work Orders */}
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab("active")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "active"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Active Orders ({workOrdersData.active.length})
                </button>
                <button
                  onClick={() => setActiveTab("scheduled")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "scheduled"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Scheduled ({workOrdersData.scheduled.length})
                </button>
                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-6 py-4 font-medium transition-colors ${
                    activeTab === "completed"
                      ? "text-orange-600 border-b-2 border-orange-600"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Completed ({workOrdersData.completed.length})
                </button>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <AnimatePresence mode="wait">
                {activeTab === "active" && (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {workOrdersData.active.map((order, index) => (
                      <motion.div
                        key={order.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="cursor-pointer"
                      >
                        <Card className="p-6 border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={priorityColors[order.priority as keyof typeof priorityColors]}>
                                  {order.priority.toUpperCase()}
                                </Badge>
                                <span className="text-muted-foreground text-sm">{order.id}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {order.title} - {order.unit}
                              </h3>
                              <p className="text-muted-foreground mb-3">{order.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <MapPin className="w-4 h-4" />
                                  {order.address}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <User className="w-4 h-4" />
                                  {order.tenant}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  {order.timePosted}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                  onClick={() => startJob(order.id)}
                                  className="bg-orange-600 hover:bg-orange-700"
                                >
                                  Start Job
                                </Button>
                              </motion.div>
                              <div className="flex gap-2">
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button size="sm" variant="outline" onClick={() => contactTenant(order.id)}>
                                    <Phone className="w-3 h-3 mr-1" />
                                    Call
                                  </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button size="sm" variant="outline">
                                    <MessageSquare className="w-3 h-3 mr-1" />
                                    Message
                                  </Button>
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "scheduled" && (
                  <motion.div
                    key="scheduled"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {workOrdersData.scheduled.map((order, index) => (
                      <motion.div
                        key={order.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <Card className="p-6 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <Badge className={priorityColors[order.priority as keyof typeof priorityColors]}>
                                  {order.priority.toUpperCase()}
                                </Badge>
                                <span className="text-muted-foreground text-sm">{order.id}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {order.title} - {order.unit}
                              </h3>
                              <p className="text-muted-foreground mb-3">{order.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {order.scheduledDate}
                                </span>
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  Est: {order.estimatedTime}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant="outline">View Details</Button>
                              </motion.div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}

                {activeTab === "completed" && (
                  <motion.div
                    key="completed"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-4"
                  >
                    {workOrdersData.completed.map((order, index) => (
                      <motion.div
                        key={order.id}
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <Card className="p-6 border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                                <span className="text-muted-foreground text-sm">{order.id}</span>
                              </div>
                              <h3 className="text-lg font-semibold text-foreground mb-2">
                                {order.title} - {order.unit}
                              </h3>
                              <p className="text-muted-foreground mb-3">{order.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center gap-1 text-muted-foreground">
                                  <Clock className="w-4 h-4" />
                                  Completed {order.completedTime}
                                </span>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < order.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                  <span className="text-muted-foreground ml-1">({order.rating}/5)</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <motion.div
                                className="text-lg font-bold text-green-600"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.3 }}
                              >
                                ${order.cost}
                              </motion.div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Weekly Schedule */}
        <motion.div variants={cardVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Weekly Schedule Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-4">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
                  <motion.div
                    key={day}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: index * 0.1 }}
                    className="text-center"
                  >
                    <p className="font-medium text-foreground mb-2">{day}</p>
                    <div className="space-y-2">
                      {index < 5 && (
                        <>
                          <motion.div className="bg-orange-100 rounded p-2 text-xs" whileHover={{ scale: 1.05 }}>
                            <p className="font-medium">9:00 AM</p>
                            <p className="text-muted-foreground">Unit 2A</p>
                          </motion.div>
                          {index < 3 && (
                            <motion.div className="bg-blue-100 rounded p-2 text-xs" whileHover={{ scale: 1.05 }}>
                              <p className="font-medium">2:00 PM</p>
                              <p className="text-muted-foreground">Unit 5C</p>
                            </motion.div>
                          )}
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  )
}
