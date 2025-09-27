"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Waves, Users, Car, CalendarIcon, Clock } from "lucide-react"
import { useState } from "react"

interface AmenityBookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AmenityBookingDialog({ open, onOpenChange }: AmenityBookingDialogProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const amenities = [
    {
      id: 1,
      name: "Fitness Center",
      icon: Dumbbell,
      description: "Fully equipped gym with cardio and weight equipment",
      hours: "5:00 AM - 11:00 PM",
      capacity: "15 people",
      bookingRequired: false,
      available: true,
    },
    {
      id: 2,
      name: "Swimming Pool",
      icon: Waves,
      description: "Heated indoor pool with lap lanes",
      hours: "6:00 AM - 10:00 PM",
      capacity: "25 people",
      bookingRequired: false,
      available: true,
    },
    {
      id: 3,
      name: "Community Room",
      icon: Users,
      description: "Large event space for parties and meetings",
      hours: "8:00 AM - 10:00 PM",
      capacity: "50 people",
      bookingRequired: true,
      available: true,
    },
    {
      id: 4,
      name: "Guest Parking",
      icon: Car,
      description: "Reserved parking spots for visitors",
      hours: "24/7",
      capacity: "10 spots",
      bookingRequired: true,
      available: false,
    },
  ]

  const upcomingBookings = [
    {
      amenity: "Community Room",
      date: "Dec 28, 2024",
      time: "6:00 PM - 10:00 PM",
      purpose: "Birthday Party",
      status: "Confirmed",
    },
    {
      amenity: "Guest Parking",
      date: "Jan 2, 2025",
      time: "2:00 PM - 6:00 PM",
      purpose: "Family Visit",
      status: "Pending",
    },
  ]

  const timeSlots = [
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Amenity Booking
          </DialogTitle>
          <DialogDescription>Reserve building amenities and common areas</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="book">Book Amenity</TabsTrigger>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amenity Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Select Amenity</h3>
                <div className="space-y-3">
                  {amenities.map((amenity) => {
                    const IconComponent = amenity.icon
                    return (
                      <Card
                        key={amenity.id}
                        className={`cursor-pointer transition-colors ${
                          !amenity.available ? "opacity-50" : "hover:bg-muted/50"
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{amenity.name}</h4>
                                {amenity.bookingRequired && <Badge variant="outline">Booking Required</Badge>}
                                {!amenity.available && <Badge variant="destructive">Unavailable</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{amenity.description}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{amenity.hours}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  <span>{amenity.capacity}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Book Community Room</h3>

                <Card>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium">Select Date</label>
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
                        <label className="text-sm font-medium">Start Time</label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium">End Time</label>
                        <Select>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Purpose/Event</label>
                      <Select>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="party">Birthday Party</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="celebration">Celebration</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button className="w-full">Book Amenity</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">My Bookings</h3>
              <Badge variant="outline">{upcomingBookings.length} upcoming</Badge>
            </div>

            <div className="space-y-3">
              {upcomingBookings.map((booking, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">{booking.amenity}</h4>
                          <p className="text-sm text-muted-foreground">{booking.purpose}</p>
                          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                            <span>{booking.date}</span>
                            <span>•</span>
                            <span>{booking.time}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={
                            booking.status === "Confirmed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                          }
                        >
                          {booking.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Modify
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="availability" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Today's Availability</h3>
                <div className="space-y-3">
                  {amenities.map((amenity) => {
                    const IconComponent = amenity.icon
                    return (
                      <Card key={amenity.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-gray-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{amenity.name}</h4>
                                <p className="text-sm text-muted-foreground">{amenity.hours}</p>
                              </div>
                            </div>
                            <Badge className={amenity.available ? "bg-green-500 text-white" : "bg-red-500 text-white"}>
                              {amenity.available ? "Available" : "Booked"}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
