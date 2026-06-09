'use client';
import { useState } from 'react';
import Image from 'next/image';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package, Car, BarChart3, Mail,
  Plus, Edit2, Eye, Star, Users, CheckCircle, XCircle, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { ACCOMMODATIONS, Accommodation } from '@/lib/mock-data';

const NAV_ORG = [
  { label: 'Overview',       href: '/dashboard/organizer',               icon: LayoutDashboard },
  { label: 'My Events',      href: '/dashboard/organizer/events',        icon: Calendar,    section: 'Operations' },
  { label: 'Accommodations', href: '/dashboard/organizer/accommodations',icon: MapPin },
  { label: 'Job Offers',     href: '/dashboard/organizer/jobs',          icon: Briefcase },
  { label: 'Equipment',      href: '/dashboard/organizer/equipment',     icon: Package },
  { label: 'Transport',      href: '/dashboard/organizer/transport',     icon: Car },
  { label: 'Analytics',      href: '/dashboard/organizer/analytics',     icon: BarChart3,   section: 'Insights' },
  { label: 'Messages',       href: '/dashboard/organizer/messages',      icon: Mail,        section: 'Comms' },
];

const CATEGORY_OPTIONS = ['Glamping', 'Eco Lodge', 'Beach Camp', 'Safari', 'Treehouse'];
const AMENITY_OPTIONS  = ['WiFi', 'Breakfast', 'Pool', 'Parking', 'Hiking', 'BBQ', 'AC'];

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80',
  'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80',
  'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
  'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
];

const EMPTY_FORM = {
  title: '',
  location: '',
  category: 'Glamping',
  price: '',
  capacity: '',
  amenities: [] as string[],
  description: '',
};

export default function ManageAccommodationsPage() {
  const [properties, setProperties] = useState<Accommodation[]>(
    ACCOMMODATIONS.map(a => ({ ...a }))
  );
  const [activeTab, setActiveTab] = useState('properties');
  const [form, setForm] = useState(EMPTY_FORM);

  const total     = properties.length;
  const available = properties.filter(p => p.available).length;
  const occupied  = properties.filter(p => !p.available).length;
  const avgRating = properties.length
    ? (properties.reduce((s, p) => s + p.rating, 0) / properties.length).toFixed(1)
    : '0.0';

  function toggleAvailable(id: string) {
    setProperties(prev => prev.map(p => p.id === id ? { ...p, available: !p.available } : p));
  }

  function toggleAmenity(amenity: string) {
    setForm(f => ({
      ...f,
      amenities: f.amenities.includes(amenity)
        ? f.amenities.filter(a => a !== amenity)
        : [...f.amenities, amenity],
    }));
  }

  function handleAdd() {
    if (!form.title.trim() || !form.location.trim()) return;
    const img = UNSPLASH_IMAGES[Math.floor(Math.random() * UNSPLASH_IMAGES.length)];
    const next: Accommodation = {
      id: String(Date.now()),
      title: form.title,
      location: form.location,
      country: 'Tunisia',
      price: Number(form.price) || 0,
      rating: 4.5,
      reviewCount: 0,
      image: img,
      category: form.category,
      amenities: form.amenities,
      capacity: Number(form.capacity) || 2,
      organizer: 'Ahmed Ben Ali',
      available: true,
    };
    setProperties(prev => [next, ...prev]);
    setForm(EMPTY_FORM);
    setActiveTab('properties');
  }

  return (
    <DashboardLayout navItems={NAV_ORG} title="Organizer â€” Accommodations">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Properties</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage your camping accommodations</p>
        </div>
        <Button
          onClick={() => setActiveTab('add')}
          className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Properties', value: total,     icon: MapPin,       color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Available',        value: available, icon: CheckCircle,  color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Occupied',         value: occupied,  icon: XCircle,      color: 'text-orange-600',  bg: 'bg-orange-50 dark:bg-orange-900/20' },
          { label: 'Avg Rating',       value: `${avgRating}â˜…`, icon: Star,  color: 'text-amber-600',   bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-5 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-black text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="properties">My Properties</TabsTrigger>
          <TabsTrigger value="add">Add New</TabsTrigger>
        </TabsList>

        {/* Properties tab */}
        <TabsContent value="properties">
          {properties.length === 0 ? (
            <div className="text-center py-20 text-gray-400 dark:text-gray-600">
              <MapPin className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="font-semibold">No properties yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {properties.map(prop => (
                <Card key={prop.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Image */}
                  <div className="relative h-44">
                    <Image
                      src={prop.image}
                      alt={prop.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/90 text-gray-700">
                      {prop.category}
                    </span>
                    <div className="absolute bottom-3 right-3">
                      <button
                        onClick={() => toggleAvailable(prop.id)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold transition-colors ${
                          prop.available
                            ? 'bg-emerald-600 text-white'
                            : 'bg-gray-600 text-white'
                        }`}
                      >
                        {prop.available
                          ? <><ToggleRight className="w-3.5 h-3.5" /> Available</>
                          : <><ToggleLeft className="w-3.5 h-3.5" /> Unavailable</>
                        }
                      </button>
                    </div>
                  </div>

                  <CardContent className="pt-4 pb-4 space-y-3">
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-snug line-clamp-2">{prop.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />{prop.location}
                      </p>
                    </div>

                    {/* Rating + capacity */}
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        {[1,2,3,4,5].map(i => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${i <= Math.round(prop.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                          />
                        ))}
                        <span className="text-gray-500 ml-1">{prop.rating} ({prop.reviewCount})</span>
                      </div>
                      <span className="flex items-center gap-1 text-gray-500">
                        <Users className="w-3 h-3" /> {prop.capacity} guests
                      </span>
                    </div>

                    {/* Amenities */}
                    <div className="flex flex-wrap gap-1.5">
                      {prop.amenities.slice(0, 3).map(a => (
                        <span key={a} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs">
                          {a}
                        </span>
                      ))}
                      {prop.amenities.length > 3 && (
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-400 rounded-full text-xs">
                          +{prop.amenities.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Price + actions */}
                    <div className="flex items-center justify-between pt-1">
                      <span className="font-black text-emerald-600 dark:text-emerald-400">
                        {prop.price} TND<span className="text-xs font-normal text-gray-400">/night</span>
                      </span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1 text-xs">
                          <Edit2 className="w-3 h-3" /> Edit
                        </Button>
                        <Button size="sm" variant="outline" className="h-7 px-2.5 gap-1 text-xs">
                          <Eye className="w-3 h-3" /> View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Add New tab */}
        <TabsContent value="add">
          <Card className="max-w-2xl">
            <CardContent className="pt-6">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                Add New Property
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="acc-title">Title</Label>
                  <Input id="acc-title" placeholder="Property name" value={form.title}
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-location">Location</Label>
                  <Input id="acc-location" placeholder="City, Region" value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-price">Price / night (TND)</Label>
                  <Input id="acc-price" type="number" placeholder="200" value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="acc-capacity">Capacity (guests)</Label>
                  <Input id="acc-capacity" type="number" placeholder="2" value={form.capacity}
                    onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Amenities</Label>
                  <div className="flex flex-wrap gap-2">
                    {AMENITY_OPTIONS.map(a => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => toggleAmenity(a)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          form.amenities.includes(a)
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-emerald-400'
                        }`}
                      >
                        {a}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <Label htmlFor="acc-desc">Description</Label>
                  <Textarea id="acc-desc" placeholder="Describe your property..." rows={3} value={form.description}
                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-5">
                <Button variant="outline" onClick={() => { setForm(EMPTY_FORM); setActiveTab('properties'); }}>
                  Cancel
                </Button>
                <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Add Property
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}

