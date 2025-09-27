"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Download, Mail } from "lucide-react"

interface PaymentConfirmationModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paymentDetails: {
    amount: number
    transactionId: string
    chargeId: string
    date: string
    method: string
  }
}

export function PaymentConfirmationModal({ open, onOpenChange, paymentDetails }: PaymentConfirmationModalProps) {
  const handleDownloadReceipt = () => {
    // Mock receipt download
    console.log("Downloading receipt for transaction:", paymentDetails.transactionId)
  }

  const handleEmailReceipt = () => {
    // Mock email receipt
    console.log("Emailing receipt for transaction:", paymentDetails.transactionId)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <DialogTitle className="text-xl">Payment Successful!</DialogTitle>
          <DialogDescription>Your payment has been processed successfully</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Amount</span>
              <span className="font-medium">${paymentDetails.amount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Transaction ID</span>
              <span className="font-mono text-sm">{paymentDetails.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Payment Method</span>
              <span className="text-sm">{paymentDetails.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Date</span>
              <span className="text-sm">{paymentDetails.date}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleDownloadReceipt}>
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleEmailReceipt}>
              <Mail className="w-4 h-4 mr-2" />
              Email Receipt
            </Button>
          </div>

          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
