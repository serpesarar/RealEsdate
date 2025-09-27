"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, User, Wrench, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { format, addDays, startOfWeek, isToday } from "date-fns"

// Mock data for handyman availability and bookings
const handymenAvailability = [
  {
    id: 1,
    name: "Mike Rodriguez",
    specialty: "Plumbing",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      tuesday: ["09:00", "10:00", "13:00", "14:00", "15:00"],
      wednesday: ["10:00", "11:00", "14:00", "15:00", "16:00"],
      thursday: ["09:00", "10:00", "11:00", "13:00", "14:00"],
      friday: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      saturday: ["10:00", "11:00", "12:00"],
      sunday: [],
    },
    bookings: [
      { date: "2024-01-15", time: "10:00", tenant: "Sarah Johnson", issue: "Kitchen Faucet Leak" },
      { date: "2024-01-16", time: "14:00", tenant: "David Wilson", issue: "Bathroom Drain" },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    specialty: "Electrical",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: {
      monday: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
      tuesday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      wednesday: ["08:00", "09:00", "13:00", "14:00", "15:00"],
      thursday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      friday: ["08:00", "09:00", "10:00", "13:00", "14:00"],
      saturday: ["09:00", "10:00", "11:00"],
      sunday: [],
    },
    bookings: [{ date: "2024-01-15", time: "09:00", tenant: "Emily Rodriguez", issue: "Light Fixture" }],
  },
  {
    id: 3,
    name: "Sarah Davis",
    specialty: "General",
    avatar: "/placeholder.svg?height=32&width=32",
    availability: {
      monday: ["09:00", "10:00", "11:00", "14:00", "15:00"],
      tuesday: ["08:00", "09:00", "10:00", "13:00", "14:00", "15:00"],
      wednesday: ["09:00", "10:00", "11:00", "15:00", "16:00"],
      thursday: ["08:00", "09:00", "13:00", "14:00", "15:00"],
      friday: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
      saturday: ["10:00", "11:00"],
      sunday: [],
    },
    bookings: [],
  },
]

interface MaintenanceSchedulingCalendarProps {
  onBookSlot?: (handymanId: number, date: string, time: string, details: any) => void
}

export function MaintenanceSchedulingCalendar({ onBookSlot }: MaintenanceSchedulingCalendarProps) {
  const [selectedWeek, setSelectedWeek] = useState(new Date())
  const [selectedHandyman, setSelectedHandyman] = useState<number | null>(null)
  const [isBooking, setIsBooking] = useState(false)
  const { toast } = useToast()
  const [bookingDialog, setBookingDialog] = useState<{
    isOpen: boolean
    handymanId: number | null
    date: string | null
    time: string | null
  }>({
    isOpen: false,
    handymanId: null,
    date: null,
    time: null,
  })
  const [bookingDetails, setBookingDetails] = useState({
    tenant: "",
    issue: "",
    priority: "medium",
    notes: "",
  })

  const weekStart = startOfWeek(selectedWeek, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))
  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const handleBookSlot = async () => {
    if (!bookingDialog.handymanId || !bookingDialog.date || !bookingDialog.time) return

    setIsBooking(true)

    try {
      const response = await fetch("/api/maintenance/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handymanId: bookingDialog.handymanId,
          date: bookingDialog.date,
          time: bookingDialog.time,
          tenant: bookingDetails.tenant,
          issue: bookingDetails.issue,
          priority: bookingDetails.priority,
          notes: bookingDetails.notes,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Slot Booked",
          description: `Maintenance slot ${data.booking.id} has been scheduled successfully.`,
        })

        // Call the optional callback
        onBookSlot?.(bookingDialog.handymanId, bookingDialog.date, bookingDialog.time, bookingDetails)

        // Reset form and close dialog
        setBookingDialog({ isOpen: false, handymanId: null, date: null, time: null })
        setBookingDetails({ tenant: "", issue: "", priority: "medium", notes: "" })
      } else {
        throw new Error(data.error || "Failed to book maintenance slot")
      }
    } catch (error) {
      console.error("Error booking maintenance slot:", error)
      toast({
        title: "Error",
        description: "Failed to book maintenance slot. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsBooking(false)
    }
  }

  const openBookingDialog = (handymanId: number, date: string, time: string) => {
    setBookingDialog({
      isOpen: true,
      handymanId,
      date,
      time,
    })
  }

  const getTimeSlotStatus = (handyman: any, date: string, time: string) => {
    const dayName = format(new Date(date), "EEEE").toLowerCase()
    const isAvailable = handyman.availability[dayName]?.includes(time)
    const isBooked = handyman.bookings.some((booking: any) => booking.date === date && booking.time === time)

    if (isBooked) return "booked"
    if (isAvailable) return "available"
    return "unavailable"
  }

  const getBookingDetails = (handyman: any, date: string, time: string) => {
    return handyman.bookings.find((booking: any) => booking.date === date && booking.time === time)
  }

  const filteredHandymen = selectedHandyman
    ? handymenAvailability.filter((h) => h.id === selectedHandyman)
    : handymenAvailability

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Maintenance Scheduling</h2>
          <p className="text-muted-foreground">Book time slots with available handymen</p>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={selectedHandyman?.toString() || "all"}
            onValueChange={(value) => setSelectedHandyman(value === "all" ? null : Number.parseInt(value))}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by handyman" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Handymen</SelectItem>
              {handymenAvailability.map((handyman) => (
                <SelectItem key={handyman.id} value={handyman.id.toString()}>
                  {handyman.name} - {handyman.specialty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedWeek(addDays(selectedWeek, -7))}>
              Previous Week
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedWeek(addDays(selectedWeek, 7))}>
              Next Week
            </Button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border border-blue-200 rounded"></div>
              <span className="text-sm">Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border border-gray-200 rounded"></div>
              <span className="text-sm">Unavailable</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Week of {format(weekStart, "MMM d, yyyy")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredHandymen.map((handyman) => (
              <div key={handyman.id} className="space-y-4">
                {/* Handyman Header */}
                <div className="flex items-center gap-3 pb-2 border-b">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={handyman.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {handyman.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{handyman.name}</h3>
                    <p className="text-sm text-muted-foreground">{handyman.specialty}</p>
                  </div>
                  <Badge variant="outline" className="ml-auto">
                    {handyman.bookings.length} bookings this week
                  </Badge>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-8 gap-2">
                  {/* Time Column */}
                  <div className="space-y-2">
                    <div className="h-8 flex items-center justify-center text-sm font-medium">Time</div>
                    {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((time) => (
                      <div key={time} className="h-12 flex items-center justify-center text-xs text-muted-foreground">
                        {time}
                      </div>
                    ))}
                  </div>

                  {/* Day Columns */}
                  {weekDays.map((day, dayIndex) => (
                    <div key={dayIndex} className="space-y-2">
                      <div
                        className={`h-8 flex items-center justify-center text-sm font-medium rounded ${
                          isToday(day) ? "bg-primary text-primary-foreground" : ""
                        }`}
                      >
                        <div className="text-center">
                          <div>{dayNames[dayIndex]}</div>
                          <div className="text-xs">{format(day, "d")}</div>
                        </div>
                      </div>

                      {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((time) => {
                        const dateStr = format(day, "yyyy-MM-dd")
                        const status = getTimeSlotStatus(handyman, dateStr, time)
                        const booking = getBookingDetails(handyman, dateStr, time)

                        return (
                          <div key={time} className="h-12">
                            {status === "available" && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full h-full bg-green-50 border-green-200 hover:bg-green-100 text-green-800"
                                onClick={() => openBookingDialog(handyman.id, dateStr, time)}
                              >
                                <div className="text-center">
                                  <CheckCircle className="w-3 h-3 mx-auto mb-1" />
                                  <div className="text-xs">Book</div>
                                </div>
                              </Button>
                            )}
                            {status === "booked" && booking && (
                              <div className="w-full h-full bg-blue-50 border border-blue-200 rounded p-1 text-center">
                                <div className="text-xs text-blue-800">
                                  <User className="w-3 h-3 mx-auto mb-1" />
                                  <div className="truncate">{booking.tenant}</div>
                                  <div className="truncate text-[10px]">{booking.issue}</div>
                                </div>
                              </div>
                            )}
                            {status === "unavailable" && (
                              <div className="w-full h-full bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
                                <AlertCircle className="w-3 h-3 text-gray-400" />
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Booking Dialog */}
      <Dialog
        open={bookingDialog.isOpen}
        onOpenChange={(open) => setBookingDialog((prev) => ({ ...prev, isOpen: open }))}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Book Maintenance Slot
            </DialogTitle>
          </DialogHeader>

          {bookingDialog.handymanId && bookingDialog.date && bookingDialog.time && (
            <div className="space-y-4">
              {/* Booking Summary */}
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage
                      src={
                        handymenAvailability.find((h) => h.id === bookingDialog.handymanId)?.avatar ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                    />
                    <AvatarFallback>
                      {handymenAvailability
                        .find((h) => h.id === bookingDialog.handymanId)
                        ?.name.split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">
                      {handymenAvailability.find((h) => h.id === bookingDialog.handymanId)?.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {handymenAvailability.find((h) => h.id === bookingDialog.handymanId)?.specialty}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {format(new Date(bookingDialog.date), "MMM d, yyyy")}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {bookingDialog.time}
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tenant">Tenant</Label>
                  <Select
                    value={bookingDetails.tenant}
                    onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, tenant: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tenant" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sarah">Sarah Johnson - Apt 2A</SelectItem>
                      <SelectItem value="michael">Michael Chen - Apt 15B</SelectItem>
                      <SelectItem value="emily">Emily Rodriguez - Apt 8C</SelectItem>
                      <SelectItem value="david">David Wilson - Apt 12A</SelectItem>
                      <SelectItem value="lisa">Lisa Thompson - Apt 7D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue">Issue Description</Label>
                  <Textarea
                    id="issue"
                    placeholder="Describe the maintenance issue..."
                    value={bookingDetails.issue}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, issue: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={bookingDetails.priority}
                    onValueChange={(value) => setBookingDetails((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any additional information..."
                    value={bookingDetails.notes}
                    onChange={(e) => setBookingDetails((prev) => ({ ...prev, notes: e.target.value }))}
                    rows={2}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setBookingDialog((prev) => ({ ...prev, isOpen: false }))}>
                  Cancel
                </Button>
                <Button
                  onClick={handleBookSlot}
                  disabled={!bookingDetails.tenant || !bookingDetails.issue || isBooking}
                >
                  {isBooking ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Booking...
                    </>
                  ) : (
                    "Book Slot"
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
