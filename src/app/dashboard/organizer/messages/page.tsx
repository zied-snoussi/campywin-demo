'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { ORGANIZER_CONVERSATIONS } from '@/lib/mock-data';
import { LayoutDashboard, Calendar, MapPin, Briefcase, Package, Car, BarChart3, Mail, Building2, Newspaper } from 'lucide-react';

const NAV = [
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

export default function OrganizerMessagesPage() {
  return (
    <DashboardLayout navItems={NAV} title="Organisateur">
      <MessagesUI conversations={ORGANIZER_CONVERSATIONS} title="Messagerie" />
    </DashboardLayout>
  );
}
