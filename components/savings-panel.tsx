"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplet, Coins, TrendingUp, Award } from "lucide-react"
import { cn } from "@/lib/utils"

export function SavingsPanel({ className }: { className?: string }) {
  const [isVisible, setIsVisible] = useState(true)
  const [savingsData, setSavingsData] = useState({
    monthlySavings: 78.5, // TL cinsinden
    waterSaved: 1250, // Litre cinsinden
    contributionPercentage: 0.012, // Toplam katkı yüzdesi
    contributionRank: 1243, // Katkı sıralaması
    totalUsers: 15420, // Toplam kullanıcı sayısı
    savingsGoal: 2000, // Hedef tasarruf (litre)
    savingsProgress: 62.5, // Hedefe göre ilerleme yüzdesi
  })

  // Animasyon için progress değerini kademeli olarak artır
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(savingsData.savingsProgress)
    }, 500)
    return () => clearTimeout(timer)
  }, [savingsData.savingsProgress])

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 left-[16rem] z-10 flex flex-col transition-all duration-300 ease-in-out",
        isVisible ? "translate-x-0" : "translate-x-[-16rem]",
        className,
      )}
    >
      {/* Toggle button */}
      <button
        onClick={toggleVisibility}
        className={cn(
          "absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-600 dark:bg-blue-700 text-white rounded-full p-1 shadow-md z-20 transition-transform duration-300",
          isVisible ? "rotate-0" : "rotate-180",
        )}
        aria-label={isVisible ? "Paneli gizle" : "Paneli göster"}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Panel content */}
      <div
        className={cn(
          "h-full w-[16rem] bg-gradient-to-b from-blue-50/80 to-blue-100/80 dark:from-blue-950/30 dark:to-blue-900/30 backdrop-blur-sm border-r border-blue-200 dark:border-blue-900 overflow-auto py-4 px-3",
          "flex flex-col gap-4 justify-center",
        )}
      >
        {/* Aylık maddi kazanç kartı */}
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-blue-200 dark:border-blue-900 shadow-md rounded-custom overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Coins className="h-4 w-4" />
                Aylık Tasarruf
              </h3>
              <span className="text-xs text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                Bu Ay
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {savingsData.monthlySavings.toFixed(1)}
              </span>
              <span className="text-sm text-blue-600 dark:text-blue-500">₺</span>
            </div>

            <div className="flex items-center text-xs text-green-600 dark:text-green-500 mb-3">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>Geçen aya göre %12 daha fazla tasarruf</span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Su Faturası Tasarrufu</span>
                <span className="font-medium">₺{(savingsData.monthlySavings * 0.8).toFixed(1)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                <span>Enerji Tasarrufu</span>
                <span className="font-medium">₺{(savingsData.monthlySavings * 0.2).toFixed(1)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-t border-blue-100 dark:border-blue-900">
            <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300 mb-1">
              <span>Yıllık Tahmini Tasarruf</span>
              <span className="font-medium">₺{(savingsData.monthlySavings * 12).toFixed(0)}</span>
            </div>
          </div>
        </Card>

        {/* Su tasarrufu katkısı kartı */}
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-blue-200 dark:border-blue-900 shadow-md rounded-custom overflow-hidden">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                <Droplet className="h-4 w-4" />
                Su Tasarrufu
              </h3>
              <span className="text-xs text-blue-600 dark:text-blue-500 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded-full">
                Toplam
              </span>
            </div>

            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                {savingsData.waterSaved.toLocaleString()}
              </span>
              <span className="text-sm text-blue-600 dark:text-blue-500">litre</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Hedefe İlerleme</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-3">
              <Award className="h-5 w-5 text-amber-500" />
              <div className="text-center">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Konya'da {savingsData.contributionRank}. sıradasınız
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Toplam {savingsData.totalUsers} kullanıcı arasında
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 border-t border-blue-100 dark:border-blue-900">
            <div className="text-xs text-gray-700 dark:text-gray-300">
              <div className="flex justify-between mb-1">
                <span>Toplam Katkı Oranınız</span>
                <span className="font-medium">{(savingsData.contributionPercentage * 100).toFixed(3)}%</span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Tasarrufunuz {Math.round(savingsData.waterSaved / 10)} kişinin günlük su ihtiyacını karşılıyor
              </div>
            </div>
          </div>
        </Card>

        {/* Bilgi notu */}
        <div className="text-xs text-center text-gray-500 dark:text-gray-400 px-2">
          Su tasarrufunuz, Konya'nın su kaynaklarının korunmasına doğrudan katkı sağlıyor.
        </div>
      </div>
    </div>
  )
}
