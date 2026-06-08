'use client';
import { useState } from 'react';
import { Search, Plus, Heart, MessageCircle, Pin, X } from 'lucide-react';
import { ClientLayout } from '@/components/layout/client-layout';
import { FORUM_POSTS, FORUM_CATEGORIES, type ForumPost } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const ROLE_COLORS: Record<string, string> = {
  CLIENT: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  ORGANISATEUR: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
  ADMIN: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'most-liked', label: 'Most Liked' },
  { value: 'most-comments', label: 'Most Comments' },
];

function PostCard({ post, onClick }: { post: ForumPost; onClick: () => void }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {post.pinned && (
            <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 px-2 py-0.5 rounded-full font-medium border border-amber-200 dark:border-amber-800">
              <Pin className="w-3 h-3" /> Pinned
            </span>
          )}
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 font-medium">{post.category}</span>
        </div>
        <span className="text-xs text-gray-400 whitespace-nowrap flex-shrink-0">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>

      <h3 className="font-bold text-gray-900 dark:text-white mb-2 leading-snug">{post.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.body}</p>

      <div className="flex flex-wrap gap-1 mb-4">
        {post.tags.map(t => (
          <span key={t} className="text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">#{t}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">{post.authorInitial}</div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[post.authorRole]}`}>{post.authorRole}</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
            className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
            {post.likes + (liked ? 1 : 0)}
          </button>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MessageCircle className="w-4 h-4" />
            {post.comments}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ForumPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('newest');
  const [selected, setSelected] = useState<ForumPost | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newCat, setNewCat] = useState('General');
  const [submitted, setSubmitted] = useState(false);

  const filtered = FORUM_POSTS
    .filter(p => {
      const q = search.toLowerCase();
      return (category === 'All' || p.category === category) &&
        (p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)));
    })
    .sort((a, b) => {
      if (sort === 'most-liked') return b.likes - a.likes;
      if (sort === 'most-comments') return b.comments - a.comments;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <ClientLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-gray-900 dark:text-white">Community Forum</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Ask questions, share tips, connect with campers</p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 shadow-md"
        >
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {/* Popular tags */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 mb-5">
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Popular Tags</p>
        <div className="flex flex-wrap gap-2">
          {['sahara', 'camping', 'guide', 'review', 'tips', 'hiring', 'festival', 'equipment', 'safety'].map(tag => (
            <button key={tag} onClick={() => setSearch(tag)} className="text-xs px-3 py-1 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors">#{tag}</button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input className="pl-10" placeholder="Search posts…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 outline-none focus:ring-2 focus:ring-emerald-400"
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      {/* Categories */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FORUM_CATEGORIES.map(c => (
          <button key={c} onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${category === c ? 'bg-emerald-600 text-white shadow-md' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-emerald-300'}`}>
            {c}
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mb-4">{filtered.length} posts</p>

      {/* Posts */}
      <div className="space-y-4">
        {filtered.map(p => <PostCard key={p.id} post={p} onClick={() => setSelected(p)} />)}
      </div>

      {/* Post detail modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">{selected.category}</span>
                  {selected.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full">#{t}</span>)}
                </div>
                <button onClick={() => setSelected(null)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
              </div>
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-3">{selected.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">{selected.body}</p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-sm font-bold">{selected.authorInitial}</div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{selected.author}</p>
                    <p className="text-xs text-gray-400">{new Date(selected.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> {selected.likes}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> {selected.comments}</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Add a reply</p>
                <textarea className="w-full text-sm bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 resize-none" rows={3} placeholder="Write your reply…" />
                <button className="mt-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95">Post Reply</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create post modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl shadow-2xl" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🏕️</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-2">Post Submitted!</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Your post is under review and will be visible shortly.</p>
                <button onClick={() => { setShowCreate(false); setSubmitted(false); setNewTitle(''); setNewBody(''); }} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all active:scale-95">Done</button>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white">Create New Post</h3>
                  <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"><X className="w-4 h-4" /></button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Title *</label>
                    <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="What's your post about?" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Category</label>
                    <select value={newCat} onChange={e => setNewCat(e.target.value)} className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-emerald-400">
                      {FORUM_CATEGORIES.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1 block">Body *</label>
                    <textarea value={newBody} onChange={e => setNewBody(e.target.value)} rows={5} placeholder="Share your question, tip, or experience…" className="w-full text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-gray-900 dark:text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-emerald-400 resize-none" />
                  </div>
                </div>
                <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100 dark:border-gray-700">
                  <button onClick={() => setShowCreate(false)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">Cancel</button>
                  <button
                    disabled={!newTitle.trim() || !newBody.trim()}
                    onClick={() => setSubmitted(true)}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-bold rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ClientLayout>
  );
}
