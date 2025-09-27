"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, TrendingUp, AlertTriangle, Clock, DollarSign } from "lucide-react"
import { PredictiveAnalytics } from "@/lib/ai-services"

interface AIDashboardWidgetProps {
  userRole: string
  propertyId?: string
}

export function AIDashboardWidget({ userRole, propertyId }: AIDashboardWidgetProps) {
  const [predictions, setPredictions] = useState<any[]>([])
  const [insights, setInsights] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAIInsights()
  }, [userRole, propertyId])

  const loadAIInsights = async () => {
    setLoading(true)
    try {
      if (propertyId) {
        const maintenancePredictions = await PredictiveAnalytics.predictMaintenanceNeeds(propertyId)
        setPredictions(maintenancePredictions)
      }

      // Generate role-specific insights
      const roleInsights = generateRoleSpecificInsights(userRole)
      setInsights(roleInsights)
    } catch (error) {
      console.error("[v0] Failed to load AI insights:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateRoleSpecificInsights = (role: string) => {
    const baseInsights = [
      {
        type: "efficiency",
        title: "Workflow Optimization",
        description: "AI has identified 3 workflow improvements",
        impact: "high",
        action: "Review suggestions",
      },
      {
        type: "prediction",
        title: "Maintenance Forecast",
        description: "Predicted maintenance needs for next quarter",
        impact: "medium",
        action: "Plan budget",
      },
    ]

    const roleSpecificInsights: Record<string, any[]> = {
      owner: [
        {
          type: "financial",
          title: "Revenue Optimization",
          description: "AI suggests rent adjustments for 3 units",
          impact: "high",
          action: "Review pricing",
        },
      ],
      manager: [
        {
          type: "operations",
          title: "Staff Allocation",
          description: "Optimal handyman scheduling identified",
          impact: "medium",
          action: "Adjust schedules",
        },
      ],
      handyman: [
        {
          type: "routing",
          title: "Route Optimization",
          description: "AI optimized your daily route",
          impact: "low",
          action: "View route",
        },
      ],
    }

    return [...baseInsights, ...(roleSpecificInsights[role] || [])]
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Insights
        </CardTitle>
        <CardDescription>Intelligent recommendations and predictions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Maintenance Predictions */}
        {predictions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Maintenance Predictions
            </h4>
            {predictions.map((prediction, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{prediction.item}</span>
                  <Badge variant={prediction.priority === "high" ? "destructive" : "secondary"}>
                    {Math.round(prediction.probability * 100)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {prediction.timeframe}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />${prediction.estimatedCost}
                  </span>
                </div>
                <Progress value={prediction.probability * 100} className="mt-2 h-1" />
              </div>
            ))}
          </div>
        )}

        {/* AI Insights */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Smart Recommendations
          </h4>
          {insights.map((insight, index) => (
            <div key={index} className="p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm">{insight.title}</span>
                <Badge variant={insight.impact === "high" ? "default" : "secondary"}>{insight.impact}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
              <Button size="sm" variant="outline" className="text-xs bg-transparent">
                {insight.action}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
