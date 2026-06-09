'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package,
  Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings,
  Shield, CheckCircle, AlertTriangle, Info, Save, Lock,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const NAV_ADMIN = [
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

const SECURITY_CHECKS = [
  { label: 'JWT Authentication', detail: 'HS256 / RS256 — 1h expiry', status: 'ACTIVE', ok: true },
  { label: 'Role-Based Access Control (RBAC)', detail: 'CLIENT / ORGANISATEUR / ADMIN', status: 'ACTIVE', ok: true },
  { label: 'Data Encryption (AES-256)', detail: 'At rest and in transit (TLS 1.3)', status: 'ACTIVE', ok: true },
  { label: 'Rate Limiting', detail: '100 req/min per IP · burst 200', status: 'ACTIVE', ok: true },
  { label: 'Audit Logging', detail: 'All admin actions logged with timestamp', status: 'ACTIVE', ok: true },
];

const SECURITY_EVENTS = [
  { event: 'Failed login attempt (5 times)', user: 'unknown@probe.io', time: '4 min ago', severity: 'MEDIUM', icon: AlertTriangle },
  { event: 'New admin account created', user: 'newadmin@campywin.tn', time: '2 hours ago', severity: 'INFO', icon: Info },
  { event: 'Suspicious bulk export requested', user: 'analyst@campywin.tn', time: '5 hours ago', severity: 'MEDIUM', icon: AlertTriangle },
  { event: 'Organizer account suspended', user: 'badactor@example.com', time: '1 day ago', severity: 'HIGH', icon: Shield },
  { event: 'Password reset by admin', user: 'user42@campywin.tn', time: '2 days ago', severity: 'INFO', icon: Info },
  { event: 'New API key generated', user: 'devops@campywin.tn', time: '3 days ago', severity: 'LOW', icon: Lock },
];

const SESSION_OPTIONS = [15, 30, 60, 120];

interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  maxBookingDays: number;
  commissionRate: number;
  maintenanceMode: boolean;
}

interface NotificationPrefs {
  newOrgRegistration: boolean;
  bookingDisputes: boolean;
  systemErrors: boolean;
}

function severityBadge(s: string) {
  const map: Record<string, string> = {
    HIGH:   'bg-red-100 text-red-600',
    MEDIUM: 'bg-amber-100 text-amber-700',
    LOW:    'bg-gray-100 text-gray-600',
    INFO:   'bg-blue-100 text-blue-600',
  };
  return <Badge variant="outline" className={`${map[s] ?? 'bg-gray-100 text-gray-500'} text-[10px] shrink-0`}>{s}</Badge>;
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${checked ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`}
      />
    </button>
  );
}

export default function AdminSettingsPage() {
  const [twoFA, setTwoFA] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState(30);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [platform, setPlatform] = useState<PlatformSettings>({
    platformName: 'CampyWin',
    supportEmail: 'support@campywin.tn',
    maxBookingDays: 90,
    commissionRate: 10,
    maintenanceMode: false,
  });

  const [notifications, setNotifications] = useState<NotificationPrefs>({
    newOrgRegistration: true,
    bookingDisputes: true,
    systemErrors: true,
  });

  function handleSave() {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  }

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Settings">
      <Tabs defaultValue="security">
        <TabsList className="mb-4">
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="settings">Platform Settings</TabsTrigger>
        </TabsList>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Security Checklist */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {SECURITY_CHECKS.map(({ label, detail, status, ok }) => (
                  <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50 gap-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{detail}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className={`${ok ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'} text-[10px] shrink-0`}>
                      {status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Security Settings */}
            <div className="space-y-4">
              {/* 2FA Toggle */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Lock className="w-5 h-5 text-purple-600" />
                    Two-Factor Authentication
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Require 2FA for all admin accounts</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Applies to all users with ADMIN role on next login</p>
                    </div>
                    <Toggle checked={twoFA} onChange={setTwoFA} />
                  </div>
                  <Badge variant="outline" className={`mt-3 text-xs ${twoFA ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                    {twoFA ? 'Enabled — admins must use authenticator app' : 'Disabled — reduced security posture'}
                  </Badge>
                </CardContent>
              </Card>

              {/* Session Timeout */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Session Timeout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Inactive sessions will be signed out after:</p>
                  <div className="flex gap-2 flex-wrap">
                    {SESSION_OPTIONS.map(mins => (
                      <button
                        key={mins}
                        onClick={() => setSessionTimeout(mins)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
                          sessionTimeout === mins
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                      >
                        {mins} min
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 mt-3">Currently set to <span className="font-semibold text-gray-600 dark:text-gray-300">{sessionTimeout} minutes</span></p>
                </CardContent>
              </Card>

              {/* Recent Security Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    Recent Security Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 max-h-64 overflow-y-auto">
                  {SECURITY_EVENTS.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg border border-gray-100 dark:border-gray-700">
                      <ev.icon className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 dark:text-white">{ev.event}</p>
                        <p className="text-[10px] text-gray-400">{ev.user} · {ev.time}</p>
                      </div>
                      {severityBadge(ev.severity)}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Platform Settings Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="platformName" className="text-sm">Platform Name</Label>
                  <Input
                    id="platformName"
                    value={platform.platformName}
                    onChange={e => setPlatform(p => ({ ...p, platformName: e.target.value }))}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="supportEmail" className="text-sm">Support Email</Label>
                  <Input
                    id="supportEmail"
                    type="email"
                    value={platform.supportEmail}
                    onChange={e => setPlatform(p => ({ ...p, supportEmail: e.target.value }))}
                    className="h-9 text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="maxBookingDays" className="text-sm">Max Booking Days Ahead</Label>
                    <Input
                      id="maxBookingDays"
                      type="number"
                      value={platform.maxBookingDays}
                      onChange={e => setPlatform(p => ({ ...p, maxBookingDays: Number(e.target.value) }))}
                      className="h-9 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="commissionRate" className="text-sm">Commission Rate (%)</Label>
                    <Input
                      id="commissionRate"
                      type="number"
                      value={platform.commissionRate}
                      min={0}
                      max={100}
                      onChange={e => setPlatform(p => ({ ...p, commissionRate: Number(e.target.value) }))}
                      className="h-9 text-sm"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Maintenance Mode</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Disables public access and shows maintenance page</p>
                  </div>
                  <Toggle checked={platform.maintenanceMode} onChange={v => setPlatform(p => ({ ...p, maintenanceMode: v }))} />
                </div>
                {platform.maintenanceMode && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 text-xs">
                    Warning: Platform is in maintenance mode — users cannot access the site
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Notification Preferences */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-600" />
                    Email Alert Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { key: 'newOrgRegistration' as const, label: 'New Organization Registration', desc: 'Alert when a new organizer signs up for review' },
                    { key: 'bookingDisputes' as const, label: 'Booking Disputes', desc: 'Notify on new dispute tickets requiring admin review' },
                    { key: 'systemErrors' as const, label: 'System Errors', desc: 'Receive alerts for critical platform errors (500, DB failures)' },
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{label}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{desc}</p>
                      </div>
                      <Toggle
                        checked={notifications[key]}
                        onChange={v => setNotifications(n => ({ ...n, [key]: v }))}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Save Button */}
              <div className="flex items-center gap-3">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-10"
                  onClick={handleSave}
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </Button>
                {saveSuccess && (
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 gap-1 text-sm py-1.5 px-3">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Settings saved successfully
                  </Badge>
                )}
              </div>

              {/* Info card */}
              <Card className="border-blue-100 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-900/10">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                      Changes to platform settings take effect immediately. Commission rate changes apply to new bookings only. Existing bookings retain the rate at time of booking.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
