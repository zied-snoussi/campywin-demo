import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image src="/logo-campy-win-light.png" alt="CampyWin" width={36} height={36} className="object-contain" style={{ width: 36, height: 'auto' }} />
              <span className="text-xl font-black tracking-tight">
                Campy<span className="text-emerald-400">Win</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Tunisia's premier platform for camping experiences, outdoor events, and adventure careers.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" /> Tunis, Tunisia</span>
              <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-emerald-400" /> hello@campywin.tn</span>
              <span className="flex items-center gap-2"><Phone className="w-4 h-4 text-emerald-400" /> +216 71 000 000</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[['Camping Stays', '/accommodations'], ['Events', '/events'], ['Job Opportunities', '/jobs']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-emerald-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">For Organizers</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[['List Your Property', '/login'], ['Create an Event', '/login'], ['Post a Job', '/login'], ['Organizer Dashboard', '/dashboard/organizer']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-emerald-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              {[
                ['About Us', '/#about'],
                ['Contact', 'mailto:hello@campywin.tn'],
                ['Privacy Policy', '/#privacy'],
                ['Terms of Service', '/#terms'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="hover:text-emerald-400 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 CampyWin. All rights reserved.</p>
          <p className="text-xs">Built with Next.js 16 · Tailwind CSS · shadcn/ui · Demo Mode</p>
        </div>
      </div>
    </footer>
  );
}
