'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { MapPin, Calendar, Star, Bookmark, Video, Luggage, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ClientLayout } from '@/components/layout/client-layout';
import { useStore } from '@/lib/store';
import { MY_BOOKINGS, MY_APPLICATIONS } from '@/lib/mock-data';

const EQUIPMENT = [
  {
    id: 1,
    name: 'Coleman 4-Season Tent',
    category: 'Shelter',
    price: 420,
    suggestedPrice: 504,
    rating: 4.8,
    similarity: 0.92,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=70',
  },
  {
    id: 2,
    name: 'MSR Hubba Hubba Backpack',
    category: 'Gear',
    price: 285,
    suggestedPrice: 342,
    rating: 4.6,
    similarity: 0.78,
    image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=70',
  },
  {
    id: 3,
    name: 'BioLite Camp Stove',
    category: 'Cooking',
    price: 165,
    suggestedPrice: 198,
    rating: 4.5,
    similarity: 0.65,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=70',
  },
];

const ACTIVITY = [
  { icon: '🏕️', text: 'Booking confirmed — Sahara Oasis Glamping Tent', sub: 'Jul 20 – Jul 23, 2026', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: '💼', text: 'Interview scheduled — Event Coordinator at Sahara Oasis Camps', sub: 'Application status updated', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { icon: '📋', text: 'Application submitted — Wilderness Guide', sub: 'Mountain Masters TN · Jun 6, 2026', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { icon: '✅', text: 'Stay completed — Atlas Mountain Eco Lodge', sub: 'Apr 10 – Apr 13, 2026', color: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 18) return 'Afternoon';
  return 'Evening';
}

function AreaChartMock() {
  const pts = [40, 55, 35, 80, 60, 95];
  const max = 100;
  const w = 280, h = 120, pad = 12;
  const xStep = (w - pad * 2) / (pts.length - 1);
  const toY = (v: number) => h - pad - (v / max) * (h - pad * 2);
  const coords = pts.map((v, i) => [pad + i * xStep, toY(v)] as [number, number]);
  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ');
  const areaD = pathD + ` L${coords[coords.length - 1][0]},${h - pad} L${coords[0][0]},${h - pad} Z`;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: 120 }}>
      <defs>
        <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16a34a" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 25, 50, 75, 100].map(v => (
        <line key={v} x1={pad} x2={w - pad} y1={toY(v)} y2={toY(v)} stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
      ))}
      <path d={areaD} fill="url(#ag)" />
      <path d={pathD} fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {coords.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#16a34a" />
      ))}
      {months.map((m, i) => (
        <text key={m} x={pad + i * xStep} y={h - 1} textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.5">{m}</text>
      ))}
    </svg>
  );
}

function DonutChartMock() {
  const data = [
    { label: 'Interview', val: 1, color: '#2563eb' },
    { label: 'Reviewed', val: 1, color: '#d97706' },
    { label: 'Pending', val: 0, color: '#dc2626' },
  ];
  const total = data.reduce((s, d) => s + d.val, 0) || 1;
  const r = 40, cx = 55, cy = 55, stroke = 18;
  const circ = 2 * Math.PI * r;
  let offset = 0;
  const slices = data.filter(d => d.val > 0).map(d => {
    const frac = d.val / total;
    const dash = frac * circ;
    const slice = { ...d, dash, gap: circ - dash, offset };
    offset += dash;
    return slice;
  });
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 110 110" className="w-28 h-28 flex-shrink-0">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth={stroke} />
        {slices.map(s => (
          <circle key={s.label} cx={cx} cy={cy} r={r} fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${s.gap}`} strokeDashoffset={circ / 4 - s.offset}
            strokeLinecap="butt" />
        ))}
        <text x={cx} y={cy + 5} textAnchor="middle" fontSize="16" fontWeight="bold" fill="currentColor">{total}</text>
      </svg>
      <div className="space-y-2">
        {data.map(d => (
          <div key={d.label} className="flex items-center gap-2 text-xs">
            <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
            <span className="text-gray-500 dark:text-gray-400">{d.label}</span>
            <span className="font-bold text-gray-700 dark:text-gray-200">{d.val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ClientDashboard() {
  const user = useStore(s => s.user);
  const router = useRouter();

  if (!user) { router.push('/login'); return null; }

  const firstName = user.name.split(' ')[0];
  const upcoming = MY_BOOKINGS.find(b => b.status === 'CONFIRMED' || b.status === 'PENDING');
  const confirmedCount = MY_BOOKINGS.filter(b => b.status === 'CONFIRMED').length;
  const interviewCount = MY_APPLICATIONS.filter(a => a.status === 'INTERVIEW').length;
  const pendingApps = MY_APPLICATIONS.filter(a => a.status === 'PENDING').length;
  const upcomingDate = upcoming
    ? new Date(upcoming.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()
    : 'TBD';

  return (
    <ClientLayout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* ── Greeting ── */}
        <section>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">
            Good {getGreeting()}, {firstName}
          </p>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Your next <span className="text-emerald-600 dark:text-emerald-400">adventure</span> starts here.
          </h1>
        </section>

        {/* ── Hero upcoming trip card ── */}
        <section className="space-y-5">
          <div className="relative overflow-hidden rounded-3xl p-8 text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #059669 0%, #0d9488 50%, #0369a1 100%)' }}>
            {/* Decorative blob */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">⛰️</div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Upcoming Trip</p>
              <h2 className="text-2xl font-bold mb-5 max-w-sm leading-snug">
                {upcoming?.accommodationTitle ?? 'No upcoming trip yet — browse stays!'}
              </h2>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md py-2 px-4 rounded-xl w-fit">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-bold">{upcomingDate}</span>
              </div>
            </div>
          </div>

          {/* 4 metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Bookings', value: MY_BOOKINGS.length, sub: `${confirmedCount} confirmed`, icon: Luggage, color: 'text-emerald-600 dark:text-emerald-400', ring: 'ring-emerald-100 dark:ring-emerald-900/30' },
              { label: 'Applications', value: MY_APPLICATIONS.length, sub: `${pendingApps} pending`, icon: Briefcase, color: 'text-blue-600 dark:text-blue-400', ring: 'ring-blue-100 dark:ring-blue-900/30' },
              { label: 'Interviews', value: interviewCount, sub: 'scheduled', icon: Video, color: 'text-purple-600 dark:text-purple-400', ring: 'ring-purple-100 dark:ring-purple-900/30' },
              { label: 'Saved', value: 0, sub: 'accommodations', icon: Bookmark, color: 'text-amber-600 dark:text-amber-400', ring: 'ring-amber-100 dark:ring-amber-900/30' },
            ].map(({ label, value, sub, icon: Icon, color, ring }) => (
              <Card key={label} className="hover:shadow-md transition-shadow cursor-default">
                <CardContent className="pt-5 pb-4">
                  <div className={`inline-flex p-2.5 rounded-xl ring-2 ${ring} mb-3`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                  <p className={`text-3xl font-black mb-0.5 ${color}`}>{value}</p>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Recent Activity ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Recent Activity</h2>
            <button onClick={() => router.push('/accommodations')} className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline">
              View All →
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 divide-y divide-gray-50 dark:divide-gray-700 shadow-sm overflow-hidden">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/40 transition-colors">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0 ${a.color}`}>
                  {a.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 leading-snug">{a.text}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{a.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Charts ── */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">Booking Activity</h2>
            <p className="text-xs text-gray-400 mb-4">Your bookings over the last 6 months</p>
            <AreaChartMock />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6 shadow-sm">
            <h2 className="text-base font-bold text-gray-900 dark:text-white mb-0.5">Applications</h2>
            <p className="text-xs text-gray-400 mb-4">Status breakdown of your job applications</p>
            <DonutChartMock />
          </div>
        </section>

        {/* ── Equipment Recommendations ── */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🎒 Recommended For You</h2>
              <p className="text-sm text-gray-400 mt-1">Top-rated equipment based on your activity preferences</p>
            </div>
            <button className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline px-4 py-2 rounded hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
              Browse All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EQUIPMENT.map(item => {
              const matchLabel = item.similarity >= 0.8 ? 'High' : item.similarity >= 0.6 ? 'Good' : 'Low';
              const matchClass = item.similarity >= 0.8 ? 'bg-green-100 text-green-700' : item.similarity >= 0.6 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700';
              return (
                <div key={item.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all overflow-hidden cursor-pointer">
                  <div className="h-40 overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {item.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{item.price} TND</span>
                      <span className="text-sm text-gray-400 line-through">{item.suggestedPrice} TND</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(item.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 font-medium">{item.rating}/5.0</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1">
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all"
                          style={{ width: `${item.similarity * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${matchClass}`}>{matchLabel} Match</span>
                    </div>
                    <button className="w-full mt-1 px-4 py-2.5 rounded-xl font-bold text-sm text-white transition-all active:scale-95 hover:shadow-lg"
                      style={{ background: 'linear-gradient(to right, #059669, #0d9488)' }}>
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 p-5 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              <span className="font-bold">💡 Smart Recommendations:</span> These items are hand-picked based on trending rentals and perfect for your next adventure!
            </p>
          </div>
        </section>

        {/* ── Upcoming bookings (compact) ── */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">My Bookings</h2>
            <button onClick={() => router.push('/accommodations')} className="text-emerald-600 dark:text-emerald-400 font-bold text-sm hover:underline">
              Browse stays →
            </button>
          </div>
          <div className="space-y-3">
            {MY_BOOKINGS.map(b => {
              const badgeClass: Record<string, string> = {
                CONFIRMED: 'bg-emerald-100 text-emerald-700',
                PENDING: 'bg-amber-100 text-amber-700',
                COMPLETED: 'bg-gray-100 text-gray-600',
                CANCELLED: 'bg-red-100 text-red-600',
              };
              return (
                <div key={b.id} className="flex gap-4 items-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-16 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={b.image} alt={b.accommodationTitle} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white truncate">{b.accommodationTitle}</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(b.checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(b.checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <Badge className={`text-xs ${badgeClass[b.status]}`}>{b.status}</Badge>
                    <p className="text-sm font-black text-gray-900 dark:text-white mt-1">{b.total.toLocaleString()} TND</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Job Applications (compact) ── */}
        <section className="pb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Job Applications</h2>
            <button onClick={() => router.push('/jobs')} className="text-purple-600 dark:text-purple-400 font-bold text-sm hover:underline">
              Browse jobs →
            </button>
          </div>
          <div className="space-y-3">
            {MY_APPLICATIONS.map(app => {
              const appBadge: Record<string, string> = {
                PENDING: 'bg-gray-100 text-gray-600',
                REVIEWED: 'bg-blue-100 text-blue-700',
                INTERVIEW: 'bg-purple-100 text-purple-700',
                ACCEPTED: 'bg-emerald-100 text-emerald-700',
                REJECTED: 'bg-red-100 text-red-600',
              };
              return (
                <div key={app.id} className="flex gap-4 items-center p-4 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-lg flex-shrink-0">
                    💼
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{app.jobTitle}</p>
                    <p className="text-xs text-gray-400">{app.company}</p>
                  </div>
                  <Badge className={`text-xs ${appBadge[app.status]}`}>{app.status}</Badge>
                </div>
              );
            })}
          </div>
        </section>
      </div>

    </ClientLayout>
  );
}
