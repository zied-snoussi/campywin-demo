'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Moon, Sun, LayoutDashboard, LogOut, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useStore } from '@/lib/store';

const NAV_LINKS = [
  { label: 'Stays', href: '/accommodations' },
  { label: 'Events', href: '/events' },
  { label: 'Jobs', href: '/jobs' },
];

export function Navbar() {
  const router = useRouter();
  const { user, isDark, logout, toggleTheme } = useStore();

  const dashPath =
    user?.role === 'ADMIN'
      ? '/dashboard/admin'
      : user?.role === 'ORGANISATEUR'
      ? '/dashboard/organizer'
      : '/dashboard/client';

  return (
    <nav className="fixed top-4 inset-x-4 z-50 max-w-7xl mx-auto">
      <div className="flex items-center justify-between px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border border-gray-100/50 dark:border-gray-800/50">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Image
            src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'}
            alt="CampyWin"
            width={40}
            height={40}
            className="object-contain"
            style={{ width: 40, height: 'auto' }}
          />
          <span className="text-xl font-black text-emerald-900 dark:text-emerald-50 tracking-tight hidden sm:inline">
            Campy<span className="text-emerald-600 dark:text-emerald-400">Win</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {user ? (
            <>
              <Button
                size="sm"
                onClick={() => router.push(dashPath)}
                className="hidden sm:flex gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </Button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.name[0]}
                </div>
                <div className="hidden md:block">
                  <p className="text-xs font-semibold text-gray-900 dark:text-gray-100 leading-none">{user.name}</p>
                  <Badge variant="outline" className="text-[10px] px-1 py-0 border-emerald-300 text-emerald-700 dark:text-emerald-400 mt-0.5">
                    {user.role}
                  </Badge>
                </div>
              </div>
              <button
                onClick={() => { logout(); router.push('/'); }}
                className="p-2 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => router.push('/login')} className="hidden sm:flex text-emerald-700 dark:text-emerald-400">
                Sign In
              </Button>
              <Button size="sm" onClick={() => router.push('/login')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Get Started
              </Button>
            </>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 pt-8">
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href} className="text-lg font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600">
                    {l.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link href={dashPath} className="text-lg font-medium text-emerald-600">Dashboard</Link>
                    <button onClick={() => { logout(); router.push('/'); }} className="text-left text-lg font-medium text-red-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link href="/login" className="text-lg font-medium text-emerald-600">Sign In</Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
