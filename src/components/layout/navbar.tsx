'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Moon, Sun, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '@/lib/store';

const NAV_LINKS = [
  { label: 'Outposts', href: '/accommodations' },
  { label: 'Events', href: '/events' },
  { label: 'Careers', href: '/jobs' },
  { label: 'About', href: '/#about' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isDark, logout, toggleTheme } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashPath =
    user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : user?.role === 'ORGANISATEUR'
      ? '/dashboard/organizer'
      : '/dashboard/client';

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200/60 dark:border-gray-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity">
            <Image
              src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'}
              alt="CampyWin"
              width={36}
              height={36}
              className="object-contain"
              style={{ width: 36, height: 'auto' }}
            />
            <span className="text-xl font-black text-gray-900 dark:text-white hidden sm:block tracking-tight">
              Campy<span className="text-emerald-600 dark:text-emerald-400">Win</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`relative px-1 py-2 text-sm font-medium transition-colors duration-200 group ${
                    active
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400'
                  }`}
                >
                  {l.label}
                  {/* underline animation */}
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 dark:bg-emerald-400 transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {user ? (
              <>
                <button
                  onClick={() => router.push(dashPath)}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-md transition-all shadow-sm hover:shadow-md"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </button>
                <button
                  onClick={() => { logout(); router.push('/'); }}
                  className="p-2 rounded-full text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3 ml-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-sm font-medium rounded-md hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-sm hover:shadow-md"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700 px-5 space-y-3">
            {user ? (
              <>
                <button onClick={() => { router.push(dashPath); setMobileOpen(false); }} className="w-full block px-4 py-2 text-center rounded-md text-base font-medium text-white bg-emerald-600">
                  Dashboard
                </button>
                <button onClick={() => { logout(); router.push('/'); setMobileOpen(false); }} className="w-full block px-4 py-2 text-center rounded-md text-base font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { router.push('/login'); setMobileOpen(false); }} className="w-full block px-4 py-2 text-center rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800">
                  Sign In
                </button>
                <button onClick={() => { router.push('/login'); setMobileOpen(false); }} className="w-full block px-4 py-2 text-center rounded-md text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
