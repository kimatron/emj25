import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import Store from './pages/Store';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const AnimatedCursor = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => setIsHovering(false);

        window.addEventListener('mousemove', handleMouseMove);

        const updateHoverListeners = () => {
            const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');
            hoverElements.forEach(el => {
                el.addEventListener('mouseenter', handleMouseEnter);
                el.addEventListener('mouseleave', handleMouseLeave);
            });
        };

        updateHoverListeners();
        const interval = setInterval(updateHoverListeners, 500);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(interval);
            const hoverElements = document.querySelectorAll('a, button, [data-cursor-hover]');
            hoverElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-white pointer-events-none z-[100] hidden md:block"
            style={{
                left: position.x,
                top: position.y,
                transform: 'translate(-50%, -50%)',
            }}
            animate={{
                scale: isHovering ? 1.5 : 1,
                backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
        />
    );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (isAdminRoute) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <main className="flex-grow pb-24">
                {children}
            </main>
            <Footer />
        </>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
                
                {/* Admin Routes */}
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
  return (
    <HashRouter>
        <AnimatedCursor />
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 flex flex-col">
            <MainLayout>
                <AnimatedRoutes />
            </MainLayout>
        </div>
    </HashRouter>
  );
}

export default App;