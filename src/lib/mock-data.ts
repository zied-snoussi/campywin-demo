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

// ── Map spots ─────────────────────────────────────────────────────────────
export interface WeatherInfo {
  temp: number;
  condition: 'Sunny' | 'Partly Cloudy' | 'Cloudy' | 'Windy' | 'Hot';
  humidity: number;
  wind: number;
  icon: string;
}

export interface MapSpot {
  id: string;
  accommodationId: string;
  lat: number;
  lng: number;
  weather: WeatherInfo;
}

export const MAP_SPOTS: MapSpot[] = [
  { id: 's1', accommodationId: '1', lat: 33.455, lng: 9.021, weather: { temp: 38, condition: 'Hot', humidity: 18, wind: 12, icon: '🌵' } },
  { id: 's2', accommodationId: '2', lat: 36.784, lng: 8.693, weather: { temp: 22, condition: 'Partly Cloudy', humidity: 65, wind: 8, icon: '⛅' } },
  { id: 's3', accommodationId: '3', lat: 36.954, lng: 8.760, weather: { temp: 27, condition: 'Sunny', humidity: 55, wind: 14, icon: '☀️' } },
  { id: 's4', accommodationId: '4', lat: 33.544, lng: 9.967, weather: { temp: 36, condition: 'Hot', humidity: 15, wind: 10, icon: '🏜️' } },
  { id: 's5', accommodationId: '5', lat: 33.919, lng: 8.134, weather: { temp: 35, condition: 'Sunny', humidity: 20, wind: 5, icon: '🌞' } },
  { id: 's6', accommodationId: '6', lat: 36.452, lng: 10.735, weather: { temp: 29, condition: 'Sunny', humidity: 60, wind: 18, icon: '🏖️' } },
];

// ── Products & Orders ──────────────────────────────────────────────────────
export type ProductCategory = 'Shelter' | 'Sleep' | 'Cooking' | 'Gear' | 'Clothing' | 'Hydration' | 'Lighting' | 'Navigation';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  tags: string[];
  inStock: boolean;
  badge?: 'New' | 'Best Seller' | 'Sale' | 'Top Rated';
  similarity: number;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  qty: number;
  price: number;
}

export interface ProductOrder {
  id: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  address: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Coleman 4-Season Expedition Tent', brand: 'Coleman', category: 'Shelter', price: 420, originalPrice: 560, rating: 4.8, reviewCount: 312, image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=70', description: 'Engineered for the harshest environments. Double-walled construction, full coverage fly, and reinforced poles make this the gold standard for desert and mountain camping.', tags: ['tent', 'shelter', '4-season', 'desert'], inStock: true, badge: 'Best Seller', similarity: 0.92 },
  { id: 'p2', name: 'MSR Hubba Hubba NX Backpack', brand: 'MSR', category: 'Gear', price: 285, originalPrice: 342, rating: 4.6, reviewCount: 189, image: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=70', description: 'Ultra-lightweight 65L backpacking pack with an ergonomic frame and smart organization. Perfect for multi-day Atlas mountain treks.', tags: ['backpack', 'lightweight', 'trekking'], inStock: true, badge: 'Top Rated', similarity: 0.78 },
  { id: 'p3', name: 'BioLite CampStove 2+', brand: 'BioLite', category: 'Cooking', price: 165, originalPrice: 198, rating: 4.5, reviewCount: 94, image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=600&q=70', description: 'Converts fire into electricity to charge devices while you cook. Burns wood so there\'s no fuel to carry. Perfect for eco-conscious campers.', tags: ['stove', 'cooking', 'eco', 'charging'], inStock: true, badge: 'New', similarity: 0.65 },
  { id: 'p4', name: 'Sea to Summit Spark SP1 Sleeping Bag', brand: 'Sea to Summit', category: 'Sleep', price: 310, originalPrice: 380, rating: 4.9, reviewCount: 256, image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=70', description: 'Down-fill sleeping bag rated to -5°C. UltraDry water-repellent treatment keeps you warm even in damp conditions. Compresses to the size of a Nalgene bottle.', tags: ['sleeping bag', 'down', 'lightweight', 'cold-weather'], inStock: true, badge: 'Top Rated', similarity: 0.85 },
  { id: 'p5', name: 'Petzl Actik Core Headlamp', brand: 'Petzl', category: 'Lighting', price: 75, originalPrice: 90, rating: 4.7, reviewCount: 431, image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=600&q=70', description: '600-lumen headlamp with rechargeable core battery. Red lighting mode for night-vision preservation. Essential for Sahara stargazing excursions.', tags: ['headlamp', 'lighting', 'rechargeable', 'night'], inStock: true, similarity: 0.70 },
  { id: 'p6', name: 'Katadyn BeFree Water Filter', brand: 'Katadyn', category: 'Hydration', price: 95, originalPrice: 110, rating: 4.8, reviewCount: 328, image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=70', description: 'Filter 0.6L/min from any water source — rivers, oases, springs. EZ-Clean membrane lasts 1000L. Fits any standard 28mm opening bottle.', tags: ['water filter', 'hydration', 'safety', 'lightweight'], inStock: true, badge: 'Best Seller', similarity: 0.60 },
  { id: 'p7', name: 'Garmin inReach Mini 2 GPS', brand: 'Garmin', category: 'Navigation', price: 550, originalPrice: 620, rating: 4.6, reviewCount: 78, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=70', description: 'Two-way satellite communicator with SOS capability. No cell signal needed — stay connected even in the deepest Sahara. 14-day battery life.', tags: ['GPS', 'navigation', 'safety', 'satellite', 'sos'], inStock: true, badge: 'New', similarity: 0.55 },
  { id: 'p8', name: 'Patagonia Nano Puff Jacket', brand: 'Patagonia', category: 'Clothing', price: 240, originalPrice: 280, rating: 4.7, reviewCount: 512, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=70', description: 'PrimaLoft Gold insulation in a wind-resistant, water-repellent shell. Packs into its own chest pocket. Essential for chilly Atlas mountain evenings.', tags: ['jacket', 'insulation', 'packable', 'windproof'], inStock: false, similarity: 0.72 },
  { id: 'p9', name: 'Thermarest NeoAir XLite Sleeping Pad', brand: 'Thermarest', category: 'Sleep', price: 210, originalPrice: 250, rating: 4.8, reviewCount: 198, image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=70', description: 'R-value 4.2 inflatable sleeping pad weighing only 340g. Triangular core matrix baffles reduce weight while maintaining support. Rolls to the size of a water bottle.', tags: ['sleeping pad', 'lightweight', 'inflatable', 'warmth'], inStock: true, badge: 'Sale', similarity: 0.80 },
  { id: 'p10', name: 'Primus Lite+ Stove System', brand: 'Primus', category: 'Cooking', price: 125, originalPrice: 145, rating: 4.5, reviewCount: 143, image: 'https://images.unsplash.com/photo-1548277234-24e7c04ac1e5?w=600&q=70', description: 'Complete pot and stove system boils 500ml in under 3 minutes. WindShield technology works in harsh desert conditions. 550ml pot nests perfectly with the burner.', tags: ['stove', 'cooking', 'compact', 'wind-resistant'], inStock: true, similarity: 0.63 },
  { id: 'p11', name: 'Osprey Atmos AG 65 Pack', brand: 'Osprey', category: 'Gear', price: 360, originalPrice: 420, rating: 4.9, reviewCount: 387, image: 'https://images.unsplash.com/photo-1585614688817-f91ebab2d2ea?w=600&q=70', description: 'Anti-Gravity suspension keeps the pack off your back for maximum airflow. 65L capacity with external attachment points for poles and axes. Our most popular trekking pack.', tags: ['backpack', 'anti-gravity', 'trekking', '65L'], inStock: true, badge: 'Best Seller', similarity: 0.75 },
  { id: 'p12', name: 'Black Diamond Spot 400 Headlamp', brand: 'Black Diamond', category: 'Lighting', price: 55, originalPrice: 65, rating: 4.6, reviewCount: 267, image: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=70', description: '400-lumen output with PowerTap technology to instantly switch between full and dimmed power. IPX8 waterproof. Lock mode prevents accidental activation in your pack.', tags: ['headlamp', 'waterproof', 'camping', 'bright'], inStock: true, similarity: 0.68 },
];

export const MY_ORDERS: ProductOrder[] = [
  {
    id: 'ORD-8821',
    items: [
      { productId: 'p1', name: 'Coleman 4-Season Expedition Tent', image: 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=200&q=70', qty: 1, price: 420 },
      { productId: 'p5', name: 'Petzl Actik Core Headlamp', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=200&q=70', qty: 2, price: 75 },
    ],
    total: 570,
    status: 'DELIVERED',
    createdAt: '2026-05-10',
    estimatedDelivery: '2026-05-15',
    trackingNumber: 'TN-8821-XK2',
    address: '12 Rue de la Liberté, Tunis 1001',
  },
  {
    id: 'ORD-9134',
    items: [
      { productId: 'p4', name: 'Sea to Summit Spark SP1 Sleeping Bag', image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=200&q=70', qty: 1, price: 310 },
      { productId: 'p9', name: 'Thermarest NeoAir XLite Sleeping Pad', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&q=70', qty: 1, price: 210 },
    ],
    total: 520,
    status: 'SHIPPED',
    createdAt: '2026-06-04',
    estimatedDelivery: '2026-06-11',
    trackingNumber: 'TN-9134-YM5',
    address: '12 Rue de la Liberté, Tunis 1001',
  },
  {
    id: 'ORD-9287',
    items: [
      { productId: 'p3', name: 'BioLite CampStove 2+', image: 'https://images.unsplash.com/photo-1533240332313-0db49b459ad6?w=200&q=70', qty: 1, price: 165 },
    ],
    total: 165,
    status: 'PROCESSING',
    createdAt: '2026-06-08',
    estimatedDelivery: '2026-06-14',
    address: '12 Rue de la Liberté, Tunis 1001',
  },
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
