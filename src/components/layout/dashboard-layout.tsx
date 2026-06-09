'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  LogOut, Moon, Sun, Menu, Search, Bell, Mail,
  ChevronLeft, ChevronRight, ChevronDown, Users,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '@/lib/store';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  /** Optional section header rendered above this item (first item in a group) */
  section?: string;
  badge?: string | number;
  /** Child items — renders as collapsible sub-menu */
  children?: { label: string; href: string }[];
}

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
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Auto-expand groups that contain the active route
  useEffect(() => {
    const auto: Record<string, boolean> = {};
    navItems.forEach(item => {
      if (item.children?.some(c => pathname === c.href || pathname.startsWith(c.href + '/'))) {
        auto[item.label] = true;
      }
    });
    setOpenGroups(prev => ({ ...prev, ...auto }));
  }, [pathname, navItems]);

  const handleLogout = () => { logout(); router.push('/'); };

  const isActive = (href: string) =>
    pathname === href || (href !== '/dashboard/admin' && href !== '/dashboard/organizer' && pathname.startsWith(href + '/'));

  const isParentActive = (item: NavItem) =>
    item.children?.some(c => isActive(c.href)) ?? false;

  const toggleGroup = (label: string) =>
    setOpenGroups(prev => ({ ...prev, [label]: !prev[label] }));

  /* ── Single nav item (leaf) ── */
  const NavLink = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
    const active = isActive(item.href);
    const Icon = item.icon;
    return (
      <Link
        href={item.href}
        onClick={() => setMobileOpen(false)}
        className={`
          relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
          transition-all duration-200 group/link
          ${active
            ? 'bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/70'
          }
          ${collapsed && !mobile ? 'justify-center px-0' : ''}
        `}
      >
        {/* Active indicator bar */}
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
        )}
        <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${active ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
        {(!collapsed || mobile) && (
          <span className="flex-1 truncate">{item.label}</span>
        )}
        {(!collapsed || mobile) && item.badge && (
          <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white leading-none">
            {item.badge}
          </span>
        )}
        {/* Collapsed tooltip */}
        {collapsed && !mobile && (
          <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/link:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
            {item.label}
          </div>
        )}
      </Link>
    );
  };

  /* ── Group item (parent with children) ── */
  const NavGroup = ({ item, mobile = false }: { item: NavItem; mobile?: boolean }) => {
    const Icon = item.icon;
    const open = openGroups[item.label] ?? false;
    const parentActive = isParentActive(item);
    return (
      <div>
        <button
          onClick={() => toggleGroup(item.label)}
          className={`
            relative w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
            transition-all duration-200 group/grp
            ${parentActive
              ? 'bg-emerald-50 dark:bg-emerald-900/25 text-emerald-700 dark:text-emerald-300'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/70'
            }
            ${collapsed && !mobile ? 'justify-center px-0' : ''}
          `}
        >
          {parentActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
          )}
          <Icon className={`w-[18px] h-[18px] flex-shrink-0 ${parentActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
          {(!collapsed || mobile) && (
            <>
              <span className="flex-1 text-left truncate">{item.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
            </>
          )}
          {collapsed && !mobile && (
            <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/grp:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              {item.label}
            </div>
          )}
        </button>
        {/* Children */}
        {open && (!collapsed || mobile) && (
          <div className="mt-0.5 ml-6 pl-3 border-l border-gray-200 dark:border-gray-700 space-y-0.5">
            {item.children?.map(child => {
              const childActive = pathname === child.href || pathname.startsWith(child.href + '/');
              return (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    block px-3 py-2 rounded-lg text-sm transition-colors
                    ${childActive
                      ? 'text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-900/20'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }
                  `}
                >
                  {child.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  /* ── Sidebar content ── */
  const SidebarContent = ({ mobile = false }: { mobile?: boolean }) => (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 border-r border-gray-200/60 dark:border-gray-800/60">
      {/* ── Logo row ── */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100 dark:border-gray-800/60 flex-shrink-0">
        {(!collapsed || mobile) ? (
          <Link href="/" className="flex items-center gap-2.5 min-w-0 hover:opacity-80 transition-opacity">
            <Image
              src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'}
              alt="CampyWin" width={28} height={28}
              className="object-contain flex-shrink-0" style={{ width: 28, height: 'auto' }}
            />
            <span className="font-black text-gray-900 dark:text-white text-base whitespace-nowrap">
              Campy<span className="text-emerald-600 dark:text-emerald-400">Win</span>
            </span>
          </Link>
        ) : (
          <Link href="/" className="mx-auto hover:opacity-80 transition-opacity">
            <Image src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'} alt="CampyWin" width={26} height={26} className="object-contain" style={{ width: 26, height: 'auto' }} />
          </Link>
        )}
        {!mobile && (
          <button
            onClick={() => setCollapsed(c => !c)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5">
        {navItems.map((item) => (
          <div key={item.href}>
            {/* Section divider */}
            {item.section && (!collapsed || mobile) && (
              <div className="pt-4 pb-1.5 px-3">
                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  {item.section}
                </p>
              </div>
            )}
            {item.section && collapsed && !mobile && (
              <div className="my-2 mx-2 h-px bg-gray-100 dark:bg-gray-800" />
            )}
            {/* Render group or leaf */}
            {item.children?.length ? (
              <NavGroup item={item} mobile={mobile} />
            ) : (
              <NavLink item={item} mobile={mobile} />
            )}
          </div>
        ))}

        {/* Community link */}
        <div className="pt-3 mt-1 border-t border-gray-100 dark:border-gray-800">
          <Link
            href="/"
            className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-all duration-200 group/link ${collapsed && !mobile ? 'justify-center px-0' : ''}`}
          >
            <Users className="w-[18px] h-[18px] flex-shrink-0" />
            {(!collapsed || mobile) && <span>Community</span>}
            {collapsed && !mobile && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/link:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                Community
              </div>
            )}
          </Link>
        </div>
      </nav>

      {/* ── User + logout ── */}
      {user && (
        <div className="px-3 py-3 border-t border-gray-100 dark:border-gray-800/60 flex-shrink-0">
          <div className={`flex items-center gap-2.5 mb-2 px-2 ${collapsed && !mobile ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold ring-2 ring-emerald-200 dark:ring-emerald-800 flex-shrink-0">
              {user.name[0]}
            </div>
            {(!collapsed || mobile) && (
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 truncate">{user.role}</p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ${collapsed && !mobile ? 'justify-center px-0' : ''} group/link relative`}
          >
            <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
            {(!collapsed || mobile) && <span>Sign out</span>}
            {collapsed && !mobile && (
              <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg whitespace-nowrap opacity-0 group-hover/link:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
                Sign out
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {/* ── Desktop sidebar ── */}
      <aside
        className="hidden lg:flex flex-col flex-shrink-0 transition-all duration-300 shadow-sm"
        style={{ width: collapsed ? 72 : 256 }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile sidebar overlay ── */}
      {mobileOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileOpen(false)} />
          <aside className="fixed left-0 top-0 h-full w-64 z-50 flex flex-col lg:hidden shadow-2xl">
            <SidebarContent mobile />
          </aside>
        </>
      )}

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ── Header ── */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm flex-shrink-0">
          <div className="px-4 sm:px-6 py-3 flex items-center justify-between h-14">
            {/* Left */}
            <div className="flex items-center gap-3">
              {/* Mobile hamburger */}
              <button
                className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setMobileOpen(o => !o)}
              >
                <Menu className="w-5 h-5" />
              </button>
              {/* Mobile logo */}
              <div className="lg:hidden">
                <Image src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'} alt="CampyWin" width={26} height={26} className="object-contain" style={{ width: 26, height: 'auto' }} />
              </div>
              {/* Desktop page title / search */}
              <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-4 py-1.5 rounded-full w-64">
                <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder={`Search ${title}…`}
                  className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-gray-400 outline-none text-gray-900 dark:text-white"
                />
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-1">
              {/* Theme */}
              <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Messages */}
              <button
                onClick={() => {
                  const base = user?.role === 'ADMIN' ? '/dashboard/admin' : '/dashboard/organizer';
                  router.push(`${base}/messages`);
                }}
                className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              {/* Notifications */}
              <button className="relative p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900" />
              </button>

              {/* Profile */}
              {user && (
                <div className="relative ml-1" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(o => !o)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-emerald-200 dark:ring-emerald-800">
                      {user.name[0]}
                    </div>
                    <div className="hidden md:flex flex-col items-start">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate max-w-[110px] leading-none">{user.name}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 leading-none mt-0.5">{user.role}</span>
                    </div>
                    <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
                      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-4 py-3 text-white">
                        <p className="font-bold text-sm leading-snug">{user.name}</p>
                        <p className="text-[11px] text-white/75 mt-0.5">{user.email || `${user.name.toLowerCase().replace(/\s+/, '.')}@campywin.tn`}</p>
                        <p className="text-[10px] text-white/60 mt-1 uppercase tracking-wider">{user.role}</p>
                      </div>
                      <div className="py-1.5">
                        <Link
                          href={user.role === 'ADMIN' ? '/dashboard/admin/profile' : '/dashboard/organizer/profile'}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                            <span className="text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">{user.name[0]}</span>
                          </div>
                          View Profile
                        </Link>
                        <div className="mx-3 my-1 h-px bg-gray-100 dark:bg-gray-700" />
                        <button onClick={handleLogout} className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left">
                          <LogOut className="w-4 h-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── Page content ── */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
