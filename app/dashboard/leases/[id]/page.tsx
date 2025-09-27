"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  User,
  MapPin,
  DollarSign,
  Edit,
  Download,
  Mail,
  Phone,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react"

// Mock lease data
const lease = {
  id: 1,
  tenant: {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  property: {
    name: "Sunset Apartments",
    address: "123 Sunset Blvd, Los Angeles, CA 90028",
    unit: "4B",
  },
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  monthlyRent: 2400,
  securityDeposit: 2400,
  petDeposit: 500,
  keyDeposit: 100,
  lateFee: 50,
  gracePeriod: 5,
  status: "active",
  type: "fixed",
  renewalStatus: "pending",
  daysUntilExpiry: 245,
  occupancyLimit: 2,
  petPolicy: "Cats and Dogs",
  smokingPolicy: "No Smoking",
  parkingSpaces: 1,
  utilitiesIncluded: ["Water", "Trash Collection"],
  paymentMethods: ["Bank Transfer", "Check", "Online Payment"],
  specialClauses: "Tenant is responsible for maintaining the garden area. No subletting without written consent.",
  maintenanceResponsibility:
    "Landlord responsible for major repairs. Tenant responsible for minor maintenance under $100.",
  terminationClause: "Either party may terminate with 30 days written notice.",
}

const leaseHistory = [
  { date: "2024-01-01", event: "Lease Agreement Signed", type: "milestone" },
  { date: "2024-01-15", event: "Security Deposit Received", type: "payment" },
  { date: "2024-02-01", event: "First Rent Payment", type: "payment" },
  { date: "2024-03-15", event: "Lease Amendment - Pet Addendum", type: "amendment" },
  { date: "2024-06-01", event: "Renewal Notice Sent", type: "notice" },
]

const documents = [
  { name: "Original Lease Agreement", type: "PDF", size: "2.4 MB", date: "2024-01-01" },
  { name: "Pet Addendum", type: "PDF", size: "1.2 MB", date: "2024-03-15" },
  { name: "Renewal Notice", type: "PDF", size: "0.8 MB", date: "2024-06-01" },
  { name: "Property Inspection Report", type: "PDF", size: "3.1 MB", date: "2024-01-01" },
]

export default function LeaseDetailsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "notice":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
      case "expired":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getRenewalStatusColor = (status: string) => {
    switch (status) {
      case "renewed":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
      case "expiring":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
      case "terminating":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
    }
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "milestone":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "payment":
        return <DollarSign className="w-4 h-4 text-blue-600" />
      case "amendment":
        return <FileText className="w-4 h-4 text-purple-600" />
      case "notice":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Lease Agreement</h1>
            <p className="text-muted-foreground flex items-center gap-2 mt-1">
              <MapPin className="w-4 h-4" />
              {lease.property.name} - Unit {lease.property.unit}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Edit className="w-4 h-4 mr-2" />
              Edit Lease
            </Button>
          </div>
        </div>

        {/* Lease Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Lease Overview
                    </CardTitle>
                    <CardDescription>Key details of the lease agreement</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getStatusColor(lease.status)}>{lease.status}</Badge>
                    <Badge className={getRenewalStatusColor(lease.renewalStatus)}>{lease.renewalStatus}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Lease Term</p>
                      <p className="font-medium">
                        {new Date(lease.startDate).toLocaleDateString()} -{" "}
                        {new Date(lease.endDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lease Type</p>
                      <p className="font-medium capitalize">{lease.type} Term</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Days Until Expiry</p>
                      <p className="font-medium">{lease.daysUntilExpiry} days</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Monthly Rent</p>
                      <p className="font-medium text-green-600">${lease.monthlyRent.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Security Deposit</p>
                      <p className="font-medium">${lease.securityDeposit.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Late Fee</p>
                      <p className="font-medium">
                        ${lease.lateFee} (after {lease.gracePeriod} days)
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Tenant Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={lease.tenant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {lease.tenant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{lease.tenant.name}</p>
                    <p className="text-sm text-muted-foreground">Primary Tenant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{lease.tenant.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{lease.tenant.phone}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Tenant
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="terms" className="space-y-4">
          <TabsList>
            <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
            <TabsTrigger value="financial">Financial Details</TabsTrigger>
            <TabsTrigger value="history">Lease History</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="terms">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Maximum Occupants</p>
                    <p className="font-medium">{lease.occupancyLimit} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pet Policy</p>
                    <p className="font-medium">{lease.petPolicy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Smoking Policy</p>
                    <p className="font-medium">{lease.smokingPolicy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Parking Spaces</p>
                    <p className="font-medium">{lease.parkingSpaces} space(s)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Utilities & Services</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Included Utilities</p>
                    <div className="flex flex-wrap gap-2">
                      {lease.utilitiesIncluded.map((utility, index) => (
                        <Badge key={index} variant="secondary">
                          {utility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-muted-foreground">Accepted Payment Methods</p>
                    <div className="flex flex-wrap gap-2">
                      {lease.paymentMethods.map((method, index) => (
                        <Badge key={index} variant="outline">
                          {method}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Special Terms & Clauses</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Special Clauses</p>
                    <p className="text-sm">{lease.specialClauses}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maintenance Responsibility</p>
                    <p className="text-sm">{lease.maintenanceResponsibility}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Termination Clause</p>
                    <p className="text-sm">{lease.terminationClause}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Deposits & Fees</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Security Deposit</span>
                    <span className="font-semibold">${lease.securityDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pet Deposit</span>
                    <span className="font-semibold">${lease.petDeposit.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Key Deposit</span>
                    <span className="font-semibold">${lease.keyDeposit.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Total Deposits</span>
                      <span>${(lease.securityDeposit + lease.petDeposit + lease.keyDeposit).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Terms</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Monthly Rent</span>
                    <span className="font-semibold text-green-600">${lease.monthlyRent.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Late Fee</span>
                    <span className="font-semibold">${lease.lateFee}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Grace Period</span>
                    <span className="font-semibold">{lease.gracePeriod} days</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between font-semibold">
                      <span>Annual Rent</span>
                      <span className="text-green-600">${(lease.monthlyRent * 12).toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Lease Timeline</CardTitle>
                <CardDescription>Important events and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaseHistory.map((event, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{event.event}</p>
                        <p className="text-sm text-muted-foreground">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Lease Documents</CardTitle>
                <CardDescription>All documents related to this lease</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • {new Date(doc.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
