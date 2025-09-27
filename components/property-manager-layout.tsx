"use client"

import type { ReactNode } from "react"
import React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
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
  Settings,
  LogOut,
  Menu,
  Home,
  UserCheck,
  X,
  Crown,
  HardHat,
  Calculator,
} from "lucide-react"
import { AiSuperchatPanel } from "@/components/ai-superchat-panel"

const managerNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Properties", href: "/properties", icon: Building2 },
  { name: "Tenants", href: "/tenants", icon: Users },
  { name: "Payments", href: "/payments", icon: DollarSign },
  { name: "Maintenance", href: "/maintenance", icon: Wrench },
  { name: "Reports", href: "/reports", icon: FileText },
]

interface PropertyManagerLayoutProps {
  children: ReactNode
}

export function PropertyManagerLayout({ children }: PropertyManagerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false) // Default closed on mobile
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  React.useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      setSidebarOpen(!mobile) // Desktop'ta her zaman açık
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Route değişikliklerinde sidebar'ı açık tut
  React.useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true)
    }
  }, [pathname, isMobile])

  const handleLogout = async () => {
    try {
      await authService.logout()
      router.push("/")
    } catch (error) {
      console.error("[v0] Logout error:", error)
      // Even if logout API fails, clear session and redirect
      authService.clearSession()
      router.push("/")
    }
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

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shadow-xl transition-transform duration-300 ease-in-out",
          "bg-slate-900 border-r border-slate-700",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center gap-3 px-6 border-b border-slate-700">
            <UserCheck className="w-8 h-8 text-blue-400" />
            <span className="text-xl font-bold text-white">Manager Panel</span>
            {isMobile && sidebarOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto lg:hidden text-white hover:bg-slate-800"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Role indicator */}
          <div className="p-4 border-b border-slate-700">
            <div className="w-full p-3 rounded-xl border border-slate-600 bg-slate-800 shadow-lg">
              <div className="flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">Property Manager</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {managerNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    // Sadece mobilde sidebar'ı kapat
                    if (isMobile) {
                      setSidebarOpen(false)
                    }
                  }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white",
                  )}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* User profile section */}
          <div className="p-4 border-t border-slate-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full gap-3 p-3 transition-all duration-200 hover:bg-slate-800 rounded-xl justify-start text-white"
                >
                  <Avatar className="w-8 h-8 ring-2 ring-blue-400 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className="bg-blue-600 text-white">JD</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="text-sm font-medium text-white">John Doe</p>
                    <p className="text-xs text-slate-400">Property Manager</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border-gray-200 shadow-lg rounded-xl">
                <DropdownMenuLabel className="text-slate-900">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem className="text-slate-700 hover:text-slate-900 rounded-lg">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
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

      <div className="flex-1 flex flex-col min-w-0 ml-64">
        {/* Top header */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-gray-200 bg-white shadow-lg px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PropertyFlow</span>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-white/80 backdrop-blur-sm rounded-xl border-gray-200/80"
                >
                  <UserCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Property Manager</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg bg-white/95 backdrop-blur-sm">
                <DropdownMenuLabel>Switch Role Panel</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {Object.entries(roleLabels).map(([role, label]) => {
                  const Icon = roleIcons[role as keyof typeof roleIcons]
                  const isCurrentRole = role === "manager"
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

        <main className="flex-1 p-4 lg:p-6 bg-gradient-to-br from-gray-50 to-blue-50 overflow-auto">
          <div className="text-slate-900">{children}</div>
        </main>
      </div>

      <AiSuperchatPanel userRole="manager" />
    </div>
  )
}
