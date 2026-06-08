'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Tent, Users, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import type { Role } from '@/lib/mock-data';

const DEMO_ROLES: { role: Role; label: string; desc: string; icon: React.ElementType; color: string; bg: string; dash: string }[] = [
  { role: 'CLIENT', label: 'Adventurer (Client)', desc: 'Browse stays, book events, apply for jobs', icon: Tent, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800', dash: '/dashboard/client' },
  { role: 'ORGANISATEUR', label: 'Camp Organizer', desc: 'Manage events, stays, equipment & hiring', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800', dash: '/dashboard/organizer' },
  { role: 'ADMIN', label: 'Platform Admin', desc: 'Full control — users, analytics, moderation', icon: LayoutDashboard, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800', dash: '/dashboard/admin' },
];

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);

  const handleLogin = (role: Role, dash: string) => {
    login(role);
    router.push(dash);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=1200&q=80" alt="Camping" fill className="object-cover" unoptimized />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/80 to-gray-900/60" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <Image src="/logo-campy-win-light.png" alt="CampyWin" width={48} height={48} className="object-contain" />
            <span className="text-2xl font-black tracking-tight">Campy<span className="text-emerald-400">Win</span></span>
          </div>
          <h2 className="text-4xl font-black mb-4 leading-tight">Your Adventure<br />Awaits Outside</h2>
          <p className="text-emerald-100/80 text-lg">Join thousands exploring Tunisia's breathtaking landscapes, from Sahara dunes to Mediterranean coasts.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <Image src="/logo-campy-win-green-realistic.png" alt="CampyWin" width={40} height={40} className="object-contain" />
            <span className="text-xl font-black text-emerald-900 dark:text-emerald-50">Campy<span className="text-emerald-600">Win</span></span>
          </div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white mb-2">Welcome back</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            This is a <span className="font-semibold text-emerald-600">demo app</span>. Pick a role to explore the platform:
          </p>

          <div className="space-y-3 mb-8">
            {DEMO_ROLES.map(({ role, label, desc, icon: Icon, color, bg, dash }) => (
              <button
                key={role}
                onClick={() => handleLogin(role, dash)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 ${bg} hover:shadow-md transition-all duration-200 text-left group`}
              >
                <div className={`w-11 h-11 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{label}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <p className="font-medium mb-1">Demo Mode Active</p>
            <p>No real authentication required. All data is mocked for demonstration.</p>
          </div>

          <Button variant="ghost" className="w-full mt-4 text-gray-500" onClick={() => router.push('/')}>
            Back to home
          </Button>
        </div>
      </div>
    </div>
  );
}
