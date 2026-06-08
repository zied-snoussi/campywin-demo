import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Adventure Jobs | CampyWin',
  description: 'Find your dream job in the outdoor and camping industry across Tunisia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
