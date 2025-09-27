"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, AlertTriangle, DollarSign, UserCheck, Home, X, Settings } from "lucide-react"
import { wsClient } from "@/lib/websocket-client"
import { useToast } from "@/hooks/use-toast"

interface Notification {
  id: string
  type: "issue" | "payment" | "contractor" | "system" | "tenant"
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: "low" | "medium" | "high"
  actionUrl?: string
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "issue",
      title: "New High Priority Issue",
      message: "Kitchen sink leaking reported at Park Avenue Towers, Unit 12A",
      timestamp: "2 minutes ago",
      read: false,
      priority: "high",
      actionUrl: "/issues/1",
    },
    {
      id: "2",
      type: "contractor",
      title: "Job Completed",
      message: "Mike Johnson completed bathroom pipe repair at Sunset Gardens",
      timestamp: "1 hour ago",
      read: false,
      priority: "medium",
      actionUrl: "/contractors/1",
    },
    {
      id: "3",
      type: "payment",
      title: "Rent Payment Received",
      message: "John Smith paid rent for Unit 12A - $3,500",
      timestamp: "3 hours ago",
      read: true,
      priority: "low",
      actionUrl: "/payments",
    },
    {
      id: "4",
      type: "tenant",
      title: "New Tenant Application",
      message: "Sarah Wilson applied for Unit 8B at Metro Plaza",
      timestamp: "5 hours ago",
      read: true,
      priority: "medium",
      actionUrl: "/tenants",
    },
    {
      id: "5",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight at 2:00 AM EST",
      timestamp: "1 day ago",
      read: true,
      priority: "low",
    },
  ])

  const { toast } = useToast()

  useEffect(() => {
    const userId = "current-user-id"
    wsClient.connect(userId)

    const handleNotification = (event: CustomEvent) => {
      const notificationData = event.detail

      const newNotification: Notification = {
        id: notificationData.id || Date.now().toString(),
        type: notificationData.type || "system",
        title: notificationData.title,
        message: notificationData.message,
        timestamp: "Just now",
        read: false,
        priority: notificationData.priority || "medium",
        actionUrl: notificationData.actionUrl,
      }

      setNotifications((prev) => [newNotification, ...prev])

      const toastType =
        notificationData.priority === "high"
          ? "destructive"
          : notificationData.type === "payment"
            ? "default"
            : "default"

      toast({
        title: notificationData.title,
        description: notificationData.message,
        variant: toastType,
        action: notificationData.actionUrl
          ? {
              altText: "View",
              onClick: () => (window.location.href = notificationData.actionUrl),
            }
          : undefined,
      })
    }

    window.addEventListener("notification", handleNotification as EventListener)

    return () => {
      window.removeEventListener("notification", handleNotification as EventListener)
      wsClient.disconnect()
    }
  }, [toast])

  const unreadCount = notifications.filter((n) => !n.read).length

  const handleRealTimeUpdate = useCallback(
    (type: string, data: any) => {
      switch (type) {
        case "issue_created":
          toast({
            title: "New Issue Reported",
            description: `${data.title} - Priority: ${data.priority}`,
            variant: data.priority === "high" ? "destructive" : "default",
          })
          break
        case "payment_received":
          toast({
            title: "Payment Received",
            description: `${data.amount} from ${data.tenant}`,
            variant: "default",
          })
          break
        case "maintenance_completed":
          toast({
            title: "Maintenance Completed",
            description: `${data.contractor} completed ${data.task}`,
            variant: "default",
          })
          break
      }
    },
    [toast],
  )

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "issue":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      case "payment":
        return <DollarSign className="w-4 h-4 text-green-500" />
      case "contractor":
        return <UserCheck className="w-4 h-4 text-blue-500" />
      case "tenant":
        return <Home className="w-4 h-4 text-purple-500" />
      case "system":
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50/50 dark:bg-red-900/10"
      case "medium":
        return "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10"
      case "low":
        return "border-l-green-500 bg-green-50/50 dark:bg-green-900/10"
      default:
        return "border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/10"
    }
  }

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                Mark all read
              </Button>
            )}
            <Badge variant="secondary">{notifications.length}</Badge>
          </div>
        </div>

        <ScrollArea className="h-96">
          <div className="p-2">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.2 }}
                    className={`relative p-3 mb-2 rounded-lg border-l-4 cursor-pointer hover:bg-muted/50 transition-colors ${getPriorityColor(notification.priority)} ${!notification.read ? "bg-primary/5" : ""}`}
                    onClick={() => {
                      markAsRead(notification.id)
                      if (notification.actionUrl) {
                        window.location.href = notification.actionUrl
                      }
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-medium text-foreground truncate">{notification.title}</h4>
                            {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{notification.timestamp}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeNotification(notification.id)
                        }}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <>
            <Separator />
            <div className="p-4">
              <Button variant="outline" className="w-full bg-transparent" size="sm">
                View All Notifications
              </Button>
            </div>
          </>
        )}
      </PopoverContent>
    </Popover>
  )
}
