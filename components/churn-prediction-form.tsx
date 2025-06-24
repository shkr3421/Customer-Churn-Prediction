"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ChurnResult } from "@/components/churn-result"
import { PredictionCharts } from "@/components/prediction-charts"
import { useToast } from "@/hooks/use-toast"

interface FormData {
  monthlyCharge: number
  tenure: number
  contractType: string
  onlineService: string
  techSupport: string
  paymentMethod: string
  onlineSecurity: string
  totalCharges: number
}

const initialFormData: FormData = {
  monthlyCharge: 70,
  tenure: 12,
  contractType: "month-to-month",
  onlineService: "yes",
  techSupport: "no",
  paymentMethod: "electronic-check",
  onlineSecurity: "no",
  totalCharges: 840,
}

export default function ChurnPredictionForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [result, setResult] = useState<{ percentage: number; risk: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value }

      // Auto-calculate total charges when monthly charge or tenure changes
      if (field === "monthlyCharge" || field === "tenure") {
        newData.totalCharges = Number(newData.monthlyCharge) * Number(newData.tenure)
      }

      return newData
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call with timeout
    setTimeout(() => {
      // Predictive model simulation
      const prediction = predictChurn(formData)
      setResult(prediction)
      setIsLoading(false)

      toast({
        title: "Prediction Complete",
        description: `Churn risk: ${prediction.percentage.toFixed(1)}% (${prediction.risk})`,
      })
    }, 1500)
  }

  const predictChurn = (data: FormData): { percentage: number; risk: string } => {
    // This is a simplified prediction model for demonstration
    // In a real application, this would be a trained ML model or API call

    let baseChurnRate = 15 // Base churn rate

    // Contract type impact
    if (data.contractType === "month-to-month") baseChurnRate += 20
    else if (data.contractType === "one-year") baseChurnRate += 5

    // Service impacts
    if (data.onlineService === "no") baseChurnRate += 10
    if (data.techSupport === "no") baseChurnRate += 15
    if (data.onlineSecurity === "no") baseChurnRate += 12

    // Payment method impact
    if (data.paymentMethod === "electronic-check") baseChurnRate += 8
    else if (data.paymentMethod === "mailed-check") baseChurnRate += 5

    // Tenure impact (longer tenure = lower churn)
    baseChurnRate -= Math.min(20, data.tenure / 3)

    // Monthly charge impact (higher charge = higher churn)
    baseChurnRate += Math.min(15, (data.monthlyCharge - 50) / 10)

    // Ensure percentage is between 0 and 100
    const percentage = Math.max(0, Math.min(100, baseChurnRate))

    // Determine risk level
    const risk = percentage > 50 ? "High" : "Low"

    return { percentage, risk }
  }

  const resetForm = () => {
    setFormData(initialFormData)
    setResult(null)
  }

  return (
    <div id="prediction-form" className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-700 to-purple-900 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Customer Churn Predictor</CardTitle>
            <CardDescription className="text-purple-100">
              Enter customer details to predict churn probability
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyCharge">Monthly Charge ($)</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="monthlyCharge"
                      min={0}
                      max={200}
                      step={1}
                      value={[formData.monthlyCharge]}
                      onValueChange={(value) => handleInputChange("monthlyCharge", value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right font-medium">${formData.monthlyCharge}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure (Months)</Label>
                  <div className="flex items-center space-x-2">
                    <Slider
                      id="tenure"
                      min={1}
                      max={72}
                      step={1}
                      value={[formData.tenure]}
                      onValueChange={(value) => handleInputChange("tenure", value[0])}
                      className="flex-1"
                    />
                    <span className="w-12 text-right font-medium">{formData.tenure}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contractType">Contract Type</Label>
                  <Select
                    value={formData.contractType}
                    onValueChange={(value) => handleInputChange("contractType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month-to-month">Month-to-Month</SelectItem>
                      <SelectItem value="one-year">One Year</SelectItem>
                      <SelectItem value="two-year">Two Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange("paymentMethod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronic-check">Electronic Check</SelectItem>
                      <SelectItem value="mailed-check">Mailed Check</SelectItem>
                      <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                      <SelectItem value="credit-card">Credit Card</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="onlineService">Online Service</Label>
                  <Select
                    value={formData.onlineService}
                    onValueChange={(value) => handleInputChange("onlineService", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Has online service?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techSupport">Tech Support</Label>
                  <Select
                    value={formData.techSupport}
                    onValueChange={(value) => handleInputChange("techSupport", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Has tech support?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="onlineSecurity">Online Security</Label>
                  <Select
                    value={formData.onlineSecurity}
                    onValueChange={(value) => handleInputChange("onlineSecurity", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Has online security?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalCharges">Total Charges ($)</Label>
                  <Input
                    id="totalCharges"
                    type="number"
                    value={formData.totalCharges}
                    onChange={(e) => handleInputChange("totalCharges", Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground">Auto-calculated as Monthly Charge × Tenure</p>
                </div>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white" disabled={isLoading}>
                  {isLoading ? "Analyzing..." : "Predict Churn"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm} disabled={isLoading}>
                  Reset
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col justify-center border-t pt-6">
            {result && (
              <>
                <ChurnResult percentage={result.percentage} risk={result.risk} />
                <PredictionCharts formData={formData} prediction={result} />
              </>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
