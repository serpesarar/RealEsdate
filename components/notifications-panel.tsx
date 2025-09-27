"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Bell, BellRing, Check, Clock, DollarSign, FileText } from "lucide-react"
import { format } from "date-fns"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  read: boolean
  created_at: string
  related_id?: string
}

interface NotificationsPanelProps {
  userId: string
}

export function NotificationsPanel({ userId }: NotificationsPanelProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    fetchNotifications()
    // Set up polling for new notifications
    const interval = setInterval(fetchNotifications, 30000) // Poll every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch("/api/notifications")
      const data = await response.json()

      if (data.success) {
        setNotifications(data.notifications)
        setUnreadCount(data.notifications.filter((n: Notification) => !n.read).length)
      }
    } catch (error) {
      console.error("[v0] Error fetching notifications:", error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (notificationIds: string[]) => {
    try {
      const response = await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notificationIds,
          markAsRead: true,
        }),
      })

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notificationIds.includes(notification.id) ? { ...notification, read: true } : notification,
          ),
        )
        setUnreadCount((prev) => Math.max(0, prev - notificationIds.length))
      }
    } catch (error) {
      console.error("[v0] Error marking notifications as read:", error)
    }
  }

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter((n) => !n.read).map((n) => n.id)
    if (unreadIds.length > 0) {
      await markAsRead(unreadIds)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "work_log_submitted":
      case "work_log_approved":
      case "work_log_rejected":
        return <FileText className="h-4 w-4" />
      case "payout_batch_created":
      case "payout_batch_approved":
      case "payout_paid":
        return <DollarSign className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "work_log_approved":
      case "payout_batch_approved":
      case "payout_paid":
        return "text-green-600"
      case "work_log_rejected":
        return "text-red-600"
      case "work_log_submitted":
      case "payout_batch_created":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          {unreadCount > 0 ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Notifications</DialogTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Mark all read
              </Button>
            )}
          </div>
          <DialogDescription>
            {unreadCount > 0 ? `${unreadCount} unread notifications` : "All caught up!"}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-96">
          <div className="space-y-2">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Clock className="h-4 w-4 animate-spin mr-2" />
                Loading notifications...
              </div>
            ) : displayedNotifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              displayedNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`cursor-pointer transition-colors ${
                    !notification.read ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                  }`}
                  onClick={() => !notification.read && markAsRead([notification.id])}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${getNotificationColor(notification.type)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                          {!notification.read && <div className="h-2 w-2 bg-blue-600 rounded-full flex-shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {format(new Date(notification.created_at), "MMM d, h:mm a")}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {notifications.length > 5 && !showAll && (
          <div className="text-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAll(true)}>
              Show all {notifications.length} notifications
            </Button>
          </div>
        )}

        {showAll && notifications.length > 5 && (
          <div className="text-center pt-2">
            <Button variant="ghost" size="sm" onClick={() => setShowAll(false)}>
              Show less
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
