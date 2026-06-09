'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package,
  Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

type OfferStatus = 'ACTIVE' | 'CLOSED' | 'DRAFT';
type CandidatureStatus = 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';

interface JobOfferItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  type: string;
  salaryRange: string;
  applicants: number;
  status: OfferStatus;
}

interface Candidature {
  id: string;
  applicantName: string;
  appliedFor: string;
  appliedDate: string;
  status: CandidatureStatus;
}

const INITIAL_OFFERS: JobOfferItem[] = [
  { id: '1', title: 'Event Coordinator', organization: 'Sahara Oasis Camps', location: 'Douz, Tunisia', type: 'Seasonal', salaryRange: '1,200–1,800 TND/mo', applicants: 24, status: 'ACTIVE' },
  { id: '2', title: 'Camp Chef & Catering Lead', organization: 'Atlas Mountain Eco Lodge', location: 'Ain Draham, Tunisia', type: 'Full-time', salaryRange: '1,500–2,200 TND/mo', applicants: 11, status: 'ACTIVE' },
  { id: '3', title: 'Outdoor Activities Guide', organization: 'Desert Explorers', location: 'Matmata, Tunisia', type: 'Seasonal', salaryRange: '900–1,300 TND/mo', applicants: 37, status: 'ACTIVE' },
  { id: '4', title: 'Social Media Manager', organization: 'CoastalCamp TN', location: 'Tabarka, Tunisia', type: 'Part-time', salaryRange: '800–1,100 TND/mo', applicants: 19, status: 'CLOSED' },
  { id: '5', title: 'Safety & First Aid Officer', organization: 'Oasis Stays', location: 'Tozeur, Tunisia', type: 'Full-time', salaryRange: '1,800–2,500 TND/mo', applicants: 8, status: 'DRAFT' },
  { id: '6', title: 'Booking & Guest Relations', organization: 'CapBon Adventures', location: 'Nabeul, Tunisia', type: 'Full-time', salaryRange: '1,100–1,600 TND/mo', applicants: 15, status: 'ACTIVE' },
];

const INITIAL_CANDIDATURES: Candidature[] = [
  { id: '1', applicantName: 'Yasmine Gharbi', appliedFor: 'Event Coordinator', appliedDate: '2026-06-02', status: 'INTERVIEW' },
  { id: '2', applicantName: 'Bilel Mansouri', appliedFor: 'Camp Chef & Catering Lead', appliedDate: '2026-06-03', status: 'PENDING' },
  { id: '3', applicantName: 'Mariem Chtioui', appliedFor: 'Outdoor Activities Guide', appliedDate: '2026-06-01', status: 'REVIEWED' },
  { id: '4', applicantName: 'Rami Zghal', appliedFor: 'Event Coordinator', appliedDate: '2026-06-04', status: 'ACCEPTED' },
  { id: '5', applicantName: 'Houda Belhadj', appliedFor: 'Booking & Guest Relations', appliedDate: '2026-06-05', status: 'PENDING' },
  { id: '6', applicantName: 'Skander Ferchichi', appliedFor: 'Outdoor Activities Guide', appliedDate: '2026-05-30', status: 'REJECTED' },
  { id: '7', applicantName: 'Nadia Jebali', appliedFor: 'Social Media Manager', appliedDate: '2026-05-28', status: 'REVIEWED' },
  { id: '8', applicantName: 'Tarek Hamrouni', appliedFor: 'Safety & First Aid Officer', appliedDate: '2026-06-06', status: 'PENDING' },
];

function offerStatusBadge(status: OfferStatus) {
  const map: Record<OfferStatus, string> = {
    ACTIVE: 'bg-emerald-100 text-emerald-700',
    CLOSED: 'bg-gray-100 text-gray-600',
    DRAFT: 'bg-amber-100 text-amber-700',
  };
  return <Badge variant="outline" className={map[status]}>{status}</Badge>;
}

function candidatureStatusBadge(status: CandidatureStatus) {
  const map: Record<CandidatureStatus, string> = {
    PENDING:   'bg-gray-100 text-gray-600',
    REVIEWED:  'bg-blue-100 text-blue-700',
    INTERVIEW: 'bg-purple-100 text-purple-700',
    ACCEPTED:  'bg-emerald-100 text-emerald-700',
    REJECTED:  'bg-red-100 text-red-600',
  };
  return <Badge variant="outline" className={map[status]}>{status}</Badge>;
}

export default function AdminJobsPage() {
  const [offers, setOffers] = useState<JobOfferItem[]>(INITIAL_OFFERS);
  const [candidatures, setCandidatures] = useState<Candidature[]>(INITIAL_CANDIDATURES);

  const totalOffers = offers.length;
  const activeOffers = offers.filter(o => o.status === 'ACTIVE').length;
  const applicationsThisMonth = offers.reduce((s, o) => s + o.applicants, 0);
  const accepted = candidatures.filter(c => c.status === 'ACCEPTED').length;
  const acceptanceRate = candidatures.length ? Math.round((accepted / candidatures.length) * 100) : 0;

  function closeOffer(id: string) {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'CLOSED' } : o));
  }

  function updateCandidatureStatus(id: string, status: CandidatureStatus) {
    setCandidatures(prev => prev.map(c => c.id === id ? { ...c, status } : c));
  }

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Job Offers">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Offers', value: totalOffers, color: 'text-blue-600' },
          { label: 'Active', value: activeOffers, color: 'text-emerald-600' },
          { label: 'Applications This Month', value: applicationsThisMonth, color: 'text-purple-600' },
          { label: 'Acceptance Rate', value: `${acceptanceRate}%`, color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-5">
              <p className={`text-3xl font-black mb-1 ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="offers">
        <TabsList className="mb-4">
          <TabsTrigger value="offers">Job Offers</TabsTrigger>
          <TabsTrigger value="candidatures">Candidatures</TabsTrigger>
        </TabsList>

        {/* Job Offers Tab */}
        <TabsContent value="offers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Job Offers</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs">+ Post New Offer</Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Title', 'Organization', 'Location', 'Type', 'Salary Range', 'Applicants', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map(offer => (
                      <tr key={offer.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">{offer.title}</td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{offer.organization}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{offer.location}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{offer.type}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{offer.salaryRange}</td>
                        <td className="py-3 px-3 text-center font-semibold text-gray-700 dark:text-gray-300">{offer.applicants}</td>
                        <td className="py-3 px-3">{offerStatusBadge(offer.status)}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1 flex-wrap">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                            {offer.status !== 'CLOSED' && (
                              <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500" onClick={() => closeOffer(offer.id)}>Close</Button>
                            )}
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500">View Applicants</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Candidatures Tab */}
        <TabsContent value="candidatures">
          <Card>
            <CardHeader>
              <CardTitle>Candidatures</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Applicant', 'Applied For', 'Applied Date', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {candidatures.map(c => (
                      <tr key={c.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                              {c.applicantName[0]}
                            </div>
                            <span className="font-medium text-gray-900 dark:text-white">{c.applicantName}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{c.appliedFor}</td>
                        <td className="py-3 px-3 text-gray-500 dark:text-gray-400">{c.appliedDate}</td>
                        <td className="py-3 px-3">{candidatureStatusBadge(c.status)}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1 flex-wrap">
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500" onClick={() => updateCandidatureStatus(c.id, 'REVIEWED')}>Review</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-emerald-600" onClick={() => updateCandidatureStatus(c.id, 'ACCEPTED')}>Accept</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500" onClick={() => updateCandidatureStatus(c.id, 'REJECTED')}>Reject</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
