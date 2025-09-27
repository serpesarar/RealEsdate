"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  UserPlus,
  Star,
  Clock,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle,
  Search,
  MoreHorizontal,
  Edit,
  MessageSquare,
  Users,
  Wrench,
  Settings,
} from "lucide-react"

const staffMembers = [
  {
    id: 1,
    name: "Mike Johnson",
    role: "Property Manager",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    rating: 4.8,
    completedTasks: 156,
    responseTime: "2.3 hrs",
    salary: "$65,000",
    phone: "+1 (555) 123-4567",
    email: "mike.johnson@company.com",
    joinDate: "2022-03-15",
    properties: 12,
    specialties: ["Tenant Relations", "Maintenance Coordination"],
    performance: 92,
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Maintenance Coordinator",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    rating: 4.9,
    completedTasks: 203,
    responseTime: "1.8 hrs",
    salary: "$58,000",
    phone: "+1 (555) 234-5678",
    email: "sarah.williams@company.com",
    joinDate: "2021-11-08",
    properties: 8,
    specialties: ["Emergency Response", "Vendor Management"],
    performance: 96,
  },
  {
    id: 3,
    name: "David Chen",
    role: "Handyman",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "on-site",
    rating: 4.7,
    completedTasks: 89,
    responseTime: "3.1 hrs",
    salary: "$45,000",
    phone: "+1 (555) 345-6789",
    email: "david.chen@company.com",
    joinDate: "2023-01-20",
    properties: 15,
    specialties: ["Plumbing", "Electrical", "HVAC"],
    performance: 88,
  },
  {
    id: 4,
    name: "Lisa Rodriguez",
    role: "Leasing Agent",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "active",
    rating: 4.6,
    completedTasks: 67,
    responseTime: "4.2 hrs",
    salary: "$52,000",
    phone: "+1 (555) 456-7890",
    email: "lisa.rodriguez@company.com",
    joinDate: "2023-06-12",
    properties: 6,
    specialties: ["Tenant Screening", "Marketing"],
    performance: 85,
  },
]

const performanceMetrics = [
  { label: "Team Efficiency", value: 92, change: "+5%" },
  { label: "Response Time", value: 2.8, unit: "hrs", change: "-12%" },
  { label: "Tenant Satisfaction", value: 4.7, unit: "/5", change: "+3%" },
  { label: "Cost per Task", value: 145, unit: "$", change: "-8%" },
]

export default function OwnerStaffPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false)

  const filteredStaff = staffMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || member.role.toLowerCase().includes(filterRole.toLowerCase())
    const matchesStatus = filterStatus === "all" || member.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "on-site":
        return "bg-blue-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Available"
      case "on-site":
        return "On Site"
      case "offline":
        return "Offline"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Staff Management
            </h1>
            <p className="text-gray-600 mt-1">Manage your property management team</p>
          </div>
          <Dialog open={isAddStaffOpen} onOpenChange={setIsAddStaffOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Staff Member
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Staff Member</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property-manager">Property Manager</SelectItem>
                        <SelectItem value="maintenance-coordinator">Maintenance Coordinator</SelectItem>
                        <SelectItem value="handyman">Handyman</SelectItem>
                        <SelectItem value="leasing-agent">Leasing Agent</SelectItem>
                        <SelectItem value="accountant">Accountant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter phone number" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="salary">Annual Salary</Label>
                  <Input id="salary" placeholder="Enter annual salary" />
                </div>

                <div className="space-y-2">
                  <Label>Access Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "View Properties",
                      "Edit Properties",
                      "Manage Tenants",
                      "Financial Access",
                      "Staff Management",
                      "Analytics",
                    ].map((permission) => (
                      <div key={permission} className="flex items-center space-x-2">
                        <Checkbox id={permission} />
                        <Label htmlFor={permission} className="text-sm">
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialties">Specialties/Skills</Label>
                  <Textarea id="specialties" placeholder="Enter specialties or skills (comma separated)" rows={3} />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setIsAddStaffOpen(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700">Add Staff Member</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Performance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {performanceMetrics.map((metric, index) => (
            <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                    <div className="flex items-baseline gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        {metric.value}
                        {metric.unit}
                      </p>
                      <Badge
                        variant={metric.change.startsWith("+") ? "default" : "secondary"}
                        className={
                          metric.change.startsWith("+") ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                        }
                      >
                        {metric.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Staff Management Tabs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Tabs defaultValue="team" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="team">Team Overview</TabsTrigger>
              <TabsTrigger value="managers">Property Managers</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance Team</TabsTrigger>
            </TabsList>

            <TabsContent value="team" className="space-y-6">
              {/* Search and Filters */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search staff members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={filterRole} onValueChange={setFilterRole}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="manager">Property Manager</SelectItem>
                        <SelectItem value="coordinator">Maintenance Coordinator</SelectItem>
                        <SelectItem value="handyman">Handyman</SelectItem>
                        <SelectItem value="agent">Leasing Agent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Available</SelectItem>
                        <SelectItem value="on-site">On Site</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Staff Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredStaff.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-blue-50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-4">
                            <div className="relative">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                                <AvatarFallback>
                                  {member.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-white`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gray-600">{member.role}</p>
                              <Badge variant="outline" className="mt-1 text-xs">
                                {getStatusText(member.status)}
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Star className="w-4 h-4 text-yellow-500" />
                              <span className="font-medium">{member.rating}</span>
                              <span className="text-gray-500">rating</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="font-medium">{member.completedTasks}</span>
                              <span className="text-gray-500">tasks</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-blue-500" />
                              <span className="font-medium">{member.responseTime}</span>
                              <span className="text-gray-500">avg response</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-purple-500" />
                              <span className="font-medium">{member.properties}</span>
                              <span className="text-gray-500">properties</span>
                            </div>
                          </div>
                        </div>

                        <div className="mb-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-600">Performance</span>
                            <span className="text-sm font-medium text-gray-900">{member.performance}%</span>
                          </div>
                          <Progress value={member.performance} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-1 mb-4">
                          {member.specialties.map((specialty, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="managers" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Property Managers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers
                      .filter((member) => member.role === "Property Manager")
                      .map((manager) => (
                        <div
                          key={manager.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={manager.avatar || "/placeholder.svg"} alt={manager.name} />
                              <AvatarFallback>
                                {manager.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{manager.name}</h4>
                              <p className="text-sm text-gray-600">{manager.properties} properties assigned</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">{manager.rating}/5</p>
                              <p className="text-xs text-gray-500">Rating</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{manager.completedTasks}</p>
                              <p className="text-xs text-gray-500">Tasks</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{manager.salary}</p>
                              <p className="text-xs text-gray-500">Salary</p>
                            </div>
                            <Button variant="outline" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-blue-600" />
                    Maintenance Team
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {staffMembers
                      .filter((member) => member.role.includes("Maintenance") || member.role === "Handyman")
                      .map((worker) => (
                        <div
                          key={worker.id}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-white rounded-lg border"
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                              <AvatarFallback>
                                {worker.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{worker.name}</h4>
                              <p className="text-sm text-gray-600">{worker.role}</p>
                              <div className="flex gap-1 mt-1">
                                {worker.specialties.map((specialty, idx) => (
                                  <Badge key={idx} variant="secondary" className="text-xs">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-center">
                              <p className="text-sm font-medium">{worker.rating}/5</p>
                              <p className="text-xs text-gray-500">Rating</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm font-medium">{worker.responseTime}</p>
                              <p className="text-xs text-gray-500">Response</p>
                            </div>
                            <div className="text-center">
                              <Badge variant={worker.status === "active" ? "default" : "secondary"}>
                                {getStatusText(worker.status)}
                              </Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              <Calendar className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
