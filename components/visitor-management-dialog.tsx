"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserPlus, Car, Clock, CheckCircle, QrCode, Share } from "lucide-react"
import { useState } from "react"

interface VisitorManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function VisitorManagementDialog({ open, onOpenChange }: VisitorManagementDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const registeredVisitors = [
    {
      id: 1,
      name: "John Smith",
      phone: "(555) 123-4567",
      date: "Dec 28, 2024",
      time: "2:00 PM - 6:00 PM",
      parking: "Spot #15",
      status: "Active",
      code: "VIS-4B-001",
    },
    {
      id: 2,
      name: "Emily Johnson",
      phone: "(555) 987-6543",
      date: "Dec 30, 2024",
      time: "10:00 AM - 2:00 PM",
      parking: "No parking",
      status: "Pending",
      code: "VIS-4B-002",
    },
  ]

  const parkingSpots = [
    { id: "15", available: false, reserved: "John Smith" },
    { id: "16", available: true, reserved: null },
    { id: "17", available: true, reserved: null },
    { id: "18", available: false, reserved: "Building Maintenance" },
    { id: "19", available: true, reserved: null },
    { id: "20", available: true, reserved: null },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Visitor Management
          </DialogTitle>
          <DialogDescription>Pre-register guests and manage visitor parking passes</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="register" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="register">Register Visitor</TabsTrigger>
            <TabsTrigger value="active">Active Visitors</TabsTrigger>
            <TabsTrigger value="parking">Parking</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="register" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Registration Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Information</CardTitle>
                  <CardDescription>Pre-register your guests for easy building access</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Smith" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="(555) 123-4567" />
                  </div>

                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div>
                    <Label htmlFor="purpose">Purpose of Visit</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="family">Family Visit</SelectItem>
                        <SelectItem value="friends">Friends</SelectItem>
                        <SelectItem value="maintenance">Maintenance/Repair</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea id="notes" placeholder="Any special instructions..." />
                  </div>
                </CardContent>
              </Card>

              {/* Visit Details */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Visit Schedule</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Visit Date</Label>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        className="rounded-md border mt-2"
                        disabled={(date) => date < new Date()}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Start Time</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8am">8:00 AM</SelectItem>
                            <SelectItem value="10am">10:00 AM</SelectItem>
                            <SelectItem value="12pm">12:00 PM</SelectItem>
                            <SelectItem value="2pm">2:00 PM</SelectItem>
                            <SelectItem value="4pm">4:00 PM</SelectItem>
                            <SelectItem value="6pm">6:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>End Time</Label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10am">10:00 AM</SelectItem>
                            <SelectItem value="12pm">12:00 PM</SelectItem>
                            <SelectItem value="2pm">2:00 PM</SelectItem>
                            <SelectItem value="4pm">4:00 PM</SelectItem>
                            <SelectItem value="6pm">6:00 PM</SelectItem>
                            <SelectItem value="8pm">8:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Parking Pass</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Parking Required?</Label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes, reserve a spot</SelectItem>
                          <SelectItem value="no">No parking needed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Vehicle Information</Label>
                      <Input placeholder="Make, Model, License Plate" />
                    </div>

                    <Button className="w-full">Register Visitor</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Active Visitors</h3>
              <Badge variant="outline">{registeredVisitors.length} registered</Badge>
            </div>

            <div className="space-y-3">
              {registeredVisitors.map((visitor) => (
                <Card key={visitor.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <UserPlus className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{visitor.name}</h4>
                          <p className="text-sm text-muted-foreground">{visitor.phone}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {visitor.date} • {visitor.time}
                            </span>
                          </div>
                          {visitor.parking !== "No parking" && (
                            <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                              <Car className="w-3 h-3" />
                              <span>{visitor.parking}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            visitor.status === "Active" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                          }
                        >
                          {visitor.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <QrCode className="w-4 h-4 mr-2" />
                          QR Code
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="parking" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Guest Parking Availability</h3>
              <Badge variant="outline">
                {parkingSpots.filter((spot) => spot.available).length} of {parkingSpots.length} available
              </Badge>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {parkingSpots.map((spot) => (
                <Card
                  key={spot.id}
                  className={`${spot.available ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center">
                      <Car className={`w-6 h-6 ${spot.available ? "text-green-600" : "text-red-600"}`} />
                    </div>
                    <h4 className="font-medium">Spot #{spot.id}</h4>
                    {spot.available ? (
                      <Badge className="mt-2 bg-green-500 text-white">Available</Badge>
                    ) : (
                      <div>
                        <Badge className="mt-2 bg-red-500 text-white">Reserved</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{spot.reserved}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <h3 className="text-lg font-medium">Visitor History</h3>
            <div className="space-y-3">
              {[
                { name: "Mike Wilson", date: "Dec 20, 2024", purpose: "Family Visit", status: "Completed" },
                { name: "Sarah Davis", date: "Dec 15, 2024", purpose: "Friends", status: "Completed" },
                { name: "Tom Brown", date: "Dec 10, 2024", purpose: "Maintenance", status: "Completed" },
              ].map((visitor, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{visitor.name}</h4>
                          <p className="text-sm text-muted-foreground">{visitor.purpose}</p>
                          <p className="text-xs text-muted-foreground">{visitor.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{visitor.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
