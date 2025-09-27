"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star, Phone, Mail, MapPin, Clock, CheckCircle, Eye, MessageSquare } from "lucide-react"

interface Contractor {
  id: number
  name: string
  avatar: string
  specialty: string
  rating: number
  completedJobs: number
  activeJobs: number
  phone: string
  email: string
  location: string
  status: string
  joinedDate: string
  hourlyRate: number
  responseTime: string
  skills: string[]
  recentJobs: Array<{
    property: string
    unit: string
    issue: string
    status: string
  }>
}

interface ContractorCardProps {
  contractor: Contractor
}

export function ContractorCard({ contractor }: ContractorCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 backdrop-blur-sm"
      case "busy":
        return "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200/50 backdrop-blur-sm"
      case "inactive":
        return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200/50 backdrop-blur-sm"
      default:
        return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200/50 backdrop-blur-sm"
    }
  }

  const getSpecialtyColor = (specialty: string) => {
    switch (specialty) {
      case "Plumbing":
        return "bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 backdrop-blur-sm"
      case "Electrical":
        return "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200/50 backdrop-blur-sm"
      case "HVAC":
        return "bg-purple-100/80 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200/50 backdrop-blur-sm"
      case "General Maintenance":
        return "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 backdrop-blur-sm"
      default:
        return "bg-gray-100/80 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400 border-gray-200/50 backdrop-blur-sm"
    }
  }

  return (
    <Card className="border border-white/20 dark:border-slate-700/30 hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/20 transition-all duration-300 hover:border-primary/30 hover:scale-[1.01]">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 ring-2 ring-white/20">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-white font-semibold">
                  {contractor.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">{contractor.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={getSpecialtyColor(contractor.specialty)}>{contractor.specialty}</Badge>
                  <Badge className={getStatusColor(contractor.status)}>{contractor.status}</Badge>
                </div>
              </div>
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

          {/* Rating and Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{contractor.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">Rating</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="font-semibold">{contractor.completedJobs}</span>
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-sm">
              <div className="flex items-center justify-center space-x-1 mb-1">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-semibold">{contractor.activeJobs}</span>
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm p-3 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{contractor.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Mail className="w-4 h-4" />
              <span>{contractor.email}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{contractor.location}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Skills</p>
            <div className="flex flex-wrap gap-1">
              {contractor.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="text-xs bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/30"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/20 dark:border-slate-700/30">
            <div className="p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Hourly Rate</p>
              <p className="font-semibold">${contractor.hourlyRate}/hr</p>
            </div>
            <div className="p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
              <p className="text-xs text-muted-foreground">Response Time</p>
              <p className="font-semibold">{contractor.responseTime}</p>
            </div>
          </div>

          {/* Recent Jobs */}
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Recent Jobs</p>
            <div className="space-y-2">
              {contractor.recentJobs.slice(0, 2).map((job, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm"
                >
                  <span className="text-muted-foreground">
                    {job.property} • {job.unit}
                  </span>
                  <Badge
                    className={
                      job.status === "completed"
                        ? "bg-green-100/80 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200/50 backdrop-blur-sm"
                        : job.status === "in_progress"
                          ? "bg-blue-100/80 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200/50 backdrop-blur-sm"
                          : "bg-yellow-100/80 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200/50 backdrop-blur-sm"
                    }
                  >
                    {job.status.replace("_", " ")}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-2">
            <Button
              size="sm"
              className="flex-1 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg"
            >
              Assign Job
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-white/20 dark:border-slate-700/30 hover:bg-white/70 dark:hover:bg-slate-800/70"
            >
              View Profile
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
