'use client';
import { useState } from 'react';
import { Mail, Users, Send, Plus, Search, Eye, Trash2, Edit2, X, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { LayoutDashboard, Building2, Tent, Package, Briefcase, FileText, LifeBuoy, BarChart3, Settings } from 'lucide-react';

const NAV = [
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

type NewsletterStatus = 'SENT' | 'SCHEDULED' | 'DRAFT';

interface Newsletter {
  id: string;
  subject: string;
  recipients: number;
  openRate: number;
  status: NewsletterStatus;
  date: string;
  segment: string;
}

const NEWSLETTERS: Newsletter[] = [
  { id: 'nl1', subject: 'CampyWin May Newsletter — New Spots & Events', recipients: 4820, openRate: 42, status: 'SENT', date: '2026-05-01', segment: 'All Users' },
  { id: 'nl2', subject: 'Summer 2026 Camping Guide', recipients: 3200, openRate: 38, status: 'SENT', date: '2026-04-15', segment: 'Clients' },
  { id: 'nl3', subject: 'New Organizer Features — Inventory & Transport', recipients: 640, openRate: 55, status: 'SENT', date: '2026-04-01', segment: 'Organizers' },
  { id: 'nl4', subject: 'June Events Spotlight — Sahara & Atlas', recipients: 4820, openRate: 0, status: 'SCHEDULED', date: '2026-06-01', segment: 'All Users' },
  { id: 'nl5', subject: 'Welcome to CampyWin Premium (Draft)', recipients: 0, openRate: 0, status: 'DRAFT', date: '2026-06-09', segment: 'New Signups' },
];

const STATUS_CONFIG: Record<NewsletterStatus, { label: string; icon: React.ElementType; bg: string; text: string }> = {
  SENT:      { label: 'Sent',      icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400' },
  SCHEDULED: { label: 'Scheduled', icon: Clock,       bg: 'bg-blue-50 dark:bg-blue-900/20',       text: 'text-blue-700 dark:text-blue-400' },
  DRAFT:     { label: 'Draft',     icon: AlertCircle, bg: 'bg-gray-50 dark:bg-gray-700',          text: 'text-gray-600 dark:text-gray-400' },
};

export default function AdminNewslettersPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<NewsletterStatus | 'ALL'>('ALL');
  const [showCreate, setShowCreate] = useState(false);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [segment, setSegment] = useState('All Users');
  const [submitted, setSubmitted] = useState(false);

  const filtered = NEWSLETTERS.filter(n => {
    const q = search.toLowerCase();
    return (filter === 'ALL' || n.status === filter) &&
      (n.subject.toLowerCase().includes(q) || n.segment.toLowerCase().includes(q));
  });

  const stats = {
    sent: NEWSLETTERS.filter(n => n.status === 'SENT').length,
    subscribers: 4820,
    avgOpen: Math.round(NEWSLETTERS.filter(n => n.status === 'SENT').reduce((s, n) => s + n.openRate, 0) / NEWSLETTERS.filter(n => n.status === 'SENT').length),
    scheduled: NEWSLETTERS.filter(n => n.status === 'SCHEDULED').length,
  };

  return (
    <DashboardLayout navItems={NAV} title="Admin">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Newsletters</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Create and manage email campaigns for CampyWin subscribers</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" /> New Newsletter
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Newsletters Sent', value: stats.sent, color: 'text-emerald-600 dark:text-emerald-400', icon: '📨' },
          { label: 'Subscribers',      value: stats.subscribers.toLocaleString(), color: 'text-blue-600 dark:text-blue-400', icon: '👥' },
          { label: 'Avg Open Rate',    value: `${stats.avgOpen}%`, color: 'text-amber-600 dark:text-amber-400', icon: '👁️' },
          { label: 'Scheduled',        value: stats.scheduled, color: 'text-purple-600 dark:text-purple-400', icon: '📅' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700">
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search newsletters…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['ALL', 'SENT', 'SCHEDULED', 'DRAFT'] as const).map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
              {s === 'ALL' ? 'All' : STATUS_CONFIG[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-700">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Subject</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Segment</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Recipients</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Open Rate</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
              {filtered.map(n => {
                const cfg = STATUS_CONFIG[n.status];
                const Icon = cfg.icon;
                return (
                  <tr key={n.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-gray-900 dark:text-white max-w-xs truncate">{n.subject}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs px-2 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full">{n.segment}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {n.recipients > 0 ? <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {n.recipients.toLocaleString()}</span> : '—'}
                    </td>
                    <td className="px-5 py-4">
                      {n.status === 'SENT' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${n.openRate}%` }} />
                          </div>
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{n.openRate}%</span>
                        </div>
                      ) : '—'}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
                        <Icon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-400">{new Date(n.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        {n.status !== 'SENT' && <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-600 transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>}
                        <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-600 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                        {n.status !== 'SENT' && <button className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create newsletter modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => { setShowCreate(false); setSubmitted(false); }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Newsletter Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Your newsletter has been queued for delivery to all subscribers.</p>
                <button onClick={() => { setShowCreate(false); setSubmitted(false); setSubject(''); setBody(''); }} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all active:scale-95">Done</button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">New Newsletter</h3>
                  <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Subject *</label>
                    <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Enter email subject" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Segment</label>
                    <select value={segment} onChange={e => setSegment(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400">
                      {['All Users', 'Clients', 'Organizers', 'New Signups', 'Inactive Users'].map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Content *</label>
                    <textarea value={body} onChange={e => setBody(e.target.value)} rows={6} placeholder="Write your newsletter content…" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Save Draft</button>
                  <button disabled={!subject.trim() || !body.trim()} onClick={() => setSubmitted(true)}
                    className="flex items-center gap-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed">
                    <Send className="w-4 h-4" /> Send Newsletter
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
