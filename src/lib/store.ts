'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, User } from './mock-data';
import { DEMO_USERS } from './mock-data';

interface AuthState {
  user: User | null;
  isDark: boolean;
  login: (role: Role) => void;
  logout: () => void;
  toggleTheme: () => void;
}

export const useStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isDark: false,
      login: (role) => set({ user: DEMO_USERS[role] }),
      logout: () => set({ user: null }),
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
    }),
    { name: 'campywin-demo' }
  )
);
