'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Calendar, MapPin, Briefcase, Package, Building2, Newspaper,
  Car, BarChart3, Mail, Plus, Search, Edit2, PlusCircle, Check, X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

const NAV_ORG = [
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

type EquipCategory = 'Tent' | 'Sleeping' | 'Cooking' | 'Navigation' | 'Clothing' | 'Safety';
type StockStatus   = 'AVAILABLE' | 'LOW' | 'OUT_OF_STOCK';
type RentalStatus  = 'PENDING' | 'APPROVED' | 'ACTIVE' | 'RETURNED' | 'CANCELLED';

interface EquipItem {
  id: number;
  name: string;
  sku: string;
  category: EquipCategory;
  stock: number;
  rented: number;
  pricePerDay: number;
  status: StockStatus;
}

interface RentalRequest {
  id: number;
  client: string;
  item: string;
  qty: number;
  startDate: string;
  endDate: string;
  status: RentalStatus;
}

const INITIAL_ITEMS: EquipItem[] = [
  { id: 1,  name: 'Coleman Sundome 6-Person Tent',    sku: 'TNT-06', category: 'Tent',       stock: 10, rented: 7,  pricePerDay: 45,  status: 'AVAILABLE'   },
  { id: 2,  name: 'MSR Hubba Hubba NX Solo Tent',     sku: 'TNT-01', category: 'Tent',       stock: 8,  rented: 8,  pricePerDay: 35,  status: 'OUT_OF_STOCK' },
  { id: 3,  name: 'Sea to Summit Spark Sleeping Bag', sku: 'SLP-SP1', category: 'Sleeping',  stock: 20, rented: 19, pricePerDay: 20,  status: 'LOW'         },
  { id: 4,  name: 'Thermarest NeoAir Sleeping Pad',   sku: 'SLP-PAD', category: 'Sleeping',  stock: 15, rented: 9,  pricePerDay: 12,  status: 'AVAILABLE'   },
  { id: 5,  name: 'BioLite CampStove 2+',             sku: 'COK-BL2', category: 'Cooking',   stock: 12, rented: 5,  pricePerDay: 18,  status: 'AVAILABLE'   },
  { id: 6,  name: 'Primus Lite+ Stove System',        sku: 'COK-PR1', category: 'Cooking',   stock: 10, rented: 9,  pricePerDay: 15,  status: 'LOW'         },
  { id: 7,  name: 'Petzl Actik Core Headlamp',        sku: 'LGT-PA1', category: 'Navigation', stock: 30, rented: 12, pricePerDay: 8,   status: 'AVAILABLE'   },
  { id: 8,  name: 'Garmin inReach Mini 2 GPS',        sku: 'NAV-GM2', category: 'Navigation', stock: 6,  rented: 6,  pricePerDay: 55,  status: 'OUT_OF_STOCK' },
  { id: 9,  name: 'Patagonia Nano Puff Jacket',       sku: 'CLO-PNP', category: 'Clothing',  stock: 18, rented: 4,  pricePerDay: 25,  status: 'AVAILABLE'   },
  { id: 10, name: 'Adventure Medical First Aid Kit',  sku: 'SAF-AMK', category: 'Safety',    stock: 14, rented: 14, pricePerDay: 10,  status: 'OUT_OF_STOCK' },
];

const INITIAL_RENTALS: RentalRequest[] = [
  { id: 1, client: 'Yassine Trabelsi', item: 'Coleman Sundome 6-Person Tent',    qty: 1, startDate: '2026-06-15', endDate: '2026-06-18', status: 'APPROVED' },
  { id: 2, client: 'Sarra Belhaj',     item: 'Sea to Summit Spark Sleeping Bag', qty: 2, startDate: '2026-06-20', endDate: '2026-06-23', status: 'PENDING'  },
  { id: 3, client: 'Karim Bouzid',     item: 'Petzl Actik Core Headlamp',        qty: 3, startDate: '2026-06-14', endDate: '2026-06-16', status: 'ACTIVE'   },
  { id: 4, client: 'Amira Saad',       item: 'Primus Lite+ Stove System',        qty: 1, startDate: '2026-05-28', endDate: '2026-05-31', status: 'RETURNED' },
  { id: 5, client: 'Nour Khelifi',     item: 'Patagonia Nano Puff Jacket',       qty: 2, startDate: '2026-07-01', endDate: '2026-07-05', status: 'PENDING'  },
  { id: 6, client: 'Lina Mrad',        item: 'Thermarest NeoAir Sleeping Pad',   qty: 1, startDate: '2026-06-10', endDate: '2026-06-13', status: 'CANCELLED'},
];

const CATEGORY_COLORS: Record<EquipCategory, string> = {
  Tent:       'bg-blue-100 text-blue-700',
  Sleeping:   'bg-purple-100 text-purple-700',
  Cooking:    'bg-orange-100 text-orange-700',
  Navigation: 'bg-teal-100 text-teal-700',
  Clothing:   'bg-pink-100 text-pink-700',
  Safety:     'bg-red-100 text-red-700',
};

const STATUS_COLORS: Record<StockStatus, string> = {
  AVAILABLE:   'bg-emerald-100 text-emerald-700',
  LOW:         'bg-amber-100 text-amber-700',
  OUT_OF_STOCK:'bg-red-100 text-red-700',
};

const RENTAL_COLORS: Record<RentalStatus, string> = {
  PENDING:   'bg-amber-100 text-amber-700',
  APPROVED:  'bg-blue-100 text-blue-700',
  ACTIVE:    'bg-emerald-100 text-emerald-700',
  RETURNED:  'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-100 text-red-600',
};

function daysBetween(start: string, end: string) {
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 86400000);
}

export default function EquipmentPage() {
  const [items, setItems]     = useState<EquipItem[]>(INITIAL_ITEMS);
  const [rentals, setRentals] = useState<RentalRequest[]>(INITIAL_RENTALS);
  const [search, setSearch]   = useState('');
  const [catFilter, setCatFilter] = useState<string>('All');
  const [showForm, setShowForm]   = useState(false);
  const [newItem, setNewItem] = useState({ name: '', sku: '', category: 'Tent' as EquipCategory, stock: '', price: '' });

  const stats = {
    total:       items.length,
    available:   items.filter(i => i.status === 'AVAILABLE').length,
    rented:      items.reduce((s, i) => s + i.rented, 0),
    maintenance: items.filter(i => i.status === 'OUT_OF_STOCK').length,
  };

  const categories: string[] = ['All', 'Tent', 'Sleeping', 'Cooking', 'Navigation', 'Clothing', 'Safety'];

  const filteredItems = items.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.sku.toLowerCase().includes(search.toLowerCase());
    const matchCat    = catFilter === 'All' || i.category === catFilter;
    return matchSearch && matchCat;
  });

  function updateRentalStatus(id: number, status: RentalStatus) {
    setRentals(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  function handleAddItem() {
    if (!newItem.name || !newItem.sku) return;
    const stock = parseInt(newItem.stock) || 0;
    const item: EquipItem = {
      id: items.length + 1,
      name: newItem.name,
      sku: newItem.sku,
      category: newItem.category,
      stock,
      rented: 0,
      pricePerDay: parseFloat(newItem.price) || 0,
      status: stock > 0 ? 'AVAILABLE' : 'OUT_OF_STOCK',
    };
    setItems(prev => [...prev, item]);
    setNewItem({ name: '', sku: '', category: 'Tent', stock: '', price: '' });
    setShowForm(false);
  }

  function rowClass(item: EquipItem) {
    if (item.status === 'OUT_OF_STOCK') return 'bg-red-50 dark:bg-red-900/10';
    if (item.status === 'LOW')          return 'bg-amber-50 dark:bg-amber-900/10';
    return '';
  }

  return (
    <DashboardLayout navItems={NAV_ORG} title="Equipment">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Items',  value: stats.total,       color: 'text-blue-600',    bg: 'bg-blue-50 dark:bg-blue-900/20'    },
          { label: 'Available',    value: stats.available,   color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
          { label: 'Rented Out',   value: stats.rented,      color: 'text-purple-600',  bg: 'bg-purple-50 dark:bg-purple-900/20'  },
          { label: 'Out of Stock', value: stats.maintenance, color: 'text-red-600',     bg: 'bg-red-50 dark:bg-red-900/20'        },
        ].map(({ label, value, color, bg }) => (
          <Card key={label} className={`${bg} border-0`}>
            <CardContent className="pt-5 pb-4">
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by name or SKU..."
            className="pl-9"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCatFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                catFilter === cat
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="inventory">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="rentals">Rental Requests</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => setShowForm(v => !v)}
            className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
            size="sm"
          >
            <Plus className="w-4 h-4" /> Add Equipment
          </Button>
        </div>

        {/* Inline add form */}
        {showForm && (
          <Card className="mb-5 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/10">
            <CardHeader>
              <CardTitle className="text-sm">New Equipment Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="md:col-span-2">
                  <Label className="text-xs mb-1 block">Name</Label>
                  <Input placeholder="Item name" value={newItem.name} onChange={e => setNewItem(p => ({ ...p, name: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">SKU</Label>
                  <Input placeholder="TNT-01" value={newItem.sku} onChange={e => setNewItem(p => ({ ...p, sku: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Category</Label>
                  <select
                    className="w-full h-9 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 text-sm"
                    value={newItem.category}
                    onChange={e => setNewItem(p => ({ ...p, category: e.target.value as EquipCategory }))}
                  >
                    {(['Tent','Sleeping','Cooking','Navigation','Clothing','Safety'] as EquipCategory[]).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Stock Qty</Label>
                  <Input type="number" placeholder="0" value={newItem.stock} onChange={e => setNewItem(p => ({ ...p, stock: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs mb-1 block">Price/day (TND)</Label>
                  <Input type="number" placeholder="0.00" value={newItem.price} onChange={e => setNewItem(p => ({ ...p, price: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white gap-1.5" onClick={handleAddItem}>
                  <Check className="w-3.5 h-3.5" /> Save Item
                </Button>
                <Button size="sm" variant="outline" onClick={() => setShowForm(false)}>
                  <X className="w-3.5 h-3.5 mr-1" /> Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Inventory Tab */}
        <TabsContent value="inventory">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      {['Item', 'SKU', 'Category', 'Stock', 'Rented', 'Available', 'Price/day', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => {
                      const available = item.stock - item.rented;
                      return (
                        <tr key={item.id} className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors ${rowClass(item)}`}>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{item.name}</td>
                          <td className="px-4 py-3 text-gray-500 font-mono text-xs">{item.sku}</td>
                          <td className="px-4 py-3">
                            <Badge className={`${CATEGORY_COLORS[item.category]} border-0 text-xs`} variant="outline">{item.category}</Badge>
                          </td>
                          <td className="px-4 py-3 text-center font-semibold text-gray-700 dark:text-gray-300">{item.stock}</td>
                          <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{item.rented}</td>
                          <td className="px-4 py-3 text-center font-semibold text-gray-900 dark:text-white">{available}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">{item.pricePerDay} TND</td>
                          <td className="px-4 py-3">
                            <Badge className={`${STATUS_COLORS[item.status]} border-0 text-xs`} variant="outline">{item.status.replace('_', ' ')}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                <Edit2 className="w-3 h-3" /> Edit
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                                <PlusCircle className="w-3 h-3" /> Add Stock
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredItems.length === 0 && (
                      <tr>
                        <td colSpan={9} className="text-center py-10 text-gray-400 text-sm">No items match your search.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rental Requests Tab */}
        <TabsContent value="rentals">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                      {['Client', 'Item', 'Qty', 'Start', 'End', 'Duration', 'Total', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rentals.map(r => {
                      const days  = daysBetween(r.startDate, r.endDate);
                      const price = (items.find(i => i.name === r.item)?.pricePerDay ?? 0) * days * r.qty;
                      return (
                        <tr key={r.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">{r.client}</td>
                          <td className="px-4 py-3 text-gray-700 dark:text-gray-300 max-w-[160px] truncate">{r.item}</td>
                          <td className="px-4 py-3 text-center">{r.qty}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{r.startDate}</td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">{r.endDate}</td>
                          <td className="px-4 py-3 text-center text-gray-600 dark:text-gray-400">{days}d</td>
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white whitespace-nowrap">{price} TND</td>
                          <td className="px-4 py-3">
                            <Badge className={`${RENTAL_COLORS[r.status]} border-0 text-xs`} variant="outline">{r.status}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1.5 flex-wrap">
                              {r.status === 'PENDING' && (
                                <>
                                  <Button size="sm" className="h-7 text-xs bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => updateRentalStatus(r.id, 'APPROVED')}>Approve</Button>
                                  <Button size="sm" variant="outline" className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50" onClick={() => updateRentalStatus(r.id, 'CANCELLED')}>Reject</Button>
                                </>
                              )}
                              {r.status === 'ACTIVE' && (
                                <Button size="sm" variant="outline" className="h-7 text-xs text-blue-600 border-blue-200 hover:bg-blue-50" onClick={() => updateRentalStatus(r.id, 'RETURNED')}>Mark Returned</Button>
                              )}
                              {(r.status === 'RETURNED' || r.status === 'CANCELLED' || r.status === 'APPROVED') && (
                                <span className="text-xs text-gray-400 italic">{r.status === 'APPROVED' ? 'Awaiting pickup' : 'â€”'}</span>
                              )}
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

