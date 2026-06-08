import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In | CampyWin',
  description: 'Sign in to CampyWin and start exploring Tunisia\'s best camping experiences.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
