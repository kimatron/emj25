import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Store from './pages/Store';
import About from './pages/About';

declare var gsap: any;

const AnimatedCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (typeof gsap === 'undefined') {
            console.warn("GSAP not loaded. Cursor animations will be disabled.");
            return;
        }

        const cursor = cursorRef.current;
        if (!cursor) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
            xTo(e.clientX);
            yTo(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            hoverElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-50 hidden md:block"
            animate={{
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
  return (
    <HashRouter>
        <AnimatedCursor />
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 flex flex-col">
            <Header />
            <main className="flex-grow pb-24">
                <AnimatedRoutes />
            </main>
            <Footer />
        </div>
    </HashRouter>
  );
}

export default App;