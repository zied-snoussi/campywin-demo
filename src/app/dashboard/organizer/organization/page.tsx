'use client';
import { useState } from 'react';
import { Building2, MapPin, Globe, Mail, Phone, Users, Star, Edit2, Save, X, Calendar, CheckCircle, Clock } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { LayoutDashboard, Package, Briefcase, Car, BarChart3 } from 'lucide-react';

const NAV = [
  { label: 'Overview',       href: '/dashboard/organizer',               icon: LayoutDashboard },
  { label: 'My Events',      href: '/dashboard/organizer/events',        icon: Calendar,    section: 'Operations' },
  { label: 'Accommodations', href: '/dashboard/organizer/accommodations',icon: MapPin },
  { label: 'Job Offers',     href: '/dashboard/organizer/jobs',          icon: Briefcase },
  { label: 'Equipment',      href: '/dashboard/organizer/equipment',     icon: Package },
  { label: 'Transport',      href: '/dashboard/organizer/transport',     icon: Car },
  { label: 'Analytics',      href: '/dashboard/organizer/analytics',     icon: BarChart3,   section: 'Insights' },
  { label: 'Messages',       href: '/dashboard/organizer/messages',      icon: Mail,        section: 'Comms' },
];

const TEAM = [
  { name: 'Salma Trabelsi', role: 'Event Coordinator', avatar: 'S', status: 'Active' },
  { name: 'Yassine Mansour', role: 'Camp Manager', avatar: 'Y', status: 'Active' },
  { name: 'Rania Cherif', role: 'Logistics Lead', avatar: 'R', status: 'On Leave' },
  { name: 'Bilel Hamdi', role: 'Guide', avatar: 'B', status: 'Active' },
];

const REVIEWS = [
  { author: 'Mehdi K.', rating: 5, text: 'Absolutely magical Saharan experience. The glamping setup was luxurious yet authentic.', date: 'May 2026' },
  { author: 'Leila B.', rating: 5, text: 'Professional team, breathtaking location. Will definitely book again!', date: 'Apr 2026' },
  { author: 'Farouk M.', rating: 4, text: 'Great organization, beautiful spot. Food could be improved.', date: 'Mar 2026' },
];

export default function OrganizerOrganizationPage() {
  const [editing, setEditing] = useState(false);
  const [orgName, setOrgName] = useState('Sahara Oasis Camps');
  const [description, setDescription] = useState('Tunisia\'s leading glamping and outdoor adventure company. We specialize in immersive Saharan experiences, eco-lodging, and guided wilderness tours across southern and central Tunisia.');
  const [address, setAddress] = useState('Route de Douz, Kebili 4260, Tunisia');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout navItems={NAV} title="Organisateur">
      <div className="max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Organization</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your organization profile and team</p>
          </div>
          {!editing ? (
            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Edit2 className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
              <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-xl text-sm font-bold text-white transition-colors">
                <Save className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          )}
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <Save className="w-4 h-4" /> Organization saved successfully
          </div>
        )}

        {/* Org card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />
          <div className="px-6 pb-6">
            <div className="-mt-8 mb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white dark:border-gray-800">
                🏕️
              </div>
            </div>
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Organization Name</label>
                  <input value={orgName} onChange={e => setOrgName(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Description</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)} rows={4} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400 resize-none" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Address</label>
                  <input value={address} onChange={e => setAddress(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-white">{orgName}</h2>
                  <span className="flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full font-medium">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{description}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-500" /> {address}</span>
                  <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-blue-500" /> saharaoasiscamps.tn</span>
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4 text-purple-500" /> contact@saharaoasiscamps.tn</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-amber-500" /> +216 75 000 000</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Events',    value: '12', icon: '📅', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Team Members',    value: '4',  icon: '👥', color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Avg. Rating',     value: '4.8',icon: '⭐', color: 'text-amber-600 dark:text-amber-400' },
            { label: 'Total Bookings',  value: '148',icon: '🏕️', color: 'text-purple-600 dark:text-purple-400' },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <div className="text-2xl mb-1">{kpi.icon}</div>
              <p className={`text-2xl font-black ${kpi.color}`}>{kpi.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Team */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-500" /> Team
              </h3>
              <button className="text-xs text-purple-600 dark:text-purple-400 font-semibold hover:underline">+ Invite</button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {TEAM.map(member => (
                <div key={member.name} className="flex items-center gap-3 px-5 py-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{member.name}</p>
                    <p className="text-xs text-gray-400">{member.role}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1 ${member.status === 'Active' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {member.status === 'Active' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                    {member.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" /> Recent Reviews
              </h3>
              <span className="text-xs text-amber-600 font-semibold">4.8 avg</span>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-700">
              {REVIEWS.map(r => (
                <div key={r.author} className="px-5 py-4">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{r.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{r.text}</p>
                  <p className="text-xs text-gray-400 mt-1 font-medium">— {r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
