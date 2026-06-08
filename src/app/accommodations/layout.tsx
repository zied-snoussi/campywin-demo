import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Camping Stays | CampyWin',
  description: 'Discover verified glamping tents, eco lodges, beach camps, and safari stays across Tunisia.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
