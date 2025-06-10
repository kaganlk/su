import "./globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { WaterDropsBackground } from "@/components/water-drops-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Konya Su Takip",
  description: "Su tüketim alışkanlıklarınızı takip edin ve analiz edin",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-zinc-950 bg-white antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <WaterDropsBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
