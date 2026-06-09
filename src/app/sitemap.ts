import type { MetadataRoute } from 'next';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://campywin.tn';
const NOW = new Date().toISOString();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url:              APP_URL,
      lastModified:     NOW,
      changeFrequency:  'daily',
      priority:         1.0,
      alternates: {
        languages: {
          fr: `${APP_URL}/fr`,
          en: `${APP_URL}/en`,
          ar: `${APP_URL}/ar`,
        },
      },
    },
    {
      url:             `${APP_URL}/accommodations`,
      lastModified:    NOW,
      changeFrequency: 'daily',
      priority:        0.9,
    },
    {
      url:             `${APP_URL}/events`,
      lastModified:    NOW,
      changeFrequency: 'daily',
      priority:        0.9,
    },
    {
      url:             `${APP_URL}/jobs`,
      lastModified:    NOW,
      changeFrequency: 'weekly',
      priority:        0.8,
    },
    {
      url:             `${APP_URL}/login`,
      lastModified:    NOW,
      changeFrequency: 'monthly',
      priority:        0.5,
    },
  ];

  return staticPages;
}
