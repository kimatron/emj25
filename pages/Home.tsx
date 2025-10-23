import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

// Add your hero images here
const HERO_IMAGES = [
    '/images/hero/landing.jpg',
    '/images/hero/landing2.jpg',
    '/images/hero/people1.jpg',
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1920&q=80',
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
];

// Or use your own images:
// const HERO_IMAGES = [
//     '/images/hero/image1.jpg',
//     '/images/hero/image2.jpg',
//     '/images/hero/image3.jpg',
//     '/images/hero/image4.jpg',
//     '/images/hero/image5.jpg',
// ];

const Home: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const textLines = ["Emilija", "Jefremova"];
    const subText = "Photographer & Visual Artist";

    // Auto-advance slider every 5 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);

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

    return (
        <PageTransition>
            <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                {/* Background image slider */}
                <div className="absolute inset-0 w-full h-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentImageIndex}
                            className="absolute inset-0"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <img
                                src={HERO_IMAGES[currentImageIndex]}
                                alt="Hero background"
                                className="w-full h-full object-cover"
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

                {/* Slider indicators */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
                    {HERO_IMAGES.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentImageIndex 
                                    ? 'bg-white w-8' 
                                    : 'bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress bar (optional) */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <motion.div
                        className="h-full bg-white"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ 
                            duration: 5, 
                            ease: 'linear',
                            repeat: Infinity
                        }}
                        key={currentImageIndex}
                    />
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;