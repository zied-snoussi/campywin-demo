'use client';
import { useState } from 'react';
import { Camera, Edit2, Save, X, MapPin, Mail, Calendar, Shield, Key, Bell, Globe } from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { useStore } from '@/lib/store';
import { LayoutDashboard, Users, Building2, Tent, Package, Briefcase, FileText, LifeBuoy, BarChart3, Settings, Newspaper } from 'lucide-react';

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
  { label: 'Newsletters',    href: '/dashboard/admin/newsletters',   icon: Newspaper },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

export default function AdminProfilePage() {
  const user = useStore(s => s.user);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? 'Platform Admin');
  const [phone, setPhone] = useState('+216 71 000 000');
  const [bio, setBio] = useState('Platform administrator for CampyWin — responsible for user moderation, content governance, and system configuration.');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardLayout navItems={NAV} title="Admin">
      <div className="max-w-2xl space-y-5">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your admin account details</p>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <Save className="w-4 h-4" /> Profile saved successfully
          </div>
        )}

        {/* Avatar + header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-cyan-600" />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white dark:border-gray-800">
                  {(user?.name ?? 'A')[0]}
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
                  <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-bold text-white transition-colors">
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              )}
            </div>
            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Phone</label>
                  <input value={phone} onChange={e => setPhone(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">{name}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-blue-500" /> Platform Admin</span>
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
            { icon: Mail,     label: 'Email',       value: user?.email ?? 'admin@campywin.tn' },
            { icon: Shield,   label: 'Role',        value: 'Platform Administrator' },
            { icon: Globe,    label: 'Access Level', value: 'Full Platform Access' },
            { icon: Calendar, label: 'Member Since', value: 'January 2024' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-gray-700 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gray-400" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
              </div>
              <span className="text-sm text-gray-900 dark:text-white font-semibold">{value}</span>
            </div>
          ))}
        </div>

        {/* Security */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700">
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Security</p>
          </div>
          {[
            { icon: Key,  label: 'Password',              action: 'Change',  note: 'Last changed 30 days ago' },
            { icon: Bell, label: 'Two-Factor Auth',        action: 'Enable',  note: 'Not enabled' },
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
              <button className="px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                {action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
