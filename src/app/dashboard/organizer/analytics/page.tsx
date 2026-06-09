'use client';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package,
  Car, BarChart3, Mail, TrendingUp, Star, Download,
  DollarSign, CalendarCheck, Users, Wrench, ClipboardList,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ACCOMMODATIONS } from '@/lib/mock-data';

const NAV_ORG = [
  { label: 'Overview',       href: '/dashboard/organizer',               icon: LayoutDashboard },
  { label: 'My Events',      href: '/dashboard/organizer/events',        icon: Calendar,    section: 'Operations' },
  { label: 'Accommodations', href: '/dashboard/organizer/accommodations',icon: MapPin },
  { label: 'Job Offers',     href: '/dashboard/organizer/jobs',          icon: Briefcase },
  { label: 'Equipment',      href: '/dashboard/organizer/equipment',     icon: Package },
  { label: 'Transport',      href: '/dashboard/organizer/transport',     icon: Car },
  { label: 'Analytics',      href: '/dashboard/organizer/analytics',     icon: BarChart3,   section: 'Insights' },
  { label: 'Messages',       href: '/dashboard/organizer/messages',      icon: Mail,        section: 'Comms' },
];

const MONTHLY_DATA = [
  { month: 'Jan 2026', bookings: 38, revenue: 5820,  occupancy: 62 },
  { month: 'FÃ©v 2026', bookings: 44, revenue: 7240,  occupancy: 68 },
  { month: 'Mar 2026', bookings: 52, revenue: 8950,  occupancy: 74 },
  { month: 'Avr 2026', bookings: 67, revenue: 11400, occupancy: 81 },
  { month: 'Mai 2026', bookings: 79, revenue: 13750, occupancy: 88 },
  { month: 'Jun 2026', bookings: 58, revenue: 9830,  occupancy: 77 },
];

const RECENT_REVIEWS = [
  { id: 1, reviewer: 'Yassine T.',   property: 'Sahara Oasis Glamping',    rating: 5, date: '2026-06-05', comment: 'ExpÃ©rience inoubliable ! Le service Ã©tait impeccable et la vue sur les dunes est Ã  couper le souffle.' },
  { id: 2, reviewer: 'Sarra B.',     property: 'Atlas Mountain Eco Lodge', rating: 4, date: '2026-06-02', comment: 'TrÃ¨s belle lodge, cadre naturel magnifique. Petit bÃ©mol sur le WiFi mais sinon parfait.' },
  { id: 3, reviewer: 'Karim M.',     property: 'Mediterranean Coast Retreat', rating: 5, date: '2026-05-28', comment: 'Le meilleur sÃ©jour camping de ma vie ! L\'Ã©quipe est super accueillante et les activitÃ©s sont variÃ©es.' },
  { id: 4, reviewer: 'Amira S.',     property: 'Sahara Oasis Glamping',    rating: 4, date: '2026-05-20', comment: 'TrÃ¨s bonne expÃ©rience. Les repas inclus Ã©taient dÃ©licieux, je recommande vivement.' },
];

const TOP_PROPERTIES = ACCOMMODATIONS.slice(0, 3).map((acc, i) => ({
  ...acc,
  revenue:  [18400, 12200, 8150][i],
  bookings: [64, 41, 28][i],
}));

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300 dark:text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const kpis = [
    { label: 'Total Revenue',         value: '38,750 TND', change: '+12%',  icon: DollarSign,    color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
    { label: 'Bookings This Month',   value: '58',         change: '+8%',   icon: CalendarCheck, color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20'       },
    { label: 'Event Registrations',   value: '143',        change: '+22%',  icon: Users,         color: 'text-purple-600',  bg: 'bg-purple-50 dark:bg-purple-900/20'   },
    { label: 'Equipment Rentals',     value: '94',         change: '+5%',   icon: Wrench,        color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20'     },
    { label: 'Job Applications',      value: '62',         change: '+18%',  icon: ClipboardList, color: 'text-indigo-600',  bg: 'bg-indigo-50 dark:bg-indigo-900/20'   },
    { label: 'Avg Rating',            value: '4.7 â˜…',      change: '+0.1',  icon: Star,          color: 'text-rose-600',    bg: 'bg-rose-50 dark:bg-rose-900/20'       },
  ];

  return (
    <DashboardLayout navItems={NAV_ORG} title="Analytics">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Analytics</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Performance overview â€” Janâ€“Jun 2026</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" /> Export Report
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {kpis.map(({ label, value, change, icon: Icon, color, bg }) => (
          <Card key={label} className={`${bg} border-0`}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <Icon className={`w-4 h-4 ${color}`} />
                <Badge className="bg-white/70 dark:bg-gray-800/70 text-gray-600 dark:text-gray-300 border-0 text-xs px-1.5" variant="outline">{change}</Badge>
              </div>
              <p className={`text-xl font-black ${color} leading-tight`}>{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-snug">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Breakdown */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Revenue Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: 'Accommodations', pct: 55, amount: '21,313 TND', color: 'bg-emerald-500' },
              { label: 'Events',          pct: 30, amount: '11,625 TND', color: 'bg-blue-500'    },
              { label: 'Equipment',       pct: 15, amount: '5,812 TND',  color: 'bg-amber-500'   },
            ].map(({ label, pct, amount, color }) => (
              <div key={label}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{amount}</span>
                    <Badge variant="outline" className="text-xs border-0 bg-gray-100 dark:bg-gray-800 px-1.5">{pct}%</Badge>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className={`${color} h-2.5 rounded-full transition-all`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Monthly Bookings Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CalendarCheck className="w-4 h-4 text-blue-600" />
              Bookings by Month
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                    {['Month', 'Bookings', 'Revenue', 'Occupancy'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-gray-400">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_DATA.map((row, i) => (
                    <tr key={row.month} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${i === MONTHLY_DATA.length - 1 ? 'font-semibold' : ''}`}>
                      <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{row.month}</td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white font-semibold">{row.bookings}</td>
                      <td className="px-4 py-3 text-emerald-700 dark:text-emerald-400 font-semibold whitespace-nowrap">{row.revenue.toLocaleString()} TND</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Progress value={row.occupancy} className="h-1.5 w-20" />
                          <span className="text-xs text-gray-500">{row.occupancy}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Properties */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-600" />
              Top Performing Properties
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {TOP_PROPERTIES.map((acc, rank) => (
              <div key={acc.id} className="flex items-center gap-4 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                {/* Rank badge */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black flex-shrink-0 ${
                  rank === 0 ? 'bg-amber-100 text-amber-700' :
                  rank === 1 ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300' :
                               'bg-orange-100 text-orange-700'
                }`}>
                  #{rank + 1}
                </div>
                {/* Thumbnail */}
                <img src={acc.image} alt={acc.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{acc.title}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{acc.location}</p>
                  <StarRow rating={Math.round(acc.rating)} />
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-black text-emerald-600 text-sm">{acc.revenue.toLocaleString()} TND</p>
                  <p className="text-xs text-gray-500">{acc.bookings} bookings</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500" />
              Recent Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {RECENT_REVIEWS.map(review => (
              <div key={review.id} className="p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.reviewer}</span>
                    <span className="text-xs text-gray-400 ml-2">on {review.property}</span>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{review.date}</span>
                </div>
                <StarRow rating={review.rating} />
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 leading-relaxed line-clamp-2">
                  {review.comment}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

