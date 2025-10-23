import { PortfolioCategory, Print } from './types';

export const CATEGORIES: PortfolioCategory[] = [
  {
    id: 'self-isolation-portraits',
    title: 'Self Isolation Portraits',
    description: 'Intimate portraits captured during the isolation period.',
    coverImage: '/images/portfolio/travel-gems/mountain1.jpg',
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
    coverImage: '/images/portfolio/galway/galway.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/galway/galway.jpg', alt: 'Galway street', width: 1200, height: 800 },
      { id: 2, src: '/images/portfolio/galway/galway2.jpg', alt: 'Galway architecture', width: 1200, height: 800 },
      { id: 3, src: '/images/portfolio/galway/galway4.jpg', alt: 'Galway bay', width: 800, height: 1200 },
      { id: 4, src: 'https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?w=1200&q=80', alt: 'Galway architecture', width: 1200, height: 800 },
      { id: 5, src: '/images/portfolio/galway/galway3.jpg', alt: 'Galway architecture', width: 1200, height: 1000 },
    ],
  },
  {
    id: 'beautiful-people',
    title: 'Beautiful People',
    description: 'Candid moments and authentic human connection.',
    coverImage: '/images/portfolio/beautiful-people/people1.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/beautiful-people/people1.jpg', alt: 'Portrait', width: 800, height: 1200 },
      { id: 2, src: '/images/portfolio/beautiful-people/people2.jpg', alt: 'Portrait', width: 800, height: 1200 },
      { id: 3, src: '/images/portfolio/beautiful-people/people3.jpg', alt: 'Portrait', width: 800, height: 1200 },
      { id: 4, src: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80', alt: 'Portrait', width: 800, height: 1200 },
    ],
  },
  {
    id: 'festivals-gigs',
    title: 'Festivals & Gigs',
    description: 'The raw energy and atmosphere of live music events.',
    coverImage:'/images/portfolio/festival-gigs/music1.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/festival-gigs/music1.jpg', alt: 'Concert', width: 800, height: 1200 },
      { id: 2, src: '/images/portfolio/festival-gigs/music2.jpg', alt: 'Guitarist', width: 1200, height: 800 },
      { id: 3, src: '/images/portfolio/festival-gigs/music3.jpg', alt: 'Crowd', width: 800, height: 1000 },
      { id: 4, src: '/images/portfolio/festival-gigs/music4.jpg', alt: 'Singer', width: 1200, height: 900 },
      { id: 4, src: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', alt: 'Revellers', width: 1200, height: 1000 },
    ],
  },
  {
    id: 'travel-gems',
    title: 'Travel Gems',
    description: 'Hidden corners and unexpected beauty from around the world.',
    coverImage: '/images/portfolio/travel-gems/hero1.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/travel-gems/hero1.jpg', alt: 'Travel', width: 1200, height: 800 },
      { id: 2, src: '/images/portfolio/travel-gems/heo2.jpg', alt: 'Architecture', width: 800, height: 1200 },
      { id: 3, src: '/images/portfolio/travel-gems/outdoors1.jpg', alt: 'Street', width: 1200, height: 800 },
      { id: 2, src: '/images/portfolio/travel-gems/outdoors2.jpg', alt: 'Sailing', width: 800, height: 1200 },
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
    coverImage: '/images/portfolio/theatre/theatre2.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/theatre/theatre1.jpg', alt: 'Stage', width: 1000, height: 800 },
      { id: 2, src: '/images/portfolio/theatre/theatre2.jpg', alt: 'Performance', width: 800, height: 1200 },
      { id: 3, src: '/images/portfolio/theatre/theatre3.jpg', alt: 'Lighting', width: 1200, height: 800 },
      { id: 4, src: '/images/portfolio/drone/theatre4.jpg', alt: 'Dancer', width: 800, height: 1000 },
      { id: 5, src: '/images/portfolio/theatre/theatre5.jpg', alt: 'Lighting', width: 1200, height: 800 },
       { id: 6, src: '/images/portfolio/drone/theatre6.jpg', alt: 'Dancer', width: 800, height: 1000 },
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
    coverImage: '/images/portfolio/drone/drone.jpg',
    photos: [
      { id: 1, src: '/images/portfolio/drone/drone.jpg', alt: 'Aerial coast', width: 1200, height: 800 },
      { id: 2, src: '/images/portfolio/drone/drone2.jpg', alt: 'Aerial city', width: 800, height: 1200 },
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
    src:'/images/prints/landing.jpg',
    title: 'Galway Bay Mist',
    description: 'Morning light over Galway Bay',
    price: 150.00,
  },
  {
    id: 2,
   src:'/images/prints/landing2.jpg',
    title: 'Cliffs of Moher',
    description: 'Dramatic coastal landscape at sunset',
    price: 175.00,
  },
  {
    id: 3,
    src:'/images/prints/people1.jpg',
    title: 'Connemara Quiet',
    description: 'Serene landscape of Connemara',
    price: 160.00,
  },
  {
    id: 4,
    src:'/images/prints/landing.jpg',
    title: 'Shop Street',
    description: 'The energy of Galway\'s streets',
    price: 120.00,
  },
];