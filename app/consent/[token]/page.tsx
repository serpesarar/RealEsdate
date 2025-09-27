"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Building2,
  Shield,
  Lock,
  CheckCircle,
  Plus,
  Calendar,
  DollarSign,
  FileText,
  PenTool,
  Type,
  Clock,
} from "lucide-react"
import { useParams } from "next/navigation"

// Mock data based on token
const mockConsentData = {
  propertyName: "Riverside Gardens",
  unitNumber: "2B",
  propertyManager: "Metro Property Management",
  applicantName: "Sarah Johnson",
  applicantEmail: "sarah.johnson@email.com",
  monthlyRent: 1800,
  screeningPackage: "Standard Check",
  expiresAt: "2024-01-17T23:59:59Z",
}

const usStates = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
]

export default function TenantConsentPortal() {
  const params = useParams()
  const token = params.token as string

  const [formData, setFormData] = useState({
    ssn: "",
    dateOfBirth: "",
    driversLicense: "",
    licenseState: "",
    currentEmployer: "",
    supervisorName: "",
    hrPhone: "",
    annualIncome: "",
    previousAddresses: [{ address: "", city: "", state: "", zip: "", fromDate: "", toDate: "" }],
  })

  const [consents, setConsents] = useState({
    backgroundCheck: false,
    fcraDisclosure: false,
  })

  const [signatureType, setSignatureType] = useState("typed")
  const [typedSignature, setTypedSignature] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const addPreviousAddress = () => {
    setFormData((prev) => ({
      ...prev,
      previousAddresses: [
        ...prev.previousAddresses,
        { address: "", city: "", state: "", zip: "", fromDate: "", toDate: "" },
      ],
    }))
  }

  const updatePreviousAddress = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      previousAddresses: prev.previousAddresses.map((addr, i) => (i === index ? { ...addr, [field]: value } : addr)),
    }))
  }

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Consent submitted successfully! You will receive a confirmation email shortly.")
    }, 2000)
  }

  const isFormValid = () => {
    return (
      formData.ssn &&
      formData.dateOfBirth &&
      formData.driversLicense &&
      formData.licenseState &&
      consents.backgroundCheck &&
      consents.fcraDisclosure &&
      (signatureType === "typed" ? typedSignature : true)
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Header */}
          <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0 mb-8">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <h1 className="text-2xl font-bold text-foreground">PropertyFlow</h1>
              </div>
              <CardTitle className="text-2xl">Background Check Authorization</CardTitle>
              <CardDescription className="text-lg">
                {mockConsentData.propertyName} - Unit {mockConsentData.unitNumber}
              </CardDescription>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  <Shield className="w-3 h-3 mr-1" />
                  FCRA Compliant
                </Badge>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  <Lock className="w-3 h-3 mr-1" />
                  256-bit Encrypted
                </Badge>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  <Clock className="w-3 h-3 mr-1" />
                  Expires in 48 hours
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* What We Check */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5" />
                  <span>What Will Be Checked</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Credit History & Score</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Criminal Background (7 years)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Eviction Records</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Employment Verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Income Verification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Sex Offender Registry</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-3">
                    <Lock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100">Privacy & Security</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                        Your information is encrypted and only used for this rental application. We comply with FCRA
                        regulations and maintain strict data security standards.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Please provide accurate information for verification purposes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ssn" className="flex items-center space-x-2">
                      <Lock className="w-4 h-4" />
                      <span>Social Security Number *</span>
                    </Label>
                    <Input
                      id="ssn"
                      type="password"
                      placeholder="XXX-XX-XXXX"
                      value={formData.ssn}
                      onChange={(e) => setFormData((prev) => ({ ...prev, ssn: formatSSN(e.target.value) }))}
                      maxLength={11}
                      required
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                    <p className="text-xs text-muted-foreground">Encrypted and secure</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="license">Driver's License Number *</Label>
                    <Input
                      id="license"
                      placeholder="License number"
                      value={formData.driversLicense}
                      onChange={(e) => setFormData((prev) => ({ ...prev, driversLicense: e.target.value }))}
                      required
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseState">License State *</Label>
                    <Select
                      value={formData.licenseState}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, licenseState: value }))}
                    >
                      <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {usStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Previous Addresses */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle>Previous Addresses (Last 7 Years)</CardTitle>
                <CardDescription>Include all addresses where you've lived in the past 7 years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.previousAddresses.map((address, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-muted/20">
                    <h4 className="font-medium mb-4">Address {index + 1}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label>Street Address</Label>
                        <Input
                          placeholder="123 Main Street"
                          value={address.address}
                          onChange={(e) => updatePreviousAddress(index, "address", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50"
                        />
                      </div>
                      <div>
                        <Label>City</Label>
                        <Input
                          placeholder="City"
                          value={address.city}
                          onChange={(e) => updatePreviousAddress(index, "city", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50"
                        />
                      </div>
                      <div>
                        <Label>State</Label>
                        <Select
                          value={address.state}
                          onValueChange={(value) => updatePreviousAddress(index, "state", value)}
                        >
                          <SelectTrigger className="bg-white/50 dark:bg-slate-700/50">
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            {usStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>From Date</Label>
                        <Input
                          type="date"
                          value={address.fromDate}
                          onChange={(e) => updatePreviousAddress(index, "fromDate", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50"
                        />
                      </div>
                      <div>
                        <Label>To Date</Label>
                        <Input
                          type="date"
                          value={address.toDate}
                          onChange={(e) => updatePreviousAddress(index, "toDate", e.target.value)}
                          className="bg-white/50 dark:bg-slate-700/50"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <Button type="button" variant="outline" onClick={addPreviousAddress} className="w-full bg-transparent">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Address
                </Button>
              </CardContent>
            </Card>

            {/* Employment Information */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle>Employment Information</CardTitle>
                <CardDescription>Current employment details for income verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="employer">Current Employer</Label>
                    <Input
                      id="employer"
                      placeholder="Company name"
                      value={formData.currentEmployer}
                      onChange={(e) => setFormData((prev) => ({ ...prev, currentEmployer: e.target.value }))}
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisor">Supervisor Name</Label>
                    <Input
                      id="supervisor"
                      placeholder="Supervisor's full name"
                      value={formData.supervisorName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, supervisorName: e.target.value }))}
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hrPhone">HR Phone Number</Label>
                    <Input
                      id="hrPhone"
                      placeholder="(555) 123-4567"
                      value={formData.hrPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, hrPhone: formatPhone(e.target.value) }))}
                      maxLength={14}
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="income" className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4" />
                      <span>Annual Income</span>
                    </Label>
                    <Input
                      id="income"
                      type="number"
                      placeholder="65000"
                      value={formData.annualIncome}
                      onChange={(e) => setFormData((prev) => ({ ...prev, annualIncome: e.target.value }))}
                      className="bg-white/50 dark:bg-slate-700/50"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consent Agreement */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardHeader>
                <CardTitle>Consent Agreement</CardTitle>
                <CardDescription>Please read and agree to the following terms</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="backgroundCheck"
                      checked={consents.backgroundCheck}
                      onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, backgroundCheck: !!checked }))}
                      className="mt-1"
                    />
                    <Label htmlFor="backgroundCheck" className="text-sm leading-relaxed">
                      I authorize {mockConsentData.propertyManager} to obtain consumer reports and investigative
                      consumer reports about me for rental application purposes. This authorization extends to obtaining
                      such reports from any consumer reporting agency.
                    </Label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="fcraDisclosure"
                      checked={consents.fcraDisclosure}
                      onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, fcraDisclosure: !!checked }))}
                      className="mt-1"
                    />
                    <Label htmlFor="fcraDisclosure" className="text-sm leading-relaxed">
                      I understand this may include credit, criminal, eviction, and employment history checks. I
                      acknowledge receipt of the Summary of Rights under the Fair Credit Reporting Act and understand my
                      rights regarding the use of consumer reports.
                    </Label>
                  </div>
                </div>

                <Separator />

                {/* Electronic Signature */}
                <div className="space-y-4">
                  <h4 className="font-semibold">Electronic Signature</h4>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="typed"
                        name="signatureType"
                        value="typed"
                        checked={signatureType === "typed"}
                        onChange={(e) => setSignatureType(e.target.value)}
                      />
                      <Label htmlFor="typed" className="flex items-center space-x-2">
                        <Type className="w-4 h-4" />
                        <span>Type Signature</span>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="draw"
                        name="signatureType"
                        value="draw"
                        checked={signatureType === "draw"}
                        onChange={(e) => setSignatureType(e.target.value)}
                      />
                      <Label htmlFor="draw" className="flex items-center space-x-2">
                        <PenTool className="w-4 h-4" />
                        <span>Draw Signature</span>
                      </Label>
                    </div>
                  </div>

                  {signatureType === "typed" && (
                    <div className="space-y-2">
                      <Label htmlFor="typedSig">Type your full legal name</Label>
                      <Input
                        id="typedSig"
                        placeholder="Your full legal name"
                        value={typedSignature}
                        onChange={(e) => setTypedSignature(e.target.value)}
                        className="bg-white/50 dark:bg-slate-700/50 font-serif text-lg"
                        style={{ fontFamily: "cursive" }}
                      />
                    </div>
                  )}

                  {signatureType === "draw" && (
                    <div className="space-y-2">
                      <Label>Draw your signature below</Label>
                      <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-white/50 dark:bg-slate-700/50">
                        <canvas
                          ref={canvasRef}
                          width={400}
                          height={150}
                          className="w-full h-32 border rounded cursor-crosshair"
                          style={{ touchAction: "none" }}
                        />
                        <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                          Clear Signature
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Date: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-0">
              <CardContent className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
                  disabled={!isFormValid() || isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Authorization...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5 mr-2" />
                      Authorize Background Check
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  By submitting this form, you electronically sign and authorize the background check. This consent is
                  valid for 90 days from the date of signature.
                </p>
              </CardContent>
            </Card>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
