'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package, Briefcase,
  FileText, LifeBuoy, BarChart3, Mail, Settings,
  Search, Download, Plus, Edit2, ShoppingCart,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardLayout } from '@/components/layout/dashboard-layout';

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

type InvCategory = 'Tents' | 'Sleeping Gear' | 'Navigation' | 'Cooking' | 'Clothing' | 'Safety';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  category: InvCategory;
  stock: number;
  unitPrice: number;
  supplier: string;
  color: string;
}

const INVENTORY_ITEMS: InventoryItem[] = [
  { id: 'i01', name: 'Coleman 4-Season Expedition Tent',  sku: 'TNT-COL-4S',  category: 'Tents',        stock: 24,  unitPrice: 420,  supplier: 'Coleman Distribution TN',  color: '#3b82f6' },
  { id: 'i02', name: 'Quechua 2-Person Backpacking Tent', sku: 'TNT-QCH-2P',  category: 'Tents',        stock: 6,   unitPrice: 185,  supplier: 'Decathlon Tunis',           color: '#6366f1' },
  { id: 'i03', name: 'Desert Trail Solo Tent',            sku: 'TNT-DTS-01',  category: 'Tents',        stock: 0,   unitPrice: 250,  supplier: 'Camping Direct SA',         color: '#f59e0b' },
  { id: 'i04', name: 'Sea to Summit Spark SP1 Sleeping Bag', sku: 'SLP-STS-SP1', category: 'Sleeping Gear', stock: 18, unitPrice: 310, supplier: 'OutdoorPro TN',            color: '#8b5cf6' },
  { id: 'i05', name: 'Thermarest NeoAir XLite Pad',       sku: 'SLP-THR-NX',  category: 'Sleeping Gear', stock: 8,   unitPrice: 210,  supplier: 'OutdoorPro TN',            color: '#ec4899' },
  { id: 'i06', name: 'Garmin inReach Mini 2 GPS',         sku: 'NAV-GAR-IM2', category: 'Navigation',   stock: 5,   unitPrice: 550,  supplier: 'Tech Gear TN',             color: '#14b8a6' },
  { id: 'i07', name: 'Suunto A-10 Field Compass',         sku: 'NAV-SUU-A10', category: 'Navigation',   stock: 33,  unitPrice: 45,   supplier: 'Camping Direct SA',        color: '#0ea5e9' },
  { id: 'i08', name: 'BioLite CampStove 2+',              sku: 'CKG-BIO-CS2', category: 'Cooking',      stock: 12,  unitPrice: 165,  supplier: 'Eco Gear Imports',         color: '#f97316' },
  { id: 'i09', name: 'Primus Lite+ Stove System',         sku: 'CKG-PRI-LT',  category: 'Cooking',      stock: 9,   unitPrice: 125,  supplier: 'Camping Direct SA',        color: '#ef4444' },
  { id: 'i10', name: 'Patagonia Nano Puff Jacket (M)',    sku: 'CLT-PAT-NP-M', category: 'Clothing',    stock: 7,   unitPrice: 240,  supplier: 'Sports Warehouse TN',      color: '#a855f7' },
  { id: 'i11', name: 'Merino Wool Base Layer Set',        sku: 'CLT-MWL-BLS', category: 'Clothing',     stock: 0,   unitPrice: 95,   supplier: 'Textile Pro TN',           color: '#84cc16' },
  { id: 'i12', name: 'Wilderness First Aid Kit Pro',      sku: 'SAF-WFA-PRO', category: 'Safety',       stock: 15,  unitPrice: 75,   supplier: 'SafeGear Medical',         color: '#ef4444' },
];

const CATEGORIES: (InvCategory | 'All')[] = ['All', 'Tents', 'Sleeping Gear', 'Navigation', 'Cooking', 'Clothing', 'Safety'];

function stockBadgeClass(stock: number) {
  if (stock === 0)   return 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400';
  if (stock < 10)    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400';
  return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400';
}

function stockLabel(stock: number) {
  if (stock === 0)  return 'Out of Stock';
  if (stock < 10)   return `Low (${stock})`;
  return `${stock}`;
}

export default function AdminInventoryPage() {
  const [search, setSearch]     = useState('');
  const [category, setCategory] = useState<InvCategory | 'All'>('All');

  const filtered = INVENTORY_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCat    = category === 'All' || item.category === category;
    return matchesSearch && matchesCat;
  });

  const totalItems  = INVENTORY_ITEMS.length;
  const inStock     = INVENTORY_ITEMS.filter(i => i.stock > 0).length;
  const lowStock    = INVENTORY_ITEMS.filter(i => i.stock > 0 && i.stock < 10).length;
  const outOfStock  = INVENTORY_ITEMS.filter(i => i.stock === 0).length;

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Admin â€” Inventory">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Inventory Management</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Track equipment stock, suppliers, and reorder levels.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 text-sm gap-2">
            <Download className="w-4 h-4" /> Export
          </Button>
          <Button className="h-9 text-sm gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Items',   value: totalItems,  icon: Package,       color: 'text-blue-600 dark:text-blue-400',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'In Stock',      value: inStock,     icon: Package,       color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Low Stock',     value: lowStock,    icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
          { label: 'Out of Stock',  value: outOfStock,  icon: AlertTriangle, color: 'text-red-600 dark:text-red-400',     bg: 'bg-red-50 dark:bg-red-900/20' },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label}>
            <CardContent className="pt-5 pb-4">
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${bg} mb-3`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className={`text-3xl font-black ${color}`}>{value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl flex-1 max-w-sm">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products or SKU..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                category === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  {['Product', 'SKU', 'Category', 'Stock', 'Unit Price', 'Total Value', 'Supplier', 'Actions'].map(h => (
                    <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                      No inventory items match your filters.
                    </td>
                  </tr>
                )}
                {filtered.map(item => {
                  const isLow      = item.stock > 0 && item.stock < 10;
                  const isOutOfStock = item.stock === 0;
                  const rowBg      = isLow
                    ? 'bg-amber-50/60 dark:bg-amber-900/10'
                    : isOutOfStock
                      ? 'bg-red-50/40 dark:bg-red-900/10'
                      : '';

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-gray-50 dark:border-gray-800 hover:brightness-[0.97] dark:hover:brightness-110 transition-all ${rowBg}`}
                    >
                      {/* Product image + Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-9 h-9 rounded-xl flex-shrink-0 shadow-sm"
                            style={{ backgroundColor: item.color + '22', border: `2px solid ${item.color}44` }}
                          >
                            <div className="w-full h-full rounded-xl flex items-center justify-center" style={{ color: item.color }}>
                              <Package className="w-4 h-4" />
                            </div>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 dark:text-white max-w-[200px] truncate">{item.name}</p>
                            {isLow && (
                              <p className="text-[10px] text-amber-600 dark:text-amber-400 flex items-center gap-0.5 mt-0.5">
                                <AlertTriangle className="w-2.5 h-2.5" /> Low stock alert
                              </p>
                            )}
                            {isOutOfStock && (
                              <p className="text-[10px] text-red-500 dark:text-red-400 flex items-center gap-0.5 mt-0.5">
                                <AlertTriangle className="w-2.5 h-2.5" /> Out of stock
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-4">
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-md">
                          {item.sku}
                        </code>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="text-xs border-gray-200 text-gray-600 dark:border-gray-600 dark:text-gray-300 whitespace-nowrap">
                          {item.category}
                        </Badge>
                      </td>

                      {/* Stock qty */}
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={`text-xs font-semibold ${stockBadgeClass(item.stock)}`}>
                          {stockLabel(item.stock)}
                        </Badge>
                      </td>

                      {/* Unit price */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-900 dark:text-white">{item.unitPrice.toLocaleString()}</span>
                        <span className="text-xs text-gray-400 ml-0.5">TND</span>
                      </td>

                      {/* Total value */}
                      <td className="py-3 px-4">
                        <span className="font-semibold text-gray-700 dark:text-gray-200">
                          {(item.stock * item.unitPrice).toLocaleString()}
                        </span>
                        <span className="text-xs text-gray-400 ml-0.5">TND</span>
                      </td>

                      {/* Supplier */}
                      <td className="py-3 px-4 text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap max-w-[160px] truncate">
                        {item.supplier}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-blue-600" title="Edit">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost" size="sm"
                            className={`h-7 w-7 p-0 ${
                              isLow || isOutOfStock
                                ? 'text-amber-500 hover:text-amber-700'
                                : 'text-gray-500 hover:text-emerald-600'
                            }`}
                            title="Reorder"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer summary */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> of{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">{INVENTORY_ITEMS.length}</span> products
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Total inventory value:{' '}
              <span className="font-bold text-gray-800 dark:text-gray-200">
                {INVENTORY_ITEMS.reduce((sum, i) => sum + i.stock * i.unitPrice, 0).toLocaleString()} TND
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}

