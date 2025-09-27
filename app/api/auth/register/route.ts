import { type NextRequest, NextResponse } from "next/server"
import { ReferenceCodeService } from "@/lib/reference-system"
import type { User } from "@/lib/auth-service"

// Mock user database - In production, this would be a real database
const mockUsers: User[] = []

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, referenceCode } = await request.json()

    if (!firstName || !lastName || !email || !phone || !password || !referenceCode) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Validate reference code
    const validatedReference = await ReferenceCodeService.validateReferenceCode(referenceCode)
    if (!validatedReference) {
      return NextResponse.json({ error: "Invalid or expired reference code" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substring(2),
      email: email.toLowerCase(),
      firstName,
      lastName,
      phone,
      role: validatedReference.type as User["role"],
      propertyId: validatedReference.metadata.propertyId,
      unitNumber: validatedReference.metadata.unitNumber,
      createdAt: new Date().toISOString(),
    }

    // Add to mock database
    mockUsers.push(newUser)

    await ReferenceCodeService.markReferenceCodeAsUsed(referenceCode, newUser.id)

    return NextResponse.json({
      success: true,
      user: newUser,
    })
  } catch (error) {
    console.error("[v0] Registration API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
