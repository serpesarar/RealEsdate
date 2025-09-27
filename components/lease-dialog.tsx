"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

interface LeaseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  lease?: any
}

export function LeaseDialog({ open, onOpenChange, lease }: LeaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const isEditing = !!lease

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
    }, 2000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Lease Agreement" : "Create New Lease Agreement"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update lease agreement details" : "Enter the details for the new lease agreement"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="clauses">Clauses</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select defaultValue={lease?.tenant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah-johnson">Sarah Johnson</SelectItem>
                      <SelectItem value="mike-chen">Mike Chen</SelectItem>
                      <SelectItem value="lisa-rodriguez">Lisa Rodriguez</SelectItem>
                      <SelectItem value="alex-thompson">Alex Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property">Property</Label>
                  <Select defaultValue={lease?.property}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunset-apartments">Sunset Apartments</SelectItem>
                      <SelectItem value="downtown-lofts">Downtown Lofts</SelectItem>
                      <SelectItem value="garden-view-complex">Garden View Complex</SelectItem>
                      <SelectItem value="riverside-condos">Riverside Condos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit Number</Label>
                  <Input id="unit" placeholder="4B" defaultValue={lease?.unit} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="leaseType">Lease Type</Label>
                  <Select defaultValue={lease?.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select lease type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed Term</SelectItem>
                      <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                      <SelectItem value="renewal">Renewal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Lease Start Date</Label>
                  <Input id="startDate" type="date" defaultValue={lease?.startDate} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">Lease End Date</Label>
                  <Input id="endDate" type="date" defaultValue={lease?.endDate} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Property Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the rental property, amenities, and features..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRent">Monthly Rent</Label>
                  <Input id="monthlyRent" type="number" placeholder="2400" defaultValue={lease?.monthlyRent} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="securityDeposit">Security Deposit</Label>
                  <Input
                    id="securityDeposit"
                    type="number"
                    placeholder="2400"
                    defaultValue={lease?.securityDeposit}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="petDeposit">Pet Deposit</Label>
                  <Input id="petDeposit" type="number" placeholder="500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="keyDeposit">Key Deposit</Label>
                  <Input id="keyDeposit" type="number" placeholder="100" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="lateFee">Late Fee</Label>
                  <Input id="lateFee" type="number" placeholder="50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gracePeriod">Grace Period (days)</Label>
                  <Input id="gracePeriod" type="number" placeholder="5" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rentDueDate">Rent Due Date</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select due date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1st of the month</SelectItem>
                    <SelectItem value="15">15th of the month</SelectItem>
                    <SelectItem value="custom">Custom date</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMethods">Accepted Payment Methods</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="bank-transfer" />
                    <Label htmlFor="bank-transfer">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="check" />
                    <Label htmlFor="check">Check</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="online" />
                    <Label htmlFor="online">Online Payment</Label>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="occupancyLimit">Maximum Occupants</Label>
                  <Input id="occupancyLimit" type="number" placeholder="2" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="petPolicy">Pet Policy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select pet policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-pets">No Pets Allowed</SelectItem>
                      <SelectItem value="cats-only">Cats Only</SelectItem>
                      <SelectItem value="dogs-only">Dogs Only</SelectItem>
                      <SelectItem value="cats-dogs">Cats and Dogs</SelectItem>
                      <SelectItem value="all-pets">All Pets Allowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smokingPolicy">Smoking Policy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select smoking policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no-smoking">No Smoking</SelectItem>
                      <SelectItem value="outdoor-only">Outdoor Only</SelectItem>
                      <SelectItem value="designated-areas">Designated Areas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="parkingSpaces">Parking Spaces</Label>
                  <Input id="parkingSpaces" type="number" placeholder="1" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="utilities">Utilities Included</Label>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="water" />
                    <Label htmlFor="water">Water</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="electricity" />
                    <Label htmlFor="electricity">Electricity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="gas" />
                    <Label htmlFor="gas">Gas</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="internet" />
                    <Label htmlFor="internet">Internet</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="trash" />
                    <Label htmlFor="trash">Trash Collection</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="cable" />
                    <Label htmlFor="cable">Cable TV</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="renewalTerms">Renewal Terms</Label>
                <Textarea
                  id="renewalTerms"
                  placeholder="Specify automatic renewal terms, notice periods, etc..."
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="clauses" className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="specialClauses">Special Clauses</Label>
                <Textarea
                  id="specialClauses"
                  placeholder="Any special terms, conditions, or clauses specific to this lease..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maintenanceResponsibility">Maintenance Responsibility</Label>
                <Textarea
                  id="maintenanceResponsibility"
                  placeholder="Define who is responsible for various maintenance tasks..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="terminationClause">Termination Clause</Label>
                <Textarea
                  id="terminationClause"
                  placeholder="Conditions under which the lease can be terminated..."
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalTerms">Additional Terms</Label>
                <Textarea id="additionalTerms" placeholder="Any other terms and conditions..." rows={4} />
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creating..." : isEditing ? "Update Lease" : "Create Lease"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
