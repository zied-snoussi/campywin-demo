'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Package, Truck, CheckCircle, Clock, XCircle, MapPin, X, ArrowRight } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { MY_ORDERS, type ProductOrder } from '@/lib/mock-data';

const STATUS_CONFIG: Record<ProductOrder['status'], { label: string; icon: React.ElementType; bg: string; text: string; step: number }> = {
  PENDING: { label: 'Pending', icon: Clock, bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', step: 1 },
  PROCESSING: { label: 'Processing', icon: Package, bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', step: 2 },
  SHIPPED: { label: 'Shipped', icon: Truck, bg: 'bg-purple-50 dark:bg-purple-900/20', text: 'text-purple-700 dark:text-purple-400', step: 3 },
  DELIVERED: { label: 'Delivered', icon: CheckCircle, bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-700 dark:text-emerald-400', step: 4 },
  CANCELLED: { label: 'Cancelled', icon: XCircle, bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400', step: 0 },
};

const TRACK_STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];

function OrderTracker({ status }: { status: ProductOrder['status'] }) {
  if (status === 'CANCELLED') return (
    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800 text-sm text-red-600 dark:text-red-400 font-medium">
      This order was cancelled.
    </div>
  );
  const step = STATUS_CONFIG[status].step;
  return (
    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-0">
        {TRACK_STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${i < step ? 'bg-emerald-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'}`}>
                {i < step ? '✓' : i + 1}
              </div>
              <span className={`text-xs mt-1 font-medium text-center max-w-[56px] ${i < step ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400'}`}>{label}</span>
            </div>
            {i < TRACK_STEPS.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 mb-5 transition-colors ${i < step - 1 ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-700'}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState(MY_ORDERS);
  const [selected, setSelected] = useState<ProductOrder | null>(null);
  const [filter, setFilter] = useState<ProductOrder['status'] | 'ALL'>('ALL');

  const filtered = orders.filter(o => filter === 'ALL' || o.status === filter);

  return (
    <ClientLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">My Orders</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track your camping gear deliveries</p>
        </div>
        <Link href="/dashboard/client/products"
          className="flex items-center gap-2 px-4 py-2 border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 text-sm font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
          Shop Gear <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total Orders', count: orders.length, color: 'text-gray-900 dark:text-white' },
          { label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING' || o.status === 'PENDING').length, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length, color: 'text-emerald-600 dark:text-emerald-400' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.count}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['ALL', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'] as const).map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${filter === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {s === 'ALL' ? 'All Orders' : STATUS_CONFIG[s].label}
          </button>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No orders found</p>
            <p className="text-sm mt-1">
              <Link href="/dashboard/client/products" className="text-emerald-600 dark:text-emerald-400 hover:underline">Browse the gear shop →</Link>
            </p>
          </div>
        ) : filtered.map(order => {
          const cfg = STATUS_CONFIG[order.status];
          const Icon = cfg.icon;
          return (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer" onClick={() => setSelected(order)}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-black text-gray-900 dark:text-white">{order.id}</p>
                    <p className="text-xs text-gray-400 mt-0.5">Placed {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium ${cfg.bg} ${cfg.text}`}>
                    <Icon className="w-3.5 h-3.5" /> {cfg.label}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex gap-2 mb-4">
                  {order.items.slice(0, 3).map(item => (
                    <div key={item.productId} className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    </div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-bold text-gray-500">+{order.items.length - 3}</div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    {order.trackingNumber && <span className="ml-3 text-xs text-purple-600 dark:text-purple-400 font-medium">#{order.trackingNumber}</span>}
                  </div>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-lg">{order.total.toLocaleString()} TND</span>
                </div>

                {order.status === 'SHIPPED' && order.estimatedDelivery && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400 font-medium">
                    <Truck className="w-4 h-4" /> Expected {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                )}
              </div>
              <OrderTracker status={order.status} />
              {order.status !== 'CANCELLED' && <div className="h-4" />}
            </div>
          );
        })}
      </div>

      {/* Order detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">{selected.id}</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Ordered {new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_CONFIG[selected.status].bg} ${STATUS_CONFIG[selected.status].text}`}>
                    {STATUS_CONFIG[selected.status].label}
                  </span>
                  <button onClick={() => setSelected(null)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3 mb-5">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Items Ordered</p>
                {selected.items.map(item => (
                  <div key={item.productId} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white text-sm flex-shrink-0">{(item.price * item.qty).toLocaleString()} TND</span>
                  </div>
                ))}
              </div>

              {/* Shipping info */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-5 space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Delivery Details</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-emerald-500" /> {selected.address}</p>
                {selected.estimatedDelivery && (
                  <p className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-purple-500" />
                    Estimated: {new Date(selected.estimatedDelivery).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                )}
                {selected.trackingNumber && (
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-medium flex items-center gap-2">
                    <Package className="w-3.5 h-3.5" /> Tracking: {selected.trackingNumber}
                  </p>
                )}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex justify-between gap-8"><span>Subtotal</span><span className="text-gray-900 dark:text-white font-medium">{selected.total.toLocaleString()} TND</span></div>
                  <div className="flex justify-between gap-8"><span>Delivery</span><span className="text-emerald-600 font-medium">Free</span></div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400">Total paid</p>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{selected.total.toLocaleString()} TND</p>
                </div>
              </div>

              {(selected.status === 'PENDING' || selected.status === 'PROCESSING') && (
                <button
                  onClick={() => { setOrders(prev => prev.map(o => o.id === selected.id ? { ...o, status: 'CANCELLED' as const } : o)); setSelected(null); }}
                  className="mt-4 w-full py-2.5 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 text-sm font-bold rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
