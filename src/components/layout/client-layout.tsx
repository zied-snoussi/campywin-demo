'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { Home, MapPin, Briefcase, HelpCircle, Moon, Sun, LogOut, X, Send, Bell, ShoppingCart, Plus, Minus, Trash2, CheckCircle, Calendar, BookOpen, User, MessageSquare, ShoppingBag, Package, Map, Car, Mail } from 'lucide-react';
import { useStore } from '@/lib/store';
import { CLIENT_CONVERSATIONS } from '@/lib/mock-data';
import { CaptainChatbot } from '@/components/captain/captain-chatbot';

const NOTIFS = [
  { id: 'n1', icon: '✅', text: 'Your booking at Sahara Glamping Camp has been confirmed!', time: '2 min ago' },
  { id: 'n2', icon: '🎉', text: 'Desert Stargazing Festival starts in 3 days. Get ready!', time: '1 hour ago' },
  { id: 'n3', icon: '📦', text: 'Your order #ORD-003 has been shipped and is on its way.', time: '3 hours ago' },
  { id: 'n4', icon: '💼', text: 'Your application for Camp Chef was reviewed by the organizer.', time: 'Yesterday' },
  { id: 'n5', icon: '🌟', text: 'New gear recommendation: TrailBlazer Headlamp 500 — perfect for your next trip!', time: '2 days ago' },
];

/* ── shared chat logic ── */
const MOCK = {
  default: "That's a great question! 🏕️ I can help you find the perfect camping experience in Tunisia. Looking for a glamping stay, an adventure event, or a job in the outdoors?",
  booking: "Head to **Stays** to browse verified accommodations — glamping tents, eco lodges, beach camps and more. All with TND pricing and instant confirmation.",
  event: "Tunisia has amazing events coming up! The **Desert Stargazing Festival** in Douz is unmissable — 3 nights under the Saharan sky for 450 TND. Check the **Events** page!",
  job: "Looking for work in the outdoors? 💼 We have positions for event coordinators, camp chefs, wilderness guides and more. Browse **Jobs** to find your role!",
  help: "Here's what I can help with:\n\n🏕️ Finding the perfect camping stay\n📅 Upcoming events & workshops\n💼 Job opportunities\n📋 Managing bookings & applications",
  greet: "Ahoy! 🏕️ Great to see you! I'm Captain, your camping adventure guide. What adventure shall we plan today?",
  price: "All prices are in Tunisian Dinar (TND). Stays range from 145–370 TND/night. Events start at 380 TND/person.",
  location: "CampyWin covers all of Tunisia's best outdoor regions — Sahara around Douz, Atlas mountains near Ain Draham, Mediterranean coast at Tabarka, and the Tozeur oasis.",
};
function getResponse(msg: string) {
  const l = msg.toLowerCase();
  if (/hello|hi|hey|ahoy|bonjour|salut/.test(l)) return MOCK.greet;
  if (/book|stay|accommodat|glamping|tent|lodge|camp/.test(l)) return MOCK.booking;
  if (/event|festival|trek|workshop|star/.test(l)) return MOCK.event;
  if (/job|work|career|hire|salary|employ/.test(l)) return MOCK.job;
  if (/price|cost|tnd|dinar|how much/.test(l)) return MOCK.price;
  if (/where|location|region|douz|tabarka|tozeur/.test(l)) return MOCK.location;
  if (/help|what can|how|assist/.test(l)) return MOCK.help;
  return MOCK.default;
}
const QUICK = ['🏕️ Find a stay', '📅 View events', '💼 Browse jobs', '❓ Help'];
const ts = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

interface Msg { id: string; role: 'captain' | 'user'; text: string; time: string }

const INIT_MSG: Msg = {
  id: '0', role: 'captain',
  text: "Ahoy! 🏕️ I'm Captain, your camping adventure guide!\n\nNeed help with bookings, events, or jobs across Tunisia? I'm here!",
  time: ts(),
};

/* ── nav items (excluding Captain center) ── */
const LEFT_NAV = [
  { label: 'Home', href: '/dashboard/client', icon: Home },
  { label: 'Map', href: '/dashboard/client/map', icon: Map },
];
const RIGHT_NAV = [
  { label: 'Transport', href: '/dashboard/client/transport', icon: Car },
  { label: 'Help', href: '/dashboard/client/support', icon: HelpCircle },
];

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isDark, logout, toggleTheme, cart, removeFromCart, updateCartQty, clearCart } = useStore();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const [cartChecking, setCartChecking] = useState(false);
  const [cartOrdered, setCartOrdered] = useState(false);

  const handleCartCheckout = () => {
    setCartChecking(true);
    setTimeout(() => {
      setCartChecking(false);
      setCartOrdered(true);
      setTimeout(() => {
        setCartOrdered(false);
        clearCart();
        setCartOpen(false);
        router.push('/dashboard/client/orders');
      }, 1800);
    }, 1400);
  };

  /* mobile chat sheet state */
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([INIT_MSG]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [readNotifs, setReadNotifs] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing, chatOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) setCartOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const sendMsg = (text: string) => {
    if (!text.trim() || typing) return;
    const clean = text.replace(/^[🏕️📅💼❓]\s*/, '').trim();
    setMessages(m => [...m, { id: Date.now().toString(), role: 'user', text: clean, time: ts() }]);
    setInput('');
    setTyping(true);
    const reply = getResponse(clean);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: 'captain', text: reply, time: ts() }]);
    }, 900 + Math.random() * 700);
  };

  const handleLogout = () => { logout(); router.push('/'); };

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const active = pathname === href;
    return (
      <Link href={href}
        className={`flex flex-col items-center justify-center px-3 py-2 rounded-2xl min-h-[44px] min-w-[56px] transition-all ${
          active ? 'bg-emerald-100 dark:bg-emerald-800/60 text-emerald-700 dark:text-emerald-300' : 'text-gray-500 dark:text-emerald-400/70 hover:text-emerald-600 dark:hover:text-emerald-300'
        }`}>
        <Icon className="w-6 h-6" />
        <span className="text-[10px] uppercase tracking-widest font-bold mt-1">{label}</span>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">

      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-emerald-950/80 backdrop-blur-md border-b border-gray-100 dark:border-emerald-900/30 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
              src={isDark ? '/logo-campy-win-light.png' : '/logo-campy-win-green-realistic.png'}
              alt="CampyWin" width={40} height={40} className="object-contain"
              style={{ width: 40, height: 'auto' }} />
            <span className="text-xl font-black text-emerald-900 dark:text-emerald-50 hidden sm:inline tracking-tight">
              Campy<span className="text-emerald-500">Win</span>
            </span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-1">
            {/* Theme */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors text-emerald-700 dark:text-emerald-400">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {/* Messages */}
            <button
              onClick={() => router.push('/dashboard/client/messages')}
              aria-label="Messages"
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors text-emerald-700 dark:text-emerald-400 relative"
            >
              <Mail className="w-5 h-5" />
              {CLIENT_CONVERSATIONS.some(c => c.unread > 0) && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button onClick={() => setNotifOpen(o => !o)} aria-label="Notifications"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors text-emerald-700 dark:text-emerald-400 relative">
                <Bell className="w-5 h-5" />
                {NOTIFS.some(n => !readNotifs.includes(n.id)) && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      <Bell className="w-4 h-4 text-emerald-500" /> Notifications
                    </h3>
                    <button onClick={() => { setReadNotifs(NOTIFS.map(n => n.id)); }}
                      className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 dark:divide-gray-800">
                    {NOTIFS.map(n => (
                      <button key={n.id} onClick={() => setReadNotifs(r => r.includes(n.id) ? r : [...r, n.id])}
                        className={`w-full text-left flex items-start gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${!readNotifs.includes(n.id) ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''}`}>
                        <span className="text-xl flex-shrink-0 mt-0.5">{n.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs leading-snug ${!readNotifs.includes(n.id) ? 'font-bold text-gray-900 dark:text-white' : 'font-medium text-gray-600 dark:text-gray-300'}`}>{n.text}</p>
                          <p className="text-[11px] text-gray-400 mt-0.5">{n.time}</p>
                        </div>
                        {!readNotifs.includes(n.id) && <span className="w-2 h-2 bg-emerald-500 rounded-full flex-shrink-0 mt-1.5" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <div className="relative" ref={cartRef}>
              <button
                onClick={() => setCartOpen(o => !o)}
                aria-label="Shopping cart"
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-800 transition-colors text-emerald-700 dark:text-emerald-400 relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-emerald-600 text-white text-[9px] font-black rounded-full flex items-center justify-center leading-none">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </button>

              {cartOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                    <h3 className="font-black text-gray-900 dark:text-white text-sm flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4 text-emerald-500" /> Cart ({cartCount})
                    </h3>
                    <button onClick={() => setCartOpen(false)} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="max-h-64 overflow-y-auto">
                    {cart.length === 0 ? (
                      <div className="py-10 text-center text-gray-400">
                        <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-30" />
                        <p className="text-sm font-medium">Your cart is empty</p>
                        <button
                          onClick={() => { setCartOpen(false); router.push('/dashboard/client/products'); }}
                          className="mt-3 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
                        >
                          Browse gear shop →
                        </button>
                      </div>
                    ) : (
                      <div className="divide-y divide-gray-50 dark:divide-gray-800">
                        {cart.map(item => (
                          <div key={item.productId} className="flex items-center gap-3 px-4 py-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-gray-100" />
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{item.name}</p>
                              <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{(item.price * item.qty).toLocaleString()} TND</p>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                              <button onClick={() => updateCartQty(item.productId, -1)}
                                className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Minus className="w-2.5 h-2.5" />
                              </button>
                              <span className="text-xs font-bold w-4 text-center text-gray-900 dark:text-white">{item.qty}</span>
                              <button onClick={() => updateCartQty(item.productId, 1)}
                                className="w-5 h-5 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Plus className="w-2.5 h-2.5" />
                              </button>
                              <button onClick={() => removeFromCart(item.productId)}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors ml-0.5">
                                <Trash2 className="w-2.5 h-2.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {cart.length > 0 && (
                    <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
                      {cartOrdered ? (
                        <div className="py-4 text-center">
                          <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-1" />
                          <p className="text-sm font-black text-gray-900 dark:text-white">Order placed!</p>
                          <p className="text-xs text-gray-400">Redirecting to orders…</p>
                        </div>
                      ) : (
                        <>
                          <div className="flex justify-between text-sm font-black text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span className="text-emerald-600 dark:text-emerald-400">{cartTotal.toLocaleString()} TND</span>
                          </div>
                          <button
                            onClick={handleCartCheckout}
                            disabled={cartChecking}
                            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-70 text-white text-sm font-bold rounded-xl transition-all active:scale-95"
                          >
                            {cartChecking ? 'Processing…' : 'Checkout →'}
                          </button>
                          <button
                            onClick={() => { setCartOpen(false); router.push('/dashboard/client/products'); }}
                            className="w-full py-2 text-xs text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors text-center"
                          >
                            View & edit full cart
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile avatar + dropdown */}
            <div className="relative" ref={profileRef}>
              <button onClick={() => setProfileOpen(o => !o)} aria-label="User menu"
                className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm ml-1 shadow hover:shadow-md transition-shadow">
                {user?.name?.[0] ?? 'U'}
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                  <nav className="py-1">
                    {[
                      { href: '/dashboard/client', icon: Home, label: 'Dashboard' },
                      { href: '/dashboard/client/profile', icon: User, label: 'My Profile' },
                      { href: '/dashboard/client/bookings', icon: BookOpen, label: 'My Bookings' },
                      { href: '/dashboard/client/applications', icon: Briefcase, label: 'Applications' },
                      { href: '/dashboard/client/events', icon: Calendar, label: 'Events' },
                      { href: '/dashboard/client/messages', icon: Mail, label: 'Messages' },
                      { href: '/dashboard/client/forum', icon: MessageSquare, label: 'Forum' },
                      { href: '/dashboard/client/map', icon: Map, label: 'Explore Map' },
                      { href: '/dashboard/client/products', icon: ShoppingBag, label: 'Gear Shop' },
                      { href: '/dashboard/client/orders', icon: Package, label: 'My Orders' },
                      { href: '/dashboard/client/transport', icon: Car, label: 'Transport' },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link key={href} href={href} onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Icon className="w-4 h-4 text-gray-400" /> {label}
                      </Link>
                    ))}
                    <div className="h-px bg-gray-100 dark:bg-gray-700 my-1" />
                    <button onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 pb-36 overflow-y-auto">
        <div className="px-4 py-6 max-w-5xl mx-auto">
          {children}
        </div>
      </main>

      {/* ── Bottom Navigation Bar ── */}
      <nav aria-label="Navigation"
        className="fixed bottom-0 left-0 w-full md:w-4/5 lg:w-2/3 xl:w-1/2 md:left-1/2 md:-translate-x-1/2 z-40 flex justify-around items-center px-2 md:px-6 pb-5 md:pb-3 pt-3 bg-white/90 dark:bg-emerald-950/90 backdrop-blur-xl border-t border-gray-100/50 dark:border-emerald-800/30 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-t-3xl md:rounded-full md:border-0 md:border-t-0 md:mb-4 lg:mb-6">

        {LEFT_NAV.map(n => <NavLink key={n.label} {...n} />)}

        {/* Captain center button */}
        <button onClick={() => setChatOpen(true)} aria-label="Chat with Captain"
          className="flex flex-col items-center justify-center relative -mt-8 px-3 py-1 lg:hidden z-50">
          <div className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 border-2 border-emerald-300 animate-float-pulse overflow-hidden bg-gradient-to-br from-emerald-500 to-emerald-700">
            <Image src="/avatar-captain.png" alt="Captain" width={64} height={64} className="w-full h-full object-cover rounded-full" />
          </div>
          <span className="text-[10px] uppercase tracking-widest font-bold mt-2 text-emerald-600 dark:text-emerald-400">Chat</span>
        </button>

        {RIGHT_NAV.map(n => <NavLink key={n.label} {...n} />)}
      </nav>

      {/* ── Mobile Captain Bottom Sheet ── */}
      {chatOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" onClick={() => setChatOpen(false)} />

          {/* Sheet */}
          <div className="fixed inset-x-0 bottom-0 top-20 z-50 lg:hidden flex flex-col bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl animate-slide-up overflow-hidden">
            {/* Drag handle */}
            <div className="flex justify-center pt-2 pb-1 flex-shrink-0">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header — couvert-captain-boot.png background */}
            <div
              className="flex-shrink-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/couvert-captain-boot.png')", minHeight: 100 }}
            >
              <div className="bg-black/20 flex items-start justify-between px-4 py-3 h-full">
                <div className="flex items-center gap-3 bg-black/30 rounded-lg px-3 py-2">
                  <div>
                    <p className="font-bold text-white drop-shadow-lg">Captain</p>
                    <p className="text-xs text-white/90 drop-shadow-md">Your camping guide · Always here to help</p>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors drop-shadow-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-end gap-2'}`}>
                  {msg.role === 'captain' && (
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow">
                      <Image src="/avatar-captain.png" alt="Captain" width={32} height={32} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-emerald-500 text-white rounded-tr-none shadow'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex items-end gap-2">
                  <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 shadow">
                    <Image src="/avatar-captain.png" alt="Captain" width={32} height={32} className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      {[0, 1, 2].map(i => (
                        <div key={i} className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && !typing && (
              <div className="px-4 pb-2 flex gap-2 flex-wrap bg-gray-50 dark:bg-gray-900/50 flex-shrink-0">
                {QUICK.map(r => (
                  <button key={r} onClick={() => sendMsg(r)}
                    className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors">
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 pb-6 flex gap-2 flex-shrink-0">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMsg(input)}
                placeholder="Ask Captain anything..."
                disabled={typing}
                className="flex-1 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent disabled:opacity-50 transition-all"
              />
              <button onClick={() => sendMsg(input)} disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 flex items-center justify-center text-white transition-all disabled:cursor-not-allowed active:scale-95">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Desktop floating Captain widget ── */}
      <div className="hidden lg:block">
        <CaptainChatbot />
      </div>
    </div>
  );
}
