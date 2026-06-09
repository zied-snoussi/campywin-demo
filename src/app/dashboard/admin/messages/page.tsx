'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { ADMIN_CONVERSATIONS } from '@/lib/mock-data';
import { LayoutDashboard, Users, Building2, Tent, Package, Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings } from 'lucide-react';

const NAV = [
  { label: 'Overview',       href: '/dashboard/admin',               icon: LayoutDashboard },
  { label: 'Users',          href: '/dashboard/admin/users',         icon: Users },
  { label: 'Organizations',  href: '/dashboard/admin/organizations',  icon: Building2 },
  { label: 'Accommodations', href: '/dashboard/admin/accommodations', icon: Tent },
  { label: 'Inventory',      href: '/dashboard/admin/inventory',     icon: Package },
  { label: 'Job Offers',     href: '/dashboard/admin/jobs',          icon: Briefcase },
  { label: 'Content',        href: '/dashboard/admin/content',       icon: FileText },
  { label: 'Support',        href: '/dashboard/admin/support',       icon: LifeBuoy },
  { label: 'Analytics',      href: '/dashboard/admin/analytics',     icon: BarChart3 },
  { label: 'Messages',       href: '/dashboard/admin/messages',      icon: Mail },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

export default function AdminMessagesPage() {
  return (
    <DashboardLayout navItems={NAV} title="Admin">
      <MessagesUI conversations={ADMIN_CONVERSATIONS} title="Messagerie Admin" />
    </DashboardLayout>
  );
}
