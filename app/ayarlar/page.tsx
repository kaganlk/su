"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Users, Home } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { SidebarProvider } from "@/components/ui/sidebar"
import { KonyaBarajlari } from "@/components/konya-barajlari"
import { SavingsPanel } from "@/components/savings-panel"
import { updateFamilySettings } from "@/lib/firebase"

export default function Ayarlar() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    familyName: "",
    familySize: "4",
    homeType: "apartment",
    hasPets: "no",
    hasGarden: "no",
    hasCar: "yes",
    region: "merkez",
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
      // Update family settings in Firebase
      await updateFamilySettings(formData)

      toast({
        title: "Ayarlar başarıyla güncellendi!",
        description: "Aile bilgileriniz kaydedildi.",
      })
    } catch (error) {
      console.error("Error updating settings:", error)
      toast({
        title: "Ayarlar güncellenirken hata oluştu",
        description: "Bilgilerinizi güncellerken bir sorun oluştu. Lütfen tekrar deneyin.",
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200 dark:border-blue-900 shadow-lg rounded-custom">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
                <div className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-blue-700 dark:text-blue-400">Aile Ayarları</CardTitle>
                </div>
                <CardDescription className="dark:text-blue-300/70">Aile bilgilerinizi güncelleyin</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="family-name">Aile Adı</Label>
                    <Input
                      id="family-name"
                      placeholder="Aile adınızı girin"
                      value={formData.familyName}
                      onChange={(e) => handleChange("familyName", e.target.value)}
                      required
                      className="rounded-custom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="family-size">Aile Büyüklüğü</Label>
                    <Select value={formData.familySize} onValueChange={(value) => handleChange("familySize", value)}>
                      <SelectTrigger id="family-size" className="rounded-custom">
                        <SelectValue placeholder="Aile büyüklüğünü seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 kişi</SelectItem>
                        <SelectItem value="2">2 kişi</SelectItem>
                        <SelectItem value="3">3 kişi</SelectItem>
                        <SelectItem value="4">4 kişi</SelectItem>
                        <SelectItem value="5">5 kişi</SelectItem>
                        <SelectItem value="6+">6+ kişi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="home-type">Ev Tipi</Label>
                    <Select value={formData.homeType} onValueChange={(value) => handleChange("homeType", value)}>
                      <SelectTrigger id="home-type" className="rounded-custom">
                        <SelectValue placeholder="Ev tipini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartman Dairesi</SelectItem>
                        <SelectItem value="house">Müstakil Ev</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="has-pets">Evcil Hayvan</Label>
                    <Select value={formData.hasPets} onValueChange={(value) => handleChange("hasPets", value)}>
                      <SelectTrigger id="has-pets" className="rounded-custom">
                        <SelectValue placeholder="Evcil hayvanınız var mı?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Evet</SelectItem>
                        <SelectItem value="no">Hayır</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="has-garden">Bahçe</Label>
                    <Select value={formData.hasGarden} onValueChange={(value) => handleChange("hasGarden", value)}>
                      <SelectTrigger id="has-garden" className="rounded-custom">
                        <SelectValue placeholder="Bahçeniz var mı?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Evet</SelectItem>
                        <SelectItem value="no">Hayır</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="has-car">Araba</Label>
                    <Select value={formData.hasCar} onValueChange={(value) => handleChange("hasCar", value)}>
                      <SelectTrigger id="has-car" className="rounded-custom">
                        <SelectValue placeholder="Arabanız var mı?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Evet</SelectItem>
                        <SelectItem value="no">Hayır</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="region">Konya'da Yaşadığınız Bölge</Label>
                    <Select value={formData.region} onValueChange={(value) => handleChange("region", value)}>
                      <SelectTrigger id="region" className="rounded-custom">
                        <SelectValue placeholder="Bölge seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="merkez">Merkez</SelectItem>
                        <SelectItem value="selcuklu">Selçuklu</SelectItem>
                        <SelectItem value="meram">Meram</SelectItem>
                        <SelectItem value="karatay">Karatay</SelectItem>
                        <SelectItem value="other">Diğer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t border-blue-100 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20 px-6 py-4 rounded-b-custom">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-custom"
                  >
                    Sıfırla
                  </Button>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        <span>Güncelleniyor...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        <span>Ayarları Kaydet</span>
                      </div>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>

            <Card className="border-blue-200 dark:border-blue-900 shadow-lg rounded-custom">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
                <div className="flex items-center gap-2">
                  <Home className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-blue-700 dark:text-blue-400">Ev Bilgileri</CardTitle>
                </div>
                <CardDescription className="dark:text-blue-300/70">
                  Evinizle ilgili ek bilgiler ve faturalar
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">Tahmini Su Tüketimi</h3>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">165 L/gün</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">kişi başı</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">Aylık Su Faturası</h3>
                    <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">₺320</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ortalama</p>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom">
                  <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-2">Tasarruf Potansiyeli</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "35%" }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">35%</span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                    Önerilerimizi uygulayarak su tüketiminizi %35 azaltabilirsiniz.
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400">Aylık Fatura Bilgileri</h3>

                  <div className="space-y-2">
                    <Label htmlFor="water-bill">Su Faturası (₺)</Label>
                    <Input
                      id="water-bill"
                      type="number"
                      placeholder="Aylık su faturası tutarını girin"
                      className="rounded-custom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="electricity-bill">Elektrik Faturası (₺)</Label>
                    <Input
                      id="electricity-bill"
                      type="number"
                      placeholder="Aylık elektrik faturası tutarını girin"
                      className="rounded-custom"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bill-month">Fatura Dönemi</Label>
                    <Select defaultValue="may">
                      <SelectTrigger id="bill-month" className="rounded-custom">
                        <SelectValue placeholder="Fatura dönemini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">Ocak 2025</SelectItem>
                        <SelectItem value="february">Şubat 2025</SelectItem>
                        <SelectItem value="march">Mart 2025</SelectItem>
                        <SelectItem value="april">Nisan 2025</SelectItem>
                        <SelectItem value="may">Mayıs 2025</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom">
                    Fatura Bilgilerini Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
