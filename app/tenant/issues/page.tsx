"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  MessageSquare,
  Eye,
  Droplets,
  Zap,
  Wrench,
  DollarSign,
  Home,
  Menu,
} from "lucide-react"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"

export default function TenantIssuesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createIssueOpen, setCreateIssueOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const issues = [
    {
      id: 1,
      title: "Kitchen sink leaking badly",
      description: "Water is dripping constantly under the kitchen sink. It's getting worse.",
      category: "PLUMBING",
      priority: "HIGH",
      status: "in_progress",
      assignedTo: "Mike Johnson",
      assignedToAvatar: "MJ",
      createdAt: "2 days ago",
      lastUpdate: "Contractor scheduled for tomorrow",
      estimatedCompletion: "Dec 15, 2024",
    },
    {
      id: 2,
      title: "Broken light bulb in hallway",
      description: "The light bulb in the main hallway has burned out.",
      category: "MAINTENANCE",
      priority: "LOW",
      status: "completed",
      assignedTo: "Maintenance Team",
      assignedToAvatar: "MT",
      createdAt: "1 week ago",
      lastUpdate: "Issue resolved - light bulb replaced",
      completedAt: "Dec 8, 2024",
    },
    {
      id: 3,
      title: "AC not cooling properly",
      description: "The air conditioning unit is not cooling the apartment effectively.",
      category: "ELECTRICAL",
      priority: "MEDIUM",
      status: "pending",
      assignedTo: "Tom Davis",
      assignedToAvatar: "TD",
      createdAt: "3 days ago",
      lastUpdate: "Waiting for contractor availability",
      estimatedCompletion: "Dec 18, 2024",
    },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PLUMBING":
        return <Droplets className="w-4 h-4" />
      case "ELECTRICAL":
        return <Zap className="w-4 h-4" />
      case "MAINTENANCE":
        return <Wrench className="w-4 h-4" />
      case "PAYMENT":
        return <DollarSign className="w-4 h-4" />
      default:
        return <Home className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "PLUMBING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "ELECTRICAL":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "MAINTENANCE":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "PAYMENT":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch = issue.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTab = activeTab === "all" || issue.status === activeTab
    return matchesSearch && matchesTab
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen bg-background">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">My Issues</h1>
                <p className="text-sm text-muted-foreground">Track your maintenance requests</p>
              </div>
            </div>
            <Button onClick={() => setCreateIssueOpen(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Report New Issue
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Search */}
            <Card>
              <CardContent className="p-6">
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search your issues..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Issues List */}
            <Card>
              <CardHeader>
                <CardTitle>Your Issues</CardTitle>
                <CardDescription>All your maintenance requests and their current status</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All ({issues.length})</TabsTrigger>
                    <TabsTrigger value="pending">
                      Pending ({issues.filter((i) => i.status === "pending").length})
                    </TabsTrigger>
                    <TabsTrigger value="in_progress">
                      In Progress ({issues.filter((i) => i.status === "in_progress").length})
                    </TabsTrigger>
                    <TabsTrigger value="completed">
                      Completed ({issues.filter((i) => i.status === "completed").length})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab} className="mt-6">
                    <div className="space-y-4">
                      {filteredIssues.map((issue, index) => (
                        <motion.div
                          key={issue.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <Card className="border border-border hover:shadow-md transition-all duration-200">
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                  <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                      {getStatusIcon(issue.status)}
                                      <h3 className="font-semibold text-foreground">{issue.title}</h3>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{issue.description}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Button variant="ghost" size="sm">
                                      <Eye className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                      <MessageSquare className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Tags */}
                                <div className="flex items-center space-x-2">
                                  <Badge className={getCategoryColor(issue.category)}>
                                    {getCategoryIcon(issue.category)}
                                    <span className="ml-1">{issue.category}</span>
                                  </Badge>
                                  <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                                </div>

                                {/* Status and Assignment */}
                                <div className="flex items-center justify-between">
                                  <div className="space-y-1">
                                    <p className="text-sm font-medium text-foreground">Latest Update:</p>
                                    <p className="text-sm text-muted-foreground">{issue.lastUpdate}</p>
                                  </div>

                                  <div className="flex items-center space-x-3">
                                    <div className="text-right text-sm">
                                      {issue.status === "completed" ? (
                                        <p className="text-green-600 font-medium">Completed {issue.completedAt}</p>
                                      ) : (
                                        <p className="text-muted-foreground">
                                          Est. completion: {issue.estimatedCompletion}
                                        </p>
                                      )}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <Avatar className="w-8 h-8">
                                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                                          {issue.assignedToAvatar}
                                        </AvatarFallback>
                                      </Avatar>
                                      <div className="text-sm">
                                        <p className="font-medium">{issue.assignedTo}</p>
                                        <p className="text-muted-foreground">{issue.createdAt}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}

                      {filteredIssues.length === 0 && (
                        <div className="text-center py-12">
                          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                          <p className="text-muted-foreground">
                            {searchQuery ? "Try adjusting your search terms" : "You have no issues in this category"}
                          </p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      <CreateIssueDialog open={createIssueOpen} onOpenChange={setCreateIssueOpen} />
    </div>
  )
}
