"use client"

import { useEffect, useRef } from "react"

export function WaterDropsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = window.innerWidth
    let height = window.innerHeight
    canvas.width = width
    canvas.height = height

    const drops: {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
    }[] = []

    const createDrops = () => {
      const totalDrops = Math.floor(width * height * 0.0001) // Ekran büyüklüğüne göre sayıyı ayarla
      for (let i = 0; i < totalDrops; i++) {
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 5 + 1, // 1-6 arası yarıçap
          speed: Math.random() * 0.1 + 0.05, // Yavaş hareket
          opacity: Math.random() * 0.3 + 0.1, // Düşük opaklık
        })
      }
    }

    const drawDrops = () => {
      ctx.clearRect(0, 0, width, height)

      // Düşük kontrastlı tema renkleri (lightblue/darkblue)
      const isDarkMode = document.documentElement.classList.contains("dark")
      const dropColor = isDarkMode ? "rgba(59, 130, 246, " : "rgba(59, 130, 246, "

      drops.forEach((drop) => {
        ctx.beginPath()
        // Su damlası şekli çiz (oval)
        ctx.ellipse(drop.x, drop.y, drop.radius, drop.radius * 1.5, 0, 0, Math.PI * 2)
        ctx.fillStyle = `${dropColor}${drop.opacity})`
        ctx.fill()

        // Damlayı aşağı hareket ettir
        drop.y += drop.speed

        // Ekranın dışına çıkan damlaları tekrar yukarı taşı
        if (drop.y > height) {
          drop.y = -drop.radius * 2
          drop.x = Math.random() * width
        }
      })

      requestAnimationFrame(drawDrops)
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      drops.length = 0
      createDrops()
    }

    window.addEventListener("resize", handleResize)
    createDrops()
    drawDrops()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[-1]" />
}
