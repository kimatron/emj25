import React, { useState, useEffect, useRef } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Header from './src/components/Header';
import Footer from './src/components/Footer';
import Home from './src/pages/Home';
import Portfolio from './src/pages/Portfolio';
import Store from './src/pages/Store';
import About from './src/pages/About';
import AdminLogin from './src/pages/AdminLogin';
import AdminDashboard from './src/pages/AdminDashboard';
import ClientLogin from './src/pages/ClientLogin';
import ClientPortal from './src/pages/ClientPortal';

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
        <>
            <div
                ref={cursorRef}
                className="hidden md:block fixed pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <motion.div
                    className="w-6 h-6 border-2 border-white rounded-full"
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
            </div>
        </>
    );
};

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin');
    const isClientRoute = location.pathname.startsWith('/client') || location.pathname.startsWith('/gallery');

    if (isAdminRoute || isClientRoute) {
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

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Routes location={location}>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    
                    {/* Client Portal Routes */}
                    <Route path="/client" element={<ClientLogin />} />
                    <Route path="/gallery/:token" element={<ClientPortal />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Routes>
            </motion.div>
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