"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CalendarIcon,
  Clock,
  Users,
  Star,
  AlertCircle,
  CheckCircle,
  Plus,
  Minus,
  Repeat,
  Bell,
  CreditCard,
  QrCode,
  Smartphone,
  Key,
  Zap,
  Timer,
  UserCheck,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"

interface AdvancedAmenityBookingProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amenity?: any
}

interface BookingSlot {
  id: string
  time: string
  available: boolean
  capacity: number
  currentBookings: number
  price?: number
  features?: string[]
}

interface RecurringBooking {
  frequency: "daily" | "weekly" | "monthly"
  days?: string[]
  endDate?: Date
  maxOccurrences?: number
}

export function AdvancedAmenityBooking({ open, onOpenChange, amenity }: AdvancedAmenityBookingProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedSlot, setSelectedSlot] = useState<BookingSlot | null>(null)
  const [bookingType, setBookingType] = useState<"single" | "recurring">("single")
  const [recurringSettings, setRecurringSettings] = useState<RecurringBooking>({
    frequency: "weekly",
    days: [],
    endDate: undefined,
    maxOccurrences: 10,
  })
  const [guestCount, setGuestCount] = useState(1)
  const [specialRequests, setSpecialRequests] = useState("")
  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    push: true,
    reminder24h: true,
    reminder1h: true,
  })
  const [paymentMethod, setPaymentMethod] = useState("card")

  // Sample booking slots for fitness center
  const timeSlots: BookingSlot[] = [
    {
      id: "1",
      time: "06:00",
      available: true,
      capacity: 25,
      currentBookings: 8,
      features: ["Personal Training Available"],
    },
    { id: "2", time: "07:00", available: true, capacity: 25, currentBookings: 15, features: ["Yoga Class"] },
    { id: "3", time: "08:00", available: true, capacity: 25, currentBookings: 22, features: ["Peak Hours"] },
    { id: "4", time: "09:00", available: false, capacity: 25, currentBookings: 25, features: ["Fully Booked"] },
    { id: "5", time: "10:00", available: true, capacity: 25, currentBookings: 12, features: ["Quiet Hours"] },
    { id: "6", time: "11:00", available: true, capacity: 25, currentBookings: 8, features: ["Senior Hours"] },
    { id: "7", time: "12:00", available: true, capacity: 25, currentBookings: 18, features: ["Lunch Rush"] },
    { id: "8", time: "13:00", available: true, capacity: 25, currentBookings: 20, features: ["Peak Hours"] },
    { id: "9", time: "14:00", available: true, capacity: 25, currentBookings: 10, features: ["Quiet Hours"] },
    { id: "10", time: "15:00", available: true, capacity: 25, currentBookings: 14, features: ["Afternoon"] },
    { id: "11", time: "16:00", available: true, capacity: 25, currentBookings: 16, features: ["After School"] },
    { id: "12", time: "17:00", available: true, capacity: 25, currentBookings: 23, features: ["Peak Hours"] },
    {
      id: "13",
      time: "18:00",
      available: true,
      capacity: 25,
      currentBookings: 24,
      features: ["Peak Hours", "Spin Class"],
    },
    { id: "14", time: "19:00", available: true, capacity: 25, currentBookings: 19, features: ["Evening"] },
    { id: "15", time: "20:00", available: true, capacity: 25, currentBookings: 12, features: ["Quiet Hours"] },
    { id: "16", time: "21:00", available: true, capacity: 25, currentBookings: 6, features: ["Late Hours"] },
    { id: "17", time: "22:00", available: true, capacity: 25, currentBookings: 3, features: ["Late Hours"] },
  ]

  const upcomingBookings = [
    {
      id: "1",
      amenity: "Fitness Center",
      date: "Dec 28, 2024",
      time: "07:00 - 08:00",
      status: "confirmed",
      guests: 1,
      recurring: false,
      accessMethod: "Key Fob",
      qrCode: "QR123456",
    },
    {
      id: "2",
      amenity: "Community Room",
      date: "Jan 2, 2025",
      time: "18:00 - 22:00",
      status: "pending",
      guests: 8,
      recurring: false,
      accessMethod: "Front Desk",
      specialRequests: "Birthday party setup",
    },
    {
      id: "3",
      amenity: "Swimming Pool",
      date: "Every Monday",
      time: "19:00 - 20:00",
      status: "confirmed",
      guests: 2,
      recurring: true,
      accessMethod: "Access Code",
      nextOccurrence: "Jan 6, 2025",
    },
  ]

  const getSlotColor = (slot: BookingSlot) => {
    if (!slot.available) return "bg-red-100 text-red-800 border-red-200"

    const utilization = slot.currentBookings / slot.capacity
    if (utilization >= 0.9) return "bg-orange-100 text-orange-800 border-orange-200"
    if (utilization >= 0.7) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  const getUtilizationPercentage = (slot: BookingSlot) => {
    return Math.round((slot.currentBookings / slot.capacity) * 100)
  }

  const calculateTotalPrice = () => {
    if (!selectedSlot?.price) return 0
    let total = selectedSlot.price * guestCount

    if (bookingType === "recurring" && recurringSettings.maxOccurrences) {
      total *= recurringSettings.maxOccurrences
    }

    return total
  }

  const handleBooking = () => {
    // Handle booking logic here
    console.log("Booking details:", {
      amenity: amenity?.name,
      date: selectedDate,
      slot: selectedSlot,
      type: bookingType,
      recurring: recurringSettings,
      guests: guestCount,
      specialRequests,
      notifications: notificationPrefs,
      payment: paymentMethod,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Advanced Amenity Booking
          </DialogTitle>
          <DialogDescription>
            Book amenities with smart scheduling, recurring options, and real-time availability
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="book">Book Amenity</TabsTrigger>
            <TabsTrigger value="my-bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="quick-access">Quick Access</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="book" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Date & Time Selection */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CalendarIcon className="w-5 h-5" />
                      Select Date & Time
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                      disabled={(date) => date < new Date()}
                    />

                    <div className="space-y-2">
                      <Label>Booking Type</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="single"
                            name="bookingType"
                            checked={bookingType === "single"}
                            onChange={() => setBookingType("single")}
                          />
                          <Label htmlFor="single">Single Booking</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="recurring"
                            name="bookingType"
                            checked={bookingType === "recurring"}
                            onChange={() => setBookingType("recurring")}
                          />
                          <Label htmlFor="recurring">Recurring</Label>
                        </div>
                      </div>
                    </div>

                    {bookingType === "recurring" && (
                      <Card className="p-4 bg-blue-50 border-blue-200">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Frequency</Label>
                            <Select
                              value={recurringSettings.frequency}
                              onValueChange={(value: any) =>
                                setRecurringSettings((prev) => ({ ...prev, frequency: value }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          {recurringSettings.frequency === "weekly" && (
                            <div className="space-y-2">
                              <Label>Days of Week</Label>
                              <div className="flex gap-2 flex-wrap">
                                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                                  <Button
                                    key={day}
                                    variant={recurringSettings.days?.includes(day) ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => {
                                      const days = recurringSettings.days || []
                                      const newDays = days.includes(day)
                                        ? days.filter((d) => d !== day)
                                        : [...days, day]
                                      setRecurringSettings((prev) => ({ ...prev, days: newDays }))
                                    }}
                                  >
                                    {day}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Maximum Occurrences</Label>
                            <Input
                              type="number"
                              value={recurringSettings.maxOccurrences}
                              onChange={(e) =>
                                setRecurringSettings((prev) => ({
                                  ...prev,
                                  maxOccurrences: Number.parseInt(e.target.value),
                                }))
                              }
                              min="1"
                              max="52"
                            />
                          </div>
                        </div>
                      </Card>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Time Slots & Details */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Available Time Slots
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <Card
                          key={slot.id}
                          className={`cursor-pointer transition-all ${
                            selectedSlot?.id === slot.id ? "ring-2 ring-blue-500" : ""
                          } ${getSlotColor(slot)}`}
                          onClick={() => slot.available && setSelectedSlot(slot)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{slot.time}</span>
                              <Badge variant="outline" className="text-xs">
                                {getUtilizationPercentage(slot)}%
                              </Badge>
                            </div>

                            <div className="space-y-1 text-xs">
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                <span>
                                  {slot.currentBookings}/{slot.capacity}
                                </span>
                              </div>

                              {slot.features && slot.features.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                  {slot.features.map((feature, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              )}

                              {slot.price && (
                                <div className="flex items-center gap-1 font-medium">
                                  <CreditCard className="w-3 h-3" />
                                  <span>${slot.price}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedSlot && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Number of Guests</Label>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <Input
                              type="number"
                              value={guestCount}
                              onChange={(e) => setGuestCount(Number.parseInt(e.target.value) || 1)}
                              className="w-20 text-center"
                              min="1"
                              max="10"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="card">Credit Card</SelectItem>
                              <SelectItem value="account">Charge to Account</SelectItem>
                              <SelectItem value="free">Free (Included)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Special Requests</Label>
                        <Textarea
                          placeholder="Any special requirements or requests..."
                          value={specialRequests}
                          onChange={(e) => setSpecialRequests(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-3">
                        <Label>Notification Preferences</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={notificationPrefs.email}
                              onCheckedChange={(checked) =>
                                setNotificationPrefs((prev) => ({ ...prev, email: !!checked }))
                              }
                            />
                            <Label className="text-sm">Email confirmation</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={notificationPrefs.sms}
                              onCheckedChange={(checked) =>
                                setNotificationPrefs((prev) => ({ ...prev, sms: !!checked }))
                              }
                            />
                            <Label className="text-sm">SMS notifications</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={notificationPrefs.reminder24h}
                              onCheckedChange={(checked) =>
                                setNotificationPrefs((prev) => ({ ...prev, reminder24h: !!checked }))
                              }
                            />
                            <Label className="text-sm">24-hour reminder</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={notificationPrefs.reminder1h}
                              onCheckedChange={(checked) =>
                                setNotificationPrefs((prev) => ({ ...prev, reminder1h: !!checked }))
                              }
                            />
                            <Label className="text-sm">1-hour reminder</Label>
                          </div>
                        </div>
                      </div>

                      {calculateTotalPrice() > 0 && (
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Total Cost:</span>
                            <span className="text-xl font-bold text-blue-600">${calculateTotalPrice()}</span>
                          </div>
                          {bookingType === "recurring" && (
                            <p className="text-sm text-muted-foreground mt-1">
                              ${selectedSlot.price} × {guestCount} guests × {recurringSettings.maxOccurrences}{" "}
                              occurrences
                            </p>
                          )}
                        </div>
                      )}

                      <Button onClick={handleBooking} className="w-full" size="lg">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Confirm Booking
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="my-bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">My Bookings</h3>
                <p className="text-sm text-muted-foreground">Manage your current and upcoming reservations</p>
              </div>
              <Badge variant="outline">{upcomingBookings.length} upcoming</Badge>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{booking.amenity}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{booking.date}</span>
                            <span>•</span>
                            <span>{booking.time}</span>
                            <span>•</span>
                            <span>
                              {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                            </span>
                          </div>
                          {booking.specialRequests && (
                            <p className="text-sm text-muted-foreground mt-1">Note: {booking.specialRequests}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <Badge
                            className={
                              booking.status === "confirmed" ? "bg-green-500 text-white" : "bg-yellow-500 text-white"
                            }
                          >
                            {booking.status}
                          </Badge>
                          {booking.recurring && (
                            <div className="flex items-center gap-1 mt-1">
                              <Repeat className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Recurring</span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-2">
                          {booking.accessMethod === "QR Code" && booking.qrCode && (
                            <Button variant="outline" size="sm">
                              <QrCode className="w-4 h-4 mr-1" />
                              QR Code
                            </Button>
                          )}
                          {booking.accessMethod === "Key Fob" && (
                            <Button variant="outline" size="sm">
                              <Key className="w-4 h-4 mr-1" />
                              Key Fob
                            </Button>
                          )}
                          {booking.accessMethod === "Mobile App" && (
                            <Button variant="outline" size="sm">
                              <Smartphone className="w-4 h-4 mr-1" />
                              App Access
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Modify
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-access" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Smart Booking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Timer className="w-4 h-4 mr-2" />
                    Book Next Available
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Star className="w-4 h-4 mr-2" />
                    Book Favorite Time
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Repeat className="w-4 h-4 mr-2" />
                    Repeat Last Booking
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <UserCheck className="w-4 h-4 mr-2" />
                    Book with Friends
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-green-600" />
                    Quick Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Front Desk
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Live Chat Support
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Report Issue
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-purple-600" />
                    Favorites & History
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Star className="w-4 h-4 mr-2" />
                    Favorite Amenities
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="w-4 h-4 mr-2" />
                    Booking History
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="w-4 h-4 mr-2" />
                    Frequent Companions
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Calendar Sync
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Booking Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Default Guest Count</Label>
                    <Input type="number" defaultValue="1" min="1" max="10" />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Time Slots</Label>
                    <div className="flex gap-2 flex-wrap">
                      {["Morning", "Afternoon", "Evening", "Late Night"].map((time) => (
                        <Button key={time} variant="outline" size="sm">
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Auto-booking Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Auto-book when slot becomes available</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Join waitlist for full slots</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch />
                        <Label className="text-sm">Book recurring slots automatically</Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Email Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>SMS Notifications</Label>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Push Notifications</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>24-hour Reminders</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>1-hour Reminders</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Cancellation Alerts</Label>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>New Amenity Announcements</Label>
                      <Switch />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Reminder Timing</Label>
                    <Select defaultValue="both">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="24h">24 hours only</SelectItem>
                        <SelectItem value="1h">1 hour only</SelectItem>
                        <SelectItem value="both">Both 24h and 1h</SelectItem>
                        <SelectItem value="custom">Custom timing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
