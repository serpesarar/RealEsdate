"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Building2,
  Users,
  Wrench,
  DollarSign,
  FileText,
  Settings,
  Menu,
  X,
  Crown,
  UserCheck,
  HardHat,
  Calculator,
} from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export default function ManagerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      // Desktop'ta her zaman açık
      if (!mobile) {
        setSidebarOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setSidebarOpen(true)
    }
  }, [pathname, isMobile])

  const navigationItems = [
    { name: "Properties Portfolio", href: "/manager/properties", icon: Building2 },
    { name: "Tenants", href: "/manager/tenants", icon: Users },
    { name: "Maintenance", href: "/manager/maintenance", icon: Wrench },
    { name: "Financial Reports", href: "/manager/financial", icon: DollarSign },
    { name: "Documents", href: "/manager/documents", icon: FileText },
    { name: "Settings", href: "/manager/settings", icon: Settings },
  ]

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
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 transition-all duration-300",
          "bg-slate-900 border-r border-slate-700",
          isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0",
          "w-64",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Property Manager</h2>
              {isMobile && (
                <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300">
                  <X className="h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg transition-colors",
                        "text-white hover:bg-slate-800",
                        isActive && "bg-blue-600 hover:bg-blue-700",
                      )}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="flex-1 flex flex-col ml-64">
        <header className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobile && (
              <button onClick={() => setSidebarOpen(true)} className="text-gray-600 hover:text-gray-900">
                <Menu className="h-6 w-6" />
              </button>
            )}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">PropertyFlow</span>
          </div>

          <div className="flex items-center gap-2">
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
        </header>

        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  )
}
