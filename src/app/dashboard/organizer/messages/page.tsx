'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { ORGANIZER_CONVERSATIONS } from '@/lib/mock-data';
import { Home, Calendar, MapPin, Briefcase, Package, BarChart3, Mail } from 'lucide-react';

const NAV = [
  { label: 'Overview',        href: '/dashboard/organizer',          icon: Home },
  { label: 'My Events',       href: '/dashboard/organizer',          icon: Calendar },
  { label: 'Accommodations',  href: '/dashboard/organizer',          icon: MapPin },
  { label: 'Job Offers',      href: '/dashboard/organizer',          icon: Briefcase },
  { label: 'Equipment',       href: '/dashboard/organizer',          icon: Package },
  { label: 'Messages',        href: '/dashboard/organizer/messages', icon: Mail },
  { label: 'Analytics',       href: '/dashboard/organizer',          icon: BarChart3 },
];

export default function OrganizerMessagesPage() {
  return (
    <DashboardLayout navItems={NAV} title="Organisateur">
      <MessagesUI conversations={ORGANIZER_CONVERSATIONS} title="Messagerie" />
    </DashboardLayout>
  );
}
