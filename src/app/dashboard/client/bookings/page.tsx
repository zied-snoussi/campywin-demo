'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Users, CheckCircle, Clock, XCircle, AlertCircle, X } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { MY_BOOKINGS, type Booking } from '@/lib/mock-data';

const STATUS_CONFIG: Record<Booking['status'], { label: string; icon: React.ElementType; bg: string; text: string }> = {
  CONFIRMED: { label: 'Confirmed', icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400' },
  PENDING: { label: 'Pending', icon: Clock, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400' },
  CANCELLED: { label: 'Cancelled', icon: XCircle, bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' },
  COMPLETED: { label: 'Completed', icon: AlertCircle, bg: 'bg-gray-50 dark:bg-gray-800', text: 'text-gray-500 dark:text-gray-400' },
};

function StatusBadge({ status }: { status: Booking['status'] }) {
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
      <Icon className="w-3 h-3" /> {cfg.label}
    </span>
  );
}

function nights(checkIn: string, checkOut: string) {
  return Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000);
}

export default function BookingsPage() {
  const [filter, setFilter] = useState<Booking['status'] | 'ALL'>('ALL');
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = MY_BOOKINGS.filter(b => filter === 'ALL' || b.status === filter);

  return (
    <ClientLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Bookings</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View and manage your camping stay reservations</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Upcoming', count: MY_BOOKINGS.filter(b => b.status === 'CONFIRMED').length, color: 'text-emerald-600 dark:text-emerald-400' },
          { label: 'Pending', count: MY_BOOKINGS.filter(b => b.status === 'PENDING').length, color: 'text-amber-600 dark:text-amber-400' },
          { label: 'Completed', count: MY_BOOKINGS.filter(b => b.status === 'COMPLETED').length, color: 'text-gray-600 dark:text-gray-300' },
          { label: 'Total', count: MY_BOOKINGS.length, color: 'text-gray-900 dark:text-white' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['ALL', 'CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {s === 'ALL' ? 'All' : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Bookings */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No bookings found</p>
          </div>
        ) : filtered.map(booking => (
          <div
            key={booking.id}
            className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all cursor-pointer"
            onClick={() => setSelected(booking)}
          >
            <div className="flex flex-col sm:flex-row">
              <div className="relative h-44 sm:h-auto sm:w-52 flex-shrink-0">
                <Image src={booking.image} alt={booking.accommodationTitle} fill className="object-cover" unoptimized />
              </div>
              <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white leading-snug">{booking.accommodationTitle}</h3>
                  <StatusBadge status={booking.status} />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {booking.location}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-emerald-500" />
                    {new Date(booking.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} → {new Date(booking.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-500" /> {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-xs text-gray-400">{nights(booking.checkIn, booking.checkOut)} nights total</p>
                    <p className="font-black text-emerald-600 dark:text-emerald-400 text-lg">{booking.total.toLocaleString()} <span className="text-sm font-semibold">TND</span></p>
                  </div>
                  {booking.status === 'CONFIRMED' && (
                    <button
                      onClick={e => { e.stopPropagation(); }}
                      className="px-4 py-2 border border-red-300 text-red-600 text-xs font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-48">
              <Image src={selected.image} alt={selected.accommodationTitle} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">{selected.accommodationTitle}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1"><MapPin className="w-3.5 h-3.5" /> {selected.location}</p>
                </div>
                <StatusBadge status={selected.status} />
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Check-in</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{new Date(selected.checkIn).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Check-out</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{new Date(selected.checkOut).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {selected.guests} guests</span>
                  <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {nights(selected.checkIn, selected.checkOut)} nights</span>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total paid</p>
                  <p className="font-black text-emerald-600 text-xl">{selected.total.toLocaleString()} <span className="text-sm">TND</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
