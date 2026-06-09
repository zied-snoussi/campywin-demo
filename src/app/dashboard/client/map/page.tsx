'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Thermometer, Wind, Droplets, Star, CheckCircle, Calendar, Users, Minus, Plus } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { MapLoader } from '@/components/map/map-loader';
import { MAP_SPOTS, ACCOMMODATIONS, type Accommodation } from '@/lib/mock-data';
import Image from 'next/image';

const today = new Date().toISOString().split('T')[0];
const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const in3days = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0];

export default function MapPage() {
  const router = useRouter();
  const [bookTarget, setBookTarget] = useState<Accommodation | null>(null);
  const [booked, setBooked] = useState<string[]>([]);
  const [checkIn, setCheckIn] = useState(tomorrow);
  const [checkOut, setCheckOut] = useState(in3days);
  const [guests, setGuests] = useState(2);

  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));

  const weatherList = MAP_SPOTS.map(s => ({
    spot: s,
    acc: ACCOMMODATIONS.find(a => a.id === s.accommodationId)!,
  })).filter(x => x.acc);

  return (
    <ClientLayout>
      <div className="mb-5">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-500" /> Explore Spots
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Find and book camping spots — with real-time weather at each location</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* Map */}
        <div className="flex-1 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm" style={{ height: 560 }}>
          <MapLoader onBookClick={acc => setBookTarget(acc)} />
        </div>

        {/* Weather sidebar */}
        <div className="lg:w-72 space-y-3 overflow-y-auto" style={{ maxHeight: 560 }}>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Weather at Spots</p>
          {weatherList.map(({ spot, acc }) => (
            <button
              key={spot.id}
              onClick={() => setBookTarget(acc)}
              className="w-full text-left bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={acc.image} alt={acc.title} fill className="object-cover" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{acc.title}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {acc.location}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{spot.weather.icon}</span>
                  <div>
                    <p className="font-black text-gray-900 dark:text-white text-base">{spot.weather.temp}°C</p>
                    <p className="text-xs text-gray-400">{spot.weather.condition}</p>
                  </div>
                </div>
                <div className="text-right text-xs text-gray-400 space-y-0.5">
                  <p className="flex items-center gap-1 justify-end"><Droplets className="w-3 h-3" /> {spot.weather.humidity}%</p>
                  <p className="flex items-center gap-1 justify-end"><Wind className="w-3 h-3" /> {spot.weather.wind} km/h</p>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${spot.weather.temp < 25 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400' : spot.weather.temp < 33 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                  {spot.weather.temp < 25 ? '✅ Ideal' : spot.weather.temp < 33 ? '⚠️ Warm' : '🔥 Very Hot'}
                </span>
                <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{acc.price} TND/night</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Booking modal */}
      {bookTarget && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-4" onClick={() => setBookTarget(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="relative h-52">
              <Image src={bookTarget.image} alt={bookTarget.title} fill className="object-cover" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button onClick={() => setBookTarget(null)} className="absolute top-4 right-4 w-8 h-8 bg-black/40 rounded-full text-white hover:bg-black/60 transition-colors flex items-center justify-center text-sm">✕</button>
              <div className="absolute bottom-4 left-4 right-16">
                <p className="text-xs text-white/70 mb-1">{bookTarget.category}</p>
                <h2 className="text-xl font-black text-white leading-snug">{bookTarget.title}</h2>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Weather summary for this spot */}
              {(() => {
                const ws = MAP_SPOTS.find(s => s.accommodationId === bookTarget.id);
                return ws ? (
                  <div className="flex items-center gap-3 bg-sky-50 dark:bg-sky-900/20 border border-sky-100 dark:border-sky-800/30 rounded-xl p-3">
                    <span className="text-2xl">{ws.weather.icon}</span>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{ws.weather.temp}°C · {ws.weather.condition}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">at {bookTarget.location}</p>
                    </div>
                    <span className={`ml-auto text-xs px-2 py-0.5 rounded-full font-medium ${ws.weather.temp < 25 ? 'bg-emerald-100 text-emerald-700' : ws.weather.temp < 33 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600'}`}>
                      {ws.weather.temp < 25 ? 'Ideal' : ws.weather.temp < 33 ? 'Warm' : 'Very Hot'}
                    </span>
                  </div>
                ) : null;
              })()}

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5">
                {bookTarget.amenities.map(a => (
                  <span key={a} className="text-xs px-2.5 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> {a}
                  </span>
                ))}
              </div>

              {!booked.includes(bookTarget.id) && bookTarget.available && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Check-in</label>
                      <input type="date" value={checkIn} min={today} onChange={e => setCheckIn(e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1"><Calendar className="w-3 h-3" /> Check-out</label>
                      <input type="date" value={checkOut} min={checkIn} onChange={e => setCheckOut(e.target.value)}
                        className="w-full text-sm px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1"><Users className="w-3 h-3" /> Guests</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-bold w-4 text-center">{guests}</span>
                      <button onClick={() => setGuests(g => Math.min(bookTarget.capacity, g + 1))} className="w-7 h-7 rounded-full border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-3 space-y-1 text-sm">
                    <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>{bookTarget.price} TND × {nights} night{nights > 1 ? 's' : ''}</span><span>{(bookTarget.price * nights).toLocaleString()} TND</span></div>
                    <div className="flex justify-between text-gray-600 dark:text-gray-300"><span>Service fee (5%)</span><span>{Math.round(bookTarget.price * nights * 0.05).toLocaleString()} TND</span></div>
                    <div className="flex justify-between font-black text-gray-900 dark:text-white text-base pt-1 border-t border-gray-200 dark:border-gray-600"><span>Total</span><span className="text-emerald-600">{Math.round(bookTarget.price * nights * 1.05).toLocaleString()} TND</span></div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold">{bookTarget.rating}</span>
                    <span className="text-xs text-gray-400">({bookTarget.reviewCount})</span>
                  </div>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{bookTarget.price} <span className="text-sm font-semibold">TND</span><span className="text-xs text-gray-400 font-normal">/night</span></span>
                </div>
                {booked.includes(bookTarget.id) ? (
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-bold">Confirmed!</span>
                  </div>
                ) : (
                  <button
                    disabled={!bookTarget.available}
                    onClick={() => { setBooked(b => [...b, bookTarget.id]); setTimeout(() => { setBookTarget(null); router.push('/dashboard/client/bookings'); }, 1500); }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all active:scale-95"
                  >
                    {bookTarget.available ? `Book ${nights} Night${nights > 1 ? 's' : ''}` : 'Unavailable'}
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
