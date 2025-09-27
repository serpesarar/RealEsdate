"use client"

import { useEffect, useState } from "react"
import { Bell, CheckCircle, AlertCircle, Info } from "lucide-react"
import { toast } from "sonner"

interface RealTimeUpdate {
  id: string
  type: "maintenance" | "payment" | "tenant" | "system"
  title: string
  message: string
  timestamp: Date
  priority: "low" | "medium" | "high"
  read: boolean
}

export function RealTimeUpdates() {
  const [updates, setUpdates] = useState<RealTimeUpdate[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Simulate WebSocket connection for real-time updates
    const connectWebSocket = () => {
      setIsConnected(true)

      // Simulate receiving updates
      const interval = setInterval(() => {
        const mockUpdates: RealTimeUpdate[] = [
          {
            id: crypto.randomUUID(),
            type: "payment",
            title: "Payment Received",
            message: "Tenant John Doe paid $1,200 rent for Unit 4B",
            timestamp: new Date(),
            priority: "medium",
            read: false,
          },
          {
            id: crypto.randomUUID(),
            type: "maintenance",
            title: "Maintenance Completed",
            message: "Plumbing repair completed at Sunset Apartments",
            timestamp: new Date(),
            priority: "low",
            read: false,
          },
          {
            id: crypto.randomUUID(),
            type: "tenant",
            title: "New Application",
            message: "New tenant application received for Unit 2A",
            timestamp: new Date(),
            priority: "high",
            read: false,
          },
        ]

        const randomUpdate = mockUpdates[Math.floor(Math.random() * mockUpdates.length)]

        setUpdates((prev) => [randomUpdate, ...prev.slice(0, 9)]) // Keep last 10 updates

        // Show toast notification
        toast(randomUpdate.title, {
          description: randomUpdate.message,
          icon: getUpdateIcon(randomUpdate.type),
        })
      }, 30000) // Every 30 seconds

      return () => clearInterval(interval)
    }

    const cleanup = connectWebSocket()
    return cleanup
  }, [])

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "maintenance":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "tenant":
        return <Info className="h-4 w-4 text-blue-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-3 border">
        <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
        <span className="text-sm text-gray-600">{isConnected ? "Connected" : "Disconnected"}</span>
        <Bell className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  )
}
