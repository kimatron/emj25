import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const Home: React.FC = () => {
    const textLines = ["Emilija", "Jefremova"];
    const subText = "Photographer & Visual Artist";

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
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80"
                >
                    {/* Placeholder video - replace with actual reel */}
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-a-close-up-of-a-woman-in-a-field-of-flowers-42253-large.mp4" type="video/mp4" />
                </video>

                <motion.div 
                    className="relative z-20 text-center text-white"
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
                        <Link to="/portfolio" className="inline-block mt-8 px-8 py-3 border-2 border-white text-white text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black">
                            View Work
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </PageTransition>
    );
};

export default Home;
