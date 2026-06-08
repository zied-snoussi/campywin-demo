'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Home, Briefcase, User, MapPin, Calendar, CheckCircle, Clock, XCircle, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useStore } from '@/lib/store';
import { MY_BOOKINGS, MY_APPLICATIONS, EVENTS } from '@/lib/mock-data';

const NAV = [
  { label: 'Overview', href: '/dashboard/client', icon: Home },
  { label: 'My Bookings', href: '/dashboard/client', icon: MapPin },
  { label: 'My Applications', href: '/dashboard/client', icon: Briefcase },
  { label: 'Profile', href: '/dashboard/client', icon: User },
];

const STATUS_BADGE: Record<string, string> = {
  CONFIRMED: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  PENDING: 'bg-amber-100 text-amber-700 border-amber-300',
  COMPLETED: 'bg-gray-100 text-gray-600 border-gray-300',
  CANCELLED: 'bg-red-100 text-red-600 border-red-300',
};

const APP_BADGE: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-600',
  REVIEWED: 'bg-blue-100 text-blue-700',
  INTERVIEW: 'bg-purple-100 text-purple-700',
  ACCEPTED: 'bg-emerald-100 text-emerald-700',
  REJECTED: 'bg-red-100 text-red-600',
};

const APP_ICON: Record<string, React.ElementType> = {
  PENDING: Clock,
  REVIEWED: Star,
  INTERVIEW: CheckCircle,
  ACCEPTED: CheckCircle,
  REJECTED: XCircle,
};

export default function ClientDashboard() {
  const user = useStore(s => s.user);
  const router = useRouter();

  if (!user) {
    router.push('/login');
    return null;
  }

  const upcomingEvents = EVENTS.filter(e => e.status === 'UPCOMING').slice(0, 2);

  return (
    <DashboardLayout navItems={NAV} title="Client Dashboard">
      {/* Welcome */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-black mb-1">Welcome back, {user.name.split(' ')[0]}! 👋</h2>
          <p className="text-emerald-100">Ready for your next outdoor adventure?</p>
          <div className="flex gap-3 mt-5">
            <Button className="bg-white text-emerald-700 hover:bg-gray-100 font-bold" onClick={() => router.push('/accommodations')}>
              Browse Stays
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10" onClick={() => router.push('/events')}>
              Explore Events
            </Button>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: MY_BOOKINGS.length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Confirmed', value: MY_BOOKINGS.filter(b => b.status === 'CONFIRMED').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Applications', value: MY_APPLICATIONS.length, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Total Spent', value: `${MY_BOOKINGS.reduce((s, b) => s + b.total, 0).toLocaleString()} TND`, color: 'text-amber-600 dark:text-amber-400' },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <p className={`text-2xl font-black mb-1 ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">My Bookings</CardTitle>
            <Button variant="ghost" size="sm" className="text-emerald-600 text-xs" onClick={() => router.push('/accommodations')}>View all</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {MY_BOOKINGS.map(b => (
              <div key={b.id} className="flex gap-3 items-center p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="relative w-16 h-14 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={b.image} alt={b.accommodationTitle} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{b.accommodationTitle}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(b.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <Badge className={`text-xs ${STATUS_BADGE[b.status]}`}>{b.status}</Badge>
                  <p className="text-xs font-bold text-gray-900 dark:text-white mt-1">{b.total.toLocaleString()} TND</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Job Applications</CardTitle>
            <Button variant="ghost" size="sm" className="text-purple-600 text-xs" onClick={() => router.push('/jobs')}>Browse jobs</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {MY_APPLICATIONS.map(app => {
              const Icon = APP_ICON[app.status];
              return (
                <div key={app.id} className="flex gap-3 items-center p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{app.jobTitle}</p>
                    <p className="text-xs text-gray-500">{app.company}</p>
                  </div>
                  <Badge className={`text-xs ${APP_BADGE[app.status]}`}>{app.status}</Badge>
                </div>
              );
            })}
            {MY_APPLICATIONS.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">No applications yet. <Button variant="link" className="px-0 text-purple-600" onClick={() => router.push('/jobs')}>Browse jobs</Button></p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base font-bold">Upcoming Events Near You</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcomingEvents.map(ev => (
              <div key={ev.id} className="flex gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={() => router.push('/events')}>
                <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{ev.title}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-2"><MapPin className="w-3 h-3" />{ev.location}</p>
                  <div>
                    <Progress value={Math.round((ev.registered / ev.capacity) * 100)} className="h-1.5 mb-1" />
                    <p className="text-xs text-gray-400">{ev.registered}/{ev.capacity} spots filled</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
