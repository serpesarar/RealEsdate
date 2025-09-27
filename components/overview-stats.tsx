"use client"

import { cn } from "@/lib/utils"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Properties",
    value: "24",
    change: "+2",
    changeType: "increase" as const,
    icon: Building2,
    description: "Active properties",
  },
  {
    title: "Total Tenants",
    value: "186",
    change: "+12",
    changeType: "increase" as const,
    icon: Users,
    description: "Occupied units",
  },
  {
    title: "Monthly Revenue",
    value: "$124,500",
    change: "+8.2%",
    changeType: "increase" as const,
    icon: DollarSign,
    description: "This month",
  },
  {
    title: "Occupancy Rate",
    value: "94.2%",
    change: "-1.2%",
    changeType: "decrease" as const,
    icon: TrendingUp,
    description: "Overall occupancy",
  },
]

export function OverviewStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="group hover:scale-[1.02] transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-colors duration-200">
              <stat.icon className="w-5 h-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className="flex items-center gap-2 mt-1">
              <Badge
                variant={stat.changeType === "increase" ? "default" : "secondary"}
                className={cn(
                  "text-xs backdrop-blur-sm",
                  stat.changeType === "increase"
                    ? "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50"
                    : "bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200/50",
                )}
              >
                {stat.changeType === "increase" ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {stat.change}
              </Badge>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
