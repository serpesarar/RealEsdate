"use client"

import { DialogTrigger } from "@/components/ui/dialog"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { toast } from "@/hooks/use-toast"
import {
  AlertTriangle,
  Droplets,
  Zap,
  Wrench,
  Thermometer,
  Home,
  HelpCircle,
  Camera,
  ArrowLeft,
  CalendarIcon,
  Upload,
  X,
  Loader2,
} from "lucide-react"
import { format } from "date-fns"

const categoryTitles = {
  plumbing: [
    "Leaky faucet in kitchen",
    "Clogged drain",
    "Running toilet",
    "Low water pressure",
    "Pipe leak",
    "Water heater issue",
  ],
  electrical: [
    "Outlet not working",
    "Light switch broken",
    "Circuit breaker tripping",
    "Flickering lights",
    "Power outage in room",
    "Electrical burning smell",
  ],
  appliance: [
    "Refrigerator not cooling",
    "Dishwasher not draining",
    "Washing machine leaking",
    "Oven not heating",
    "Microwave not working",
    "Garbage disposal jammed",
  ],
  hvac: [
    "Air conditioning not working",
    "Heater not turning on",
    "Thermostat malfunction",
    "Poor air circulation",
    "Strange noises from HVAC",
    "Temperature not regulating",
  ],
  structural: [
    "Crack in wall",
    "Door won't close properly",
    "Window won't open",
    "Loose floorboard",
    "Ceiling stain",
    "Paint peeling",
  ],
  other: [
    "General maintenance needed",
    "Safety concern",
    "Noise complaint",
    "Pest control needed",
    "Lock issue",
    "Other concern",
  ],
}

const issueCategories = [
  {
    id: "plumbing",
    label: "Plumbing",
    icon: Droplets,
    emoji: "🚰",
    color: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "electrical",
    label: "Electrical",
    icon: Zap,
    emoji: "⚡",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  {
    id: "appliance",
    label: "Appliance",
    icon: Wrench,
    emoji: "🔧",
    color: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "hvac",
    label: "Heating/Cooling",
    icon: Thermometer,
    emoji: "🌡️",
    color: "bg-red-100 text-red-700 border-red-200",
  },
  {
    id: "structural",
    label: "Structural",
    icon: Home,
    emoji: "🏠",
    color: "bg-purple-100 text-purple-700 border-purple-200",
  },
  { id: "other", label: "Other", icon: HelpCircle, emoji: "❓", color: "bg-gray-100 text-gray-700 border-gray-200" },
]

interface IssueReportDialogProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function IssueReportDialog({ children, open, onOpenChange }: IssueReportDialogProps) {
  const [step, setStep] = useState<"category" | "details">("category")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    urgency: "",
    location: "",
    availabilityDate: undefined as Date | undefined,
    additionalNotes: "",
    photos: [] as string[],
  })
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const suggestions = categoryTitles[categoryId as keyof typeof categoryTitles]
    if (suggestions && suggestions.length > 0) {
      setFormData((prev) => ({ ...prev, title: suggestions[0] }))
    }
    setStep("details")
  }

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.size > 10 * 1024 * 1024) {
          // 10MB limit
          toast({
            title: "File too large",
            description: "Please select images smaller than 10MB",
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setFormData((prev) => ({
              ...prev,
              photos: [...prev.photos, e.target!.result as string],
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const priorityMap = {
        urgent: "HIGH",
        soon: "MEDIUM",
        "can-wait": "LOW",
      }

      const issueData = {
        title: formData.title,
        description: formData.description,
        property: "riverside-gardens",
        unit: "4B",
        urgency: formData.urgency,
        category: selectedCategory.toUpperCase(),
        priority: priorityMap[formData.urgency as keyof typeof priorityMap] || "MEDIUM",
        location: formData.location,
        availabilityDate: formData.availabilityDate?.toISOString(),
        additionalNotes: formData.additionalNotes,
        photos: formData.photos,
        tenantId: "current-tenant",
      }

      console.log("[v0] Submitting issue:", issueData)

      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit issue")
      }

      const result = await response.json()
      console.log("[v0] Issue submitted successfully:", result)

      try {
        await fetch("/api/notifications", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: "issue_reported",
            title: "New Issue Reported",
            message: `${formData.title} - ${selectedCategoryData?.label}`,
            urgency: formData.urgency,
            recipientRole: "manager",
            metadata: {
              issueId: result.issue?.id,
              category: selectedCategory,
              location: formData.location,
            },
          }),
        })
      } catch (notificationError) {
        console.error("[v0] Failed to send notification:", notificationError)
      }

      toast({
        title: "Issue Reported Successfully!",
        description: `Your ${selectedCategoryData?.label.toLowerCase()} issue has been submitted. Issue ID: ${result.issue?.id}`,
      })

      resetForm()
      if (onOpenChange) {
        onOpenChange(false)
      }
    } catch (error) {
      console.error("[v0] Error submitting issue:", error)
      toast({
        title: "Error",
        description: "Failed to submit issue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setStep("category")
    setSelectedCategory("")
    setFormData({
      title: "",
      description: "",
      urgency: "",
      location: "",
      availabilityDate: undefined,
      additionalNotes: "",
      photos: [],
    })
  }

  const selectedCategoryData = issueCategories.find((cat) => cat.id === selectedCategory)

  const DialogWrapper = children
    ? Dialog
    : ({ children: dialogChildren }: { children: React.ReactNode }) => (
        <Dialog open={open} onOpenChange={onOpenChange}>
          {dialogChildren}
        </Dialog>
      )

  return (
    <DialogWrapper>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {step === "category" ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                Report an Issue
              </DialogTitle>
              <DialogDescription>
                What type of issue are you experiencing? Select a category to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-3 py-4">
              {issueCategories.map((category) => {
                const Icon = category.icon
                return (
                  <Card
                    key={category.id}
                    className={`cursor-pointer hover:shadow-md transition-all border-2 ${category.color}`}
                    onClick={() => handleCategorySelect(category.id)}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <div className="text-2xl">{category.emoji}</div>
                      <Icon className="w-6 h-6 mx-auto" />
                      <h3 className="font-medium text-sm">{category.label}</h3>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setStep("category")} className="p-1">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
                <DialogTitle className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCategoryData?.emoji}</span>
                  {selectedCategoryData?.label} Issue
                </DialogTitle>
              </div>
              <DialogDescription>
                Please provide details about your {selectedCategoryData?.label.toLowerCase()} issue.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Select value={formData.title} onValueChange={(value) => setFormData({ ...formData, title: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type a title" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoryTitles[selectedCategory as keyof typeof categoryTitles]?.map((title) => (
                      <SelectItem key={title} value={title}>
                        {title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Or type your own title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe the issue in detail. Include when it started, how often it occurs, and any steps you've already taken..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Photos (Required)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center">
                    <Camera className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Take photos to help us understand the issue</p>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="mb-2"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Photos
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      capture="environment"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">Max 10MB per image. Supports camera on mobile devices.</p>
                  </div>

                  {formData.photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {formData.photos.map((photo, index) => (
                        <div key={index} className="relative">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Issue photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 h-6 w-6 p-0"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location in Unit</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bathroom">Bathroom</SelectItem>
                    <SelectItem value="master-bathroom">Master Bathroom</SelectItem>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="dining-room">Dining Room</SelectItem>
                    <SelectItem value="master-bedroom">Master Bedroom</SelectItem>
                    <SelectItem value="bedroom-2">Bedroom 2</SelectItem>
                    <SelectItem value="bedroom-3">Bedroom 3</SelectItem>
                    <SelectItem value="balcony">Balcony/Patio</SelectItem>
                    <SelectItem value="laundry">Laundry Room</SelectItem>
                    <SelectItem value="hallway">Hallway</SelectItem>
                    <SelectItem value="closet">Closet</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-3 border rounded-lg border-red-200 bg-red-50">
                    <RadioGroupItem value="urgent" id="urgent" />
                    <Label htmlFor="urgent" className="text-red-700 font-medium flex items-center gap-2">
                      🔴 URGENT (Immediate Attention)
                      <span className="text-sm font-normal">Safety hazard, no heat/AC, major leak</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                    <RadioGroupItem value="soon" id="soon" />
                    <Label htmlFor="soon" className="text-yellow-700 font-medium flex items-center gap-2">
                      🟡 Soon (Within a Week)
                      <span className="text-sm font-normal">Affecting daily life but not dangerous</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg border-green-200 bg-green-50">
                    <RadioGroupItem value="can-wait" id="can-wait" />
                    <Label htmlFor="can-wait" className="text-green-700 font-medium flex items-center gap-2">
                      🟢 Can Wait (Not Urgent)
                      <span className="text-sm font-normal">Cosmetic or minor convenience issue</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Availability for Repair</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.availabilityDate ? (
                        format(formData.availabilityDate, "PPP")
                      ) : (
                        <span>When are you available for repairs?</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.availabilityDate}
                      onSelect={(date) => setFormData({ ...formData, availabilityDate: date })}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-sm text-gray-600">
                  Select your preferred date for repair scheduling. We'll contact you to confirm timing.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additional-notes">Additional Notes</Label>
                <Textarea
                  id="additional-notes"
                  placeholder="Any additional information, special instructions, or concerns..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  rows={2}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleSubmit}
                disabled={!formData.title || !formData.description || formData.photos.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting Issue...
                  </>
                ) : (
                  "Submit Issue Report"
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </DialogWrapper>
  )
}
