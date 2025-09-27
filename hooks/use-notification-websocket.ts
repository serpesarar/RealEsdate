"use client"

import { useEffect, useCallback } from "react"
import { wsClient } from "@/lib/websocket-client"
import { useNotificationToast } from "@/components/notifications/notification-toast-provider"

interface NotificationPayload {
  id?: string
  type: "issue" | "payment" | "contractor" | "system" | "tenant"
  title: string
  message: string
  priority?: "low" | "medium" | "high"
  actionUrl?: string
}

export function useNotificationWebSocket(userId: string) {
  const { addToast } = useNotificationToast()

  const handleWebSocketNotification = useCallback(
    (event: CustomEvent) => {
      const payload: NotificationPayload = event.detail

      // Determine toast type based on notification type and priority
      let toastType: "success" | "error" | "warning" | "info" = "info"

      switch (payload.type) {
        case "payment":
          toastType = "success"
          break
        case "issue":
          toastType = payload.priority === "high" ? "error" : "warning"
          break
        case "contractor":
          toastType = "success"
          break
        case "system":
          toastType = "info"
          break
        default:
          toastType = "info"
      }

      // Add toast notification
      addToast({
        type: toastType,
        title: payload.title,
        message: payload.message,
        duration: payload.priority === "high" ? 0 : 5000, // High priority stays until dismissed
        action: payload.actionUrl
          ? {
              label: "View Details",
              onClick: () => (window.location.href = payload.actionUrl!),
            }
          : undefined,
      })
    },
    [addToast],
  )

  useEffect(() => {
    // Connect to WebSocket
    wsClient.connect(userId)

    // Listen for notification events
    window.addEventListener("notification", handleWebSocketNotification as EventListener)

    return () => {
      window.removeEventListener("notification", handleWebSocketNotification as EventListener)
      wsClient.disconnect()
    }
  }, [userId, handleWebSocketNotification])

  return {
    sendMessage: wsClient.sendMessage.bind(wsClient),
    disconnect: wsClient.disconnect.bind(wsClient),
  }
}
