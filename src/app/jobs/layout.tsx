import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adventure & Outdoor Jobs',
  description: 'Find your dream career in Tunisia\'s outdoor industry — camp managers, wilderness guides, event coordinators, chefs, and more.',
  openGraph: {
    title: 'Adventure & Outdoor Jobs | CampyWin',
    description: 'Camp managers, wilderness guides, event coordinators — find your outdoor career in Tunisia.',
    type: 'website',
  },
  twitter: {
    title: 'Outdoor Jobs | CampyWin',
    description: 'Find your outdoor career in Tunisia with CampyWin.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
