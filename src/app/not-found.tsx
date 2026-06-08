'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Search, MapPin, Tent } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <Image
            src="https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=400&q=80"
            alt="Lost in the wild"
            fill
            className="object-cover rounded-2xl"
            unoptimized
          />
          <div className="absolute inset-0 bg-emerald-900/60 rounded-2xl flex items-center justify-center">
            <Tent className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-7xl font-black text-emerald-600 dark:text-emerald-400 mb-2">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">Lost in the Wild</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
          Looks like this trail doesn&apos;t exist. The page you&apos;re looking for may have moved or been removed.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
          <Link href="/accommodations" className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors">
            <Search className="w-4 h-4" /> Explore Stays
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-gray-400">
          <Link href="/events" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
            <MapPin className="w-3.5 h-3.5" /> Events
          </Link>
          <Link href="/jobs" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
            <MapPin className="w-3.5 h-3.5" /> Jobs
          </Link>
          <Link href="/login" className="hover:text-emerald-600 flex items-center gap-1 transition-colors">
            <MapPin className="w-3.5 h-3.5" /> Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
