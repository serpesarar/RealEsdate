"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Lock, DollarSign, Download, CheckCircle, AlertCircle, Calendar, TrendingUp } from "lucide-react"

// Mock data for demonstration
const mockTransactions = [
  {
    id: "tx_001",
    date: "2024-01-15",
    service: "Background Check - Standard",
    property: "Riverside Gardens",
    unit: "2B",
    applicant: "Sarah Johnson",
    amount: 40,
    status: "completed",
    receiptUrl: "#",
  },
  {
    id: "tx_002",
    date: "2024-01-14",
    service: "ID Verification",
    property: "Downtown Lofts",
    unit: "1A",
    applicant: "Michael Chen",
    amount: 8,
    status: "completed",
    receiptUrl: "#",
  },
  {
    id: "tx_003",
    date: "2024-01-13",
    service: "Income Verification",
    property: "Sunset Towers",
    unit: "3C",
    applicant: "Emily Rodriguez",
    amount: 5,
    status: "pending",
    receiptUrl: "#",
  },
]

const mockSavedCards = [
  {
    id: "card_001",
    brand: "Visa",
    last4: "4242",
    expMonth: 12,
    expYear: 2025,
    isDefault: true,
  },
  {
    id: "card_002",
    brand: "Mastercard",
    last4: "5555",
    expMonth: 8,
    expYear: 2026,
    isDefault: false,
  },
]

export default function BillingPage() {
  const [autoCharge, setAutoCharge] = useState(true)
  const [approvalThreshold, setApprovalThreshold] = useState(100)
  const [showAddCard, setShowAddCard] = useState(false)

  const monthlyTotal = mockTransactions.reduce((sum, tx) => sum + tx.amount, 0)
  const avgCost = monthlyTotal / mockTransactions.length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Billing & Payments</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Manage payment methods and view service usage
              </p>
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium">This Month</p>
                      <p className="text-xs text-muted-foreground">${monthlyTotal}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="payment-methods" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-3 h-auto">
              <TabsTrigger value="payment-methods" className="text-xs sm:text-sm px-2 py-2">
                Payment
              </TabsTrigger>
              <TabsTrigger value="transactions" className="text-xs sm:text-sm px-2 py-2">
                History
              </TabsTrigger>
              <TabsTrigger value="usage" className="text-xs sm:text-sm px-2 py-2">
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="payment-methods" className="space-y-4 sm:space-y-6">
              {/* Payment Method Management */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                    <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Payment Method for Services</span>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Add a payment method to use premium features like background checks, document verification, and
                    other third-party services.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Add New Card Section */}
                  {!showAddCard ? (
                    <Button onClick={() => setShowAddCard(true)} className="bg-primary hover:bg-primary/90">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  ) : (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Add New Payment Method</h4>
                        <Button variant="ghost" size="sm" onClick={() => setShowAddCard(false)}>
                          Cancel
                        </Button>
                      </div>

                      {/* Mock Stripe Elements */}
                      <div className="space-y-4">
                        <div className="p-3 border rounded bg-white dark:bg-slate-800">
                          <div className="text-sm text-muted-foreground mb-2">Card Information</div>
                          <div className="h-10 flex items-center text-sm">1234 1234 1234 4242 | 12/25 | CVC</div>
                        </div>

                        <Button className="w-full bg-primary hover:bg-primary/90">
                          <Lock className="w-4 h-4 mr-2" />
                          Save Payment Method Securely
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm sm:text-base">Saved Payment Methods</h4>
                    {mockSavedCards.map((card) => (
                      <div
                        key={card.id}
                        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-7 sm:w-12 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center flex-shrink-0">
                            <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-medium text-sm">{card.brand}</span>
                              <span className="text-muted-foreground text-sm">•••• {card.last4}</span>
                              <span className="text-xs text-muted-foreground">
                                {card.expMonth}/{card.expYear}
                              </span>
                              {card.isDefault && (
                                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs">
                                  Default
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:flex-shrink-0">
                          {!card.isDefault && (
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              Set Default
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="text-xs bg-transparent">
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Security Note */}
                  <div className="flex items-start space-x-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 dark:text-blue-100">Secure Payment Processing</p>
                      <p className="text-blue-700 dark:text-blue-200">
                        Your payment information is stored securely with Stripe. We never have access to your full card
                        details.
                      </p>
                    </div>
                  </div>

                  {/* Auto-charge Settings */}
                  <div className="space-y-4 pt-4 border-t">
                    <h4 className="font-semibold">Billing Preferences</h4>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-charge">Auto-charge my card for services</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically charge for screening services when initiated
                        </p>
                      </div>
                      <Switch id="auto-charge" checked={autoCharge} onCheckedChange={setAutoCharge} />
                    </div>

                    {!autoCharge && (
                      <div className="space-y-2">
                        <Label htmlFor="threshold">Require approval for charges over:</Label>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <Input
                            id="threshold"
                            type="number"
                            value={approvalThreshold}
                            onChange={(e) => setApprovalThreshold(Number(e.target.value))}
                            className="w-32 bg-white/50 dark:bg-slate-700/50"
                          />
                          <span className="text-sm text-muted-foreground">USD</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Service Pricing */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg sm:text-xl">Service Usage & Costs</CardTitle>
                  <CardDescription className="text-sm">Transparent pricing for all screening services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Background Check - Basic</h4>
                        <span className="text-lg font-bold">$25</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Credit Score, Eviction History</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Background Check - Standard</h4>
                        <span className="text-lg font-bold">$40</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Credit, Criminal, Eviction</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Background Check - Premium</h4>
                        <span className="text-lg font-bold">$65</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Full Check + Employment + References</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">ID Verification</h4>
                        <span className="text-lg font-bold">$8</span>
                      </div>
                      <p className="text-xs text-muted-foreground">AI-powered document & selfie verification</p>
                    </div>

                    <div className="p-4 border rounded-lg bg-white/50 dark:bg-slate-800/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-sm">Income Verification</h4>
                        <span className="text-lg font-bold">$5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Bank account income verification</p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <div className="text-xs sm:text-sm space-y-1">
                      <p>• Services are charged only when used</p>
                      <p>• No monthly fees or commitments</p>
                      <p>• Instant processing</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4 sm:space-y-6">
              {/* Transaction History */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <span className="text-lg sm:text-xl">Transaction History</span>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export CSV
                    </Button>
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Complete record of all screening service charges
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Mobile Card Layout */}
                  <div className="block sm:hidden space-y-4">
                    {mockTransactions.map((tx) => (
                      <Card key={tx.id} className="bg-white/50 dark:bg-slate-800/50">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{tx.service}</p>
                                <p className="text-xs text-muted-foreground">{tx.date}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-sm">${tx.amount}</p>
                                {getStatusBadge(tx.status)}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <p className="text-muted-foreground">Property</p>
                                <p className="font-medium">{tx.property}</p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">Unit</p>
                                <p className="font-medium">{tx.unit}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-muted-foreground">Applicant</p>
                                <p className="font-medium">{tx.applicant}</p>
                              </div>
                            </div>

                            <div className="pt-2 border-t">
                              <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                                <Download className="w-4 h-4 mr-1" />
                                Download Receipt
                              </Button>
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
                          <TableHead className="min-w-[120px]">Date</TableHead>
                          <TableHead className="min-w-[200px]">Service</TableHead>
                          <TableHead className="min-w-[150px]">Property/Unit</TableHead>
                          <TableHead className="min-w-[150px]">Applicant/Tenant</TableHead>
                          <TableHead className="min-w-[80px]">Amount</TableHead>
                          <TableHead className="min-w-[100px]">Status</TableHead>
                          <TableHead className="min-w-[100px]">Receipt</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {mockTransactions.map((tx) => (
                          <TableRow key={tx.id}>
                            <TableCell>{tx.date}</TableCell>
                            <TableCell>{tx.service}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{tx.property}</p>
                                <p className="text-sm text-muted-foreground">Unit {tx.unit}</p>
                              </div>
                            </TableCell>
                            <TableCell>{tx.applicant}</TableCell>
                            <TableCell className="font-medium">${tx.amount}</TableCell>
                            <TableCell>{getStatusBadge(tx.status)}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-1" />
                                Receipt
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">Total This Month</p>
                          <p className="text-xl sm:text-2xl font-bold">${monthlyTotal}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">Average Cost Per Screening</p>
                          <p className="text-xl sm:text-2xl font-bold">${avgCost.toFixed(0)}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-muted/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium">Most Used Service</p>
                          <p className="text-base sm:text-lg font-bold">Standard Check</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              {/* Usage Analytics */}
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Insights into your screening service usage patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      Detailed usage analytics and cost optimization insights will be available here
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
