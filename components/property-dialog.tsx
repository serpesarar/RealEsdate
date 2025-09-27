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
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, MapPin, X, Building2, DollarSign, Camera, Map } from "lucide-react"

interface PropertyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  property?: any
}

const availableAmenities = [
  "Swimming Pool",
  "Fitness Center",
  "Parking Garage",
  "Laundry Facilities",
  "Rooftop Deck",
  "Security System",
  "Elevator",
  "Balconies",
  "Air Conditioning",
  "Heating",
  "Dishwasher",
  "In-Unit Washer/Dryer",
  "Pet-Friendly",
  "Playground",
  "Business Center",
  "Concierge",
  "Storage Units",
  "Bike Storage",
  "EV Charging",
  "Garden/Courtyard",
]

const propertyManagers = [
  { id: 1, name: "Sarah Johnson", properties: 12, rating: 4.8 },
  { id: 2, name: "Mike Chen", properties: 8, rating: 4.6 },
  { id: 3, name: "Lisa Rodriguez", properties: 15, rating: 4.9 },
  { id: 4, name: "David Kim", properties: 6, rating: 4.7 },
]

export function PropertyDialog({ open, onOpenChange, property }: PropertyDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(property?.amenities || [])
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>(property?.photos || [])
  const [activeTab, setActiveTab] = useState("basic")
  const isEditing = !!property

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onOpenChange(false)
    }, 2000)
  }

  const handleAmenityToggle = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      // Simulate photo upload
      const newPhotos = Array.from(files).map((file, index) => URL.createObjectURL(file))
      setUploadedPhotos((prev) => [...prev, ...newPhotos])
    }
  }

  const removePhoto = (index: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            {isEditing ? "Edit Property" : "Add New Property"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Update property information and settings"
              : "Enter comprehensive details for your new property"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="financial">Financial</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name *</Label>
                  <Input id="name" placeholder="Sunset Apartments" defaultValue={property?.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type *</Label>
                  <Select defaultValue={property?.type}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment Complex</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="house">Single Family Home</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="loft">Loft Building</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address *</Label>
                <div className="flex gap-2">
                  <Input
                    id="address"
                    placeholder="123 Main St, City, State, ZIP"
                    defaultValue={property?.address}
                    className="flex-1"
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <Map className="w-4 h-4" />
                  </Button>
                </div>
                <div className="h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Map integration placeholder</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="units">Total Units *</Label>
                  <Input id="units" type="number" placeholder="24" defaultValue={property?.units} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="floors">Floors</Label>
                  <Input id="floors" type="number" placeholder="3" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year">Year Built</Label>
                  <Input id="year" type="number" placeholder="2020" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="manager">Property Manager</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign a property manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyManagers.map((manager) => (
                      <SelectItem key={manager.id} value={manager.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{manager.name}</span>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{manager.properties} properties</span>
                            <Badge variant="outline" className="text-xs">
                              ★ {manager.rating}
                            </Badge>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Property description, special features, neighborhood highlights..."
                  defaultValue={property?.description}
                  rows={3}
                />
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase-date">Purchase Date</Label>
                  <Input id="purchase-date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="purchase-price">Purchase Price</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input id="purchase-price" type="number" placeholder="1500000" className="pl-10" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="market-value">Current Market Value</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input id="market-value" type="number" placeholder="1750000" className="pl-10" />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Financial Projections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expected-rent">Expected Monthly Rent per Unit</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="expected-rent" type="number" placeholder="2000" className="pl-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="expected-expenses">Expected Monthly Expenses</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input id="expected-expenses" type="number" placeholder="12000" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Property Amenities</Label>
                  <p className="text-sm text-muted-foreground">Select all amenities available at this property</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity}
                        checked={selectedAmenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                      />
                      <Label htmlFor={amenity} className="text-sm font-normal cursor-pointer">
                        {amenity}
                      </Label>
                    </div>
                  ))}
                </div>

                {selectedAmenities.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selected Amenities:</Label>
                    <div className="flex flex-wrap gap-2">
                      {selectedAmenities.map((amenity) => (
                        <Badge
                          key={amenity}
                          variant="secondary"
                          className="cursor-pointer"
                          onClick={() => handleAmenityToggle(amenity)}
                        >
                          {amenity}
                          <X className="w-3 h-3 ml-1" />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="photos" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold">Property Photos</Label>
                  <p className="text-sm text-muted-foreground">Upload multiple photos to showcase your property</p>
                </div>

                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <Camera className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <div className="space-y-2">
                      <Label htmlFor="photo-upload" className="cursor-pointer">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
                          <Upload className="w-4 h-4" />
                          Upload Photos
                        </div>
                      </Label>
                      <Input
                        id="photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop or click to upload. Supports JPG, PNG, WebP
                      </p>
                    </div>
                  </div>
                </div>

                {uploadedPhotos.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Uploaded Photos ({uploadedPhotos.length}):</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {uploadedPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo || "/placeholder.svg"}
                            alt={`Property photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => removePhoto(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              {isLoading ? "Saving..." : isEditing ? "Update Property" : "Add Property"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
