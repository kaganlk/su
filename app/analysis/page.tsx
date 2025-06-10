"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Droplet, BarChart2, Lightbulb, AlertTriangle } from "lucide-react"
import { getWaterUsageAnalysis } from "@/lib/firebase"
import { Progress } from "@/components/ui/progress"

export default function Analysis() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchAnalysis() {
      if (!id) return

      try {
        const data = await getWaterUsageAnalysis(id)
        setAnalysis(data)
      } catch (err) {
        console.error("Error fetching analysis:", err)
        setError("Failed to load analysis. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-700 font-medium">Analyzing your water usage data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>

          <Card className="max-w-2xl mx-auto border-red-200 shadow-lg">
            <CardHeader className="bg-red-50 border-b border-red-100">
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Error Loading Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <p className="text-gray-700">{error}</p>
              <Button className="mt-4" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Mock data for demonstration (would be replaced by actual analysis data)
  const mockAnalysis = analysis || {
    userName: "Sample User",
    waterUsageScore: 65,
    totalLitersPerDay: 142,
    insights: [
      "Your shower duration is longer than the recommended 5 minutes",
      "Your dishwasher usage is efficient",
      "Consider reducing garden watering frequency during non-summer months",
    ],
    recommendations: [
      "Reduce shower time by 5 minutes to save approximately 50 liters per day",
      "Install water-efficient faucets to reduce consumption during teeth brushing",
      "Collect rainwater for garden watering when possible",
    ],
    comparison: {
      user: 142,
      cityAverage: 165,
      recommended: 100,
    },
    breakdown: [
      { category: "Shower", percentage: 40, liters: 57 },
      { category: "Dishwasher", percentage: 15, liters: 21 },
      { category: "Washing Machine", percentage: 20, liters: 28 },
      { category: "Garden", percentage: 15, liters: 21 },
      { category: "Other", percentage: 10, liters: 14 },
    ],
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <Card className="border-blue-200 shadow-lg mb-6">
            <CardHeader className="bg-blue-50 border-b border-blue-100">
              <div className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-blue-700">Your Water Usage Analysis</CardTitle>
              </div>
              <CardDescription>Analysis for {mockAnalysis.userName}</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm font-medium text-blue-700 mb-1">Water Usage Score</h3>
                  <div className="relative h-32 w-32 mx-auto">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-700">{mockAnalysis.waterUsageScore}</span>
                    </div>
                    <svg className="h-full w-full" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="#e6f0fd" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="10"
                        strokeDasharray={`${mockAnalysis.waterUsageScore * 2.83} 283`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {mockAnalysis.waterUsageScore < 50
                      ? "Excellent"
                      : mockAnalysis.waterUsageScore < 70
                        ? "Good"
                        : mockAnalysis.waterUsageScore < 85
                          ? "Average"
                          : "Needs Improvement"}
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <h3 className="text-sm font-medium text-blue-700 mb-1">Daily Consumption</h3>
                  <p className="text-3xl font-bold text-blue-700">{mockAnalysis.totalLitersPerDay}</p>
                  <p className="text-sm text-gray-600">liters per day</p>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>You</span>
                      <span>City Avg</span>
                      <span>Target</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full relative">
                      <div
                        className="absolute h-2 bg-blue-500 rounded-full"
                        style={{
                          width: `${(mockAnalysis.comparison.user / mockAnalysis.comparison.cityAverage) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="absolute h-4 w-1 bg-green-500 top-1/2 transform -translate-y-1/2"
                        style={{
                          left: `${(mockAnalysis.comparison.recommended / mockAnalysis.comparison.cityAverage) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-700 mb-3 text-center">Usage Breakdown</h3>
                  <div className="space-y-2">
                    {mockAnalysis.breakdown.map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-xs mb-1">
                          <span>{item.category}</span>
                          <span>
                            {item.liters} L ({item.percentage}%)
                          </span>
                        </div>
                        <Progress value={item.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Tabs defaultValue="insights">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="insights" className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    Insights
                  </TabsTrigger>
                  <TabsTrigger value="recommendations" className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" />
                    Recommendations
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="insights" className="p-4 bg-white rounded-md mt-2 border border-gray-200">
                  <ul className="space-y-2">
                    {mockAnalysis.insights.map((insight, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                          <Droplet className="h-3 w-3 text-blue-600" />
                        </div>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                <TabsContent value="recommendations" className="p-4 bg-white rounded-md mt-2 border border-gray-200">
                  <ul className="space-y-2">
                    {mockAnalysis.recommendations.map((recommendation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="bg-green-100 p-1 rounded-full mt-0.5">
                          <Lightbulb className="h-3 w-3 text-green-600" />
                        </div>
                        <span>{recommendation}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-4">
            <Button variant="outline" className="bg-white">
              Download Report
            </Button>
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">View Dashboard</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
