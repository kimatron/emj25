// src/data/blogPosts.ts

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  date: string;
  readTime: number;
  featured: boolean;
  content: BlogContentBlock[];
}

export interface BlogContentBlock {
  type: 'text' | 'image' | 'quote' | 'heading';
  content: string;
  imageCaption?: string;
  imageSize?: 'full' | 'medium' | 'small';
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'isolation-portraits-covid-galway',
    title: 'Isolation Portraits: Capturing Galway Through COVID-19',
    excerpt: 'During the darkest days of lockdown, I documented the resilience and creativity of Galway residents through my lens, capturing people with their newfound hobbies outside their homes.',
    coverImage: '/images/blog/isolation-portraits.jpg',
    category: 'Documentary',
    date: '2020-05-15',
    readTime: 8,
    featured: true,
    content: [
      {
        type: 'text',
        content: 'March 2020 changed everything. As Ireland went into lockdown, the streets fell silent, and suddenly, everyone was confined to their homes. But even in isolation, humanity found ways to adapt, create, and connect.'
      },
      {
        type: 'text',
        content: 'I started the Isolation Portraits project to document this unprecedented moment in Galway\'s history. Armed with my camera and staying within the 2km travel limit, I photographed neighbors, families, and individuals outside their homes—each with something that represented their new reality.'
      },
      {
        type: 'heading',
        content: 'New Hobbies, New Stories'
      },
      {
        type: 'text',
        content: 'There was the woman who took up painting after 60 years, now creating vibrant landscapes from her kitchen window. The father and son who built a vegetable garden in their driveway. The teenager learning guitar, performing concerts for an audience of potted plants.'
      },
      {
        type: 'image',
        content: '/images/blog/isolation-1.jpg',
        imageCaption: 'A Salthill family with their lockdown project: homemade bread',
        imageSize: 'full'
      },
      {
        type: 'text',
        content: 'Each portrait told a story of resilience. These weren\'t just photos—they were time capsules of a moment when the world stood still, but spirit didn\'t.'
      },
      {
        type: 'quote',
        content: 'In isolation, we found connection. Through distance, we discovered closeness.'
      },
      {
        type: 'text',
        content: 'The project grew beyond my neighborhood. People started reaching out, wanting to be part of this historical record. Over three months, I photographed over 100 Galway residents, each maintaining safe distance while sharing their COVID stories.'
      },
      {
        type: 'heading',
        content: 'Technical Challenges'
      },
      {
        type: 'text',
        content: 'Shooting portraits while maintaining 2 meters distance required adaptation. I relied heavily on my 85mm lens and learned to direct poses from afar. Natural light became my only assistant—no reflectors, no assistants, just me, my subjects, and the Irish weather.'
      },
      {
        type: 'text',
        content: 'Looking back, this project represents one of the most meaningful bodies of work I\'ve created. It\'s a reminder that even in our darkest times, art has the power to document, to heal, and to connect us.'
      }
    ]
  },
  {
    id: '2',
    slug: 'catherine-connolly-presidential-campaign',
    title: 'Following Catherine Connolly: Documenting a Presidential Campaign',
    excerpt: 'An intimate look behind the scenes of Catherine Connolly\'s presidential campaign, capturing the determination, hope, and grassroots spirit of Irish politics.',
    coverImage: '/images/blog/connolly-campaign.jpg',
    category: 'Political Photography',
    date: '2024-09-20',
    readTime: 6,
    featured: true,
    content: [
      {
        type: 'text',
        content: 'When Catherine Connolly announced her candidacy for President of Ireland, I knew this would be a historic campaign to document. As a Galway TD known for her independence and unwavering principles, her journey represented something rare in modern politics: authenticity.'
      },
      {
        type: 'text',
        content: 'Over several months, I followed Catherine across Ireland—from town hall meetings in rural villages to packed rallies in Dublin. My goal wasn\'t just to capture the public moments, but the quiet ones in between: the early morning strategy sessions, the handwritten speech notes, the exhausted but determined face after a 14-hour campaign day.'
      },
      {
        type: 'image',
        content: '/images/blog/connolly-1.jpg',
        imageCaption: 'Catherine speaking at a community gathering in Connemara',
        imageSize: 'full'
      },
      {
        type: 'heading',
        content: 'Grassroots Politics'
      },
      {
        type: 'text',
        content: 'What struck me most was the grassroots nature of the campaign. No slick PR teams or corporate sponsors—just passionate volunteers, home-printed posters, and countless cups of tea in community centers across the country.'
      },
      {
        type: 'quote',
        content: 'Real change doesn\'t come from the top down. It comes from communities standing together. - Catherine Connolly'
      },
      {
        type: 'text',
        content: 'Photographing a political campaign taught me patience and anticipation. The best moments weren\'t planned—they were the unguarded smiles between speeches, the genuine connections with voters, the quiet strength before stepping onto a stage.'
      },
      {
        type: 'heading',
        content: 'Technical Approach'
      },
      {
        type: 'text',
        content: 'I shot primarily with available light, using fast prime lenses to capture candid moments without flash. Indoor venues presented challenges—low light, mixed color temperatures—but these constraints forced me to be creative and authentic.'
      },
      {
        type: 'text',
        content: 'This project reinforced why I love documentary photography: the privilege of witnessing history in the making, one frame at a time.'
      }
    ]
  },
  {
    id: '3',
    slug: 'macnas-parade-newt-con-mor',
    title: 'Inside Macnas: Photographing The Newt, Con Mor, and Epic Spectacle',
    excerpt: 'Behind the scenes with Galway\'s legendary street theatre company, documenting the magic and madness of creating Ireland\'s most spectacular parades.',
    coverImage: '/images/blog/macnas-hero.jpg',
    category: 'Event Photography',
    date: '2025-01-10',
    readTime: 9,
    featured: true,
    content: [
      {
        type: 'text',
        content: 'Macnas isn\'t just a parade—it\'s a moving work of art, a celebration of Irish creativity, and organized chaos on a grand scale. Having photographed multiple Macnas productions, including The Newt, Con Mor, and the latest 2025 spectacle, I\'ve learned that capturing this event requires equal parts preparation, instinct, and luck.'
      },
      {
        type: 'heading',
        content: 'The Challenge'
      },
      {
        type: 'text',
        content: 'Imagine 20-foot tall puppets moving through crowded streets at dusk. Fire performers spinning flames. Drummers creating earthquake rhythms. Thousands of spectators pressed against barriers. And you, trying to freeze these moments in perfect clarity.'
      },
      {
        type: 'image',
        content: '/images/blog/macnas-1.jpg',
        imageCaption: 'The towering Con Mor puppet dominates the Galway skyline',
        imageSize: 'full'
      },
      {
        type: 'text',
        content: 'The first time I photographed Macnas, I made every rookie mistake: wrong position, too slow shutter speed for the movement, missed the key moments because I was checking my LCD screen. But with each year, I refined my approach.'
      },
      {
        type: 'heading',
        content: 'Technical Mastery'
      },
      {
        type: 'text',
        content: 'Shooting Macnas requires fast glass—my 24-70mm f/2.8 is essential. ISO needs to be pushed high (3200-6400) as twilight fades. And forget tripods; this is all handheld, reactive shooting.'
      },
      {
        type: 'quote',
        content: 'In street theatre photography, anticipation beats reaction. Know the route, predict the moments, position yourself in the light.'
      },
      {
        type: 'text',
        content: 'The 2025 production pushed boundaries even further. New puppetry techniques, synchronized drone light shows, and a narrative thread that required following multiple elements simultaneously. I shot over 2,000 frames that night and kept maybe 50.'
      },
      {
        type: 'image',
        content: '/images/blog/macnas-2.jpg',
        imageCaption: 'Fire performers create trails of light through the crowd',
        imageSize: 'full'
      },
      {
        type: 'heading',
        content: 'Behind the Scenes Access'
      },
      {
        type: 'text',
        content: 'Working with Macnas also means documenting the preparation—the warehouse rehearsals, the puppet construction, the costume fittings. These behind-the-scenes moments often tell more compelling stories than the parade itself.'
      },
      {
        type: 'text',
        content: 'Macnas remains one of my favorite subjects: unpredictable, visually stunning, and deeply rooted in Irish theatrical tradition. Every parade is different, every year brings new challenges, and I wouldn\'t have it any other way.'
      }
    ]
  },
  {
    id: '4',
    slug: 'druid-theatre-galway',
    title: 'In the Wings: Photographing Druid Theatre',
    excerpt: 'Capturing the drama, intensity, and raw emotion of Galway\'s world-renowned Druid Theatre Company from backstage to center stage.',
    coverImage: '/images/blog/druid-hero.jpg',
    category: 'Theatre Photography',
    date: '2024-11-05',
    readTime: 7,
    featured: false,
    content: [
      {
        type: 'text',
        content: 'Theatre photography is a unique discipline—you\'re documenting live performance in challenging light conditions, with no second chances and no room for mistakes. Working with Druid Theatre in Galway has been a masterclass in this art form.'
      },
      {
        type: 'text',
        content: 'Druid isn\'t just any theatre company. With international acclaim and productions that tour globally, the pressure to deliver exceptional images is intense. These photos will be in press kits, promotional materials, and reviews that reach worldwide audiences.'
      },
      {
        type: 'heading',
        content: 'The Technical Challenge'
      },
      {
        type: 'text',
        content: 'Stage lighting changes by the second. One moment, a tight spotlight on an actor\'s face. Next, a dramatic backlit silhouette. Then complete darkness punctuated by a single candle. Manual exposure control, high ISO, and absolute silence—no motor drives, no chimping.'
      },
      {
        type: 'image',
        content: '/images/blog/druid-1.jpg',
        imageCaption: 'A powerful moment from a Druid production',
        imageSize: 'full'
      },
      {
        type: 'quote',
        content: 'In theatre photography, you don\'t just capture performances—you capture the energy between actors, the tension in silence, the electricity of live drama.'
      },
      {
        type: 'text',
        content: 'I typically shoot from the dress rehearsal, moving between a few pre-approved positions. The goal is to become invisible—to document without disrupting. It\'s about anticipating the dramatic beats, knowing the script, understanding when the powerful moments will occur.'
      },
      {
        type: 'text',
        content: 'Beyond performance photography, I also document backstage preparation: actors applying makeup, last-minute script reviews, the nervous energy before curtain call. These images provide context and humanity to the final production shots.'
      },
      {
        type: 'text',
        content: 'Working with Druid has elevated my technical skills and deepened my appreciation for live performance. Every show is unique, every actor brings different energy, and capturing that ephemeral magic is what keeps me coming back.'
      }
    ]
  },
  {
    id: '5',
    slug: 'sigur-ros-press-pass-europe-tour',
    title: 'Photographing Sigur Rós: From Press Pass to Fan',
    excerpt: 'The surreal experience of shooting Sigur Rós across France, Dublin, and Copenhagen—both as a professional photographer with backstage access and as a devoted fan in the crowd.',
    coverImage: '/images/blog/sigur-ros-hero.jpg',
    category: 'Music Photography',
    date: '2024-08-22',
    readTime: 10,
    featured: true,
    content: [
      {
        type: 'text',
        content: 'Sigur Rós isn\'t just my favorite band—they\'re the reason I first picked up a camera seriously. Their atmospheric soundscapes and ethereal visuals inspired me to think about photography as an art form, not just documentation. So when I secured press credentials to shoot their European tour, it felt like a dream.'
      },
      {
        type: 'text',
        content: 'The tour took me to France, Dublin, and Copenhagen. At some venues, I had full photo pit access with my press pass. At others, I was just another fan in the crowd, camera-less, experiencing the music purely as a listener. This duality gave me a unique perspective on both roles.'
      },
      {
        type: 'heading',
        content: 'Behind the Lens'
      },
      {
        type: 'text',
        content: 'Concert photography has strict rules: first three songs, no flash, shoot from the pit. With Sigur Rós\'s heavy use of fog, dramatic lighting, and slow-building crescendos, those three songs required perfect timing.'
      },
      {
        type: 'image',
        content: '/images/blog/sigur-ros-1.jpg',
        imageCaption: 'Jónsi bathed in ethereal blue light during the Paris show',
        imageSize: 'full'
      },
      {
        type: 'text',
        content: 'I shot wide open (f/2.8) with high ISO (3200-6400), balancing sharpness against the motion of performance. The fog created beautiful atmosphere but destroyed autofocus. Manual focus, zone focusing, and anticipation became essential.'
      },
      {
        type: 'quote',
        content: 'The best concert photos capture not just what you see, but what you feel. The energy, the emotion, the transcendence.'
      },
      {
        type: 'heading',
        content: 'From Press Pit to Front Row'
      },
      {
        type: 'text',
        content: 'What surprised me was how different the experience felt without a camera. In Dublin, I attended as a regular fan—no press pass, no equipment, no professional obligation. Just me and the music.'
      },
      {
        type: 'text',
        content: 'Without the lens between us, I noticed details I\'d missed while shooting: the subtle interplay between band members, the way Jónsi\'s breath created patterns in the stage fog, the collective experience of 5,000 people breathing in unison.'
      },
      {
        type: 'image',
        content: '/images/blog/sigur-ros-2.jpg',
        imageCaption: 'The full band silhouetted against massive video projections in Copenhagen',
        imageSize: 'full'
      },
      {
        type: 'heading',
        content: 'Different Angles, Different Stories'
      },
      {
        type: 'text',
        content: 'From the photo pit, I captured intimate close-ups—sweat on guitar strings, emotion on faces, technical perfection. From the audience, I experienced the show as it was meant to be: immersive, overwhelming, spiritual.'
      },
      {
        type: 'text',
        content: 'Both perspectives are valuable. The press photos showcase the artistry and performance. The memory of attending as a fan reminds me why we photograph music in the first place: to capture the feeling that words can\'t describe.'
      },
      {
        type: 'text',
        content: 'This tour taught me to balance professional detachment with genuine emotion. Yes, I\'m there to deliver publication-quality images. But I\'m also a human being moved by art. The best music photography honors both roles.'
      }
    ]
  },
  {
    id: '6',
    slug: 'drone-photography-dji-pro',
    title: 'Taking Flight: Mastering Drone Photography with DJI Pro',
    excerpt: 'Technical insights and creative approaches to aerial photography using professional DJI drones, from landscape captures to unique event perspectives.',
    coverImage: '/images/blog/drone-hero.jpg',
    category: 'Technical',
    date: '2024-12-03',
    readTime: 8,
    featured: false,
    content: [
      {
        type: 'text',
        content: 'Drone photography opened an entirely new dimension to my work. Suddenly, I could capture perspectives previously reserved for helicopters or tall buildings. The DJI Pro series made this accessible, reliable, and professional.'
      },
      {
        type: 'heading',
        content: 'Why Drones Changed Everything'
      },
      {
        type: 'text',
        content: 'For landscape photography in Ireland, drones are transformative. The Wild Atlantic Way looks stunning from ground level—but from 100 meters up? It\'s otherworldly. Cliffs, coastlines, ancient ruins, all reveal patterns and compositions invisible from below.'
      },
      {
        type: 'image',
        content: '/images/blog/drone-1.jpg',
        imageCaption: 'Aerial view of the Cliffs of Moher at golden hour',
        imageSize: 'full'
      },
      {
        type: 'text',
        content: 'Event photography also benefits. Weddings with aerial shots show venue scale and beauty. Corporate events gain professional polish. Even street photography takes on new meaning when you can reveal crowd patterns and urban geometry.'
      },
      {
        type: 'heading',
        content: 'Technical Considerations'
      },
      {
        type: 'text',
        content: 'Flying professionally requires more than pushing the joystick. Irish weather is unforgiving—wind, rain, and sudden changes demand respect. I\'ve learned to read weather patterns, understand wind limits, and always have backup batteries (they drain fast in cold).'
      },
      {
        type: 'text',
        content: 'The DJI Pro\'s Hasselblad camera delivers excellent quality, but it\'s not a replacement for my ground cameras—it\'s a complement. I shoot in RAW, expose for highlights (the sky is always brighter up there), and bracket exposures for HDR when needed.'
      },
      {
        type: 'quote',
        content: 'Drone photography isn\'t about flying high—it\'s about finding the angle that tells the story no one else has seen.'
      },
      {
        type: 'heading',
        content: 'Composition from Above'
      },
      {
        type: 'text',
        content: 'Aerial composition follows different rules. Leading lines become geometric patterns. The rule of thirds still applies, but the horizon can be tilted for dynamic effect. Shadows and light take on new importance—time of day matters even more.'
      },
      {
        type: 'image',
        content: '/images/blog/drone-2.jpg',
        imageCaption: 'Top-down shot of Galway docks revealing symmetrical patterns',
        imageSize: 'full'
      },
      {
        type: 'text',
        content: 'I particularly love "straight down" shots—removing horizon entirely to create abstract, almost graphic images. Roads become lines. Buildings become shapes. Humans become dots in grand landscapes.'
      },
      {
        type: 'heading',
        content: 'Legal and Ethical Flying'
      },
      {
        type: 'text',
        content: 'Professional drone work requires registration, insurance, and adherence to Irish Aviation Authority regulations. I always check local restrictions, respect privacy, and prioritize safety over any shot. No photograph is worth risking people or property.'
      },
      {
        type: 'text',
        content: 'Drone photography has become an essential tool in my kit. It doesn\'t replace traditional photography—it expands what\'s possible. And in a visually saturated world, that fresh perspective is invaluable.'
      }
    ]
  }
];

// Helper function to get featured posts
export const getFeaturedPosts = () => blogPosts.filter(post => post.featured);

// Helper function to get posts by category
export const getPostsByCategory = (category: string) => 
  blogPosts.filter(post => post.category === category);

// Helper function to get post by slug
export const getPostBySlug = (slug: string) => 
  blogPosts.find(post => post.slug === slug);

// Helper function to get related posts
export const getRelatedPosts = (currentPost: BlogPost, limit = 3) => {
  return blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      (post.category === currentPost.category || post.featured)
    )
    .slice(0, limit);
};

// All categories
export const categories = [
  'All',
  'Documentary',
  'Political Photography',
  'Event Photography',
  'Theatre Photography',
  'Music Photography',
  'Technical'
];