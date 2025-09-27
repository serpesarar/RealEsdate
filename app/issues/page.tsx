"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Wrench,
  Zap,
  Droplets,
  Home,
  DollarSign,
  Menu,
} from "lucide-react"
import { IssueCard } from "@/components/issues/issue-card"
import { CreateIssueDialog } from "@/components/issues/create-issue-dialog"

export default function IssuesPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [createIssueOpen, setCreateIssueOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const issues = [
    {
      id: 1,
      title: "Kitchen sink leaking badly",
      description: "Water is dripping constantly under the kitchen sink. It's getting worse.",
      property: "Park Avenue Towers",
      unit: "12A",
      tenant: "John Smith",
      category: "PLUMBING",
      priority: "HIGH",
      status: "in_progress",
      assignedTo: "Mike Johnson",
      assignedToAvatar: "MJ",
      createdAt: "2 hours ago",
      estimatedCost: "$150-300",
      aiConfidence: 95,
    },
    {
      id: 2,
      title: "AC not working properly",
      description: "The air conditioning unit is not cooling the apartment effectively.",
      property: "Sunset Gardens",
      unit: "5B",
      tenant: "Sarah Wilson",
      category: "ELECTRICAL",
      priority: "MEDIUM",
      status: "pending",
      assignedTo: "Tom Davis",
      assignedToAvatar: "TD",
      createdAt: "4 hours ago",
      estimatedCost: "$200-500",
      aiConfidence: 88,
    },
    {
      id: 3,
      title: "Broken window in living room",
      description: "Window pane is cracked and needs replacement.",
      property: "Metro Plaza",
      unit: "8C",
      tenant: "Emily Johnson",
      category: "MAINTENANCE",
      priority: "LOW",
      status: "completed",
      assignedTo: "Alex Rodriguez",
      assignedToAvatar: "AR",
      createdAt: "1 day ago",
      estimatedCost: "$100-200",
      aiConfidence: 92,
    },
    {
      id: 4,
      title: "Rent payment issue",
      description: "Unable to process rent payment through the portal.",
      property: "Downtown Heights",
      unit: "3A",
      tenant: "Michael Brown",
      category: "PAYMENT",
      priority: "HIGH",
      status: "pending",
      assignedTo: "Finance Team",
      assignedToAvatar: "FT",
      createdAt: "6 hours ago",
      estimatedCost: "N/A",
      aiConfidence: 98,
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

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.property.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.unit.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || issue.status === activeTab

    return matchesSearch && matchesTab
  })

  const statusCounts = {
    all: issues.length,
    pending: issues.filter((i) => i.status === "pending").length,
    in_progress: issues.filter((i) => i.status === "in_progress").length,
    completed: issues.filter((i) => i.status === "completed").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                  <Menu className="w-5 h-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Issues & Maintenance</h1>
                  <p className="text-sm text-muted-foreground">AI-powered issue tracking and resolution</p>
                </div>
              </div>
              <Button onClick={() => setCreateIssueOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Issues</p>
                          <p className="text-2xl font-bold text-foreground">{issues.length}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                          <p className="text-2xl font-bold text-foreground">{statusCounts.in_progress}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Completed</p>
                          <p className="text-2xl font-bold text-foreground">{statusCounts.completed}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card className="border-0 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">AI Accuracy</p>
                          <p className="text-2xl font-bold text-foreground">94%</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 max-w-md">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          placeholder="Search issues, properties, or units..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>All Issues</CardTitle>
                  <CardDescription>Manage and track maintenance requests across all properties</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                      <TabsTrigger value="pending">Pending ({statusCounts.pending})</TabsTrigger>
                      <TabsTrigger value="in_progress">In Progress ({statusCounts.in_progress})</TabsTrigger>
                      <TabsTrigger value="completed">Completed ({statusCounts.completed})</TabsTrigger>
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
                            <IssueCard
                              issue={issue}
                              getCategoryIcon={getCategoryIcon}
                              getCategoryColor={getCategoryColor}
                            />
                          </motion.div>
                        ))}

                        {filteredIssues.length === 0 && (
                          <div className="text-center py-12">
                            <AlertTriangle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-foreground mb-2">No issues found</h3>
                            <p className="text-muted-foreground">
                              {searchQuery ? "Try adjusting your search terms" : "No issues match the current filter"}
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
    </div>
  )
}
