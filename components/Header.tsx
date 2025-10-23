
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
                    <motion.div
                        className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-white"
                        layoutId="underline"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    />
                )}
            </>
        )}
    </NavLink>
);

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const mobileMenuVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } },
        exit: { opacity: 0, y: -20 }
    };

    const mobileNavItemVariants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-40 p-4 sm:p-6 bg-transparent">
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
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
                        </svg>
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 bg-[#0a0a0a] md:hidden pt-24"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.nav 
                            className="flex flex-col items-center justify-center h-full space-y-8"
                            variants={mobileMenuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <motion.div variants={mobileNavItemVariants}><NavItem to="/" onClick={toggleMenu}>Home</NavItem></motion.div>
                            <motion.div variants={mobileNavItemVariants}><NavItem to="/portfolio" onClick={toggleMenu}>Portfolio</NavItem></motion.div>
                            <motion.div variants={mobileNavItemVariants}><NavItem to="/store" onClick={toggleMenu}>Store</NavItem></motion.div>
                            <motion.div variants={mobileNavItemVariants}><NavItem to="/about" onClick={toggleMenu}>About</NavItem></motion.div>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
