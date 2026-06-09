'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package, Building2, Newspaper,
  Car, BarChart3, Mail, Plus, ArrowRight, Check, X, Users, TrendingUp, DollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { TRANSPORT_OFFERS } from '@/lib/mock-data';

const NAV_ORG = [
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

type OfferStatus       = 'ACTIVE' | 'FULL' | 'CANCELLED';
type ReservationStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

interface ManagedOffer {
  id: string;
  from: string;
  to: string;
  date: string;
  time: string;
  vehicle: string;
  seatsTaken: number;
  seatsTotal: number;
  pricePerSeat: number;
  status: OfferStatus;
}

interface Reservation {
  id: string;
  passengerName: string;
  passengerInitial: string;
  from: string;
  to: string;
  date: string;
  seats: number;
  total: number;
  status: ReservationStatus;
}

const MY_OFFERS: ManagedOffer[] = TRANSPORT_OFFERS.slice(0, 4).map((o, i) => ({
  id: o.id,
  from: o.from,
  to: o.to,
  date: o.departureDate,
  time: o.departureTime,
  vehicle: o.car,
  seatsTaken: o.totalSeats - o.availableSeats,
  seatsTotal: o.totalSeats,
  pricePerSeat: o.pricePerSeat,
  status: (o.status === 'FULL' ? 'FULL' : i === 2 ? 'CANCELLED' : 'ACTIVE') as OfferStatus,
}));

const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 'r1', passengerName: 'Yassine Trabelsi',  passengerInitial: 'Y', from: 'Tunis â€” Bab Saadoun',    to: 'Douz',      date: '2026-06-15', seats: 2, total: 70,  status: 'CONFIRMED' },
  { id: 'r2', passengerName: 'Sarra Belhaj',       passengerInitial: 'S', from: 'Sfax â€” Hedi Chaker',     to: 'Douz',      date: '2026-06-15', seats: 1, total: 28,  status: 'PENDING'   },
  { id: 'r3', passengerName: 'Karim Bouzid',       passengerInitial: 'K', from: 'Tunis â€” Gare RoutiÃ¨re',  to: 'Ain Draham',date: '2026-06-14', seats: 2, total: 90,  status: 'CONFIRMED' },
  { id: 'r4', passengerName: 'Amira Saad',         passengerInitial: 'A', from: 'Tunis â€” La Marsa',       to: 'Tabarka',   date: '2026-06-16', seats: 1, total: 30,  status: 'PENDING'   },
  { id: 'r5', passengerName: 'Nour Khelifi',       passengerInitial: 'N', from: 'Tunis â€” Bab Saadoun',    to: 'Douz',      date: '2026-06-15', seats: 1, total: 35,  status: 'CANCELLED' },
];

const OFFER_STATUS_COLORS: Record<OfferStatus, string> = {
  ACTIVE:    'bg-emerald-100 text-emerald-700',
  FULL:      'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-600',
};

const RES_STATUS_COLORS: Record<ReservationStatus, string> = {
  PENDING:   'bg-amber-100 text-amber-700',
  CONFIRMED: 'bg-emerald-100 text-emerald-700',
  CANCELLED: 'bg-red-100 text-red-600',
};

const EMPTY_FORM = { from: '', to: '', date: '', time: '', seats: '', price: '', vehicle: '', notes: '' };

export default function TransportPage() {
  const [offers, setOffers]           = useState<ManagedOffer[]>(MY_OFFERS);
  const [reservations, setReservations] = useState<Reservation[]>(INITIAL_RESERVATIONS);
  const [showForm, setShowForm]         = useState(false);
  const [form, setForm]                 = useState(EMPTY_FORM);

  const stats = {
    active:      offers.filter(o => o.status === 'ACTIVE').length,
    totalRes:    reservations.length,
    passengers:  reservations.filter(r => r.status === 'CONFIRMED').reduce((s, r) => s + r.seats, 0),
    revenue:     reservations.filter(r => r.status === 'CONFIRMED').reduce((s, r) => s + r.total, 0),
  };

  function updateResStatus(id: string, status: ReservationStatus) {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  function handleAddOffer() {
    if (!form.from || !form.to || !form.date) return;
    const seats = parseInt(form.seats) || 4;
    const offer: ManagedOffer = {
      id: `new-${Date.now()}`,
      from: form.from,
      to: form.to,
      date: form.date,
      time: form.time || '08:00',
      vehicle: form.vehicle || 'Voiture personnelle',
      seatsTaken: 0,
      seatsTotal: seats,
      pricePerSeat: parseFloat(form.price) || 0,
      status: 'ACTIVE',
    };
    setOffers(prev => [...prev, offer]);
    setForm(EMPTY_FORM);
    setShowForm(false);
  }

  function cancelOffer(id: string) {
    setOffers(prev => prev.map(o => o.id === id ? { ...o, status: 'CANCELLED' } : o));
  }

  return (
    <DashboardLayout navItems={NAV_ORG} title="Transport">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Offres actives',        value: stats.active,     icon: Car,       color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20'       },
          { label: 'RÃ©servations totales',  value: stats.totalRes,   icon: Users,     color: 'text-purple-600',  bg: 'bg-purple-50 dark:bg-purple-900/20'   },
          { label: 'Passagers ce mois',     value: stats.passengers, icon: TrendingUp,color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Revenus (TND)',         value: stats.revenue,    icon: DollarSign,color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20'     },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className={`${bg} border-0`}>
            <CardContent className="pt-5 pb-4 flex items-start justify-between">
              <div>
                <p className={`text-3xl font-black ${color}`}>{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="offers">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="offers">Mes Offres de Transport</TabsTrigger>
            <TabsTrigger value="reservations">RÃ©servations reÃ§ues</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => setShowForm(v => !v)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
            size="sm"
          >
            <Plus className="w-4 h-4" /> Nouvelle Offre
          </Button>
        </div>

        {/* Inline form */}
        {showForm && (
          <Card className="mb-5 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10">
            <CardHeader>
              <CardTitle className="text-sm">Nouvelle offre de transport</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div>
                  <Label className="text-xs mb-1 block">DÃ©part (ville)</Label>
                  <Input placeholder="Ex: Tunis â€” La Marsa" value={form.from} onChange={e => setForm(p => ({ ...p, from: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Destination</Label>
                  <Input placeholder="Ex: Douz" value={form.to} onChange={e => setForm(p => ({ ...p, to: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Date</Label>
                  <Input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Heure</Label>
                  <Input type="time" value={form.time} onChange={e => setForm(p => ({ ...p, time: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Nombre de siÃ¨ges</Label>
                  <Input type="number" placeholder="4" value={form.seats} onChange={e => setForm(p => ({ ...p, seats: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Prix / siÃ¨ge (TND)</Label>
                  <Input type="number" placeholder="30" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">VÃ©hicule</Label>
                  <Input placeholder="Ex: Peugeot 308 Â· Blanc" value={form.vehicle} onChange={e => setForm(p => ({ ...p, vehicle: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Notes</Label>
                  <Input placeholder="Informations supplÃ©mentairesâ€¦" value={form.notes} onChange={e => setForm(p => ({ ...p, notes: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5" onClick={handleAddOffer}>
                  <Check className="w-3.5 h-3.5" /> Publier
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                  <X className="w-3.5 h-3.5 mr-1" /> Annuler
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Offers tab */}
        <TabsContent value="offers">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      {['Route', 'Date / Heure', 'VÃ©hicule', 'SiÃ¨ges', 'Prix / siÃ¨ge', 'Statut', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map(o => (
                      <tr key={o.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {o.from}
                            <ArrowRight className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                            {o.to}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{o.date} Â· {o.time}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{o.vehicle}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-gray-900 dark:text-white">{o.seatsTaken}</span>
                          <span className="text-gray-400">/{o.seatsTotal}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{o.pricePerSeat} TND</td>
                        <td className="px-4 py-3">
                          <Badge className={`${OFFER_STATUS_COLORS[o.status]} border-0 text-xs`} variant="outline">{o.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            <Button size="sm" variant="outline" className="h-7 text-xs">Edit</Button>
                            {o.status !== 'CANCELLED' && (
                              <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => cancelOffer(o.id)}>Cancel</Button>
                            )}
                            <Button size="sm" variant="outline" className="h-7 text-xs text-blue-600 border-blue-200 hover:bg-blue-50">Bookings</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {offers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-10 text-gray-400 text-sm">Aucune offre publiÃ©e.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reservations tab */}
        <TabsContent value="reservations">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      {['Passager', 'Route', 'Date', 'SiÃ¨ges', 'Total', 'Statut', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map(r => (
                      <tr key={r.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-400 to-indigo-500 text-white">{r.passengerInitial}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.passengerName}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                            {r.from} <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" /> {r.to}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{r.date}</td>
                        <td className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">{r.seats}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{r.total} TND</td>
                        <td className="px-4 py-3">
                          <Badge className={`${RES_STATUS_COLORS[r.status]} border-0 text-xs`} variant="outline">{r.status}</Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-1.5">
                            {r.status === 'PENDING' && (
                              <>
                                <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => updateResStatus(r.id, 'CONFIRMED')}>Confirm</Button>
                                <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateResStatus(r.id, 'CANCELLED')}>Cancel</Button>
                              </>
                            )}
                            {r.status !== 'PENDING' && (
                              <span className="text-xs text-gray-400 italic">{r.status === 'CONFIRMED' ? 'ConfirmÃ©e' : 'AnnulÃ©e'}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

