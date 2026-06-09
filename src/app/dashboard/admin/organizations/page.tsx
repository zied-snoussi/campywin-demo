'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package, Briefcase,
  FileText, LifeBuoy, BarChart3, Mail, Settings,
  Search, CheckCircle, XCircle, Eye, ShieldOff,
  MapPin, Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const NAV_ADMIN = [
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

type OrgStatus = 'VERIFIED' | 'PENDING' | 'SUSPENDED';

interface MockOrg {
  id: string;
  name: string;
  category: string;
  location: string;
  properties: number;
  events: number;
  rating: number;
  status: OrgStatus;
  joinedAt: string;
  initial: string;
  color: string;
}

const INITIAL_ORGS: MockOrg[] = [
  { id: '1', name: 'Sahara Oasis Camps',   category: 'Desert Camp',  location: 'Douz, Kebili',       properties: 8,  events: 12, rating: 4.9, status: 'VERIFIED',  joinedAt: '2024-09-01', initial: 'SO', color: 'from-amber-500 to-orange-600' },
  { id: '2', name: 'Dorra Camping Co.',    category: 'Eco Lodge',    location: 'Ain Draham, Jendouba', properties: 5,  events: 7,  rating: 4.7, status: 'VERIFIED',  joinedAt: '2024-08-12', initial: 'DC', color: 'from-emerald-500 to-teal-600' },
  { id: '3', name: 'CoastalCamp TN',       category: 'Beach Camp',   location: 'Tabarka, Jendouba',   properties: 6,  events: 9,  rating: 4.8, status: 'VERIFIED',  joinedAt: '2024-10-03', initial: 'CC', color: 'from-cyan-500 to-sky-600' },
  { id: '4', name: 'Desert Explorers',     category: 'Safari',       location: 'Matmata, Gabes',      properties: 4,  events: 5,  rating: 4.6, status: 'VERIFIED',  joinedAt: '2024-11-20', initial: 'DE', color: 'from-yellow-600 to-amber-700' },
  { id: '5', name: 'Oasis Stays',          category: 'Glamping',     location: 'Tozeur, Tozeur',      properties: 3,  events: 4,  rating: 4.5, status: 'VERIFIED',  joinedAt: '2025-01-08', initial: 'OS', color: 'from-purple-500 to-violet-600' },
  { id: '6', name: 'CapBon Adventures',    category: 'Beach Camp',   location: 'Nabeul, Nabeul',      properties: 2,  events: 3,  rating: 4.4, status: 'VERIFIED',  joinedAt: '2025-02-14', initial: 'CA', color: 'from-blue-500 to-indigo-600' },
  { id: '7', name: 'Desert Camp Pro',      category: 'Desert Camp',  location: 'Douz, Kebili',        properties: 0,  events: 0,  rating: 0,   status: 'PENDING',   joinedAt: '2026-06-05', initial: 'DP', color: 'from-rose-500 to-pink-600' },
  { id: '8', name: 'Green Trails Lodge',   category: 'Eco Lodge',    location: 'Tabarka, Jendouba',   properties: 0,  events: 0,  rating: 0,   status: 'PENDING',   joinedAt: '2026-06-07', initial: 'GT', color: 'from-lime-500 to-green-600' },
];

const CATEGORIES = ['All', 'Desert Camp', 'Eco Lodge', 'Beach Camp', 'Safari', 'Glamping'];

const STATUS_COLORS: Record<OrgStatus, string> = {
  VERIFIED:  'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  PENDING:   'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  SUSPENDED: 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

export default function AdminOrganizationsPage() {
  const [orgs, setOrgs] = useState<MockOrg[]>(INITIAL_ORGS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const verifyOrg = (id: string) => {
    setOrgs(prev => prev.map(o => o.id === id ? { ...o, status: 'VERIFIED' } : o));
  };

  const rejectOrg = (id: string) => {
    setOrgs(prev => prev.filter(o => o.id !== id));
  };

  const suspendOrg = (id: string) => {
    setOrgs(prev =>
      prev.map(o =>
        o.id === id ? { ...o, status: o.status === 'SUSPENDED' ? 'VERIFIED' : 'SUSPENDED' } : o
      )
    );
  };

  const filtered = orgs.filter(o => {
    const matchesSearch = o.name.toLowerCase().includes(search.toLowerCase()) || o.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === 'All' || o.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const allOrgs      = orgs.length;
  const verified     = orgs.filter(o => o.status === 'VERIFIED').length;
  const pending      = orgs.filter(o => o.status === 'PENDING').length;
  const suspended    = orgs.filter(o => o.status === 'SUSPENDED').length;
  const pendingOrgs  = orgs.filter(o => o.status === 'PENDING');

  const OrgRow = ({ o, showActions = true }: { o: MockOrg; showActions?: boolean }) => (
    <tr className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      {/* Logo + Name */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
            {o.initial}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm whitespace-nowrap">{o.name}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500">{o.joinedAt}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-4">
        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300">{o.category}</Badge>
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
          <MapPin className="w-3 h-3" /> {o.location}
        </div>
      </td>
      <td className="py-3 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">{o.properties}</td>
      <td className="py-3 px-4 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">{o.events}</td>
      <td className="py-3 px-4">
        {o.rating > 0 ? (
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{o.rating}</span>
          </div>
        ) : (
          <span className="text-xs text-gray-400">—</span>
        )}
      </td>
      <td className="py-3 px-4">
        <Badge variant="outline" className={`text-xs ${STATUS_COLORS[o.status]}`}>{o.status}</Badge>
      </td>
      {showActions && (
        <td className="py-3 px-4">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-blue-600" title="View">
              <Eye className="w-3.5 h-3.5" />
            </Button>
            {o.status === 'PENDING' && (
              <Button
                variant="ghost" size="sm"
                onClick={() => verifyOrg(o.id)}
                className="h-7 w-7 p-0 text-gray-500 hover:text-emerald-600" title="Verify"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </Button>
            )}
            <Button
              variant="ghost" size="sm"
              onClick={() => suspendOrg(o.id)}
              className={`h-7 w-7 p-0 ${o.status === 'SUSPENDED' ? 'text-emerald-500' : 'text-gray-500 hover:text-amber-600'}`}
              title={o.status === 'SUSPENDED' ? 'Reactivate' : 'Suspend'}
            >
              <ShieldOff className="w-3.5 h-3.5" />
            </Button>
          </div>
        </td>
      )}
    </tr>
  );

  const TableHead = ({ showActions = true }: { showActions?: boolean }) => (
    <thead>
      <tr className="border-b border-gray-100 dark:border-gray-700">
        {['Organization', 'Category', 'Location', 'Properties', 'Events', 'Rating', 'Status', ...(showActions ? ['Actions'] : [])].map(h => (
          <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Admin — Organizations">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Organizations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage camping organizers and operators on the platform.</p>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orgs',     value: allOrgs,   color: 'text-blue-600 dark:text-blue-400',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Verified',       value: verified,  color: 'text-green-600 dark:text-green-400',  bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Pending Review', value: pending,   color: 'text-amber-600 dark:text-amber-400',  bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Suspended',      value: suspended, color: 'text-red-600 dark:text-red-400',      bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(({ label, value, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-4">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${bg} mb-3`}>
                <Building2 className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="all">All Organizations</TabsTrigger>
            <TabsTrigger value="pending" className="relative">
              Pending Review
              {pending > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold">
                  {pending}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Filters */}
          <div className="flex items-center gap-2 ml-auto flex-wrap">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl">
              <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search organizations..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-sm outline-none w-40 placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl px-3 py-2 outline-none border-none cursor-pointer"
            >
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* All orgs tab */}
        <TabsContent value="all">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <TableHead />
                  <tbody>
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-gray-400 text-sm">No organizations match your filters.</td>
                      </tr>
                    )}
                    {filtered.map(o => <OrgRow key={o.id} o={o} />)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pending review tab */}
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Organizations Awaiting Approval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pendingOrgs.length === 0 && (
                <div className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                  No pending organizations. All caught up!
                </div>
              )}
              {pendingOrgs.map(o => (
                <div
                  key={o.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 bg-amber-50 dark:bg-amber-900/10"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${o.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {o.initial}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">{o.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <Badge variant="outline" className="text-xs border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400">{o.category}</Badge>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" /> {o.location}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Submitted {o.joinedAt}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      onClick={() => verifyOrg(o.id)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white h-8 text-xs gap-1.5"
                    >
                      <CheckCircle className="w-3.5 h-3.5" /> Accept
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => rejectOrg(o.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20 h-8 text-xs gap-1.5"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
