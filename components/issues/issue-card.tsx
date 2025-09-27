"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle, Clock, AlertTriangle, MessageSquare, Eye } from "lucide-react"

interface Issue {
  id: number
  title: string
  description: string
  property: string
  unit: string
  tenant: string
  category: string
  priority: string
  status: string
  assignedTo: string
  assignedToAvatar: string
  createdAt: string
  estimatedCost: string
  aiConfidence: number
}

interface IssueCardProps {
  issue: Issue
  getCategoryIcon: (category: string) => React.ReactNode
  getCategoryColor: (category: string) => string
}

export function IssueCard({ issue, getCategoryIcon, getCategoryColor }: IssueCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-100/80 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200/50 backdrop-blur-sm"
      case "MEDIUM":
        return "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200/50 backdrop-blur-sm"
      case "LOW":
        return "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 backdrop-blur-sm"
      default:
        return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200/50 backdrop-blur-sm"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "pending":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      default:
        return <Clock className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <Card className="border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20 transition-all duration-300 hover:border-primary/30 hover:scale-[1.01]">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(issue.status)}
                  <h3 className="font-semibold text-foreground">{issue.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-800/50"
                >
                  <Eye className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm hover:bg-white/50 dark:hover:bg-slate-800/50"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Property Info */}
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>{issue.property}</span>
              <span>•</span>
              <span>Unit {issue.unit}</span>
              <span>•</span>
              <span>{issue.tenant}</span>
              <span>•</span>
              <span>{issue.createdAt}</span>
            </div>

            {/* Tags and Assignment */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className={getCategoryColor(issue.category)}>
                  {getCategoryIcon(issue.category)}
                  <span className="ml-1">{issue.category}</span>
                </Badge>
                <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                {issue.aiConfidence && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/30"
                  >
                    AI: {issue.aiConfidence}%
                  </Badge>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="text-sm">
                  <span className="text-muted-foreground">Est. Cost: </span>
                  <span className="font-medium">{issue.estimatedCost}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Avatar className="w-8 h-8 ring-2 ring-white/20">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary/80 text-white">
                      {issue.assignedToAvatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{issue.assignedTo}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
