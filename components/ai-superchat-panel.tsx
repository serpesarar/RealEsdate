"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
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
  AlertCircle,
  Bot,
  Sparkles,
  Smile,
  FileText,
  ImageIcon,
  Paperclip,
  Search,
  Volume2,
  Play,
  Pause,
  MoreHorizontal,
  Eye,
  EyeOff,
  Lightbulb,
  TrendingUp,
  CheckCheck,
  Wand2,
} from "lucide-react"

interface ChatPanelProps {
  userRole: string
}

interface Message {
  id: string
  sender: string
  message: string
  time: string
  type: "text" | "voice" | "image" | "system" | "ai" | "suggestion"
  avatar?: string
  reactions?: { emoji: string; count: number; users: string[] }[]
  isOwn?: boolean
  aiGenerated?: boolean
  priority?: "low" | "medium" | "high"
  status?: "sent" | "delivered" | "read"
  voiceDuration?: number
  isPlaying?: boolean
  attachments?: { type: string; name: string; url: string }[]
  aiSuggestions?: string[]
  sentiment?: "positive" | "neutral" | "negative"
  urgencyScore?: number
}

export function AiSuperchatPanel({ userRole }: ChatPanelProps) {
  const [isMinimized, setIsMinimized] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState("ai-assistant")
  const [message, setMessage] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [showAiSuggestions, setShowAiSuggestions] = useState(true)
  const [isTyping, setIsTyping] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [smartMode, setSmartMode] = useState(true)
  const [currentPlayingId, setCurrentPlayingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [showEmojis, setShowEmojis] = useState(false)
  const [isIncognito, setIsIncognito] = useState(false)
  const [aiPersonality, setAiPersonality] = useState("professional")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recordingRef = useRef<HTMLDivElement>(null)

  const tabs = [
    {
      id: "ai-assistant",
      icon: Bot,
      label: "AI Assistant",
      badge: 0,
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
    },
    { id: "team", icon: Users, label: "Team", badge: 3, color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
    {
      id: "emergency",
      icon: AlertCircle,
      label: "Emergency",
      badge: 1,
      color: "bg-gradient-to-r from-red-500 to-orange-500",
    },
    {
      id: "smart-insights",
      icon: TrendingUp,
      label: "Insights",
      badge: 2,
      color: "bg-gradient-to-r from-green-500 to-emerald-500",
    },
    ...(userRole === "owner" || userRole === "manager"
      ? [
          {
            id: "tenants",
            icon: Building2,
            label: "Tenants",
            badge: 0,
            color: "bg-gradient-to-r from-indigo-500 to-purple-500",
          },
        ]
      : []),
    { id: "jobs", icon: Wrench, label: "Jobs", badge: 2, color: "bg-gradient-to-r from-yellow-500 to-orange-500" },
  ]

  const aiSuggestions = [
    "Schedule maintenance for next week",
    "Check inventory levels for plumbing supplies",
    "Generate monthly report",
    "Find available contractors",
    "Analyze tenant satisfaction scores",
    "Predict upcoming maintenance needs",
  ]

  const quickActions = [
    { icon: Camera, label: "Photo", action: () => console.log("Photo") },
    { icon: Mic, label: "Voice", action: () => setIsRecording(!isRecording) },
    { icon: MapPin, label: "Location", action: () => console.log("Location") },
    { icon: Calendar, label: "Schedule", action: () => console.log("Schedule") },
    { icon: FileText, label: "Document", action: () => console.log("Document") },
    { icon: Paperclip, label: "Attach", action: () => console.log("Attach") },
  ]

  const emojis = ["😊", "👍", "❤️", "🔥", "💯", "🎉", "👏", "🚀", "⚡", "✨", "🎯", "💡"]

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "AI Assistant",
      message:
        "Hello! I'm your AI-powered property management assistant. I can help you with maintenance scheduling, tenant communications, predictive analytics, and much more. What would you like to accomplish today?",
      time: "9:00 AM",
      type: "ai",
      avatar: "AI",
      aiGenerated: true,
      aiSuggestions: ["Schedule maintenance", "Check tenant requests", "Generate reports", "Analyze trends"],
      sentiment: "positive",
    },
    {
      id: "2",
      sender: "Sarah Manager",
      message:
        "Good morning team! The AI just flagged a potential HVAC issue in Building A based on energy consumption patterns. Should we schedule a preventive check?",
      time: "9:15 AM",
      type: "text",
      avatar: "SM",
      reactions: [{ emoji: "👍", count: 2, users: ["Mike", "Lisa"] }],
      priority: "medium",
      status: "read",
    },
    {
      id: "3",
      sender: "Mike Handyman",
      message: "I can check it this afternoon. The AI's predictions have been spot-on lately!",
      time: "9:18 AM",
      type: "voice",
      avatar: "MH",
      voiceDuration: 8,
      status: "delivered",
    },
    {
      id: "4",
      sender: "AI Assistant",
      message:
        "Based on historical data, I predict a 78% chance of HVAC failure within 2 weeks if not addressed. I've automatically scheduled Mike for a 2-hour maintenance window and ordered the likely needed parts. Estimated cost savings: $2,400 vs emergency repair.",
      time: "9:20 AM",
      type: "ai",
      avatar: "AI",
      aiGenerated: true,
      priority: "high",
      sentiment: "neutral",
      urgencyScore: 7.8,
    },
  ])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate AI response
    if (activeTab === "ai-assistant") {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "AI Assistant",
          message: generateAiResponse(message),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "ai",
          avatar: "AI",
          aiGenerated: true,
          sentiment: "positive",
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1500)
    }
  }

  const generateAiResponse = (userMessage: string): string => {
    const responses = [
      "I've analyzed your request and found 3 optimal solutions. Would you like me to implement the most cost-effective one?",
      "Based on current data patterns, I recommend scheduling this for next Tuesday at 2 PM for maximum efficiency.",
      "I've cross-referenced this with similar properties and found a 23% improvement opportunity. Shall I create an action plan?",
      "Great question! I've processed 847 similar cases and can provide you with the best practices used by top-performing properties.",
      "I've detected this might be urgent based on the language patterns. I'm escalating this to priority queue and notifying relevant team members.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const addReaction = (messageId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReaction = msg.reactions?.find((r) => r.emoji === emoji)
          if (existingReaction) {
            return {
              ...msg,
              reactions: msg.reactions?.map((r) =>
                r.emoji === emoji ? { ...r, count: r.count + 1, users: [...r.users, "You"] } : r,
              ),
            }
          } else {
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { emoji, count: 1, users: ["You"] }],
            }
          }
        }
        return msg
      }),
    )
  }

  const toggleVoicePlayback = (messageId: string) => {
    setCurrentPlayingId(currentPlayingId === messageId ? null : messageId)
  }

  if (isMinimized) {
    return (
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-16 h-16 shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-4 border-white"
        >
          <div className="relative">
            <Bot className="w-6 h-6" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </div>
        </Button>
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`fixed bottom-0 right-4 z-50 bg-card/95 backdrop-blur-xl border border-border/50 rounded-t-2xl shadow-2xl transition-all duration-500 ${
        isCollapsed ? "h-16" : "h-[600px]"
      } w-96`}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bot className="w-5 h-5 text-purple-500" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            />
          </div>
          <div>
            <span className="font-bold text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI SuperChat
            </span>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Sparkles className="w-3 h-3" />
              <span>Smart Mode {smartMode ? "ON" : "OFF"}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSmartMode(!smartMode)}
            className={`h-7 w-7 p-0 ${smartMode ? "text-purple-500" : "text-muted-foreground"}`}
          >
            <Wand2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsIncognito(!isIncognito)}
            className={`h-7 w-7 p-0 ${isIncognito ? "text-orange-500" : "text-muted-foreground"}`}
          >
            {isIncognito ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
          </Button>
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
          {/* Enhanced Tabs */}
          <div className="flex border-b border-border/50 bg-muted/30">
            <ScrollArea className="w-full">
              <div className="flex">
                {tabs.map((tab) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 flex items-center justify-center gap-1 p-3 text-xs font-medium transition-all relative ${
                      activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-foreground"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        className={`absolute inset-0 rounded-lg ${tab.color}`}
                        layoutId="activeTab"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <div className="relative z-10 flex items-center gap-1">
                      <tab.icon className="w-3 h-3" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.badge > 0 && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                        >
                          {tab.badge}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col h-[480px]">
            {/* AI Suggestions Bar */}
            {showAiSuggestions && activeTab === "ai-assistant" && (
              <motion.div
                className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-border/50"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-3 h-3 text-purple-500" />
                  <span className="text-xs font-medium text-purple-700">AI Suggestions</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAiSuggestions(false)}
                    className="h-4 w-4 p-0 ml-auto"
                  >
                    <ChevronUp className="w-3 h-3" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setMessage(suggestion)}
                      className="text-xs bg-white/80 hover:bg-white border border-purple-200 rounded-full px-2 py-1 text-purple-700 hover:text-purple-800 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-3">
              <AnimatePresence>
                <div className="space-y-4">
                  {messages
                    .filter(
                      (msg) => searchQuery === "" || msg.message.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                      >
                        <div className={`max-w-[85%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                          {/* Message Header */}
                          {!msg.isOwn && (
                            <div className="flex items-center gap-2 mb-1">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="text-xs bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                                  {msg.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs font-medium">{msg.sender}</span>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                              {msg.aiGenerated && (
                                <Badge
                                  variant="outline"
                                  className="bg-purple-50 text-purple-700 border-purple-200 text-xs"
                                >
                                  <Sparkles className="w-2 h-2 mr-1" />
                                  AI
                                </Badge>
                              )}
                              {msg.priority && (
                                <Badge
                                  variant="outline"
                                  className={`text-xs ${
                                    msg.priority === "high"
                                      ? "bg-red-50 text-red-700 border-red-200"
                                      : msg.priority === "medium"
                                        ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        : "bg-green-50 text-green-700 border-green-200"
                                  }`}
                                >
                                  {msg.priority}
                                </Badge>
                              )}
                            </div>
                          )}

                          {/* Message Content */}
                          <motion.div
                            className={`p-3 rounded-2xl relative group ${
                              msg.isOwn
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                                : msg.type === "ai"
                                  ? "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200"
                                  : "bg-muted"
                            }`}
                            whileHover={{ scale: 1.02 }}
                          >
                            {msg.type === "voice" ? (
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleVoicePlayback(msg.id)}
                                  className="h-6 w-6 p-0"
                                >
                                  {currentPlayingId === msg.id ? (
                                    <Pause className="w-3 h-3" />
                                  ) : (
                                    <Play className="w-3 h-3" />
                                  )}
                                </Button>
                                <div className="flex-1 h-1 bg-muted-foreground/20 rounded-full overflow-hidden">
                                  <motion.div
                                    className="h-full bg-purple-500"
                                    initial={{ width: "0%" }}
                                    animate={{ width: currentPlayingId === msg.id ? "100%" : "0%" }}
                                    transition={{ duration: msg.voiceDuration || 5 }}
                                  />
                                </div>
                                <span className="text-xs text-muted-foreground">{msg.voiceDuration}s</span>
                              </div>
                            ) : (
                              <div>
                                <p className="text-sm">{msg.message}</p>
                                {msg.urgencyScore && (
                                  <div className="mt-2 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3 text-orange-500" />
                                    <span className="text-xs text-orange-600">
                                      Urgency Score: {msg.urgencyScore}/10
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}

                            {/* Message Status */}
                            {msg.isOwn && msg.status && (
                              <div className="flex justify-end mt-1">
                                {msg.status === "read" && <CheckCheck className="w-3 h-3 text-green-300" />}
                                {msg.status === "delivered" && <CheckCheck className="w-3 h-3 text-white/70" />}
                                {msg.status === "sent" && <CheckCheck className="w-3 h-3 text-white/50" />}
                              </div>
                            )}

                            {/* Hover Actions */}
                            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="flex flex-col gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setShowEmojis(!showEmojis)}
                                  className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50"
                                >
                                  <Smile className="w-3 h-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0 bg-white shadow-md hover:bg-gray-50"
                                >
                                  <MoreHorizontal className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>

                          {/* AI Suggestions */}
                          {msg.aiSuggestions && (
                            <motion.div
                              className="mt-2 space-y-1"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                            >
                              {msg.aiSuggestions.map((suggestion, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={() => setMessage(suggestion)}
                                  className="block w-full text-left text-xs bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg px-2 py-1 text-purple-700 transition-colors"
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  💡 {suggestion}
                                </motion.button>
                              ))}
                            </motion.div>
                          )}

                          {/* Reactions */}
                          {msg.reactions && msg.reactions.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {msg.reactions.map((reaction, idx) => (
                                <motion.button
                                  key={idx}
                                  onClick={() => addReaction(msg.id, reaction.emoji)}
                                  className="flex items-center gap-1 bg-white/80 hover:bg-white border border-gray-200 rounded-full px-2 py-1 text-xs transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <span>{reaction.emoji}</span>
                                  <span>{reaction.count}</span>
                                </motion.button>
                              ))}
                            </div>
                          )}

                          {/* Emoji Picker */}
                          {showEmojis && (
                            <motion.div
                              className="mt-2 p-2 bg-white border border-gray-200 rounded-lg shadow-lg"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              <div className="grid grid-cols-6 gap-1">
                                {emojis.map((emoji, idx) => (
                                  <motion.button
                                    key={idx}
                                    onClick={() => {
                                      addReaction(msg.id, emoji)
                                      setShowEmojis(false)
                                    }}
                                    className="p-1 hover:bg-gray-100 rounded text-sm"
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    {emoji}
                                  </motion.button>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </AnimatePresence>
            </ScrollArea>

            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  className="px-3 py-2"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-1 h-1 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0 }}
                      />
                      <motion.div
                        className="w-1 h-1 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1 h-1 bg-purple-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, delay: 0.4 }}
                      />
                    </div>
                    <span>AI is thinking...</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Recording Indicator */}
            <AnimatePresence>
              {isRecording && (
                <motion.div
                  ref={recordingRef}
                  className="px-3 py-2 bg-red-50 border-t border-red-200"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="w-3 h-3 bg-red-500 rounded-full"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1 }}
                    />
                    <span className="text-sm text-red-700">Recording voice message...</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsRecording(false)}
                      className="ml-auto h-6 text-red-700"
                    >
                      Stop
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="border-t border-border/50 p-3 bg-gradient-to-r from-purple-50/50 to-pink-50/50">
              {/* Search Bar */}
              {searchQuery !== "" && (
                <div className="mb-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 text-muted-foreground" />
                    <Input
                      placeholder="Search messages..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-7 h-7 text-xs"
                    />
                  </div>
                </div>
              )}

              {/* Main Input */}
              <div className="space-y-2">
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder={`Message ${activeTab === "ai-assistant" ? "AI Assistant" : "team"}...`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      className="min-h-[40px] max-h-[100px] resize-none pr-10 text-sm"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSearchQuery(searchQuery === "" ? " " : "")}
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                    >
                      <Search className="w-3 h-3" />
                    </Button>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="h-10 w-10 p-0 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {quickActions.slice(0, 4).map((action, index) => (
                      <motion.div key={index} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={action.action}
                          className={`h-7 w-7 p-0 ${
                            action.label === "Voice" && isRecording ? "text-red-500 bg-red-50" : ""
                          }`}
                        >
                          {action.icon === ImageIcon ? (
                            <ImageIcon className="w-3 h-3" />
                          ) : (
                            <action.icon className="w-3 h-3" />
                          )}
                        </Button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    {voiceEnabled && <Volume2 className="w-3 h-3" />}
                    {isIncognito && <EyeOff className="w-3 h-3" />}
                    {smartMode && <Sparkles className="w-3 h-3 text-purple-500" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
