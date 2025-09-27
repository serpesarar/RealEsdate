"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wrench, Star, Clock, CheckCircle } from "lucide-react"

interface AssignHandymanDialogProps {
  trigger: React.ReactNode
}

export function AssignHandymanDialog({ trigger }: AssignHandymanDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedIssue, setSelectedIssue] = useState("")
  const [selectedHandyman, setSelectedHandyman] = useState("")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(false)

  const activeIssues = [
    { id: "1", title: "Kitchen sink leaking", property: "Park Avenue Towers", unit: "12A", priority: "high" },
    { id: "2", title: "AC not working", property: "Sunset Gardens", unit: "5B", priority: "medium" },
    { id: "3", title: "Broken window", property: "Metro Plaza", unit: "8C", priority: "low" },
    { id: "4", title: "Electrical outlet not working", property: "Downtown Heights", unit: "3A", priority: "medium" },
  ]

  const availableHandymen = [
    {
      id: "1",
      name: "Mike Johnson",
      specialties: ["Plumbing", "Electrical"],
      rating: 4.8,
      completedJobs: 156,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      specialties: ["HVAC", "General Repair"],
      rating: 4.9,
      completedJobs: 203,
      status: "available",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Tom Davis",
      specialties: ["Carpentry", "Painting"],
      rating: 4.7,
      completedJobs: 89,
      status: "busy",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const handleAssign = async () => {
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Here you would make the actual assignment
    console.log("Assigning handyman:", {
      issueId: selectedIssue,
      handymanId: selectedHandyman,
      notes,
    })

    setLoading(false)
    setOpen(false)

    // Reset form
    setSelectedIssue("")
    setSelectedHandyman("")
    setNotes("")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Assign Handyman
          </DialogTitle>
          <DialogDescription>Select an issue and assign it to an available handyman.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="issue">Select Issue *</Label>
            <Select value={selectedIssue} onValueChange={setSelectedIssue}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an active issue" />
              </SelectTrigger>
              <SelectContent>
                {activeIssues.map((issue) => (
                  <SelectItem key={issue.id} value={issue.id}>
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <p className="font-medium">{issue.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {issue.property} • Unit {issue.unit}
                        </p>
                      </div>
                      <Badge className={getPriorityColor(issue.priority)}>{issue.priority}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="handyman">Select Handyman *</Label>
            <Select value={selectedHandyman} onValueChange={setSelectedHandyman}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a handyman" />
              </SelectTrigger>
              <SelectContent>
                {availableHandymen.map((handyman) => (
                  <SelectItem key={handyman.id} value={handyman.id}>
                    <div className="flex items-center gap-3 w-full">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={handyman.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {handyman.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{handyman.name}</p>
                          {handyman.status === "available" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{handyman.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{handyman.completedJobs} jobs</span>
                        </div>
                        <div className="flex gap-1 mt-1">
                          {handyman.specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Assignment Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any specific instructions or notes for the handyman..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign} disabled={!selectedIssue || !selectedHandyman || loading}>
              {loading ? "Assigning..." : "Assign Handyman"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
