import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, BarChart, User, Settings } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { KonyaBarajlari } from "@/components/konya-barajlari"
import { SavingsPanel } from "@/components/savings-panel"

export default function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <KonyaBarajlari />
      <SavingsPanel />
      <div className="flex min-h-screen flex-col md:pl-[30rem]">
        <header className="bg-white dark:bg-zinc-900 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Droplet className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-blue-700 dark:text-blue-400">Konya Su Takip</h1>
            </div>
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-blue-700 dark:text-blue-400 font-medium">
                Ana Sayfa
              </Link>
              <Link href="/analiz" className="text-blue-600 dark:text-blue-500">
                Analiz
              </Link>
              <Link href="/ayarlar" className="text-blue-600 dark:text-blue-500">
                Ayarlar
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-6 py-8">
          <section className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-4">Su Tüketiminizi Takip Edin</h2>
            <p className="text-lg text-blue-700 dark:text-blue-400 max-w-2xl mx-auto">
              Konya'nın su kaynaklarını korumak için su kullanım alışkanlıklarınızı izleyin ve geliştirin.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 mx-auto max-w-6xl">
            <Card className="border-blue-200 dark:border-blue-900 shadow-md hover:shadow-lg transition-shadow rounded-custom">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
                <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Kullanım Kaydet
                </CardTitle>
                <CardDescription className="dark:text-blue-300/70">
                  Günlük su tüketim alışkanlıklarınızı kaydedin
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Duş süresi, diş fırçalama, bulaşık makinesi kullanımı ve daha fazlasını takip ederek su ayak izinizi
                  anlayın.
                </p>
                <Link href="/kullanim-kaydet">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom">
                    Kayıt Başlat
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-blue-200 dark:border-blue-900 shadow-md hover:shadow-lg transition-shadow rounded-custom">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900 rounded-t-custom">
                <CardTitle className="text-blue-700 dark:text-blue-400 flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Analiz Görüntüle
                </CardTitle>
                <CardDescription className="dark:text-blue-300/70">İçgörüler ve öneriler alın</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Su kullanım alışkanlıklarınızın yapay zeka destekli analizini görüntüleyin ve kişiselleştirilmiş
                  tasarruf önerileri alın.
                </p>
                <Link href="/analiz">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 rounded-custom">
                    İçgörüleri Gör
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <section className="bg-white dark:bg-zinc-900 rounded-custom shadow-md p-8 mb-12 mx-auto max-w-6xl">
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">
              Neden Su Kullanımınızı Takip Etmelisiniz?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mb-4">
                  <Droplet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">Koruma</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Konya'nın sınırlı su kaynaklarını gelecek nesiller için korumaya yardımcı olun
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mb-4">
                  <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">Verimlilik</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Günlük rutininizde suyu daha verimli kullanmanın yollarını belirleyin
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-blue-100 dark:bg-blue-900/40 p-3 rounded-full mb-4">
                  <BarChart className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="text-lg font-semibold text-blue-700 dark:text-blue-400 mb-2">İçgörüler</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Benzersiz kullanım alışkanlıklarınıza dayalı kişiselleştirilmiş öneriler alın
                </p>
              </div>
            </div>
          </section>
        </main>

        <footer className="bg-blue-800 dark:bg-blue-900 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center gap-2 mb-2">
                  <Droplet className="h-5 w-5" />
                  <span className="font-bold">Konya Su Takip</span>
                </div>
                <p className="text-blue-200 text-sm">Konya sakinlerinin su kaynaklarını korumasına yardımcı oluyoruz</p>
              </div>
              <div className="flex gap-6">
                <Link href="/hakkimizda" className="text-blue-200 hover:text-white">
                  Hakkımızda
                </Link>
                <Link href="/iletisim" className="text-blue-200 hover:text-white">
                  İletişim
                </Link>
                <Link href="/gizlilik" className="text-blue-200 hover:text-white">
                  Gizlilik
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  )
}
