export type Role = 'CLIENT' | 'ORGANISATEUR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
  joinedAt: string;
}

export interface Accommodation {
  id: string;
  title: string;
  location: string;
  country: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  amenities: string[];
  capacity: number;
  organizer: string;
  available: boolean;
}

export interface CampEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  endDate: string;
  price: number;
  image: string;
  category: string;
  capacity: number;
  registered: number;
  organizer: string;
  description: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CANCELLED';
  tags: string[];
}

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  tags: string[];
  postedAt: string;
  description: string;
  requirements: string[];
  applicants: number;
}

export interface Booking {
  id: string;
  accommodationTitle: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  image: string;
}

export interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'PENDING' | 'REVIEWED' | 'INTERVIEW' | 'ACCEPTED' | 'REJECTED';
}

export const DEMO_USERS: Record<Role, User> = {
  CLIENT: {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@campywin.com',
    role: 'CLIENT',
    joinedAt: '2025-01-15',
  },
  ORGANISATEUR: {
    id: '2',
    name: 'Ahmed Ben Ali',
    email: 'ahmed@campywin.com',
    role: 'ORGANISATEUR',
    joinedAt: '2024-09-01',
  },
  ADMIN: {
    id: '3',
    name: 'Zied Snoussi',
    email: 'zied@campywin.com',
    role: 'ADMIN',
    joinedAt: '2024-06-01',
  },
};

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: '1',
    title: 'Sahara Oasis Glamping Tent',
    location: 'Douz, Kebili',
    country: 'Tunisia',
    price: 275,
    rating: 4.9,
    reviewCount: 142,
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=800&q=80',
    category: 'Glamping',
    amenities: ['WiFi', 'Breakfast', 'AC', 'Private Bath'],
    capacity: 2,
    organizer: 'Ahmed Ben Ali',
    available: true,
  },
  {
    id: '2',
    title: 'Atlas Mountain Eco Lodge',
    location: 'Ain Draham, Jendouba',
    country: 'Tunisia',
    price: 195,
    rating: 4.7,
    reviewCount: 98,
    image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80',
    category: 'Eco Lodge',
    amenities: ['Hiking Trails', 'Fire Pit', 'Organic Meals', 'WiFi'],
    capacity: 4,
    organizer: 'Dorra Camping Co.',
    available: true,
  },
  {
    id: '3',
    title: 'Mediterranean Coast Retreat',
    location: 'Tabarka, Jendouba',
    country: 'Tunisia',
    price: 370,
    rating: 4.8,
    reviewCount: 217,
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    category: 'Beach Camp',
    amenities: ['Beach Access', 'Kayaking', 'BBQ', 'WiFi', 'Parking'],
    capacity: 6,
    organizer: 'CoastalCamp TN',
    available: true,
  },
  {
    id: '4',
    title: 'Desert Star Safari Camp',
    location: 'Matmata, Gabes',
    country: 'Tunisia',
    price: 230,
    rating: 4.6,
    reviewCount: 83,
    image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=800&q=80',
    category: 'Safari',
    amenities: ['Guided Tours', 'Camel Rides', 'Stargazing', 'Meals Included'],
    capacity: 3,
    organizer: 'Desert Explorers',
    available: false,
  },
  {
    id: '5',
    title: 'Oasis Palm Springs Camp',
    location: 'Tozeur, Tozeur',
    country: 'Tunisia',
    price: 170,
    rating: 4.5,
    reviewCount: 61,
    image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&q=80',
    category: 'Glamping',
    amenities: ['Pool', 'Spa', 'Restaurant', 'WiFi'],
    capacity: 2,
    organizer: 'Oasis Stays',
    available: true,
  },
  {
    id: '6',
    title: 'Cap Bon Beachside Tents',
    location: 'Nabeul, Nabeul',
    country: 'Tunisia',
    price: 145,
    rating: 4.4,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1496545672447-f699b503d270?w=800&q=80',
    category: 'Beach Camp',
    amenities: ['Beach Access', 'Volleyball', 'BBQ', 'Showers'],
    capacity: 4,
    organizer: 'CapBon Adventures',
    available: true,
  },
];

export const EVENTS: CampEvent[] = [
  {
    id: '1',
    title: 'Desert Stargazing Festival',
    location: 'Douz, Kebili',
    date: '2026-07-15',
    endDate: '2026-07-18',
    price: 450,
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80',
    category: 'Festival',
    capacity: 200,
    registered: 143,
    organizer: 'Ahmed Ben Ali',
    description: 'Three nights of celestial wonder in the heart of the Tunisian Sahara. Expert astronomers guide you through the stars.',
    status: 'UPCOMING',
    tags: ['Astronomy', 'Desert', 'Nature', 'Educational'],
  },
  {
    id: '2',
    title: 'Atlas Trek Challenge',
    location: 'Ain Draham, Jendouba',
    date: '2026-08-10',
    endDate: '2026-08-14',
    price: 620,
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    category: 'Adventure',
    capacity: 50,
    registered: 32,
    organizer: 'Mountain Masters TN',
    description: 'A 5-day trekking challenge through the beautiful Kroumirie mountains. All levels welcome.',
    status: 'UPCOMING',
    tags: ['Hiking', 'Mountains', 'Challenge', 'Teamwork'],
  },
  {
    id: '3',
    title: 'Coastal Photography Camp',
    location: 'Tabarka, Jendouba',
    date: '2026-06-20',
    endDate: '2026-06-23',
    price: 550,
    image: 'https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80',
    category: 'Workshop',
    capacity: 30,
    registered: 28,
    organizer: 'CoastalCamp TN',
    description: 'Learn landscape and wildlife photography from professional photographers in stunning natural settings.',
    status: 'UPCOMING',
    tags: ['Photography', 'Art', 'Nature', 'Learning'],
  },
  {
    id: '4',
    title: 'Sahara Survival Skills',
    location: 'Matmata, Gabes',
    date: '2026-05-01',
    endDate: '2026-05-03',
    price: 380,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80',
    category: 'Workshop',
    capacity: 25,
    registered: 25,
    organizer: 'Desert Explorers',
    description: 'Master essential desert survival techniques with experienced guides. Fire-making, navigation, water finding and more.',
    status: 'COMPLETED',
    tags: ['Survival', 'Desert', 'Skills', 'Outdoor'],
  },
];

export const JOB_OFFERS: JobOffer[] = [
  {
    id: '1',
    title: 'Event Coordinator',
    company: 'Sahara Oasis Camps',
    location: 'Douz, Tunisia',
    type: 'Full-time Seasonal',
    salary: '1,200 – 1,800 TND/mo',
    tags: ['Events', 'Coordination', 'Leadership'],
    postedAt: '2026-06-01',
    description: 'Coordinate logistics for our desert camping events. Must be organized, communicative, and passionate about outdoor experiences.',
    requirements: ['2+ years event experience', 'Bilingual (Arabic/French)', 'Driver\'s license', 'Physically fit'],
    applicants: 24,
  },
  {
    id: '2',
    title: 'Camp Chef & Catering Lead',
    company: 'CoastalCamp TN',
    location: 'Tabarka, Tunisia',
    type: 'Seasonal',
    salary: '900 – 1,400 TND/mo',
    tags: ['Cooking', 'Catering', 'Food Safety'],
    postedAt: '2026-05-28',
    description: 'Lead the culinary experience for our coastal glamping guests. Create memorable meals with local ingredients.',
    requirements: ['Culinary diploma or equivalent', 'Camp cooking experience', 'Food safety certification'],
    applicants: 18,
  },
  {
    id: '3',
    title: 'Wilderness Guide',
    company: 'Mountain Masters TN',
    location: 'Ain Draham, Tunisia',
    type: 'Part-time Flexible',
    salary: '600 – 1,000 TND/mo',
    tags: ['Guiding', 'Nature', 'Safety'],
    postedAt: '2026-06-05',
    description: 'Lead trekking groups through the Atlas Mountains. Safety training provided to qualified candidates.',
    requirements: ['Mountain experience', 'First-aid certification', 'Physical fitness', 'Communication skills'],
    applicants: 11,
  },
  {
    id: '4',
    title: 'Equipment Manager',
    company: 'Desert Explorers',
    location: 'Gabes, Tunisia',
    type: 'Full-time',
    salary: '1,000 – 1,500 TND/mo',
    tags: ['Equipment', 'Inventory', 'Logistics'],
    postedAt: '2026-05-20',
    description: 'Manage all camping equipment inventory, maintenance schedules, and logistics for desert expedition camps.',
    requirements: ['Inventory management experience', 'Technical aptitude', 'Attention to detail'],
    applicants: 9,
  },
];

export const MY_BOOKINGS: Booking[] = [
  {
    id: '1',
    accommodationTitle: 'Sahara Oasis Glamping Tent',
    location: 'Douz, Kebili',
    checkIn: '2026-07-20',
    checkOut: '2026-07-23',
    guests: 2,
    total: 825,
    status: 'CONFIRMED',
    image: 'https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?w=400&q=80',
  },
  {
    id: '2',
    accommodationTitle: 'Mediterranean Coast Retreat',
    location: 'Tabarka, Jendouba',
    checkIn: '2026-09-05',
    checkOut: '2026-09-08',
    guests: 4,
    total: 1110,
    status: 'PENDING',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&q=80',
  },
  {
    id: '3',
    accommodationTitle: 'Atlas Mountain Eco Lodge',
    location: 'Ain Draham',
    checkIn: '2026-04-10',
    checkOut: '2026-04-13',
    guests: 2,
    total: 585,
    status: 'COMPLETED',
    image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=400&q=80',
  },
];

export const MY_APPLICATIONS: Application[] = [
  {
    id: '1',
    jobTitle: 'Event Coordinator',
    company: 'Sahara Oasis Camps',
    appliedAt: '2026-06-02',
    status: 'INTERVIEW',
  },
  {
    id: '2',
    jobTitle: 'Wilderness Guide',
    company: 'Mountain Masters TN',
    appliedAt: '2026-06-06',
    status: 'REVIEWED',
  },
];

// ── Forum ──────────────────────────────────────────────────────────────────
export interface ForumPost {
  id: string;
  title: string;
  body: string;
  author: string;
  authorInitial: string;
  authorRole: 'CLIENT' | 'ORGANISATEUR' | 'ADMIN';
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  pinned?: boolean;
}

export const FORUM_CATEGORIES = ['All', 'Camping Tips', 'Trip Planning', 'Equipment', 'Jobs & Careers', 'Events', 'General'];

export const FORUM_POSTS: ForumPost[] = [
  { id: 'f1', title: 'Best camping spots in the Sahara — 2026 guide', body: 'After 3 trips to Douz and surrounding dunes, here are my top picks for off-grid campsites with facilities...', author: 'Karim B.', authorInitial: 'K', authorRole: 'CLIENT', category: 'Camping Tips', tags: ['sahara', 'douz', 'guide'], likes: 84, comments: 23, createdAt: '2026-06-01', pinned: true },
  { id: 'f2', title: 'How do I get my equipment rental deposit back?', body: 'Rented a Coleman tent for the Atlas trip and still waiting on my 150 TND deposit after 2 weeks. Anyone else had this issue?', author: 'Lina M.', authorInitial: 'L', authorRole: 'CLIENT', category: 'Equipment', tags: ['rental', 'deposit', 'help'], likes: 12, comments: 8, createdAt: '2026-06-03' },
  { id: 'f3', title: 'Looking for carpool to Tabarka festival (June 20)', body: 'I have 3 seats available leaving from Tunis Centrale at 7am on June 20. Sharing fuel costs ~25 TND each.', author: 'Youssef T.', authorInitial: 'Y', authorRole: 'CLIENT', category: 'Trip Planning', tags: ['carpool', 'tabarka', 'festival'], likes: 31, comments: 14, createdAt: '2026-06-05' },
  { id: 'f4', title: 'We are hiring: 2 wilderness guides for summer season', body: 'CampyWin partner Sahara Expeditions is looking for experienced guides with WAFA certification. Competitive salary + accommodation included.', author: 'Admin Team', authorInitial: 'A', authorRole: 'ADMIN', category: 'Jobs & Careers', tags: ['hiring', 'guide', 'sahara'], likes: 56, comments: 19, createdAt: '2026-06-04' },
  { id: 'f5', title: 'Desert Stargazing Festival — what to expect?', body: 'First time attending the Douz festival this year. What should I pack? Any tips from veterans?', author: 'Amira S.', authorInitial: 'A', authorRole: 'CLIENT', category: 'Events', tags: ['stargazing', 'douz', 'festival', 'tips'], likes: 47, comments: 31, createdAt: '2026-05-28' },
  { id: 'f6', title: 'Review: MSR Hubba Hubba tent for solo Atlas trips', body: 'After 4 nights in the Chaambi mountains, here is my honest review of this tent...', author: 'Sami R.', authorInitial: 'S', authorRole: 'CLIENT', category: 'Equipment', tags: ['tent', 'review', 'atlas'], likes: 38, comments: 11, createdAt: '2026-05-25' },
  { id: 'f7', title: 'General travel safety tips for Tunisian backcountry', body: 'Always tell someone your route, carry extra water (4L/day minimum in summer), and download offline maps before you lose signal.', author: 'Rania H.', authorInitial: 'R', authorRole: 'ORGANISATEUR', category: 'Camping Tips', tags: ['safety', 'tips', 'backcountry'], likes: 92, comments: 27, createdAt: '2026-05-20' },
  { id: 'f8', title: 'Cap Bon glamping — worth the price?', body: 'Just got back from a 3-night glamping stay at the Cap Bon Eco Lodge. TL;DR: yes, totally worth 280 TND/night if you want comfort with nature.', author: 'Nour K.', authorInitial: 'N', authorRole: 'CLIENT', category: 'Camping Tips', tags: ['glamping', 'capbon', 'review'], likes: 61, comments: 16, createdAt: '2026-06-02' },
];

// ── Support Tickets ─────────────────────────────────────────────────────────
export type TicketPriority = 'LOW' | 'NORMAL' | 'HIGH' | 'URGENT';
export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'WAITING_USER' | 'RESOLVED' | 'CLOSED';

export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  resolvedAt?: string;
}

export const SUPPORT_TICKETS: SupportTicket[] = [
  { id: 't1', subject: 'Deposit not refunded after tent rental', description: 'I returned the Coleman tent on May 15 and still have not received my 150 TND deposit. Order #8821.', priority: 'HIGH', status: 'IN_PROGRESS', createdAt: '2026-05-17' },
  { id: 't2', subject: 'Cannot upload profile photo', description: 'Every time I try to upload a JPEG under 2MB I get a "file type not supported" error.', priority: 'NORMAL', status: 'RESOLVED', createdAt: '2026-05-10', resolvedAt: '2026-05-13' },
  { id: 't3', subject: 'Wrong dates on confirmed booking', description: 'My booking confirmation shows check-in June 10 but I booked June 15. Booking ID: BK-4492.', priority: 'URGENT', status: 'OPEN', createdAt: '2026-06-07' },
  { id: 't4', subject: 'Event registration not showing', description: 'I paid for the Stargazing Festival but it does not appear in My Bookings.', priority: 'HIGH', status: 'WAITING_USER', createdAt: '2026-06-03' },
  { id: 't5', subject: 'General question about cancellation policy', description: 'Can I cancel a confirmed glamping booking 72 hours before check-in and still get a refund?', priority: 'LOW', status: 'CLOSED', createdAt: '2026-05-01', resolvedAt: '2026-05-02' },
];

export const ADMIN_STATS = {
  totalUsers: 2847,
  totalOrganizers: 134,
  totalEvents: 312,
  activeBookings: 891,
  monthlyRevenue: 152800,
  totalAccommodations: 489,
  pendingApprovals: 14,
  openTickets: 7,
};

export const ORGANIZER_STATS = {
  totalEvents: 8,
  activeBookings: 47,
  totalRevenue: 38750,
  avgRating: 4.7,
  totalEquipment: 94,
  pendingApplications: 16,
};
