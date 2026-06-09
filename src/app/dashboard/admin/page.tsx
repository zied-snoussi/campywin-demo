'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LayoutDashboard, Users, Building2, Tent, Package, Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings, AlertCircle, CheckCircle, XCircle, TrendingUp, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useStore } from '@/lib/store';
import { ADMIN_STATS, DEMO_USERS } from '@/lib/mock-data';

const NAV = [
  { label: 'Overview',       href: '/dashboard/admin',               icon: LayoutDashboard },
  { label: 'Users',          href: '/dashboard/admin/users',         icon: Users },
  { label: 'Organizations',  href: '/dashboard/admin/organizations',  icon: Building2 },
  { label: 'Accommodations', href: '/dashboard/admin/accommodations', icon: Tent },
  { label: 'Inventory',      href: '/dashboard/admin/inventory',     icon: Package },
  { label: 'Job Offers',     href: '/dashboard/admin/jobs',          icon: Briefcase },
  { label: 'Content',        href: '/dashboard/admin/content',       icon: FileText },
  { label: 'Support',        href: '/dashboard/admin/support',       icon: LifeBuoy },
  { label: 'Analytics',      href: '/dashboard/admin/analytics',     icon: BarChart3 },
  { label: 'Messages',       href: '/dashboard/admin/messages',      icon: Mail },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

const MOCK_USERS = [
  { id: '1', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'CLIENT', status: 'ACTIVE', joinedAt: '2025-01-15' },
  { id: '2', name: 'Ahmed Ben Ali', email: 'ahmed@example.com', role: 'ORGANISATEUR', status: 'ACTIVE', joinedAt: '2024-09-01' },
  { id: '3', name: 'Lina Mrad', email: 'lina@example.com', role: 'CLIENT', status: 'ACTIVE', joinedAt: '2025-03-20' },
  { id: '4', name: 'Karim Trabelsi', email: 'karim@example.com', role: 'ORGANISATEUR', status: 'SUSPENDED', joinedAt: '2024-11-05' },
  { id: '5', name: 'Sofia Amara', email: 'sofia@example.com', role: 'CLIENT', status: 'ACTIVE', joinedAt: '2025-05-10' },
];

const PENDING_APPROVALS = [
  { id: '1', type: 'New Organizer', name: 'Desert Camp Pro', date: '2026-06-07', priority: 'HIGH' },
  { id: '2', type: 'Event Approval', name: 'Summer Sahara Fest', date: '2026-06-06', priority: 'MEDIUM' },
  { id: '3', type: 'Support Ticket', name: 'Booking Dispute #1892', date: '2026-06-05', priority: 'HIGH' },
];

export default function AdminDashboard() {
  const user = useStore(s => s.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'ADMIN') {
    router.push('/login');
    return null;
  }

  return (
    <DashboardLayout navItems={NAV} title="Admin Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Banner */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-6 text-white mb-8">
            <h2 className="text-2xl font-black mb-1">Platform Overview 🛡️</h2>
            <p className="text-blue-100 mb-5">All systems operational. Here&apos;s what&apos;s happening on CampyWin.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Users', value: ADMIN_STATS.totalUsers.toLocaleString() },
                { label: 'Active Bookings', value: ADMIN_STATS.activeBookings.toLocaleString() },
                { label: 'Monthly Revenue', value: `${ADMIN_STATS.monthlyRevenue.toLocaleString()} TND` },
                { label: 'Open Tickets', value: ADMIN_STATS.openTickets },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-blue-200 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Organizers', value: ADMIN_STATS.totalOrganizers, color: 'text-purple-600 dark:text-purple-400', icon: Users },
              { label: 'Events Hosted', value: ADMIN_STATS.totalEvents, color: 'text-blue-600 dark:text-blue-400', icon: Calendar },
              { label: 'Properties', value: ADMIN_STATS.totalAccommodations, color: 'text-emerald-600 dark:text-emerald-400', icon: Activity },
              { label: 'Pending Actions', value: ADMIN_STATS.pendingApprovals, color: 'text-amber-600 dark:text-amber-400', icon: AlertCircle },
            ].map(({ label, value, color, icon: Icon }) => (
              <Card key={label}>
                <CardContent className="pt-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {PENDING_APPROVALS.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</p>
                        <Badge className={item.priority === 'HIGH' ? 'bg-red-100 text-red-600 text-[10px] px-1.5' : 'bg-amber-100 text-amber-600 text-[10px] px-1.5'} variant="outline">{item.priority}</Badge>
                      </div>
                      <p className="text-xs text-gray-500">{item.type} · {item.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <button className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center hover:bg-emerald-200 transition-colors">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      </button>
                      <button className="w-7 h-7 rounded-full bg-red-100 flex items-center justify-center hover:bg-red-200 transition-colors">
                        <XCircle className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* User growth */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  User Growth by Role
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { role: 'Clients', count: 2467, total: ADMIN_STATS.totalUsers, color: 'bg-emerald-500' },
                  { role: 'Organizers', count: 134, total: ADMIN_STATS.totalUsers, color: 'bg-purple-500' },
                  { role: 'Admins', count: 12, total: ADMIN_STATS.totalUsers, color: 'bg-blue-500' },
                ].map(({ role, count, total, color }) => (
                  <div key={role}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{role}</span>
                      <span className="text-gray-500">{count.toLocaleString()} ({Math.round((count / total) * 100)}%)</span>
                    </div>
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${(count / total) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>User Management</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs">+ Invite User</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Name', 'Email', 'Role', 'Status', 'Joined', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_USERS.map(u => (
                      <tr key={u.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">{u.name[0]}</div>
                            <span className="font-medium text-gray-900 dark:text-white">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{u.email}</td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className={u.role === 'ADMIN' ? 'border-blue-300 text-blue-600' : u.role === 'ORGANISATEUR' ? 'border-purple-300 text-purple-600' : 'border-emerald-300 text-emerald-600'}>
                            {u.role}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <Badge className={u.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'} variant="outline">{u.status}</Badge>
                        </td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{new Date(u.joinedAt).toLocaleDateString()}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                            <Button variant="ghost" size="sm" className={`h-7 text-xs ${u.status === 'ACTIVE' ? 'text-red-500' : 'text-emerald-600'}`}>
                              {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[
              { label: 'Monthly Revenue', value: `${ADMIN_STATS.monthlyRevenue.toLocaleString()} TND`, change: '+12.4%', up: true },
              { label: 'New Users This Month', value: '342', change: '+8.1%', up: true },
              { label: 'Booking Rate', value: '78%', change: '-2.3%', up: false },
            ].map(({ label, value, change, up }) => (
              <Card key={label}>
                <CardContent className="pt-5">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">{value}</p>
                  <Badge className={up ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'} variant="outline">
                    {up ? '▲' : '▼'} {change} vs last month
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader><CardTitle>Revenue by Category</CardTitle></CardHeader>
            <CardContent className="space-y-5">
              {[
                { label: 'Accommodation Bookings', value: 62, revenue: '94,736 TND' },
                { label: 'Event Registrations', value: 23, revenue: '35,144 TND' },
                { label: 'Equipment Rentals', value: 10, revenue: '15,280 TND' },
                { label: 'Job Placement Fees', value: 5, revenue: '7,640 TND' },
              ].map(({ label, value, revenue }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
                    <span className="text-gray-500">{revenue} ({value}%)</span>
                  </div>
                  <Progress value={value} className="h-3" />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-blue-600" />Security Status</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'JWT Authentication', status: 'ACTIVE', ok: true },
                  { label: 'Role-Based Access Control', status: 'ACTIVE', ok: true },
                  { label: 'Data Encryption (AES-256)', status: 'ACTIVE', ok: true },
                  { label: 'Rate Limiting', status: 'ACTIVE', ok: true },
                  { label: 'Audit Logging', status: 'ACTIVE', ok: true },
                  { label: 'Failed Login Lockout', status: 'ACTIVE', ok: true },
                ].map(({ label, status, ok }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                    <Badge className={ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'} variant="outline">
                      {ok ? <CheckCircle className="w-3 h-3 mr-1 inline" /> : <XCircle className="w-3 h-3 mr-1 inline" />}
                      {status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-red-500" />Recent Security Events</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { event: 'Failed login attempt', user: 'unknown@test.com', time: '2 min ago', severity: 'LOW' },
                  { event: 'New admin account created', user: 'admin@campywin.tn', time: '1 hour ago', severity: 'INFO' },
                  { event: 'Organizer account suspended', user: 'suspect@example.com', time: '3 hours ago', severity: 'MEDIUM' },
                  { event: 'Bulk data export requested', user: 'data@campywin.tn', time: '1 day ago', severity: 'LOW' },
                ].map((ev, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <Badge className={ev.severity === 'LOW' ? 'bg-gray-100 text-gray-600' : ev.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600'} variant="outline">{ev.severity}</Badge>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{ev.event}</p>
                      <p className="text-xs text-gray-500">{ev.user} · {ev.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
