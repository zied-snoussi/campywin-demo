import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Organizer Dashboard | CampyWin',
  description: 'Manage your events, stays, job offers, and equipment inventory.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
