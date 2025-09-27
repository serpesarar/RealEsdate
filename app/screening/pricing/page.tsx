"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Shield, CheckCircle, Star, Calculator, Building, Users, Zap } from "lucide-react"
import { pricingService, type PricingConfiguration } from "@/lib/pricing-service"

export default function PricingManagement() {
  const [monthlyVolume, setMonthlyVolume] = useState(25)
  const [selectedPackages, setSelectedPackages] = useState(["standard"])
  const [paymentOption, setPaymentOption] = useState("tenant_pays")
  const [customPricing, setCustomPricing] = useState(false)
  const [customRates, setCustomRates] = useState({
    basicCheck: 19,
    standardCheck: 35,
    premiumCheck: 55,
  })

  const [pricingConfig, setPricingConfig] = useState<PricingConfiguration>({
    propertyId: "property_123",
    paymentOption: "tenant_pays",
    volumeTier: "tier1",
    billingSettings: {
      paymentMethod: "credit_card",
      billingCycle: "per_screening",
      autoRecharge: false,
    },
  })

  const pricingTiers = pricingService.getPricingTiers()
  const paymentOptions = pricingService.getPaymentOptions()
  const screeningPackages = pricingService.getScreeningPackages()

  const quote = pricingService.generatePricingQuote(monthlyVolume, selectedPackages, paymentOption)

  const handleSaveConfiguration = async () => {
    const config: PricingConfiguration = {
      ...pricingConfig,
      paymentOption,
      volumeTier: quote.tier.id,
      customPricing: customPricing ? customRates : undefined,
    }

    const success = await pricingService.savePricingConfiguration(config)
    if (success) {
      alert("Pricing configuration saved successfully!")
    } else {
      alert("Failed to save pricing configuration")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Pricing Management</h1>
              <p className="text-muted-foreground">Configure screening costs and payment options</p>
            </div>
            <div className="flex items-center space-x-4">
              <Card className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-0">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Current Tier</p>
                      <p className="text-xs text-muted-foreground">{quote.tier.name}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Tabs defaultValue="calculator" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calculator">Pricing Calculator</TabsTrigger>
              <TabsTrigger value="configuration">Configuration</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="calculator" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-1 space-y-6">
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Calculator className="w-5 h-5" />
                        <span>Pricing Calculator</span>
                      </CardTitle>
                      <CardDescription>Estimate your screening costs</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="volume">Monthly Screening Volume</Label>
                        <Input
                          id="volume"
                          type="number"
                          value={monthlyVolume}
                          onChange={(e) => setMonthlyVolume(Number(e.target.value))}
                          min="1"
                          max="1000"
                          className="bg-white/50 dark:bg-slate-700/50"
                        />
                        <p className="text-xs text-muted-foreground">Number of background checks per month</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Payment Responsibility</Label>
                        <Select value={paymentOption} onValueChange={setPaymentOption}>
                          <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {paymentOptions.map((option) => (
                              <SelectItem key={option.id} value={option.id}>
                                <div>
                                  <div className="font-medium">{option.name}</div>
                                  <div className="text-xs text-muted-foreground">{option.description}</div>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>Screening Packages</Label>
                        <div className="space-y-2">
                          {screeningPackages.map((pkg) => (
                            <div key={pkg.id} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                id={pkg.id}
                                checked={selectedPackages.includes(pkg.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedPackages([...selectedPackages, pkg.id])
                                  } else {
                                    setSelectedPackages(selectedPackages.filter((p) => p !== pkg.id))
                                  }
                                }}
                              />
                              <Label htmlFor={pkg.id} className="flex-1">
                                <div className="flex items-center justify-between">
                                  <span>{pkg.name}</span>
                                  <span className="text-sm text-muted-foreground">${pkg.basePrice}</span>
                                </div>
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="custom">Custom Pricing</Label>
                        <Switch id="custom" checked={customPricing} onCheckedChange={setCustomPricing} />
                      </div>

                      {customPricing && (
                        <div className="space-y-3 p-3 bg-muted/20 rounded-lg">
                          <div className="space-y-2">
                            <Label htmlFor="basicRate">Basic Check Rate</Label>
                            <Input
                              id="basicRate"
                              type="number"
                              value={customRates.basicCheck}
                              onChange={(e) =>
                                setCustomRates((prev) => ({ ...prev, basicCheck: Number(e.target.value) }))
                              }
                              className="bg-white/50 dark:bg-slate-700/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="standardRate">Standard Check Rate</Label>
                            <Input
                              id="standardRate"
                              type="number"
                              value={customRates.standardCheck}
                              onChange={(e) =>
                                setCustomRates((prev) => ({ ...prev, standardCheck: Number(e.target.value) }))
                              }
                              className="bg-white/50 dark:bg-slate-700/50"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="premiumRate">Premium Check Rate</Label>
                            <Input
                              id="premiumRate"
                              type="number"
                              value={customRates.premiumCheck}
                              onChange={(e) =>
                                setCustomRates((prev) => ({ ...prev, premiumCheck: Number(e.target.value) }))
                              }
                              className="bg-white/50 dark:bg-slate-700/50"
                            />
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Results Panel */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Volume Tier */}
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Your Volume Tier: {quote.tier.name}</span>
                        {quote.tier.id !== "tier1" && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Savings Tier
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription>{quote.tier.checksPerMonth} screenings per month</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Features Included:</h4>
                          <ul className="space-y-1">
                            {quote.tier.features.map((feature, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Cost Summary:</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Monthly Volume:</span>
                              <span>{monthlyVolume} screenings</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Estimated Monthly Cost:</span>
                              <span className="font-semibold">${quote.totalMonthlyCost.toFixed(2)}</span>
                            </div>
                            {quote.annualSavings && (
                              <div className="flex justify-between text-green-600">
                                <span>Annual Savings:</span>
                                <span className="font-semibold">${quote.annualSavings.toFixed(2)}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Package Breakdown */}
                  <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                    <CardHeader>
                      <CardTitle>Package Pricing Breakdown</CardTitle>
                      <CardDescription>Cost per screening by package type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {quote.packages.map(({ package: pkg, cost }) => (
                          <div key={pkg.id} className="p-4 border rounded-lg bg-muted/20">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold">{pkg.name}</h4>
                                {pkg.recommended && (
                                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                    <Star className="w-3 h-3 mr-1" />
                                    Recommended
                                  </Badge>
                                )}
                              </div>
                              <div className="text-right">
                                {cost.volumeDiscount > 0 && (
                                  <div className="text-sm text-muted-foreground line-through">
                                    ${cost.basePrice.toFixed(2)}
                                  </div>
                                )}
                                <div className="text-lg font-bold">${cost.finalPrice.toFixed(2)}</div>
                                {cost.volumeDiscount > 0 && (
                                  <div className="text-xs text-green-600">Save ${cost.volumeDiscount.toFixed(2)}</div>
                                )}
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="text-muted-foreground">Payment:</span>
                                <span className="ml-2 capitalize">{cost.paymentResponsibility}</span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Refundable:</span>
                                <span className="ml-2">{cost.refundable ? "Yes" : "No"}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="configuration" className="space-y-6">
              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle>Billing Configuration</CardTitle>
                  <CardDescription>Set up payment methods and billing preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <Select
                        value={pricingConfig.billingSettings.paymentMethod}
                        onValueChange={(value: any) =>
                          setPricingConfig((prev) => ({
                            ...prev,
                            billingSettings: { ...prev.billingSettings, paymentMethod: value },
                          }))
                        }
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit_card">Credit Card</SelectItem>
                          <SelectItem value="ach">ACH Transfer</SelectItem>
                          <SelectItem value="invoice">Invoice</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Billing Cycle</Label>
                      <Select
                        value={pricingConfig.billingSettings.billingCycle}
                        onValueChange={(value: any) =>
                          setPricingConfig((prev) => ({
                            ...prev,
                            billingSettings: { ...prev.billingSettings, billingCycle: value },
                          }))
                        }
                      >
                        <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="per_screening">Per Screening</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annual">Annual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoRecharge">Auto-Recharge</Label>
                      <p className="text-sm text-muted-foreground">Automatically add funds when balance is low</p>
                    </div>
                    <Switch
                      id="autoRecharge"
                      checked={pricingConfig.billingSettings.autoRecharge}
                      onCheckedChange={(checked) =>
                        setPricingConfig((prev) => ({
                          ...prev,
                          billingSettings: { ...prev.billingSettings, autoRecharge: checked },
                        }))
                      }
                    />
                  </div>

                  {pricingConfig.billingSettings.autoRecharge && (
                    <div className="space-y-2">
                      <Label htmlFor="minBalance">Minimum Balance Threshold</Label>
                      <Input
                        id="minBalance"
                        type="number"
                        placeholder="100"
                        value={pricingConfig.billingSettings.minimumBalance || ""}
                        onChange={(e) =>
                          setPricingConfig((prev) => ({
                            ...prev,
                            billingSettings: {
                              ...prev.billingSettings,
                              minimumBalance: Number(e.target.value),
                            },
                          }))
                        }
                        className="bg-white/50 dark:bg-slate-700/50"
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-end">
                    <Button onClick={handleSaveConfiguration} className="bg-primary hover:bg-primary/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Save Configuration
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">This Month</p>
                        <p className="text-2xl font-bold">47 Screenings</p>
                        <p className="text-xs text-green-600">+12% from last month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                        <p className="text-2xl font-bold">$1,645</p>
                        <p className="text-xs text-green-600">Saved $247 this month</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Zap className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Avg. Processing</p>
                        <p className="text-2xl font-bold">18 hours</p>
                        <p className="text-xs text-green-600">2 hours faster</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
                <CardHeader>
                  <CardTitle>Cost Analytics</CardTitle>
                  <CardDescription>Detailed breakdown of screening costs and savings</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Building className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground">
                      Detailed cost analytics and reporting will be available here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
