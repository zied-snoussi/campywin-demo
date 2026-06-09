'use client';
import {
  LayoutDashboard, Users, Building2, Tent, Package,
  Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings, Newspaper,
  TrendingUp, Download, Activity, DollarSign, Star,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ACCOMMODATIONS } from '@/lib/mock-data';

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
  { label: 'Newsletters',    href: '/dashboard/admin/newsletters',   icon: Newspaper },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

const KPI_CARDS = [
  { label: 'Monthly Revenue', value: '152,800 TND', change: '+12.4%', up: true, icon: DollarSign, color: 'text-emerald-600' },
  { label: 'New Users', value: '342', change: '+8.1%', up: true, icon: Users, color: 'text-blue-600' },
  { label: 'Bookings', value: '1,248', change: '+5.3%', up: true, icon: TrendingUp, color: 'text-purple-600' },
  { label: 'Avg Booking Value', value: '122 TND', change: '+3.0%', up: true, icon: Activity, color: 'text-indigo-600' },
  { label: 'Active Organizers', value: '134', change: '+2', up: true, icon: Building2, color: 'text-amber-600' },
  { label: 'Platform Uptime', value: '99.98%', change: '0.01%', up: true, icon: Star, color: 'text-teal-600' },
];

const REVENUE_CATEGORIES = [
  { label: 'Accommodations', value: 62, revenue: '94,736 TND', color: 'bg-emerald-500' },
  { label: 'Events', value: 23, revenue: '35,144 TND', color: 'bg-blue-500' },
  { label: 'Equipment', value: 10, revenue: '15,280 TND', color: 'bg-purple-500' },
  { label: 'Jobs', value: 5, revenue: '7,640 TND', color: 'bg-amber-500' },
];

const USER_GROWTH = [
  { month: 'Jan 2026', newUsers: 287, organizers: 12, revenue: '118,400 TND' },
  { month: 'Feb 2026', newUsers: 301, organizers: 9,  revenue: '124,200 TND' },
  { month: 'Mar 2026', newUsers: 325, organizers: 14, revenue: '131,700 TND' },
  { month: 'Apr 2026', newUsers: 318, organizers: 11, revenue: '139,500 TND' },
  { month: 'May 2026', newUsers: 334, organizers: 16, revenue: '146,300 TND' },
  { month: 'Jun 2026', newUsers: 342, organizers: 18, revenue: '152,800 TND' },
];

const GEO_DISTRIBUTION = [
  { region: 'Tunis', value: 34 },
  { region: 'Sousse', value: 22 },
  { region: 'Djerba', value: 18 },
  { region: 'Sfax', value: 15 },
  { region: 'Other', value: 11 },
];

// Derived top accommodations from mock data
const TOP_ACCOMMODATIONS = ACCOMMODATIONS.map((a, i) => ({
  ...a,
  revenue: [47300, 39800, 33200, 28600, 21400, 17900][i] ?? 10000,
  bookings: [172, 204, 89, 124, 126, 123][i] ?? 60,
})).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

export default function AdminAnalyticsPage() {
  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Analytics">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Platform Analytics</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">June 2026 â€” real-time overview</p>
        </div>
        <Button variant="outline" className="gap-2 h-9 text-sm">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      {/* KPI Cards â€” Row 1 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {KPI_CARDS.slice(0, 3).map(({ label, value, change, up, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </div>
              <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
              <Badge
                variant="outline"
                className={up ? 'bg-emerald-50 text-emerald-700 text-[10px]' : 'bg-red-50 text-red-600 text-[10px]'}
              >
                {up ? 'â–²' : 'â–¼'} {change} vs last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* KPI Cards â€” Row 2 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {KPI_CARDS.slice(3).map(({ label, value, change, up, icon: Icon, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-5 h-5 ${color}`} />
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
              </div>
              <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
              <Badge
                variant="outline"
                className={up ? 'bg-emerald-50 text-emerald-700 text-[10px]' : 'bg-red-50 text-red-600 text-[10px]'}
              >
                {up ? 'â–²' : 'â–¼'} {change} vs last month
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue by Category */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-500" />
              Revenue by Category
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {REVENUE_CATEGORIES.map(({ label, value, revenue, color }) => (
              <div key={label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  <span className="text-gray-500 dark:text-gray-400">{revenue} ({value}%)</span>
                </div>
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${value}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              Geographic Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {GEO_DISTRIBUTION.map(({ region, value }) => (
              <div key={region}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{region}</span>
                  <span className="text-gray-500 dark:text-gray-400">{value}%</span>
                </div>
                <Progress value={value} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-500" />
              User Growth (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700">
                    {['Month', 'New Users', 'Organizers', 'Revenue'].map(h => (
                      <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {USER_GROWTH.map((row, i) => (
                    <tr key={row.month} className={`border-b border-gray-50 dark:border-gray-800 ${i === USER_GROWTH.length - 1 ? 'bg-blue-50/40 dark:bg-blue-900/10' : ''}`}>
                      <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-white">{row.month}</td>
                      <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400 font-semibold">{row.newUsers}</td>
                      <td className="py-2.5 px-3 text-purple-600 dark:text-purple-400 font-semibold">{row.organizers}</td>
                      <td className="py-2.5 px-3 text-emerald-600 dark:text-emerald-400 font-semibold">{row.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Accommodations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Top Performing Accommodations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {TOP_ACCOMMODATIONS.map((acc, i) => (
                <div key={acc.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/40">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black text-white ${
                    i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : 'bg-orange-700'
                  }`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{acc.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{acc.location} Â· {acc.bookings} bookings</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-emerald-600">{acc.revenue.toLocaleString()} TND</p>
                    <div className="flex items-center gap-0.5 justify-end">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-xs text-gray-500">{acc.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

