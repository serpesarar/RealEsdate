"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Mail, FileCheck, Search, UserCheck, Gavel } from "lucide-react"
import type { ScreeningWorkflow, WorkflowStep } from "@/lib/notification-service"

interface WorkflowTrackerProps {
  workflow: ScreeningWorkflow
}

export function WorkflowTracker({ workflow }: WorkflowTrackerProps) {
  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case "consent_request":
        return <Mail className="w-4 h-4" />
      case "consent_received":
        return <FileCheck className="w-4 h-4" />
      case "screening_initiated":
        return <Search className="w-4 h-4" />
      case "screening_complete":
        return <UserCheck className="w-4 h-4" />
      case "decision_made":
        return <Gavel className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusIcon = (status: WorkflowStep["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "failed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: WorkflowStep["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completed</Badge>
      case "in_progress":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">In Progress</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Failed</Badge>
      default:
        return <Badge variant="outline">Pending</Badge>
    }
  }

  const completedSteps = workflow.steps.filter((step) => step.status === "completed").length
  const totalSteps = workflow.steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Screening Workflow</span>
          <Badge variant="outline">{workflow.id}</Badge>
        </CardTitle>
        <CardDescription>Track the progress of the background check process</CardDescription>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>
              {completedSteps} of {totalSteps} steps completed
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {workflow.steps.map((step, index) => (
            <div key={step.id} className="flex items-center space-x-4 p-3 rounded-lg bg-muted/20">
              <div className="flex items-center space-x-2">
                {getStepIcon(step.id)}
                {getStatusIcon(step.status)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{step.name}</h4>
                  {getStatusBadge(step.status)}
                </div>

                {step.timestamp && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {step.status === "completed" ? "Completed" : "Started"}: {new Date(step.timestamp).toLocaleString()}
                  </p>
                )}
              </div>

              {index < workflow.steps.length - 1 && <div className="w-px h-8 bg-border ml-2" />}
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Created: {new Date(workflow.createdAt).toLocaleString()}</span>
            <span>Last Updated: {new Date(workflow.updatedAt).toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
