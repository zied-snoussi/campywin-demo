import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://campywin.tn';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/login',
          '/_next/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/accommodations',
          '/events',
          '/jobs',
        ],
        disallow: '/dashboard/',
      },
    ],
    sitemap:    `${APP_URL}/sitemap.xml`,
    host:       APP_URL,
  };
}
