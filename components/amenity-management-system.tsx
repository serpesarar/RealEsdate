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
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { DynamicAmenityTemplates } from "@/components/dynamic-amenity-templates"
import {
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Building2,
  Package,
  Dog,
  Briefcase,
  Bell,
  Plus,
  Edit,
  Trash2,
  Settings,
  Eye,
  Phone,
  DollarSign,
  Shield,
  Info,
  Zap,
} from "lucide-react"

interface AmenityManagementSystemProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface AmenityField {
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
  required?: boolean
  placeholder?: string
  options?: string[]
  label?: string
  showsCustomText?: string
}

interface AmenityTemplate {
  id: string
  name: string
  icon: any
  description: string
  fields: AmenityField[]
  category: string
}

const amenityTemplates: AmenityTemplate[] = [
  {
    id: "wifi",
    name: "WiFi",
    icon: Wifi,
    description: "Internet connectivity information",
    category: "connectivity",
    fields: [
      { name: "networkName", type: "text", required: true, placeholder: "PropertyWiFi_Guest" },
      { name: "password", type: "secure", required: false },
      {
        name: "passwordLocation",
        type: "checkbox",
        label: "Password is on router/modem box",
        showsCustomText: "Check the back of the WiFi router in the utility closet",
      },
      { name: "speed", type: "text", placeholder: "100 Mbps" },
      { name: "provider", type: "text", placeholder: "Verizon FiOS" },
      { name: "supportNumber", type: "phone" },
    ],
  },
  {
    id: "gym",
    name: "Fitness Center",
    icon: Dumbbell,
    description: "Gym and fitness facilities",
    category: "recreation",
    fields: [
      { name: "hours", type: "timeRange", required: true },
      { name: "location", type: "text", required: true, placeholder: "Building B, Ground Floor" },
      { name: "accessCode", type: "secure" },
      { name: "equipmentList", type: "multiline", placeholder: "Treadmills, weights, yoga mats..." },
      { name: "reservationRequired", type: "boolean" },
      { name: "maxCapacity", type: "number", placeholder: "15" },
    ],
  },
  {
    id: "parking",
    name: "Parking",
    icon: Car,
    description: "Parking facilities and information",
    category: "transportation",
    fields: [
      { name: "spotNumber", type: "text", required: true, placeholder: "A-15" },
      { name: "location", type: "text", required: true, placeholder: "Underground Garage Level 1" },
      { name: "monthlyFee", type: "currency" },
      { name: "guestParkingAvailable", type: "boolean" },
      { name: "evCharging", type: "boolean" },
    ],
  },
  {
    id: "pool",
    name: "Swimming Pool",
    icon: Waves,
    description: "Pool and aquatic facilities",
    category: "recreation",
    fields: [
      { name: "season", type: "dateRange" },
      { name: "hours", type: "timeRange", required: true },
      { name: "guestPolicy", type: "multiline", placeholder: "Maximum 2 guests per resident..." },
      { name: "keyCodeRequired", type: "secure" },
    ],
  },
  {
    id: "laundry",
    name: "Laundry",
    icon: Package,
    description: "Laundry facilities",
    category: "utilities",
    fields: [
      { name: "location", type: "text", required: true, placeholder: "Basement Level" },
      { name: "hours", type: "timeRange" },
      { name: "paymentMethod", type: "text", options: ["Coins", "Card", "App"] },
      { name: "costPerLoad", type: "currency" },
      { name: "numberOfMachines", type: "number" },
    ],
  },
  {
    id: "rooftop",
    name: "Rooftop Deck",
    icon: Building2,
    description: "Rooftop amenities and access",
    category: "recreation",
    fields: [
      { name: "accessHours", type: "timeRange" },
      { name: "reservationRequired", type: "boolean" },
      { name: "bbqAvailable", type: "boolean" },
      { name: "maximumOccupancy", type: "number" },
    ],
  },
  {
    id: "petArea",
    name: "Pet Area",
    icon: Dog,
    description: "Pet facilities and policies",
    category: "pets",
    fields: [
      { name: "location", type: "text", required: true },
      { name: "hours", type: "timeRange" },
      { name: "rules", type: "multiline", placeholder: "Dogs must be leashed..." },
      { name: "wasteBagsProvided", type: "boolean" },
    ],
  },
  {
    id: "businessCenter",
    name: "Business Center",
    icon: Briefcase,
    description: "Work and business facilities",
    category: "business",
    fields: [
      { name: "hours", type: "timeRange" },
      { name: "wifiPassword", type: "secure" },
      { name: "printerAvailable", type: "boolean" },
      { name: "conferenceRoom", type: "boolean" },
      { name: "reservationLink", type: "url" },
    ],
  },
  {
    id: "concierge",
    name: "Concierge",
    icon: Bell,
    description: "Concierge services",
    category: "services",
    fields: [
      { name: "hours", type: "timeRange" },
      { name: "phone", type: "phone" },
      { name: "servicesOffered", type: "multiline", placeholder: "Package receiving, dry cleaning..." },
      { name: "packageReceiving", type: "boolean" },
    ],
  },
]

export function AmenityManagementSystem({ open, onOpenChange }: AmenityManagementSystemProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<AmenityTemplate | null>(null)
  const [customAmenities, setCustomAmenities] = useState<any[]>([])
  const [editingAmenity, setEditingAmenity] = useState<any>(null)
  const [dynamicTemplatesOpen, setDynamicTemplatesOpen] = useState(false)

  const categories = [
    { id: "all", name: "All Categories", count: amenityTemplates.length },
    {
      id: "connectivity",
      name: "Connectivity",
      count: amenityTemplates.filter((t) => t.category === "connectivity").length,
    },
    { id: "recreation", name: "Recreation", count: amenityTemplates.filter((t) => t.category === "recreation").length },
    {
      id: "transportation",
      name: "Transportation",
      count: amenityTemplates.filter((t) => t.category === "transportation").length,
    },
    { id: "utilities", name: "Utilities", count: amenityTemplates.filter((t) => t.category === "utilities").length },
    { id: "business", name: "Business", count: amenityTemplates.filter((t) => t.category === "business").length },
    { id: "services", name: "Services", count: amenityTemplates.filter((t) => t.category === "services").length },
    { id: "pets", name: "Pets", count: amenityTemplates.filter((t) => t.category === "pets").length },
  ]

  const properties = [
    { id: "sunset-apartments", name: "Sunset Apartments" },
    { id: "downtown-lofts", name: "Downtown Lofts" },
    { id: "garden-view-complex", name: "Garden View Complex" },
    { id: "riverside-condos", name: "Riverside Condos" },
  ]

  const tenantTiers = [
    { id: "standard", name: "Standard", description: "Basic amenity access" },
    { id: "premium", name: "Premium", description: "Enhanced amenity access" },
    { id: "vip", name: "VIP", description: "Exclusive amenity access" },
  ]

  const renderFieldInput = (field: AmenityField, value: any, onChange: (value: any) => void) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )
      case "number":
        return (
          <Input
            type="number"
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )
      case "multiline":
        return (
          <Textarea
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
            rows={3}
          />
        )
      case "boolean":
        return <Switch checked={value || false} onCheckedChange={onChange} />
      case "secure":
        return (
          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Enter secure information"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              required={field.required}
            />
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        )
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox checked={value || false} onCheckedChange={onChange} />
            <Label className="text-sm">{field.label}</Label>
          </div>
        )
      case "currency":
        return (
          <div className="flex">
            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input
              type="number"
              placeholder="0.00"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="rounded-l-none"
              required={field.required}
            />
          </div>
        )
      case "phone":
        return (
          <div className="flex">
            <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
              <Phone className="w-4 h-4 text-muted-foreground" />
            </div>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={value || ""}
              onChange={(e) => onChange(e.target.value)}
              className="rounded-l-none"
              required={field.required}
            />
          </div>
        )
      case "timeRange":
        return (
          <div className="flex gap-2 items-center">
            <Input
              type="time"
              value={value?.start || ""}
              onChange={(e) => onChange({ ...value, start: e.target.value })}
              required={field.required}
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="time"
              value={value?.end || ""}
              onChange={(e) => onChange({ ...value, end: e.target.value })}
              required={field.required}
            />
          </div>
        )
      default:
        return (
          <Input
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            required={field.required}
          />
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Amenity Management System
          </DialogTitle>
          <DialogDescription>Configure and manage building amenities for your properties</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="templates">Amenity Templates</TabsTrigger>
            <TabsTrigger value="dynamic">Dynamic Templates</TabsTrigger>
            <TabsTrigger value="create">Create Amenity</TabsTrigger>
            <TabsTrigger value="manage">Manage Amenities</TabsTrigger>
            <TabsTrigger value="assignments">Property Assignments</TabsTrigger>
          </TabsList>

          <TabsContent value="dynamic" className="space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Advanced Template Builder</h3>
                <p className="text-muted-foreground mb-6">
                  Create sophisticated amenity templates with custom field types, validation, and intelligent features
                </p>
                <Button onClick={() => setDynamicTemplatesOpen(true)} size="lg">
                  <Zap className="w-4 h-4 mr-2" />
                  Open Template Builder
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <div className="flex gap-4 flex-wrap">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {amenityTemplates.map((template) => {
                const IconComponent = template.icon
                return (
                  <Card
                    key={template.id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">
                            {template.category}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{template.fields.length} fields</span>
                        <Button size="sm" variant="outline">
                          <Plus className="w-3 h-3 mr-1" />
                          Use Template
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            {selectedTemplate ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <selectedTemplate.icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle>Configure {selectedTemplate.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                      Back to Templates
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedTemplate.fields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <Label className="flex items-center gap-2">
                          {field.name.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          {field.required && <span className="text-red-500">*</span>}
                          {field.showsCustomText && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Info className="w-3 h-3" />
                              <span>Shows: "{field.showsCustomText}"</span>
                            </div>
                          )}
                        </Label>
                        {renderFieldInput(field, null, () => {})}
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Assignment Settings</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Assign to Properties</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select properties" />
                          </SelectTrigger>
                          <SelectContent>
                            {properties.map((property) => (
                              <SelectItem key={property.id} value={property.id}>
                                {property.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Unit Numbers (Optional)</Label>
                        <Input placeholder="e.g., 1A, 2B, 3C" />
                      </div>

                      <div className="space-y-2">
                        <Label>Tenant Tier Access</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select tier" />
                          </SelectTrigger>
                          <SelectContent>
                            {tenantTiers.map((tier) => (
                              <SelectItem key={tier.id} value={tier.id}>
                                {tier.name} - {tier.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                      Cancel
                    </Button>
                    <Button>Create Amenity</Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Plus className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select a Template</h3>
                  <p className="text-muted-foreground mb-4">
                    Choose an amenity template from the Templates tab to get started
                  </p>
                  <Button variant="outline" onClick={() => setSelectedTemplate(amenityTemplates[0])}>
                    Browse Templates
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Active Amenities</h3>
                <p className="text-sm text-muted-foreground">Manage your configured amenities</p>
              </div>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Amenity
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample configured amenities */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Wifi className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Building WiFi</h4>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Network:</span>
                      <span>PropertyWiFi_Guest</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Properties:</span>
                      <span>All Buildings</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Access:</span>
                      <span>All Tenants</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Dumbbell className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium">Fitness Center</h4>
                        <Badge variant="outline" className="text-xs">
                          Active
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hours:</span>
                      <span>5:00 AM - 11:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>Building A, Ground Floor</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Access:</span>
                      <span>Premium & VIP</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Assignments</CardTitle>
                  <p className="text-sm text-muted-foreground">Manage which amenities are available at each property</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {properties.map((property) => (
                    <div key={property.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{property.name}</h4>
                          <p className="text-sm text-muted-foreground">5 amenities assigned</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tenant Tier Access</CardTitle>
                  <p className="text-sm text-muted-foreground">Configure amenity access by tenant tier</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {tenantTiers.map((tier) => (
                    <div key={tier.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{tier.name}</h4>
                          <p className="text-sm text-muted-foreground">{tier.description}</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Configure
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
      <DynamicAmenityTemplates open={dynamicTemplatesOpen} onOpenChange={setDynamicTemplatesOpen} />
    </Dialog>
  )
}
