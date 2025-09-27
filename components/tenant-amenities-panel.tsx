"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import {
  Wifi,
  Dumbbell,
  Car,
  Waves,
  Building2,
  Package,
  Briefcase,
  Info,
  Eye,
  EyeOff,
  Copy,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  BookOpen,
  Users,
  Star,
  Search,
  Navigation,
  ShoppingCart,
  Train,
  Loader2,
} from "lucide-react"

declare global {
  interface Window {
    google?: any
  }
}

interface TenantAmenitiesPanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface AmenityData {
  id: string
  name: string
  icon: any
  status: "available" | "occupied" | "maintenance" | "seasonal"
  type: string
  category: string
  tier: "standard" | "premium" | "vip"
  details: Record<string, any>
  bookable: boolean
  hasRules: boolean
  reportIssue: boolean
  lastUpdated: string
  usageStats?: {
    popularity: number
    avgWaitTime: string
    nextAvailable: string
  }
}

interface PlaceResult {
  place_id: string
  name: string
  vicinity: string
  rating?: number
  price_level?: number
  types: string[]
  geometry: {
    location: {
      lat: () => number
      lng: () => number
    }
  }
  photos?: Array<{
    photo_reference: string
  }>
  opening_hours?: {
    open_now: boolean
  }
}

interface NearbyPlace {
  id: string
  name: string
  address: string
  rating?: number
  priceLevel?: number
  category: "gym" | "grocery" | "transit"
  type: string
  distance?: string
  isOpen?: boolean
  photoUrl?: string
  location: {
    lat: number
    lng: number
  }
}

const tenantAmenities: AmenityData[] = [
  {
    id: "wifi-main",
    name: "Building WiFi",
    icon: Wifi,
    status: "available",
    type: "wifi",
    category: "connectivity",
    tier: "standard",
    bookable: false,
    hasRules: false,
    reportIssue: true,
    lastUpdated: "2024-01-15",
    details: {
      networkName: "PropertyWiFi_Guest",
      passwordLocation: true,
      customLocationText: "Check the back of the WiFi router in the utility closet",
      speed: "100 Mbps",
      provider: "Verizon FiOS",
      troubleshootingSteps:
        "1. Restart your device\n2. Forget and reconnect to network\n3. Contact support if issues persist",
    },
    usageStats: {
      popularity: 95,
      avgWaitTime: "N/A",
      nextAvailable: "Always Available",
    },
  },
  {
    id: "fitness-center",
    name: "Fitness Center",
    icon: Dumbbell,
    status: "available",
    type: "gym",
    category: "recreation",
    tier: "premium",
    bookable: true,
    hasRules: true,
    reportIssue: true,
    lastUpdated: "2024-01-10",
    details: {
      hours: { start: "05:00", end: "23:00" },
      location: "Building A, Ground Floor, Room 101",
      accessMethod: "Key Fob",
      equipmentList:
        "Cardio Equipment:\n- 5 Treadmills\n- 3 Ellipticals\n\nStrength Training:\n- Free weights\n- Cable machines",
      maxCapacity: 25,
      personalTraining: true,
      groupClasses: true,
      classSchedule: "Monday: Yoga 7AM, Spin 6PM\nTuesday: Pilates 8AM, HIIT 7PM",
      bookingRequired: false,
    },
    usageStats: {
      popularity: 78,
      avgWaitTime: "5 minutes",
      nextAvailable: "Available Now",
    },
  },
  {
    id: "parking-spot",
    name: "Assigned Parking",
    icon: Car,
    status: "available",
    type: "parking",
    category: "transportation",
    tier: "standard",
    bookable: false,
    hasRules: true,
    reportIssue: true,
    lastUpdated: "2024-01-08",
    details: {
      spotNumber: "A-15",
      location: "Underground Garage Level 1",
      monthlyFee: 150,
      guestParkingAvailable: true,
      evCharging: false,
      securityFeatures: "- 24/7 Security Cameras\n- Keycard Access\n- Emergency Call Boxes",
    },
  },
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    icon: Waves,
    status: "seasonal",
    type: "pool",
    category: "recreation",
    tier: "standard",
    bookable: true,
    hasRules: true,
    reportIssue: true,
    lastUpdated: "2024-01-05",
    details: {
      season: { start: "2024-05-01", end: "2024-09-30" },
      hours: { start: "06:00", end: "22:00" },
      guestPolicy: "Maximum 2 guests per resident. Guests must be accompanied by resident at all times.",
      keyCodeRequired: "1234",
    },
    usageStats: {
      popularity: 65,
      avgWaitTime: "15 minutes",
      nextAvailable: "May 1st (Seasonal)",
    },
  },
  {
    id: "laundry-facility",
    name: "Laundry Room",
    icon: Package,
    status: "available",
    type: "laundry",
    category: "utilities",
    tier: "standard",
    bookable: false,
    hasRules: true,
    reportIssue: true,
    lastUpdated: "2024-01-12",
    details: {
      location: "Basement Level, Room B-05",
      hours: { start: "06:00", end: "23:00" },
      paymentMethod: "Card",
      costPerLoad: 3.5,
      numberOfMachines: 8,
      rules: "- Maximum 2 hours per load\n- Remove clothes promptly\n- Clean lint traps after use",
    },
  },
  {
    id: "business-center",
    name: "Business Center",
    icon: Briefcase,
    status: "available",
    type: "businessCenter",
    category: "business",
    tier: "premium",
    bookable: true,
    hasRules: false,
    reportIssue: true,
    lastUpdated: "2024-01-14",
    details: {
      hours: { start: "08:00", end: "20:00" },
      wifiPassword: "BusinessWiFi2024",
      printerAvailable: true,
      conferenceRoom: true,
      reservationLink: "https://booking.property.com/business-center",
    },
    usageStats: {
      popularity: 45,
      avgWaitTime: "10 minutes",
      nextAvailable: "Available Now",
    },
  },
]

export function TenantAmenitiesPanel({ open, onOpenChange }: TenantAmenitiesPanelProps) {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityData | null>(null)
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})
  const [reportIssueOpen, setReportIssueOpen] = useState(false)
  const [rulesDialogOpen, setRulesDialogOpen] = useState(false)
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false)
  const [advancedBookingOpen, setAdvancedBookingOpen] = useState(false)

  const [searchLocation, setSearchLocation] = useState("")
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([])
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.006 }) // Default to NYC
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false)
  const [googleMapsAvailable, setGoogleMapsAvailable] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const googleMapRef = useRef<any>(null)
  const markersRef = useRef<any[]>([])

  useEffect(() => {
    const checkGoogleMapsLoaded = () => {
      if (window.google && window.google.maps) {
        setIsGoogleMapsLoaded(true)
        setGoogleMapsAvailable(true)
      } else {
        // Check if Google Maps API key is available
        const hasApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
        if (!hasApiKey) {
          setGoogleMapsAvailable(false)
          setIsGoogleMapsLoaded(false)
          return
        }
        setTimeout(checkGoogleMapsLoaded, 100)
      }
    }
    checkGoogleMapsLoaded()
  }, [])

  useEffect(() => {
    if (open && mapRef.current && isGoogleMapsLoaded && !googleMapRef.current && googleMapsAvailable) {
      initializeMap()
    }
  }, [open, isGoogleMapsLoaded, googleMapsAvailable])

  const initializeMap = () => {
    if (!window.google || !mapRef.current || !googleMapsAvailable) return

    try {
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: mapCenter,
        zoom: 14,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      })
    } catch (error) {
      console.error("[v0] Failed to initialize Google Maps:", error)
      setGoogleMapsAvailable(false)
    }
  }

  const clearMarkers = () => {
    if (!googleMapsAvailable) return
    markersRef.current.forEach((marker) => marker.setMap(null))
    markersRef.current = []
  }

  const addMarkersToMap = (places: NearbyPlace[]) => {
    if (!googleMapRef.current || !googleMapsAvailable) return

    clearMarkers()

    const bounds = new window.google.maps.LatLngBounds()

    places.forEach((place) => {
      const markerColor = getMarkerColor(place.category)

      const marker = new window.google.maps.Marker({
        position: place.location,
        map: googleMapRef.current,
        title: place.name,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: markerColor,
          fillOpacity: 1,
          strokeColor: "#ffffff",
          strokeWeight: 2,
        },
      })

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div class="p-2">
            <h3 class="font-semibold">${place.name}</h3>
            <p class="text-sm text-gray-600">${place.address}</p>
            ${place.rating ? `<p class="text-sm">⭐ ${place.rating}/5</p>` : ""}
            ${place.isOpen !== undefined ? `<p class="text-sm">${place.isOpen ? "🟢 Open" : "🔴 Closed"}</p>` : ""}
          </div>
        `,
      })

      marker.addListener("click", () => {
        infoWindow.open(googleMapRef.current, marker)
      })

      markersRef.current.push(marker)
      bounds.extend(place.location)
    })

    if (places.length > 0) {
      googleMapRef.current.fitBounds(bounds)
    }
  }

  const getMarkerColor = (category: string) => {
    switch (category) {
      case "gym":
        return "#ef4444" // Red for gyms
      case "grocery":
        return "#22c55e" // Green for grocery stores
      case "transit":
        return "#3b82f6" // Blue for transit
      default:
        return "#6b7280" // Gray for others
    }
  }

  const searchNearbyPlaces = async () => {
    if (!searchLocation.trim()) {
      toast({
        title: "Location Required",
        description: "Please enter a location to search for nearby amenities.",
        variant: "destructive",
      })
      return
    }

    if (!googleMapsAvailable) {
      toast({
        title: "Maps Not Available",
        description: "Google Maps is not available. Please contact support for assistance.",
        variant: "destructive",
      })
      return
    }

    if (!window.google || !window.google.maps) {
      toast({
        title: "Maps Not Loaded",
        description: "Google Maps is still loading. Please try again in a moment.",
        variant: "destructive",
      })
      return
    }

    setIsLoadingPlaces(true)

    try {
      // Geocode the location first
      const geocoder = new window.google.maps.Geocoder()
      const geocodeResult = await new Promise<any[]>((resolve, reject) => {
        geocoder.geocode({ address: searchLocation }, (results: any, status: any) => {
          if (status === "OK" && results) {
            resolve(results)
          } else {
            reject(new Error("Geocoding failed"))
          }
        })
      })

      const location = geocodeResult[0].geometry.location
      const center = { lat: location.lat(), lng: location.lng() }
      setMapCenter(center)

      if (googleMapRef.current) {
        googleMapRef.current.setCenter(center)
      }

      // Search for different types of places
      const service = new window.google.maps.places.PlacesService(googleMapRef.current!)
      const searchRadius = 1500 // 1.5km radius

      const searchPromises = [
        // Gyms and fitness centers
        new Promise<PlaceResult[]>((resolve) => {
          service.nearbySearch(
            {
              location: center,
              radius: searchRadius,
              type: "gym",
            },
            (results: any, status: any) => {
              resolve(
                status === window.google.maps.places.PlacesServiceStatus.OK ? (results as PlaceResult[]) || [] : [],
              )
            },
          )
        }),

        // Grocery stores and supermarkets
        new Promise<PlaceResult[]>((resolve) => {
          service.nearbySearch(
            {
              location: center,
              radius: searchRadius,
              type: "grocery_or_supermarket",
            },
            (results: any, status: any) => {
              resolve(
                status === window.google.maps.places.PlacesServiceStatus.OK ? (results as PlaceResult[]) || [] : [],
              )
            },
          )
        }),

        // Transit stations
        new Promise<PlaceResult[]>((resolve) => {
          service.nearbySearch(
            {
              location: center,
              radius: searchRadius,
              type: "transit_station",
            },
            (results: any, status: any) => {
              resolve(
                status === window.google.maps.places.PlacesServiceStatus.OK ? (results as PlaceResult[]) || [] : [],
              )
            },
          )
        }),

        // Bus stations
        new Promise<PlaceResult[]>((resolve) => {
          service.nearbySearch(
            {
              location: center,
              radius: searchRadius,
              type: "bus_station",
            },
            (results: any, status: any) => {
              resolve(
                status === window.google.maps.places.PlacesServiceStatus.OK ? (results as PlaceResult[]) || [] : [],
              )
            },
          )
        }),
      ]

      const [gyms, groceries, transitStations, busStations] = await Promise.all(searchPromises)

      // Process and combine results
      const processedPlaces: NearbyPlace[] = [
        ...gyms.slice(0, 5).map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          priceLevel: place.price_level,
          category: "gym" as const,
          type: "Gym",
          isOpen: place.opening_hours?.open_now,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        })),
        ...groceries.slice(0, 5).map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          priceLevel: place.price_level,
          category: "grocery" as const,
          type: "Grocery Store",
          isOpen: place.opening_hours?.open_now,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        })),
        ...transitStations.slice(0, 3).map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          category: "transit" as const,
          type: "Metro Station",
          isOpen: place.opening_hours?.open_now,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        })),
        ...busStations.slice(0, 3).map((place) => ({
          id: place.place_id,
          name: place.name,
          address: place.vicinity,
          rating: place.rating,
          category: "transit" as const,
          type: "Bus Stop",
          isOpen: place.opening_hours?.open_now,
          location: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        })),
      ]

      setNearbyPlaces(processedPlaces)
      addMarkersToMap(processedPlaces)

      toast({
        title: "Places Found",
        description: `Found ${processedPlaces.length} nearby amenities.`,
      })
    } catch (error) {
      console.error("Error searching places:", error)
      toast({
        title: "Search Failed",
        description: "Unable to search for nearby places. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoadingPlaces(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "gym":
        return Dumbbell
      case "grocery":
        return ShoppingCart
      case "transit":
        return Train
      default:
        return MapPin
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "gym":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "grocery":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "transit":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "occupied":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "maintenance":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "seasonal":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "standard":
        return "bg-gray-100 text-gray-800"
      case "premium":
        return "bg-purple-100 text-purple-800"
      case "vip":
        return "bg-gold-100 text-gold-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    // Could add toast notification here
  }

  const togglePasswordVisibility = (fieldId: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldId]: !prev[fieldId],
    }))
  }

  const renderAmenityDetails = (amenity: AmenityData) => {
    const { details, type } = amenity

    switch (type) {
      case "wifi":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Network Name</Label>
                <div className="flex items-center gap-2">
                  <Input value={details.networkName} readOnly />
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(details.networkName)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {details.passwordLocation ? (
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-500" />
                    Password Location
                  </Label>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">{details.customLocationText}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Password</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type={showPassword["wifi-password"] ? "text" : "password"}
                      value={details.password || ""}
                      readOnly
                    />
                    <Button variant="outline" size="sm" onClick={() => togglePasswordVisibility("wifi-password")}>
                      {showPassword["wifi-password"] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyToClipboard(details.password || "")}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Speed</Label>
                <Input value={details.speed} readOnly />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Provider</Label>
                <Input value={details.provider} readOnly />
              </div>
            </div>

            {details.supportNumber && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Technical Support</Label>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{details.supportNumber}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`tel:${details.supportNumber}`}>
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                  </Button>
                </div>
              </div>
            )}

            {details.troubleshootingSteps && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Troubleshooting Steps</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">{details.troubleshootingSteps}</pre>
                </div>
              </div>
            )}
          </div>
        )

      case "gym":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Operating Hours
                </Label>
                <Input value={`${details.hours.start} - ${details.hours.end}`} readOnly />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input value={details.location} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Access Method</Label>
                <Input value={details.accessMethod} readOnly />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Maximum Capacity</Label>
                <Input value={`${details.maxCapacity} people`} readOnly />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Equipment Available</Label>
              <div className="p-3 bg-muted rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{details.equipmentList}</pre>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${details.personalTraining ? "text-green-500" : "text-gray-400"}`} />
                <span className="text-sm">Personal Training Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${details.groupClasses ? "text-green-500" : "text-gray-400"}`} />
                <span className="text-sm">Group Classes Available</span>
              </div>
            </div>

            {details.groupClasses && details.classSchedule && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Class Schedule</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">{details.classSchedule}</pre>
                </div>
              </div>
            )}
          </div>
        )

      case "parking":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Your Spot Number</Label>
                <Input value={details.spotNumber} readOnly />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input value={details.location} readOnly />
              </div>
            </div>

            {details.monthlyFee && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Monthly Fee</Label>
                <Input value={`$${details.monthlyFee}`} readOnly />
              </div>
            )}

            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle
                  className={`w-4 h-4 ${details.guestParkingAvailable ? "text-green-500" : "text-gray-400"}`}
                />
                <span className="text-sm">Guest Parking Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-4 h-4 ${details.evCharging ? "text-green-500" : "text-gray-400"}`} />
                <span className="text-sm">EV Charging</span>
              </div>
            </div>

            {details.securityFeatures && (
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Security Features
                </Label>
                <div className="p-3 bg-muted rounded-lg">
                  <pre className="text-sm whitespace-pre-wrap">{details.securityFeatures}</pre>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Detailed information for this amenity type is being configured.
            </p>
          </div>
        )
    }
  }

  const categories = [
    { id: "all", name: "All Amenities", count: tenantAmenities.length },
    {
      id: "connectivity",
      name: "Connectivity",
      count: tenantAmenities.filter((a) => a.category === "connectivity").length,
    },
    { id: "recreation", name: "Recreation", count: tenantAmenities.filter((a) => a.category === "recreation").length },
    {
      id: "transportation",
      name: "Transportation",
      count: tenantAmenities.filter((a) => a.category === "transportation").length,
    },
    { id: "utilities", name: "Utilities", count: tenantAmenities.filter((a) => a.category === "utilities").length },
    { id: "business", name: "Business", count: tenantAmenities.filter((a) => a.category === "business").length },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
            <Building2 className="w-5 h-5 md:w-6 md:h-6" />
            Building Amenities
          </DialogTitle>
          <DialogDescription className="text-sm md:text-base">
            Access and manage your building amenities and services
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="amenities" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 text-xs md:text-sm">
            <TabsTrigger value="amenities" className="px-2 md:px-4">
              My Amenities
            </TabsTrigger>
            <TabsTrigger value="nearby-places" className="px-2 md:px-4">
              Nearby Places
            </TabsTrigger>
            <TabsTrigger value="quick-access" className="px-2 md:px-4">
              Quick Access
            </TabsTrigger>
            <TabsTrigger value="usage-stats" className="px-2 md:px-4">
              Usage & Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="amenities" className="space-y-4 md:space-y-6">
            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 md:gap-2 bg-transparent text-xs md:text-sm px-2 md:px-3 h-8 md:h-9"
                >
                  <span className="truncate">{category.name}</span>
                  <Badge variant="secondary" className="ml-1 text-xs px-1">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Amenities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {tenantAmenities.map((amenity) => {
                const IconComponent = amenity.icon
                return (
                  <Card
                    key={amenity.id}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200"
                    onClick={() => setSelectedAmenity(amenity)}
                  >
                    <CardHeader className="pb-2 md:pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-sm md:text-lg truncate">{amenity.name}</CardTitle>
                            <div className="flex items-center gap-1 md:gap-2 mt-1 flex-wrap">
                              <Badge className={`${getStatusColor(amenity.status)} text-xs`}>{amenity.status}</Badge>
                              <Badge className={`${getTierColor(amenity.tier)} text-xs`} variant="outline">
                                {amenity.tier}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        {amenity.usageStats && (
                          <div className="text-right flex-shrink-0">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500" />
                              <span className="text-xs font-medium">{amenity.usageStats.popularity}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {amenity.usageStats && (
                        <div className="space-y-1 md:space-y-2 mb-3 md:mb-4 text-xs md:text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground truncate">Avg. Wait:</span>
                            <span className="flex-shrink-0">{amenity.usageStats.avgWaitTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground truncate">Next Available:</span>
                            <span className="text-green-600 flex-shrink-0 truncate">
                              {amenity.usageStats.nextAvailable}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-1 md:gap-2 flex-wrap">
                        {amenity.bookable && (
                          <Button
                            size="sm"
                            className="flex-1 min-w-0 text-xs md:text-sm h-8 md:h-9"
                            onClick={(e) => {
                              e.stopPropagation()
                              setAdvancedBookingOpen(true)
                            }}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            <span className="truncate">Book</span>
                          </Button>
                        )}
                        {amenity.hasRules && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs md:text-sm h-8 md:h-9 px-2 md:px-3 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              setRulesDialogOpen(true)
                            }}
                          >
                            <BookOpen className="w-3 h-3 mr-1" />
                            <span className="hidden md:inline">Rules</span>
                          </Button>
                        )}
                        {amenity.reportIssue && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs md:text-sm h-8 md:h-9 px-2 md:px-3 bg-transparent"
                            onClick={(e) => {
                              e.stopPropagation()
                              setReportIssueOpen(true)
                            }}
                          >
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            <span className="hidden md:inline">Issue</span>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="nearby-places" className="space-y-4 md:space-y-6">
            {/* Search Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  Find Nearby Amenities
                </CardTitle>
                <DialogDescription className="text-sm md:text-base">
                  Search for gyms, grocery stores, and public transportation near any location
                </DialogDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    placeholder="Enter address or location (e.g., 123 Main St, New York, NY)"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchNearbyPlaces()}
                    className="flex-1 text-sm md:text-base"
                  />
                  <Button
                    onClick={searchNearbyPlaces}
                    disabled={isLoadingPlaces || (!isGoogleMapsLoaded && googleMapsAvailable)}
                    className="w-full sm:w-auto"
                  >
                    {isLoadingPlaces ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    <span className="ml-2">Search</span>
                  </Button>
                </div>
                {!googleMapsAvailable && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Google Maps is not available. Contact support for assistance.
                  </p>
                )}
                {googleMapsAvailable && !isGoogleMapsLoaded && (
                  <p className="text-sm text-muted-foreground mt-2">Loading Google Maps...</p>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              {/* Map Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                    Map View
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    ref={mapRef}
                    className="w-full h-64 md:h-96 rounded-lg border bg-gray-100 flex items-center justify-center"
                  >
                    {!googleMapsAvailable ? (
                      <div className="text-center text-muted-foreground p-4">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Google Maps not available</p>
                        <p className="text-xs text-muted-foreground mt-1">Contact support for assistance</p>
                      </div>
                    ) : !isGoogleMapsLoaded ? (
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-8 h-8 mx-auto mb-2" />
                        <p>Loading Google Maps...</p>
                      </div>
                    ) : null}
                  </div>

                  {/* Legend */}
                  {googleMapsAvailable && (
                    <div className="mt-4 flex flex-wrap gap-2 md:gap-4 text-xs md:text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span>Gyms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Grocery Stores</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span>Public Transit</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Places List */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Navigation className="w-4 h-4 md:w-5 md:h-5" />
                    Nearby Places ({nearbyPlaces.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {nearbyPlaces.length === 0 ? (
                    <div className="text-center text-muted-foreground py-8">
                      <Search className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm md:text-base">Search for a location to see nearby amenities</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-64 md:max-h-96 overflow-y-auto">
                      {nearbyPlaces.map((place) => {
                        const IconComponent = getCategoryIcon(place.category)
                        return (
                          <div
                            key={place.id}
                            className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                place.category === "gym"
                                  ? "bg-red-100"
                                  : place.category === "grocery"
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                              }`}
                            >
                              <IconComponent
                                className={`w-4 h-4 ${
                                  place.category === "gym"
                                    ? "text-red-600"
                                    : place.category === "grocery"
                                      ? "text-green-600"
                                      : "text-blue-600"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="min-w-0 flex-1">
                                  <h4 className="font-medium text-sm md:text-base truncate">{place.name}</h4>
                                  <p className="text-xs md:text-sm text-muted-foreground truncate">{place.address}</p>
                                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                                    <Badge className={`${getCategoryColor(place.category)} text-xs`} variant="outline">
                                      {place.type}
                                    </Badge>
                                    {place.rating && (
                                      <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-500" />
                                        <span className="text-xs">{place.rating}</span>
                                      </div>
                                    )}
                                    {place.isOpen !== undefined && (
                                      <Badge variant={place.isOpen ? "default" : "secondary"} className="text-xs">
                                        {place.isOpen ? "Open" : "Closed"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quick-access" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Phone className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Building Security</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:+15551234567">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </a>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Maintenance Emergency</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:+15559876543">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </a>
                    </Button>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Property Management</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href="tel:+15555551234">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    Building Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Resident Handbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Pet Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Noise Guidelines
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Guest Policy
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                    Move In/Out Procedures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Move-In Checklist
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Move-Out Guide
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Elevator Reservation
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent text-sm h-9">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Utility Setup Guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage-stats" className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl md:text-2xl font-bold">12</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Amenities Used This Month</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl md:text-2xl font-bold">4.8</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Average Rating Given</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl md:text-2xl font-bold">2</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Active Bookings</p>
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Most Used Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tenantAmenities
                    .filter((a) => a.usageStats)
                    .sort((a, b) => (b.usageStats?.popularity || 0) - (a.usageStats?.popularity || 0))
                    .slice(0, 5)
                    .map((amenity) => {
                      const IconComponent = amenity.icon
                      return (
                        <div key={amenity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="font-medium">{amenity.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${amenity.usageStats?.popularity}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{amenity.usageStats?.popularity}%</span>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Amenity Details Dialog */}
        {selectedAmenity && (
          <Dialog open={!!selectedAmenity} onOpenChange={() => setSelectedAmenity(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                    {selectedAmenity.icon && <selectedAmenity.icon className="w-6 h-6 text-blue-600" />}
                  </div>
                  {selectedAmenity.name}
                  <Badge className={getStatusColor(selectedAmenity.status)}>{selectedAmenity.status}</Badge>
                </DialogTitle>
                <DialogDescription>
                  Last updated: {new Date(selectedAmenity.lastUpdated).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {renderAmenityDetails(selectedAmenity)}

                <div className="flex gap-2 pt-4 border-t">
                  {selectedAmenity.bookable && (
                    <Button onClick={() => setAdvancedBookingOpen(true)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                  )}
                  {selectedAmenity.hasRules && (
                    <Button variant="outline" onClick={() => setRulesDialogOpen(true)}>
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Rules
                    </Button>
                  )}
                  {selectedAmenity.reportIssue && (
                    <Button variant="outline" onClick={() => setReportIssueOpen(true)}>
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Report Issue
                    </Button>
                  )}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </DialogContent>
    </Dialog>
  )
}
