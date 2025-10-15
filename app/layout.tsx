import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { WeatherProvider } from '@/contexts/WeatherContext'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Daily Dewdrops - Weather App',
  description: 'Your daily weather companion with detailed forecasts and insights',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <WeatherProvider>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              {children}
              <Footer />
            </div>
          </WeatherProvider>
        </Providers>
      </body>
    </html>
  )
}
