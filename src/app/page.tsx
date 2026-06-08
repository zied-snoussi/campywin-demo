'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Star, Users, Tent, Briefcase, ArrowRight, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ACCOMMODATIONS, EVENTS } from '@/lib/mock-data';

const STATS = [
  { value: '2,847', label: 'Active Users', icon: Users, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { value: '489', label: 'Verified Stays', icon: Tent, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
  { value: '312', label: 'Events Hosted', icon: Globe, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
  { value: '4.8★', label: 'Avg. Rating', icon: Star, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
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

      {/* Hero */}
      <header className="relative min-h-screen flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=1920&q=80"
            alt="Camping landscape"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/50 to-transparent dark:from-gray-950/90 dark:via-gray-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <Badge className="mb-6 bg-emerald-500/20 text-emerald-200 border-emerald-500/30 backdrop-blur-sm">
              🏕️ Tunisia&apos;s #1 Camping Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6">
              Explore the Wild,<br />
              <span className="text-emerald-400">Find Your Win</span>
            </h1>
            <p className="text-lg text-emerald-50/80 mb-10 leading-relaxed">
              Discover breathtaking camping stays, join unforgettable outdoor events, and launch your adventure career — all in one platform built for Tunisia.
            </p>

            {/* Search bar */}
            <div className="bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center px-4 gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <input
                  className="w-full bg-transparent text-gray-900 dark:text-white py-3 text-sm font-medium placeholder:text-gray-400 outline-none"
                  placeholder="Where to next? (Douz, Tabarka...)"
                />
              </div>
              <div className="hidden sm:block w-px h-10 bg-gray-200 dark:bg-gray-600 self-center" />
              <select className="flex-1 bg-transparent text-gray-900 dark:text-white py-3 px-4 text-sm font-medium outline-none">
                <option>Camping Stays</option>
                <option>Events</option>
                <option>Job Offers</option>
              </select>
              <Button onClick={() => router.push('/accommodations')} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl h-auto">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Entry cards */}
      <section className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Tent, title: 'For Adventurers', desc: 'Discover off-grid sanctuaries with modern amenities. Book authentic stays in spectacular locations.', cta: 'Explore Stays', href: '/accommodations', color: 'from-emerald-500 to-emerald-600', border: 'border-emerald-200 dark:border-emerald-800' },
            { icon: Globe, title: 'For Event Goers', desc: 'Join curated outdoor events — from desert stargazing to mountain treks and photography camps.', cta: 'Browse Events', href: '/events', color: 'from-blue-500 to-blue-600', border: 'border-blue-200 dark:border-blue-800' },
            { icon: Briefcase, title: 'For Job Seekers', desc: 'Launch your outdoor career. Find roles in event coordination, guiding, catering and more.', cta: 'Find Jobs', href: '/jobs', color: 'from-purple-500 to-purple-600', border: 'border-purple-200 dark:border-purple-800' },
          ].map(({ icon: Icon, title, desc, cta, href, color, border }) => (
            <div key={title} className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border ${border} group cursor-pointer`} onClick={() => router.push(href)}>
              <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white mb-5 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">{desc}</p>
              <Button variant="outline" className="gap-2 group-hover:gap-3 transition-all">
                {cta} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">Trusted by Travelers Worldwide</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Connecting adventurers and hosts across Tunisia, creating unforgettable outdoor experiences.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ value, label, icon: Icon, color, bg }) => (
              <div key={label} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center border border-gray-100 dark:border-gray-700">
                <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div className={`text-3xl font-black mb-1 ${color}`}>{value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">Explore Tunisia&apos;s Wild Regions</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">From the Sahara dunes to the Mediterranean coast — every region is an adventure</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { name: 'Douz', region: 'Sahara', image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=400&q=80', count: 48 },
            { name: 'Tabarka', region: 'Coast', image: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=400&q=80', count: 31 },
            { name: 'Ain Draham', region: 'Mountains', image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=400&q=80', count: 24 },
            { name: 'Tozeur', region: 'Oasis', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=400&q=80', count: 37 },
            { name: 'Matmata', region: 'Desert', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=400&q=80', count: 19 },
            { name: 'Nabeul', region: 'Cap Bon', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80', count: 42 },
          ].map(({ name, region, image, count }) => (
            <Link href="/accommodations" key={name} className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
              <Image src={image} alt={name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm leading-tight">{name}</p>
                <p className="text-white/70 text-xs">{region} · {count} stays</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Stays */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-2">Featured Outposts</h2>
              <p className="text-gray-500 dark:text-gray-400">Hand-picked camping experiences across Tunisia</p>
            </div>
            <Link href="/accommodations" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACCOMMODATIONS.slice(0, 3).map((acc) => (
              <Link href="/accommodations" key={acc.id} className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                <div className="relative h-52 overflow-hidden">
                  <Image src={acc.image} alt={acc.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
                  {!acc.available && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="secondary">Fully Booked</Badge>
                    </div>
                  )}
                  <Badge className="absolute top-3 left-3 bg-white/90 text-gray-700 hover:bg-white">{acc.category}</Badge>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-gray-900 dark:text-white leading-snug">{acc.title}</h3>
                    <div className="flex items-center gap-1 text-sm ml-2 flex-shrink-0">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{acc.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-3">
                    <MapPin className="w-3.5 h-3.5" /> {acc.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">{acc.price} <span className="text-sm font-semibold">TND</span></span>
                      <span className="text-xs text-gray-400">/night</span>
                    </div>
                    <span className="text-xs text-gray-400">{acc.reviewCount} reviews</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
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
              <Link href="/events" key={ev.id} className="group flex gap-5 bg-gray-50 dark:bg-gray-800 rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-gray-700">
                <div className="relative w-28 h-28 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={ev.image} alt={ev.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="outline" className="text-xs">{ev.category}</Badge>
                    <span className="text-xs text-gray-400">{new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white leading-snug mb-1">{ev.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {ev.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">{ev.price} TND</span>
                    <span className="text-xs text-gray-400">{ev.registered}/{ev.capacity} registered</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why CampyWin */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">Why CampyWin?</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">We built everything you need for the perfect outdoor experience</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Shield, title: 'Secure & Trusted', desc: 'All properties are verified. Payments are protected. Your adventure is safe with us.', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
            { icon: Zap, title: 'Instant Booking', desc: 'Book in seconds. Real-time availability, instant confirmation, and easy management.', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
            { icon: Globe, title: 'Local Expertise', desc: "Built specifically for Tunisia's unique outdoor landscape and cultural experience.", color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          ].map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="text-center p-8">
              <div className={`w-16 h-16 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-emerald-950 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black mb-3">Adventurers Love Us</h2>
            <p className="text-emerald-200/70 max-w-xl mx-auto">Real stories from our community of outdoor enthusiasts</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map(({ name, role, text, rating, avatar }) => (
              <div key={name} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-200 text-sm leading-relaxed mb-6">&quot;{text}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{name}</p>
                    <p className="text-emerald-300/70 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-emerald-600 dark:bg-emerald-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5">Ready for Your Next Adventure?</h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of adventurers discovering Tunisia&apos;s best camping destinations. Sign up free today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-gray-100 font-bold px-10 h-14 text-base" onClick={() => router.push('/login')}>
              Start Exploring
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-10 h-14 text-base" onClick={() => router.push('/accommodations')}>
              Browse Stays
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
