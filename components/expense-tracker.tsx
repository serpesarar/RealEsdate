"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Receipt,
  Camera,
  Upload,
  Download,
  Plus,
  DollarSign,
  Calendar,
  Tag,
  FileText,
  Wrench,
  Car,
  User,
} from "lucide-react"

interface Expense {
  id: number
  date: string
  category: string
  amount: number
  description: string
  jobId?: number
  jobTitle?: string
  receipt?: string
  status: "pending" | "approved" | "rejected"
}

interface ExpenseTrackerProps {
  jobId?: number
  jobTitle?: string
}

const mockExpenses: Expense[] = [
  {
    id: 1,
    date: "2024-01-15",
    category: "materials",
    amount: 45.99,
    description: "PVC pipes and fittings",
    jobId: 4,
    jobTitle: "Kitchen Faucet Leak",
    receipt: "/placeholder.svg?height=200&width=150",
    status: "approved",
  },
  {
    id: 2,
    date: "2024-01-14",
    category: "tools",
    amount: 89.5,
    description: "Adjustable wrench set",
    status: "pending",
  },
  {
    id: 3,
    date: "2024-01-13",
    category: "travel",
    amount: 12.3,
    description: "Gas for property visits",
    status: "approved",
  },
]

const categories = [
  { value: "materials", label: "Materials", icon: Wrench },
  { value: "tools", label: "Tools", icon: Wrench },
  { value: "labor", label: "Labor", icon: User },
  { value: "travel", label: "Travel", icon: Car },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

export function ExpenseTracker({ jobId, jobTitle }: ExpenseTrackerProps) {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses)
  const [isAddingExpense, setIsAddingExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    receipt: null as File | null,
  })

  const handleAddExpense = () => {
    if (newExpense.category && newExpense.amount && newExpense.description) {
      const expense: Expense = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        category: newExpense.category,
        amount: Number.parseFloat(newExpense.amount),
        description: newExpense.description,
        jobId,
        jobTitle,
        status: "pending",
      }
      setExpenses([expense, ...expenses])
      setNewExpense({ category: "", amount: "", description: "", receipt: null })
      setIsAddingExpense(false)
    }
  }

  const handleReceiptUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setNewExpense({ ...newExpense, receipt: file })
      // In a real app, you would process OCR here
      console.log("[v0] Processing receipt with OCR:", file.name)
    }
  }

  const exportExpenses = () => {
    console.log("[v0] Exporting expenses for accounting")
    // Generate CSV or PDF export
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const approvedExpenses = expenses
    .filter((e) => e.status === "approved")
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Receipt className="w-4 h-4 mr-2" />
          Expenses
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Expense Tracker
            {jobTitle && <span className="text-muted-foreground">- {jobTitle}</span>}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="expenses" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
            <TabsTrigger value="add">Add Expense</TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Approved</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">${approvedExpenses.toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{expenses.length}</div>
                  <p className="text-xs text-muted-foreground">expenses recorded</p>
                </CardContent>
              </Card>
            </div>

            {/* Export Button */}
            <div className="flex justify-end">
              <Button variant="outline" onClick={exportExpenses}>
                <Download className="w-4 h-4 mr-2" />
                Export for Accounting
              </Button>
            </div>

            {/* Expenses List */}
            <div className="space-y-3">
              {expenses.map((expense) => {
                const CategoryIcon = categories.find((c) => c.value === expense.category)?.icon || Tag
                return (
                  <Card key={expense.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{expense.description}</div>
                            <div className="text-sm text-muted-foreground">
                              {expense.date} • {categories.find((c) => c.value === expense.category)?.label}
                              {expense.jobTitle && ` • ${expense.jobTitle}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="font-bold">${expense.amount.toFixed(2)}</div>
                            <Badge className={statusColors[expense.status]}>
                              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
                            </Badge>
                          </div>
                          {expense.receipt && (
                            <Button variant="outline" size="sm">
                              <FileText className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="add" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add New Expense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Receipt Upload */}
                <div>
                  <Label>Receipt (Required)</Label>
                  <div className="mt-2 border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                    <div className="text-center">
                      <Camera className="mx-auto h-12 w-12 text-muted-foreground" />
                      <div className="mt-4">
                        <Label htmlFor="receipt-upload" className="cursor-pointer">
                          <span className="mt-2 block text-sm font-medium text-foreground">
                            Take Photo or Upload Receipt
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">OCR will auto-fill details</span>
                        </Label>
                        <input
                          id="receipt-upload"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          className="hidden"
                          onChange={handleReceiptUpload}
                        />
                      </div>
                      <div className="mt-4 flex justify-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Label htmlFor="receipt-upload" className="cursor-pointer">
                            <Camera className="w-4 h-4 mr-2" />
                            Camera
                          </Label>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Label htmlFor="receipt-upload" className="cursor-pointer">
                            <Upload className="w-4 h-4 mr-2" />
                            Upload
                          </Label>
                        </Button>
                      </div>
                    </div>
                  </div>
                  {newExpense.receipt && (
                    <div className="mt-2 text-sm text-green-600">✓ Receipt uploaded: {newExpense.receipt.name}</div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <Label>Category</Label>
                  <Select
                    value={newExpense.category}
                    onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
                  >
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select expense category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => {
                        const Icon = category.icon
                        return (
                          <SelectItem key={category.value} value={category.value}>
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              {category.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div>
                  <Label>Amount</Label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="mt-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Describe the expense..."
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    className="mt-2"
                  />
                </div>

                {/* Job Association */}
                {jobTitle && (
                  <div>
                    <Label>Associated Job</Label>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <div className="font-medium">{jobTitle}</div>
                      <div className="text-sm text-muted-foreground">This expense will be linked to the job</div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  onClick={handleAddExpense}
                  disabled={!newExpense.category || !newExpense.amount || !newExpense.description}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Expense
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
