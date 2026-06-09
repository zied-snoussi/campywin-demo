'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package, Briefcase,
  FileText, LifeBuoy, BarChart3, Mail, Settings,
  Plus, Edit2, Trash2, Eye, ToggleLeft, ToggleRight, Star, MapPin,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ACCOMMODATIONS } from '@/lib/mock-data';

const NAV_ADMIN = [
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
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

interface AccomType {
  id: string;
  emoji: string;
  name: string;
  description: string;
  count: number;
  color: string;
  bgColor: string;
}

const ACCOM_TYPES: AccomType[] = [
  { id: 't1', emoji: 'âœ¨', name: 'Glamping',     description: 'Luxury tents with premium amenities and comfort in nature.',          count: 12, color: 'text-purple-600 dark:text-purple-400', bgColor: 'bg-purple-50 dark:bg-purple-900/20' },
  { id: 't2', emoji: 'ðŸŒ¿', name: 'Eco Lodge',    description: 'Sustainable lodges built with eco-friendly materials and practices.',  count: 8,  color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { id: 't3', emoji: 'ðŸ–ï¸', name: 'Beach Camp',   description: 'Coastal camping spots with direct beach and sea access.',            count: 9,  color: 'text-cyan-600 dark:text-cyan-400', bgColor: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { id: 't4', emoji: 'ðŸ¦', name: 'Safari',       description: 'Desert and wildlife-focused guided camping experiences.',             count: 5,  color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-50 dark:bg-amber-900/20' },
  { id: 't5', emoji: 'ðŸŒ³', name: 'Treehouse',    description: 'Elevated stays in the forest canopy for a unique perspective.',       count: 3,  color: 'text-lime-600 dark:text-lime-400', bgColor: 'bg-lime-50 dark:bg-lime-900/20' },
  { id: 't6', emoji: 'ðŸœï¸', name: 'Desert Camp',  description: 'Traditional Berber-style camps under the stars in the Sahara.',     count: 7,  color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-50 dark:bg-orange-900/20' },
];

interface SpotState {
  id: string;
  active: boolean;
}

export default function AdminAccommodationsPage() {
  const [types, setTypes] = useState<AccomType[]>(ACCOM_TYPES);
  const [spotStates, setSpotStates] = useState<Record<string, boolean>>(
    Object.fromEntries(ACCOMMODATIONS.map(a => [a.id, a.available]))
  );

  const toggleSpot = (id: string) => {
    setSpotStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const deleteType = (id: string) => {
    setTypes(prev => prev.filter(t => t.id !== id));
  };

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Admin â€” Accommodations">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Accommodations</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage accommodation types and individual camping spots.</p>
        </div>
      </div>

      <Tabs defaultValue="types">
        <TabsList className="mb-6">
          <TabsTrigger value="types">Accommodation Types</TabsTrigger>
          <TabsTrigger value="spots">Camping Spots</TabsTrigger>
        </TabsList>

        {/* â”€â”€ Types tab â”€â”€ */}
        <TabsContent value="types">
          <div className="flex justify-end mb-4">
            <Button className="h-9 text-sm gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4" /> Add Type
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {types.map(type => (
              <Card key={type.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-2xl ${type.bgColor} flex items-center justify-center text-2xl`}>
                      {type.emoji}
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-400 hover:text-blue-600">
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        variant="ghost" size="sm"
                        onClick={() => deleteType(type.id)}
                        className="h-7 w-7 p-0 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-1">{type.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 leading-relaxed">{type.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold ${type.color}`}>
                      {type.count} {type.count === 1 ? 'property' : 'properties'}
                    </span>
                    <Badge variant="outline" className={`text-xs ${type.color} border-current`}>Active</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Add new card placeholder */}
            <button className="rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center p-8 text-gray-400 dark:text-gray-500 hover:border-emerald-400 hover:text-emerald-500 transition-all min-h-[180px]">
              <Plus className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Add New Type</span>
            </button>
          </div>
        </TabsContent>

        {/* â”€â”€ Spots tab â”€â”€ */}
        <TabsContent value="spots">
          <div className="flex justify-end mb-4">
            <Button className="h-9 text-sm gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <Plus className="w-4 h-4" /> Add Spot
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Name', 'Location', 'Category', 'Organizer', 'Price/Night', 'Rating', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {ACCOMMODATIONS.map(spot => {
                      const isActive = spotStates[spot.id] ?? spot.available;
                      return (
                        <tr
                          key={spot.id}
                          className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                        >
                          {/* Name */}
                          <td className="py-3 px-4">
                            <p className="font-semibold text-gray-900 dark:text-white max-w-[200px] truncate">{spot.title}</p>
                          </td>

                          {/* Location */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              <MapPin className="w-3 h-3 flex-shrink-0" /> {spot.location}
                            </div>
                          </td>

                          {/* Category */}
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="text-xs border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300 whitespace-nowrap">
                              {spot.category}
                            </Badge>
                          </td>

                          {/* Organizer */}
                          <td className="py-3 px-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            {spot.organizer}
                          </td>

                          {/* Price */}
                          <td className="py-3 px-4">
                            <span className="font-semibold text-gray-900 dark:text-white">{spot.price}</span>
                            <span className="text-xs text-gray-400 ml-0.5">TND</span>
                          </td>

                          {/* Rating */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{spot.rating}</span>
                            </div>
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={isActive
                                ? 'text-xs bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                                : 'text-xs bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}
                            >
                              {isActive ? 'Active' : 'Inactive'}
                            </Badge>
                          </td>

                          {/* Actions */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-blue-600" title="Edit">
                                <Edit2 className="w-3.5 h-3.5" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-indigo-600" title="View">
                                <Eye className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                variant="ghost" size="sm"
                                onClick={() => toggleSpot(spot.id)}
                                className={`h-7 w-7 p-0 ${isActive ? 'text-emerald-500 hover:text-gray-500' : 'text-gray-400 hover:text-emerald-500'}`}
                                title={isActive ? 'Deactivate' : 'Activate'}
                              >
                                {isActive
                                  ? <ToggleRight className="w-4 h-4" />
                                  : <ToggleLeft className="w-4 h-4" />}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

