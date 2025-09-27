import type React from "react"
import { RealTimeUpdates } from "@/components/real-time-updates"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {children}
      <RealTimeUpdates />
    </div>
  )
}
