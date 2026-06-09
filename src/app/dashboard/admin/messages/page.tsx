'use client';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { MessagesUI } from '@/components/messages/messages-ui';
import { ADMIN_CONVERSATIONS } from '@/lib/mock-data';
import { LayoutDashboard, Users, Building2, Tent, Package, Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings, Newspaper } from 'lucide-react';

const NAV = [
  { label: 'Overview',       href: '/dashboard/admin',               icon: LayoutDashboard },
  { label: 'Users',          href: '/dashboard/admin/users',         icon: Users,       section: 'User Management' },
  { label: 'Organizations',  href: '/dashboard/admin/organizations', icon: Building2 },
  { label: 'Accommodations', href: '/dashboard/admin/accommodations',icon: Tent,        section: 'Platform' },
  { label: 'Inventory',      href: '/dashboard/admin/inventory',     icon: Package },
  { label: 'Job Offers',     href: '/dashboard/admin/jobs',          icon: Briefcase,   section: 'Recruitment' },
  { label: 'Content',        href: '/dashboard/admin/content',       icon: FileText,    section: 'Content' },
  { label: 'Support',        href: '/dashboard/admin/support',       icon: LifeBuoy,    section: 'Support' },
  { label: 'Analytics',      href: '/dashboard/admin/analytics',     icon: BarChart3,   section: 'Reports' },
  { label: 'Messages',       href: '/dashboard/admin/messages',      icon: Mail,        section: 'Comms' },
  { label: 'Newsletters',    href: '/dashboard/admin/newsletters',   icon: Newspaper },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

export default function AdminMessagesPage() {
  return (
    <DashboardLayout navItems={NAV} title="Admin">
      <MessagesUI conversations={ADMIN_CONVERSATIONS} title="Messagerie Admin" />
    </DashboardLayout>
  );
}
