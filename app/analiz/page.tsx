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
import { SidebarProvider } from "@/components/ui/sidebar"
import { KonyaBarajlari } from "@/components/konya-barajlari"
import { SavingsPanel } from "@/components/savings-panel"

export default function Analiz() {
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
        setError("Analiz yüklenirken hata oluştu. Lütfen daha sonra tekrar deneyin.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [id])

  if (loading) {
    return (
      <SidebarProvider defaultOpen={true}>
        <KonyaBarajlari />
        <SavingsPanel />
        <div className="min-h-screen flex items-center justify-center md:pl-[30rem]">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-blue-700 dark:text-blue-400 font-medium">Su kullanım verileriniz analiz ediliyor...</p>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  if (error) {
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

            <Card className="max-w-2xl mx-auto border-red-200 dark:border-red-900 shadow-lg rounded-custom">
              <CardHeader className="bg-red-50 dark:bg-red-900/20 border-b border-red-100 dark:border-red-900 rounded-t-custom">
                <CardTitle className="text-red-700 dark:text-red-400 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Analiz Yüklenirken Hata
                </CardTitle>
              </CardHeader>
              <CardContent className="py-6">
                <p className="text-gray-700 dark:text-gray-300">{error}</p>
                <Button className="mt-4 rounded-custom" onClick={() => window.location.reload()}>
                  Tekrar Dene
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarProvider>
    )
  }

  // Mock data for demonstration (would be replaced by actual analysis data)
  const mockAnalysis = analysis || {
    userName: "Örnek Kullanıcı",
    waterUsageScore: 65,
    totalLitersPerDay: 142,
    insights: [
      "Duş süreniz önerilen 5 dakikadan daha uzun",
      "Bulaşık makinesi kullanımınız verimli",
      "Yaz ayları dışında bahçe sulama sıklığını azaltmayı düşünün",
    ],
    recommendations: [
      "Duş süresini 5 dakika azaltarak günde yaklaşık 50 litre tasarruf edin",
      "Diş fırçalama sırasında tüketimi azaltmak için su tasarruflu musluklar takın",
      "Mümkün olduğunda bahçe sulaması için yağmur suyu toplayın",
    ],
    comparison: {
      user: 142,
      cityAverage: 165,
      recommended: 100,
    },
    breakdown: [
      { category: "Duş", percentage: 40, liters: 57 },
      { category: "Bulaşık Makinesi", percentage: 15, liters: 21 },
      { category: "Çamaşır Makinesi", percentage: 20, liters: 28 },
      { category: "Bahçe", percentage: 15, liters: 21 },
      { category: "Diğer", percentage: 10, liters: 14 },
    ],
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

          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200 dark:border-blue-900 shadow-lg mb-6 rounded-custom">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
                <div className="flex items-center gap-2">
                  <Droplet className="h-6 w-6 text-blue-500" />
                  <CardTitle className="text-blue-700 dark:text-blue-400">Su Kullanım Analiziniz</CardTitle>
                </div>
                <CardDescription className="dark:text-blue-300/70">Analiz: {mockAnalysis.userName}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom text-center">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Su Kullanım Puanı</h3>
                    <div className="relative h-32 w-32 mx-auto">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                          {mockAnalysis.waterUsageScore}
                        </span>
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
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {mockAnalysis.waterUsageScore < 50
                        ? "Mükemmel"
                        : mockAnalysis.waterUsageScore < 70
                          ? "İyi"
                          : mockAnalysis.waterUsageScore < 85
                            ? "Ortalama"
                            : "İyileştirme Gerekli"}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom text-center">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-1">Günlük Tüketim</h3>
                    <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                      {mockAnalysis.totalLitersPerDay}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">litre/gün</p>
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                        <span>Siz</span>
                        <span>Şehir Ort.</span>
                        <span>Hedef</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full relative">
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

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-custom">
                    <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 mb-3 text-center">
                      Kullanım Dağılımı
                    </h3>
                    <div className="space-y-2">
                      {mockAnalysis.breakdown.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-700 dark:text-gray-300">{item.category}</span>
                            <span className="text-gray-700 dark:text-gray-300">
                              {item.liters} L ({item.percentage}%)
                            </span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="insights" className="rounded-custom">
                  <TabsList className="grid w-full grid-cols-2 rounded-custom">
                    <TabsTrigger value="insights" className="flex items-center gap-2 rounded-custom">
                      <BarChart2 className="h-4 w-4" />
                      İçgörüler
                    </TabsTrigger>
                    <TabsTrigger value="recommendations" className="flex items-center gap-2 rounded-custom">
                      <Lightbulb className="h-4 w-4" />
                      Öneriler
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent
                    value="insights"
                    className="p-4 bg-white dark:bg-zinc-900 rounded-custom mt-2 border border-gray-200 dark:border-gray-800"
                  >
                    <ul className="space-y-2">
                      {mockAnalysis.insights.map((insight, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-blue-100 dark:bg-blue-900/40 p-1 rounded-full mt-0.5">
                            <Droplet className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent
                    value="recommendations"
                    className="p-4 bg-white dark:bg-zinc-900 rounded-custom mt-2 border border-gray-200 dark:border-gray-800"
                  >
                    <ul className="space-y-2">
                      {mockAnalysis.recommendations.map((recommendation, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full mt-0.5">
                            <Lightbulb className="h-3 w-3 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{recommendation}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="flex justify-center gap-4">
              <Button variant="outline" className="bg-white dark:bg-slate-800 rounded-custom">
                Raporu İndir
              </Button>
              <Link href="/ayarlar">
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom">
                  Ayarları Görüntüle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
