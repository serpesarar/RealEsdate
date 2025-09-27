"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Zap, Droplets, Wrench, Home, DollarSign, AlertTriangle } from "lucide-react"

interface CreateIssueDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateIssueDialog({ open, onOpenChange }: CreateIssueDialogProps) {
  const [step, setStep] = useState(1)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    property: "",
    unit: "",
    urgency: "",
  })
  const [aiAnalysis, setAiAnalysis] = useState<{
    category: string
    priority: string
    estimatedCost: string
    suggestedContractor: string
    confidence: number
  } | null>(null)

  const handleAnalyze = async () => {
    if (!formData.description.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      // Mock AI categorization based on description keywords
      let category = "OTHER"
      let priority = "MEDIUM"
      let estimatedCost = "$100-200"
      let suggestedContractor = "General Maintenance"
      let confidence = 85

      const description = formData.description.toLowerCase()

      if (description.includes("leak") || description.includes("water") || description.includes("pipe")) {
        category = "PLUMBING"
        priority = "HIGH"
        estimatedCost = "$150-400"
        suggestedContractor = "Mike Johnson (Plumber)"
        confidence = 95
      } else if (
        description.includes("electric") ||
        description.includes("power") ||
        description.includes("ac") ||
        description.includes("heating")
      ) {
        category = "ELECTRICAL"
        priority = "MEDIUM"
        estimatedCost = "$200-500"
        suggestedContractor = "Tom Davis (Electrician)"
        confidence = 88
      } else if (description.includes("payment") || description.includes("rent") || description.includes("billing")) {
        category = "PAYMENT"
        priority = "HIGH"
        estimatedCost = "N/A"
        suggestedContractor = "Finance Team"
        confidence = 98
      } else if (description.includes("broken") || description.includes("repair") || description.includes("fix")) {
        category = "MAINTENANCE"
        priority = "LOW"
        estimatedCost = "$100-300"
        suggestedContractor = "Alex Rodriguez (Maintenance)"
        confidence = 92
      }

      if (formData.urgency === "emergency") {
        priority = "URGENT"
      }

      setAiAnalysis({
        category,
        priority,
        estimatedCost,
        suggestedContractor,
        confidence,
      })
      setIsAnalyzing(false)
      setStep(2)
    }, 2000)
  }

  const handleSubmit = async () => {
    if (!aiAnalysis) return

    setIsSaving(true)

    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ...aiAnalysis,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Issue Created",
          description: `Issue ${data.issue.id} has been created successfully.`,
        })

        // Reset form and close dialog
        onOpenChange(false)
        setStep(1)
        setFormData({ title: "", description: "", property: "", unit: "", urgency: "" })
        setAiAnalysis(null)
      } else {
        throw new Error(data.error || "Failed to create issue")
      }
    } catch (error) {
      console.error("Error creating issue:", error)
      toast({
        title: "Error",
        description: "Failed to create issue. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "PLUMBING":
        return <Droplets className="w-5 h-5 text-blue-600" />
      case "ELECTRICAL":
        return <Zap className="w-5 h-5 text-yellow-600" />
      case "MAINTENANCE":
        return <Wrench className="w-5 h-5 text-green-600" />
      case "PAYMENT":
        return <DollarSign className="w-5 h-5 text-purple-600" />
      default:
        return <Home className="w-5 h-5 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-500 text-white"
      case "HIGH":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-primary" />
            <span>Report New Issue</span>
          </DialogTitle>
          <DialogDescription>
            Describe your issue and let our AI categorize and route it automatically
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property">Property</Label>
                  <Select
                    value={formData.property}
                    onValueChange={(value) => setFormData({ ...formData, property: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="park-avenue">Park Avenue Towers</SelectItem>
                      <SelectItem value="sunset-gardens">Sunset Gardens</SelectItem>
                      <SelectItem value="metro-plaza">Metro Plaza</SelectItem>
                      <SelectItem value="downtown-heights">Downtown Heights</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    placeholder="e.g., 12A"
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the issue in detail. The more information you provide, the better our AI can categorize and route it."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency Level</Label>
                <Select
                  value={formData.urgency}
                  onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How urgent is this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emergency">Emergency - Immediate attention needed</SelectItem>
                    <SelectItem value="urgent">Urgent - Within 24 hours</SelectItem>
                    <SelectItem value="normal">Normal - Within a few days</SelectItem>
                    <SelectItem value="low">Low - When convenient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleAnalyze}
                  disabled={!formData.description.trim() || isAnalyzing}
                  className="bg-primary hover:bg-primary/90"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Analyze with AI
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 2 && aiAnalysis && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold">AI Analysis Complete</h3>
                    <Badge variant="outline" className="ml-auto">
                      {aiAnalysis.confidence}% confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Category</Label>
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(aiAnalysis.category)}
                        <span className="font-medium">{aiAnalysis.category}</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(aiAnalysis.priority)}>
                        {aiAnalysis.priority === "URGENT" && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {aiAnalysis.priority}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Estimated Cost</Label>
                      <span className="font-medium">{aiAnalysis.estimatedCost}</span>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Suggested Contractor</Label>
                      <span className="font-medium">{aiAnalysis.suggestedContractor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-2">
                <Label>Issue Summary</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <h4 className="font-medium">{formData.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{formData.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <span>{formData.property}</span>
                    <span>•</span>
                    <span>Unit {formData.unit}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} disabled={isSaving} className="bg-primary hover:bg-primary/90">
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Submit Issue"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}
