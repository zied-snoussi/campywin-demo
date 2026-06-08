'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Calendar, Users, Search, CheckCircle, Tag, X } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { EVENTS, type CampEvent } from '@/lib/mock-data';

const STATUS_CONFIG: Record<CampEvent['status'], { label: string; bg: string; text: string }> = {
  UPCOMING: { label: 'Upcoming', bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400' },
  ONGOING: { label: 'Live Now', bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400' },
  COMPLETED: { label: 'Completed', bg: 'bg-gray-100 dark:bg-gray-700', text: 'text-gray-500 dark:text-gray-400' },
  CANCELLED: { label: 'Cancelled', bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
};

const CATEGORIES = ['All', 'Astronomy', 'Hiking', 'Photography', 'Culinary', 'Festival'];

export default function ClientEventsPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState<CampEvent | null>(null);
  const [registered, setRegistered] = useState<string[]>([]);

  const filtered = EVENTS.filter(e => {
    const q = search.toLowerCase();
    return (category === 'All' || e.category === category || e.tags.includes(category)) &&
      (e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
  });

  const isSoldOut = (e: CampEvent) => e.registered >= e.capacity;

  return (
    <ClientLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Events & Experiences</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover festivals, treks, and outdoor experiences across Tunisia</p>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search events…"
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-5">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-5">{filtered.length} event{filtered.length !== 1 ? 's' : ''}</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(event => {
          const soldOut = isSoldOut(event);
          const pct = Math.round((event.registered / event.capacity) * 100);
          const cfg = STATUS_CONFIG[event.status];
          return (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
              onClick={() => setSelected(event)}
            >
              <div className="relative h-48">
                <Image src={event.image} alt={event.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                  {registered.includes(event.id) && (
                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-white/90 text-emerald-700"><CheckCircle className="w-3 h-3 inline mr-0.5" />Registered</span>
                  )}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-white leading-snug text-sm">{event.title}</h3>
                </div>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-emerald-500" />{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-500" />{event.location}</span>
                </div>

                {/* Capacity bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400 flex items-center gap-1"><Users className="w-3 h-3" /> {event.registered}/{event.capacity} registered</span>
                    <span className={`text-xs font-semibold ${soldOut ? 'text-red-500' : pct > 80 ? 'text-amber-500' : 'text-emerald-500'}`}>{soldOut ? 'Sold out' : `${pct}%`}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${soldOut ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(pct, 100)}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="font-black text-emerald-600 dark:text-emerald-400">{event.price > 0 ? `${event.price} TND` : 'Free'}</span>
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-56">
              <Image src={selected.image} alt={selected.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"><X className="w-4 h-4" /></button>
              <div className="absolute bottom-4 left-4 right-4">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text} mb-2 inline-block`}>{STATUS_CONFIG[selected.status].label}</span>
                <h2 className="text-xl font-black text-white">{selected.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">Start Date</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{new Date(selected.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-1">End Date</p>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{new Date(selected.endDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300 mb-5">
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-emerald-500" /> {selected.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-500" /> Organized by {selected.organizer}</span>
              </div>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{selected.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.tags.map(t => (
                  <span key={t} className="flex items-center gap-1 text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">
                    <Tag className="w-3 h-3" /> {t}
                  </span>
                ))}
              </div>

              {/* Capacity */}
              <div className="mb-5 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{selected.registered} / {selected.capacity} spots taken</span>
                  <span className={`text-sm font-bold ${isSoldOut(selected) ? 'text-red-500' : 'text-emerald-600'}`}>
                    {isSoldOut(selected) ? 'Sold Out' : `${selected.capacity - selected.registered} left`}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${isSoldOut(selected) ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(Math.round((selected.registered / selected.capacity) * 100), 100)}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Price per person</p>
                  <p className="font-black text-2xl text-emerald-600 dark:text-emerald-400">{selected.price > 0 ? `${selected.price} TND` : 'Free'}</p>
                </div>
                {registered.includes(selected.id) ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">You&apos;re registered!</span>
                  </div>
                ) : (
                  <button
                    disabled={isSoldOut(selected) || selected.status === 'COMPLETED' || selected.status === 'CANCELLED'}
                    onClick={() => setRegistered(r => [...r, selected.id])}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-95"
                  >
                    {isSoldOut(selected) ? 'Sold Out' : 'Register Now'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
