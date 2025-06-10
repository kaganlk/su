"use client"

import { useState, useEffect } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Progress } from "@/components/ui/progress"
import { Droplet, AlertTriangle, Info, Lightbulb } from "lucide-react"
import { getBarajData } from "@/lib/firebase"
import { ThemeToggle } from "@/components/theme-toggle"

export function KonyaBarajlari() {
  const [barajData, setBarajData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function fetchBarajData() {
      try {
        console.log("Fetching baraj data...")
        const data = await getBarajData()

        // Component hala mount edilmişse state'i güncelle
        if (isMounted) {
          console.log("Baraj data fetched successfully")
          setBarajData(data)
          setError(null)
        }
      } catch (error) {
        console.error("Baraj verileri yüklenirken hata:", error)

        // Component hala mount edilmişse hata state'ini güncelle
        if (isMounted) {
          setError("Baraj verileri yüklenemedi")
          // Hata durumunda barajData null olarak kalacak ve mock data kullanılacak
        }
      } finally {
        // Component hala mount edilmişse loading state'ini güncelle
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchBarajData()

    // Cleanup function
    return () => {
      isMounted = false
    }
  }, [])

  // Mock data for demonstration - barajData null ise bu veri kullanılacak
  const mockBarajData = {
    barajlar: [
      {
        name: "Altınapa Barajı",
        capacity: 15.7,
        currentLevel: 4.2,
        percentage: 27,
        estimatedDepletion: "Ekim 2025",
        status: "warning",
      },
      {
        name: "Apa Barajı",
        capacity: 110.0,
        currentLevel: 18.7,
        percentage: 17,
        estimatedDepletion: "Ağustos 2025",
        status: "critical",
      },
      {
        name: "Bağbaşı Barajı",
        capacity: 35.5,
        currentLevel: 12.4,
        percentage: 35,
        estimatedDepletion: "Aralık 2025",
        status: "warning",
      },
      {
        name: "Beyşehir Gölü",
        capacity: 4150.0,
        currentLevel: 1660.0,
        percentage: 40,
        estimatedDepletion: "Şubat 2026",
        status: "warning",
      },
      {
        name: "Sille Barajı",
        capacity: 12.5,
        currentLevel: 5.0,
        percentage: 40,
        estimatedDepletion: "Ocak 2026",
        status: "warning",
      },
    ],
    lastUpdated: "15 Mayıs 2025",
    averagePercentage: 31.8,
  }

  // barajData null ise mockBarajData kullan
  const data = barajData || mockBarajData

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "text-red-600 dark:text-red-400"
      case "warning":
        return "text-amber-600 dark:text-amber-400"
      case "normal":
        return "text-green-600 dark:text-green-400"
      default:
        return "text-blue-600 dark:text-blue-400"
    }
  }

  const getProgressColor = (percentage) => {
    if (percentage < 20) return "bg-red-500"
    if (percentage < 40) return "bg-amber-500"
    return "bg-green-500"
  }

  // Hata durumunda bile yan paneli göster, sadece içeriği değiştir
  return (
    <Sidebar variant="sidebar" className="border-r border-slate-200 dark:border-slate-800">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-blue-500" />
            <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-400">Konya Barajları</h2>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-2 text-sm text-blue-700 dark:text-blue-400">Yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="p-4">
            <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800 mb-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-400">Veri yüklenemedi</p>
                  <p className="text-xs text-red-700 dark:text-red-300 mt-1">Örnek veriler gösteriliyor</p>
                </div>
              </div>
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="text-blue-700 dark:text-blue-400">
                Doluluk Oranları (Örnek)
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {/* Hata durumunda da mock data göster */}
                <div className="px-2 py-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Ortalama</span>
                    <span className="font-medium">{data.averagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={data.averagePercentage} className="h-2 mb-4" />
                </div>

                <SidebarMenu>
                  {data.barajlar.map((baraj) => (
                    <SidebarMenuItem key={baraj.name}>
                      <div className="px-2 py-2 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{baraj.name}</span>
                          <span className={`text-xs font-medium ${getStatusColor(baraj.status)}`}>
                            {baraj.percentage}%
                          </span>
                        </div>
                        <Progress value={baraj.percentage} className={`h-1.5 ${getProgressColor(baraj.percentage)}`} />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {baraj.currentLevel.toFixed(1)} / {baraj.capacity.toFixed(1)} hm³
                          </span>
                          <div className="flex items-center gap-1">
                            {baraj.status === "critical" && (
                              <AlertTriangle className="h-3 w-3 text-red-500 dark:text-red-400" />
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Tahmini: {baraj.estimatedDepletion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </div>
        ) : (
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="text-blue-700 dark:text-blue-400">Doluluk Oranları</SidebarGroupLabel>
              <SidebarGroupContent>
                <div className="px-2 py-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">Ortalama</span>
                    <span className="font-medium">{data.averagePercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={data.averagePercentage} className="h-2 mb-4" />
                </div>

                <SidebarMenu>
                  {data.barajlar.map((baraj) => (
                    <SidebarMenuItem key={baraj.name}>
                      <div className="px-2 py-2 w-full">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{baraj.name}</span>
                          <span className={`text-xs font-medium ${getStatusColor(baraj.status)}`}>
                            {baraj.percentage}%
                          </span>
                        </div>
                        <Progress value={baraj.percentage} className={`h-1.5 ${getProgressColor(baraj.percentage)}`} />
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {baraj.currentLevel.toFixed(1)} / {baraj.capacity.toFixed(1)} hm³
                          </span>
                          <div className="flex items-center gap-1">
                            {baraj.status === "critical" && (
                              <AlertTriangle className="h-3 w-3 text-red-500 dark:text-red-400" />
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              Tahmini: {baraj.estimatedDepletion}
                            </span>
                          </div>
                        </div>
                      </div>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup className="mt-4">
              <SidebarGroupLabel className="text-blue-700 dark:text-blue-400">Su Tasarrufu İpuçları</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-2">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm">Duş sürenizi 5 dakika ile sınırlayın</span>
                      </div>
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-2">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm">Diş fırçalarken musluğu kapatın</span>
                      </div>
                    </div>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 shrink-0 mt-0.5 text-blue-500 dark:text-blue-400" />
                        <span className="text-sm">Çamaşır ve bulaşık makinelerini tam doluyken çalıştırın</span>
                      </div>
                    </div>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 dark:border-slate-800 p-2">
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Info className="h-3 w-3" />
            <span>Son Güncelleme: {data.lastUpdated}</span>
          </div>
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
            Detaylar
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
