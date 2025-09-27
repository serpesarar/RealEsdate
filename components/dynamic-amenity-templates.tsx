"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Building2,
  Package,
  Users,
  Dog,
  Briefcase,
  Bell,
  Plus,
  Edit,
  Trash2,
  Copy,
  Eye,
  DollarSign,
  Phone,
  Info,
  CheckCircle,
  Settings,
  Zap,
} from "lucide-react"

interface DynamicField {
  id: string
  name: string
  type:
    | "text"
    | "number"
    | "boolean"
    | "multiline"
    | "timeRange"
    | "dateRange"
    | "currency"
    | "phone"
    | "url"
    | "secure"
    | "checkbox"
    | "select"
  required: boolean
  placeholder?: string
  options?: string[]
  label?: string
  showsCustomText?: string
  validation?: {
    min?: number
    max?: number
    pattern?: string
    message?: string
  }
}

interface AmenityTemplate {
  id: string
  name: string
  icon: any
  description: string
  category: string
  fields: DynamicField[]
  isCustom?: boolean
  createdAt?: string
  usageCount?: number
}

interface DynamicAmenityTemplatesProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DynamicAmenityTemplates({ open, onOpenChange }: DynamicAmenityTemplatesProps) {
  const [templates, setTemplates] = useState<AmenityTemplate[]>([
    {
      id: "wifi-advanced",
      name: "Advanced WiFi System",
      icon: Wifi,
      description: "Comprehensive WiFi management with multiple networks and guest access",
      category: "connectivity",
      usageCount: 15,
      fields: [
        {
          id: "primary-network",
          name: "primaryNetwork",
          type: "text",
          required: true,
          placeholder: "PropertyWiFi_Main",
          label: "Primary Network Name",
        },
        {
          id: "guest-network",
          name: "guestNetwork",
          type: "text",
          required: false,
          placeholder: "PropertyWiFi_Guest",
          label: "Guest Network Name",
        },
        {
          id: "password-type",
          name: "passwordType",
          type: "select",
          required: true,
          options: ["Provided", "On Router", "QR Code", "Contact Management"],
          label: "Password Access Method",
        },
        {
          id: "password-location",
          name: "passwordLocation",
          type: "checkbox",
          label: "Password is on router/modem box",
          showsCustomText: "Check the back of the WiFi router in the utility closet",
        },
        {
          id: "speed-tier",
          name: "speedTier",
          type: "select",
          required: true,
          options: ["Basic (25 Mbps)", "Standard (100 Mbps)", "Premium (500 Mbps)", "Gigabit (1000 Mbps)"],
          label: "Internet Speed Tier",
        },
        {
          id: "provider",
          name: "provider",
          type: "text",
          required: true,
          placeholder: "Verizon FiOS",
          label: "Internet Service Provider",
        },
        {
          id: "support-number",
          name: "supportNumber",
          type: "phone",
          required: false,
          label: "Technical Support Number",
        },
        {
          id: "troubleshooting-guide",
          name: "troubleshootingGuide",
          type: "multiline",
          required: false,
          placeholder: "1. Restart your device\n2. Forget and reconnect to network\n3. Contact support...",
          label: "Troubleshooting Steps",
        },
      ],
    },
    {
      id: "fitness-premium",
      name: "Premium Fitness Center",
      icon: Dumbbell,
      description: "Full-service fitness center with classes, personal training, and equipment tracking",
      category: "recreation",
      usageCount: 8,
      fields: [
        {
          id: "operating-hours",
          name: "operatingHours",
          type: "timeRange",
          required: true,
          label: "Operating Hours",
        },
        {
          id: "location-details",
          name: "locationDetails",
          type: "text",
          required: true,
          placeholder: "Building A, Ground Floor, Room 101",
          label: "Detailed Location",
        },
        {
          id: "access-method",
          name: "accessMethod",
          type: "select",
          required: true,
          options: ["Key Fob", "Mobile App", "Access Code", "Front Desk"],
          label: "Access Method",
        },
        {
          id: "access-code",
          name: "accessCode",
          type: "secure",
          required: false,
          label: "Access Code (if applicable)",
        },
        {
          id: "equipment-categories",
          name: "equipmentCategories",
          type: "multiline",
          required: true,
          placeholder:
            "Cardio Equipment:\n- 5 Treadmills\n- 3 Ellipticals\n\nStrength Training:\n- Free weights\n- Cable machines",
          label: "Equipment Inventory",
        },
        {
          id: "max-capacity",
          name: "maxCapacity",
          type: "number",
          required: true,
          placeholder: "25",
          label: "Maximum Occupancy",
          validation: { min: 1, max: 100 },
        },
        {
          id: "personal-training",
          name: "personalTraining",
          type: "boolean",
          label: "Personal Training Available",
        },
        {
          id: "group-classes",
          name: "groupClasses",
          type: "boolean",
          label: "Group Fitness Classes",
        },
        {
          id: "class-schedule",
          name: "classSchedule",
          type: "multiline",
          required: false,
          placeholder: "Monday: Yoga 7AM, Spin 6PM\nTuesday: Pilates 8AM, HIIT 7PM",
          label: "Class Schedule (if applicable)",
        },
        {
          id: "booking-required",
          name: "bookingRequired",
          type: "boolean",
          label: "Advance Booking Required",
        },
        {
          id: "booking-window",
          name: "bookingWindow",
          type: "select",
          required: false,
          options: ["24 hours", "48 hours", "1 week", "2 weeks"],
          label: "Booking Window (if required)",
        },
      ],
    },
    {
      id: "parking-smart",
      name: "Smart Parking System",
      icon: Car,
      description: "Intelligent parking management with real-time availability and EV charging",
      category: "transportation",
      usageCount: 12,
      fields: [
        {
          id: "parking-type",
          name: "parkingType",
          type: "select",
          required: true,
          options: ["Assigned Spots", "First Come First Serve", "Reservation System", "Hybrid"],
          label: "Parking System Type",
        },
        {
          id: "total-spots",
          name: "totalSpots",
          type: "number",
          required: true,
          placeholder: "120",
          label: "Total Parking Spots",
          validation: { min: 1 },
        },
        {
          id: "resident-spots",
          name: "residentSpots",
          type: "number",
          required: true,
          placeholder: "100",
          label: "Resident Spots",
          validation: { min: 1 },
        },
        {
          id: "guest-spots",
          name: "guestSpots",
          type: "number",
          required: true,
          placeholder: "20",
          label: "Guest Spots",
          validation: { min: 0 },
        },
        {
          id: "location-levels",
          name: "locationLevels",
          type: "multiline",
          required: true,
          placeholder: "Level B1: Spots 1-50\nLevel B2: Spots 51-100\nSurface: Spots 101-120",
          label: "Parking Level Layout",
        },
        {
          id: "monthly-fee",
          name: "monthlyFee",
          type: "currency",
          required: false,
          label: "Monthly Parking Fee",
        },
        {
          id: "guest-fee",
          name: "guestFee",
          type: "currency",
          required: false,
          label: "Guest Parking Fee (per day)",
        },
        {
          id: "ev-charging",
          name: "evCharging",
          type: "boolean",
          label: "EV Charging Stations Available",
        },
        {
          id: "ev-spots",
          name: "evSpots",
          type: "number",
          required: false,
          placeholder: "8",
          label: "Number of EV Charging Spots",
          validation: { min: 0 },
        },
        {
          id: "ev-fee",
          name: "evFee",
          type: "currency",
          required: false,
          label: "EV Charging Fee (per hour)",
        },
        {
          id: "security-features",
          name: "securityFeatures",
          type: "multiline",
          required: false,
          placeholder: "- 24/7 Security Cameras\n- Keycard Access\n- Emergency Call Boxes",
          label: "Security Features",
        },
        {
          id: "real-time-availability",
          name: "realTimeAvailability",
          type: "boolean",
          label: "Real-time Availability Tracking",
        },
      ],
    },
  ])

  const [selectedTemplate, setSelectedTemplate] = useState<AmenityTemplate | null>(null)
  const [isCreatingCustom, setIsCreatingCustom] = useState(false)
  const [customTemplate, setCustomTemplate] = useState<Partial<AmenityTemplate>>({
    name: "",
    description: "",
    category: "custom",
    fields: [],
  })

  const categories = [
    { id: "all", name: "All Templates", count: templates.length },
    { id: "connectivity", name: "Connectivity", count: templates.filter((t) => t.category === "connectivity").length },
    { id: "recreation", name: "Recreation", count: templates.filter((t) => t.category === "recreation").length },
    {
      id: "transportation",
      name: "Transportation",
      count: templates.filter((t) => t.category === "transportation").length,
    },
    { id: "utilities", name: "Utilities", count: templates.filter((t) => t.category === "utilities").length },
    { id: "custom", name: "Custom", count: templates.filter((t) => t.category === "custom").length },
  ]

  const fieldTypes = [
    { value: "text", label: "Text Input", icon: "T" },
    { value: "number", label: "Number", icon: "#" },
    { value: "boolean", label: "Yes/No Switch", icon: "⚡" },
    { value: "multiline", label: "Multi-line Text", icon: "≡" },
    { value: "select", label: "Dropdown Select", icon: "▼" },
    { value: "timeRange", label: "Time Range", icon: "🕐" },
    { value: "dateRange", label: "Date Range", icon: "📅" },
    { value: "currency", label: "Currency", icon: "$" },
    { value: "phone", label: "Phone Number", icon: "📞" },
    { value: "url", label: "Website URL", icon: "🔗" },
    { value: "secure", label: "Secure/Password", icon: "🔒" },
    { value: "checkbox", label: "Checkbox", icon: "☑" },
  ]

  const iconOptions = [
    { value: Wifi, label: "WiFi", name: "wifi" },
    { value: Dumbbell, label: "Fitness", name: "dumbbell" },
    { value: Car, label: "Parking", name: "car" },
    { value: Waves, label: "Pool", name: "waves" },
    { value: Package, label: "Laundry", name: "package" },
    { value: Users, label: "Community", name: "users" },
    { value: Dog, label: "Pet Area", name: "dog" },
    { value: Briefcase, label: "Business", name: "briefcase" },
    { value: Bell, label: "Concierge", name: "bell" },
    { value: Building2, label: "Building", name: "building" },
  ]

  const addCustomField = () => {
    const newField: DynamicField = {
      id: `field-${Date.now()}`,
      name: `customField${(customTemplate.fields?.length || 0) + 1}`,
      type: "text",
      required: false,
      label: "New Field",
    }

    setCustomTemplate((prev) => ({
      ...prev,
      fields: [...(prev.fields || []), newField],
    }))
  }

  const updateCustomField = (fieldId: string, updates: Partial<DynamicField>) => {
    setCustomTemplate((prev) => ({
      ...prev,
      fields: prev.fields?.map((field) => (field.id === fieldId ? { ...field, ...updates } : field)) || [],
    }))
  }

  const removeCustomField = (fieldId: string) => {
    setCustomTemplate((prev) => ({
      ...prev,
      fields: prev.fields?.filter((field) => field.id !== fieldId) || [],
    }))
  }

  const saveCustomTemplate = () => {
    if (!customTemplate.name || !customTemplate.description) return

    const newTemplate: AmenityTemplate = {
      id: `custom-${Date.now()}`,
      name: customTemplate.name,
      icon: iconOptions[0].value, // Default icon
      description: customTemplate.description,
      category: "custom",
      fields: customTemplate.fields || [],
      isCustom: true,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    }

    setTemplates((prev) => [...prev, newTemplate])
    setCustomTemplate({ name: "", description: "", category: "custom", fields: [] })
    setIsCreatingCustom(false)
  }

  const duplicateTemplate = (template: AmenityTemplate) => {
    const duplicated: AmenityTemplate = {
      ...template,
      id: `${template.id}-copy-${Date.now()}`,
      name: `${template.name} (Copy)`,
      isCustom: true,
      createdAt: new Date().toISOString(),
      usageCount: 0,
    }

    setTemplates((prev) => [...prev, duplicated])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Dynamic Amenity Templates
          </DialogTitle>
          <DialogDescription>
            Create, customize, and manage intelligent amenity templates with advanced field types
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="browse">Browse Templates</TabsTrigger>
            <TabsTrigger value="create">Create Custom</TabsTrigger>
            <TabsTrigger value="preview">Preview & Test</TabsTrigger>
            <TabsTrigger value="analytics">Usage Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  {category.name}
                  <Badge variant="secondary" className="ml-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{template.name}</CardTitle>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {template.category}
                              </Badge>
                              {template.isCustom && (
                                <Badge variant="secondary" className="text-xs">
                                  Custom
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              duplicateTemplate(template)
                            }}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          {template.isCustom && (
                            <Button variant="ghost" size="sm">
                              <Edit className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{template.description}</p>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Fields:</span>
                          <Badge variant="outline">{template.fields.length}</Badge>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Usage:</span>
                          <span className="font-medium">{template.usageCount || 0} times</span>
                        </div>

                        {template.createdAt && (
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Created:</span>
                            <span>{new Date(template.createdAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button size="sm" className="flex-1" onClick={() => setSelectedTemplate(template)}>
                          <Eye className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Plus className="w-3 h-3 mr-1" />
                          Use
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            {!isCreatingCustom ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Plus className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Create Custom Template</h3>
                  <p className="text-muted-foreground mb-6">
                    Build your own amenity template with custom fields and validation
                  </p>
                  <Button onClick={() => setIsCreatingCustom(true)} size="lg">
                    <Plus className="w-4 h-4 mr-2" />
                    Start Creating
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Template Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle>Template Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input
                          placeholder="e.g., Smart Laundry System"
                          value={customTemplate.name || ""}
                          onChange={(e) => setCustomTemplate((prev) => ({ ...prev, name: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select
                          value={customTemplate.category}
                          onValueChange={(value) => setCustomTemplate((prev) => ({ ...prev, category: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="connectivity">Connectivity</SelectItem>
                            <SelectItem value="recreation">Recreation</SelectItem>
                            <SelectItem value="transportation">Transportation</SelectItem>
                            <SelectItem value="utilities">Utilities</SelectItem>
                            <SelectItem value="services">Services</SelectItem>
                            <SelectItem value="custom">Custom</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe what this amenity template is for..."
                        value={customTemplate.description || ""}
                        onChange={(e) => setCustomTemplate((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Custom Fields */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Custom Fields</CardTitle>
                      <Button onClick={addCustomField} size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Field
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {customTemplate.fields?.map((field, index) => (
                      <Card key={field.id} className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-medium">Field {index + 1}</h4>
                          <Button variant="ghost" size="sm" onClick={() => removeCustomField(field.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label>Field Label</Label>
                            <Input
                              placeholder="Field name"
                              value={field.label || ""}
                              onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Field Type</Label>
                            <Select
                              value={field.type}
                              onValueChange={(value: any) => updateCustomField(field.id, { type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {fieldTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value}>
                                    {type.icon} {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label>Placeholder</Label>
                            <Input
                              placeholder="Placeholder text"
                              value={field.placeholder || ""}
                              onChange={(e) => updateCustomField(field.id, { placeholder: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.required}
                              onCheckedChange={(checked) => updateCustomField(field.id, { required: !!checked })}
                            />
                            <Label className="text-sm">Required field</Label>
                          </div>

                          {field.type === "select" && (
                            <div className="flex-1">
                              <Label className="text-sm">Options (comma-separated)</Label>
                              <Input
                                placeholder="Option 1, Option 2, Option 3"
                                value={field.options?.join(", ") || ""}
                                onChange={(e) =>
                                  updateCustomField(field.id, {
                                    options: e.target.value
                                      .split(",")
                                      .map((s) => s.trim())
                                      .filter(Boolean),
                                  })
                                }
                              />
                            </div>
                          )}
                        </div>
                      </Card>
                    )) || (
                      <div className="text-center py-8 text-muted-foreground">
                        <Plus className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>No fields added yet. Click "Add Field" to get started.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsCreatingCustom(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveCustomTemplate}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Save Template
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {selectedTemplate ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <selectedTemplate.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>{selectedTemplate.name} Preview</CardTitle>
                      <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label className="flex items-center gap-2">
                          {field.label ||
                            field.name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          {field.required && <span className="text-red-500">*</span>}
                          {field.showsCustomText && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Info className="w-3 h-3" />
                              <span>Shows: "{field.showsCustomText}"</span>
                            </div>
                          )}
                        </Label>

                        {/* Render preview of field based on type */}
                        {field.type === "text" && <Input placeholder={field.placeholder} disabled />}
                        {field.type === "number" && <Input type="number" placeholder={field.placeholder} disabled />}
                        {field.type === "multiline" && <Textarea placeholder={field.placeholder} disabled rows={3} />}
                        {field.type === "boolean" && <Switch disabled />}
                        {field.type === "select" && (
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder="Select option..." />
                            </SelectTrigger>
                          </Select>
                        )}
                        {field.type === "currency" && (
                          <div className="flex">
                            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                              <DollarSign className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <Input placeholder="0.00" className="rounded-l-none" disabled />
                          </div>
                        )}
                        {field.type === "phone" && (
                          <div className="flex">
                            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                              <Phone className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <Input placeholder="(555) 123-4567" className="rounded-l-none" disabled />
                          </div>
                        )}
                        {field.type === "timeRange" && (
                          <div className="flex gap-2 items-center">
                            <Input type="time" disabled />
                            <span className="text-muted-foreground">to</span>
                            <Input type="time" disabled />
                          </div>
                        )}
                        {field.type === "secure" && (
                          <div className="flex gap-2">
                            <Input type="password" placeholder="Secure information" disabled />
                            <Button variant="outline" size="sm" disabled>
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        {field.type === "checkbox" && (
                          <div className="flex items-center space-x-2">
                            <Checkbox disabled />
                            <Label className="text-sm">{field.label}</Label>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Template to Preview</h3>
                  <p className="text-muted-foreground">Choose a template from the Browse tab to see how it will look</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Templates</p>
                      <p className="text-2xl font-bold">{templates.length}</p>
                    </div>
                    <Settings className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Custom Templates</p>
                      <p className="text-2xl font-bold">{templates.filter((t) => t.isCustom).length}</p>
                    </div>
                    <Plus className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Usage</p>
                      <p className="text-2xl font-bold">{templates.reduce((sum, t) => sum + (t.usageCount || 0), 0)}</p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Most Popular Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {templates
                    .sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0))
                    .slice(0, 5)
                    .map((template, index) => {
                      const IconComponent = template.icon
                      return (
                        <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">{template.name}</h4>
                              <p className="text-sm text-muted-foreground">{template.category}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{template.usageCount || 0} uses</p>
                            <p className="text-sm text-muted-foreground">#{index + 1}</p>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
