import { MetadataRoute } from 'next'
import siteConfig from '@/data/siteConfig.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://travelend.in'
  
  // Static routes from siteConfig navLinks
  const staticRoutes = siteConfig.navLinks.map((link) => ({
    url: `${baseUrl}${link.href === '/' ? '' : link.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: link.href === '/' ? 1 : 0.8,
  }))

  // Add specific pages that might not be in navLinks
  const extraPages = [
    '/taxi-tariff',
    '/about',
    '/contact',
    '/packages',
    '/college-trip',
    '/thoothukudi-travels'
  ].map(path => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Combine and remove duplicates
  const allRoutes = [...staticRoutes, ...extraPages]
  const uniqueRoutes = Array.from(new Set(allRoutes.map(r => r.url)))
    .map(url => allRoutes.find(r => r.url === url)!)

  return uniqueRoutes
}
