import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Glamping & Camping Stays',
  description: 'Discover verified glamping tents, eco lodges, beach camps, and safari stays across Tunisia — from Sahara dunes to Atlas forests.',
  openGraph: {
    title: 'Glamping & Camping Stays | CampyWin',
    description: 'Book unique camping stays across Tunisia. Glamping tents, eco lodges, beach camps, mountain cabins and more.',
    type: 'website',
  },
  twitter: {
    title: 'Camping & Glamping Stays | CampyWin',
    description: 'Book unique camping stays across Tunisia.',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
