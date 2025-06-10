"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, TrendingDown, TrendingUp } from "lucide-react"
import { getUserWaterUsageHistory } from "@/lib/firebase"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts"

export default function Dashboard() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUserData() {
      try {
        // In a real app, you would get the user ID from authentication
        const userId = "current-user"
        const data = await getUserWaterUsageHistory(userId)
        setUserData(data)
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  // Mock data for demonstration
  const mockData = {
    dailyUsage: [
      { date: "May 1", liters: 145 },
      { date: "May 2", liters: 139 },
      { date: "May 3", liters: 152 },
      { date: "May 4", liters: 146 },
      { date: "May 5", liters: 135 },
      { date: "May 6", liters: 130 },
      { date: "May 7", liters: 128 },
    ],
    weeklyComparison: [
      { category: "Shower", thisWeek: 350, lastWeek: 420 },
      { category: "Dishwasher", thisWeek: 140, lastWeek: 150 },
      { category: "Washing Machine", thisWeek: 180, lastWeek: 200 },
      { category: "Garden", thisWeek: 120, lastWeek: 160 },
      { category: "Other", thisWeek: 90, lastWeek: 100 },
    ],
    monthlyTrend: [
      { month: "Jan", liters: 4800 },
      { month: "Feb", liters: 4600 },
      { month: "Mar", liters: 4400 },
      { month: "Apr", liters: 4200 },
      { month: "May", liters: 3900 },
    ],
    stats: {
      totalSaved: 320,
      percentImprovement: 12,
      currentStreak: 7,
      bestCategory: "Shower",
      worstCategory: "Garden",
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-700 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  const data = userData || mockData

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold text-blue-800 mb-6">Your Water Usage Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardDescription>Total Water Saved</CardDescription>
                <CardTitle className="text-2xl text-blue-700">{data.stats.totalSaved} L</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-green-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">{data.stats.percentImprovement}% improvement</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardDescription>Current Streak</CardDescription>
                <CardTitle className="text-2xl text-blue-700">{data.stats.currentStreak} days</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-blue-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span className="text-sm">Below city average</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardDescription>Most Improved</CardDescription>
                <CardTitle className="text-2xl text-blue-700">{data.stats.bestCategory}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-green-600">
                  <TrendingDown className="h-4 w-4 mr-1" />
                  <span className="text-sm">Great progress!</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="pb-2">
                <CardDescription>Needs Improvement</CardDescription>
                <CardTitle className="text-2xl text-blue-700">{data.stats.worstCategory}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-amber-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm">Above average usage</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="daily" className="space-y-4">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly Comparison</TabsTrigger>
              <TabsTrigger value="monthly">Monthly Trend</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Daily Water Usage</CardTitle>
                  <CardDescription>Last 7 days of water consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.dailyUsage} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="liters" stroke="#3b82f6" activeDot={{ r: 8 }} name="Liters" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="weekly" className="space-y-4">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Weekly Comparison</CardTitle>
                  <CardDescription>This week vs last week by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.weeklyComparison} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="lastWeek" name="Last Week" fill="#94a3b8" />
                        <Bar dataKey="thisWeek" name="This Week" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="monthly" className="space-y-4">
              <Card className="border-blue-200">
                <CardHeader>
                  <CardTitle className="text-blue-700">Monthly Trend</CardTitle>
                  <CardDescription>Total water usage by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={data.monthlyTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="liters" stroke="#3b82f6" strokeWidth={2} name="Liters" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-center">
            <Link href="/log-usage">
              <Button className="bg-blue-600 hover:bg-blue-700">Log New Data</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
