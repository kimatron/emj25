import { PortfolioCategory, Print } from './types';

export const CATEGORIES: PortfolioCategory[] = [
  {
    id: 'live-music',
    title: 'Live Music',
    description: 'Capturing the energy and passion of live performances.',
    coverImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1540039155733-5bb3005328d8?w=800&q=80', alt: 'Concert', width: 800, height: 1200, caption: 'The main stage act, bathed in light.' },
      { id: 2, src: 'https://images.unsplash.com/photo-1495364144593-272cb8156184?w=1200&q=80', alt: 'Guitarist', width: 1200, height: 800 },
      { id: 3, src: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80', alt: 'Crowd', width: 800, height: 1000, caption: 'An ocean of fans.' },
      { id: 4, src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80', alt: 'Singer', width: 1200, height: 900 },
    ],
  },
  {
    id: 'theatre-arts',
    title: 'Theatre & Arts',
    description: 'The drama and emotion of the stage, captured in time.',
    coverImage: 'https://images.unsplash.com/photo-1504310578132-85c54f26b528?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1594950334816-a796c9e1d8a8?w=1000&q=80', alt: 'Actor on stage', width: 1000, height: 800, caption: 'A monologue in the spotlight.' },
      { id: 2, src: 'https://images.unsplash.com/photo-1572087229828-9141d382713a?w=800&q=80', alt: 'Dramatic pose', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1542025232-dfc6999a3809?w=1200&q=80', alt: 'Theatrical lighting', width: 1200, height: 800 },
      { id: 4, src: 'https://images.unsplash.com/photo-1595424296898-3486884a25a3?w=800&q=80', alt: 'Dancer in motion', width: 800, height: 1000 },
      { id: 5, src: 'https://images.unsplash.com/photo-1522249918492-4d6e27d31528?w=1200&q=80', alt: 'Stage design', width: 1200, height: 900 },
    ],
  },
  {
    id: 'drone',
    title: 'Drone Photography',
    description: 'Unique perspectives from high above.',
    coverImage: 'https://images.unsplash.com/photo-1508349937151-22b67484e5c1?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1517524206127-48bbd363f357?w=1200&q=80', alt: 'Coastal aerial view', width: 1200, height: 800, caption: 'The Wild Atlantic Way from 400ft.' },
      { id: 2, src: 'https://images.unsplash.com/photo-1502101852923-d4ce4d4d2d1e?w=800&q=80', alt: 'Cityscape top-down', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1559827260-dc66b3503507?w=1200&q=80', alt: 'River winding through a valley', width: 1200, height: 700, caption: 'Patterns of nature.' },
      { id: 4, src: 'https://images.unsplash.com/photo-1549470984-81bcb34963b1?w=900&q=80', alt: 'Castle ruins from above', width: 900, height: 1200 },
    ],
  },
  {
    id: 'videography',
    title: 'Videography',
    description: 'Cinematic stories, dynamic reels, and editing work.',
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    photos: [
        { id: 1, type: 'video', src: 'https://images.unsplash.com/photo-1500329862956-6f6c9a3a38a7?w=1200&q=80', videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-a-close-up-of-a-woman-in-a-field-of-flowers-42253-large.mp4', alt: 'Field of Flowers', width: 1200, height: 800, caption: 'Summer Reel 2024' },
        { id: 2, type: 'video', src: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1200&q=80', videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-winding-road-in-the-forest-41421-large.mp4', alt: 'Winding Road', width: 1200, height: 800, caption: 'Drone Footage Compilation' },
        { id: 3, type: 'video', src: 'https://images.unsplash.com/photo-1558008258-325654483984?w=1200&q=80', videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-drummer-playing-the-drums-in-a-rehearsal-42931-large.mp4', alt: 'Drummer Playing', width: 1200, height: 800, caption: 'Live Music Session Promo' }
    ]
  },
  {
    id: 'landscapes',
    title: 'Landscapes',
    description: 'Exploring the wild beauty of Ireland and beyond.',
    coverImage: 'https://images.unsplash.com/photo-1517427185303-3a553f19114b?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1576628043603-16a7c331a6b0?w=1200&q=80', alt: 'Cliffs', width: 1200, height: 800, caption: 'Sunset over the Cliffs of Moher.' },
      { id: 2, src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80', alt: 'Forest path', width: 800, height: 1200 },
      { id: 3, src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80', alt: 'Misty mountains', width: 1200, height: 700 },
      { id: 4, src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80', alt: 'Coastal view', width: 900, height: 1200 },
    ],
  },
  {
    id: 'weddings',
    title: 'Weddings',
    description: 'Timeless moments and cherished memories.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    photos: [
      { id: 1, src: 'https://images.unsplash.com/photo-1523438097201-512ae7d59c44?w=800&q=80', alt: 'Bride and groom', width: 800, height: 1200 },
      { id: 2, src: 'https://images.unsplash.com/photo-1480798221232-2a543f21105c?w=1200&q=80', alt: 'Wedding details', width: 1200, height: 800 },
      { id: 3, src: 'https://images.unsplash.com/photo-1522008283893-573c7b2a3a5f?w=800&q=80', alt: 'Ceremony', width: 800, height: 1000 },
      { id: 4, src: 'https://images.unsplash.com/photo-1552526017-4c45a1c1d636?w=1200&q=80', alt: 'Wedding rings', width: 1200, height: 800 },
      { id: 5, src: 'https://images.unsplash.com/photo-1511285560921-4c927b389121?w=800&q=80', alt: 'First dance', width: 800, height: 1200 },
    ],
  },
];

export const PRINTS: Print[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1557993636-50f22551b6a4?w=800&q=80',
    title: 'Galway Bay Mist',
    description: 'A fine art print capturing the ethereal morning mist over Galway Bay. Printed on archival-quality Hahnemühle paper.',
    price: 150.00,
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1576628043603-16a7c331a6b0?w=800&q=80',
    title: 'Cliffs of Moher',
    description: 'The dramatic Cliffs of Moher at sunset. A powerful and vibrant image. Printed on archival-quality Hahnemühle paper.',
    price: 175.00,
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1604512411293-3e5e2e0a2e37?w=800&q=80',
    title: 'Connemara Quiet',
    description: 'The serene and rugged landscape of Connemara National Park. Printed on archival-quality Hahnemühle paper.',
    price: 160.00,
  },
    {
    id: 4,
    src: 'https://images.unsplash.com/photo-1619462828516-72c6f6e522f1?w=800&q=80',
    title: 'Shop Street Rhythm',
    description: 'The bustling energy of Galway\'s iconic Shop Street. Printed on archival-quality Hahnemühle paper.',
    price: 120.00,
  },
];
