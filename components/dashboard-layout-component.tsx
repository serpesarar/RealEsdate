"use client"

import type { ReactNode } from "react"
import { DashboardLayout } from "./dashboard-layout"

interface DashboardLayoutComponentProps {
  children: ReactNode
  userRole?: "owner" | "manager" | "tenant" | "handyman" | "accountant"
}

export default function DashboardLayoutComponent({ children, userRole = "owner" }: DashboardLayoutComponentProps) {
  return <DashboardLayout userRole={userRole}>{children}</DashboardLayout>
}
