"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Settings,
  Building2,
  CreditCard,
  Bell,
  Zap,
  Link,
  Shield,
  Save,
  Upload,
  Smartphone,
  Mail,
  Globe,
  DollarSign,
  FileText,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Users,
  Crown,
  Database,
  Banknote,
  MessageSquare,
  Gavel,
  UserCheck,
  Filter,
  Lock,
} from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company")
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: true,
    maintenance: true,
    payments: true,
    leases: true,
    latePayments: true,
    maintenanceApproval: true,
    leaseExpiry: true,
    tenantScreening: true,
  })

  const [automationRules, setAutomationRules] = useState({
    latePaymentActions: true,
    maintenanceApprovalLimit: 500,
    autoLeaseRenewal: true,
    screeningCriteria: true,
  })

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl text-white">
            <Settings className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600">Manage your account and property preferences</p>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div variants={itemVariants}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 lg:w-fit lg:grid-cols-6">
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Company</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Billing</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="automation" className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span className="hidden sm:inline">Automation</span>
              </TabsTrigger>
              <TabsTrigger value="integrations" className="flex items-center gap-2">
                <Link className="h-4 w-4" />
                <span className="hidden sm:inline">Integrations</span>
              </TabsTrigger>
              <TabsTrigger value="access" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Access</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="company" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  <CardDescription>Update your company details and business information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/generic-company-logo.png" />
                        <AvatarFallback className="text-lg">DP</AvatarFallback>
                      </Avatar>
                      <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0">
                        <Upload className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold">Company Logo</h3>
                      <p className="text-sm text-gray-500">PNG, JPG up to 5MB. Recommended: 200x200px</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input id="companyName" defaultValue="Doe Properties LLC" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="taxId">Tax ID / EIN</Label>
                      <Input id="taxId" defaultValue="12-3456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessLicense">Business License #</Label>
                      <Input id="businessLicense" defaultValue="BL-2024-001234" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input id="website" defaultValue="https://doeproperties.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyPhone">Phone</Label>
                      <Input id="companyPhone" defaultValue="+1 (555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyEmail">Email</Label>
                      <Input id="companyEmail" type="email" defaultValue="info@doeproperties.com" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Enter your complete business address..."
                      defaultValue="123 Main Street, Suite 100&#10;Anytown, ST 12345&#10;United States"
                    />
                  </div>

                  <Button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    <Save className="h-4 w-4 mr-2" />
                    Save Company Information
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="billing" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-yellow-500" />
                      Current Plan
                    </CardTitle>
                    <CardDescription>Your subscription details and usage</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
                      <div>
                        <h3 className="font-semibold text-lg">Professional Plan</h3>
                        <p className="text-sm text-gray-600">Up to 50 properties</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">$99</p>
                        <p className="text-sm text-gray-500">/month</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Properties Used</span>
                        <span>23 / 50</span>
                      </div>
                      <Progress value={46} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Storage Used</span>
                        <span>2.3 GB / 10 GB</span>
                      </div>
                      <Progress value={23} className="h-2" />
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Upgrade Plan
                      </Button>
                      <Button variant="outline" className="flex-1 bg-transparent">
                        Change Plan
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Methods
                    </CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/25</p>
                          </div>
                        </div>
                        <Badge variant="secondary">Primary</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Banknote className="h-5 w-5 text-green-600" />
                          <div>
                            <p className="font-medium">Bank Account</p>
                            <p className="text-sm text-gray-500">•••• 5678</p>
                          </div>
                        </div>
                        <Badge variant="outline">Backup</Badge>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Add Payment Method
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Invoice History
                  </CardTitle>
                  <CardDescription>Download and view your billing history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 1, 2024", amount: "$99.00", status: "Paid", invoice: "INV-2024-12" },
                      { date: "Nov 1, 2024", amount: "$99.00", status: "Paid", invoice: "INV-2024-11" },
                      { date: "Oct 1, 2024", amount: "$99.00", status: "Paid", invoice: "INV-2024-10" },
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <div>
                            <p className="font-medium">{invoice.invoice}</p>
                            <p className="text-sm text-gray-500">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            {invoice.status}
                          </Badge>
                          <span className="font-medium">{invoice.amount}</span>
                          <Button variant="ghost" size="sm">
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Channels
                    </CardTitle>
                    <CardDescription>Choose how you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="emailNotif">Email Notifications</Label>
                        </div>
                        <Switch
                          id="emailNotif"
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Smartphone className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="smsNotif">SMS Notifications</Label>
                        </div>
                        <Switch
                          id="smsNotif"
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <Label htmlFor="pushNotif">Push Notifications</Label>
                        </div>
                        <Switch
                          id="pushNotif"
                          checked={notifications.push}
                          onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Notification Schedule
                    </CardTitle>
                    <CardDescription>Set when you want to receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="quietHours">Quiet Hours</Label>
                      <div className="flex items-center gap-2">
                        <Input id="quietStart" type="time" defaultValue="22:00" className="flex-1" />
                        <span className="text-sm text-gray-500">to</span>
                        <Input id="quietEnd" type="time" defaultValue="08:00" className="flex-1" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="est">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="est">Eastern Time (EST)</SelectItem>
                          <SelectItem value="cst">Central Time (CST)</SelectItem>
                          <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                          <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Alert Thresholds
                  </CardTitle>
                  <CardDescription>Set thresholds for important alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="latePaymentDays">Late Payment Alert (days)</Label>
                      <Input id="latePaymentDays" type="number" defaultValue="3" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maintenanceCost">High Maintenance Cost ($)</Label>
                      <Input id="maintenanceCost" type="number" defaultValue="500" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vacancyDays">Extended Vacancy (days)</Label>
                      <Input id="vacancyDays" type="number" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="leaseExpiry">Lease Expiry Warning (days)</Label>
                      <Input id="leaseExpiry" type="number" defaultValue="60" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Event Types</CardTitle>
                  <CardDescription>Choose which events trigger notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: "maintenance", label: "Maintenance Requests", icon: "🔧" },
                    { key: "payments", label: "Payment Updates", icon: "💳" },
                    { key: "leases", label: "Lease Renewals", icon: "📄" },
                    { key: "latePayments", label: "Late Payments", icon: "⚠️" },
                    { key: "maintenanceApproval", label: "Maintenance Approvals", icon: "✅" },
                    { key: "leaseExpiry", label: "Lease Expiry", icon: "📅" },
                    { key: "tenantScreening", label: "Tenant Screening", icon: "👤" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{item.icon}</span>
                        <Label htmlFor={`${item.key}Notif`}>{item.label}</Label>
                      </div>
                      <Switch
                        id={`${item.key}Notif`}
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, [item.key]: checked }))}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Late Payment Actions
                    </CardTitle>
                    <CardDescription>Automate actions for late rent payments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoLatePayment">Enable Late Payment Automation</Label>
                      <Switch
                        id="autoLatePayment"
                        checked={automationRules.latePaymentActions}
                        onCheckedChange={(checked) =>
                          setAutomationRules((prev) => ({ ...prev, latePaymentActions: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-3 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-center gap-2">
                        <Checkbox id="reminder1" defaultChecked />
                        <Label htmlFor="reminder1" className="text-sm">
                          Send reminder after 3 days
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="lateFee" defaultChecked />
                        <Label htmlFor="lateFee" className="text-sm">
                          Apply late fee after 5 days
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="notice" />
                        <Label htmlFor="notice" className="text-sm">
                          Send formal notice after 10 days
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gavel className="h-5 w-5" />
                      Maintenance Approval Limits
                    </CardTitle>
                    <CardDescription>Set automatic approval thresholds</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="approvalLimit">Auto-approve up to ($)</Label>
                      <Input
                        id="approvalLimit"
                        type="number"
                        value={automationRules.maintenanceApprovalLimit}
                        onChange={(e) =>
                          setAutomationRules((prev) => ({
                            ...prev,
                            maintenanceApprovalLimit: Number.parseInt(e.target.value),
                          }))
                        }
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Checkbox id="emergency" defaultChecked />
                        <Label htmlFor="emergency" className="text-sm">
                          Auto-approve emergency repairs
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="routine" defaultChecked />
                        <Label htmlFor="routine" className="text-sm">
                          Auto-approve routine maintenance
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="preferred" />
                        <Label htmlFor="preferred" className="text-sm">
                          Only use preferred vendors
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Lease Renewal Rules
                    </CardTitle>
                    <CardDescription>Automate lease renewal processes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoRenewal">Enable Auto-Renewal</Label>
                      <Switch
                        id="autoRenewal"
                        checked={automationRules.autoLeaseRenewal}
                        onCheckedChange={(checked) =>
                          setAutomationRules((prev) => ({ ...prev, autoLeaseRenewal: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="renewalNotice">Renewal Notice Period (days)</Label>
                      <Input id="renewalNotice" type="number" defaultValue="60" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rentIncrease">Max Rent Increase (%)</Label>
                      <Input id="rentIncrease" type="number" defaultValue="5" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <UserCheck className="h-5 w-5" />
                      Screening Criteria
                    </CardTitle>
                    <CardDescription>Set automatic tenant screening rules</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="autoScreening">Enable Auto-Screening</Label>
                      <Switch
                        id="autoScreening"
                        checked={automationRules.screeningCriteria}
                        onCheckedChange={(checked) =>
                          setAutomationRules((prev) => ({ ...prev, screeningCriteria: checked }))
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minCredit">Minimum Credit Score</Label>
                      <Input id="minCredit" type="number" defaultValue="650" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="incomeRatio">Income to Rent Ratio</Label>
                      <Select defaultValue="3">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2.5">2.5x</SelectItem>
                          <SelectItem value="3">3x</SelectItem>
                          <SelectItem value="3.5">3.5x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      QuickBooks Connection
                    </CardTitle>
                    <CardDescription>Sync financial data with QuickBooks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="font-medium">Connected</p>
                          <p className="text-sm text-gray-600">Last sync: 2 hours ago</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Sync Now
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="syncIncome" defaultChecked />
                        <Label htmlFor="syncIncome" className="text-sm">
                          Sync rental income
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="syncExpenses" defaultChecked />
                        <Label htmlFor="syncExpenses" className="text-sm">
                          Sync expenses
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="syncTenants" />
                        <Label htmlFor="syncTenants" className="text-sm">
                          Sync tenant information
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Banknote className="h-5 w-5" />
                      Bank Account Sync
                    </CardTitle>
                    <CardDescription>Connect your bank accounts for automatic transaction import</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <div>
                            <p className="font-medium">Chase Business</p>
                            <p className="text-sm text-gray-500">•••• 5678</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          Active
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <div>
                            <p className="font-medium">Wells Fargo</p>
                            <p className="text-sm text-gray-500">•••• 1234</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Reconnect
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Add Bank Account
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Calendar Integration
                    </CardTitle>
                    <CardDescription>Sync maintenance schedules and appointments</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {[
                        { name: "Google Calendar", status: "connected", color: "green" },
                        { name: "Outlook Calendar", status: "disconnected", color: "gray" },
                        { name: "Apple Calendar", status: "disconnected", color: "gray" },
                      ].map((calendar, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`h-3 w-3 rounded-full bg-${calendar.color}-500`} />
                            <span className="font-medium">{calendar.name}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            {calendar.status === "connected" ? "Disconnect" : "Connect"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Email Integration
                    </CardTitle>
                    <CardDescription>Connect email for automated communications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="emailProvider">Email Provider</Label>
                      <Select defaultValue="gmail">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gmail">Gmail</SelectItem>
                          <SelectItem value="outlook">Outlook</SelectItem>
                          <SelectItem value="custom">Custom SMTP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Checkbox id="autoEmails" defaultChecked />
                        <Label htmlFor="autoEmails" className="text-sm">
                          Send automated emails
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id="emailTemplates" defaultChecked />
                        <Label htmlFor="emailTemplates" className="text-sm">
                          Use custom templates
                        </Label>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Configure Email Settings
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="access" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Roles Setup
                  </CardTitle>
                  <CardDescription>Define roles and their permissions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    {[
                      {
                        role: "Owner",
                        description: "Full access to all features and data",
                        users: 1,
                        permissions: ["All Permissions"],
                        color: "bg-red-100 text-red-800",
                      },
                      {
                        role: "Property Manager",
                        description: "Manage properties, tenants, and maintenance",
                        users: 2,
                        permissions: ["Properties", "Tenants", "Maintenance", "Reports"],
                        color: "bg-blue-100 text-blue-800",
                      },
                      {
                        role: "Maintenance Coordinator",
                        description: "Handle maintenance requests and scheduling",
                        users: 1,
                        permissions: ["Maintenance", "Scheduling"],
                        color: "bg-green-100 text-green-800",
                      },
                      {
                        role: "Accountant",
                        description: "Access financial data and reports",
                        users: 1,
                        permissions: ["Financials", "Reports"],
                        color: "bg-yellow-100 text-yellow-800",
                      },
                    ].map((role, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge className={role.color}>{role.role}</Badge>
                            <span className="text-sm text-gray-500">{role.users} user(s)</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Edit Role
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {role.permissions.map((permission, pIndex) => (
                            <Badge key={pIndex} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full">Create New Role</Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="h-5 w-5" />
                      Property Access Rules
                    </CardTitle>
                    <CardDescription>Control which users can access specific properties</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="restrictAccess">Restrict property access by user</Label>
                        <Switch id="restrictAccess" defaultChecked />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="defaultAccess">Default Access Level</Label>
                        <Select defaultValue="assigned">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Properties</SelectItem>
                            <SelectItem value="assigned">Assigned Properties Only</SelectItem>
                            <SelectItem value="none">No Access</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full bg-transparent">
                      Manage Property Assignments
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Filter className="h-5 w-5" />
                      Data Visibility Settings
                    </CardTitle>
                    <CardDescription>Control what data users can see and modify</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="hideFinancials">Hide financial data from non-owners</Label>
                        <Switch id="hideFinancials" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="hideTenantInfo">Restrict tenant personal information</Label>
                        <Switch id="hideTenantInfo" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="auditLog">Enable audit logging</Label>
                        <Switch id="auditLog" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataRetention">Data Retention Period</Label>
                      <Select defaultValue="2years">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1year">1 Year</SelectItem>
                          <SelectItem value="2years">2 Years</SelectItem>
                          <SelectItem value="5years">5 Years</SelectItem>
                          <SelectItem value="forever">Forever</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>Additional security measures for your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require2fa">Require 2FA for all users</Label>
                        <Switch id="require2fa" />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="sessionTimeout">Auto-logout inactive sessions</Label>
                        <Switch id="sessionTimeout" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="ipRestriction">IP address restrictions</Label>
                        <Switch id="ipRestriction" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sessionDuration">Session Duration</Label>
                      <Select defaultValue="8hours">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1hour">1 Hour</SelectItem>
                          <SelectItem value="4hours">4 Hours</SelectItem>
                          <SelectItem value="8hours">8 Hours</SelectItem>
                          <SelectItem value="24hours">24 Hours</SelectItem>
                        </SelectContent>
                      </Select>

                      <Label htmlFor="passwordPolicy">Password Policy</Label>
                      <Select defaultValue="strong">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="basic">Basic</SelectItem>
                          <SelectItem value="strong">Strong</SelectItem>
                          <SelectItem value="enterprise">Enterprise</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  )
}
