'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Home, Calendar, MapPin, Briefcase, Package, BarChart3, Plus, Users, TrendingUp, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useStore } from '@/lib/store';
import { EVENTS, JOB_OFFERS, ACCOMMODATIONS, ORGANIZER_STATS } from '@/lib/mock-data';

const NAV = [
  { label: 'Overview', href: '/dashboard/organizer', icon: Home },
  { label: 'My Events', href: '/dashboard/organizer', icon: Calendar },
  { label: 'Accommodations', href: '/dashboard/organizer', icon: MapPin },
  { label: 'Job Offers', href: '/dashboard/organizer', icon: Briefcase },
  { label: 'Equipment', href: '/dashboard/organizer', icon: Package },
  { label: 'Analytics', href: '/dashboard/organizer', icon: BarChart3 },
];

const MOCK_EQUIPMENT = [
  { id: 1, name: 'Premium Camping Tent (6-person)', stock: 12, rented: 8, status: 'AVAILABLE' },
  { id: 2, name: 'Sleeping Bag Set', stock: 40, rented: 35, status: 'LOW' },
  { id: 3, name: 'Portable Solar Generator', stock: 6, rented: 6, status: 'OUT' },
  { id: 4, name: 'Camping Stove Kit', stock: 20, rented: 14, status: 'AVAILABLE' },
];

export default function OrganizerDashboard() {
  const user = useStore(s => s.user);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user || user.role !== 'ORGANISATEUR') {
    router.push('/login');
    return null;
  }

  const myEvents = EVENTS.slice(0, 3);
  const myJobs = JOB_OFFERS.slice(0, 2);
  const myAccommodations = ACCOMMODATIONS.slice(0, 3);

  return (
    <DashboardLayout navItems={NAV} title="Organizer Dashboard">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="accommodations">Stays</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="equipment">Equipment</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          {/* Welcome banner */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-6 text-white mb-8">
            <h2 className="text-2xl font-black mb-1">Good day, {user.name.split(' ')[0]}! 🌿</h2>
            <p className="text-purple-100 mb-5">Here's your operations summary for today.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Active Events', value: ORGANIZER_STATS.totalEvents },
                { label: 'Active Bookings', value: ORGANIZER_STATS.activeBookings },
                { label: 'Revenue (TND)', value: `${ORGANIZER_STATS.totalRevenue.toLocaleString()}` },
                { label: 'Avg. Rating', value: `${ORGANIZER_STATS.avgRating}★` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <p className="text-2xl font-black">{value}</p>
                  <p className="text-purple-200 text-xs mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'New Event', icon: Calendar, color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 border-blue-200' },
              { label: 'Add Stay', icon: MapPin, color: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-emerald-200' },
              { label: 'Post Job', icon: Briefcase, color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 border-purple-200' },
              { label: 'Add Equipment', icon: Package, color: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 border-amber-200' },
            ].map(({ label, icon: Icon, color }) => (
              <button key={label} className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 ${color} hover:shadow-md transition-all`}>
                <Plus className="w-4 h-4" />
                <Icon className="w-5 h-5" />
                <span className="text-xs font-semibold">{label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Recent Events</CardTitle>
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                  <Plus className="w-3 h-3" /> New Event
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {myEvents.map(ev => (
                  <div key={ev.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{ev.title}</p>
                      <div className="flex items-center gap-2">
                        <Progress value={Math.round((ev.registered / ev.capacity) * 100)} className="h-1.5 flex-1" />
                        <span className="text-xs text-gray-400 flex-shrink-0">{ev.registered}/{ev.capacity}</span>
                      </div>
                    </div>
                    <Badge className={ev.status === 'UPCOMING' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'} variant="outline">{ev.status}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Equipment summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Equipment Status</CardTitle>
                <Badge variant="outline" className="text-xs">{ORGANIZER_STATS.totalEquipment} items total</Badge>
              </CardHeader>
              <CardContent className="space-y-3">
                {MOCK_EQUIPMENT.map(eq => (
                  <div key={eq.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                    <Package className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{eq.name}</p>
                      <Progress value={Math.round((eq.rented / eq.stock) * 100)} className="h-1.5 mt-1" />
                    </div>
                    <Badge className={eq.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : eq.status === 'LOW' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'} variant="outline">{eq.rented}/{eq.stock}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Pending Applications */}
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Pending Job Applications</CardTitle>
              <Badge className="bg-amber-100 text-amber-700">{ORGANIZER_STATS.pendingApplications} pending</Badge>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {myJobs.map(job => (
                  <div key={job.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{job.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1"><Users className="w-3 h-3" />{job.applicants} applicants</p>
                    </div>
                    <Button size="sm" variant="outline" className="h-8 text-xs">Review</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Events</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2"><Plus className="w-4 h-4" />Create Event</Button>
          </div>
          <div className="space-y-4">
            {myEvents.map(ev => (
              <Card key={ev.id}>
                <CardContent className="pt-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-gray-900 dark:text-white">{ev.title}</h3>
                      <Badge className={ev.status === 'UPCOMING' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'} variant="outline">{ev.status}</Badge>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(ev.date).toLocaleDateString()}</span>
                    </p>
                    <div className="mt-3 max-w-xs">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Registrations</span>
                        <span>{ev.registered}/{ev.capacity}</span>
                      </div>
                      <Progress value={Math.round((ev.registered / ev.capacity) * 100)} className="h-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accommodations">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Properties</h2>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"><Plus className="w-4 h-4" />Add Property</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myAccommodations.map(acc => (
              <Card key={acc.id} className="overflow-hidden">
                <div className="relative h-40">
                  <img src={acc.image} alt={acc.title} className="w-full h-full object-cover" />
                  <Badge className="absolute top-3 right-3 bg-white/90 text-gray-700">{acc.available ? 'Available' : 'Booked'}</Badge>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1 text-sm">{acc.title}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mb-3"><MapPin className="w-3 h-3" />{acc.location}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-600">{acc.price} TND/night</span>
                    <div className="flex items-center gap-1 text-xs"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />{acc.rating}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="jobs">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Offers</h2>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2"><Plus className="w-4 h-4" />Post Job</Button>
          </div>
          <div className="space-y-4">
            {myJobs.map(job => (
              <Card key={job.id}>
                <CardContent className="pt-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-1">{job.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-3">
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" />{job.type}</span>
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{job.applicants} applicants</span>
                    </p>
                    <div className="flex gap-2 mt-2">
                      {job.tags.map(t => <Badge key={t} variant="outline" className="text-xs">{t}</Badge>)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">View ({job.applicants})</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="equipment">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Equipment Inventory</h2>
            <Button className="bg-amber-600 hover:bg-amber-700 text-white gap-2"><Plus className="w-4 h-4" />Add Item</Button>
          </div>
          <Card>
            <CardContent className="pt-5">
              <div className="space-y-4">
                {MOCK_EQUIPMENT.map(eq => (
                  <div key={eq.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <Package className="w-8 h-8 text-amber-600 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">{eq.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Progress value={Math.round((eq.rented / eq.stock) * 100)} className="h-2 flex-1" />
                        <span className="text-xs text-gray-500 flex-shrink-0">{eq.rented}/{eq.stock} rented</span>
                      </div>
                    </div>
                    <Badge className={eq.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-700' : eq.status === 'LOW' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'} variant="outline">{eq.status}</Badge>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
