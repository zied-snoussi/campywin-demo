import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:             'CampyWin – Explore the Wild, Find Your Win',
    short_name:       'CampyWin',
    description:      "Tunisia's premier platform for glamping stays, outdoor events, adventure careers, and carpooling to nature spots.",
    start_url:        '/',
    display:          'standalone',
    orientation:      'portrait-primary',
    background_color: '#022c22',
    theme_color:      '#059669',
    lang:             'fr',
    dir:              'ltr',
    categories:       ['travel', 'lifestyle', 'outdoor', 'sports'],
    icons: [
      {
        src:     '/apple-touch-icon.png',
        sizes:   '180x180',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icon-192.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icon-512.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/icon-512.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    shortcuts: [
      {
        name:        'Séjours',
        short_name:  'Séjours',
        url:         '/accommodations',
        description: 'Parcourir les hébergements camping',
        icons:       [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name:        'Événements',
        short_name:  'Événements',
        url:         '/events',
        description: 'Découvrir les événements outdoor',
        icons:       [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name:        'Emplois',
        short_name:  'Emplois',
        url:         '/jobs',
        description: 'Trouver un emploi outdoor',
        icons:       [{ src: '/icon-192.png', sizes: '192x192' }],
      },
      {
        name:        'Transport',
        short_name:  'Transport',
        url:         '/dashboard/client/transport',
        description: 'Covoiturage vers les spots camping',
        icons:       [{ src: '/icon-192.png', sizes: '192x192' }],
      },
    ],
  };
}
