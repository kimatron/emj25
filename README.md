# EMJCAMERA - Photography Portfolio

A modern, animated photography portfolio and print store for Galway-based photographer Emilija Jefremova.

## Features

- **Animated Landing Page** with video background and staggered text animations
- **Portfolio Gallery** with categories (Live Music, Theatre, Landscapes, Weddings, Drone, Videography)
- **Lightbox Viewer** with smooth transitions and keyboard navigation
- **Print Store** for purchasing fine art prints
- **Custom Animated Cursor** (desktop only)
- **Responsive Design** with mobile menu
- **Page Transitions** using Framer Motion

## Tech Stack

- **React 19** with TypeScript
- **React Router** for navigation
- **Framer Motion** for animations
- **Tailwind CSS** for styling
- **GSAP** for cursor animations
- **Vite** for build tooling

## Project Structure

```
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── AnimatedTitle.tsx
│   ├── Lightbox.tsx
│   └── PortfolioGallery.tsx
├── pages/              # Route pages
│   ├── Home.tsx
│   ├── Portfolio.tsx
│   ├── Store.tsx
│   └── About.tsx
├── types.ts            # TypeScript interfaces
├── constants.ts        # Portfolio data and prints
└── App.tsx            # Main app component
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Customization

- Update portfolio images and categories in `constants.ts`
- Modify contact info in `Footer.tsx`
- Replace placeholder images with actual photography
- Update video background in `Home.tsx`

## Contact

- **Email:** INFO@EMJCAMERA.COM
- **Phone:** +353 86 222 6119
- **Location:** Galway, Ireland