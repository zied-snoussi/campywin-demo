import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard | CampyWin',
  description: 'Platform administration — users, analytics, moderation, and security.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
