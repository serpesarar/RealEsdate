"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle, RefreshCw } from "lucide-react"

interface IntegrationStatus {
  name: string
  status: "connected" | "disconnected" | "error"
  lastSync: string
  eventsProcessed: number
}

export function IntegrationStatusWidget() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([
    {
      name: "Tenant System",
      status: "connected",
      lastSync: "2 minutes ago",
      eventsProcessed: 47,
    },
    {
      name: "Handyman System",
      status: "connected",
      lastSync: "5 minutes ago",
      eventsProcessed: 23,
    },
    {
      name: "Manager System",
      status: "connected",
      lastSync: "1 minute ago",
      eventsProcessed: 12,
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      connected: "default",
      disconnected: "secondary",
      error: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "secondary"}>{status}</Badge>
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">System Integrations</CardTitle>
        <Button variant="ghost" size="sm">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {integrations.map((integration) => (
            <div key={integration.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(integration.status)}
                <div>
                  <p className="text-sm font-medium">{integration.name}</p>
                  <p className="text-xs text-muted-foreground">Last sync: {integration.lastSync}</p>
                </div>
              </div>
              <div className="text-right">
                {getStatusBadge(integration.status)}
                <p className="text-xs text-muted-foreground mt-1">{integration.eventsProcessed} events</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
