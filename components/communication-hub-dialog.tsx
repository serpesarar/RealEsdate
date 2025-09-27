"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Send, Clock, CheckCircle2, Phone, Mail } from "lucide-react"
import { useState } from "react"

interface CommunicationHubDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommunicationHubDialog({ open, onOpenChange }: CommunicationHubDialogProps) {
  const [message, setMessage] = useState("")

  const conversations = [
    {
      id: 1,
      name: "Property Management",
      lastMessage: "Your maintenance request has been scheduled for tomorrow at 2 PM.",
      time: "2 hours ago",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "Mike Johnson (Maintenance)",
      lastMessage: "I'll be there between 2-4 PM to fix the faucet.",
      time: "1 day ago",
      unread: 1,
      online: false,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "Property Management",
      message: "Hi Sarah! How can we help you today?",
      time: "9:00 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      message: "Hi! I reported a leaky faucet yesterday. Any updates?",
      time: "9:15 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "Property Management",
      message: "Yes, we've assigned Mike Johnson to handle this. He'll contact you shortly to schedule a time.",
      time: "9:20 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "Property Management",
      message: "Your maintenance request has been scheduled for tomorrow at 2 PM.",
      time: "11:30 AM",
      isOwn: false,
    },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Communication Hub
          </DialogTitle>
          <DialogDescription>Direct messaging with property management (Business hours: 9 AM - 6 PM)</DialogDescription>
        </DialogHeader>

        <div className="flex h-[600px]">
          {/* Conversations List */}
          <div className="w-1/3 border-r pr-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Conversations</h3>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  Business Hours
                </Badge>
              </div>

              {conversations.map((conv) => (
                <Card key={conv.id} className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {conv.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conv.online && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm truncate">{conv.name}</p>
                          <span className="text-xs text-muted-foreground">{conv.time}</span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                        {conv.unread > 0 && (
                          <Badge className="mt-2 bg-blue-500 text-white text-xs">{conv.unread} new</Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Emergency: (555) 911-HELP</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>urgent@propertyflow.com</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col pl-4">
            <div className="flex items-center gap-3 pb-4 border-b">
              <Avatar>
                <AvatarFallback>PM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Property Management</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Online • Usually responds within 1 hour</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] ${msg.isOwn ? "order-2" : "order-1"}`}>
                    <div className={`p-3 rounded-lg ${msg.isOwn ? "bg-blue-500 text-white" : "bg-muted"}`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                    <div
                      className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
                        msg.isOwn ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.isOwn && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Textarea
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 min-h-[60px] resize-none"
                />
                <Button size="sm" className="self-end">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Business hours: Monday-Friday 9 AM - 6 PM. Emergency issues call (555) 911-HELP
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
