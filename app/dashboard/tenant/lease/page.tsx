"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  Download,
  Eye,
  Home,
  Users,
  PawPrint,
  Car,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

const lease = {
  status: "active",
  startDate: "January 1, 2024",
  endDate: "December 31, 2024",
  daysCompleted: 90,
  totalDays: 365,
  daysRemaining: 275,
  monthlyRent: 2400,
  dueDay: 1,
  securityDeposit: 2400,
  signedDate: "December 15, 2023",
  moveInDate: "January 1, 2024",
  unit: "4B",
  occupants: ["Sarah Johnson", "Mike Johnson"],
  petPolicy: "1 cat allowed with $200 deposit",
  parkingSpot: "P-24",
  renewalOffered: true,
  renewalRent: 2520,
  renewalTerm: 12,
  renewalDeadline: "October 1, 2024",
}

const documents = [
  {
    id: 1,
    name: "Lease Agreement",
    date: lease.signedDate,
    type: "lease",
    url: "#",
  },
  {
    id: 2,
    name: "Move-in Checklist",
    date: lease.moveInDate,
    type: "checklist",
    url: "#",
  },
  {
    id: 3,
    name: "Building Rules",
    date: "January 1, 2024",
    type: "rules",
    url: "#",
  },
]

export default function TenantLeasePage() {
  const progressPercentage = (lease.daysCompleted / lease.totalDays) * 100

  return (
    <DashboardLayout userRole="tenant">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Lease Agreement</h1>
            <p className="text-muted-foreground">View your lease details and documents</p>
          </div>
          <Badge className={lease.status === "active" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}>
            {lease.status.charAt(0).toUpperCase() + lease.status.slice(1)}
          </Badge>
        </div>

        {/* Lease Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-8 h-8 text-blue-600" />
                <div>
                  <p className="text-sm text-blue-700 font-medium">Lease Period</p>
                  <p className="text-lg font-bold text-blue-900">
                    {lease.startDate} - {lease.endDate}
                  </p>
                </div>
              </div>
              <Progress value={progressPercentage} className="mb-2" />
              <p className="text-sm text-blue-700">{lease.daysRemaining} days remaining</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-green-600" />
                <div>
                  <p className="text-sm text-green-700 font-medium">Monthly Rent</p>
                  <p className="text-2xl font-bold text-green-900">${lease.monthlyRent}</p>
                  <p className="text-sm text-green-700">Due on the {lease.dueDay}th of each month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-8 h-8 text-purple-600" />
                <div>
                  <p className="text-sm text-purple-700 font-medium">Security Deposit</p>
                  <p className="text-2xl font-bold text-purple-900">${lease.securityDeposit}</p>
                  <p className="text-sm text-purple-700">Refundable upon move-out inspection</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lease Documents */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Lease Documents
            </CardTitle>
            <CardDescription>Access and download your lease-related documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Terms */}
        <Card>
          <CardHeader>
            <CardTitle>Important Terms</CardTitle>
            <CardDescription>Key details about your lease agreement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Unit</p>
                  <p className="text-muted-foreground">{lease.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Occupants</p>
                  <p className="text-muted-foreground">{lease.occupants.join(", ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PawPrint className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium">Pet Policy</p>
                  <p className="text-muted-foreground">{lease.petPolicy}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Car className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="font-medium">Parking</p>
                  <p className="text-muted-foreground">Spot #{lease.parkingSpot}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lease Renewal Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Lease Renewal
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lease.renewalOffered ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-green-900 mb-2">Renewal Offer Available</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-green-800">
                        New Monthly Rent: <span className="font-semibold">${lease.renewalRent}</span>
                      </p>
                      <p className="text-green-800">
                        Term: <span className="font-semibold">{lease.renewalTerm} months</span>
                      </p>
                      <p className="text-green-800">
                        Expires: <span className="font-semibold">{lease.renewalDeadline}</span>
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <Button className="bg-green-600 hover:bg-green-700">Accept Renewal</Button>
                      <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-50 bg-transparent">
                        Decline
                      </Button>
                      <Button variant="outline">Request Changes</Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-muted-foreground/50" />
                <p>Renewal information will appear here 60 days before lease end.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
