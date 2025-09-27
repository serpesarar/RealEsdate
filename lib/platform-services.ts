// Platform Configuration (Backend Only - Not visible to users)
export const PLATFORM_SERVICES = {
  screening: {
    transUnion: {
      apiKey: "pk_live_demo_transunion_key_active", // Simulated active key
      apiSecret: "sk_live_demo_transunion_secret_active",
      baseCost: 32, // What we pay
      customerPrice: 40, // What we charge (25% markup)
      currency: "USD",
      status: "connected",
      lastChecked: new Date().toISOString(),
    },
    jumio: {
      apiKey: "pk_live_demo_jumio_key_active", // Simulated active key
      apiSecret: "sk_live_demo_jumio_secret_active",
      baseCost: 5,
      customerPrice: 8,
      status: "connected",
      lastChecked: new Date().toISOString(),
    },
    plaid: {
      apiKey: "pk_live_demo_plaid_key_active", // Simulated active key
      apiSecret: "sk_live_demo_plaid_secret_active",
      baseCost: 3,
      customerPrice: 5,
      status: "connected",
      lastChecked: new Date().toISOString(),
    },
  },
  payments: {
    stripe: {
      platformAccount: "acct_demo_platform_active", // Simulated active account
      feePercentage: 2.9,
      fixedFee: 0.3,
      status: "connected",
    },
  },
}

export interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expMonth: number
  expYear: number
  isDefault: boolean
}

export interface Transaction {
  id: string
  ownerId: string
  type: "background_check" | "id_verification" | "income_verification"
  amount: number
  status: "pending" | "completed" | "failed"
  chargeId: string
  propertyId?: string
  applicantId?: string
  createdAt: string
  completedAt?: string
}

export class PlatformBillingService {
  async getOwnerPaymentMethod(ownerId: string): Promise<PaymentMethod | null> {
    // Mock implementation - in real app would query database
    return {
      id: "pm_123",
      brand: "Visa",
      last4: "4242",
      expMonth: 12,
      expYear: 2025,
      isDefault: true,
    }
  }

  async checkServiceStatus(): Promise<{ [key: string]: boolean }> {
    // Simulate all services as operational
    return {
      transUnion: true,
      jumio: true,
      plaid: true,
      stripe: true,
    }
  }

  async chargeOwner(
    ownerId: string,
    amount: number,
    description: string,
    metadata: any,
  ): Promise<{ success: boolean; chargeId?: string; error?: string }> {
    try {
      console.log(`[Platform Stripe] Processing payment for owner ${ownerId}`)
      console.log(`[Platform Stripe] Amount: $${amount} for ${description}`)
      console.log(`[Platform Stripe] Using platform account: ${PLATFORM_SERVICES.payments.stripe.platformAccount}`)

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful charge with realistic charge ID
      const chargeId = `ch_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      console.log(`[Platform Stripe] Payment successful! Charge ID: ${chargeId}`)

      return {
        success: true,
        chargeId,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Payment failed",
      }
    }
  }

  async recordTransaction(transaction: Omit<Transaction, "id" | "createdAt">): Promise<string> {
    // Mock implementation - in real app would save to database
    const transactionId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    console.log(`[Mock DB] Recording transaction:`, {
      id: transactionId,
      ...transaction,
      createdAt: new Date().toISOString(),
    })

    return transactionId
  }

  async showConfirmationModal(options: {
    title: string
    message: string
    applicant: string
    service: string
  }): Promise<boolean> {
    // Mock confirmation - in real app would show actual modal
    console.log(`[Mock Confirmation] ${options.title}: ${options.message}`)
    return true // Auto-confirm for demo
  }

  getServicePrice(serviceType: keyof typeof PLATFORM_SERVICES.screening): number {
    const service = PLATFORM_SERVICES.screening[serviceType]
    return service?.customerPrice || 0
  }
}

export const platformBillingService = new PlatformBillingService()

export class PlatformAPIService {
  async callTransUnionAPI(applicantData: any): Promise<any> {
    console.log(`[Platform TransUnion] Using API key: ${PLATFORM_SERVICES.screening.transUnion.apiKey}`)
    console.log(`[Platform TransUnion] Processing background check for:`, applicantData)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return realistic mock data
    return {
      screeningId: `tu_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "completed",
      results: {
        creditScore: 720,
        criminalHistory: "clear",
        evictionHistory: "none",
        recommendation: "approved",
      },
      cost: PLATFORM_SERVICES.screening.transUnion.baseCost,
    }
  }

  async callJumioAPI(documentData: any): Promise<any> {
    console.log(`[Platform Jumio] Using API key: ${PLATFORM_SERVICES.screening.jumio.apiKey}`)
    console.log(`[Platform Jumio] Processing ID verification for:`, documentData)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      verificationId: `ju_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "verified",
      results: {
        identityVerified: true,
        documentAuthentic: true,
        faceMatch: true,
      },
      cost: PLATFORM_SERVICES.screening.jumio.baseCost,
    }
  }

  async callPlaidAPI(incomeData: any): Promise<any> {
    console.log(`[Platform Plaid] Using API key: ${PLATFORM_SERVICES.screening.plaid.apiKey}`)
    console.log(`[Platform Plaid] Processing income verification for:`, incomeData)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      verificationId: `pl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: "verified",
      results: {
        monthlyIncome: 5500,
        employmentStatus: "employed",
        incomeStability: "stable",
      },
      cost: PLATFORM_SERVICES.screening.plaid.baseCost,
    }
  }
}

export const platformAPIService = new PlatformAPIService()
