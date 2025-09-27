"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, UserPlus, FileText, Wrench, Plus, Search } from "lucide-react"

const quickActions = [
  {
    title: "Add Property",
    description: "Register a new property",
    icon: Building2,
    action: "add-property",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    title: "New Tenant",
    description: "Add tenant to unit",
    icon: UserPlus,
    action: "add-tenant",
    gradient: "from-green-500 to-green-600",
  },
  {
    title: "Create Lease",
    description: "Generate new lease agreement",
    icon: FileText,
    action: "create-lease",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    title: "Maintenance Request",
    description: "Log maintenance issue",
    icon: Wrench,
    action: "maintenance-request",
    gradient: "from-orange-500 to-orange-600",
  },
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Quick Actions
        </CardTitle>
        <CardDescription>Common tasks and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-start gap-3 h-auto p-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-800/70 transition-all duration-200"
            >
              <div
                className={`w-10 h-10 bg-gradient-to-br ${action.gradient} rounded-lg flex items-center justify-center shadow-lg`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-sm">{action.title}</p>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 dark:border-slate-700/30">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-800/50 transition-all duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-slate-400 to-slate-500 rounded-lg flex items-center justify-center">
              <Search className="w-4 h-4 text-white" />
            </div>
            Search Properties & Tenants
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
