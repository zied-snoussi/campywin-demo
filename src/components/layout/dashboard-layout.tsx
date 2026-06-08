'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { LogOut, Moon, Sun, Menu, Search, Bell, Mail, ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';

interface NavItem { label: string; href: string; icon: React.ElementType }

interface Props {
  children: React.ReactNode;
  navItems: NavItem[];
  title: string;
}

export function DashboardLayout({ children, navItems, title }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isDark, logout, toggleTheme } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => { logout(); router.push('/'); };

  /* ── Sidebar content ── */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200/60 dark:border-gray-800/60">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 dark:border-gray-800/60">
        {(!collapsed || mobile) && (
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'}
              alt="CampyWin" width={30} height={30}
              className="object-contain" style={{ width: 30, height: 'auto' }}
            />
            <span className="font-black text-gray-900 dark:text-white text-lg whitespace-nowrap">
              Campy<span className="text-emerald-600 dark:text-emerald-400">Win</span>
            </span>
          </Link>
        )}
        {collapsed && !mobile && (
          <Link href="/" className="mx-auto">
            <Image src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'} alt="CampyWin" width={28} height={28} className="object-contain" style={{ width: 28, height: 'auto' }} />
          </Link>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1.5 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <div key={label} className="relative group/item">
              <Link
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                } ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {(!collapsed || mobile) && <span className="whitespace-nowrap">{label}</span>}
              </Link>
              {/* Tooltip when collapsed */}
              {collapsed && !mobile && (
                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                  {label}
                </div>
              )}
            </div>
          );
        })}

        {/* Divider */}
        <div className="my-3 h-px bg-gray-200 dark:bg-gray-700" />

        {/* Community */}
        <div className="relative group/item">
          <Link
            href="/"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          >
            <Users className="w-4 h-4 flex-shrink-0" />
            {(!collapsed || mobile) && <span className="whitespace-nowrap">Community</span>}
          </Link>
          {collapsed && !mobile && (
            <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              Community
            </div>
          )}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-200/60 dark:border-gray-800/60 space-y-1">
        <div className="relative group/item">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${collapsed && !mobile ? 'justify-center px-2' : ''}`}
          >
            <LogOut className="w-4 h-4 flex-shrink-0" />
            {(!collapsed || mobile) && <span className="whitespace-nowrap">Logout</span>}
          </button>
          {collapsed && !mobile && (
            <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/item:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              Logout
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300"
        style={{ width: collapsed ? 80 : 256 }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col lg:hidden shadow-xl">
            <SidebarContent mobile />
          </aside>
        </>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ── Header (matches reference) ── */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm flex-shrink-0">
          <div className="px-6 py-3 flex items-center justify-between h-14">
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(o => !o)}
              >
                <Menu className="w-5 h-5" />
              </button>
              {/* Mobile logo */}
              <div className="lg:hidden">
                <Image src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'} alt="CampyWin" width={28} height={28} className="object-contain" style={{ width: 28, height: 'auto' }} />
              </div>
              {/* Desktop search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full w-72">
                <Search className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Messages */}
              <button className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Mail className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              {/* Profile dropdown */}
              {user && (
                <div className="relative ml-2" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(o => !o)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-emerald-200 dark:ring-emerald-800">
                      {user.name[0]}
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[120px]">{user.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{user.role}</span>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${profileOpen ? 'rotate-90' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      {/* Gradient header */}
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 p-4 text-white">
                        <p className="font-bold text-sm">{user.name}</p>
                        <p className="text-xs text-white/80 truncate">{user.email || `${user.name.toLowerCase().replace(' ', '.')}@campywin.tn`}</p>
                        <p className="text-xs text-white/70 mt-1">{user.role}</p>
                      </div>
                      <nav className="py-2">
                        <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                            <span className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">{user.name[0]}</span>
                          </div>
                          View Profile
                        </button>
                        <div className="my-1 h-px bg-gray-200 dark:bg-gray-700" />
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
