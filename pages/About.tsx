
import React from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedTitle from '../components/AnimatedTitle';

const About: React.FC = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img 
                            src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?w=800&q=80" 
                            alt="Emilija Jefremova" 
                            className="object-cover w-full h-auto"
                        />
                    </motion.div>
                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <AnimatedTitle text="About Me" className="text-6xl sm:text-8xl" />
                        <h2 className="text-2xl font-medium mt-2 text-neutral-300">Emilija Jefremova</h2>
                        <div className="prose prose-invert mt-6 text-neutral-300 max-w-none">
                            <p>
                                Originally from Lithuania and now based in the vibrant city of Galway, Ireland, I am a passionate photographer with a keen eye for capturing fleeting moments and transforming them into lasting visual narratives. My work is a blend of documentary honesty and artistic expression.
                            </p>
                            <p>
                                I specialize in a wide range of photography, including theatre, live music, corporate events, and evocative landscapes. My goal is to tell a story with every shot, whether it's the raw energy of a concert, the dramatic tension of a stage play, or the serene beauty of the Irish countryside.
                            </p>
                             <p>
                                I am available for commissions, collaborations, and grant-funded projects. Let's create something beautiful together.
                            </p>
                        </div>
                        <a 
                            href="mailto:hello@emjcamera.com"
                            className="inline-block mt-8 px-8 py-3 border-2 border-white text-white text-lg font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
                            data-cursor-hover
                        >
                            Get In Touch
                        </a>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default About;
