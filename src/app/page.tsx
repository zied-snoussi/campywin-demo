'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Users, Tent, Briefcase, ArrowRight, Globe, ArrowUpRight, Camera, Shield, Heart, ShoppingBag } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { MapLoader } from '@/components/map/map-loader';
import { ACCOMMODATIONS, EVENTS, PRODUCTS } from '@/lib/mock-data';

function MapTeaser() {
  return <MapLoader compact={true} />;
}

const STATS = [
  { value: '2,847', label: 'Active Users', icon: Users, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
  { value: '489', label: 'Verified Stays', icon: Tent, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { value: '98%', label: 'Satisfaction Rate', icon: Star, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  { value: '24/7', label: 'Global Support', icon: Shield, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-100 dark:bg-purple-900/30' },
];

const TESTIMONIALS = [
  { name: 'Lina Mrad', role: 'Adventure Traveler', text: 'CampyWin completely transformed how I discover camping experiences. The booking process is seamless and the spots are breathtaking!', rating: 5, avatar: 'LM' },
  { name: 'Karim Trabelsi', role: 'Camp Organizer', text: 'As an organizer, the platform gives me everything I need to manage events, bookings, and recruitment in one place.', rating: 5, avatar: 'KT' },
  { name: 'Sofia Amara', role: 'Weekend Camper', text: 'Found my dream desert glamping experience through CampyWin. The guides were professional and the views were unreal.', rating: 5, avatar: 'SA' },
];

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />

      {/* ── Hero ── */}
      <header className="relative min-h-screen flex items-center overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=1920&q=80"
            alt="Sahara desert at sunset"
            fill className="object-cover" priority unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/80 via-emerald-900/40 to-transparent dark:from-gray-950/90 dark:via-gray-900/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-6">
              Explore the Wild,<br />
              <span className="text-emerald-400">Find Your Win</span>
            </h1>
            <p className="text-xl text-emerald-50/80 mb-10 leading-relaxed">
              The premier digital outpost for camping adventures. Secure your stay or start your outdoor career in Tunisia's most breathtaking landscapes.
            </p>

            {/* Search bar */}
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-2 max-w-3xl">
              <div className="flex-1 flex items-center px-4 gap-3 dark:text-gray-300">
                <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <input
                  className="w-full bg-transparent text-gray-900 dark:text-white py-3 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none text-sm"
                  placeholder="Where to next? (Douz, Tabarka...)"
                />
              </div>
              <div className="hidden md:block w-px h-10 bg-gray-200 dark:bg-gray-600 self-center" />
              <div className="flex-1 flex items-center px-4 gap-3">
                <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                <select className="w-full bg-transparent text-gray-900 dark:text-white py-3 font-medium outline-none text-sm">
                  <option>Looking for Stays</option>
                  <option>Looking for Jobs</option>
                </select>
              </div>
              <button
                onClick={() => router.push('/accommodations')}
                className="bg-emerald-600 dark:bg-emerald-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 active:scale-95">
                <Search className="w-5 h-5" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Entry Cards (2-col) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-14 md:-mt-20 relative z-20 pb-12 sm:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* For Adventurers */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] transition-all duration-300 cursor-pointer" onClick={() => router.push('/accommodations')}>
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700">
              <div className="inline-flex w-fit mb-4 sm:mb-6">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Tent className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-emerald-950 dark:text-emerald-50 mb-2 sm:mb-3">For Adventurers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
                Discover off-grid sanctuaries with modern amenities. Book authentic camping stays in Tunisia's most spectacular locations.
              </p>
              <button className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-bold rounded-lg transition-all duration-300 group/btn hover:gap-4 active:scale-95 w-fit text-sm sm:text-base">
                Explore Stays <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* For Organizers */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-[2rem] transition-all duration-300 cursor-pointer" onClick={() => router.push('/dashboard/organizer')}>
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 lg:p-12 shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col border border-gray-100 dark:border-gray-700">
              <div className="inline-flex w-fit mb-4 sm:mb-6">
                <div className="w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Globe className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-purple-950 dark:text-purple-50 mb-2 sm:mb-3">For Organizers</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-5 sm:mb-8 text-sm sm:text-base lg:text-lg leading-relaxed flex-grow">
                Manage your property, reach travelers worldwide, and grow your outdoor business with professional tools.
              </p>
              <button className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-bold rounded-lg transition-all duration-300 group/btn hover:gap-4 active:scale-95 w-fit text-sm sm:text-base">
                List Your Property <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust & Stats ── */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Our platform connects adventurers and hosts across Tunisia, creating unforgettable experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map(({ value, label, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center border border-gray-100 dark:border-gray-700">
                <div className="flex justify-center mb-4">
                  <div className={`w-12 h-12 ${bg} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${color}`} />
                  </div>
                </div>
                <div className={`text-4xl md:text-5xl font-black mb-2 ${color}`}>{value}</div>
                <div className="text-gray-700 dark:text-gray-300 font-semibold text-sm md:text-base">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Outposts ── */}
      <section id="featured" className="py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-4">Verified Outposts</h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg">Hand-picked camping locations vetted for authenticity.</p>
            </div>
            <Link href="/accommodations" className="hidden md:flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-300 py-3 px-6 rounded-xl border-2 border-emerald-700/30 dark:border-emerald-500/30 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30 transition-all">
              View All <Globe className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ACCOMMODATIONS.slice(0, 3).map((acc) => (
              <Link href="/accommodations" key={acc.id} className="group cursor-pointer">
                <div className="relative h-80 rounded-[2rem] overflow-hidden mb-6 bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={acc.image} alt={acc.title} fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                  />
                </div>
                <div className="flex justify-between items-start px-1">
                  <div className="flex-1">
                    <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-1">{acc.title}</h4>
                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mb-4">
                      <MapPin className="w-4 h-4" />
                      {acc.location}
                    </div>
                    <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                      {acc.price} DT<span className="text-sm font-medium text-gray-600 dark:text-gray-400">/night</span>
                    </div>
                  </div>
                  <div className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 p-3 rounded-2xl group-hover:bg-emerald-600 dark:group-hover:bg-emerald-500 group-hover:text-white transition-colors flex-shrink-0 ml-4">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Career Wins (Bento Grid) ── */}
      <section id="careers" className="py-24 px-8 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-16">Career Wins</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Featured Job - Large Card */}
            <Link href="/jobs" className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-purple-600 to-purple-700 dark:from-purple-700 dark:to-purple-800 rounded-[2rem] p-10 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer">
              <div>
                <span className="bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 inline-block backdrop-blur-sm">🔥 HOT JOB</span>
                <h3 className="text-4xl font-black text-white mb-4 group-hover:-translate-y-1 transition-transform">Wilderness Operations Lead</h3>
                <p className="text-white/90 text-lg mb-8 leading-relaxed">Oversee high-altitude basecamps in the Atlas mountains. Requires 5+ years experience in extreme environments and logistics management.</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-2xl font-bold text-white">
                  2,400 – 3,200 <span className="text-sm font-normal text-white/70">TND/mo</span>
                </div>
                <button className="bg-white text-purple-700 px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-white/90 transition-all active:scale-95 hover:shadow-xl">
                  Apply Now
                </button>
              </div>
            </Link>

            {/* Card 2 */}
            <Link href="/jobs" className="md:col-span-2 bg-white dark:bg-gray-700 rounded-[2rem] p-8 flex items-center justify-between group cursor-pointer hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600 shadow-md">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/40 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                  <Camera className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">Content Creator</h4>
                  <p className="text-gray-600 dark:text-gray-400 font-medium">Social Media & Photography</p>
                </div>
              </div>
              <ArrowRight className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-2" />
            </Link>

            {/* Card 3 */}
            <Link href="/jobs" className="md:col-span-1 bg-white dark:bg-gray-700 rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600 shadow-md">
              <Globe className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Cultural Liaison</h4>
            </Link>

            {/* Card 4 */}
            <Link href="/jobs" className="md:col-span-1 bg-white dark:bg-gray-700 rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer hover:shadow-xl transition-all border border-gray-200 dark:border-gray-600 shadow-md">
              <Briefcase className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mb-4" />
              <h4 className="text-lg font-bold text-gray-900 dark:text-white">Elite Scout</h4>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-24 px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full mb-6 border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-xl">⭐</span>
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Adventurer Voices</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              What Our Community Says
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Real stories from remote workers, guides, and adventurers who've transformed their experience on CampyWin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="group bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-300 shadow-sm hover:shadow-xl">
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: rating }).map((_, i) => (
                    <span key={i} className="text-xl text-emerald-500">★</span>
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-8">&quot;{text}&quot;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {avatar}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{name}</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{role}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to share your adventure?
            </h3>
            <button
              onClick={() => router.push('/login')}
              className="bg-emerald-600 dark:bg-emerald-500 text-white px-12 py-5 rounded-xl font-bold shadow-xl hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-all active:scale-95 inline-flex items-center gap-3">
              <span>Join Our Community</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ── About Section ── */}
      <section id="about" className="py-24 px-8 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 rounded-full mb-6 border border-emerald-200 dark:border-emerald-800/50">
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">About Us</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              CampyWin is redefining adventure by connecting explorers with authentic experiences and empowering hosts across Tunisia.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=1200&q=80"
                alt="CampyWin Community" fill className="object-cover" unoptimized
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-black text-gray-900 dark:text-white">Built for Adventurers & Hosts</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                CampyWin was founded on a simple belief: everyone deserves access to authentic experiences in Tunisia's breathtaking locations. Whether you're a traveler seeking your next basecamp, a guide wanting to share your passion, or a property owner wanting to earn with purpose — CampyWin is your sanctuary.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Globe, title: 'Global Community', desc: 'Connect with like-minded adventurers across 150+ countries' },
                  { icon: Shield, title: 'Trust & Safety', desc: 'Verified listings and comprehensive safety measures protect our community' },
                  { icon: Heart, title: 'Purpose-Driven', desc: 'Supporting local Tunisian communities and sustainable tourism practices' },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white mb-0.5">{title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact stats */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-50/50 dark:from-emerald-900/20 dark:to-emerald-900/10 border border-emerald-200 dark:border-emerald-800/30 rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-8">Our Impact So Far</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[['150+', 'Countries'], ['50k+', 'Happy Travelers'], ['5k+', 'Host Partners'], ['TND 10M+', 'Shared Earnings']].map(([val, lbl]) => (
                <div key={lbl}>
                  <div className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mb-2">{val}</div>
                  <div className="text-gray-600 dark:text-gray-300 font-medium">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Map ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Explore the Map</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">Find Your Perfect Spot</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Browse camping locations across Tunisia with live weather data at each spot — then book instantly.</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700" style={{ height: 420 }}>
            <MapTeaser />
          </div>
          <div className="text-center mt-8">
            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg">
              <MapPin className="w-5 h-5" /> Open Full Map & Book
            </Link>
          </div>
        </div>
      </section>

      {/* ── Gear Shop Teaser ── */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-full mb-4">
                <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Gear Shop</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">Gear Up for Your Adventure</h2>
              <p className="text-gray-500 dark:text-gray-400">Top-rated equipment — delivered across Tunisia in TND</p>
            </div>
            <Link href="/login" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1 hidden sm:flex">
              Shop all gear <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.filter(p => p.badge === 'Best Seller' || p.badge === 'Top Rated').slice(0, 4).map(product => (
              <Link href="/login" key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xl transition-all overflow-hidden">
                <div className="relative h-44">
                  <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-bold text-white ${product.badge === 'Best Seller' ? 'bg-amber-500' : 'bg-emerald-500'}`}>{product.badge}</span>
                  )}
                </div>
                <div className="p-4 space-y-2">
                  <p className="text-xs text-gray-400 font-medium">{product.brand}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{product.price} <span className="text-xs font-semibold">TND</span></span>
                    {product.price < product.originalPrice && <span className="text-xs text-gray-400 line-through">{product.originalPrice} TND</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900/30">
              <ShoppingBag className="w-5 h-5" /> Browse Full Gear Shop
            </Link>
          </div>
        </div>
      </section>

      {/* ── Upcoming Events ── */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">Upcoming Adventures</h2>
              <p className="text-gray-500 dark:text-gray-400">Join curated outdoor events and workshops</p>
            </div>
            <Link href="/events" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              All events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {EVENTS.filter(e => e.status === 'UPCOMING').slice(0, 2).map((ev) => (
              <Link href="/events" key={ev.id} className="group flex gap-5 bg-white dark:bg-gray-700 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-600">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-medium">{ev.category}</span>
                    <span className="text-xs text-gray-400">{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-snug mb-1">{ev.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {ev.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm">{ev.price} TND/person</span>
                    <span className="text-xs text-gray-400">{ev.registered}/{ev.capacity} registered</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
