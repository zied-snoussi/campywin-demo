import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & description */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <Link href="/" className="inline-flex hover:opacity-80 transition-opacity">
                <Image src="/logo-campy-win-light.png" alt="CampyWin" width={48} height={48} className="object-contain" style={{ width: 48, height: 'auto' }} />
              </Link>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              CampyWin is your trusted platform for camping accommodations and recruitment opportunities across Tunisia.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-gray-400">
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> Tunis, Tunisia</span>
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-emerald-400" /> hello@campywin.tn</span>
              <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-emerald-400" /> +216 71 000 000</span>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {[['Camping Outposts', '/accommodations'], ['Events', '/events'], ['Career Opportunities', '/jobs']].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Organizers */}
          <div>
            <h3 className="text-white font-semibold mb-4">For Organizers</h3>
            <ul className="space-y-2">
              {[['List Your Property', '/login'], ['Create an Event', '/login'], ['Post a Job', '/login'], ['Organizer Dashboard', '/dashboard/organizer']].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Subscribe to our Newsletter</h3>
            <div className="flex mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-md focus:outline-none bg-white text-gray-900 text-sm"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-r-md hover:bg-emerald-700 transition-colors text-sm font-medium whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <h4 className="text-white font-semibold mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {[
                { label: 'Facebook', icon: 'f', href: '#' },
                { label: 'Instagram', icon: '📸', href: '#' },
                { label: 'LinkedIn', icon: 'in', href: '#' },
                { label: 'X', icon: 'X', href: '#' },
              ].map(({ label, icon, href }) => (
                <a key={label} href={href} className="w-9 h-9 rounded-full bg-gray-700 hover:bg-emerald-600 flex items-center justify-center text-sm font-bold text-white transition-colors" aria-label={label}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">© 2026 CampyWin. All rights reserved.</p>
          <div className="flex gap-6">
            {[['Privacy Policy', '/#privacy'], ['Terms of Service', '/#terms'], ['Cookies', '/#cookies']].map(([label, href]) => (
              <Link key={label} href={href} className="text-sm hover:text-white transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
