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
import { Droplet, ArrowLeft, Save, AlertTriangle } from "lucide-react"
import { addWaterUsageData, analyzeWaterUsage } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"
import { SidebarProvider } from "@/components/ui/sidebar"
import { KonyaBarajlari } from "@/components/konya-barajlari"
import { SavingsPanel } from "@/components/savings-panel"

export default function KullanimKaydet() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)
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
    setError(null)

    try {
      // Save data to Firebase
      const docRef = await addWaterUsageData(formData)

      // Send to OpenAI for analysis
      const analysis = await analyzeWaterUsage(formData)

      toast({
        title: "Veri başarıyla gönderildi!",
        description: "Su kullanım verileriniz kaydedildi ve analiz edildi.",
      })

      // Redirect to analysis page
      router.push(`/analiz?id=${docRef.id}`)
    } catch (error) {
      console.error("Error submitting data:", error)
      setError("Verilerinizi gönderirken bir sorun oluştu. Lütfen tekrar deneyin.")
      toast({
        title: "Veri gönderilirken hata oluştu",
        description: "Verilerinizi gönderirken bir sorun oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <KonyaBarajlari />
      <SavingsPanel />
      <div className="min-h-screen py-8 md:pl-[30rem]">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 mb-6 hover:text-blue-800 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Ana Sayfaya Dön
          </Link>

          <Card className="max-w-2xl mx-auto border-blue-200 dark:border-blue-900 shadow-lg rounded-custom">
            <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
              <div className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-blue-500" />
                <CardTitle className="text-blue-700 dark:text-blue-400">Su Kullanımınızı Kaydedin</CardTitle>
              </div>
              <CardDescription className="dark:text-blue-300/70">
                Lütfen su tüketim alışkanlıklarınız hakkında bilgi verin
              </CardDescription>
            </CardHeader>

            {error && (
              <div className="px-6 pt-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                  <div className="flex items-start">
                    <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-800 dark:text-red-400">Bir hata oluştu</p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">{error}</p>
                      <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                        Çevrimdışı modda çalışıyoruz. Verileriniz geçici olarak kaydedilecek.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Adınız</Label>
                  <Input
                    id="name"
                    placeholder="Adınızı girin"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    required
                    className="rounded-custom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="shower-duration">Ortalama Duş Süresi (dakika): {formData.showerDuration}</Label>
                  <Slider
                    id="shower-duration"
                    min={1}
                    max={30}
                    step={1}
                    value={[formData.showerDuration]}
                    onValueChange={(value) => handleChange("showerDuration", value[0])}
                    className="rounded-custom"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teeth-brushing">Diş Fırçalama Sıklığı (günlük)</Label>
                  <Select
                    value={formData.teethBrushing}
                    onValueChange={(value) => handleChange("teethBrushing", value)}
                  >
                    <SelectTrigger id="teeth-brushing" className="rounded-custom">
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">Günde bir kez</SelectItem>
                      <SelectItem value="twice">Günde iki kez</SelectItem>
                      <SelectItem value="more">Günde ikiden fazla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dishwasher-usage">Bulaşık Makinesi Kullanımı (haftalık)</Label>
                  <Select
                    value={formData.dishwasherUsage}
                    onValueChange={(value) => handleChange("dishwasherUsage", value)}
                  >
                    <SelectTrigger id="dishwasher-usage" className="rounded-custom">
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Hiç kullanmıyorum</SelectItem>
                      <SelectItem value="once">Haftada bir kez</SelectItem>
                      <SelectItem value="twice">Haftada iki kez</SelectItem>
                      <SelectItem value="thrice">Haftada 3 kez</SelectItem>
                      <SelectItem value="daily">Her gün</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="washing-machine-usage">Çamaşır Makinesi Kullanımı (haftalık)</Label>
                  <Select
                    value={formData.washingMachineUsage}
                    onValueChange={(value) => handleChange("washingMachineUsage", value)}
                  >
                    <SelectTrigger id="washing-machine-usage" className="rounded-custom">
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Hiç kullanmıyorum</SelectItem>
                      <SelectItem value="once">Haftada bir kez</SelectItem>
                      <SelectItem value="twice">Haftada iki kez</SelectItem>
                      <SelectItem value="thrice">Haftada 3 kez</SelectItem>
                      <SelectItem value="daily">Her gün</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="garden-watering">Bahçe Sulama Sıklığı (haftalık)</Label>
                  <Select
                    value={formData.gardenWatering}
                    onValueChange={(value) => handleChange("gardenWatering", value)}
                  >
                    <SelectTrigger id="garden-watering" className="rounded-custom">
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Hiç</SelectItem>
                      <SelectItem value="once">Haftada bir kez</SelectItem>
                      <SelectItem value="twice">Haftada iki kez</SelectItem>
                      <SelectItem value="thrice">Haftada 3 kez</SelectItem>
                      <SelectItem value="daily">Her gün</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="car-washing">Araba Yıkama Sıklığı (aylık)</Label>
                  <Select value={formData.carWashing} onValueChange={(value) => handleChange("carWashing", value)}>
                    <SelectTrigger id="car-washing" className="rounded-custom">
                      <SelectValue placeholder="Sıklık seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="never">Hiç</SelectItem>
                      <SelectItem value="once">Ayda bir kez</SelectItem>
                      <SelectItem value="twice">Ayda iki kez</SelectItem>
                      <SelectItem value="weekly">Haftalık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-b-custom">
                <Button variant="outline" type="button" onClick={() => router.push("/")} className="rounded-custom">
                  İptal
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                      <span>Gönderiliyor...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <span>Bilgileri Güncelle</span>
                    </div>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </SidebarProvider>
  )
}
