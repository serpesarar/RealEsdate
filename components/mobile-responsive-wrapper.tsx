"use client"

import type React from "react"
import { SwipeCard, PullToRefresh } from "@/components/mobile-enhancements"
import { useIsMobile } from "@/hooks/use-mobile"

interface MobileResponsiveWrapperProps {
  children: React.ReactNode
  enablePullToRefresh?: boolean
  onRefresh?: () => Promise<void>
  enableSwipe?: boolean
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  className?: string
}

export function MobileResponsiveWrapper({
  children,
  enablePullToRefresh = false,
  onRefresh,
  enableSwipe = false,
  onSwipeLeft,
  onSwipeRight,
  className,
}: MobileResponsiveWrapperProps) {
  const isMobile = useIsMobile()

  if (!isMobile) {
    return <div className={className}>{children}</div>
  }

  let content = children

  if (enableSwipe && (onSwipeLeft || onSwipeRight)) {
    content = (
      <SwipeCard onSwipeLeft={onSwipeLeft} onSwipeRight={onSwipeRight} className={className}>
        {content}
      </SwipeCard>
    )
  }

  if (enablePullToRefresh && onRefresh) {
    content = <PullToRefresh onRefresh={onRefresh}>{content}</PullToRefresh>
  }

  return <div className={className}>{content}</div>
}
