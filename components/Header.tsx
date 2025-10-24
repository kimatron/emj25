import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NavItem: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `relative text-xl md:text-sm uppercase tracking-widest transition-colors duration-300 hover:text-white ${isActive ? 'text-white' : 'text-neutral-400'}`
        }
        onClick={onClick}
    >
        {({ isActive }) => (
            <>
                {children}
                {isActive && (
                    <span className="absolute bottom-[-4px] left-0 right-0 h-[1px] bg-white" />
                )}
            </>
        )}
    </NavLink>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    // Detect scroll for background
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scroll when mobile menu open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <motion.header 
            className={`fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 transition-all duration-300 ${
                scrolled ? 'bg-[#0a0a0a]/95 backdrop-blur-md' : 'bg-transparent'
            }`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex justify-between items-center relative z-50">
                {/* Logo */}
                <NavLink to="/" className="relative z-50 flex items-center">
                    <img 
                        src="/emjlogo-removebg-preview.png" 
                        alt="EMJ Camera" 
                        className="h-12 sm:h-14 w-auto"
                    />
                </NavLink>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-8">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/portfolio">Portfolio</NavItem>
                    <NavItem to="/store">Store</NavItem>
                    <NavItem to="/about">About</NavItem>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden relative z-50">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - HIGHER Z-INDEX */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#0a0a0a] md:hidden pt-24 z-[60]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <nav className="flex flex-col items-center justify-center h-full space-y-8">
                            <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
                            <NavItem to="/portfolio" onClick={toggleMenu}>Portfolio</NavItem>
                            <NavItem to="/store" onClick={toggleMenu}>Store</NavItem>
                            <NavItem to="/about" onClick={toggleMenu}>About</NavItem>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Header;