'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package, Briefcase,
  FileText, LifeBuoy, BarChart3, Mail, Settings,
  Search, Download, UserPlus, Eye, Trash2, ShieldOff, ShieldCheck,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const NAV_ADMIN = [
  { label: 'Overview',       href: '/dashboard/admin',               icon: LayoutDashboard },
  { label: 'Users',          href: '/dashboard/admin/users',         icon: Users,       section: 'User Management' },
  { label: 'Organizations',  href: '/dashboard/admin/organizations', icon: Building2 },
  { label: 'Accommodations', href: '/dashboard/admin/accommodations',icon: Tent,        section: 'Platform' },
  { label: 'Inventory',      href: '/dashboard/admin/inventory',     icon: Package },
  { label: 'Job Offers',     href: '/dashboard/admin/jobs',          icon: Briefcase,   section: 'Recruitment' },
  { label: 'Content',        href: '/dashboard/admin/content',       icon: FileText,    section: 'Content' },
  { label: 'Support',        href: '/dashboard/admin/support',       icon: LifeBuoy,    section: 'Support' },
  { label: 'Analytics',      href: '/dashboard/admin/analytics',     icon: BarChart3,   section: 'Reports' },
  { label: 'Messages',       href: '/dashboard/admin/messages',      icon: Mail,        section: 'Comms' },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

type UserRole = 'CLIENT' | 'ORGANISATEUR' | 'ADMIN';
type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'PENDING';

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  joinedAt: string;
  avatar: string;
}

const INITIAL_USERS: MockUser[] = [
  { id: '1',  name: 'Sarah Johnson',    email: 'sarah@campywin.com',    role: 'CLIENT',       status: 'ACTIVE',    joinedAt: '2025-01-15', avatar: 'SJ' },
  { id: '2',  name: 'Ahmed Ben Ali',    email: 'ahmed@campywin.com',    role: 'ORGANISATEUR', status: 'ACTIVE',    joinedAt: '2024-09-01', avatar: 'AB' },
  { id: '3',  name: 'Zied Snoussi',     email: 'zied@campywin.com',     role: 'ADMIN',        status: 'ACTIVE',    joinedAt: '2024-06-01', avatar: 'ZS' },
  { id: '4',  name: 'Lina Mrad',        email: 'lina@campywin.com',     role: 'CLIENT',       status: 'ACTIVE',    joinedAt: '2025-03-20', avatar: 'LM' },
  { id: '5',  name: 'Karim Trabelsi',   email: 'karim@example.com',     role: 'ORGANISATEUR', status: 'SUSPENDED', joinedAt: '2024-11-05', avatar: 'KT' },
  { id: '6',  name: 'Sofia Amara',      email: 'sofia@example.com',     role: 'CLIENT',       status: 'ACTIVE',    joinedAt: '2025-05-10', avatar: 'SA' },
  { id: '7',  name: 'Youssef Tlili',    email: 'youssef@example.com',   role: 'CLIENT',       status: 'PENDING',   joinedAt: '2026-06-01', avatar: 'YT' },
  { id: '8',  name: 'Dorra Camping Co', email: 'dorra@campywin.com',    role: 'ORGANISATEUR', status: 'ACTIVE',    joinedAt: '2024-08-12', avatar: 'DC' },
  { id: '9',  name: 'Nour Karray',      email: 'nour@example.com',      role: 'CLIENT',       status: 'SUSPENDED', joinedAt: '2025-07-22', avatar: 'NK' },
  { id: '10', name: 'Rania Hamdi',      email: 'rania@campywin.com',    role: 'ADMIN',        status: 'ACTIVE',    joinedAt: '2024-07-14', avatar: 'RH' },
];

const ROLE_COLORS: Record<UserRole, string> = {
  CLIENT:       'border-emerald-300 text-emerald-700 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-300',
  ORGANISATEUR: 'border-purple-300 text-purple-700 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300',
  ADMIN:        'border-blue-300 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-300',
};

const STATUS_COLORS: Record<UserStatus, string> = {
  ACTIVE:    'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  SUSPENDED: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  PENDING:   'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
};

const AVATAR_GRADIENTS = [
  'from-emerald-500 to-teal-600',
  'from-purple-500 to-violet-600',
  'from-blue-500 to-indigo-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-cyan-500 to-sky-600',
];

export default function AdminUsersPage() {
  const [users, setUsers] = useState<MockUser[]>(INITIAL_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'ALL'>('ALL');

  const toggleStatus = (id: string) => {
    setUsers(prev =>
      prev.map(u =>
        u.id === id
          ? { ...u, status: u.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE' }
          : u
      )
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const filtered = users.filter(u => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole   = roleFilter   === 'ALL' || u.role   === roleFilter;
    const matchesStatus = statusFilter === 'ALL' || u.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleCounts = {
    ALL:          users.length,
    CLIENT:       users.filter(u => u.role === 'CLIENT').length,
    ORGANISATEUR: users.filter(u => u.role === 'ORGANISATEUR').length,
    ADMIN:        users.filter(u => u.role === 'ADMIN').length,
  };

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Admin â€” Users">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">User Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage platform users, roles, and access.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 text-sm gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button className="h-9 text-sm gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <UserPlus className="w-4 h-4" /> Invite User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl flex-1 max-w-sm">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Role filters */}
            <div className="flex gap-1.5 flex-wrap">
              {(['ALL', 'CLIENT', 'ORGANISATEUR', 'ADMIN'] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    roleFilter === r
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {r === 'ALL' ? `All (${roleCounts.ALL})` : `${r} (${roleCounts[r]})`}
                </button>
              ))}
            </div>

            {/* Status filter */}
            <div className="flex gap-1.5">
              {(['ALL', 'ACTIVE', 'SUSPENDED'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    statusFilter === s
                      ? 'bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900 shadow-sm'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['User', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                    <th
                      key={h}
                      className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                      No users match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map((u, i) => (
                  <tr
                    key={u.id}
                    className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    {/* Avatar + Name */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}
                        >
                          {u.avatar}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white whitespace-nowrap">{u.name}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400">{u.email}</td>

                    {/* Role badge */}
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-xs ${ROLE_COLORS[u.role]}`}>
                        {u.role}
                      </Badge>
                    </td>

                    {/* Status badge */}
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={`text-xs ${STATUS_COLORS[u.status]}`}>
                        {u.status}
                      </Badge>
                    </td>

                    {/* Joined date */}
                    <td className="py-3 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {new Date(u.joinedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-blue-600">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleStatus(u.id)}
                          className={`h-7 w-7 p-0 ${
                            u.status === 'ACTIVE'
                              ? 'text-gray-500 hover:text-amber-600'
                              : 'text-gray-500 hover:text-emerald-600'
                          }`}
                          title={u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                        >
                          {u.status === 'ACTIVE'
                            ? <ShieldOff className="w-3.5 h-3.5" />
                            : <ShieldCheck className="w-3.5 h-3.5" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteUser(u.id)}
                          className="h-7 w-7 p-0 text-gray-500 hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">1â€“10</span> of{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">47</span> users
            </p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7 text-xs" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs bg-blue-600 text-white border-blue-600 hover:bg-blue-700">1</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">2</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">3</Button>
              <Button variant="outline" size="sm" className="h-7 text-xs">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

