"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { DelegationModal } from "@/components/delegation-modal"
import { ExpenseTracker } from "@/components/expense-tracker"
import {
  Wrench,
  Zap,
  Droplets,
  Thermometer,
  Home,
  Clock,
  DollarSign,
  CheckCircle,
  MessageSquare,
  ShoppingCart,
  Star,
  Upload,
  Users,
  Calendar,
  TrendingUp,
  MapPin,
  Phone,
} from "lucide-react"

const urgencyColors = {
  low: "bg-green-100 text-green-800 border-green-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  high: "bg-red-100 text-red-800 border-red-200",
}

const categoryIcons = {
  plumbing: Droplets,
  electrical: Zap,
  appliance: Wrench,
  hvac: Thermometer,
  structural: Home,
  other: Wrench,
}

const mockJobs = {
  pending: [
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      category: "plumbing",
      unit: "Apt 204",
      urgency: "high",
      timePosted: "2 hours ago",
      description: "Water dripping from kitchen faucet handle",
      tenant: "Sarah Johnson",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      estimatedTime: "2-3 hours",
      location: "Building A, Floor 2",
    },
    {
      id: 2,
      title: "Outlet Not Working",
      category: "electrical",
      unit: "Apt 156",
      urgency: "medium",
      timePosted: "4 hours ago",
      description: "Bedroom outlet has no power",
      tenant: "Mike Chen",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      estimatedTime: "1-2 hours",
      location: "Building B, Floor 1",
    },
    {
      id: 3,
      title: "AC Not Cooling",
      category: "hvac",
      unit: "Apt 301",
      urgency: "high",
      timePosted: "1 hour ago",
      description: "Air conditioning unit not producing cold air",
      tenant: "Lisa Rodriguez",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      estimatedTime: "3-4 hours",
      location: "Building A, Floor 3",
    },
  ],
  active: [
    {
      id: 4,
      title: "Dishwasher Repair",
      category: "appliance",
      unit: "Apt 102",
      urgency: "medium",
      progress: 65,
      timeStarted: "3 hours ago",
      eta: "2 hours",
      tenant: "David Wilson",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      location: "Building A, Floor 1",
    },
    {
      id: 5,
      title: "Bathroom Tile Repair",
      category: "structural",
      unit: "Apt 205",
      urgency: "low",
      progress: 30,
      timeStarted: "1 day ago",
      eta: "4 hours",
      tenant: "Emma Davis",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      location: "Building A, Floor 2",
    },
  ],
  completed: [
    {
      id: 6,
      title: "Light Fixture Installation",
      category: "electrical",
      unit: "Apt 178",
      completedTime: "2 hours ago",
      cost: 85,
      rating: 5,
      tenant: "John Smith",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      paymentStatus: "paid",
      location: "Building B, Floor 1",
    },
    {
      id: 7,
      title: "Garbage Disposal Fix",
      category: "plumbing",
      unit: "Apt 143",
      completedTime: "1 day ago",
      cost: 120,
      rating: 4,
      tenant: "Anna Brown",
      tenantAvatar: "/placeholder.svg?height=32&width=32",
      paymentStatus: "pending",
      location: "Building B, Floor 1",
    },
  ],
}

export default function HandymanDashboard() {
  const [selectedJob, setSelectedJob] = useState<any>(null)
  const [noteText, setNoteText] = useState("")
  const [etaUpdate, setEtaUpdate] = useState("")
  const [delegationModal, setDelegationModal] = useState<{ isOpen: boolean; job: any }>({ isOpen: false, job: null })

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

  const acceptJob = (jobId: number) => {
    console.log("[v0] Accepting job:", jobId)
    // Move job from pending to active with animation
  }

  const delegateJob = (job: any) => {
    console.log("[v0] Opening delegation modal for job:", job.id)
    setDelegationModal({ isOpen: true, job })
  }

  const handleDelegation = (memberId: number, reason: string, priority: string, notes: string) => {
    console.log("[v0] Delegating job to member:", memberId, reason, priority, notes)
    setDelegationModal({ isOpen: false, job: null })
  }

  const uploadReceipt = (jobId: number) => {
    console.log("[v0] Uploading receipt for job:", jobId)
    // Handle receipt upload
  }

  const addNote = (jobId: number, note: string) => {
    console.log("[v0] Adding note to job:", jobId, note)
    setNoteText("")
  }

  const requestMaterials = (jobId: number) => {
    console.log("[v0] Requesting materials for job:", jobId)
    // Handle material request
  }

  const contactTenant = (jobId: number) => {
    console.log("[v0] Contacting tenant for job:", jobId)
    // Open communication
  }

  const updateETA = (jobId: number, eta: string) => {
    console.log("[v0] Updating ETA for job:", jobId, eta)
    setEtaUpdate("")
  }

  return (
    <motion.div className="space-y-6" initial="hidden" animate="visible" variants={staggerContainer}>
      {/* Header */}
      <motion.div variants={cardVariants}>
        <h1 className="text-3xl font-bold text-foreground">Handyman Dashboard</h1>
        <p className="text-muted-foreground">Manage your work orders and track progress</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" variants={staggerContainer}>
        <motion.div variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Wrench className="h-4 w-4 text-muted-foreground" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                className="text-2xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {mockJobs.active.length}
              </motion.div>
              <p className="text-xs text-muted-foreground">Currently working on</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <motion.div
                className="text-2xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                3
              </motion.div>
              <p className="text-xs text-muted-foreground">Jobs finished today</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <Clock className="h-4 w-4 text-yellow-600" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                className="text-2xl font-bold text-yellow-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                2
              </motion.div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week Earnings</CardTitle>
              <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <DollarSign className="h-4 w-4 text-green-600" />
              </motion.div>
            </CardHeader>
            <CardContent>
              <motion.div
                className="text-2xl font-bold text-green-600"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                $1250
              </motion.div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-600" />
                +12% from last week
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Job Management Kanban Board */}
      <motion.div className="grid gap-6 lg:grid-cols-3" variants={staggerContainer}>
        {/* New Requests Column */}
        <motion.div variants={cardVariants}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 bg-blue-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                New Requests
                <Badge variant="secondary">{mockJobs.pending.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {mockJobs.pending.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category as keyof typeof categoryIcons]
                  return (
                    <motion.div
                      key={job.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="cursor-pointer"
                    >
                      <Card className="p-4 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <motion.div
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                              >
                                <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                              </motion.div>
                              <span className="font-medium text-sm">{job.title}</span>
                            </div>
                            <motion.div
                              animate={job.urgency === "high" ? { scale: [1, 1.1, 1] } : {}}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <Badge className={urgencyColors[job.urgency as keyof typeof urgencyColors]}>
                                {job.urgency === "high" ? "🔴" : job.urgency === "medium" ? "🟡" : "🟢"}
                                {job.urgency.toUpperCase()}
                              </Badge>
                            </motion.div>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                              <Home className="w-3 h-3" />
                              {job.unit}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {job.timePosted} • Est: {job.estimatedTime}
                            </div>
                          </div>

                          <p className="text-sm text-muted-foreground">{job.description}</p>

                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={job.tenantAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {job.tenant
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{job.tenant}</span>
                          </div>

                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                              <Button size="sm" onClick={() => acceptJob(job.id)} className="w-full">
                                Accept
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" onClick={() => delegateJob(job)}>
                                <Users className="w-3 h-3" />
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline">
                                <Phone className="w-3 h-3" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* In Progress Column */}
        <motion.div variants={cardVariants}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 bg-yellow-500 rounded-full"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                />
                In Progress
                <Badge variant="secondary">{mockJobs.active.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {mockJobs.active.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category as keyof typeof categoryIcons]
                  return (
                    <motion.div
                      key={job.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <Card className="p-4 border-l-4 border-l-yellow-500 hover:shadow-md transition-shadow">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{job.title}</span>
                            </div>
                            <Badge className={urgencyColors[job.urgency as keyof typeof urgencyColors]}>
                              {job.urgency === "high" ? "🔴" : job.urgency === "medium" ? "🟡" : "🟢"}
                              {job.urgency.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                              <Home className="w-3 h-3" />
                              {job.unit}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              Started {job.timeStarted} • ETA: {job.eta}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span>{job.progress}%</span>
                            </div>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: 1, delay: 0.5 }}
                            >
                              <Progress value={job.progress} className="h-2" />
                            </motion.div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={job.tenantAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {job.tenant
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{job.tenant}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <ExpenseTracker jobId={job.id} jobTitle={job.title} />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline" className="w-full bg-transparent">
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Note
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => requestMaterials(job.id)}
                                className="bg-transparent"
                              >
                                <ShoppingCart className="w-3 h-3 mr-1" />
                                Materials
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => contactTenant(job.id)}
                                className="bg-transparent"
                              >
                                <MessageSquare className="w-3 h-3 mr-1" />
                                Contact
                              </Button>
                            </motion.div>
                          </div>

                          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button size="sm" variant="outline" className="w-full bg-transparent">
                              <Calendar className="w-3 h-3 mr-1" />
                              Update ETA
                            </Button>
                          </motion.div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Completed Column */}
        <motion.div variants={cardVariants}>
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <motion.div
                  className="w-3 h-3 bg-green-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
                Completed
                <Badge variant="secondary">{mockJobs.completed.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence>
                {mockJobs.completed.map((job, index) => {
                  const CategoryIcon = categoryIcons[job.category as keyof typeof categoryIcons]
                  return (
                    <motion.div
                      key={job.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                    >
                      <Card className="p-4 border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <CategoryIcon className="w-4 h-4 text-muted-foreground" />
                              <span className="font-medium text-sm">{job.title}</span>
                            </div>
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: "spring" }}
                            >
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </motion.div>
                          </div>

                          <div className="text-sm text-muted-foreground space-y-1">
                            <div className="flex items-center gap-2">
                              <Home className="w-3 h-3" />
                              {job.unit}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-3 h-3" />
                              {job.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              Completed {job.completedTime}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{ delay: 0.1 * i }}
                                >
                                  <Star
                                    className={`w-3 h-3 ${i < job.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                </motion.div>
                              ))}
                              <span className="text-sm text-muted-foreground ml-1">({job.rating}/5)</span>
                            </div>
                            <motion.div
                              className="text-sm font-medium text-green-600"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              ${job.cost}
                            </motion.div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={job.tenantAvatar || "/placeholder.svg"} />
                              <AvatarFallback>
                                {job.tenant
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">{job.tenant}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              <Badge variant={job.paymentStatus === "paid" ? "default" : "secondary"}>
                                {job.paymentStatus === "paid" ? "✅ Paid" : "⏳ Pending"}
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button size="sm" variant="outline">
                                <Upload className="w-3 h-3 mr-1" />
                                Photos
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Delegation Modal */}
      <DelegationModal
        isOpen={delegationModal.isOpen}
        onClose={() => setDelegationModal({ isOpen: false, job: null })}
        jobTitle={delegationModal.job?.title || ""}
        onDelegate={handleDelegation}
      />
    </motion.div>
  )
}
