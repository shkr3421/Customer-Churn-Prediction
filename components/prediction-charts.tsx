"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PredictionChartsProps {
  formData: {
    monthlyCharge: number
    tenure: number
    contractType: string
    onlineService: string
    techSupport: string
    paymentMethod: string
    onlineSecurity: string
    totalCharges: number
  }
  prediction: {
    percentage: number
    risk: string
  }
}

export function PredictionCharts({ formData, prediction }: PredictionChartsProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate factor contribution to churn
  const factorContributions = [
    {
      name: "Contract Type",
      value: formData.contractType === "month-to-month" ? 25 : formData.contractType === "one-year" ? 10 : 5,
      fill: "#c084fc",
    },
    {
      name: "Online Service",
      value: formData.onlineService === "no" ? 15 : 5,
      fill: "#a855f7",
    },
    {
      name: "Tech Support",
      value: formData.techSupport === "no" ? 20 : 5,
      fill: "#7e22ce",
    },
    {
      name: "Online Security",
      value: formData.onlineSecurity === "no" ? 18 : 5,
      fill: "#6b21a8",
    },
    {
      name: "Payment Method",
      value: formData.paymentMethod === "electronic-check" ? 15 : formData.paymentMethod === "mailed-check" ? 10 : 5,
      fill: "#9333ea",
    },
  ]

  // Comparison with average values
  const comparisonData = [
    {
      name: "Monthly Charge",
      customer: formData.monthlyCharge,
      average: 65,
    },
    {
      name: "Tenure",
      customer: formData.tenure,
      average: 24,
    },
    {
      name: "Total Charges",
      customer: formData.totalCharges / 100,
      average: 15.6,
    },
  ]

  // Radar chart data
  const radarData = [
    { subject: "Contract", A: getRadarValue("contract", formData.contractType), fullMark: 100 },
    { subject: "Online Service", A: getRadarValue("onlineService", formData.onlineService), fullMark: 100 },
    { subject: "Tech Support", A: getRadarValue("techSupport", formData.techSupport), fullMark: 100 },
    { subject: "Security", A: getRadarValue("security", formData.onlineSecurity), fullMark: 100 },
    { subject: "Payment", A: getRadarValue("payment", formData.paymentMethod), fullMark: 100 },
    {
      subject: "Tenure",
      A: Math.min(100, (formData.tenure / 72) * 100),
      fullMark: 100,
    },
  ]

  // Churn probability by similar customers
  const similarCustomersData = [
    { name: "Very Low", value: 15, fill: "#22c55e" },
    { name: "Low", value: 25, fill: "#84cc16" },
    { name: "Medium", value: 30, fill: "#eab308" },
    { name: "High", value: 20, fill: "#f97316" },
    { name: "Very High", value: 10, fill: "#ef4444" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full mt-8"
    >
      <Tabs defaultValue="factors" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="factors">Contributing Factors</TabsTrigger>
          <TabsTrigger value="comparison">Customer Comparison</TabsTrigger>
          <TabsTrigger value="profile">Customer Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="factors">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Churn Factor Contribution</CardTitle>
                <CardDescription>Impact of each factor on churn prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={factorContributions}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {factorContributions.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Contribution"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Metrics Comparison</CardTitle>
                <CardDescription>Your customer vs. average values</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={comparisonData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="customer" name="This Customer" fill="#a855f7" />
                    <Bar dataKey="average" name="Average Customer" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="comparison">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Similar Customers Churn Distribution</CardTitle>
                <CardDescription>Churn probability for customers with similar profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={similarCustomersData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {similarCustomersData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Risk Factors</CardTitle>
                <CardDescription>
                  {prediction.risk === "High"
                    ? "Key factors contributing to high churn risk"
                    : "Factors contributing to customer retention"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-2">
                  {prediction.risk === "High" ? (
                    <>
                      {formData.contractType === "month-to-month" && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> Month-to-month contract increases churn risk by 25%
                        </li>
                      )}
                      {formData.techSupport === "no" && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> Lack of tech support increases churn risk by 20%
                        </li>
                      )}
                      {formData.onlineSecurity === "no" && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> No online security increases churn risk by 18%
                        </li>
                      )}
                      {formData.onlineService === "no" && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> No online service increases churn risk by 15%
                        </li>
                      )}
                      {formData.paymentMethod === "electronic-check" && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> Electronic check payment method increases risk by 15%
                        </li>
                      )}
                      {formData.tenure < 12 && (
                        <li className="flex items-center text-red-500">
                          <span className="mr-2">•</span> Short tenure (less than 12 months) increases churn risk
                        </li>
                      )}
                    </>
                  ) : (
                    <>
                      {formData.contractType !== "month-to-month" && (
                        <li className="flex items-center text-green-500">
                          <span className="mr-2">•</span> Longer-term contract reduces churn risk by 20%
                        </li>
                      )}
                      {formData.techSupport === "yes" && (
                        <li className="flex items-center text-green-500">
                          <span className="mr-2">•</span> Tech support reduces churn risk by 15%
                        </li>
                      )}
                      {formData.onlineSecurity === "yes" && (
                        <li className="flex items-center text-green-500">
                          <span className="mr-2">•</span> Online security reduces churn risk by 13%
                        </li>
                      )}
                      {formData.tenure > 24 && (
                        <li className="flex items-center text-green-500">
                          <span className="mr-2">•</span> Long tenure (over 24 months) reduces churn risk
                        </li>
                      )}
                      {formData.paymentMethod !== "electronic-check" && (
                        <li className="flex items-center text-green-500">
                          <span className="mr-2">•</span> Payment method reduces churn risk by 10%
                        </li>
                      )}
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer Profile Radar</CardTitle>
                <CardDescription>Visual representation of customer attributes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Customer"
                      dataKey="A"
                      stroke="#a855f7"
                      fill="#a855f7"
                      fillOpacity={0.6}
                      dot={{ fill: "#a855f7", r: 4 }}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommendation Summary</CardTitle>
                <CardDescription>
                  {prediction.risk === "High"
                    ? "Actions to reduce churn risk for this customer"
                    : "Actions to maintain customer loyalty"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {prediction.risk === "High" ? (
                    <>
                      {formData.contractType === "month-to-month" && (
                        <li className="flex items-start">
                          <span className="mr-2 text-purple-500 font-bold">1.</span>
                          <span>
                            <span className="font-medium">Offer contract upgrade:</span> Provide incentives to move to a
                            one or two-year contract.
                          </span>
                        </li>
                      )}
                      {formData.techSupport === "no" && (
                        <li className="flex items-start">
                          <span className="mr-2 text-purple-500 font-bold">2.</span>
                          <span>
                            <span className="font-medium">Add tech support:</span> Offer a free trial of tech support
                            services.
                          </span>
                        </li>
                      )}
                      {formData.onlineSecurity === "no" && (
                        <li className="flex items-start">
                          <span className="mr-2 text-purple-500 font-bold">3.</span>
                          <span>
                            <span className="font-medium">Enhance security:</span> Provide a discounted online security
                            package.
                          </span>
                        </li>
                      )}
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500 font-bold">4.</span>
                        <span>
                          <span className="font-medium">Personalized outreach:</span> Schedule a customer service call
                          to address any concerns.
                        </span>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500 font-bold">1.</span>
                        <span>
                          <span className="font-medium">Loyalty rewards:</span> Offer exclusive benefits to reward
                          continued loyalty.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500 font-bold">2.</span>
                        <span>
                          <span className="font-medium">Service upgrades:</span> Suggest premium services that might
                          enhance their experience.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500 font-bold">3.</span>
                        <span>
                          <span className="font-medium">Referral program:</span> Invite them to participate in your
                          customer referral program.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-purple-500 font-bold">4.</span>
                        <span>
                          <span className="font-medium">Feedback opportunities:</span> Regularly collect their input to
                          maintain engagement.
                        </span>
                      </li>
                    </>
                  )}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

// Helper function to get radar chart values
function getRadarValue(type: string, value: string | number): number {
  switch (type) {
    case "contract":
      return value === "month-to-month" ? 30 : value === "one-year" ? 70 : 90
    case "onlineService":
      return value === "yes" ? 80 : 30
    case "techSupport":
      return value === "yes" ? 85 : 25
    case "security":
      return value === "yes" ? 90 : 20
    case "payment":
      return value === "electronic-check" ? 30 : value === "mailed-check" ? 50 : value === "bank-transfer" ? 70 : 80
    default:
      return 50
  }
}
