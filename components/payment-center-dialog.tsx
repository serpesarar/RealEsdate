"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, DollarSign, Calendar, CheckCircle, Plus, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { PaymentConfirmationModal } from "./payment-confirmation-modal"
import { useToast } from "@/hooks/use-toast"

interface PaymentCenterDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentCenterDialog({ open, onOpenChange }: PaymentCenterDialogProps) {
  const [loading, setLoading] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState<any>(null)
  const [paymentHistory, setPaymentHistory] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (open) {
      fetchPaymentHistory()
    }
  }, [open])

  const fetchPaymentHistory = async () => {
    try {
      const response = await fetch("/api/payments?tenantId=current_user")
      const result = await response.json()

      if (result.success) {
        setPaymentHistory(result.payments)
      }
    } catch (error) {
      console.error("Error fetching payment history:", error)
    }
  }

  const handleOneTimePayment = async () => {
    setLoading(true)

    try {
      const paymentData = {
        amount: 1850,
        tenantId: "current_user",
        propertyId: "sunset",
        paymentType: "rent",
        description: "One-time rent payment",
        paymentMethodId: "pm_card_visa",
      }

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Payment failed")
      }

      // Show success confirmation modal
      setPaymentDetails({
        amount: paymentData.amount,
        transactionId: result.transactionId,
        chargeId: result.chargeId,
        date: new Date().toLocaleDateString(),
        method: "Visa •••• 4242",
      })

      setConfirmationOpen(true)

      // Refresh payment history
      fetchPaymentHistory()

      toast({
        title: "Payment Successful",
        description: "Your rent payment has been processed successfully.",
      })
    } catch (error) {
      console.error("Payment error:", error)
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred while processing your payment.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Center
            </DialogTitle>
            <DialogDescription>Manage your rent payments, autopay settings, and payment history</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="autopay">Autopay</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,850</div>
                    <p className="text-xs text-muted-foreground">Due Jan 1, 2025</p>
                    <Badge className="mt-2 bg-green-500 text-white">Autopay Enabled</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Payment Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Current</div>
                    <p className="text-xs text-muted-foreground">Last paid Dec 1</p>
                    <div className="flex items-center gap-1 mt-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">On time</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>YTD Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$22,200</div>
                    <p className="text-xs text-muted-foreground">12 payments made</p>
                    <div className="flex items-center gap-1 mt-2">
                      <DollarSign className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-blue-600">100% on time</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" size="lg" onClick={handleOneTimePayment} disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    <DollarSign className="w-4 h-4 mr-2" />
                    {loading ? "Processing Payment..." : "Make One-Time Payment"}
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent" size="lg">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Future Payment
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="autopay" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Autopay Settings</CardTitle>
                  <CardDescription>Automatically pay your rent each month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Enable Autopay</h4>
                      <p className="text-sm text-muted-foreground">Automatically charge your default payment method</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Payment Date</h4>
                    <p className="text-sm text-muted-foreground">Autopay will process on the 1st of each month</p>
                    <Badge variant="outline">1st of month</Badge>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Default Payment Method</h4>
                    <div className="flex items-center gap-2 p-3 border rounded-lg">
                      <CreditCard className="w-4 h-4" />
                      <span className="text-sm">•••• •••• •••• 4242</span>
                      <Badge variant="secondary">Visa</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="methods" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Method
                </Button>
              </div>

              <div className="space-y-3">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-muted-foreground">Expires 12/27</p>
                        </div>
                        <Badge variant="secondary">Visa</Badge>
                        <Badge className="bg-green-500 text-white">Default</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 8888</p>
                          <p className="text-sm text-muted-foreground">Expires 08/26</p>
                        </div>
                        <Badge variant="secondary">Mastercard</Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <div className="space-y-3">
                {paymentHistory.length > 0 ? (
                  paymentHistory.map((payment, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium">${payment.amount}</p>
                              <p className="text-sm text-muted-foreground">
                                {payment.date} • {payment.method}
                              </p>
                            </div>
                          </div>
                          <Badge className="bg-green-500 text-white">{payment.status}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">No payment history available</div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {paymentDetails && (
        <PaymentConfirmationModal
          open={confirmationOpen}
          onOpenChange={setConfirmationOpen}
          paymentDetails={paymentDetails}
        />
      )}
    </>
  )
}
