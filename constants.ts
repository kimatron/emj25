import { PortfolioCategory, Print } from './types';

export const CATEGORIES: PortfolioCategory[] = [
  {
    id: 'self-isolation-portraits',
    title: 'Self Isolation Portraits',
    description: 'Intimate portraits captured during the isolation period.',
    coverImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 4, src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
    ],
  },
  {
    id: 'galway',
    title: 'Galway',
    description: 'The vibrant streets and landscapes of Galway, Ireland.',
    coverImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=1200&q=80', alt: 'Galway street', width: 1200, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1549918644-b0c1e0c9b909?w=800&q=80', alt: 'Galway bay', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=1200&q=80', alt: 'Galway architecture', width: 1200, height: 800 },
    ],
  },
  {
    id: 'beautiful-people',
    title: 'Beautiful People',
    description: 'Candid moments and authentic human connection.',
    coverImage: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
      { id: 4, src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
    ],
  },
  {
    id: 'festivals-gigs',
    title: 'Festivals & Gigs',
    description: 'The raw energy and atmosphere of live music events.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1540039155733-5bb3005328d8?w=800&q=80', alt: 'Concert', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1495364144593-272cb8156184?w=1200&q=80', alt: 'Guitarist', width: 1200, height: 800 },
      { id: 3, src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80', alt: 'Crowd', width: 800, height: 1000 },
      { id: 4, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80', alt: 'Singer', width: 1200, height: 900 },
    ],
  },
  {
    id: 'travel-gems',
    title: 'Travel Gems',
    description: 'Hidden corners and unexpected beauty from around the world.',
    coverImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80', alt: 'Travel', width: 1200, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80', alt: 'Architecture', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=1200&q=80', alt: 'Street', width: 1200, height: 800 },
    ],
  },
  {
    id: 'food',
    title: 'Food Glorious Food',
    description: 'Culinary artistry and food photography.',
    coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1200&q=80', alt: 'Food', width: 1200, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', alt: 'Pizza', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=1200&q=80', alt: 'Pancakes', width: 1200, height: 800 },
      { id: 4, src: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=800&q=80', alt: 'Coffee', width: 800, height: 1000 },
    ],
  },
  {
    id: 'theatre-events',
    title: 'Theatre & Events',
    description: 'Capturing the drama and emotion of live performance.',
    coverImage: 'https://images.unsplash.com/photo-1504310578132-85c54f26b528?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1594950334816-a796c9e1d8a8?w=1000&q=80', alt: 'Stage', width: 1000, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1572087229828-9141d382713a?w=800&q=80', alt: 'Performance', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1542025232-dfc6999a3809?w=1200&q=80', alt: 'Lighting', width: 1200, height: 800 },
      { id: 4, src: 'https://images.unsplash.com/photo-1595424296898-3486884a25a3?w=800&q=80', alt: 'Dancer', width: 800, height: 1000 },
    ],
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Behind the scenes and photography insights.',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=1200&q=80', alt: 'Behind the scenes', width: 1200, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80', alt: 'Camera gear', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1526413232644-8a40f03cc03b?w=1200&q=80', alt: 'Photography', width: 1200, height: 800 },
    ],
  },
  {
    id: 'drone-shots',
    title: 'Drone Shots',
    description: 'Aerial perspectives of landscapes and architecture.',
    coverImage: 'https://images.unsplash.com/photo-1508349937151-22b67484e5c1?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f357?w=1200&q=80', alt: 'Aerial coast', width: 1200, height: 800 },
      { id: 2, src: 'https://images.unsplash.com/photo-1502101852923-d4ce4d4d2d1e?w=800&q=80', alt: 'Aerial city', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1559827260-dc66b3503507?w=1200&q=80', alt: 'Aerial river', width: 1200, height: 700 },
      { id: 4, src: 'https://images.unsplash.com/photo-1549470984-81bcb34963b1?w=900&q=80', alt: 'Aerial castle', width: 900, height: 1200 },
    ],
  },
  {
    id: 'product-photography',
    title: 'Product Photography',
    description: 'Commercial product and lifestyle photography.',
    coverImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80', alt: 'Product', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80', alt: 'Sneakers', width: 1200, height: 800 },
      { id: 3, src: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80', alt: 'Watch', width: 800, height: 1000 },
    ],
  },
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Timeless moments from special days.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80', alt: 'Wedding couple', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1480798221232-2a543f21105c?w=1200&q=80', alt: 'Wedding details', width: 1200, height: 800 },
      { id: 3, src: 'https://images.unsplash.com/photo-1522008283893-573c7b2a3a5f?w=800&q=80', alt: 'Ceremony', width: 800, height: 1000 },
      { id: 4, src: 'https://images.unsplash.com/photo-1511285560921-4c927b389121?w=800&q=80', alt: 'First dance', width: 800, height: 1200 },
    ],
  },
];

export const PRINTS: Print[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1557993636-50f22551b6a4?w=800&q=80',
    title: 'Galway Bay Mist',
    description: 'Morning light over Galway Bay',
    price: 150.00,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1576628043603-16a7c331a6b0?w=800&q=80',
    title: 'Cliffs of Moher',
    description: 'Dramatic coastal landscape at sunset',
    price: 175.00,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1604512411293-3e5e2e0a2e37?w=800&q=80',
    title: 'Connemara Quiet',
    description: 'Serene landscape of Connemara',
    price: 160.00,
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1619462828516-72c6f6e522f1?w=800&q=80',
    title: 'Shop Street',
    description: 'The energy of Galway\'s streets',
    price: 120.00,
  },
];