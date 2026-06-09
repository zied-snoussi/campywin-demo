'use client';
import { useState } from 'react';
import {
  LayoutDashboard, Users, Building2, Tent, Package,
  Briefcase, FileText, LifeBuoy, BarChart3, Mail, Settings, Plus, Newspaper,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  { label: 'Newsletters',    href: '/dashboard/admin/newsletters',   icon: Newspaper },
  { label: 'Settings',       href: '/dashboard/admin/settings',      icon: Settings },
];

interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  published: boolean;
}

interface ForumCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  postCount: number;
  modCount: number;
  active: boolean;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  postCount: number;
  active: boolean;
}

const INITIAL_FAQS: FaqItem[] = [
  { id: '1', question: 'How do I book a camping accommodation on CampyWin?', category: 'Booking', answer: 'Browse accommodations, select your dates and guest count, then click "Book Now" to complete your reservation using our secure payment system.', published: true },
  { id: '2', question: 'What is the cancellation policy for bookings?', category: 'Cancellation', answer: 'Free cancellation is available up to 48 hours before check-in. Late cancellations may incur a fee of up to 50% of the booking total.', published: true },
  { id: '3', question: 'Are all camping sites safety-certified?', category: 'Safety', answer: 'Yes. All partner organizers must pass our safety audit covering equipment, emergency protocols, and first aid availability before listing on CampyWin.', published: true },
  { id: '4', question: 'How are refunds processed?', category: 'Refunds', answer: 'Approved refunds are processed within 5â€“7 business days back to the original payment method. You will receive an email confirmation once processed.', published: true },
  { id: '5', question: 'Can I modify my booking after confirmation?', category: 'Booking', answer: 'You can modify your booking dates or guest count up to 72 hours before check-in, subject to availability, from your dashboard under "My Bookings".', published: false },
  { id: '6', question: 'What should I bring to a desert camping trip?', category: 'Safety', answer: 'We recommend sunscreen, a hat, insulated sleeping bag, at least 3L of water per person per day, a torch, and sturdy closed-toe footwear.', published: true },
];

const INITIAL_FORUM_CATS: ForumCategory[] = [
  { id: '1', name: 'General Discussion', icon: 'ðŸ’¬', description: 'Open discussions about camping, travel, and outdoor life in Tunisia.', postCount: 1243, modCount: 3, active: true },
  { id: '2', name: 'Gear & Equipment Tips', icon: 'ðŸŽ’', description: 'Share and discover the best gear for your outdoor adventures.', postCount: 678, modCount: 2, active: true },
  { id: '3', name: 'Destinations & Routes', icon: 'ðŸ—ºï¸', description: 'Explore hidden gems, popular routes, and travel stories across Tunisia.', postCount: 891, modCount: 2, active: true },
  { id: '4', name: 'Safety & First Aid', icon: 'ðŸ›¡ï¸', description: 'Essential safety tips, emergency procedures, and first aid guides.', postCount: 312, modCount: 4, active: true },
  { id: '5', name: 'Events & Meetups', icon: 'ðŸ”¥', description: 'Upcoming events, community meetups, and group expedition planning.', postCount: 445, modCount: 2, active: true },
  { id: '6', name: 'Careers & Jobs', icon: 'ðŸ’¼', description: 'Find outdoor industry jobs, post opportunities, and share career advice.', postCount: 189, modCount: 1, active: false },
];

const INITIAL_BLOG_CATS: BlogCategory[] = [
  { id: '1', name: 'Adventure', slug: 'adventure', postCount: 42, active: true },
  { id: '2', name: 'Sustainability', slug: 'sustainability', postCount: 18, active: true },
  { id: '3', name: 'Tips & Tricks', slug: 'tips-tricks', postCount: 35, active: true },
  { id: '4', name: 'Events', slug: 'events', postCount: 27, active: true },
  { id: '5', name: 'Featured', slug: 'featured', postCount: 14, active: false },
];

function truncate(text: string, max: number) {
  return text.length > max ? text.slice(0, max) + 'â€¦' : text;
}

export default function AdminContentPage() {
  const [faqs, setFaqs] = useState<FaqItem[]>(INITIAL_FAQS);
  const [forumCats, setForumCats] = useState<ForumCategory[]>(INITIAL_FORUM_CATS);
  const [blogCats, setBlogCats] = useState<BlogCategory[]>(INITIAL_BLOG_CATS);

  function toggleFaqPublished(id: string) {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, published: !f.published } : f));
  }

  function deleteFaq(id: string) {
    setFaqs(prev => prev.filter(f => f.id !== id));
  }

  function toggleForumActive(id: string) {
    setForumCats(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  }

  function toggleBlogActive(id: string) {
    setBlogCats(prev => prev.map(c => c.id === id ? { ...c, active: !c.active } : c));
  }

  return (
    <DashboardLayout navItems={NAV_ADMIN} title="Content Management">
      <Tabs defaultValue="faq">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="forum">Forum Categories</TabsTrigger>
          <TabsTrigger value="blog">Blog Categories</TabsTrigger>
        </TabsList>

        {/* FAQ Tab */}
        <TabsContent value="faq">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs gap-1">
                <Plus className="w-3.5 h-3.5" /> Add FAQ
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <p className="font-semibold text-sm text-gray-900 dark:text-white">{faq.question}</p>
                      <Badge variant="outline" className="text-[10px] px-1.5 bg-indigo-50 text-indigo-600 border-indigo-200">{faq.category}</Badge>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{truncate(faq.answer, 80)}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Badge
                      variant="outline"
                      className={faq.published ? 'bg-emerald-50 text-emerald-700 text-[10px]' : 'bg-gray-100 text-gray-500 text-[10px]'}
                    >
                      {faq.published ? 'Published' : 'Draft'}
                    </Badge>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500" onClick={() => toggleFaqPublished(faq.id)}>
                      {faq.published ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-red-500" onClick={() => deleteFaq(faq.id)}>Delete</Button>
                  </div>
                </div>
              ))}
              {faqs.length === 0 && (
                <p className="text-center text-sm text-gray-400 py-8">No FAQs found.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forum Categories Tab */}
        <TabsContent value="forum">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Forum Categories</h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Category
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {forumCats.map(cat => (
              <Card key={cat.id} className={!cat.active ? 'opacity-60' : ''}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{cat.icon}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white text-sm">{cat.name}</p>
                        <Badge
                          variant="outline"
                          className={cat.active ? 'text-[10px] bg-emerald-50 text-emerald-700' : 'text-[10px] bg-gray-100 text-gray-500'}
                        >
                          {cat.active ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500 shrink-0" onClick={() => toggleForumActive(cat.id)}>
                      {cat.active ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{cat.description}</p>
                  <div className="flex gap-4 text-xs text-gray-500">
                    <span><span className="font-semibold text-gray-700 dark:text-gray-300">{cat.postCount.toLocaleString()}</span> posts</span>
                    <span><span className="font-semibold text-gray-700 dark:text-gray-300">{cat.modCount}</span> moderators</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Blog Categories Tab */}
        <TabsContent value="blog">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Blog Categories</CardTitle>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 text-xs gap-1">
                <Plus className="w-3.5 h-3.5" /> Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-700">
                      {['Name', 'Slug', 'Post Count', 'Status', 'Actions'].map(h => (
                        <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {blogCats.map(cat => (
                      <tr key={cat.id} className="border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className="py-3 px-3 font-medium text-gray-900 dark:text-white">{cat.name}</td>
                        <td className="py-3 px-3 font-mono text-xs text-gray-500 dark:text-gray-400">/{cat.slug}</td>
                        <td className="py-3 px-3 text-gray-600 dark:text-gray-300">{cat.postCount}</td>
                        <td className="py-3 px-3">
                          <Badge variant="outline" className={cat.active ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}>
                            {cat.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-7 text-xs">Edit</Button>
                            <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-500" onClick={() => toggleBlogActive(cat.id)}>
                              {cat.active ? 'Disable' : 'Enable'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
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

