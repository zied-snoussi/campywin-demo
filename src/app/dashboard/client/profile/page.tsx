'use client';
import { useState } from 'react';
import { Camera, Edit2, Save, X, MapPin, Mail, Calendar, Shield } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { useStore } from '@/lib/store';
import { DEMO_USERS } from '@/lib/mock-data';

const ROLE_LABELS: Record<string, string> = {
  CLIENT: 'Camper',
  ORGANISATEUR: 'Organizer',
  ADMIN: 'Admin',
};

const ROLE_COLORS: Record<string, string> = {
  CLIENT: 'from-emerald-500 to-teal-600',
  ORGANISATEUR: 'from-purple-500 to-indigo-600',
  ADMIN: 'from-blue-500 to-cyan-600',
};

export default function ProfilePage() {
  const storeUser = useStore(s => s.user);
  const user = storeUser ?? DEMO_USERS.CLIENT;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState('Passionate about outdoor adventures and sustainable travel across Tunisia. Always looking for the next great camping spot.');
  const [location, setLocation] = useState('Tunis, Tunisia');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  };

  const gradient = ROLE_COLORS[user.role] ?? 'from-emerald-500 to-teal-600';

  return (
    <ClientLayout>
      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage your account and preferences</p>
        </div>

        {saved && (
          <div className="mb-4 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-2xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-sm font-medium">
            <Save className="w-4 h-4" /> Profile updated successfully
          </div>
        )}

        {/* Avatar + header card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-5">
          <div className={`h-24 bg-gradient-to-r ${gradient}`} />
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black shadow-lg border-4 border-white dark:border-gray-800`}>
                  {user.name[0]}
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
                  <button onClick={handleSave} className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-xl text-sm font-bold text-white transition-colors">
                    <Save className="w-3.5 h-3.5" /> Save
                  </button>
                </div>
              )}
            </div>

            {editing ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Full Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Location</label>
                  <input value={location} onChange={e => setLocation(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Bio</label>
                  <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full text-sm bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-black text-gray-900 dark:text-white">{name}</h2>
                <div className="flex flex-wrap items-center gap-3 mt-1 mb-3 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {location}</span>
                  <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5" /> {user.email}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{bio}</p>
              </>
            )}
          </div>
        </div>

        {/* Account details */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-100 dark:divide-gray-700 mb-5">
          <div className="px-6 py-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Account Details</p>
          </div>
          {[
            { icon: Mail, label: 'Email', value: user.email },
            { icon: Shield, label: 'Role', value: ROLE_LABELS[user.role] ?? user.role },
            { icon: Calendar, label: 'Member Since', value: new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) },
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

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Bookings', value: '3', color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Applications', value: '4', color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Forum Posts', value: '12', color: 'text-blue-600 dark:text-blue-400' },
          ].map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Danger zone */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-red-100 dark:border-red-900/30 p-6">
          <h3 className="text-sm font-bold text-red-600 dark:text-red-400 mb-3">Danger Zone</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Delete Account</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
            </div>
            <button className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </ClientLayout>
  );
}
