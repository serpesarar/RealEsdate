"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Check, Users, DollarSign, Home } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AddTenantDialogProps {
  trigger: React.ReactNode
  onTenantAdded?: () => void // Added callback for refreshing tenant list
}

export function AddTenantDialog({ trigger, onTenantAdded }: AddTenantDialogProps) {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    fullName: "",
    email: "", // Added email field
    phone: "", // Added phone field
    monthlyRent: "",
    propertyId: "",
    unitNumber: "",
    leaseStartDate: "",
    leaseDuration: "12",
    notes: "",
  })

  const properties = [
    { id: "1", name: "Park Avenue Towers", units: 24 },
    { id: "2", name: "Sunset Gardens", units: 18 },
    { id: "3", name: "Metro Plaza", units: 32 },
    { id: "4", name: "Downtown Heights", units: 16 },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/tenants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          monthlyRent: Number.parseFloat(formData.monthlyRent),
          leaseDuration: Number.parseInt(formData.leaseDuration),
          leaseStartDate: new Date(formData.leaseStartDate).toISOString(),
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to create tenant")
      }

      console.log("[v0] Tenant created successfully:", result)

      toast({
        title: "Success!",
        description: "Tenant has been added successfully.",
      })

      if (onTenantAdded) {
        onTenantAdded()
      }

      setStep(2)
      setGeneratedCode(`TENANT-${Date.now()}`) // Generate a simple reference code
    } catch (error) {
      console.error("[v0] Error creating tenant:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create tenant",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      monthlyRent: "",
      propertyId: "",
      unitNumber: "",
      leaseStartDate: "",
      leaseDuration: "12",
      notes: "",
    })
    setGeneratedCode("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Add New Tenant
              </DialogTitle>
              <DialogDescription>
                Fill out the tenant details to add them to your property management system.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john.doe@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="monthlyRent"
                      type="number"
                      value={formData.monthlyRent}
                      onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                      placeholder="2500"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="property">Property *</Label>
                  <Select
                    value={formData.propertyId}
                    onValueChange={(value) => setFormData({ ...formData, propertyId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      {properties.map((property) => (
                        <SelectItem key={property.id} value={property.id}>
                          <div className="flex items-center gap-2">
                            <Home className="w-4 h-4" />
                            {property.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitNumber">Unit Number *</Label>
                  <Input
                    id="unitNumber"
                    value={formData.unitNumber}
                    onChange={(e) => setFormData({ ...formData, unitNumber: e.target.value })}
                    placeholder="12A"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaseStartDate">Lease Start Date *</Label>
                  <Input
                    id="leaseStartDate"
                    type="date"
                    value={formData.leaseStartDate}
                    onChange={(e) => setFormData({ ...formData, leaseStartDate: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leaseDuration">Lease Duration (months) *</Label>
                  <Select
                    value={formData.leaseDuration}
                    onValueChange={(value) => setFormData({ ...formData, leaseDuration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="18">18 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Any additional notes about the tenant or lease..."
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Adding Tenant..." : "Add Tenant"}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-green-600">
                <Check className="w-5 h-5" />
                Tenant Added Successfully
              </DialogTitle>
              <DialogDescription>The tenant has been added to your property management system.</DialogDescription>
            </DialogHeader>

            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
              <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
                <CardHeader>
                  <CardTitle className="text-lg">Tenant Reference Code</CardTitle>
                  <CardDescription>Share this code with the tenant for future reference.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg border">
                    <code className="flex-1 text-lg font-mono font-bold text-center">{generatedCode}</code>
                    <Button size="sm" variant="outline" onClick={copyToClipboard} className="shrink-0 bg-transparent">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Tenant Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Name:</span>
                      <p className="font-medium">{formData.fullName}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Email:</span>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone:</span>
                      <p className="font-medium">{formData.phone}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Monthly Rent:</span>
                      <p className="font-medium">${formData.monthlyRent}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Unit:</span>
                      <p className="font-medium">{formData.unitNumber}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lease Duration:</span>
                      <p className="font-medium">{formData.leaseDuration} months</p>
                    </div>
                  </div>
                  {formData.notes && (
                    <div>
                      <span className="text-muted-foreground text-sm">Notes:</span>
                      <p className="text-sm mt-1">{formData.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={resetForm}>
                  Add Another Tenant
                </Button>
                <Button onClick={() => setOpen(false)}>Done</Button>
              </div>
            </motion.div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
