'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package, Car, BarChart3, Mail, Building2, Newspaper,
  Plus, Edit2, Trash2, Users, CheckCircle, XCircle, Clock, AlertCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { JOB_OFFERS, JobOffer } from '@/lib/mock-data';

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

type JobStatus = 'ACTIVE' | 'CLOSED' | 'DRAFT';
type CandidatureStatus = 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';

interface JobOfferExt extends JobOffer {
  status: JobStatus;
}

interface Candidature {
  id: string;
  candidateName: string;
  initial: string;
  jobTitle: string;
  appliedAt: string;
  status: CandidatureStatus;
}

const INITIAL_JOBS: JobOfferExt[] = JOB_OFFERS.map((j, i) => ({
  ...j,
  status: i < 3 ? 'ACTIVE' : 'DRAFT',
}));

const INITIAL_CANDIDATURES: Candidature[] = [
  { id: 'c1', candidateName: 'Yassine Trabelsi',  initial: 'Y', jobTitle: 'Event Coordinator',       appliedAt: '2026-06-02', status: 'INTERVIEW' },
  { id: 'c2', candidateName: 'Sarra Belhaj',       initial: 'S', jobTitle: 'Camp Chef & Catering Lead',  appliedAt: '2026-06-03', status: 'REVIEWED'  },
  { id: 'c3', candidateName: 'Ines Mansouri',      initial: 'I', jobTitle: 'Event Coordinator',       appliedAt: '2026-06-04', status: 'PENDING'   },
  { id: 'c4', candidateName: 'Karim Boughedir',    initial: 'K', jobTitle: 'Wilderness Guide',        appliedAt: '2026-06-04', status: 'ACCEPTED'  },
  { id: 'c5', candidateName: 'Rania Gharbi',       initial: 'R', jobTitle: 'Equipment Manager',       appliedAt: '2026-06-05', status: 'PENDING'   },
  { id: 'c6', candidateName: 'Nour Kachoukh',      initial: 'N', jobTitle: 'Camp Chef & Catering Lead',  appliedAt: '2026-06-05', status: 'REJECTED'  },
  { id: 'c7', candidateName: 'Ahmed Maaloul',      initial: 'A', jobTitle: 'Wilderness Guide',        appliedAt: '2026-06-06', status: 'PENDING'   },
  { id: 'c8', candidateName: 'Lina Mrad',          initial: 'L', jobTitle: 'Event Coordinator',       appliedAt: '2026-06-07', status: 'REVIEWED'  },
];

const JOB_TYPES = ['Full-time Seasonal', 'Seasonal', 'Part-time Flexible', 'Full-time', 'Internship'];

const JOB_STATUS_COLORS: Record<JobStatus, string> = {
  ACTIVE: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  CLOSED: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
  DRAFT:  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
};

const CAND_STATUS_COLORS: Record<CandidatureStatus, string> = {
  PENDING:   'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  REVIEWED:  'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  INTERVIEW: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  ACCEPTED:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  REJECTED:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300',
};

const EMPTY_FORM = {
  title: '',
  type: 'Seasonal',
  location: '',
  salary: '',
  description: '',
  requirements: '',
};

export default function ManageJobsPage() {
  const [jobs, setJobs] = useState<JobOfferExt[]>(INITIAL_JOBS);
  const [candidatures, setCandidatures] = useState<Candidature[]>(INITIAL_CANDIDATURES);
  const [activeTab, setActiveTab] = useState('offers');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [candFilter, setCandFilter] = useState<CandidatureStatus | 'ALL'>('ALL');

  // Stats
  const totalOffers       = jobs.length;
  const activeOffers      = jobs.filter(j => j.status === 'ACTIVE').length;
  const totalApplicants   = jobs.reduce((s, j) => s + j.applicants, 0);
  const interviews        = candidatures.filter(c => c.status === 'INTERVIEW').length;

  function closeJob(id: string) {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, status: 'CLOSED' } : j));
  }

  function deleteJob(id: string) {
    if (!window.confirm('Delete this job offer?')) return;
    setJobs(prev => prev.filter(j => j.id !== id));
  }

  function handlePostJob() {
    if (!form.title.trim() || !form.location.trim()) return;
    const next: JobOfferExt = {
      id: String(Date.now()),
      title: form.title,
      company: 'Ahmed Ben Ali',
      location: form.location,
      type: form.type,
      salary: form.salary || 'Negotiable',
      tags: [],
      postedAt: new Date().toISOString().split('T')[0],
      description: form.description,
      requirements: form.requirements.split('\n').filter(Boolean),
      applicants: 0,
      status: 'ACTIVE',
    };
    setJobs(prev => [next, ...prev]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function moveToCandStatus(id: string, status: CandidatureStatus) {
    setCandidatures(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }

  const filteredCandidatures = candFilter === 'ALL'
    ? candidatures
    : candidatures.filter(c => c.status === candFilter);

  return (
    <DashboardLayout navItems={NAV_ORG} title="Organizer â€” Jobs">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Job Offers</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage postings and review applicants</p>
        </div>
        <Button
          onClick={() => { setShowForm(s => !s); setActiveTab('offers'); }}
          className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel' : 'Post New Offer'}
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Offers',       value: totalOffers,     icon: Briefcase,    color: 'text-purple-600',  bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Active',             value: activeOffers,    icon: CheckCircle,  color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Total Applicants',   value: totalApplicants, icon: Users,        color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Interviews Sched.',  value: interviews,      icon: Clock,        color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20' },
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

      {/* Inline post form */}
      {showForm && (
        <Card className="mb-6 border-2 border-purple-200 dark:border-purple-800">
          <CardContent className="pt-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Plus className="w-4 h-4 text-purple-600" />
              New Job Offer
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="e.g. Camp Guide" value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v ?? '' }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="job-location">Location</Label>
                <Input id="job-location" placeholder="City, Tunisia" value={form.location}
                  onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="job-salary">Salary</Label>
                <Input id="job-salary" placeholder="e.g. 1,000 â€“ 1,500 TND/mo" value={form.salary}
                  onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="job-desc">Description</Label>
                <Textarea id="job-desc" placeholder="Describe the role..." rows={3} value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <Label htmlFor="job-req">Requirements (one per line)</Label>
                <Textarea id="job-req" placeholder="e.g. 2+ years experience&#10;Driver's license" rows={3} value={form.requirements}
                  onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <Button variant="outline" onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}>
                Discard
              </Button>
              <Button onClick={handlePostJob} className="bg-purple-600 hover:bg-purple-700 text-white">
                Post Offer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="offers">My Offers</TabsTrigger>
          <TabsTrigger value="candidatures">
            Candidatures
            {candidatures.filter(c => c.status === 'PENDING').length > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 bg-purple-600 text-white rounded-full text-[10px] font-bold leading-none">
                {candidatures.filter(c => c.status === 'PENDING').length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        {/* My Offers tab */}
        <TabsContent value="offers">
          {jobs.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-600">
              <Briefcase className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No job offers yet</p>
            </div>
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Title</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Type</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Location</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400 hidden lg:table-cell">Salary</th>
                      <th className="text-center px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Applicants</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400 hidden lg:table-cell">Posted</th>
                      <th className="text-center px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map(job => (
                      <tr key={job.id} className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-semibold text-gray-900 dark:text-white">{job.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{job.company}</p>
                        </td>
                        <td className="px-4 py-4">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md text-xs font-medium whitespace-nowrap">
                            {job.type}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1 text-xs"><MapPin className="w-3 h-3" />{job.location}</span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell text-gray-600 dark:text-gray-300 text-xs whitespace-nowrap">
                          {job.salary}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="flex items-center justify-center gap-1 text-sm font-bold text-gray-900 dark:text-white">
                            <Users className="w-3.5 h-3.5 text-blue-500" />
                            {job.applicants}
                          </span>
                        </td>
                        <td className="px-4 py-4 hidden lg:table-cell text-xs text-gray-500 dark:text-gray-400">
                          {new Date(job.postedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${JOB_STATUS_COLORS[job.status]}`}>
                            {job.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1 text-xs">
                              <Edit2 className="w-3 h-3" />
                            </Button>
                            {job.status === 'ACTIVE' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 gap-1 text-xs text-orange-600 border-orange-200 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                                onClick={() => closeJob(job.id)}
                              >
                                Close
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-7 px-2.5 gap-1 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20"
                              onClick={() => deleteJob(job.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Candidatures tab */}
        <TabsContent value="candidatures">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-5">
            {(['ALL', 'PENDING', 'REVIEWED', 'INTERVIEW', 'ACCEPTED', 'REJECTED'] as const).map(s => (
              <button
                key={s}
                onClick={() => setCandFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  candFilter === s
                    ? 'bg-purple-600 text-white border-purple-600'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-purple-400'
                }`}
              >
                {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
                {s !== 'ALL' && (
                  <span className="ml-1 opacity-70">
                    ({candidatures.filter(c => c.status === s).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          {filteredCandidatures.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-600">
              <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No candidatures found</p>
            </div>
          ) : (
            <Card>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Candidate</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Applied For</th>
                      <th className="text-left px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400 hidden md:table-cell">Date</th>
                      <th className="text-center px-4 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Status</th>
                      <th className="text-right px-5 py-3.5 font-semibold text-gray-500 dark:text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCandidatures.map(c => (
                      <tr key={c.id} className="border-b border-gray-50 dark:border-gray-800/60 hover:bg-gray-50/60 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {c.initial}
                            </div>
                            <span className="font-semibold text-gray-900 dark:text-white">{c.candidateName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-gray-600 dark:text-gray-300">
                          <span className="flex items-center gap-1 text-xs"><Briefcase className="w-3 h-3" />{c.jobTitle}</span>
                        </td>
                        <td className="px-4 py-4 hidden md:table-cell text-xs text-gray-500 dark:text-gray-400">
                          {new Date(c.appliedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${CAND_STATUS_COLORS[c.status]}`}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2 flex-wrap">
                            {c.status !== 'INTERVIEW' && c.status !== 'ACCEPTED' && c.status !== 'REJECTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-xs text-amber-600 border-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 gap-1"
                                onClick={() => moveToCandStatus(c.id, 'INTERVIEW')}
                              >
                                <Clock className="w-3 h-3" />
                                Interview
                              </Button>
                            )}
                            {c.status !== 'ACCEPTED' && c.status !== 'REJECTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-xs text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 gap-1"
                                onClick={() => moveToCandStatus(c.id, 'ACCEPTED')}
                              >
                                <CheckCircle className="w-3 h-3" />
                                Accept
                              </Button>
                            )}
                            {c.status !== 'REJECTED' && c.status !== 'ACCEPTED' && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 px-2.5 text-xs text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 gap-1"
                                onClick={() => moveToCandStatus(c.id, 'REJECTED')}
                              >
                                <XCircle className="w-3 h-3" />
                                Reject
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

