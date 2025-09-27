import type React from "react"
import { RealTimeUpdates } from "@/components/real-time-updates"
import DashboardLayoutComponent from "@/components/dashboard-layout-component"

export default function AccountantDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen accountant-bg">
      <DashboardLayoutComponent userRole="accountant">
        {children}
        <RealTimeUpdates />
      </DashboardLayoutComponent>
    </div>
  )
}
