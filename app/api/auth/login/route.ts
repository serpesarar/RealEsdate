import { type NextRequest, NextResponse } from "next/server"
import type { User } from "@/lib/auth-service"

// Mock user database - In production, this would be a real database
const mockUsers: User[] = [
  {
    id: "1",
    email: "manager@propertyflow.com",
    firstName: "John",
    lastName: "Manager",
    phone: "+1 (555) 123-4567",
    role: "manager",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    email: "tenant@propertyflow.com",
    firstName: "Jane",
    lastName: "Tenant",
    phone: "+1 (555) 987-6543",
    role: "tenant",
    propertyId: "prop-123",
    unitNumber: "4B",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    email: "owner@propertyflow.com",
    firstName: "Robert",
    lastName: "Owner",
    phone: "+1 (555) 555-0123",
    role: "owner",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    email: "m.canodacioglu@gmail.com",
    firstName: "Mehmet",
    lastName: "Canodacıoğlu",
    phone: "+90 (555) 000-0000",
    role: "owner",
    createdAt: "2024-01-01T00:00:00Z",
  },
]

// Mock password verification - In production, use proper password hashing
const verifyPassword = (email: string, password: string): boolean => {
  // For demo purposes, accept any password for existing users
  return mockUsers.some((user) => user.email === email)
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user by email
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    if (!verifyPassword(email, password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // Update last login
    user.lastLogin = new Date().toISOString()

    return NextResponse.json({
      success: true,
      user,
    })
  } catch (error) {
    console.error("[v0] Login API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
