'use client';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Role, User } from './mock-data';
import { DEMO_USERS } from './mock-data';

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  qty: number;
}

interface StoreState {
  user: User | null;
  isDark: boolean;
  cart: CartItem[];
  login: (role: Role) => void;
  logout: () => void;
  toggleTheme: () => void;
  addToCart: (item: Omit<CartItem, 'qty'>) => void;
  removeFromCart: (productId: string) => void;
  updateCartQty: (productId: string, delta: number) => void;
  clearCart: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      user: null,
      isDark: false,
      cart: [],

      login: (role) => set({ user: DEMO_USERS[role] }),
      logout: () => set({ user: null }),
      toggleTheme: () => set((s) => ({ isDark: !s.isDark })),

      addToCart: (item) =>
        set((s) => {
          const existing = s.cart.find((i) => i.productId === item.productId);
          if (existing) {
            return { cart: s.cart.map((i) => i.productId === item.productId ? { ...i, qty: i.qty + 1 } : i) };
          }
          return { cart: [...s.cart, { ...item, qty: 1 }] };
        }),

      removeFromCart: (productId) =>
        set((s) => ({ cart: s.cart.filter((i) => i.productId !== productId) })),

      updateCartQty: (productId, delta) =>
        set((s) => ({
          cart: s.cart
            .map((i) => i.productId === productId ? { ...i, qty: i.qty + delta } : i)
            .filter((i) => i.qty > 0),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'campywin-demo' }
  )
);
