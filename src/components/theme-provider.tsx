'use client';
import { useEffect } from 'react';
import { useStore } from '@/lib/store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDark = useStore((s) => s.isDark);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  return <>{children}</>;
}
