"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserCheck, Plus, Search, Filter, Star, CheckCircle, Wrench, Menu } from "lucide-react"
import { ContractorCard } from "@/components/contractors/contractor-card"
import { AddContractorDialog } from "@/components/contractors/add-contractor-dialog"

export default function ContractorsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [addContractorOpen, setAddContractorOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const contractors = [
    {
      id: 1,
      name: "Mike Johnson",
      avatar: "MJ",
      specialty: "Plumbing",
      rating: 4.8,
      completedJobs: 156,
      activeJobs: 3,
      phone: "(555) 123-4567",
      email: "mike@plumbingpro.com",
      location: "Manhattan, NY",
      status: "active",
      joinedDate: "Jan 2023",
      hourlyRate: 85,
      responseTime: "2 hours",
      skills: ["Emergency Repairs", "Pipe Installation", "Leak Detection"],
      recentJobs: [
        { property: "Park Avenue Towers", unit: "12A", issue: "Kitchen sink leak", status: "completed" },
        { property: "Sunset Gardens", unit: "8B", issue: "Bathroom pipe repair", status: "in_progress" },
      ],
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "SW",
      specialty: "Electrical",
      rating: 4.9,
      completedJobs: 203,
      activeJobs: 2,
      phone: "(555) 234-5678",
      email: "sarah@electricpro.com",
      location: "Brooklyn, NY",
      status: "active",
      joinedDate: "Mar 2022",
      hourlyRate: 95,
      responseTime: "1 hour",
      skills: ["Wiring", "Panel Upgrades", "Smart Home Installation"],
      recentJobs: [
        { property: "Metro Plaza", unit: "5C", issue: "Outlet installation", status: "completed" },
        { property: "Downtown Heights", unit: "3A", issue: "Circuit breaker issue", status: "pending" },
      ],
    },
    {
      id: 3,
      name: "Tom Davis",
      avatar: "TD",
      specialty: "HVAC",
      rating: 4.7,
      completedJobs: 89,
      activeJobs: 1,
      phone: "(555) 345-6789",
      email: "tom@hvacexperts.com",
      location: "Queens, NY",
      status: "active",
      joinedDate: "Aug 2023",
      hourlyRate: 90,
      responseTime: "3 hours",
      skills: ["AC Repair", "Heating Systems", "Ventilation"],
      recentJobs: [{ property: "Sunset Gardens", unit: "5B", issue: "AC not cooling", status: "in_progress" }],
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      avatar: "AR",
      specialty: "General Maintenance",
      rating: 4.6,
      completedJobs: 312,
      activeJobs: 4,
      phone: "(555) 456-7890",
      email: "alex@maintenance.com",
      location: "Manhattan, NY",
      status: "busy",
      joinedDate: "Nov 2021",
      hourlyRate: 65,
      responseTime: "4 hours",
      skills: ["Painting", "Carpentry", "General Repairs"],
      recentJobs: [
        { property: "Metro Plaza", unit: "8C", issue: "Window replacement", status: "completed" },
        { property: "Park Avenue Towers", unit: "15A", issue: "Door repair", status: "in_progress" },
      ],
    },
  ]

  const filteredContractors = contractors.filter((contractor) => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.specialty.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesTab = activeTab === "all" || contractor.status === activeTab

    return matchesSearch && matchesTab
  })

  const statusCounts = {
    all: contractors.length,
    active: contractors.filter((c) => c.status === "active").length,
    busy: contractors.filter((c) => c.status === "busy").length,
    inactive: contractors.filter((c) => c.status === "inactive").length,
  }

  const totalStats = {
    totalContractors: contractors.length,
    activeJobs: contractors.reduce((sum, c) => sum + c.activeJobs, 0),
    avgRating: (contractors.reduce((sum, c) => sum + c.rating, 0) / contractors.length).toFixed(1),
    completedJobs: contractors.reduce((sum, c) => sum + c.completedJobs, 0),
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
                  <h1 className="text-2xl font-bold text-foreground">Contractor Management</h1>
                  <p className="text-sm text-muted-foreground">Manage your network of trusted contractors</p>
                </div>
              </div>
              <Button onClick={() => setAddContractorOpen(true)} className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Contractor
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
                          <p className="text-sm font-medium text-muted-foreground">Total Contractors</p>
                          <p className="text-2xl font-bold text-foreground">{totalStats.totalContractors}</p>
                        </div>
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <UserCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
                          <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                          <p className="text-2xl font-bold text-foreground">{totalStats.activeJobs}</p>
                        </div>
                        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                          <Wrench className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
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
                          <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                          <p className="text-2xl font-bold text-foreground">{totalStats.avgRating}</p>
                        </div>
                        <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
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
                          <p className="text-sm font-medium text-muted-foreground">Completed Jobs</p>
                          <p className="text-2xl font-bold text-foreground">{totalStats.completedJobs}</p>
                        </div>
                        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
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
                          placeholder="Search contractors or specialties..."
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
                  <CardTitle>All Contractors</CardTitle>
                  <CardDescription>Manage your network of trusted service providers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
                      <TabsTrigger value="active">Active ({statusCounts.active})</TabsTrigger>
                      <TabsTrigger value="busy">Busy ({statusCounts.busy})</TabsTrigger>
                      <TabsTrigger value="inactive">Inactive ({statusCounts.inactive})</TabsTrigger>
                    </TabsList>

                    <TabsContent value={activeTab} className="mt-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {filteredContractors.map((contractor, index) => (
                          <motion.div
                            key={contractor.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <ContractorCard contractor={contractor} />
                          </motion.div>
                        ))}
                      </div>

                      {filteredContractors.length === 0 && (
                        <div className="text-center py-12">
                          <UserCheck className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-foreground mb-2">No contractors found</h3>
                          <p className="text-muted-foreground">
                            {searchQuery
                              ? "Try adjusting your search terms"
                              : "No contractors match the current filter"}
                          </p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>

        <AddContractorDialog open={addContractorOpen} onOpenChange={setAddContractorOpen} />
      </div>
    </div>
  )
}
