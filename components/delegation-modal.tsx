"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Clock, User } from "lucide-react"

interface TeamMember {
  id: number
  name: string
  avatar: string
  status: "available" | "busy" | "off"
  specialties: string[]
  currentWorkload: number
  distance: string
}

interface DelegationModalProps {
  isOpen: boolean
  onClose: () => void
  jobTitle: string
  onDelegate: (memberId: number, reason: string, priority: string, notes: string) => void
}

const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "available",
    specialties: ["Plumbing", "HVAC"],
    currentWorkload: 2,
    distance: "0.8 miles",
  },
  {
    id: 2,
    name: "Maria Santos",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    specialties: ["Electrical", "Appliances"],
    currentWorkload: 5,
    distance: "1.2 miles",
  },
  {
    id: 3,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "available",
    specialties: ["Structural", "General"],
    currentWorkload: 1,
    distance: "2.1 miles",
  },
  {
    id: 4,
    name: "Sarah Kim",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "off",
    specialties: ["Plumbing", "Electrical"],
    currentWorkload: 0,
    distance: "0.5 miles",
  },
]

const statusColors = {
  available: "bg-green-100 text-green-800 border-green-200",
  busy: "bg-yellow-100 text-yellow-800 border-yellow-200",
  off: "bg-red-100 text-red-800 border-red-200",
}

const statusIcons = {
  available: "🟢",
  busy: "🟡",
  off: "🔴",
}

export function DelegationModal({ isOpen, onClose, jobTitle, onDelegate }: DelegationModalProps) {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)
  const [delegationReason, setDelegationReason] = useState("")
  const [priority, setPriority] = useState("")
  const [notes, setNotes] = useState("")

  const handleDelegate = () => {
    if (selectedMember && delegationReason && priority) {
      onDelegate(selectedMember, delegationReason, priority, notes)
      onClose()
      // Reset form
      setSelectedMember(null)
      setDelegationReason("")
      setPriority("")
      setNotes("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Delegate Job: {jobTitle}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Team Member Selection */}
          <div>
            <Label className="text-base font-medium">Select Team Member</Label>
            <div className="grid gap-3 mt-3">
              {mockTeamMembers.map((member) => (
                <Card
                  key={member.id}
                  className={`cursor-pointer transition-colors ${
                    selectedMember === member.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {member.distance}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[member.status]}>
                          {statusIcons[member.status]} {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {member.currentWorkload} active jobs
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Delegation Reason */}
          <div>
            <Label htmlFor="reason">Delegation Reason</Label>
            <Select value={delegationReason} onValueChange={setDelegationReason}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Select reason for delegation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="workload">Too busy with other jobs</SelectItem>
                <SelectItem value="expertise">Requires specific expertise</SelectItem>
                <SelectItem value="location">Better location match</SelectItem>
                <SelectItem value="schedule">Schedule conflict</SelectItem>
                <SelectItem value="emergency">Emergency situation</SelectItem>
                <SelectItem value="other">Other reason</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority Level */}
          <div>
            <Label>Priority Level</Label>
            <RadioGroup value={priority} onValueChange={setPriority} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="low" />
                <Label htmlFor="low" className="flex items-center gap-2">
                  🟢 Low Priority - Can wait
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium" className="flex items-center gap-2">
                  🟡 Medium Priority - Within a few days
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="high" />
                <Label htmlFor="high" className="flex items-center gap-2">
                  🔴 High Priority - Urgent attention needed
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Notes for Colleague */}
          <div>
            <Label htmlFor="notes">Notes for Colleague</Label>
            <Textarea
              id="notes"
              placeholder="Add any specific instructions, context, or important details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="mt-2"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleDelegate}
              disabled={!selectedMember || !delegationReason || !priority}
              className="flex-1"
            >
              <User className="w-4 h-4 mr-2" />
              Delegate & Notify
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
