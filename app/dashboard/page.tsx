"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NavHeader } from "@/components/nav-header"
import { Footer } from "@/components/footer"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
  
// Sample data for charts with vibrant colors
const churnByContractData = [
  { name: "Month-to-Month", value: 42.7, fill: "#f472b6" }, // Pink
  { name: "One Year", value: 11.3, fill: "#a855f7" }, // Purple
  { name: "Two Year", value: 2.9, fill: "#3b82f6" }, // Blue
]

const churnByServiceData = [
  { name: "Internet Service", yes: 22.9, no: 7.4 },
  { name: "Online Security", yes: 14.5, no: 41.9 },
  { name: "Tech Support", yes: 15.2, no: 40.3 },
  { name: "Streaming TV", yes: 21.9, no: 27.9 },
  { name: "Streaming Movies", yes: 21.8, no: 28.1 },
]

const churnTrendData = [
  { month: "Jan", churnRate: 15.2 },
  { month: "Feb", churnRate: 16.8 },
  { month: "Mar", churnRate: 14.9 },
  { month: "Apr", churnRate: 18.3 },
  { month: "May", churnRate: 17.5 },
  { month: "Jun", churnRate: 16.2 },
  { month: "Jul", churnRate: 15.8 },
  { month: "Aug", churnRate: 14.5 },
  { month: "Sep", churnRate: 13.9 },
  { month: "Oct", churnRate: 15.1 },
  { month: "Nov", churnRate: 16.7 },
  { month: "Dec", churnRate: 18.2 },
]

const customerSegmentData = [
  { name: "New Customers", value: 25, fill: "#f472b6" }, // Pink
  { name: "At Risk", value: 15, fill: "#ef4444" }, // Red
  { name: "Loyal", value: 40, fill: "#22c55e" }, // Green
  { name: "Dormant", value: 20, fill: "#f59e0b" }, // Amber
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950">
      <NavHeader />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Analyze customer churn patterns and identify key retention opportunities.
            </p>
          </div>

          <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="segments">Segments</TabsTrigger>
              <TabsTrigger value="factors">Churn Factors</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">7,832</div>
                    <p className="text-xs text-muted-foreground">+2.5% from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15.7%</div>
                    <p className="text-xs text-muted-foreground">-0.8% from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Tenure</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">18.2 mo</div>
                    <p className="text-xs text-muted-foreground">+1.3 from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Monthly Charge</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$72.38</div>
                    <p className="text-xs text-muted-foreground">+$1.25 from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Card className="col-span-1 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader>
                    <CardTitle>Churn by Contract Type</CardTitle>
                    <CardDescription>Percentage of customers who churned by contract type</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={churnByContractData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {churnByContractData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, "Churn Rate"]} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card className="col-span-1 bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                  <CardHeader>
                    <CardTitle>Churn Trend</CardTitle>
                    <CardDescription>Monthly churn rate over the past year</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={churnTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[10, 20]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Churn Rate"]} />
                        <Line
                          type="monotone"
                          dataKey="churnRate"
                          stroke="#a855f7"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Churn Rate Trends</CardTitle>
                  <CardDescription>Monthly churn rate over the past year with trend analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={churnTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[10, 20]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Churn Rate"]} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="churnRate"
                        stroke="#a855f7"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="segments" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Customer Segments</CardTitle>
                  <CardDescription>Distribution of customers by segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={customerSegmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {customerSegmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="factors" className="space-y-4">
              <Card className="bg-white/80 dark:bg-gray-800/60 backdrop-blur-sm border-purple-100 dark:border-purple-900">
                <CardHeader>
                  <CardTitle>Churn by Service Type</CardTitle>
                  <CardDescription>Churn rates for customers with and without specific services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={churnByServiceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 50]} />
                      <Tooltip formatter={(value) => [`${value}%`, "Churn Rate"]} />
                      <Legend />
                      <Bar dataKey="yes" name="Has Service" fill="#a855f7" />
                      <Bar dataKey="no" name="No Service" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}
