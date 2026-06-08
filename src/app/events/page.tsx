'use client';
import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Users, Calendar, Tag, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EVENTS } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const STATUS_COLORS: Record<string, string> = {
  UPCOMING: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  ONGOING: 'bg-blue-100 text-blue-700 border-blue-300',
  COMPLETED: 'bg-gray-100 text-gray-600 border-gray-300',
  CANCELLED: 'bg-red-100 text-red-600 border-red-300',
};

export default function EventsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState<typeof EVENTS[0] | null>(null);
  const [registered, setRegistered] = useState<string[]>([]);

  const categories = ['All', ...Array.from(new Set(EVENTS.map(e => e.category)))];

  const filtered = EVENTS.filter(e => {
    const q = search.toLowerCase();
    return (filter === 'All' || e.category === filter) &&
      (e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q));
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white pt-16 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-3">Outdoor Events & Adventures</h1>
          <p className="text-blue-200/80 text-lg max-w-xl">Discover and join curated camping events, workshops, and expeditions across Tunisia</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input className="pl-10" placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(ev => {
            const pct = Math.round((ev.registered / ev.capacity) * 100);
            return (
              <div
                key={ev.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 cursor-pointer"
                onClick={() => setSelected(ev)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className={STATUS_COLORS[ev.status]}>{ev.status}</Badge>
                    <Badge variant="secondary">{ev.category}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xl font-black">{ev.title}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {ev.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{ev.description}</p>
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ev.registered}/{ev.capacity} registered</span>
                      <span>{pct}% full</span>
                    </div>
                    <Progress value={pct} className="h-1.5" />
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
                    <div>
                      <span className="text-lg font-black text-blue-600 dark:text-blue-400">{ev.price} TND</span>
                      <span className="text-xs text-gray-400 ml-1">/person</span>
                    </div>
                    <div className="flex gap-2 flex-wrap justify-end">
                      {ev.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" />{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-xl p-0 overflow-hidden">
          {selected && (
            <>
              <div className="relative h-56">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className={STATUS_COLORS[selected.status]}>{selected.status}</Badge>
                </div>
              </div>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <DialogTitle className="text-xl font-black">{selected.title}</DialogTitle>
                  <p className="text-gray-500 text-sm flex items-center gap-1"><MapPin className="w-4 h-4" /> {selected.location}</p>
                </DialogHeader>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-5">{selected.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Start Date</p>
                    <p className="font-semibold">{new Date(selected.date).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">End Date</p>
                    <p className="font-semibold">{new Date(selected.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Capacity</p>
                    <p className="font-semibold">{selected.registered}/{selected.capacity}</p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Organizer</p>
                    <p className="font-semibold">{selected.organizer}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {selected.tags.map(t => (
                    <span key={t} className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full">{t}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-black text-blue-600">{selected.price} TND</span>
                    <span className="text-sm text-gray-400 ml-1">/person</span>
                  </div>
                  {registered.includes(selected.id) ? (
                    <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300 px-4 py-2">You&apos;re Registered!</Badge>
                  ) : (
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={selected.status === 'COMPLETED' || selected.status === 'CANCELLED' || selected.registered >= selected.capacity}
                      onClick={() => setRegistered(r => [...r, selected.id])}
                    >
                      Register Now
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
