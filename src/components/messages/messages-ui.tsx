'use client';
import { useState, useRef, useEffect } from 'react';
import { Search, Send, ArrowLeft, Phone, Video, MoreVertical, CheckCheck, Circle, Smile } from 'lucide-react';
import type { Conversation, ChatMessage } from '@/lib/mock-data';

interface Props {
  conversations: Conversation[];
  title?: string;
}

function formatTime(ts: string) { return ts; }

function Avatar({ initial, online, size = 'md' }: { initial: string; online?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const sz = size === 'lg' ? 'w-12 h-12 text-base' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-black shadow-sm`}>
        {initial}
      </div>
      {online !== undefined && (
        <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-gray-900 ${online ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
      )}
    </div>
  );
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
      <span className="text-[11px] text-gray-400 font-medium px-2 bg-gray-50 dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-700">
        {label}
      </span>
      <div className="flex-1 h-px bg-gray-100 dark:bg-gray-700" />
    </div>
  );
}

export function MessagesUI({ conversations: initialConvs, title = 'Messages' }: Props) {
  const [convs, setConvs] = useState<Conversation[]>(initialConvs);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const active = convs.find(c => c.id === activeId) ?? null;

  const filtered = convs.filter(c =>
    c.participantName.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages.length, typing]);

  const openConv = (conv: Conversation) => {
    setActiveId(conv.id);
    setMobileView('chat');
    // Mark all as read
    setConvs(cs => cs.map(c => c.id === conv.id ? { ...c, unread: 0, messages: c.messages.map(m => ({ ...m, read: true })) } : c));
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const sendMessage = () => {
    if (!input.trim() || !activeId) return;
    const text = input.trim();
    setInput('');

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      text,
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };

    setConvs(cs => cs.map(c => c.id === activeId
      ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, lastMessageAt: 'À l\'instant' }
      : c
    ));

    // Simulate reply
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = [
        "Bien reçu, merci ! 👍",
        "Je vous reviens dès que possible.",
        "Parfait, nous allons traiter votre demande.",
        "D'accord, je prends note.",
        "Merci pour l'information !",
      ];
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        senderId: activeId,
        text: replies[Math.floor(Math.random() * replies.length)],
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        read: false,
      };
      setConvs(cs => cs.map(c => c.id === activeId
        ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastMessageAt: 'À l\'instant' }
        : c
      ));
    }, 1200 + Math.random() * 800);
  };

  const totalUnread = convs.reduce((s, c) => s + c.unread, 0);

  return (
    <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-5rem)] bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">

      {/* ── Conversation list ── */}
      <div className={`flex flex-col border-r border-gray-100 dark:border-gray-700 ${mobileView === 'chat' ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-shrink-0`}>

        {/* List header */}
        <div className="px-4 pt-5 pb-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2">
              {title}
              {totalUnread > 0 && (
                <span className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                  {totalUnread}
                </span>
              )}
            </h2>
          </div>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une conversation…"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
              <Search className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm font-medium">Aucune conversation trouvée</p>
            </div>
          ) : filtered.map(conv => (
            <button
              key={conv.id}
              onClick={() => openConv(conv)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 transition-all text-left border-b border-gray-50 dark:border-gray-800 ${
                activeId === conv.id
                  ? 'bg-emerald-50 dark:bg-emerald-900/20 border-l-2 border-l-emerald-500'
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
              }`}
            >
              <Avatar initial={conv.participantInitial} online={conv.online} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <p className={`text-sm truncate ${conv.unread > 0 ? 'font-black text-gray-900 dark:text-white' : 'font-semibold text-gray-800 dark:text-gray-200'}`}>
                    {conv.participantName}
                  </p>
                  <span className={`text-[11px] flex-shrink-0 ${conv.unread > 0 ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-400'}`}>
                    {conv.lastMessageAt}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs truncate ${conv.unread > 0 ? 'text-gray-700 dark:text-gray-300 font-medium' : 'text-gray-400'}`}>
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-emerald-600 text-white text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* ── Chat panel ── */}
      {active ? (
        <div className={`flex flex-col flex-1 min-w-0 ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 flex-shrink-0">
            <button
              onClick={() => setMobileView('list')}
              className="md:hidden p-1.5 -ml-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Avatar initial={active.participantInitial} online={active.online} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-gray-900 dark:text-white">{active.participantName}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                {active.online ? (
                  <><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> En ligne</>
                ) : (
                  <><span className="w-1.5 h-1.5 bg-gray-300 rounded-full" /> Hors ligne</>
                )}
                <span className="ml-1 text-gray-300">·</span>
                <span className="text-gray-400">{active.participantRole}</span>
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <Video className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 bg-gray-50 dark:bg-gray-950">
            <DateSeparator label="Aujourd'hui" />

            {active.messages.map((msg, i) => {
              const isMe = msg.senderId === 'me';
              const prevMsg = active.messages[i - 1];
              const showAvatar = !isMe && (!prevMsg || prevMsg.senderId !== msg.senderId);

              return (
                <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'} ${i > 0 && active.messages[i-1].senderId === msg.senderId ? 'mt-0.5' : 'mt-3'}`}>
                  {/* Received: avatar placeholder to align bubbles */}
                  {!isMe && (
                    <div className="w-7 flex-shrink-0">
                      {showAvatar && <Avatar initial={active.participantInitial} size="sm" />}
                    </div>
                  )}

                  <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      isMe
                        ? 'bg-emerald-600 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-bl-md'
                    }`}>
                      {msg.text}
                    </div>
                    <div className={`flex items-center gap-1 mt-0.5 px-1 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[10px] text-gray-400">{formatTime(msg.timestamp)}</span>
                      {isMe && (
                        <CheckCheck className={`w-3 h-3 ${msg.read ? 'text-emerald-500' : 'text-gray-300 dark:text-gray-600'}`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {typing && (
              <div className="flex items-end gap-2 mt-3">
                <div className="w-7 flex-shrink-0">
                  <Avatar initial={active.participantInitial} size="sm" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input bar */}
          <div className="px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 flex-shrink-0">
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-400 hover:text-emerald-500 transition-colors flex-shrink-0">
                <Smile className="w-5 h-5" />
              </button>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="Écrire un message…"
                className="flex-1 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 dark:disabled:bg-gray-700 disabled:cursor-not-allowed flex items-center justify-center text-white transition-all active:scale-95 flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty state */
        <div className={`flex-1 flex-col items-center justify-center bg-gray-50 dark:bg-gray-950 ${mobileView === 'list' ? 'hidden md:flex' : 'flex'}`}>
          <div className="text-center">
            <div className="w-20 h-20 rounded-3xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center mx-auto mb-5 shadow-inner">
              <Send className="w-8 h-8 text-emerald-500 -rotate-12" />
            </div>
            <h3 className="text-lg font-black text-gray-900 dark:text-white mb-1">Vos messages</h3>
            <p className="text-sm text-gray-400 max-w-48">Sélectionnez une conversation pour commencer à discuter</p>
          </div>
        </div>
      )}
    </div>
  );
}
