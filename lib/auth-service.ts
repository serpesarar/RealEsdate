// Authentication and Session Management Service
export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone: string
  role: "owner" | "manager" | "tenant" | "handyman" | "accountant"
  propertyId?: string
  unitNumber?: string
  createdAt: string
  lastLogin?: string
}

export interface AuthSession {
  token: string
  user: User
  expiresAt: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegistrationData {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  referenceCode: string
}

class AuthService {
  private readonly SESSION_KEY = "propertyflow_session"
  private readonly TOKEN_EXPIRY_HOURS = 24

  // Generate a secure session token
  private generateToken(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `pf_${timestamp}_${random}`
  }

  // Calculate token expiry
  private getTokenExpiry(): string {
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + this.TOKEN_EXPIRY_HOURS)
    return expiry.toISOString()
  }

  // Store session in localStorage
  private storeSession(session: AuthSession): void {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(session))
    }
  }

  // Get session from localStorage
  getSession(): AuthSession | null {
    if (typeof window === "undefined") return null

    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY)
      if (!sessionData) return null

      const session: AuthSession = JSON.parse(sessionData)

      // Check if session is expired
      if (new Date(session.expiresAt) < new Date()) {
        this.clearSession()
        return null
      }

      return session
    } catch (error) {
      console.error("[v0] Error parsing session:", error)
      this.clearSession()
      return null
    }
  }

  // Clear session from localStorage
  clearSession(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.SESSION_KEY)
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getSession() !== null
  }

  // Get current user
  getCurrentUser(): User | null {
    const session = this.getSession()
    return session?.user || null
  }

  // Login user
  async login(credentials: LoginCredentials): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Login failed" }
      }

      // Create session
      const session: AuthSession = {
        token: this.generateToken(),
        user: data.user,
        expiresAt: this.getTokenExpiry(),
      }

      this.storeSession(session)

      return { success: true, user: data.user }
    } catch (error) {
      console.error("[v0] Login error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  // Register user
  async register(registrationData: RegistrationData): Promise<{ success: boolean; error?: string; user?: User }> {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      })

      const data = await response.json()

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" }
      }

      return { success: true, user: data.user }
    } catch (error) {
      console.error("[v0] Registration error:", error)
      return { success: false, error: "Network error. Please try again." }
    }
  }

  // Logout user
  async logout(): Promise<void> {
    try {
      // Call logout API to invalidate server-side session if needed
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    } catch (error) {
      console.error("[v0] Logout API error:", error)
    } finally {
      // Always clear local session
      this.clearSession()
      if (typeof window !== "undefined") {
        window.location.href = "/"
      }
    }
  }

  // Refresh session (extend expiry)
  refreshSession(): boolean {
    const session = this.getSession()
    if (!session) return false

    const refreshedSession: AuthSession = {
      ...session,
      expiresAt: this.getTokenExpiry(),
    }

    this.storeSession(refreshedSession)
    return true
  }
}

export const authService = new AuthService()
