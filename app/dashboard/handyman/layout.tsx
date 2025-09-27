import type React from "react"
import { RealTimeUpdates } from "@/components/real-time-updates"
import DashboardLayoutComponent from "@/components/dashboard-layout-component"
import { HandymanChatPanel } from "@/components/handyman-chat-panel"

export default function HandymanDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50/80 via-amber-50/60 to-yellow-50/80 backdrop-blur-sm">
      <DashboardLayoutComponent userRole="handyman">
        {children}
        <RealTimeUpdates />
        <HandymanChatPanel userRole="handyman" />
      </DashboardLayoutComponent>
    </div>
  )
}
