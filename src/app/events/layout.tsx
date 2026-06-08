import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Outdoor Events | CampyWin',
  description: 'Join curated camping events, workshops, and expeditions across Tunisia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
