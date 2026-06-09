'use client';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Search, ShoppingCart, Star, Heart, X, Plus, Minus, CheckCircle, Sparkles, Zap } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { PRODUCTS, type Product, type ProductCategory } from '@/lib/mock-data';
import { useStore } from '@/lib/store';

const CATEGORIES: Array<{ value: ProductCategory | 'All'; label: string; emoji: string }> = [
  { value: 'All', label: 'All Gear', emoji: '🏕️' },
  { value: 'Shelter', label: 'Shelter', emoji: '⛺' },
  { value: 'Sleep', label: 'Sleep', emoji: '🛏️' },
  { value: 'Cooking', label: 'Cooking', emoji: '🔥' },
  { value: 'Gear', label: 'Gear', emoji: '🎒' },
  { value: 'Hydration', label: 'Hydration', emoji: '💧' },
  { value: 'Lighting', label: 'Lighting', emoji: '🔦' },
  { value: 'Navigation', label: 'Navigation', emoji: '🧭' },
  { value: 'Clothing', label: 'Clothing', emoji: '🧥' },
];

const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

const BADGE_COLORS: Record<string, string> = {
  'New': 'bg-blue-500',
  'Best Seller': 'bg-amber-500',
  'Sale': 'bg-red-500',
  'Top Rated': 'bg-emerald-500',
};

export default function ProductsPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, updateCartQty, clearCart } = useStore();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'All'>('All');
  const [sort, setSort] = useState('recommended');
  const [liked, setLiked] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS
      .filter(p => {
        const q = search.toLowerCase();
        return (category === 'All' || p.category === category) &&
          (p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
      })
      .sort((a, b) => {
        if (sort === 'price-asc') return a.price - b.price;
        if (sort === 'price-desc') return b.price - a.price;
        if (sort === 'rating') return b.rating - a.rating;
        if (sort === 'reviews') return b.reviewCount - a.reviewCount;
        return b.similarity - a.similarity;
      });
  }, [search, category, sort]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const handleAddToCart = (product: Product) => {
    addToCart({ productId: product.id, name: product.name, image: product.image, price: product.price });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      setCheckingOut(false);
      setOrdered(true);
      setTimeout(() => {
        setOrdered(false);
        clearCart();
        setCartOpen(false);
        router.push('/dashboard/client/orders');
      }, 2000);
    }, 1500);
  };

  return (
    <ClientLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-500" /> Gear Shop
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Top-rated camping equipment — all in TND, delivered to your door</p>
        </div>
        <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-md">
          <ShoppingCart className="w-4 h-4" />
          Cart
          {cartCount > 0 && <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">{cartCount}</span>}
        </button>
      </div>

      {/* Recommended banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-5 mb-6 text-white flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Smart Picks for You</p>
          <h2 className="text-lg font-black">AI-powered recommendations based on your bookings</h2>
          <p className="text-sm opacity-80 mt-1">Matched to your Sahara and Atlas trips</p>
        </div>
        <Zap className="w-12 h-12 opacity-30 flex-shrink-0" />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products, brands…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-emerald-400">
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
        {CATEGORIES.map(c => (
          <button key={c.value} onClick={() => setCategory(c.value)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${category === c.value ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            <span>{c.emoji}</span> {c.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-5">{filtered.length} products</p>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map(product => (
          <div key={product.id} className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-xl transition-all overflow-hidden">
            {/* Image */}
            <div className="relative h-48 cursor-pointer" onClick={() => setSelected(product)}>
              <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
              {product.badge && (
                <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-bold text-white ${BADGE_COLORS[product.badge]}`}>{product.badge}</span>
              )}
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-bold text-sm bg-black/60 px-4 py-1.5 rounded-full">Out of Stock</span>
                </div>
              )}
              <button onClick={e => { e.stopPropagation(); setLiked(l => l.includes(product.id) ? l.filter(x => x !== product.id) : [...l, product.id]); }}
                className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center shadow hover:scale-110 transition-transform">
                <Heart className={`w-4 h-4 ${liked.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">{product.category}</span>
                <span className="text-xs text-gray-400">{product.brand}</span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white leading-snug cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" onClick={() => setSelected(product)}>
                {product.name}
              </h3>
              <div className="flex items-center gap-1.5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < Math.round(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 dark:text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-400">{product.rating} ({product.reviewCount})</span>
              </div>

              {/* Match bar */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full" style={{ width: `${product.similarity * 100}%` }} />
                </div>
                <span className="text-xs text-gray-400">{Math.round(product.similarity * 100)}% match</span>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">{product.price} <span className="text-sm font-semibold">TND</span></span>
                  {product.price < product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2">{product.originalPrice}</span>
                  )}
                </div>
                <button
                  disabled={!product.inStock}
                  onClick={() => handleAddToCart(product)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${addedId === product.id ? 'bg-emerald-600 text-white' : product.inStock ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}`}
                >
                  {addedId === product.id ? <><CheckCircle className="w-3.5 h-3.5" /> Added!</> : <><ShoppingCart className="w-3.5 h-3.5" /> Add</>}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="relative h-64">
              <Image src={selected.image} alt={selected.name} fill className="object-cover" unoptimized />
              {selected.badge && <span className={`absolute top-4 left-4 text-xs px-2.5 py-1 rounded-full font-bold text-white ${BADGE_COLORS[selected.badge]}`}>{selected.badge}</span>}
              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">{selected.category}</span>
                <span className="text-sm text-gray-400 font-medium">{selected.brand}</span>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-2">{selected.name}</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.round(selected.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} />)}</div>
                <span className="text-sm text-gray-500">{selected.rating}/5.0 · {selected.reviewCount} reviews</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-5">{selected.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-5">
                {selected.tags.map(t => <span key={t} className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">#{t}</span>)}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">{selected.price < selected.originalPrice ? `Save ${selected.originalPrice - selected.price} TND` : 'Price'}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{selected.price} TND</span>
                    {selected.price < selected.originalPrice && <span className="text-gray-400 text-sm line-through">{selected.originalPrice} TND</span>}
                  </div>
                </div>
                <button
                  disabled={!selected.inStock}
                  onClick={() => { handleAddToCart(selected); setSelected(null); }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-bold rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-4 h-4" /> {selected.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-sm bg-white dark:bg-gray-900 h-full shadow-2xl flex flex-col" onClick={e => e.stopPropagation()}>
            {ordered ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-5">
                  <CheckCircle className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Order Placed!</h3>
                <p className="text-gray-500 dark:text-gray-400">Redirecting to your orders…</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-700">
                  <h2 className="text-lg font-black text-gray-900 dark:text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-emerald-500" /> Cart ({cartCount})
                  </h2>
                  <button onClick={() => setCartOpen(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 text-gray-400">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-3 opacity-30" />
                      <p className="font-semibold">Your cart is empty</p>
                      <p className="text-sm mt-1">Browse gear and add items</p>
                    </div>
                  ) : cart.map(item => (
                    <div key={item.productId} className="flex gap-3 items-start">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.price} TND each</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <button onClick={() => updateCartQty(item.productId, -1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg transition-colors"><Minus className="w-3 h-3" /></button>
                            <span className="w-6 text-center text-sm font-bold text-gray-900 dark:text-white">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.productId, 1)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"><Plus className="w-3 h-3" /></button>
                          </div>
                          <span className="text-sm font-black text-emerald-600 dark:text-emerald-400">{(item.price * item.qty).toLocaleString()} TND</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.productId)} className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                </div>

                {cart.length > 0 && (
                  <div className="p-5 border-t border-gray-100 dark:border-gray-700 space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Subtotal</span><span>{cartTotal.toLocaleString()} TND</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                      <span>Delivery</span><span className="text-emerald-600 dark:text-emerald-400 font-semibold">Free</span>
                    </div>
                    <div className="flex justify-between font-black text-gray-900 dark:text-white text-base pt-2 border-t border-gray-100 dark:border-gray-700">
                      <span>Total</span><span className="text-emerald-600">{cartTotal.toLocaleString()} TND</span>
                    </div>
                    <button
                      onClick={handleCheckout}
                      disabled={checkingOut}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all active:scale-95 shadow-lg disabled:opacity-70"
                    >
                      {checkingOut ? 'Processing…' : 'Place Order →'}
                    </button>
                    <p className="text-xs text-center text-gray-400">Free delivery across Tunisia · 30-day returns</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
