'use client';
import { useState } from 'react';
import { Plus, X, AlertCircle, Clock, CheckCircle, RotateCcw, XCircle } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { SUPPORT_TICKETS, type SupportTicket, type TicketStatus, type TicketPriority } from '@/lib/mock-data';

const STATUS_CONFIG: Record<TicketStatus, { label: string; icon: React.ElementType; bg: string; text: string }> = {
  OPEN: { label: 'Open', icon: AlertCircle, bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400' },
  IN_PROGRESS: { label: 'In Progress', icon: RotateCcw, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400' },
  WAITING_USER: { label: 'Awaiting Reply', icon: Clock, bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400' },
  RESOLVED: { label: 'Resolved', icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400' },
  CLOSED: { label: 'Closed', icon: XCircle, bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400' },
};

const PRIORITY_CONFIG: Record<TicketPriority, { label: string; dot: string }> = {
  LOW: { label: 'Low', dot: 'bg-gray-400' },
  NORMAL: { label: 'Normal', dot: 'bg-blue-500' },
  HIGH: { label: 'High', dot: 'bg-amber-500' },
  URGENT: { label: 'Urgent', dot: 'bg-red-500' },
};

function StatusBadge({ status }: { status: TicketStatus }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      <Icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

export default function SupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_TICKETS);
  const [filter, setFilter] = useState<TicketStatus | 'ALL'>('ALL');
  const [showCreate, setShowCreate] = useState(false);
  const [selected, setSelected] = useState<SupportTicket | null>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TicketPriority>('NORMAL');
  const [submitted, setSubmitted] = useState(false);

  const filtered = tickets.filter(t => filter === 'ALL' || t.status === filter);

  const handleSubmit = () => {
    if (!subject.trim() || !description.trim()) return;
    const newTicket: SupportTicket = {
      id: `t${Date.now()}`,
      subject: subject.trim(),
      description: description.trim(),
      priority,
      status: 'OPEN',
      createdAt: new Date().toISOString().split('T')[0],
    };
    setTickets(prev => [newTicket, ...prev]);
    setSubmitted(true);
  };

  const handleClose = () => {
    setShowCreate(false);
    setSubmitted(false);
    setSubject('');
    setDescription('');
    setPriority('NORMAL');
  };

  return (
    <ClientLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Support Tickets</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your requests and get help from the CampyWin team</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" /> New Ticket
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Open', count: tickets.filter(t => t.status === 'OPEN').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'In Progress', count: tickets.filter(t => t.status === 'IN_PROGRESS').length, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Resolved', count: tickets.filter(t => t.status === 'RESOLVED').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Total', count: tickets.length, color: 'text-gray-900 dark:text-white' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['ALL', 'OPEN', 'IN_PROGRESS', 'WAITING_USER', 'RESOLVED', 'CLOSED'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {s === 'ALL' ? 'All Tickets' : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Tickets list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <CheckCircle className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No tickets found</p>
          </div>
        ) : filtered.map(ticket => (
          <div
            key={ticket.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelected(ticket)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={`flex items-center gap-1 text-xs font-medium`}>
                    <span className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[ticket.priority].dot} flex-shrink-0`} />
                    {PRIORITY_CONFIG[ticket.priority].label}
                  </span>
                  <span className="text-gray-300 dark:text-gray-600">·</span>
                  <span className="text-xs text-gray-400">#{ticket.id} · {new Date(ticket.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-1 truncate">{ticket.subject}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{ticket.description}</p>
                {ticket.resolvedAt && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Resolved {new Date(ticket.resolvedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                )}
              </div>
              <StatusBadge status={ticket.status} />
            </div>
          </div>
        ))}
      </div>

      {/* Ticket detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`flex items-center gap-1 text-sm font-semibold`}>
                      <span className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[selected.priority].dot}`} />
                      {PRIORITY_CONFIG[selected.priority].label} Priority
                    </span>
                    <StatusBadge status={selected.status} />
                  </div>
                  <p className="text-xs text-gray-400">Ticket #{selected.id}</p>
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">{selected.subject}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{selected.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-400 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span>Opened {new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                {selected.resolvedAt && <span>· Resolved {new Date(selected.resolvedAt).toLocaleDateString()}</span>}
              </div>

              {(selected.status === 'OPEN' || selected.status === 'WAITING_USER') && (
                <div className="mt-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Add a reply</p>
                  <textarea rows={3} placeholder="Provide more details or respond to support…" className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                  <button className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95">Send Reply</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create ticket modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={handleClose}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Ticket Created!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Our team will respond within 24 hours. Check your email for updates.</p>
                <button onClick={handleClose} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all active:scale-95">Done</button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">New Support Ticket</h3>
                  <button onClick={handleClose} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Subject *</label>
                    <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Briefly describe your issue" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Priority</label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const).map(p => (
                        <button key={p} onClick={() => setPriority(p)}
                          className={`py-2 text-xs font-medium rounded-xl border transition-all ${priority === p ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400' : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'}`}>
                          <span className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[p].dot} inline-block mr-1`} />
                          {PRIORITY_CONFIG[p].label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Description *</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} placeholder="Describe the issue in detail…" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={handleClose} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                  <button
                    disabled={!subject.trim() || !description.trim()}
                    onClick={handleSubmit}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed"
                  >
                    Submit Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
