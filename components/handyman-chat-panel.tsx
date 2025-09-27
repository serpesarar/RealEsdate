"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  User,
  Send,
  Camera,
  Mic,
  ChevronUp,
  ChevronDown,
  Minimize2,
  MessageSquare,
  Circle,
  Smile,
  Phone,
  Video,
  Shield,
  Crown,
  Wrench,
} from "lucide-react"

interface HandymanChatPanelProps {
  userRole: string
}

interface Message {
  id: string
  sender: string
  message: string
  time: string
  type: "text" | "voice" | "image" | "system"
  avatar?: string
  isOwn?: boolean
  status?: "sent" | "delivered" | "read"
  role?: "manager" | "owner" | "handyman"
}

interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  role: "manager" | "owner"
  property: string
}

export function HandymanChatPanel({ userRole }: HandymanChatPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("group")
  const [message, setMessage] = useState("")
  const [selectedContact, setSelectedContact] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: "group", icon: Users, label: "Team Chat", badge: 3 },
    { id: "individual", icon: User, label: "Direct", badge: 2 },
  ]

  const contacts: Contact[] = [
    { id: "1", name: "Sarah Johnson", avatar: "SJ", status: "online", role: "manager", property: "Riverside Gardens" },
    { id: "2", name: "Michael Brown", avatar: "MB", status: "away", role: "owner", property: "Riverside Gardens" },
    { id: "3", name: "Lisa Chen", avatar: "LC", status: "online", role: "manager", property: "Oak Valley Apts" },
  ]

  const [groupMessages, setGroupMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Sarah Johnson",
      message:
        "Good morning team! We have several urgent repairs scheduled for today. Please prioritize the AC unit in Building A.",
      time: "8:30 AM",
      type: "text",
      avatar: "SJ",
      role: "manager",
    },
    {
      id: "2",
      sender: "Michael Brown",
      message:
        "Thanks for the quick response on the plumbing issue yesterday. The tenant was very satisfied with the work quality.",
      time: "9:15 AM",
      type: "text",
      avatar: "MB",
      role: "owner",
    },
    {
      id: "3",
      sender: "You",
      message: "I'll handle the AC repair first thing. Should be completed by noon. Will send photos when done.",
      time: "9:20 AM",
      type: "text",
      isOwn: true,
      status: "read",
      role: "handyman",
    },
  ])

  const [individualMessages, setIndividualMessages] = useState<{ [key: string]: Message[] }>({
    "1": [
      {
        id: "1",
        sender: "Sarah Johnson",
        message: "Hi! Can you check the electrical issue in Apt 204? Tenant reported flickering lights.",
        time: "2:15 PM",
        type: "text",
        avatar: "SJ",
        role: "manager",
      },
      {
        id: "2",
        sender: "You",
        message: "I'll head there right after I finish the current job. Should be there by 3 PM.",
        time: "2:18 PM",
        type: "text",
        isOwn: true,
        status: "read",
        role: "handyman",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "Michael Brown",
        message: "Great work on the kitchen renovation! The photos look excellent. Please submit the final invoice.",
        time: "1:45 PM",
        type: "text",
        avatar: "MB",
        role: "owner",
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [groupMessages, individualMessages, selectedContact])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "You",
      message: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "text",
      isOwn: true,
      status: "sent",
      role: "handyman",
    }

    if (activeTab === "group") {
      setGroupMessages((prev) => [...prev, newMessage])
    } else if (selectedContact) {
      setIndividualMessages((prev) => ({
        ...prev,
        [selectedContact]: [...(prev[selectedContact] || []), newMessage],
      }))
    }

    setMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "fill-green-500 text-green-500"
      case "away":
        return "fill-yellow-500 text-yellow-500"
      case "offline":
        return "fill-gray-400 text-gray-400"
      default:
        return "fill-gray-400 text-gray-400"
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "manager":
        return <Shield className="w-3 h-3 text-blue-500" />
      case "owner":
        return <Crown className="w-3 h-3 text-purple-500" />
      case "handyman":
        return <Wrench className="w-3 h-3 text-orange-500" />
      default:
        return null
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "manager":
        return "from-blue-500 to-blue-600"
      case "owner":
        return "from-purple-500 to-purple-600"
      case "handyman":
        return "from-orange-500 to-orange-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 border-4 border-white"
        >
          <div className="relative">
            <MessageSquare className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div
      className={`fixed z-[9999] bg-card border border-border rounded-t-2xl shadow-2xl backdrop-blur-sm ${
        isCollapsed ? "h-16" : "h-[600px]"
      } w-96 max-w-[90vw]`}
      style={{ bottom: "24px", right: "24px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-orange-500/10 to-amber-500/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full" />
          </div>
          <div>
            <span className="font-bold text-sm bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Team Communication
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wrench className="w-3 h-3" />
              <span>Handyman Portal</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setIsCollapsed(!isCollapsed)} className="h-7 w-7 p-0">
            {isCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="h-7 w-7 p-0">
            <Minimize2 className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {!isCollapsed && (
        <>
          {/* Tabs */}
          <div className="flex border-b border-border/50 bg-muted/30">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 text-xs font-medium transition-all relative ${
                  activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500" />
                )}
                <div className="relative z-10 flex items-center gap-1">
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {tab.badge}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col h-[480px]">
            {activeTab === "group" && (
              <>
                {/* Group Chat Header */}
                <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-orange-700">Property Management Team</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {contacts.map((contact) => (
                      <div key={contact.id} className="flex items-center gap-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback
                            className={`text-xs bg-gradient-to-r ${getRoleColor(contact.role)} text-white`}
                          >
                            {contact.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <Circle className={`w-2 h-2 ${getStatusColor(contact.status)}`} />
                      </div>
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {contacts.filter((c) => c.status === "online").length} online
                    </span>
                  </div>
                </div>

                {/* Group Messages */}
                <ScrollArea className="flex-1 p-3">
                  <div className="space-y-4">
                    {groupMessages.map((msg, index) => (
                      <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                          {!msg.isOwn && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback
                                  className={`text-xs bg-gradient-to-r ${getRoleColor(msg.role || "handyman")} text-white`}
                                >
                                  {msg.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium flex items-center gap-1">
                                {msg.sender}
                                {getRoleIcon(msg.role || "handyman")}
                              </span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-2xl relative group ${
                              msg.isOwn ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            {msg.isOwn && msg.status && (
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-orange-100">{msg.status}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </>
            )}

            {activeTab === "individual" && (
              <>
                {!selectedContact ? (
                  <ScrollArea className="flex-1 p-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Select a contact to chat</h3>
                      {contacts.map((contact) => (
                        <div
                          key={contact.id}
                          onClick={() => setSelectedContact(contact.id)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        >
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className={`bg-gradient-to-r ${getRoleColor(contact.role)} text-white`}>
                                {contact.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <Circle
                              className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(contact.status)}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium flex items-center gap-2">
                              {contact.name}
                              {getRoleIcon(contact.role)}
                            </div>
                            <div className="text-xs text-muted-foreground">{contact.property}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Video className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <>
                    {/* Individual Chat Header */}
                    <div className="p-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedContact(null)}
                          className="h-8 w-8 p-0"
                        >
                          ←
                        </Button>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback
                            className={`bg-gradient-to-r ${getRoleColor(contacts.find((c) => c.id === selectedContact)?.role || "handyman")} text-white`}
                          >
                            {contacts.find((c) => c.id === selectedContact)?.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium flex items-center gap-2">
                            {contacts.find((c) => c.id === selectedContact)?.name}
                            {getRoleIcon(contacts.find((c) => c.id === selectedContact)?.role || "handyman")}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {contacts.find((c) => c.id === selectedContact)?.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Messages */}
                    <ScrollArea className="flex-1 p-3">
                      <div className="space-y-4">
                        {(individualMessages[selectedContact] || []).map((msg, index) => (
                          <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                              <div
                                className={`p-3 rounded-2xl relative group ${
                                  msg.isOwn ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                                {msg.isOwn && msg.status && (
                                  <div className="flex justify-end mt-1">
                                    <span className="text-xs text-orange-100">{msg.status}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>
                  </>
                )}
              </>
            )}

            {/* Input Area */}
            {(activeTab === "group" || selectedContact) && (
              <div className="border-t border-border/50 p-3 bg-gradient-to-r from-orange-50/50 to-amber-50/50">
                <div className="space-y-2">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder={`Message ${activeTab === "group" ? "team" : "contact"}...`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                        className="min-h-[40px] max-h-[100px] resize-none text-sm"
                      />
                    </div>
                    <div>
                      <Button
                        onClick={sendMessage}
                        disabled={!message.trim()}
                        className="h-10 w-10 p-0 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Camera className="w-3 h-3" />
                        </Button>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Mic className="w-3 h-3" />
                        </Button>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                          <Smile className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Wrench className="w-3 h-3" />
                      <span>Handyman</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
