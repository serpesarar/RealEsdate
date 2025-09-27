export const PWA_CONFIG = {
  name: "PropertyFlow",
  short_name: "PropertyFlow",
  description: "Modern property management platform",
  theme_color: "#667eea",
  background_color: "#ffffff",
  display: "standalone",
  orientation: "portrait",
  scope: "/",
  start_url: "/",
  icons: [
    {
      src: "/icons/icon-72x72.png",
      sizes: "72x72",
      type: "image/png",
    },
    {
      src: "/icons/icon-96x96.png",
      sizes: "96x96",
      type: "image/png",
    },
    {
      src: "/icons/icon-128x128.png",
      sizes: "128x128",
      type: "image/png",
    },
    {
      src: "/icons/icon-144x144.png",
      sizes: "144x144",
      type: "image/png",
    },
    {
      src: "/icons/icon-152x152.png",
      sizes: "152x152",
      type: "image/png",
    },
    {
      src: "/icons/icon-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/icons/icon-384x384.png",
      sizes: "384x384",
      type: "image/png",
    },
    {
      src: "/icons/icon-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
  ],
}

export class OfflineManager {
  private static CACHE_NAME = "propertyflow-v1"
  private static OFFLINE_URL = "/offline"

  static async initialize(): Promise<void> {
    if ("serviceWorker" in navigator) {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.log("[v0] Service Worker registered:", registration)
      } catch (error) {
        console.error("[v0] Service Worker registration failed:", error)
      }
    }
  }

  static async cacheEssentialResources(): Promise<void> {
    const cache = await caches.open(this.CACHE_NAME)
    const essentialResources = [
      "/",
      "/dashboard",
      "/offline",
      "/manifest.json",
      // Add other essential resources
    ]

    await cache.addAll(essentialResources)
  }

  static isOnline(): boolean {
    return navigator.onLine
  }

  static onOffline(callback: () => void): void {
    window.addEventListener("offline", callback)
  }

  static onOnline(callback: () => void): void {
    window.addEventListener("online", callback)
  }
}
