"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, FileCheck, CheckCircle, Clock, DollarSign, Shield, Star, Eye, Send } from "lucide-react"

// Mock data for demonstration
const mockApplicants = [
  {
    id: 1,
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    unit: "2B",
    propertyName: "Riverside Gardens",
    applicationDate: "2024-01-15",
    screeningStatus: "complete",
    creditScore: 742,
    recommendation: "APPROVE",
    riskScore: 85,
    monthlyIncome: 5200,
    rentAmount: 1800,
    employmentLength: "2.5 years",
  },
  {
    id: 2,
    fullName: "Michael Chen",
    email: "m.chen@email.com",
    phone: "(555) 987-6543",
    unit: "1A",
    propertyName: "Downtown Lofts",
    applicationDate: "2024-01-14",
    screeningStatus: "pending",
    creditScore: null,
    recommendation: null,
    riskScore: null,
    monthlyIncome: 4800,
    rentAmount: 1600,
    employmentLength: "1.2 years",
  },
  {
    id: 3,
    fullName: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 456-7890",
    unit: "3C",
    propertyName: "Sunset Towers",
    applicationDate: "2024-01-13",
    screeningStatus: "not_started",
    creditScore: null,
    recommendation: null,
    riskScore: null,
    monthlyIncome: 3900,
    rentAmount: 1400,
    employmentLength: "3.1 years",
  },
]

const screeningPackages = [
  {
    id: "basic",
    name: "Basic Check",
    price: 25, // Updated from 19
    features: ["Credit Score", "Eviction History"],
    recommended: false,
  },
  {
    id: "standard",
    name: "Standard Check",
    price: 40, // Updated from 35
    features: ["Credit Report", "Criminal Background (7 years)", "Eviction History", "Sex Offender Registry"],
    recommended: true,
  },
  {
    id: "premium",
    name: "Premium Check",
    price: 65, // Updated from 55
    features: [
      "Full Credit Report",
      "Criminal Background (National)",
      "Eviction History",
      "Employment Verification",
      "Income Verification",
      "Previous Landlord References",
      "Social Media Scan",
    ],
    recommended: false,
  },
]

export default function ScreeningDashboard() {
  const [selectedApplicant, setSelectedApplicant] = useState(null)
  const [selectedPackage, setSelectedPackage] = useState("standard")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const filteredApplicants = mockApplicants.filter((applicant) => {
    const matchesSearch =
      applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || applicant.screeningStatus === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "complete":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Complete
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "not_started":
        return (
          <Badge variant="outline">
            <FileCheck className="w-3 h-3 mr-1" />
            Not Started
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  const getRecommendationBadge = (recommendation) => {
    switch (recommendation) {
      case "APPROVE":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Approve</Badge>
      case "CONDITIONAL":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Conditional</Badge>
        )
      case "DENY":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Deny</Badge>
      default:
        return null
    }
  }

  const startScreening = async (applicantId: number, packageType: string) => {
    try {
      const applicant = mockApplicants.find((a) => a.id === applicantId)
      if (!applicant) return

      // Call the new payment-enabled screening API
      const response = await fetch("/api/screening/initiate-with-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          applicantData: {
            id: applicant.id.toString(),
            firstName: applicant.fullName.split(" ")[0],
            lastName: applicant.fullName.split(" ")[1] || "",
            email: applicant.email,
            phone: applicant.phone,
            ssn: "123-45-6789", // Mock SSN
            dateOfBirth: "1990-01-01", // Mock DOB
            currentAddress: "123 Main St",
            applyingForUnit: applicant.unit,
            expectedRent: applicant.rentAmount,
          },
          packageType,
          ownerId: "owner_123", // Mock owner ID
          propertyId: "property_123", // Mock property ID
        }),
      })

      const result = await response.json()

      if (result.requiresPaymentSetup) {
        alert("Please add a payment method in the Billing section before running screenings.")
        return
      }

      if (result.success) {
        console.log(`Screening initiated successfully: ${result.screeningId}`)
        alert(`Screening started! Payment of $${getPackagePrice(packageType)} processed successfully.`)

        // Update applicant status to pending
        // In real app, this would trigger a re-fetch of data
      } else {
        alert(`Error: ${result.error}`)
      }
    } catch (error) {
      console.error("Error starting screening:", error)
      alert("Failed to start screening. Please try again.")
    }
  }

  const getPackagePrice = (packageType: string): number => {
    switch (packageType) {
      case "basic":
        return 25
      case "standard":
        return 40
      case "premium":
        return 65
      default:
        return 0
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Tenant Screening</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Comprehensive background checks and tenant verification
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">FCRA Compliant</p>
                      <p className="text-xs text-muted-foreground">Secure & Legal</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="dashboard" className="text-xs sm:text-sm px-2 py-2">
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="reports" className="text-xs sm:text-sm px-2 py-2">
                Reports
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-xs sm:text-sm px-2 py-2">
                Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              {/* Search and Filter */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Applicant Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 mb-6">
                    <div className="w-full">
                      <Label htmlFor="search" className="text-sm">
                        Search Applicants
                      </Label>
                      <Input
                        id="search"
                        placeholder="Search by name, unit, or property..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-white/50 dark:bg-slate-700/50 mt-1"
                      />
                    </div>
                    <div className="w-full sm:w-48">
                      <Label htmlFor="filter" className="text-sm">
                        Filter by Status
                      </Label>
                      <Select value={filterStatus} onValueChange={setFilterStatus}>
                        <SelectTrigger className="bg-white/50 dark:bg-slate-700/50 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Status</SelectItem>
                          <SelectItem value="not_started">Not Started</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="block sm:hidden space-y-4">
                    {/* Mobile Card Layout */}
                    {filteredApplicants.map((applicant) => (
                      <Card key={applicant.id} className="bg-white/50 dark:bg-slate-800/50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{applicant.fullName}</p>
                                <p className="text-xs text-muted-foreground">{applicant.email}</p>
                              </div>
                              {getStatusBadge(applicant.screeningStatus)}
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-muted-foreground">Property</p>
                                <p className="font-medium">{applicant.propertyName}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Unit</p>
                                <p className="font-medium">{applicant.unit}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Applied</p>
                                <p className="font-medium">{applicant.applicationDate}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Credit Score</p>
                                <p className="font-medium">
                                  {applicant.creditScore ? (
                                    <span className="flex items-center gap-1">
                                      {applicant.creditScore}
                                      <Star className="w-3 h-3 text-yellow-500" />
                                    </span>
                                  ) : (
                                    "-"
                                  )}
                                </p>
                              </div>
                            </div>

                            {applicant.recommendation && (
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">Recommendation:</span>
                                {getRecommendationBadge(applicant.recommendation)}
                              </div>
                            )}

                            <div className="pt-2 border-t">
                              {applicant.screeningStatus === "not_started" && (
                                <Button
                                  size="sm"
                                  onClick={() => setSelectedApplicant(applicant)}
                                  className="w-full bg-primary hover:bg-primary/90"
                                >
                                  Start Screening
                                </Button>
                              )}
                              {applicant.screeningStatus === "pending" && (
                                <Button size="sm" variant="outline" className="w-full bg-transparent">
                                  <Clock className="w-4 h-4 mr-1" />
                                  In Progress
                                </Button>
                              )}
                              {applicant.screeningStatus === "complete" && (
                                <Button size="sm" variant="outline" className="w-full bg-transparent">
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Report
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Desktop Table Layout */}
                  <div className="hidden sm:block rounded-lg border bg-white/50 dark:bg-slate-800/50 overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="min-w-[200px]">Applicant</TableHead>
                          <TableHead className="min-w-[150px]">Property & Unit</TableHead>
                          <TableHead className="min-w-[120px]">Application Date</TableHead>
                          <TableHead className="min-w-[100px]">Status</TableHead>
                          <TableHead className="min-w-[100px]">Credit Score</TableHead>
                          <TableHead className="min-w-[120px]">Recommendation</TableHead>
                          <TableHead className="min-w-[150px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplicants.map((applicant) => (
                          <TableRow key={applicant.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{applicant.fullName}</p>
                                <p className="text-sm text-muted-foreground">{applicant.email}</p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{applicant.propertyName}</p>
                                <p className="text-sm text-muted-foreground">Unit {applicant.unit}</p>
                              </div>
                            </TableCell>
                            <TableCell>{applicant.applicationDate}</TableCell>
                            <TableCell>{getStatusBadge(applicant.screeningStatus)}</TableCell>
                            <TableCell>
                              {applicant.creditScore ? (
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{applicant.creditScore}</span>
                                  <Star className="w-4 h-4 text-yellow-500" />
                                </div>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              {applicant.recommendation ? (
                                getRecommendationBadge(applicant.recommendation)
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                {applicant.screeningStatus === "not_started" && (
                                  <Button
                                    size="sm"
                                    onClick={() => setSelectedApplicant(applicant)}
                                    className="bg-primary hover:bg-primary/90"
                                  >
                                    Start Screening
                                  </Button>
                                )}
                                {applicant.screeningStatus === "pending" && (
                                  <Button size="sm" variant="outline">
                                    <Clock className="w-4 h-4 mr-1" />
                                    In Progress
                                  </Button>
                                )}
                                {applicant.screeningStatus === "complete" && (
                                  <Button size="sm" variant="outline">
                                    <Eye className="w-4 h-4 mr-1" />
                                    View Report
                                  </Button>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>

              {/* Screening Package Selection Modal */}
              {selectedApplicant && (
                <Card className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl border-0">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-lg sm:text-xl">
                      <span className="text-balance">Select Screening Package for {selectedApplicant.fullName}</span>
                      <Button variant="ghost" size="sm" onClick={() => setSelectedApplicant(null)}>
                        ×
                      </Button>
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Choose the appropriate background check package for this applicant
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                      {screeningPackages.map((pkg) => (
                        <Card
                          key={pkg.id}
                          className={`cursor-pointer transition-all ${
                            selectedPackage === pkg.id ? "ring-2 ring-primary bg-primary/5" : "hover:bg-muted/50"
                          } ${pkg.recommended ? "border-primary" : ""}`}
                          onClick={() => setSelectedPackage(pkg.id)}
                        >
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base sm:text-lg">{pkg.name}</CardTitle>
                              {pkg.recommended && (
                                <Badge className="bg-primary text-primary-foreground text-xs">Recommended</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-1">
                              <DollarSign className="w-4 h-4" />
                              <span className="text-xl sm:text-2xl font-bold">{pkg.price}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {pkg.features.map((feature, index) => (
                                <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span className="text-balance">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t">
                      <div className="text-xs sm:text-sm text-muted-foreground text-balance">
                        Screening will be initiated immediately and results typically available within 24-48 hours
                      </div>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <Button
                          variant="outline"
                          onClick={() => setSelectedApplicant(null)}
                          className="order-2 sm:order-1"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => {
                            startScreening(selectedApplicant.id, selectedPackage)
                            setSelectedApplicant(null)
                          }}
                          className="bg-primary hover:bg-primary/90 order-1 sm:order-2"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          <span className="text-balance">
                            Start Screening (${screeningPackages.find((p) => p.id === selectedPackage)?.price})
                          </span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              {/* Detailed Reports View */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle>Screening Reports</CardTitle>
                  <CardDescription>Detailed background check results and analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileCheck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Reports Selected</h3>
                    <p className="text-muted-foreground">
                      Select a completed screening from the dashboard to view detailed reports
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              {/* Settings */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle>Screening Settings</CardTitle>
                  <CardDescription>Configure screening preferences and compliance settings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Settings Panel</h3>
                    <p className="text-muted-foreground">
                      Screening configuration and compliance settings will be available here
                    </p>
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
