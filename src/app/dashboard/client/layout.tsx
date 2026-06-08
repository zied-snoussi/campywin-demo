import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Dashboard | CampyWin',
  description: 'Manage your bookings, applications, and upcoming adventures.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
