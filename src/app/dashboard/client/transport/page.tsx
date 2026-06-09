'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Car, Bus, Navigation, Users, Clock, Star, MapPin, Calendar, Plus,
  CheckCircle, X, ChevronRight, Zap, Filter, Search, ArrowRight,
  Package, UserCheck, BadgeCheck, AlertCircle,
} from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { TRANSPORT_OFFERS, MY_RIDES, type TransportOffer, type TransportType } from '@/lib/mock-data';

const TYPE_CONFIG: Record<TransportType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  Covoiturage: { icon: Car,        color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20',  label: 'Covoiturage' },
  Shuttle:     { icon: Bus,        color: 'text-blue-600 dark:text-blue-400',        bg: 'bg-blue-50 dark:bg-blue-900/20',        label: 'Navette' },
  Transfer:    { icon: Navigation, color: 'text-purple-600 dark:text-purple-400',    bg: 'bg-purple-50 dark:bg-purple-900/20',    label: 'Transfert' },
};

const STATUS_BADGE: Record<string, string> = {
  CONFIRMED:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  PENDING:    'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  COMPLETED:  'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400',
  CANCELLED:  'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
};

const DESTINATIONS = ['Toutes', 'Douz', 'Ain Draham', 'Tabarka', 'Matmata', 'Tozeur', 'Nabeul'];

const OFFER_FORM_DEFAULTS = {
  from: '', to: '', departureDate: '', departureTime: '07:00',
  totalSeats: '3', pricePerSeat: '', car: '', notes: '',
};

export default function TransportPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'find' | 'offer' | 'mine'>('find');
  const [destFilter, setDestFilter] = useState('Toutes');
  const [typeFilter, setTypeFilter] = useState<TransportType | 'All'>('All');
  const [search, setSearch] = useState('');
  const [bookTarget, setBookTarget] = useState<TransportOffer | null>(null);
  const [bookSeats, setBookSeats] = useState(1);
  const [booked, setBooked] = useState<string[]>([]);
  const [bookingDone, setBookingDone] = useState(false);

  const [offerForm, setOfferForm] = useState(OFFER_FORM_DEFAULTS);
  const [offerSubmitted, setOfferSubmitted] = useState(false);
  const [offerSubmitting, setOfferSubmitting] = useState(false);

  const filtered = useMemo(() => {
    return TRANSPORT_OFFERS.filter(o => {
      if (destFilter !== 'Toutes' && !o.destinationSpot.includes(destFilter)) return false;
      if (typeFilter !== 'All' && o.type !== typeFilter) return false;
      const q = search.toLowerCase();
      if (q && !o.from.toLowerCase().includes(q) && !o.to.toLowerCase().includes(q) && !o.driverName.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [destFilter, typeFilter, search]);

  const handleBook = () => {
    if (!bookTarget) return;
    setBookingDone(true);
    setTimeout(() => {
      setBooked(b => [...b, bookTarget.id]);
      setBookingDone(false);
      setBookTarget(null);
    }, 1600);
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOfferSubmitting(true);
    setTimeout(() => {
      setOfferSubmitting(false);
      setOfferSubmitted(true);
    }, 1400);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <ClientLayout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
          <Car className="w-6 h-6 text-emerald-500" /> Transport & Covoiturage
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Partagez ou réservez un trajet vers les spots de camping en Tunisie
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-6 w-fit">
        {([
          { key: 'find',  label: 'Trouver un trajet', icon: Search },
          { key: 'offer', label: 'Proposer',           icon: Plus },
          { key: 'mine',  label: 'Mes trajets',        icon: Package },
        ] as const).map(({ key, label, icon: Icon }) => (
          <button key={key} onClick={() => setTab(key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${tab === key ? 'bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-300 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'}`}
          >
            <Icon className="w-4 h-4" /> {label}
          </button>
        ))}
      </div>

      {/* ── FIND A RIDE ── */}
      {tab === 'find' && (
        <div>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Ville de départ, destination, conducteur…"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
            </div>
            <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as TransportType | 'All')}
              className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="All">Tous les types</option>
              <option value="Covoiturage">Covoiturage</option>
              <option value="Shuttle">Navette</option>
              <option value="Transfer">Transfert</option>
            </select>
          </div>

          {/* Destination pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5">
            {DESTINATIONS.map(d => (
              <button key={d} onClick={() => setDestFilter(d)}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${destFilter === d ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
                {d !== 'Toutes' && <MapPin className="w-3 h-3" />} {d}
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-400 mb-4">{filtered.length} trajet{filtered.length !== 1 ? 's' : ''} disponible{filtered.length !== 1 ? 's' : ''}</p>

          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Aucun trajet trouvé</p>
              <p className="text-sm mt-1">Essayez d&apos;autres filtres ou proposez votre propre trajet</p>
              <button onClick={() => setTab('offer')} className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-bold">
                Proposer un trajet →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(offer => {
                const cfg = TYPE_CONFIG[offer.type];
                const TypeIcon = cfg.icon;
                const isBooked = booked.includes(offer.id);
                const isFull = offer.status === 'FULL' || offer.availableSeats === 0;
                return (
                  <div key={offer.id}
                    className={`bg-white dark:bg-gray-800 rounded-2xl border transition-all ${isFull ? 'border-gray-100 dark:border-gray-700 opacity-70' : 'border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg'}`}>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                            <TypeIcon className={`w-5 h-5 ${cfg.color}`} />
                          </div>
                          <div>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                            <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {offer.driverRating} · {offer.driverName}
                            </p>
                          </div>
                        </div>
                        {isFull ? (
                          <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400 px-2.5 py-1 rounded-full font-bold flex-shrink-0">Complet</span>
                        ) : isBooked ? (
                          <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400 px-2.5 py-1 rounded-full font-bold flex items-center gap-1 flex-shrink-0">
                            <CheckCircle className="w-3 h-3" /> Réservé
                          </span>
                        ) : (
                          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0">{offer.pricePerSeat} TND<span className="text-xs font-normal text-gray-400">/siège</span></span>
                        )}
                      </div>

                      {/* Route */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 font-medium">Départ</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{offer.from}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div className="flex-1 min-w-0 text-right">
                          <p className="text-xs text-gray-400 font-medium">Destination</p>
                          <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{offer.to}</p>
                        </div>
                      </div>

                      {/* Info row */}
                      <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {offer.departureDate}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {offer.departureTime}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {offer.availableSeats}/{offer.totalSeats} places</span>
                        <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {offer.car}</span>
                      </div>

                      {/* Seats indicator */}
                      <div className="flex gap-1 mb-4">
                        {Array.from({ length: offer.totalSeats }).map((_, i) => (
                          <div key={i} className={`h-2 flex-1 rounded-full ${i < (offer.totalSeats - offer.availableSeats) ? 'bg-emerald-500' : 'bg-gray-100 dark:bg-gray-700'}`} />
                        ))}
                      </div>

                      {offer.notes && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-700/50 rounded-lg px-3 py-2 mb-4 italic">
                          &ldquo;{offer.notes}&rdquo;
                        </p>
                      )}

                      <button
                        disabled={isFull || isBooked}
                        onClick={() => { setBookTarget(offer); setBookSeats(1); }}
                        className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 ${
                          isBooked ? 'bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 cursor-default'
                          : isFull ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md'
                        }`}
                      >
                        {isBooked ? '✅ Trajet réservé' : isFull ? 'Complet' : 'Réserver une place'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── OFFER A RIDE ── */}
      {tab === 'offer' && (
        <div className="max-w-xl mx-auto">
          {offerSubmitted ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-10 text-center border border-gray-100 dark:border-gray-700 shadow-sm">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">Trajet publié !</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Votre offre de covoiturage est maintenant visible par tous les campeurs.</p>
              <div className="space-y-2">
                <button onClick={() => { setOfferSubmitted(false); setOfferForm(OFFER_FORM_DEFAULTS); }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all">
                  Publier un autre trajet
                </button>
                <button onClick={() => setTab('mine')}
                  className="w-full py-3 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all">
                  Voir mes trajets
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-5 text-white">
                <h2 className="text-lg font-black flex items-center gap-2"><Car className="w-5 h-5" /> Proposer un covoiturage</h2>
                <p className="text-sm opacity-80 mt-0.5">Rentabilisez votre trajet et aidez d&apos;autres campeurs</p>
              </div>

              <form onSubmit={handleOfferSubmit} className="p-6 space-y-4">
                {/* From / To */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> Ville de départ *
                    </label>
                    <input required value={offerForm.from} onChange={e => setOfferForm(f => ({ ...f, from: e.target.value }))}
                      placeholder="ex: Tunis — Bab Saadoun"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-500" /> Destination *
                    </label>
                    <select required value={offerForm.to} onChange={e => setOfferForm(f => ({ ...f, to: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-emerald-400">
                      <option value="">Choisir un spot</option>
                      {['Douz', 'Ain Draham', 'Tabarka', 'Matmata', 'Tozeur', 'Nabeul'].map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Date / Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Date *
                    </label>
                    <input required type="date" min={today} value={offerForm.departureDate}
                      onChange={e => setOfferForm(f => ({ ...f, departureDate: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Heure *
                    </label>
                    <input required type="time" value={offerForm.departureTime}
                      onChange={e => setOfferForm(f => ({ ...f, departureTime: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                </div>

                {/* Seats / Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      <Users className="w-3 h-3" /> Places offertes *
                    </label>
                    <select required value={offerForm.totalSeats} onChange={e => setOfferForm(f => ({ ...f, totalSeats: e.target.value }))}
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-emerald-400">
                      {[1,2,3,4,5,6,7].map(n => <option key={n} value={n}>{n} place{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                      Prix / siège (TND) *
                    </label>
                    <input required type="number" min="0" step="1" value={offerForm.pricePerSeat}
                      onChange={e => setOfferForm(f => ({ ...f, pricePerSeat: e.target.value }))}
                      placeholder="ex: 35"
                      className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                </div>

                {/* Car */}
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                    <Car className="w-3 h-3" /> Véhicule *
                  </label>
                  <input required value={offerForm.car} onChange={e => setOfferForm(f => ({ ...f, car: e.target.value }))}
                    placeholder="ex: Peugeot 308 · Blanc"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1.5 block">Notes (optionnel)</label>
                  <textarea rows={3} value={offerForm.notes} onChange={e => setOfferForm(f => ({ ...f, notes: e.target.value }))}
                    placeholder="Arrêts possibles, règles du véhicule, équipement accepté…"
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                </div>

                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-3 text-xs text-amber-700 dark:text-amber-400">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>En publiant ce trajet, vous acceptez de respecter le code de conduite CampyWin et d&apos;informer vos passagers de tout changement.</p>
                </div>

                <button type="submit" disabled={offerSubmitting}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white font-black rounded-xl transition-all active:scale-95 shadow-md text-sm flex items-center justify-center gap-2">
                  {offerSubmitting ? (
                    <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Publication…</>
                  ) : (
                    <><Zap className="w-4 h-4" /> Publier le trajet</>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* ── MY RIDES ── */}
      {tab === 'mine' && (
        <div className="space-y-4">
          {MY_RIDES.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-semibold">Aucun trajet pour l&apos;instant</p>
              <button onClick={() => setTab('find')} className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 hover:underline font-bold">
                Trouver un trajet →
              </button>
            </div>
          ) : MY_RIDES.map(ride => {
            const cfg = TYPE_CONFIG[ride.offer.type];
            const TypeIcon = cfg.icon;
            return (
              <div key={ride.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
                      <TypeIcon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${cfg.bg} ${cfg.color}`}>{cfg.label}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${STATUS_BADGE[ride.status]}`}>{ride.status}</span>
                        {ride.role === 'driver' && (
                          <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3" /> Conducteur
                          </span>
                        )}
                        {ride.role === 'passenger' && (
                          <span className="text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <UserCheck className="w-3 h-3" /> Passager
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{ride.offer.driverName}</p>
                    </div>
                  </div>
                  {ride.role === 'passenger' && ride.totalPaid > 0 && (
                    <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 flex-shrink-0">{ride.totalPaid} TND</span>
                  )}
                </div>

                {/* Route */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400">Départ</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{ride.offer.from}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <div className="flex-1 min-w-0 text-right">
                    <p className="text-xs text-gray-400">Destination</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{ride.offer.to}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {ride.offer.departureDate}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {ride.offer.departureTime}</span>
                  {ride.role === 'passenger' && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ride.seats} siège{ride.seats > 1 ? 's' : ''} réservé{ride.seats > 1 ? 's' : ''}</span>}
                  {ride.role === 'driver' && <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {ride.offer.availableSeats}/{ride.offer.totalSeats} places restantes</span>}
                  <span className="flex items-center gap-1"><Car className="w-3.5 h-3.5" /> {ride.offer.car}</span>
                </div>

                <p className="text-xs text-gray-400">Réservé le {ride.bookedAt}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Booking Modal ── */}
      {bookTarget && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-end sm:items-center justify-center p-4" onClick={() => setBookTarget(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            {bookingDone ? (
              <div className="p-10 text-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-xl font-black text-gray-900 dark:text-white mb-1">Réservation confirmée !</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Votre place est réservée pour le trajet vers <strong>{bookTarget.to}</strong>.</p>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4 text-white flex items-center justify-between">
                  <div>
                    <h2 className="font-black text-lg">Réserver un trajet</h2>
                    <p className="text-sm opacity-80">{bookTarget.from} → {bookTarget.to}</p>
                  </div>
                  <button onClick={() => setBookTarget(null)} className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 space-y-4">
                  {/* Driver info */}
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {bookTarget.driverName[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{bookTarget.driverName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{bookTarget.driverRating} · {bookTarget.car}</span>
                      </div>
                    </div>
                    <BadgeCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Date & Heure</p>
                      <p className="font-bold text-gray-900 dark:text-white">{bookTarget.departureDate}</p>
                      <p className="text-emerald-600 dark:text-emerald-400 font-semibold">{bookTarget.departureTime}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-xs text-gray-400 mb-0.5">Places dispo</p>
                      <p className="font-black text-gray-900 dark:text-white text-lg">{bookTarget.availableSeats}</p>
                      <p className="text-xs text-gray-400">sur {bookTarget.totalSeats} total</p>
                    </div>
                  </div>

                  {/* Seats selector */}
                  <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Nombre de places</p>
                      <p className="text-xs text-gray-400">{bookTarget.pricePerSeat} TND / siège</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setBookSeats(s => Math.max(1, s - 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-bold text-gray-700 dark:text-gray-300">−</button>
                      <span className="text-lg font-black w-6 text-center text-gray-900 dark:text-white">{bookSeats}</span>
                      <button onClick={() => setBookSeats(s => Math.min(bookTarget.availableSeats, s + 1))}
                        className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-bold text-gray-700 dark:text-gray-300">+</button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center text-sm border-t border-gray-100 dark:border-gray-700 pt-3">
                    <span className="font-semibold text-gray-600 dark:text-gray-300">{bookSeats} siège{bookSeats > 1 ? 's' : ''} × {bookTarget.pricePerSeat} TND</span>
                    <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{(bookSeats * bookTarget.pricePerSeat).toLocaleString()} TND</span>
                  </div>

                  <button onClick={handleBook}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-md">
                    Confirmer la réservation
                  </button>
                  <p className="text-xs text-center text-gray-400">Annulation gratuite jusqu&apos;à 24h avant le départ</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
