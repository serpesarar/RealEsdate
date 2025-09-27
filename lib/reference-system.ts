export interface ReferenceCode {
  id: string
  code: string
  type: "tenant" | "handyman" | "manager" | "contractor"
  createdBy: string
  createdAt: Date
  expiresAt?: Date
  isUsed: boolean
  usedBy?: string
  usedAt?: Date
  metadata: {
    propertyId?: string
    unitNumber?: string
    monthlyRent?: number
    leaseStartDate?: Date
    leaseDuration?: number
    specializations?: string[]
    notes?: string
  }
}

export interface UserReference {
  id: string
  userId: string
  referenceCodeId: string
  createdBy: string
  userType: "tenant" | "handyman" | "manager" | "contractor"
  permissions: string[]
  connectedUsers: string[]
  metadata: Record<string, any>
}

// Generate a unique reference code
export function generateReferenceCode(type: string): string {
  const prefix = type.toUpperCase().substring(0, 2)
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `${prefix}-${timestamp}-${random}`
}

// Validate reference code format
export function validateReferenceCodeFormat(code: string): boolean {
  const pattern = /^[A-Z]{2}-[A-Z0-9]+-[A-Z0-9]+$/
  return pattern.test(code)
}

// Mock database functions (replace with actual database calls)
export class ReferenceCodeService {
  private static codes: ReferenceCode[] = []
  private static userReferences: UserReference[] = []

  static async createReferenceCode(
    type: "tenant" | "handyman" | "manager" | "contractor",
    createdBy: string,
    metadata: ReferenceCode["metadata"],
    expiresInDays?: number,
  ): Promise<ReferenceCode> {
    const code = generateReferenceCode(type)
    const expiresAt = expiresInDays ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) : undefined

    const referenceCode: ReferenceCode = {
      id: Math.random().toString(36).substring(2),
      code,
      type,
      createdBy,
      createdAt: new Date(),
      expiresAt,
      isUsed: false,
      metadata,
    }

    this.codes.push(referenceCode)
    return referenceCode
  }

  static async validateReferenceCode(code: string): Promise<ReferenceCode | null> {
    const referenceCode = this.codes.find((rc) => rc.code === code && !rc.isUsed)

    if (!referenceCode) return null

    // Check if expired
    if (referenceCode.expiresAt && referenceCode.expiresAt < new Date()) {
      return null
    }

    return referenceCode
  }

  static async markReferenceCodeAsUsed(code: string, userId: string): Promise<UserReference | null> {
    const referenceCode = await this.validateReferenceCode(code)
    if (!referenceCode) return null

    // Mark as used
    referenceCode.isUsed = true
    referenceCode.usedBy = userId
    referenceCode.usedAt = new Date()

    // Create user reference
    const userReference: UserReference = {
      id: Math.random().toString(36).substring(2),
      userId,
      referenceCodeId: referenceCode.id,
      createdBy: referenceCode.createdBy,
      userType: referenceCode.type,
      permissions: this.getDefaultPermissions(referenceCode.type),
      connectedUsers: [referenceCode.createdBy],
      metadata: referenceCode.metadata,
    }

    this.userReferences.push(userReference)
    return userReference
  }

  static async getUserReference(userId: string): Promise<UserReference | null> {
    return this.userReferences.find((ur) => ur.userId === userId) || null
  }

  static async getCreatedCodes(createdBy: string): Promise<ReferenceCode[]> {
    return this.codes.filter((rc) => rc.createdBy === createdBy)
  }

  private static getDefaultPermissions(type: string): string[] {
    switch (type) {
      case "tenant":
        return ["view_own_issues", "create_issues", "view_own_payments", "view_own_lease"]
      case "handyman":
        return ["view_assigned_issues", "update_issue_status", "upload_photos", "submit_reports"]
      case "manager":
        return ["view_all_properties", "manage_tenants", "assign_issues", "generate_reports"]
      case "contractor":
        return ["view_assigned_issues", "update_issue_status", "submit_invoices", "manage_schedule"]
      default:
        return []
    }
  }
}
