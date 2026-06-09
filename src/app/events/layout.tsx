import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor Events & Festivals',
  description: 'Join curated camping events, desert stargazing festivals, trekking workshops, and outdoor expeditions across Tunisia.',
  openGraph: {
    title: 'Outdoor Events & Festivals | CampyWin',
    description: 'Desert stargazing, mountain treks, beach camps — discover Tunisia\'s best outdoor events.',
    type: 'website',
  },
  twitter: {
    title: 'Outdoor Events | CampyWin',
    description: 'Desert stargazing, mountain treks, beach camps — Tunisia\'s best outdoor events.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
