import type React from "react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function TenantsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <DashboardLayout userRole="manager">{children}</DashboardLayout>
}
