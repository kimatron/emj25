import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

// Add your hero images here
const HERO_IMAGES = [
    
    '/images/hero/hero1.jpg',
    'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80',
    '/images/hero/hero2.jpg',
    '/images/hero/landing.jpg',
    '/images/hero/landing2.jpg',
];

const Home: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const textLines = ["Emilija", "Jefremova"];
    const subText = "Photographer & Visual Artist";

    useEffect(() => {
        const timer = setInterval(() => {
            setDirection(1);
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 6000); // 6 seconds per image

        return () => clearInterval(timer);
    }, []);

    const containerVariants: Variants = {
        animate: {
            transition: {
                staggerChildren: 0.3
            }
        }
    };

    const lineVariants: Variants = {
        initial: { y: "100%", opacity: 0 },
        animate: { y: "0%", opacity: 1, transition: { duration: 1, ease: [0.6, 0.01, 0.05, 0.95] } }
    };

    const letterVariants: Variants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 }
    };

    const handleDotClick = (index: number) => {
        setDirection(index > currentImageIndex ? 1 : -1);
        setCurrentImageIndex(index);
    };

    return (
        <PageTransition>
            <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                {/* Gradient overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 z-10"></div>

                {/* Background image slider with Ken Burns effect */}
                <div className="absolute inset-0 w-full h-full">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentImageIndex}
                            custom={direction}
                            className="absolute inset-0"
                            initial={{ 
                                opacity: 0,
                                scale: 1.15,
                                filter: 'blur(10px)'
                            }}
                            animate={{ 
                                opacity: 1,
                                scale: 1,
                                filter: 'blur(0px)'
                            }}
                            exit={{ 
                                opacity: 0,
                                scale: 0.95,
                                filter: 'blur(5px)'
                            }}
                            transition={{ 
                                duration: 1.2,
                                ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                        >
                            <motion.img
                                src={HERO_IMAGES[currentImageIndex]}
                                alt="Hero background"
                                className="w-full h-full object-cover"
                                animate={{
                                    scale: [1, 1.08],
                                }}
                                transition={{
                                    duration: 6,
                                    ease: 'linear'
                                }}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Content */}
                <motion.div 
                    className="relative z-20 text-center text-white px-4"
                    variants={containerVariants}
                    initial="initial"
                    animate="animate"
                >
                    <h1 className="font-heading text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[15rem] leading-none tracking-tighter">
                        {textLines.map((line, index) => (
                            <div key={index} className="overflow-hidden">
                                <motion.div variants={lineVariants}>
                                    {line}
                                </motion.div>
                            </div>
                        ))}
                    </h1>
                    <motion.p 
                        className="text-lg md:text-xl tracking-widest uppercase mt-4"
                        initial="initial"
                        animate="animate"
                        transition={{ delayChildren: 1, staggerChildren: 0.05 }}
                    >
                        {subText.split('').map((char, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block">
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 1.5, duration: 1 } }}
                    >
                        <Link 
                            to="/portfolio" 
                            className="inline-block mt-8 px-8 py-3 border border-white text-white text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
                        >
                            View Work
                        </Link>
                    </motion.div>
                </motion.div>

                {/* Minimalist slider indicators - bottom center */}
                <motion.div 
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex space-x-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                >
                    {HERO_IMAGES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleDotClick(index)}
                            className="group relative"
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${
                                index === currentImageIndex 
                                    ? 'bg-white scale-125' 
                                    : 'bg-white/40 hover:bg-white/70'
                            }`} />
                            {index === currentImageIndex && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-white/50"
                                    initial={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: 2, opacity: 0 }}
                                    transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-white/60 text-xs tracking-widest"
                    >
                        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Home;