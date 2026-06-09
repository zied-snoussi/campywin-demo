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
        src:     '/logo-campy-win-green-realistic.png',
        sizes:   '192x192',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/logo-campy-win-green-realistic.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'any',
      },
      {
        src:     '/logo-campy-win-green-realistic.png',
        sizes:   '512x512',
        type:    'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src:   '/logo-campy-win-green-realistic.png',
        sizes: '1080x1920',
        type:  'image/png',
        // @ts-ignore — form_factor is valid but may not be in older TS types
        form_factor: 'narrow',
        label: 'CampyWin mobile home screen',
      },
    ],
    shortcuts: [
      {
        name:        'Séjours',
        short_name:  'Séjours',
        url:         '/accommodations',
        description: 'Parcourir les hébergements camping',
        icons:       [{ src: '/logo-campy-win-green-realistic.png', sizes: '96x96' }],
      },
      {
        name:        'Événements',
        short_name:  'Événements',
        url:         '/events',
        description: 'Découvrir les événements outdoor',
        icons:       [{ src: '/logo-campy-win-green-realistic.png', sizes: '96x96' }],
      },
      {
        name:        'Emplois',
        short_name:  'Emplois',
        url:         '/jobs',
        description: 'Trouver un emploi outdoor',
        icons:       [{ src: '/logo-campy-win-green-realistic.png', sizes: '96x96' }],
      },
      {
        name:        'Transport',
        short_name:  'Transport',
        url:         '/dashboard/client/transport',
        description: 'Covoiturage vers les spots camping',
        icons:       [{ src: '/logo-campy-win-green-realistic.png', sizes: '96x96' }],
      },
    ],
  };
}
