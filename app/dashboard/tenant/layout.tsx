import type React from "react"
import { RealTimeUpdates } from "@/components/real-time-updates"
import DashboardLayoutComponent from "@/components/dashboard-layout-component"

export default function TenantDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/80 via-teal-50/60 to-cyan-50/80 backdrop-blur-sm relative z-0">
      <DashboardLayoutComponent userRole="tenant">
        <div className="relative z-10">{children}</div>
        <RealTimeUpdates />
      </DashboardLayoutComponent>
    </div>
  )
}
