'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { ADMIN_CONVERSATIONS } from '@/lib/mock-data';
import { Home, Users, Calendar, Settings, Shield, BarChart3, Mail } from 'lucide-react';

const NAV = [
  { label: 'Overview',          href: '/dashboard/admin',          icon: Home },
  { label: 'User Management',   href: '/dashboard/admin',          icon: Users },
  { label: 'Events Moderation', href: '/dashboard/admin',          icon: Calendar },
  { label: 'Analytics',         href: '/dashboard/admin',          icon: BarChart3 },
  { label: 'Messages',          href: '/dashboard/admin/messages', icon: Mail },
  { label: 'Security',          href: '/dashboard/admin',          icon: Shield },
  { label: 'Settings',          href: '/dashboard/admin',          icon: Settings },
];

export default function AdminMessagesPage() {
  return (
    <DashboardLayout navItems={NAV} title="Admin">
      <MessagesUI conversations={ADMIN_CONVERSATIONS} title="Messagerie Admin" />
    </DashboardLayout>
  );
}
