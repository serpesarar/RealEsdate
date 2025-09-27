export class WebSocketClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 1000

  connect(userId: string): void {
    try {
      this.ws = new WebSocket(`wss://api.propertyflow.com/ws?userId=${userId}`)

      this.ws.onopen = () => {
        console.log("[v0] WebSocket connected")
        this.reconnectAttempts = 0
      }

      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.handleMessage(data)
      }

      this.ws.onclose = () => {
        console.log("[v0] WebSocket disconnected")
        this.attemptReconnect(userId)
      }

      this.ws.onerror = (error) => {
        console.error("[v0] WebSocket error:", error)
      }
    } catch (error) {
      console.error("[v0] WebSocket connection failed:", error)
    }
  }

  private attemptReconnect(userId: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`[v0] Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect(userId)
      }, this.reconnectDelay * this.reconnectAttempts)
    }
  }

  private handleMessage(data: any): void {
    switch (data.type) {
      case "job_update":
        this.handleJobUpdate(data.payload)
        break
      case "chat_message":
        this.handleChatMessage(data.payload)
        break
      case "notification":
        this.handleNotification(data.payload)
        break
      case "system_update":
        this.handleSystemUpdate(data.payload)
        break
    }
  }

  private handleJobUpdate(payload: any): void {
    // Dispatch custom event for job updates
    window.dispatchEvent(new CustomEvent("jobUpdate", { detail: payload }))
  }

  private handleChatMessage(payload: any): void {
    // Dispatch custom event for chat messages
    window.dispatchEvent(new CustomEvent("chatMessage", { detail: payload }))
  }

  private handleNotification(payload: any): void {
    // Dispatch custom event for notifications
    window.dispatchEvent(new CustomEvent("notification", { detail: payload }))
  }

  private handleSystemUpdate(payload: any): void {
    // Handle system-wide updates
    console.log("[v0] System update received:", payload)
  }

  sendMessage(type: string, payload: any): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type, payload }))
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const wsClient = new WebSocketClient()
