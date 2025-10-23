import React, { useState } from 'react';
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

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 bg-[#0a0a0a]/80 backdrop-blur-sm">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink to="/" className="text-3xl font-heading tracking-wider z-50">
                    EMJCAMERA
                </NavLink>
                <nav className="hidden md:flex items-center space-x-8">
                    <NavItem to="/">Home</NavItem>
                    <NavItem to="/portfolio">Portfolio</NavItem>
                    <NavItem to="/store">Store</NavItem>
                    <NavItem to="/about">About</NavItem>
                </nav>
                <div className="md:hidden z-50">
                    <button onClick={toggleMenu} className="focus:outline-none">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#0a0a0a] md:hidden pt-24 z-40"
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
        </header>
    );
};

export default Header;