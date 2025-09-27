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
} from "lucide-react"

interface RoommateChatPanelProps {
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
}

interface Roommate {
  id: string
  name: string
  avatar: string
  status: "online" | "away" | "offline"
  room: string
}

export function RoommateChatPanel({ userRole }: RoommateChatPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("group")
  const [message, setMessage] = useState("")
  const [selectedRoommate, setSelectedRoommate] = useState<string | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const tabs = [
    { id: "group", icon: Users, label: "Group Chat", badge: 2 },
    { id: "individual", icon: User, label: "Individual", badge: 1 },
  ]

  const roommates: Roommate[] = [
    { id: "1", name: "Alex Chen", avatar: "AC", status: "online", room: "Room A" },
    { id: "2", name: "Maria Garcia", avatar: "MG", status: "away", room: "Room B" },
    { id: "3", name: "David Kim", avatar: "DK", status: "offline", room: "Room C" },
  ]

  const [groupMessages, setGroupMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "Alex Chen",
      message: "Hey everyone! Anyone up for ordering pizza tonight?",
      time: "6:30 PM",
      type: "text",
      avatar: "AC",
    },
    {
      id: "2",
      sender: "Maria Garcia",
      message: "Count me in! I'm thinking pepperoni and mushroom 🍕",
      time: "6:32 PM",
      type: "text",
      avatar: "MG",
    },
    {
      id: "3",
      sender: "You",
      message: "Sounds great! I'll handle the order. What time works for everyone?",
      time: "6:35 PM",
      type: "text",
      isOwn: true,
      status: "read",
    },
  ])

  const [individualMessages, setIndividualMessages] = useState<{ [key: string]: Message[] }>({
    "1": [
      {
        id: "1",
        sender: "Alex Chen",
        message: "Hey! Can you help me with the WiFi password? I forgot it again 😅",
        time: "5:15 PM",
        type: "text",
        avatar: "AC",
      },
      {
        id: "2",
        sender: "You",
        message: "It's 'RiversideGardens2024' - all one word with capital R and G",
        time: "5:17 PM",
        type: "text",
        isOwn: true,
        status: "read",
      },
    ],
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [groupMessages, individualMessages, selectedRoommate])

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
    }

    if (activeTab === "group") {
      setGroupMessages((prev) => [...prev, newMessage])
    } else if (selectedRoommate) {
      setIndividualMessages((prev) => ({
        ...prev,
        [selectedRoommate]: [...(prev[selectedRoommate] || []), newMessage],
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

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-[9999]">
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 border-4 border-white"
        >
          <div className="relative">
            <Users className="w-6 h-6" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full" />
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
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-teal-500/10 to-cyan-500/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Users className="w-5 h-5 text-teal-500" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-400 rounded-full" />
          </div>
          <div>
            <span className="font-bold text-sm bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              Roommate Chat
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageSquare className="w-3 h-3" />
              <span>Unit 4B</span>
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
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500" />
                )}
                <div className="relative z-10 flex items-center gap-1">
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.label}</span>
                  {tab.badge > 0 && (
                    <div className="bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
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
                <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-teal-500" />
                    <span className="text-sm font-medium text-teal-700">Unit 4B Group Chat</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {roommates.map((roommate) => (
                      <div key={roommate.id} className="flex items-center gap-1">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                            {roommate.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <Circle className={`w-2 h-2 ${getStatusColor(roommate.status)}`} />
                      </div>
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">
                      {roommates.filter((r) => r.status === "online").length} online
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
                                <AvatarFallback className="text-xs bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                                  {msg.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{msg.sender}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                          )}
                          <div
                            className={`p-3 rounded-2xl relative group ${
                              msg.isOwn ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                            {msg.isOwn && msg.status && (
                              <div className="flex justify-end mt-1">
                                <span className="text-xs text-teal-100">{msg.status}</span>
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
                {!selectedRoommate ? (
                  <ScrollArea className="flex-1 p-3">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">Select a roommate to chat</h3>
                      {roommates.map((roommate) => (
                        <div
                          key={roommate.id}
                          onClick={() => setSelectedRoommate(roommate.id)}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                        >
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                                {roommate.avatar}
                              </AvatarFallback>
                            </Avatar>
                            <Circle
                              className={`w-3 h-3 absolute -bottom-0.5 -right-0.5 ${getStatusColor(roommate.status)}`}
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{roommate.name}</div>
                            <div className="text-xs text-muted-foreground">{roommate.room}</div>
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
                    <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-border/50">
                      <div className="flex items-center gap-3">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRoommate(null)}
                          className="h-8 w-8 p-0"
                        >
                          ←
                        </Button>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                            {roommates.find((r) => r.id === selectedRoommate)?.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">
                            {roommates.find((r) => r.id === selectedRoommate)?.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {roommates.find((r) => r.id === selectedRoommate)?.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Individual Messages */}
                    <ScrollArea className="flex-1 p-3">
                      <div className="space-y-4">
                        {(individualMessages[selectedRoommate] || []).map((msg, index) => (
                          <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                            <div className={`max-w-[85%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                              <div
                                className={`p-3 rounded-2xl relative group ${
                                  msg.isOwn ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white" : "bg-muted"
                                }`}
                              >
                                <p className="text-sm">{msg.message}</p>
                                {msg.isOwn && msg.status && (
                                  <div className="flex justify-end mt-1">
                                    <span className="text-xs text-teal-100">{msg.status}</span>
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
            {(activeTab === "group" || selectedRoommate) && (
              <div className="border-t border-border/50 p-3 bg-gradient-to-r from-teal-50/50 to-cyan-50/50">
                <div className="space-y-2">
                  <div className="flex items-end gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        placeholder={`Message ${activeTab === "group" ? "group" : "roommate"}...`}
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
                        className="h-10 w-10 p-0 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
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
                      <span>Unit 4B</span>
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
