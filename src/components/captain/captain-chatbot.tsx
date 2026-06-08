'use client';
import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface Message {
  id: string;
  role: 'captain' | 'user';
  text: string;
  time: string;
}

const MOCK_RESPONSES: Record<string, string> = {
  default: "That's a great question! 🏕️ I can help you find the perfect camping experience in Tunisia. What are you looking for — a glamping stay, an adventure event, or a job in the outdoors?",
  booking: "I can help with your booking! Head to **Stays** to browse verified accommodations. You'll find glamping tents, eco lodges, beach camps and more — all with TND pricing and instant confirmation.",
  event: "Tunisia has amazing events coming up! ⭐ The **Desert Stargazing Festival** in Douz is unmissable — 3 nights under the Saharan sky for 450 TND. Check the **Events** page for the full list!",
  job: "Looking for work in the outdoors? 💼 We have positions for event coordinators, camp chefs, wilderness guides, and equipment managers. Browse **Jobs** to find your perfect role!",
  help: "Sure! Here's what I can help with:\n\n🏕️ Finding the perfect camping stay\n📅 Upcoming events & workshops\n💼 Job opportunities in the outdoors\n📋 Managing your bookings & applications\n\nWhat would you like to explore?",
  greet: "Ahoy! 🏕️ Great to see you! I'm Captain, your camping adventure guide. What adventure shall we plan today?",
  price: "All prices on CampyWin are in Tunisian Dinar (TND). Stays range from 145 TND to 370 TND per night. Events start at 380 TND per person. Great value for world-class outdoor experiences!",
  location: "CampyWin covers all of Tunisia's best outdoor regions — the Sahara desert around Douz, the Atlas mountains near Ain Draham, Mediterranean coast at Tabarka, Cap Bon, and the Tozeur oasis. Where do you want to explore?",
};

function getResponse(message: string): string {
  const lower = message.toLowerCase();
  if (/hello|hi|hey|ahoy|bonjour|salut/.test(lower)) return MOCK_RESPONSES.greet;
  if (/book|stay|accommodat|glamping|tent|lodge|camp/.test(lower)) return MOCK_RESPONSES.booking;
  if (/event|festival|trek|workshop|adventure|star/.test(lower)) return MOCK_RESPONSES.event;
  if (/job|work|career|hire|position|salary|employ/.test(lower)) return MOCK_RESPONSES.job;
  if (/price|cost|tnd|dinar|how much|tarif/.test(lower)) return MOCK_RESPONSES.price;
  if (/where|location|region|douz|tabarka|tozeur|tunisia/.test(lower)) return MOCK_RESPONSES.location;
  if (/help|what can|how|assist/.test(lower)) return MOCK_RESPONSES.help;
  return MOCK_RESPONSES.default;
}

const getTime = () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

const QUICK_REPLIES = ['🏕️ Find a stay', '📅 View events', '💼 Browse jobs', '❓ Help'];

export function CaptainChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'captain',
      text: "Ahoy! 🏕️ I'm Captain, your camping adventure guide!\n\nNeed help with bookings, job opportunities, or exploring amazing accommodations across Tunisia? I'm here to help!",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text: string) => {
    if (!text.trim() || typing) return;
    const cleanText = text.replace(/^[🏕️📅💼❓]\s*/, '').trim();
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text: cleanText, time: getTime() };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setTyping(true);
    const response = getResponse(cleanText);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { id: (Date.now() + 1).toString(), role: 'captain', text: response, time: getTime() }]);
    }, 1000 + Math.random() * 800);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label="Open Captain chat"
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full border-2 border-emerald-300 shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 animate-float-pulse"
        style={{ background: 'linear-gradient(135deg, #10b981, #047857)' }}
      >
        🏕️
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-96 rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 animate-slide-up"
          style={{ height: 580 }}>

          {/* Header with background image */}
          <div className="relative flex-shrink-0 overflow-hidden" style={{ minHeight: 110 }}>
            {/* BG image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=600&q=60')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-700/80 to-teal-800/80" />
            {/* Content */}
            <div className="relative z-10 flex items-end justify-between h-full p-4 pt-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white/50 flex items-center justify-center text-2xl shadow-lg">
                  🏕️
                </div>
                <div>
                  <p className="font-black text-white text-lg leading-tight drop-shadow-md">Captain</p>
                  <p className="text-emerald-100 text-xs drop-shadow">Your camping adventure guide</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-emerald-200 text-[10px]">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'items-end gap-2'}`}>
                {msg.role === 'captain' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm flex-shrink-0 shadow">
                    🏕️
                  </div>
                )}
                <div className={`max-w-[78%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === 'user'
                      ? 'bg-emerald-500 text-white rounded-tr-none shadow'
                      : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-sm shadow">🏕️</div>
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
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
            <div className="px-4 pb-2 flex gap-2 flex-wrap bg-gray-50 dark:bg-gray-900/50">
              {QUICK_REPLIES.map(r => (
                <button
                  key={r}
                  onClick={() => sendMessage(r)}
                  className="text-xs px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
                >
                  {r}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="Ask Captain anything..."
              disabled={typing}
              className="flex-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full px-4 py-2 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent disabled:opacity-50 transition-all"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || typing}
              className="w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-600 flex items-center justify-center text-white transition-all disabled:cursor-not-allowed active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
