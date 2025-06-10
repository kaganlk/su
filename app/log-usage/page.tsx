"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Droplet, ArrowLeft, Save } from "lucide-react"
import { addWaterUsageData, analyzeWaterUsage } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"

export default function LogUsage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    showerDuration: 10,
    teethBrushing: "twice",
    dishwasherUsage: "twice",
    washingMachineUsage: "twice",
    gardenWatering: "once",
    carWashing: "never",
  })

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Save data to Firebase
      const docRef = await addWaterUsageData(formData)

      // Send to OpenAI for analysis
      const analysis = await analyzeWaterUsage(formData)

      toast({
        title: "Data submitted successfully!",
        description: "Your water usage data has been recorded and analyzed.",
      })

      // Redirect to analysis page
      router.push(`/analysis?id=${docRef.id}`)
    } catch (error) {
      console.error("Error submitting data:", error)
      toast({
        title: "Error submitting data",
        description: "There was a problem submitting your data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-flex items-center text-blue-600 mb-6 hover:text-blue-800">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="max-w-2xl mx-auto border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <div className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-blue-500" />
              <CardTitle className="text-blue-700">Log Your Water Usage</CardTitle>
            </div>
            <CardDescription>Please provide information about your water consumption habits</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shower-duration">Average Shower Duration (minutes): {formData.showerDuration}</Label>
                <Slider
                  id="shower-duration"
                  min={1}
                  max={30}
                  step={1}
                  value={[formData.showerDuration]}
                  onValueChange={(value) => handleChange("showerDuration", value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teeth-brushing">Teeth Brushing Frequency (daily)</Label>
                <Select value={formData.teethBrushing} onValueChange={(value) => handleChange("teethBrushing", value)}>
                  <SelectTrigger id="teeth-brushing">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once a day</SelectItem>
                    <SelectItem value="twice">Twice a day</SelectItem>
                    <SelectItem value="more">More than twice a day</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dishwasher-usage">Dishwasher Usage (weekly)</Label>
                <Select
                  value={formData.dishwasherUsage}
                  onValueChange={(value) => handleChange("dishwasherUsage", value)}
                >
                  <SelectTrigger id="dishwasher-usage">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never use</SelectItem>
                    <SelectItem value="once">Once a week</SelectItem>
                    <SelectItem value="twice">Twice a week</SelectItem>
                    <SelectItem value="thrice">3 times a week</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="washing-machine-usage">Washing Machine Usage (weekly)</Label>
                <Select
                  value={formData.washingMachineUsage}
                  onValueChange={(value) => handleChange("washingMachineUsage", value)}
                >
                  <SelectTrigger id="washing-machine-usage">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never use</SelectItem>
                    <SelectItem value="once">Once a week</SelectItem>
                    <SelectItem value="twice">Twice a week</SelectItem>
                    <SelectItem value="thrice">3 times a week</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="garden-watering">Garden Watering Frequency (weekly)</Label>
                <Select
                  value={formData.gardenWatering}
                  onValueChange={(value) => handleChange("gardenWatering", value)}
                >
                  <SelectTrigger id="garden-watering">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="once">Once a week</SelectItem>
                    <SelectItem value="twice">Twice a week</SelectItem>
                    <SelectItem value="thrice">3 times a week</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="car-washing">Car Washing Frequency (monthly)</Label>
                <Select value={formData.carWashing} onValueChange={(value) => handleChange("carWashing", value)}>
                  <SelectTrigger id="car-washing">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="once">Once a month</SelectItem>
                    <SelectItem value="twice">Twice a month</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t border-blue-100 bg-blue-50 px-6 py-4">
              <Button variant="outline" type="button" onClick={() => router.push("/")}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                    <span>Submitting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    <span>Submit Data</span>
                  </div>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
