import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { WeatherProvider } from '@/contexts/WeatherContext'
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'AccuWeather - Accurate Weather Forecasts & Real-Time Updates',
    template: '%s | AccuWeather'
  },
  description: 'Get accurate weather forecasts, hourly updates, and 10-day predictions for any location worldwide. Real-time weather data, severe weather alerts, and detailed meteorological insights.',
  keywords: [
    'weather forecast',
    'weather today',
    'hourly weather',
    'daily weather',
    '10 day forecast',
    'weather app',
    'accurate weather',
    'real-time weather',
    'weather radar',
    'temperature',
    'precipitation',
    'weather alerts',
    'local weather',
    'world weather',
    'meteorology'
  ],
  authors: [{ name: 'AccuWeather Team' }],
  creator: 'AccuWeather',
  publisher: 'AccuWeather',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.accuweather.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.accuweather.com',
    title: 'AccuWeather - Accurate Weather Forecasts & Real-Time Updates',
    description: 'Get accurate weather forecasts, hourly updates, and 10-day predictions for any location worldwide. Real-time weather data and severe weather alerts.',
    siteName: 'AccuWeather',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AccuWeather - Your Trusted Weather Source',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AccuWeather - Accurate Weather Forecasts',
    description: 'Get accurate weather forecasts, hourly updates, and 10-day predictions for any location worldwide.',
    images: ['/twitter-image.jpg'],
    creator: '@accuweather',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  category: 'weather',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Structured Data - Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AccuWeather',
    url: 'https://www.accuweather.com',
    logo: 'https://www.accuweather.com/logo.png',
    description: 'Leading provider of accurate weather forecasts and real-time weather updates worldwide',
    sameAs: [
      'https://www.facebook.com/accuweather',
      'https://twitter.com/accuweather',
      'https://www.instagram.com/accuweather',
      'https://www.youtube.com/accuweather',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'support@accuweather.com',
      availableLanguage: ['English'],
    },
  };

  // Structured Data - Website Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AccuWeather',
    url: 'https://www.accuweather.com',
    description: 'Accurate weather forecasts, real-time updates, and meteorological insights',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.accuweather.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // Structured Data - WebApplication Schema
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'AccuWeather',
    url: 'https://www.accuweather.com',
    description: 'Advanced weather forecasting application with hourly, daily, and extended forecasts',
    applicationCategory: 'WeatherApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Real-time weather updates',
      'Hourly forecasts',
      '10-day weather predictions',
      'Weather alerts',
      'Location-based forecasts',
      'Dark mode support',
    ],
  };

  return (
    <html lang="en">
      <head>
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
        />
      </head>
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
