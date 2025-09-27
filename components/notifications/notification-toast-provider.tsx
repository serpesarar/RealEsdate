"use client"

import { useState, createContext, useContext, type ReactNode } from "react"
import { NotificationToast } from "./notification-toast"

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

interface NotificationToastContextType {
  addToast: (toast: Omit<ToastNotification, "id">) => void
  removeToast: (id: string) => void
  toasts: ToastNotification[]
}

const NotificationToastContext = createContext<NotificationToastContextType | undefined>(undefined)

export function NotificationToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastNotification[]>([])

  const addToast = (toast: Omit<ToastNotification, "id">) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { ...toast, id }])
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <NotificationToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <NotificationToast notifications={toasts} onRemove={removeToast} />
    </NotificationToastContext.Provider>
  )
}

export function useNotificationToast() {
  const context = useContext(NotificationToastContext)
  if (context === undefined) {
    throw new Error("useNotificationToast must be used within a NotificationToastProvider")
  }
  return context
}
