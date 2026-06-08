'use client';
import { useState } from 'react';
import { Briefcase, Clock, CheckCircle, XCircle, Eye, UserCheck, ChevronRight } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { MY_APPLICATIONS, type Application } from '@/lib/mock-data';

const STATUS_CONFIG: Record<Application['status'], { label: string; icon: React.ElementType; bg: string; text: string; step: number }> = {
  PENDING: { label: 'Under Review', icon: Clock, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', step: 1 },
  REVIEWED: { label: 'Reviewed', icon: Eye, bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', step: 2 },
  INTERVIEW: { label: 'Interview', icon: UserCheck, bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', step: 3 },
  ACCEPTED: { label: 'Accepted', icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', step: 4 },
  REJECTED: { label: 'Not Selected', icon: XCircle, bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', step: 0 },
};

const STEPS = ['Applied', 'Reviewed', 'Interview', 'Offer'];

function ApplicationTracker({ status }: { status: Application['status'] }) {
  if (status === 'REJECTED') return null;
  const step = STATUS_CONFIG[status].step;
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-0">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? 'bg-emerald-600 text-white' : i === step - 1 ? 'bg-emerald-600 text-white ring-2 ring-emerald-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium whitespace-nowrap ${i < step ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 mb-4 transition-colors ${i < step - 1 ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ApplicationsPage() {
  const [filter, setFilter] = useState<Application['status'] | 'ALL'>('ALL');
  const filtered = MY_APPLICATIONS.filter(a => filter === 'ALL' || a.status === filter);

  return (
    <ClientLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Applications</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track the status of your job applications</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        {[
          { label: 'Total', count: MY_APPLICATIONS.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Pending', count: MY_APPLICATIONS.filter(a => a.status === 'PENDING').length, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Interview', count: MY_APPLICATIONS.filter(a => a.status === 'INTERVIEW').length, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Accepted', count: MY_APPLICATIONS.filter(a => a.status === 'ACCEPTED').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Rejected', count: MY_APPLICATIONS.filter(a => a.status === 'REJECTED').length, color: 'text-red-500 dark:text-red-400' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['ALL', 'PENDING', 'REVIEWED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {s === 'ALL' ? 'All' : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No applications found</p>
            <p className="text-sm mt-1">Browse careers to find your next opportunity</p>
          </div>
        ) : filtered.map(app => {
          const cfg = STATUS_CONFIG[app.status];
          const Icon = cfg.icon;
          return (
            <div key={app.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
                    {app.company[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white leading-snug">{app.jobTitle}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{app.company}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
                  <Icon className="w-3 h-3" /> {cfg.label}
                </span>
              </div>
              <p className="text-xs text-gray-400 mb-2">Applied {new Date(app.appliedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              <ApplicationTracker status={app.status} />
              {app.status === 'ACCEPTED' && (
                <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
                  <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Congratulations! You have been accepted.</p>
                  <p className="text-xs text-emerald-600 dark:text-emerald-500 mt-0.5">Expect a follow-up email with next steps within 48 hours.</p>
                </div>
              )}
              {app.status === 'INTERVIEW' && (
                <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                  <p className="text-sm font-semibold text-purple-700 dark:text-purple-400">Interview scheduled — check your email for details.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ClientLayout>
  );
}
