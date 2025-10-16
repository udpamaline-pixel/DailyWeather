import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.accuweather.com'
  const currentDate = new Date()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 1,
    },
    {
      url: `${baseUrl}/today`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/forecast`,
      lastModified: currentDate,
      changeFrequency: 'hourly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/daily`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-10-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-10-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date('2025-10-16'),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ]
}
