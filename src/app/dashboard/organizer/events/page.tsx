'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package, Car, BarChart3, Mail, Building2, Newspaper,
  Plus, Search, Edit2, Trash2, Eye, XCircle, Clock, Users, TrendingUp, CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { EVENTS, CampEvent } from '@/lib/mock-data';

const NAV_ORG = [
  { label: 'Overview',       href: '/dashboard/organizer',               icon: LayoutDashboard },
  { label: 'My Events',      href: '/dashboard/organizer/events',        icon: Calendar,    section: 'Operations' },
  { label: 'Accommodations', href: '/dashboard/organizer/accommodations',icon: MapPin },
  { label: 'Job Offers',     href: '/dashboard/organizer/jobs',          icon: Briefcase },
  { label: 'Equipment',      href: '/dashboard/organizer/equipment',     icon: Package },
  { label: 'Transport',       href: '/dashboard/organizer/transport',      icon: Car },
  { label: 'My Organization', href: '/dashboard/organizer/organization',   icon: Building2 },
  { label: 'Analytics',       href: '/dashboard/organizer/analytics',      icon: BarChart3,   section: 'Insights' },
  { label: 'Messages',        href: '/dashboard/organizer/messages',       icon: Mail,        section: 'Comms' },
  { label: 'Newsletters',     href: '/dashboard/organizer/newsletters',    icon: Newspaper },
];

const STATUS_COLORS: Record<CampEvent['status'], string> = {
  UPCOMING:  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  ONGOING:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  COMPLETED: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  CANCELLED: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300',
};

const CATEGORY_OPTIONS = ['Festival', 'Adventure', 'Workshop', 'Retreat', 'Sports', 'Cultural'];

const EMPTY_FORM = {
  title: '',
  location: '',
  date: '',
  category: 'Festival',
  capacity: '',
  price: '',
  description: '',
};

export default function ManageEventsPage() {
  const [events, setEvents] = useState<CampEvent[]>(EVENTS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | CampEvent['status']>('ALL');
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const total     = events.length;
  const upcoming  = events.filter(e => e.status === 'UPCOMING').length;
  const ongoing   = events.filter(e => e.status === 'ONGOING').length;
  const completed = events.filter(e => e.status === 'COMPLETED').length;

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function handleCancel(id: string) {
    if (!window.confirm('Cancel this event? This cannot be undone.')) return;
    setEvents(prev => prev.map(e => e.id === id ? { ...e, status: 'CANCELLED' } : e));
  }

  function handleSave() {
    if (!form.title.trim() || !form.location.trim() || !form.date) return;
    const next: CampEvent = {
      id: String(Date.now()),
      title: form.title,
      location: form.location,
      date: form.date,
      endDate: form.date,
      price: Number(form.price) || 0,
      image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      category: form.category,
      capacity: Number(form.capacity) || 50,
      registered: 0,
      organizer: 'Ahmed Ben Ali',
      description: form.description,
      status: 'UPCOMING',
      tags: [],
    };
    setEvents(prev => [next, ...prev]);
    setForm(EMPTY_FORM);
    setShowCreate(false);
  }

  return (
    <DashboardLayout navItems={NAV_ORG} title="Organizer â€” Events">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Events</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and track all your camping events</p>
        </div>
        <Button
          onClick={() => setShowCreate(s => !s)}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          {showCreate ? 'Cancel' : 'Create Event'}
        </Button>
      </div>

      {/* Create form panel */}
      {showCreate && (
        <Card className="mb-6 border-2 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-blue-600" />
              New Event
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="ev-title">Title</Label>
                <Input id="ev-title" placeholder="Event title" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-location">Location</Label>
                <Input id="ev-location" placeholder="City, Region" value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-date">Date</Label>
                <Input id="ev-date" type="date" value={form.date}
                  onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v ?? '' }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORY_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-capacity">Capacity</Label>
                <Input id="ev-capacity" type="number" placeholder="50" value={form.capacity}
                  onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="ev-price">Price (TND)</Label>
                <Input id="ev-price" type="number" placeholder="0" value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="ev-desc">Description</Label>
                <Textarea id="ev-desc" placeholder="Describe your event..." rows={3} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={() => { setShowCreate(false); setForm(EMPTY_FORM); }}>
                Discard
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                Save Event
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Events',  value: total,     icon: Calendar,     color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Upcoming',      value: upcoming,  icon: Clock,        color: 'text-indigo-600',  bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
          { label: 'Ongoing',       value: ongoing,   icon: TrendingUp,   color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Completed',     value: completed, icon: CheckCircle,  color: 'text-gray-600',    bg: 'bg-gray-100 dark:bg-gray-800' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['ALL', 'UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                statusFilter === s
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-400'
              }`}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Events grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400 dark:text-gray-600">
          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-40" />
          <p className="font-semibold">No events found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map(ev => {
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <Card key={ev.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Image */}
                <div className="relative h-44">
                  <Image
                    src={ev.image}
                    alt={ev.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Status badge */}
                  <span className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-bold ${STATUS_COLORS[ev.status]}`}>
                    {ev.status}
                  </span>
                  {/* Category badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 text-gray-700">
                    {ev.category}
                  </span>
                  {/* Title overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-black text-white text-base leading-snug line-clamp-2 drop-shadow">{ev.title}</h3>
                  </div>
                </div>

                <CardContent className="pt-4 pb-4 space-y-3">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{ev.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{new Date(ev.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>

                  {/* Capacity progress */}
                  <div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />Registrations</span>
                      <span>{ev.registered} / {ev.capacity} ({pct}%)</span>
                    </div>
                    <Progress value={pct} className="h-2" />
                  </div>

                  {/* Price + actions */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-base">
                      {ev.price} TND
                    </span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-8 px-3 gap-1.5 text-xs">
                        <Edit2 className="w-3.5 h-3.5" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="h-8 px-3 gap-1.5 text-xs">
                        <Eye className="w-3.5 h-3.5" />
                        View
                      </Button>
                      {ev.status !== 'CANCELLED' && ev.status !== 'COMPLETED' && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 px-3 gap-1.5 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                          onClick={() => handleCancel(ev.id)}
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
}

