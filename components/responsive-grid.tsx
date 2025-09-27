"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ResponsiveGridProps {
  children: React.ReactNode
  className?: string
  cols?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

export function ResponsiveGrid({
  children,
  className,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
}: ResponsiveGridProps) {
  const gridClasses = cn(
    "grid gap-4 lg:gap-6",
    // Mobile: Stack vertically
    `grid-cols-${cols.mobile}`,
    // Tablet: 2-column grid
    `md:grid-cols-${cols.tablet}`,
    // Desktop: Full multi-column
    `lg:grid-cols-${cols.desktop}`,
    className,
  )

  return <div className={gridClasses}>{children}</div>
}
