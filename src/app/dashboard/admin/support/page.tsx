'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package,
  Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings,
  Search, Filter,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';

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

type TicketPriority = 'HIGH' | 'MEDIUM' | 'LOW';
type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
type ComplaintStatus = 'PENDING' | 'UNDER_REVIEW' | 'RESOLVED';
type ComplaintSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

interface Ticket {
  id: string;
  subject: string;
  user: string;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

interface Complaint {
  id: string;
  user: string;
  against: string;
  type: string;
  status: ComplaintStatus;
  severity: ComplaintSeverity;
  date: string;
}

const INITIAL_TICKETS: Ticket[] = [
  { id: 'TK-1001', subject: 'Unable to complete booking payment', user: 'Yasmine Gharbi', category: 'Booking', priority: 'HIGH', status: 'OPEN', createdAt: '2026-06-07' },
  { id: 'TK-1002', subject: 'Refund not received after 10 days', user: 'Bilel Mansouri', category: 'Refund', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: '2026-06-05' },
  { id: 'TK-1003', subject: 'App crashes on iOS 17 when uploading photos', user: 'Mariem Chtioui', category: 'Technical', priority: 'MEDIUM', status: 'OPEN', createdAt: '2026-06-06' },
  { id: 'TK-1004', subject: 'Organizer not responding to messages', user: 'Rami Zghal', category: 'Booking', priority: 'MEDIUM', status: 'OPEN', createdAt: '2026-06-04' },
  { id: 'TK-1005', subject: 'Email confirmation never received', user: 'Houda Belhadj', category: 'Technical', priority: 'LOW', status: 'RESOLVED', createdAt: '2026-06-03' },
  { id: 'TK-1006', subject: 'How to add extra guests to existing booking?', user: 'Skander Ferchichi', category: 'Other', priority: 'LOW', status: 'RESOLVED', createdAt: '2026-06-02' },
  { id: 'TK-1007', subject: 'Double charged for same booking', user: 'Nadia Jebali', category: 'Refund', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: '2026-06-08' },
  { id: 'TK-1008', subject: 'Profile picture not updating', user: 'Tarek Hamrouni', category: 'Technical', priority: 'LOW', status: 'CLOSED', createdAt: '2026-05-30' },
];

const INITIAL_COMPLAINTS: Complaint[] = [
  { id: 'CP-001', user: 'Yasmine Gharbi', against: 'Desert Explorers', type: 'Quality', status: 'UNDER_REVIEW', severity: 'HIGH', date: '2026-06-06' },
  { id: 'CP-002', user: 'Bilel Mansouri', against: 'Sahara Oasis Camps', type: 'Fraud', status: 'PENDING', severity: 'CRITICAL', date: '2026-06-07' },
  { id: 'CP-003', user: 'Mariem Chtioui', against: 'CapBon Adventures', type: 'Safety', status: 'UNDER_REVIEW', severity: 'HIGH', date: '2026-06-05' },
  { id: 'CP-004', user: 'Rami Zghal', against: 'Oasis Stays', type: 'Other', status: 'RESOLVED', severity: 'LOW', date: '2026-06-01' },
  { id: 'CP-005', user: 'Houda Belhadj', against: 'CoastalCamp TN', type: 'Quality', status: 'PENDING', severity: 'MEDIUM', date: '2026-06-08' },
];

function priorityBadge(p: TicketPriority) {
  const map: Record<TicketPriority, string> = {
    HIGH:   'bg-red-100 text-red-600',
    MEDIUM: 'bg-amber-100 text-amber-700',
    LOW:    'bg-gray-100 text-gray-600',
  };
  return <Badge variant="outline" className={map[p]}>{p}</Badge>;
}

function ticketStatusBadge(s: TicketStatus) {
  const map: Record<TicketStatus, string> = {
    OPEN:        'bg-blue-100 text-blue-700',
    IN_PROGRESS: 'bg-purple-100 text-purple-700',
    RESOLVED:    'bg-emerald-100 text-emerald-700',
    CLOSED:      'bg-gray-100 text-gray-500',
  };
  return <Badge variant="outline" className={map[s]}>{s.replace('_', ' ')}</Badge>;
}

function complaintStatusBadge(s: ComplaintStatus) {
  const map: Record<ComplaintStatus, string> = {
    PENDING:      'bg-amber-100 text-amber-700',
    UNDER_REVIEW: 'bg-blue-100 text-blue-700',
    RESOLVED:     'bg-emerald-100 text-emerald-700',
  };
  return <Badge variant="outline" className={map[s]}>{s.replace('_', ' ')}</Badge>;
}

function severityBadge(s: ComplaintSeverity) {
  const map: Record<ComplaintSeverity, string> = {
    CRITICAL: 'bg-red-100 text-red-700',
    HIGH:     'bg-orange-100 text-orange-700',
    MEDIUM:   'bg-amber-100 text-amber-600',
    LOW:      'bg-gray-100 text-gray-500',
  };
  return <Badge variant="outline" className={map[s]}>{s}</Badge>;
}

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');

  const openCount = tickets.filter(t => t.status === 'OPEN').length;
  const inProgressCount = tickets.filter(t => t.status === 'IN_PROGRESS').length;
  const resolvedToday = tickets.filter(t => t.status === 'RESOLVED' && t.createdAt === '2026-06-08').length + 2;

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || t.user.toLowerCase().includes(search.toLowerCase());
    const matchPriority = priorityFilter === 'ALL' || t.priority === priorityFilter;
    return matchSearch && matchPriority;
  });

  function resolveTicket(id: string) {
    setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'RESOLVED' } : t));
  }

  function resolveComplaint(id: string) {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'RESOLVED' } : c));
  }

  function reviewComplaint(id: string) {
    setComplaints(prev => prev.map(c => c.id === id ? { ...c, status: 'UNDER_REVIEW' } : c));
  }

  function dismissComplaint(id: string) {
    setComplaints(prev => prev.filter(c => c.id !== id));
  }

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Support & Complaints">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Open Tickets', value: openCount, color: 'text-blue-600' },
          { label: 'In Progress', value: inProgressCount, color: 'text-purple-600' },
          { label: 'Resolved Today', value: resolvedToday, color: 'text-emerald-600' },
          { label: 'Avg Response Time', value: '2.4h', color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tickets by subject or user..."
            className="pl-9 h-9 text-sm"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(p => (
            <Button
              key={p}
              variant={priorityFilter === p ? 'default' : 'outline'}
              size="sm"
              className="h-8 text-xs"
              onClick={() => setPriorityFilter(p)}
            >
              {p}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="tickets">
        <TabsList className="mb-4">
          <TabsTrigger value="tickets">Tickets ({tickets.length})</TabsTrigger>
          <TabsTrigger value="complaints">Complaints ({complaints.length})</TabsTrigger>
        </TabsList>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Support Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Ticket #', 'Subject', 'User', 'Category', 'Priority', 'Status', 'Created', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTickets.map(t => (
                      <tr key={t.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3 font-mono text-xs text-gray-500">{t.id}</td>
                        <td className="py-3 px-3 font-medium text-gray-900 dark:text-white max-w-[200px]">
                          <span className="line-clamp-1">{t.subject}</span>
                        </td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{t.user}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{t.category}</td>
                        <td className="py-3 px-3">{priorityBadge(t.priority)}</td>
                        <td className="py-3 px-3">{ticketStatusBadge(t.status)}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{t.createdAt}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1 flex-wrap">
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500">View</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-500">Assign</Button>
                            {t.status !== 'RESOLVED' && t.status !== 'CLOSED' && (
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-600" onClick={() => resolveTicket(t.id)}>Resolve</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredTickets.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-sm text-gray-400">No tickets match your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Complaints Tab */}
        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>User Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['#', 'User', 'Against', 'Type', 'Status', 'Severity', 'Date', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map(c => (
                      <tr key={c.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3 font-mono text-xs text-gray-500">{c.id}</td>
                        <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">{c.user}</td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{c.against}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{c.type}</td>
                        <td className="py-3 px-3">{complaintStatusBadge(c.status)}</td>
                        <td className="py-3 px-3">{severityBadge(c.severity)}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{c.date}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1 flex-wrap">
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-purple-500" onClick={() => reviewComplaint(c.id)}>Investigate</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-600" onClick={() => resolveComplaint(c.id)}>Resolve</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500" onClick={() => dismissComplaint(c.id)}>Dismiss</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {complaints.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-sm text-gray-400">No complaints.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
