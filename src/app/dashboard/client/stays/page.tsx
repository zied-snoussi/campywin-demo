'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { MapPin, Star, Users, Search, SlidersHorizontal, CheckCircle, Heart, Calendar, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ClientLayout } from '@/components/layout/client-layout';
import { ACCOMMODATIONS } from '@/lib/mock-data';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const CATEGORIES = ['All', 'Glamping', 'Eco Lodge', 'Beach Camp', 'Safari'];
const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

export default function ClientStaysPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<string>('rating');
  const [liked, setLiked] = useState<string[]>([]);
  const [selected, setSelected] = useState<typeof ACCOMMODATIONS[0] | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]);
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => {
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000;
    return Math.max(1, diff);
  }, [checkIn, checkOut]);

  const filtered = ACCOMMODATIONS
    .filter(a => {
      const q = search.toLowerCase();
      return (category === 'All' || a.category === category) &&
        (a.title.toLowerCase().includes(q) || a.location.toLowerCase().includes(q));
    })
    .sort((a, b) => sort === 'price' ? a.price - b.price : b.rating - a.rating);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked(l => l.includes(id) ? l.filter(x => x !== id) : [...l, id]);
  };

  return (
    <ClientLayout>
      {/* Page heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white">Find Your Outpost</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Verified glamping tents, eco lodges, beach camps across Tunisia</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search by name or location…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={sort} onValueChange={(v: string | null) => setSort(v ?? 'rating')}>
          <SelectTrigger className="w-44">
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Top Rated</SelectItem>
            <SelectItem value="price">Lowest Price</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-5">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-5">{filtered.length} properties found</p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.map(acc => (
          <div key={acc.id} className="group cursor-pointer" onClick={() => setSelected(acc)}>
            <div className="relative h-56 rounded-2xl overflow-hidden mb-4 bg-gray-200 dark:bg-gray-700">
              <Image src={acc.image} alt={acc.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" unoptimized />
              <button
                onClick={e => toggleLike(acc.id, e)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition-transform z-10"
              >
                <Heart className={`w-4 h-4 ${liked.includes(acc.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              {!acc.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="secondary">Fully Booked</Badge>
                </div>
              )}
              <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 backdrop-blur text-xs">{acc.category}</Badge>
            </div>
            <div className="px-1">
              <div className="flex items-start justify-between mb-1 gap-2">
                <h3 className="font-bold text-gray-900 dark:text-white leading-snug">{acc.title}</h3>
                <div className="flex items-center gap-1 flex-shrink-0 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-lg">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{acc.rating}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                <MapPin className="w-3 h-3" /> {acc.location}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-600 dark:text-emerald-400">{acc.price} DT<span className="text-xs text-gray-400 font-normal">/night</span></span>
                <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <Users className="w-3 h-3" /> {acc.capacity}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          {selected && (
            <>
              <div className="relative h-56">
                <Image src={selected.image} alt={selected.title} fill className="object-cover" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-gray-700">{selected.category}</Badge>
              </div>
              <div className="p-6">
                <DialogHeader className="mb-4">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-xl font-black">{selected.title}</DialogTitle>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold">{selected.rating}</span>
                      <span className="text-sm text-gray-400">({selected.reviewCount})</span>
                    </div>
                  </div>
                  <p className="text-gray-500 flex items-center gap-1 text-sm"><MapPin className="w-3.5 h-3.5" /> {selected.location}, {selected.country}</p>
                </DialogHeader>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selected.amenities.map(a => (
                    <span key={a} className="flex items-center gap-1 text-xs px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle className="w-3 h-3" /> {a}
                    </span>
                  ))}
                </div>

                {!booked.includes(selected.id) && selected.available && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Check-in
                        </label>
                        <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Check-out
                        </label>
                        <input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)}
                          className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1">
                        <Users className="w-3 h-3" /> Guests
                      </label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold w-4 text-center">{guests}</span>
                        <button onClick={() => setGuests(g => Math.min(selected.capacity, g + 1))} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <Plus className="w-3 h-3" />
                        </button>
                        <span className="text-xs text-gray-400">max {selected.capacity}</span>
                      </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3 space-y-1">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>{selected.price} TND × {nights} night{nights > 1 ? 's' : ''}</span>
                        <span>{(selected.price * nights).toLocaleString()} TND</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span>Service fee (5%)</span>
                        <span>{Math.round(selected.price * nights * 0.05).toLocaleString()} TND</span>
                      </div>
                      <div className="flex justify-between font-black text-gray-900 dark:text-white text-base pt-1 border-t border-gray-200 dark:border-gray-600">
                        <span>Total</span>
                        <span className="text-emerald-600">{Math.round(selected.price * nights * 1.05).toLocaleString()} TND</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <div>
                    <span className="text-xl font-black text-emerald-600">{selected.price} <span className="text-sm font-semibold">TND</span></span>
                    <span className="text-sm text-gray-400">/night</span>
                  </div>
                  {booked.includes(selected.id) ? (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-emerald-600">Booking Confirmed!</span>
                    </div>
                  ) : (
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6" disabled={!selected.available}
                      onClick={() => setBooked(b => [...b, selected.id])}>
                      {selected.available ? `Book ${nights} Night${nights > 1 ? 's' : ''}` : 'Unavailable'}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ClientLayout>
  );
}
