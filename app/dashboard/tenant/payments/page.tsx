"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Download, Calendar, CheckCircle, Edit, Trash2 } from "lucide-react"

const payment = {
  currentDue: 2400,
  dueDate: "February 1, 2024",
  daysUntilDue: 5,
  baseRent: 2200,
  utilities: 150,
  parking: 50,
  lateFee: 0,
  total: 2400,
}

const paymentMethods = [
  {
    id: 1,
    type: "Bank Account",
    display: "****1234",
    isDefault: true,
  },
  {
    id: 2,
    type: "Credit Card",
    display: "****5678",
    isDefault: false,
  },
]

const paymentHistory = [
  {
    id: 1,
    date: "2024-01-01",
    amount: 2400,
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: 2,
    date: "2023-12-01",
    amount: 2400,
    method: "Bank Transfer",
    status: "completed",
  },
  {
    id: 3,
    date: "2023-11-01",
    amount: 2400,
    method: "Credit Card",
    status: "completed",
  },
  {
    id: 4,
    date: "2023-10-01",
    amount: 2400,
    method: "Bank Transfer",
    status: "completed",
  },
]

const upcomingPayments = [
  {
    date: "Feb 1",
    amount: 2400,
    autoPay: true,
  },
  {
    date: "Mar 1",
    amount: 2400,
    autoPay: true,
  },
  {
    date: "Apr 1",
    amount: 2400,
    autoPay: true,
  },
]

function getPaymentIcon(type: string) {
  switch (type) {
    case "Bank Account":
      return "🏦"
    case "Credit Card":
      return "💳"
    default:
      return "💰"
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-green-500 text-white"
    case "pending":
      return "bg-yellow-500 text-white"
    case "failed":
      return "bg-red-500 text-white"
    default:
      return "bg-gray-500 text-white"
  }
}

export default function TenantPayRentPage() {
  const [autoPay, setAutoPay] = useState(true)

  const getDaysUntilDueStatus = () => {
    if (payment.daysUntilDue > 0) {
      return {
        color: "text-green-600",
        text: `${payment.daysUntilDue} days remaining`,
      }
    } else if (payment.daysUntilDue === 0) {
      return {
        color: "text-yellow-600",
        text: "Due Today",
      }
    } else {
      return {
        color: "text-red-600",
        text: `${Math.abs(payment.daysUntilDue)} days overdue`,
      }
    }
  }

  const dueStatus = getDaysUntilDueStatus()

  return (
    <DashboardLayout userRole="tenant">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Rent Payment Center</h1>
            <p className="text-muted-foreground">Manage your rent payments and payment methods</p>
          </div>
          <div className="flex items-center gap-2">
            <Switch checked={autoPay} onCheckedChange={setAutoPay} />
            <span className="text-sm font-medium">AutoPay {autoPay ? "ON" : "OFF"}</span>
          </div>
        </div>

        {/* Payment Due Card */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="text-center lg:text-left">
                <p className="text-purple-700 font-medium mb-2">Current Balance</p>
                <p className="text-4xl font-bold text-purple-900 mb-2">${payment.currentDue}</p>
                <p className="text-purple-700 mb-4">Due: {payment.dueDate}</p>
                <p className={`font-medium mb-6 ${dueStatus.color}`}>{dueStatus.text}</p>
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Pay ${payment.currentDue} Now
                </Button>
              </div>

              <Card className="bg-white/80">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Base Rent</span>
                    <span>${payment.baseRent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Utilities</span>
                    <span>${payment.utilities}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Parking</span>
                    <span>${payment.parking}</span>
                  </div>
                  {payment.lateFee > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Late Fee</span>
                      <span>${payment.lateFee}</span>
                    </div>
                  )}
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Due</span>
                    <span>${payment.total}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="methods" className="space-y-6">
          <TabsList>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="history">Payment History</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
          </TabsList>

          <TabsContent value="methods">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <Card
                      key={method.id}
                      className={`border-2 ${method.isDefault ? "border-green-500" : "border-gray-200"}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="text-2xl">{getPaymentIcon(method.type)}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{method.type}</h4>
                            <p className="text-sm text-muted-foreground">{method.display}</p>
                          </div>
                          {method.isDefault && <Badge className="bg-green-500 text-white">Default</Badge>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <Card className="border-2 border-dashed border-gray-300 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardContent className="p-4 text-center">
                      <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Add Payment Method</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Record of all your rent payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {paymentHistory.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{new Date(payment.date).toLocaleDateString()}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${payment.amount.toLocaleString()}</p>
                          <Badge className={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Payments</CardTitle>
                <CardDescription>Scheduled future rent payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {upcomingPayments.map((payment, index) => (
                    <Card key={index} className="border-2 border-blue-200">
                      <CardContent className="p-4 text-center">
                        <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <p className="font-semibold text-lg">{payment.date}</p>
                        <p className="text-2xl font-bold text-blue-900 my-2">${payment.amount}</p>
                        {payment.autoPay && <Badge className="bg-blue-500 text-white">AutoPay</Badge>}
                      </CardContent>
                    </Card>
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
