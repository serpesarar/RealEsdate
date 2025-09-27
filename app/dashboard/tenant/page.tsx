"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IssueReportDialog } from "@/components/issue-report-dialog"
import { PaymentCenterDialog } from "@/components/payment-center-dialog"
import { DocumentVaultDialog } from "@/components/document-vault-dialog"
import { CommunicationHubDialog } from "@/components/communication-hub-dialog"
import { AmenityBookingDialog } from "@/components/amenity-booking-dialog"
import { TenantAmenitiesPanel } from "@/components/tenant-amenities-panel"
import { VisitorManagementDialog } from "@/components/visitor-management-dialog"
import { ServiceRatingsDialog } from "@/components/service-ratings-dialog"
import { RoommateChatPanel } from "@/components/roommate-chat-panel"
import { useState } from "react"
import {
  AlertTriangle,
  CreditCard,
  FileText,
  Phone,
  Wifi,
  Car,
  Dumbbell,
  Clock,
  CheckCircle,
  Building2,
  Users,
  Wrench,
  MessageSquare,
  Calendar,
  UserPlus,
  Star,
  Bot,
  Timer,
  UserCheck,
} from "lucide-react"

export default function TenantDashboard() {
  const daysUntilRent = 12
  const contractMonthsRemaining = 8
  const contractDaysRemaining = 15
  const rentAmount = 1850
  const paymentStatus = "current" // current, overdue, pending
  const userRole = "tenant"

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current":
        return "bg-emerald-500"
      case "overdue":
        return "bg-red-500"
      case "pending":
        return "bg-amber-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "current":
        return "Current"
      case "overdue":
        return "Overdue"
      case "pending":
        return "Pending"
      default:
        return "Unknown"
    }
  }

  const [issueDialogOpen, setIssueDialogOpen] = useState(false)
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false)
  const [documentDialogOpen, setDocumentDialogOpen] = useState(false)
  const [communicationDialogOpen, setCommunicationDialogOpen] = useState(false)
  const [amenityDialogOpen, setAmenityDialogOpen] = useState(false)
  const [tenantAmenitiesOpen, setTenantAmenitiesOpen] = useState(false)
  const [visitorDialogOpen, setVisitorDialogOpen] = useState(false)
  const [ratingsDialogOpen, setRatingsDialogOpen] = useState(false)

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-6">
      <Card className="bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl md:text-2xl text-teal-900">Welcome Home, Sarah!</CardTitle>
          <CardDescription className="text-sm md:text-base text-teal-700">Unit 4B - Riverside Gardens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="text-center p-2">
              <div className="text-xl md:text-2xl font-bold text-teal-900">{daysUntilRent}</div>
              <div className="text-xs md:text-sm text-teal-700 text-balance">Days until rent</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl md:text-2xl font-bold text-teal-900">
                {contractMonthsRemaining}m {contractDaysRemaining}d
              </div>
              <div className="text-xs md:text-sm text-teal-700 text-balance">Lease remaining</div>
            </div>
            <div className="text-center p-2">
              <div className="text-xl md:text-2xl font-bold text-teal-900">${rentAmount}</div>
              <div className="text-xs md:text-sm text-teal-700 text-balance">Monthly rent</div>
            </div>
            <div className="text-center p-2">
              <Badge className={`${getStatusColor(paymentStatus)} text-white text-xs`}>
                {getStatusText(paymentStatus)}
              </Badge>
              <div className="text-xs md:text-sm text-teal-700 mt-1 text-balance">Payment status</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-teal-200 bg-gradient-to-r from-teal-50 to-cyan-50">
        <CardContent className="p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 md:w-6 md:h-6 text-teal-600 animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm md:text-base text-teal-900 text-balance">
                AI Processing Your Request
              </h3>
              <p className="text-xs md:text-sm text-teal-700 mt-1 text-balance">
                Kitchen faucet leak - Categorized as Plumbing
              </p>
              <div className="flex flex-col gap-2 mt-2 text-xs text-teal-600">
                <div className="flex items-center gap-1 flex-wrap">
                  <Timer className="w-3 h-3 flex-shrink-0" />
                  <span className="text-balance">Est. response: 2-4 hours</span>
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  <UserCheck className="w-3 h-3 flex-shrink-0" />
                  <span className="text-balance">Assigned: Mike Johnson (Plumber)</span>
                </div>
              </div>
            </div>
            <Badge className="bg-teal-500 text-white text-xs flex-shrink-0">Processing</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50">
        <CardContent className="p-4 md:p-6 text-center">
          <div className="space-y-3 md:space-y-4">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <AlertTriangle className="w-6 h-6 md:w-8 md:h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-orange-900 text-balance">Need Help?</h3>
              <p className="text-sm md:text-base text-orange-700 text-balance">Report maintenance issues or concerns</p>
            </div>
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 md:px-8 h-12 md:h-auto text-sm md:text-base"
              onClick={() => setIssueDialogOpen(true)}
            >
              <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Report an Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setPaymentDialogOpen(true)}>
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <CreditCard className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Payment Center</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Autopay & history</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setDocumentDialogOpen(true)}>
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto">
              <FileText className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Document Vault</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Lease & receipts</p>
          </CardContent>
        </Card>

        <Card
          className="hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => setCommunicationDialogOpen(true)}
        >
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
              <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Chat Management</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Direct messaging</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setAmenityDialogOpen(true)}>
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <Calendar className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Book Amenities</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Gym, pool, rooms</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setVisitorDialogOpen(true)}>
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-cyan-100 rounded-lg flex items-center justify-center mx-auto">
              <UserPlus className="w-5 h-5 md:w-6 md:h-6 text-cyan-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Visitor Management</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Guest registration</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setRatingsDialogOpen(true)}>
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto">
              <Star className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Rate Service</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Review maintenance</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto">
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Emergency</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">24/7 contacts</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-3 md:p-6 text-center space-y-2 md:space-y-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto">
              <Wrench className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
            </div>
            <h3 className="font-medium text-xs md:text-base text-balance">Maintenance History</h3>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">Past requests</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-teal-200">
        <CardHeader className="pb-3 md:pb-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg text-teal-900">
              <Building2 className="w-4 h-4 md:w-5 md:h-5" />
              Building Amenities
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="border-teal-200 text-teal-700 hover:bg-teal-50 bg-transparent text-xs md:text-sm h-8 md:h-9 w-full md:w-auto"
              onClick={() => setTenantAmenitiesOpen(true)}
            >
              View All Amenities
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="flex items-center gap-2">
              <Wifi className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-balance">Free WiFi</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-cyan-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-balance">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-balance">Gym</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <span className="text-xs md:text-sm text-balance">Community Room</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-teal-200">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg text-teal-900">
            <Clock className="w-4 h-4 md:w-5 md:h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-balance">Rent payment confirmed</p>
              <p className="text-xs text-muted-foreground text-balance">December 1, 2024 - $1,850.00</p>
            </div>
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-balance">Maintenance request completed</p>
              <p className="text-xs text-muted-foreground text-balance">November 28, 2024 - Kitchen faucet repair</p>
            </div>
            <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          </div>

          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-balance">Building announcement</p>
              <p className="text-xs text-muted-foreground text-balance">November 25, 2024 - Holiday schedule update</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <IssueReportDialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen} />
      <PaymentCenterDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen} />
      <DocumentVaultDialog open={documentDialogOpen} onOpenChange={setDocumentDialogOpen} />
      <CommunicationHubDialog open={communicationDialogOpen} onOpenChange={setCommunicationDialogOpen} />
      <AmenityBookingDialog open={amenityDialogOpen} onOpenChange={setAmenityDialogOpen} />
      <TenantAmenitiesPanel open={tenantAmenitiesOpen} onOpenChange={setTenantAmenitiesOpen} />
      <VisitorManagementDialog open={visitorDialogOpen} onOpenChange={setVisitorDialogOpen} />
      <ServiceRatingsDialog open={ratingsDialogOpen} onOpenChange={setRatingsDialogOpen} />
      <RoommateChatPanel userRole={userRole} />
    </div>
  )
}
