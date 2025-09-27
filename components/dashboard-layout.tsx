"use client"

import type { ReactNode } from "react"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { getRoleTheme, type UserRole } from "@/lib/get-role-theme"
import { authService } from "@/lib/auth-service"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Building2,
  Users,
  FileText,
  DollarSign,
  Wrench,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  Home,
  UserCheck,
  Calculator,
  HardHat,
  Crown,
  X,
} from "lucide-react"
// import { AiSuperchatPanel } from "./ai-superchat-panel"

const roleNavigations = {
  owner: [
    { name: "Dashboard", href: "/dashboard/owner", icon: Home },
    { name: "Properties", href: "/dashboard/owner/properties", icon: Building2 },
    { name: "Tenants", href: "/dashboard/owner/tenants", icon: Users },
    { name: "Leases", href: "/dashboard/owner/leases", icon: FileText },
    { name: "Financials", href: "/dashboard/owner/financials", icon: DollarSign },
    { name: "Analytics", href: "/dashboard/owner/analytics", icon: BarChart3 },
    { name: "Staff", href: "/dashboard/owner/staff", icon: UserCheck },
    { name: "Settings", href: "/dashboard/user-settings", icon: Settings },
  ],
  manager: [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Properties", href: "/dashboard/properties", icon: Building2 },
    { name: "Tenants", href: "/dashboard/tenants", icon: Users },
    { name: "Leases", href: "/dashboard/leases", icon: FileText },
    { name: "Payments", href: "/dashboard/payments", icon: DollarSign },
    { name: "Maintenance", href: "/dashboard/maintenance", icon: Wrench },
    { name: "Settings", href: "/dashboard/user-settings", icon: Settings },
  ],
  tenant: [
    { name: "Home", href: "/dashboard/tenant", icon: Home },
    { name: "Pay Rent", href: "/dashboard/tenant/payments", icon: DollarSign },
    { name: "Maintenance", href: "/dashboard/tenant/maintenance", icon: Wrench },
    { name: "Lease", href: "/dashboard/tenant/lease", icon: FileText },
    { name: "Settings", href: "/dashboard/user-settings", icon: Settings },
  ],
  handyman: [
    { name: "Dashboard", href: "/dashboard/handyman", icon: Home },
    { name: "Work Orders", href: "/dashboard/handyman/orders", icon: Wrench },
    { name: "Schedule", href: "/dashboard/handyman/schedule", icon: FileText },
    { name: "Settings", href: "/dashboard/user-settings", icon: Settings },
  ],
  accountant: [
    { name: "Dashboard", href: "/dashboard/accountant", icon: Home },
    { name: "Financial Reports", href: "/dashboard/accountant/reports", icon: BarChart3 },
    { name: "Transactions", href: "/dashboard/accountant/transactions", icon: DollarSign },
    { name: "Tax Documents", href: "/dashboard/accountant/tax", icon: FileText },
    { name: "Settings", href: "/dashboard/user-settings", icon: Settings },
  ],
}

const roleIcons = {
  owner: Crown,
  manager: UserCheck,
  tenant: Users,
  handyman: HardHat,
  accountant: Calculator,
}

const roleLabels = {
  owner: "Property Owner",
  manager: "Property Manager",
  tenant: "Tenant",
  handyman: "Handyman",
  accountant: "Accountant",
}

const roleToThemeMapping = {
  owner: "PROPERTY_OWNER" as UserRole,
  manager: "PROPERTY_MANAGER" as UserRole,
  tenant: "TENANT" as UserRole,
  handyman: "HANDYMAN" as UserRole,
  accountant: "PROPERTY_MANAGER" as UserRole,
}

interface DashboardLayoutProps {
  children: ReactNode
  userRole?: keyof typeof roleNavigations
}

export function DashboardLayout({ children, userRole = "manager" }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Default closed on mobile
  const [isMobile, setIsMobile] = useState(false)
  const currentRole = userRole
  const [isOffline, setIsOffline] = useState(false)
  const [isSyncing, setIsSyncing] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const navigation = roleNavigations[currentRole]
  const RoleIcon = roleIcons[currentRole]

  const themeRole = roleToThemeMapping[currentRole]
  const theme = getRoleTheme(themeRole)

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(true) // Always open on desktop
      } else {
        setSidebarOpen(false) // Closed by default on mobile
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const handleOnline = () => {
      setIsOffline(false)
      setIsSyncing(true)
      setTimeout(() => setIsSyncing(false), 2000)
    }
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error("[v0] Logout error:", error)
      // Even if logout API fails, clear session and redirect
      authService.clearSession()
      window.location.href = "/login"
    }
  }

  const getSidebarStyling = (role: string) => {
    switch (role) {
      case "tenant":
        return "bg-gradient-to-b from-teal-900/95 via-cyan-900/92 to-emerald-900/95 border-teal-700/50"
      case "handyman":
        return "bg-gradient-to-b from-orange-900/95 via-amber-900/92 to-yellow-900/95 border-orange-700/50"
      case "owner":
        return "bg-white/95 border-gray-200/50"
      case "accountant":
        return "bg-gradient-to-b from-slate-900/95 via-gray-900/92 to-zinc-900/95 border-slate-700/50"
      default:
        return "bg-gradient-to-b from-slate-900/98 via-blue-900/95 to-slate-900/98 border-slate-700/50"
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50/95 to-blue-50/95">
      {sidebarOpen && isMobile && (
        <div className="fixed inset-0 z-[9995] bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed top-[64px] md:top-[80px] left-2 md:left-4 z-[9998] shadow-2xl transition-transform duration-300 ease-in-out backdrop-blur-sm",
          getSidebarStyling(currentRole),
          "border-r w-[260px] md:w-[280px]",
          "h-[calc(100vh-80px)] md:h-[calc(100vh-96px)]",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-12 md:h-16 items-center gap-2 md:gap-3 px-4 md:px-6 border-b border-white/20">
            <div
              className={cn(
                "w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg",
              )}
            >
              <Building2 className="w-3 h-3 md:w-5 md:h-5 text-white" />
            </div>
            <span
              className={cn("text-lg md:text-xl font-bold", currentRole === "owner" ? "text-slate-900" : "text-white")}
            >
              PropertyFlow
            </span>
            {isMobile && sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "ml-auto lg:hidden w-8 h-8 p-0",
                  currentRole === "owner" ? "text-slate-900 hover:bg-slate-100" : "text-white hover:bg-white/20",
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div
            className={cn("p-3 md:p-4 border-b", currentRole === "owner" ? "border-gray-200/50" : "border-white/20")}
          >
            <div
              className={cn(
                "w-full p-2 md:p-3 rounded-xl border shadow-lg",
                currentRole === "owner" ? "border-gray-200/50 bg-slate-50/90" : "border-white/30 bg-slate-800/90",
              )}
            >
              <div className="flex items-center gap-2">
                <RoleIcon
                  className={cn("w-3 h-3 md:w-4 md:h-4", currentRole === "owner" ? "text-slate-700" : "text-white")}
                />
                <span
                  className={cn(
                    "text-xs md:text-sm font-medium",
                    currentRole === "owner" ? "text-slate-700" : "text-white",
                  )}
                >
                  {roleLabels[currentRole]}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex-1 space-y-1 p-3 md:p-4 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-3 text-xs md:text-sm font-medium rounded-xl relative overflow-hidden group min-h-[44px]",
                    isActive
                      ? currentRole === "owner"
                        ? "bg-slate-100 text-slate-900 shadow-lg border border-gray-200"
                        : "bg-slate-700/90 text-white shadow-lg border border-white/30"
                      : currentRole === "owner"
                        ? "text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md"
                        : "text-white/80 hover:bg-slate-800/60 hover:text-white hover:shadow-md",
                  )}
                  onClick={() => {
                    if (isMobile) {
                      setSidebarOpen(false)
                    }
                  }}
                >
                  {currentRole === "owner" && (
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transform -translate-x-full group-hover:translate-x-0 rounded-xl" />
                  )}
                  <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0 relative z-10" />
                  <span className="relative z-10">{item.name}</span>
                </Link>
              )
            })}
          </nav>

          <div
            className={cn("p-3 md:p-4 border-t", currentRole === "owner" ? "border-gray-200/50" : "border-white/20")}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full gap-2 md:gap-3 p-2 md:p-3 rounded-xl justify-start min-h-[44px]",
                    currentRole === "owner" ? "hover:bg-slate-50 text-slate-700" : "hover:bg-white/10 text-white",
                  )}
                >
                  <Avatar
                    className={cn(
                      "w-6 h-6 md:w-8 md:h-8 ring-2 flex-shrink-0",
                      currentRole === "owner" ? "ring-gray-200" : "ring-white/30",
                    )}
                  >
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p
                      className={cn(
                        "text-xs md:text-sm font-medium",
                        currentRole === "owner" ? "text-slate-900" : "text-white",
                      )}
                    >
                      John Doe
                    </p>
                    <p className={cn("text-xs", currentRole === "owner" ? "text-slate-600" : "text-white/70")}>
                      {roleLabels[currentRole]}
                    </p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white/95 border-gray-200 shadow-lg rounded-xl">
                <DropdownMenuLabel className="text-slate-900">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="text-slate-700 hover:text-slate-900 rounded-lg" asChild>
                  <Link href="/dashboard/user-settings">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                  className="text-slate-700 hover:text-slate-900 rounded-lg cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out",
          isMobile ? "ml-0" : "ml-[276px] md:ml-[296px]", // Adjusted for new sidebar width
        )}
      >
        {(isOffline || isSyncing) && (
          <div className="p-2 text-center text-white text-sm relative z-[9997]">
            {isOffline && (
              <div className="p-2 rounded-b-lg bg-red-500/90">
                📱 Working offline - Changes will sync when connected
              </div>
            )}
            {isSyncing && <div className="p-2 rounded-b-lg bg-blue-500/90">🔄 Syncing data...</div>}
          </div>
        )}

        <div
          className={cn(
            "sticky top-0 z-[9997] flex h-12 md:h-16 items-center gap-3 md:gap-4 border-b border-gray-200/80 bg-white/95 shadow-lg px-3 md:px-4 lg:px-6 backdrop-blur-sm",
          )}
        >
          <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-4 h-4 md:w-5 md:h-5" />
          </Button>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "gap-1 md:gap-2 bg-white/80 rounded-xl border-gray-200/80 text-xs md:text-sm h-8 md:h-9",
                    currentRole === "owner" ? "text-slate-900" : "text-slate-700",
                  )}
                >
                  <RoleIcon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="hidden sm:inline">{roleLabels[currentRole]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg bg-white/95">
                <DropdownMenuLabel>Switch Role Panel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(roleLabels).map(([role, label]) => {
                  const Icon = roleIcons[role as keyof typeof roleIcons]
                  const isCurrentRole = role === currentRole
                  return (
                    <DropdownMenuItem
                      key={role}
                      className={cn("gap-2 cursor-pointer rounded-lg", isCurrentRole && "bg-blue-50")}
                      onClick={() => {
                        if (!isCurrentRole) {
                          const defaultRoutes = {
                            owner: "/dashboard/owner",
                            manager: "/dashboard",
                            tenant: "/dashboard/tenant",
                            handyman: "/dashboard/handyman",
                            accountant: "/dashboard/accountant",
                          }
                          window.location.href = defaultRoutes[role as keyof typeof defaultRoutes]
                        }
                      }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                      {isCurrentRole && <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full" />}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <main className="flex-1 p-3 md:p-4 lg:p-6 bg-transparent overflow-auto relative z-10">
          <div className="text-slate-900">{children}</div>
        </main>
      </div>
    </div>
  )
}
