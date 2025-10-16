import { redirect } from 'next/navigation'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AccuWeather - Accurate Weather Forecasts & Real-Time Updates',
  description: 'Get the most accurate weather forecasts for any location worldwide. Real-time updates, hourly forecasts, 10-day predictions, severe weather alerts, and detailed meteorological data.',
}

export default function HomePage() {
  redirect('/today')
}
