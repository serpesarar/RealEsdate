"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Building2, Key, CheckCircle, AlertTriangle, ArrowLeft, User, Mail, Lock, Phone } from "lucide-react"
import { ReferenceCodeService, type ReferenceCode } from "@/lib/reference-system"
import { authService } from "@/lib/auth-service"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [referenceCode, setReferenceCode] = useState("")
  const [validatedReference, setValidatedReference] = useState<ReferenceCode | null>(null)
  const [error, setError] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleReferenceValidation = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const validated = await ReferenceCodeService.validateReferenceCode(referenceCode)

      if (!validated) {
        setError("Invalid or expired reference code. Please check with your property manager.")
        setIsLoading(false)
        return
      }

      setValidatedReference(validated)
      setStep(2)
    } catch (err) {
      setError("Error validating reference code. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const result = await authService.register({
        ...formData,
        referenceCode,
      })

      if (result.success) {
        setStep(3)
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const getUserTypeDisplay = (type: string) => {
    switch (type) {
      case "tenant":
        return { label: "Tenant", color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" }
      case "handyman":
        return { label: "Handyman", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" }
      case "manager":
        return { label: "Manager", color: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400" }
      case "contractor":
        return {
          label: "Contractor",
          color: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400",
        }
      default:
        return { label: "User", color: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400" }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">PropertyFlow</h1>
            </div>
            <p className="text-muted-foreground">Create your account with a reference code</p>
          </motion.div>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Enter Reference Code</CardTitle>
                  <CardDescription>
                    You need a valid reference code from your property manager to register
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleReferenceValidation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="referenceCode">Reference Code</Label>
                      <Input
                        id="referenceCode"
                        value={referenceCode}
                        onChange={(e) => setReferenceCode(e.target.value.toUpperCase())}
                        placeholder="TE-1K2L3M4N-5O6P7Q"
                        className="bg-white/50 dark:bg-slate-700/50 font-mono text-center"
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Format: XX-XXXXXXXX-XXXXXX (e.g., TE-1K2L3M4N-5O6P7Q)
                      </p>
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading || !referenceCode}>
                      {isLoading ? "Validating..." : "Validate Code"}
                    </Button>

                    <div className="text-center">
                      <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                        <ArrowLeft className="w-4 h-4 inline mr-1" />
                        Back to Sign In
                      </Link>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 2 && validatedReference && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl">Complete Registration</CardTitle>
                  <CardDescription>Reference code validated successfully</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Reference Info */}
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Account Type</span>
                      <Badge className={getUserTypeDisplay(validatedReference.type).color}>
                        {getUserTypeDisplay(validatedReference.type).label}
                      </Badge>
                    </div>
                    {validatedReference.metadata.propertyId && (
                      <div className="text-sm text-muted-foreground">
                        <p>Property: {validatedReference.metadata.propertyId}</p>
                        {validatedReference.metadata.unitNumber && (
                          <p>Unit: {validatedReference.metadata.unitNumber}</p>
                        )}
                        {validatedReference.metadata.monthlyRent && (
                          <p>Monthly Rent: ${validatedReference.metadata.monthlyRent}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <form onSubmit={handleRegistration} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          <User className="w-4 h-4 inline mr-1" />
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="John"
                          className="bg-white/50 dark:bg-slate-700/50"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Doe"
                          className="bg-white/50 dark:bg-slate-700/50"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="w-4 h-4 inline mr-1" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john.doe@email.com"
                        className="bg-white/50 dark:bg-slate-700/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="w-4 h-4 inline mr-1" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 123-4567"
                        className="bg-white/50 dark:bg-slate-700/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">
                        <Lock className="w-4 h-4 inline mr-1" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="bg-white/50 dark:bg-slate-700/50"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="bg-white/50 dark:bg-slate-700/50"
                        required
                      />
                    </div>

                    {error && (
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>

                    <div className="text-center">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setStep(1)}
                        className="text-muted-foreground"
                      >
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Use Different Code
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-green-600 dark:text-green-400">Account Created!</CardTitle>
                  <CardDescription>Your PropertyFlow account has been successfully created</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="font-semibold mb-2">What's Next?</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Check your email for account verification</li>
                      <li>• Complete your profile setup</li>
                      <li>• Access your personalized dashboard</li>
                      <li>• Start managing your property needs</li>
                    </ul>
                  </div>

                  <Button asChild className="w-full">
                    <Link href="/">Continue to Sign In</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
