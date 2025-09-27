// Pricing and Payment Management Service

export interface PricingTier {
  id: string
  name: string
  checksPerMonth: string
  price: number
  customPrice?: boolean
  features: string[]
}

export interface PaymentOption {
  id: string
  name: string
  description: string
  promoText?: string
  amount?: number
  refundable: boolean
  refundCondition?: string
}

export interface ScreeningPackage {
  id: string
  name: string
  basePrice: number
  features: string[]
  recommended?: boolean
}

export interface PricingConfiguration {
  propertyId: string
  paymentOption: string
  volumeTier: string
  customPricing?: {
    basicCheck: number
    standardCheck: number
    premiumCheck: number
  }
  billingSettings: {
    paymentMethod: "credit_card" | "ach" | "invoice"
    billingCycle: "per_screening" | "monthly" | "quarterly" | "annual"
    autoRecharge: boolean
    minimumBalance?: number
  }
}

export interface ScreeningCost {
  packageId: string
  basePrice: number
  volumeDiscount: number
  finalPrice: number
  paymentResponsibility: "landlord" | "tenant"
  refundable: boolean
}

export class PricingService {
  private pricingTiers: PricingTier[] = [
    {
      id: "tier1",
      name: "Starter",
      checksPerMonth: "1-10",
      price: 40,
      features: ["Standard pricing", "Basic support", "Monthly billing"],
    },
    {
      id: "tier2",
      name: "Professional",
      checksPerMonth: "11-50",
      price: 35,
      features: ["12.5% discount", "Priority support", "Flexible billing", "Bulk management tools"],
    },
    {
      id: "tier3",
      name: "Business",
      checksPerMonth: "51-100",
      price: 30,
      features: ["25% discount", "Dedicated support", "Custom billing", "Advanced analytics", "API access"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      checksPerMonth: "100+",
      price: 0, // Custom pricing
      customPrice: true,
      features: [
        "Custom pricing",
        "White-label options",
        "Dedicated account manager",
        "SLA guarantee",
        "Custom integrations",
      ],
    },
  ]

  private paymentOptions: PaymentOption[] = [
    {
      id: "landlord_pays",
      name: "Landlord Pays",
      description: "Property owner covers all screening costs",
      promoText: "Free application for tenants!",
      refundable: false,
    },
    {
      id: "tenant_pays",
      name: "Tenant Pays",
      description: "Applicant pays screening fee directly",
      amount: 45,
      refundable: false,
    },
    {
      id: "reimbursable",
      name: "Reimbursable",
      description: "Tenant pays upfront, refunded if approved",
      amount: 45,
      refundable: true,
      refundCondition: "lease_signing",
    },
  ]

  private screeningPackages: ScreeningPackage[] = [
    {
      id: "basic",
      name: "Basic Check",
      basePrice: 19,
      features: ["Credit Score", "Eviction History"],
    },
    {
      id: "standard",
      name: "Standard Check",
      basePrice: 35,
      features: ["Credit Report", "Criminal Background (7 years)", "Eviction History", "Sex Offender Registry"],
      recommended: true,
    },
    {
      id: "premium",
      name: "Premium Check",
      basePrice: 55,
      features: [
        "Full Credit Report",
        "Criminal Background (National)",
        "Eviction History",
        "Employment Verification",
        "Income Verification",
        "Previous Landlord References",
        "Social Media Scan",
      ],
    },
  ]

  getPricingTiers(): PricingTier[] {
    return this.pricingTiers
  }

  getPaymentOptions(): PaymentOption[] {
    return this.paymentOptions
  }

  getScreeningPackages(): ScreeningPackage[] {
    return this.screeningPackages
  }

  calculateScreeningCost(
    packageId: string,
    monthlyVolume: number,
    paymentOption: string,
    customPricing?: PricingConfiguration["customPricing"],
  ): ScreeningCost {
    const screeningPackage = this.screeningPackages.find((p) => p.id === packageId)
    if (!screeningPackage) {
      throw new Error(`Package ${packageId} not found`)
    }

    // Determine volume tier
    const volumeTier = this.getVolumeTier(monthlyVolume)
    const tierPricing = this.pricingTiers.find((t) => t.id === volumeTier)

    // Calculate base price
    let basePrice = screeningPackage.basePrice
    if (customPricing) {
      switch (packageId) {
        case "basic":
          basePrice = customPricing.basicCheck
          break
        case "standard":
          basePrice = customPricing.standardCheck
          break
        case "premium":
          basePrice = customPricing.premiumCheck
          break
      }
    }

    // Apply volume discount
    let volumeDiscount = 0
    let finalPrice = basePrice

    if (tierPricing && !tierPricing.customPrice) {
      const discountPercentage = this.getVolumeDiscountPercentage(volumeTier)
      volumeDiscount = basePrice * (discountPercentage / 100)
      finalPrice = basePrice - volumeDiscount
    }

    // Determine payment responsibility
    const paymentOpt = this.paymentOptions.find((p) => p.id === paymentOption)
    const paymentResponsibility = paymentOption === "landlord_pays" ? "landlord" : "tenant"

    return {
      packageId,
      basePrice,
      volumeDiscount,
      finalPrice,
      paymentResponsibility,
      refundable: paymentOpt?.refundable || false,
    }
  }

  private getVolumeTier(monthlyVolume: number): string {
    if (monthlyVolume <= 10) return "tier1"
    if (monthlyVolume <= 50) return "tier2"
    if (monthlyVolume <= 100) return "tier3"
    return "enterprise"
  }

  private getVolumeDiscountPercentage(tier: string): number {
    switch (tier) {
      case "tier1":
        return 0
      case "tier2":
        return 12.5
      case "tier3":
        return 25
      default:
        return 0
    }
  }

  async savePricingConfiguration(config: PricingConfiguration): Promise<boolean> {
    try {
      console.log(`[Pricing] Saving configuration for property ${config.propertyId}:`, config)

      // In real implementation:
      // await database.pricingConfigs.upsert(config)

      return true
    } catch (error) {
      console.error("Error saving pricing configuration:", error)
      return false
    }
  }

  async getPricingConfiguration(propertyId: string): Promise<PricingConfiguration | null> {
    try {
      console.log(`[Pricing] Fetching configuration for property ${propertyId}`)

      // In real implementation:
      // return await database.pricingConfigs.findByPropertyId(propertyId)

      // Mock default configuration
      return {
        propertyId,
        paymentOption: "tenant_pays",
        volumeTier: "tier1",
        billingSettings: {
          paymentMethod: "credit_card",
          billingCycle: "per_screening",
          autoRecharge: false,
        },
      }
    } catch (error) {
      console.error("Error fetching pricing configuration:", error)
      return null
    }
  }

  generatePricingQuote(
    monthlyVolume: number,
    packages: string[],
    paymentOption: string,
  ): {
    tier: PricingTier
    packages: Array<{
      package: ScreeningPackage
      cost: ScreeningCost
    }>
    totalMonthlyCost: number
    annualSavings?: number
  } {
    const tier = this.pricingTiers.find((t) => t.id === this.getVolumeTier(monthlyVolume))!

    const packageCosts = packages.map((packageId) => {
      const screeningPackage = this.screeningPackages.find((p) => p.id === packageId)!
      const cost = this.calculateScreeningCost(packageId, monthlyVolume, paymentOption)

      return {
        package: screeningPackage,
        cost,
      }
    })

    // Calculate average cost per screening
    const averageCost = packageCosts.reduce((sum, p) => sum + p.cost.finalPrice, 0) / packageCosts.length
    const totalMonthlyCost = averageCost * monthlyVolume

    // Calculate annual savings compared to tier1
    let annualSavings: number | undefined
    if (tier.id !== "tier1") {
      const tier1Cost = packageCosts.reduce((sum, p) => sum + p.cost.basePrice, 0) / packageCosts.length
      const tier1MonthlyCost = tier1Cost * monthlyVolume
      annualSavings = (tier1MonthlyCost - totalMonthlyCost) * 12
    }

    return {
      tier,
      packages: packageCosts,
      totalMonthlyCost,
      annualSavings,
    }
  }
}

// Export singleton instance
export const pricingService = new PricingService()
