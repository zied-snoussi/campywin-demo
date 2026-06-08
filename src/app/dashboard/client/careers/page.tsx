'use client';
import { useState } from 'react';
import { MapPin, Users, Briefcase, Search, Clock, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClientLayout } from '@/components/layout/client-layout';
import { JOB_OFFERS } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function ClientCareersPage() {
  const user = useStore(s => s.user);
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof JOB_OFFERS[0] | null>(null);
  const [applied, setApplied] = useState<string[]>([]);

  const filtered = JOB_OFFERS.filter(j => {
    const q = search.toLowerCase();
    return j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q);
  });

  return (
    <ClientLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Career Opportunities</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find your dream outdoor job across Tunisia</p>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input className="pl-10" placeholder="Search jobs, companies, locations…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <p className="text-xs text-gray-400 mb-5">{filtered.length} positions available</p>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(job => (
          <div
            key={job.id}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700 cursor-pointer group"
            onClick={() => setSelected(job)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-md flex-shrink-0">
                {job.company[0]}
              </div>
              {applied.includes(job.id) && (
                <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1 inline" />Applied
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">{job.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{job.company}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-3">
              <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.type}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {job.applicants} applicants</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(job.postedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {job.tags.map(t => (
                <span key={t} className="text-xs px-2 py-0.5 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full">{t}</span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
              <span className="font-bold text-gray-900 dark:text-white text-sm">{job.salary}</span>
              <Button size="sm" variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-xs">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Job detail modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-xl">
          {selected && (
            <>
              <DialogHeader className="mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {selected.company[0]}
                  </div>
                  <div>
                    <DialogTitle className="text-xl font-black">{selected.title}</DialogTitle>
                    <p className="text-gray-500 text-sm">{selected.company}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-5">
                <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full"><MapPin className="w-3 h-3" /> {selected.location}</span>
                <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full"><Briefcase className="w-3 h-3" /> {selected.type}</span>
                <span className="flex items-center gap-1 bg-gray-50 dark:bg-gray-700 px-3 py-1.5 rounded-full"><Users className="w-3 h-3" /> {selected.applicants} applicants</span>
              </div>

              <div className="mb-5">
                <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">About the Role</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{selected.description}</p>
              </div>

              <div className="mb-5">
                <p className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Requirements</p>
                <ul className="space-y-1.5">
                  {selected.requirements.map(r => (
                    <li key={r} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Salary Range</p>
                  <p className="font-bold text-gray-900 dark:text-white">{selected.salary}</p>
                </div>
                {applied.includes(selected.id) ? (
                  <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-2">
                    <CheckCircle className="w-3.5 h-3.5 mr-1 inline" />Application Sent!
                  </Badge>
                ) : (
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => {
                      if (!user) { router.push('/login'); return; }
                      setApplied(a => [...a, selected.id]);
                    }}
                  >
                    {user ? 'Apply Now' : 'Sign In to Apply'}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}
