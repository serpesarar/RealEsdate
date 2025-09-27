"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Users,
  User,
  Building2,
  Wrench,
  Send,
  Camera,
  Mic,
  MapPin,
  Calendar,
  ChevronUp,
  ChevronDown,
  Minimize2,
  Circle,
  AlertCircle,
} from "lucide-react"

interface ChatPanelProps {
  userRole: string
}

export function UniversalChatPanel({ userRole }: ChatPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("team")
  const [message, setMessage] = useState("")

  const tabs = [
    { id: "team", icon: Users, label: "Team", badge: 3 },
    { id: "direct", icon: User, label: "Direct", badge: 1 },
    ...(userRole === "owner" || userRole === "manager"
      ? [{ id: "tenants", icon: Building2, label: "Tenants", badge: 0 }]
      : []),
    { id: "jobs", icon: Wrench, label: "Jobs", badge: 2 },
  ]

  const teamMembers = [
    { id: 1, name: "Sarah Manager", role: "Property Manager", status: "online", avatar: "SM" },
    { id: 2, name: "Mike Handyman", role: "Maintenance", status: "busy", avatar: "MH" },
    { id: 3, name: "Lisa Owner", role: "Owner", status: "away", avatar: "LO" },
  ]

  const jobChats = [
    { id: 1, title: "Kitchen Faucet Leak - Apt 2B", tenant: "John Smith", handyman: "Mike H.", status: "active" },
    { id: 2, title: "AC Not Working - Apt 5A", tenant: "Emma Davis", handyman: "Tom R.", status: "pending" },
  ]

  const messages = [
    {
      id: 1,
      sender: "Sarah Manager",
      message: "Good morning team! Any urgent issues today?",
      time: "9:15 AM",
      type: "text",
    },
    {
      id: 2,
      sender: "Mike Handyman",
      message: "Working on the kitchen faucet in 2B. Should be done by noon.",
      time: "9:18 AM",
      type: "text",
    },
    { id: 3, sender: "System", message: "Job accepted by Mike Handyman", time: "9:20 AM", type: "system" },
  ]

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsMinimized(false)} className="rounded-full w-12 h-12 shadow-lg">
          <Users className="w-5 h-5" />
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed bottom-0 right-4 z-50 bg-card border border-border rounded-t-lg shadow-xl transition-all duration-300 ${
        isCollapsed ? "h-12" : "h-96"
      } w-80`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4" />
          <span className="font-medium text-sm">Communication</span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-6 w-6 p-0">
            {isCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-6 w-6 p-0">
            <Minimize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-1 p-2 text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-3 h-3" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <Badge variant="secondary" className="h-4 text-xs px-1">
                    {tab.badge}
                  </Badge>
                )}
              </button>
            ))}
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col h-80">
            {activeTab === "team" && (
              <>
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div key={msg.id} className="space-y-1">
                        {msg.type === "system" ? (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            <AlertCircle className="w-3 h-3 inline mr-1" />
                            {msg.message}
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium">{msg.sender}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <div className="text-sm bg-muted p-2 rounded-lg">{msg.message}</div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator />
                <div className="p-3">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1 h-8 text-sm"
                    />
                    <Button size="sm" className="h-8 w-8 p-0">
                      <Send className="w-3 h-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Camera className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Mic className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <MapPin className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Calendar className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </>
            )}

            {activeTab === "direct" && (
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-2">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted cursor-pointer"
                    >
                      <div className="relative">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <Circle
                          className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${
                            member.status === "online"
                              ? "fill-green-500 text-green-500"
                              : member.status === "busy"
                                ? "fill-yellow-500 text-yellow-500"
                                : "fill-gray-400 text-gray-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}

            {activeTab === "jobs" && (
              <ScrollArea className="flex-1 p-3">
                <div className="space-y-2">
                  {jobChats.map((job) => (
                    <div key={job.id} className="p-2 rounded-lg border border-border hover:bg-muted cursor-pointer">
                      <div className="text-sm font-medium">{job.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Tenant: {job.tenant} • Handyman: {job.handyman}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Circle
                          className={`w-2 h-2 ${
                            job.status === "active"
                              ? "fill-green-500 text-green-500"
                              : "fill-yellow-500 text-yellow-500"
                          }`}
                        />
                        <span className="text-xs capitalize">{job.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>
        </>
      )}
    </div>
  )
}
