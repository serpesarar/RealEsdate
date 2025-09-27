"use client"

import { useState, useCallback } from "react"

interface ToastNotification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<ToastNotification[]>([])

  const addNotification = useCallback((notification: Omit<ToastNotification, "id">) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const showSuccess = useCallback(
    (title: string, message: string, action?: ToastNotification["action"]) => {
      addNotification({ type: "success", title, message, action })
    },
    [addNotification],
  )

  const showError = useCallback(
    (title: string, message: string, action?: ToastNotification["action"]) => {
      addNotification({ type: "error", title, message, action })
    },
    [addNotification],
  )

  const showWarning = useCallback(
    (title: string, message: string, action?: ToastNotification["action"]) => {
      addNotification({ type: "warning", title, message, action })
    },
    [addNotification],
  )

  const showInfo = useCallback(
    (title: string, message: string, action?: ToastNotification["action"]) => {
      addNotification({ type: "info", title, message, action })
    },
    [addNotification],
  )

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
}
