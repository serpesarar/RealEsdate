import type React from "react"
import { PropertyManagerLayout } from "@/components/property-manager-layout"

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <PropertyManagerLayout>{children}</PropertyManagerLayout>
}
