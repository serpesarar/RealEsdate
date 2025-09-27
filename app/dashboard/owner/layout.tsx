import type React from "react"
import { RealTimeUpdates } from "@/components/real-time-updates"
import DashboardLayoutComponent from "@/components/dashboard-layout-component"

export default function OwnerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen owner-bg">
      <DashboardLayoutComponent userRole="owner">
        {children}
        <RealTimeUpdates />
      </DashboardLayoutComponent>
    </div>
  )
}
