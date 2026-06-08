'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useStore } from '@/lib/store';

interface NavItem { label: string; href: string; icon: React.ElementType }

interface Props {
  children: React.ReactNode;
  navItems: NavItem[];
  title: string;
  accentColor?: string;
}

export function DashboardLayout({ children, navItems, title, accentColor = 'emerald' }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isDark, logout, toggleTheme } = useStore();

  const handleLogout = () => { logout(); router.push('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <Link href="/" className="flex items-center gap-2">
          <Image src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'} alt="CampyWin" width={32} height={32} className="object-contain" style={{ width: 32, height: 'auto' }} />
          <span className="font-black text-gray-900 dark:text-white">Campy<span className="text-emerald-600">Win</span></span>
        </Link>
      </div>

      {user && (
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">
              {user.name[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900 dark:text-white">{user.name}</p>
              <Badge variant="outline" className="text-[10px] px-1.5 border-emerald-300 text-emerald-700 dark:text-emerald-400">{user.role}</Badge>
            </div>
          </div>
        </div>
      )}

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                active
                  ? `bg-emerald-600 text-white shadow-md`
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          {isDark ? 'Light Mode' : 'Dark Mode'}
        </button>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex-shrink-0">
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-64">
                <SidebarContent />
              </SheetContent>
            </Sheet>
            <h1 className="font-bold text-gray-900 dark:text-white">{title}</h1>
          </div>
          <Button variant="ghost" size="sm" onClick={() => router.push('/')} className="text-gray-500 hidden sm:flex">
            ← Back to Site
          </Button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
