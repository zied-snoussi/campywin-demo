'use client';
import { useState } from 'react';
import { Camera, Edit2, Save, X, MapPin, Mail, Calendar, Building2, Globe, Key, Bell, Users } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useStore } from '@/lib/store';
import { LayoutDashboard, Package, Briefcase, Car, BarChart3, Newspaper } from 'lucide-react';

const NAV = [
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

export default function OrganizerProfilePage() {
  const user = useStore(s => s.user);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? 'Camp Organizer');
  const [org, setOrg] = useState('Sahara Oasis Camps');
  const [phone, setPhone] = useState('+216 55 000 000');
  const [bio, setBio] = useState('Passionate outdoor experience organizer specializing in Saharan glamping, hiking, and nature immersion events across Tunisia.');
  const [website, setWebsite] = useState('https://saharaoasiscamps.tn');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout navItems={NAV} title="Organisateur">
      <div className="max-w-2xl space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your organizer account and public information</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <Save className="w-4 h-4" /> Profile saved successfully
          </div>
        )}

        {/* Avatar + header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-purple-600 to-indigo-600" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white dark:border-gray-800">
                  {(user?.name ?? 'O')[0]}
                </div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <Camera className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
              {!editing ? (
                <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
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
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Organization</label>
                  <input value={org} onChange={e => setOrg(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Phone</label>
                    <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Website</label>
                    <input value={website} onChange={e => setWebsite(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-400 resize-none" />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">{name}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5 text-purple-500" /> {org}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Tunis, Tunisia</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{bio}</p>
              </>
            )}
          </div>
        </div>

        {/* Account details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Account Details</p>
          </div>
          {[
            { icon: Mail,      label: 'Email',        value: user?.email ?? 'organizer@campywin.tn' },
            { icon: Building2, label: 'Organization', value: org },
            { icon: Globe,     label: 'Website',      value: website },
            { icon: Calendar,  label: 'Member Since', value: 'March 2024' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white font-semibold truncate max-w-[180px]">{value}</span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Events Hosted', value: '12', color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Bookings',      value: '148', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Job Offers',    value: '7', color: 'text-blue-600 dark:text-blue-400' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Security</p>
          </div>
          {[
            { icon: Key,   label: 'Password',        action: 'Change', note: 'Last changed 60 days ago' },
            { icon: Bell,  label: 'Notifications',   action: 'Manage', note: 'Email + Push enabled' },
          ].map(({ icon: Icon, label, action, note }) => (
            <div key={label} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-400">{note}</p>
                </div>
              </div>
              <button className="px-3 py-1.5 text-xs font-bold text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                {action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
