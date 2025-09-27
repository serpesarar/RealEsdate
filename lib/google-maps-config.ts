export const GOOGLE_MAPS_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  isAvailable: Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY),
  libraries: ["places"] as const,
  defaultCenter: { lat: 40.7128, lng: -74.006 }, // NYC
  defaultZoom: 14,
  searchRadius: 1500, // 1.5km
}

export const FALLBACK_AMENITIES = {
  gym: [
    { name: "Equinox", address: "Various NYC locations", rating: 4.5 },
    { name: "Planet Fitness", address: "Multiple locations", rating: 4.2 },
    { name: "Crunch Fitness", address: "NYC area", rating: 4.0 },
  ],
  grocery: [
    { name: "Whole Foods Market", address: "Various NYC locations", rating: 4.3 },
    { name: "Trader Joe's", address: "Multiple locations", rating: 4.4 },
    { name: "Key Food", address: "NYC area", rating: 3.8 },
  ],
  transit: [
    { name: "Subway Station", address: "Various locations", rating: 3.5 },
    { name: "Bus Stop", address: "Multiple locations", rating: 3.7 },
    { name: "Citi Bike Station", address: "NYC area", rating: 4.1 },
  ],
}

export const PLACE_TYPES = {
  gym: "gym",
  grocery: "grocery_or_supermarket",
  transit: "transit_station",
  bus: "bus_station",
} as const

export const MARKER_COLORS = {
  gym: "#ef4444",
  grocery: "#22c55e",
  transit: "#3b82f6",
  default: "#6b7280",
} as const
