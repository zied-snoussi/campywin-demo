import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://campywin.tn';

// ── Viewport (theme-color lives here in Next.js 16) ──────────────────────────
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#059669' },
    { media: '(prefers-color-scheme: dark)',  color: '#064e3b' },
  ],
};

// ── Root metadata ─────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),

  title: {
    template: '%s | CampyWin',
    default:  'CampyWin – Explore the Wild, Find Your Win',
  },
  description:
    "Tunisia's premier platform for glamping stays, desert festivals, outdoor careers, and carpooling to nature spots. Book your next adventure in Douz, Ain Draham, Tabarka, Tozeur and more.",
  applicationName: 'CampyWin',
  authors: [{ name: 'CampyWin', url: APP_URL }],
  creator:   'CampyWin',
  publisher: 'CampyWin',
  generator: 'Next.js',

  keywords: [
    'camping Tunisie', 'glamping Tunisia', 'outdoor adventure',
    'camping Douz Sahara', 'camping Ain Draham', 'camping Tabarka',
    'camping Tozeur oasis', 'festival désert', 'covoiturage camping',
    'emplois plein air', 'eco lodge Tunisia', 'CampyWin',
  ],

  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false, address: false, email: false },
  category:  'travel',

  // ── Open Graph ──────────────────────────────────────────────────────────
  openGraph: {
    type:            'website',
    locale:          'fr_TN',
    alternateLocale: ['en_US', 'ar_TN'],
    url:             APP_URL,
    siteName:        'CampyWin',
    title:           'CampyWin – Explore the Wild, Find Your Win',
    description:
      "Tunisia's premier platform for camping stays, outdoor events, adventure careers & carpooling to nature spots.",
    images: [
      {
        url:    '/opengraph-image',
        width:  1200,
        height: 630,
        alt:    "CampyWin – Tunisia's Premier Outdoor Adventure Platform",
        type:   'image/png',
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    site:        '@campywin_tn',
    creator:     '@campywin_tn',
    title:       'CampyWin – Explore the Wild, Find Your Win',
    description: "Tunisia's premier camping & outdoor adventure platform.",
    images: [{ url: '/opengraph-image', alt: 'CampyWin OG Image' }],
  },

  // ── Icons ────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico',                        sizes: 'any' },
      { url: '/logo-campy-win-green-realistic.png', sizes: '32x32',  type: 'image/png' },
      { url: '/logo-campy-win-green-realistic.png', sizes: '192x192', type: 'image/png' },
    ],
    apple:    [{ url: '/logo-campy-win-green-realistic.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.ico',
  },

  // ── PWA ──────────────────────────────────────────────────────────────────
  // manifest is auto-injected by app/manifest.ts
  appleWebApp: {
    capable:         true,
    statusBarStyle:  'black-translucent',
    title:           'CampyWin',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  },

  // ── Robots ───────────────────────────────────────────────────────────────
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Apple splash / touch */}
        <link rel="apple-touch-icon" href="/logo-campy-win-green-realistic.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        {/* Preconnect for Unsplash images */}
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
