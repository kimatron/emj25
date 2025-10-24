import React from 'react';
import { motion, Variants } from 'framer-motion';

interface AnimatedTitleProps {
    text: string;
    className?: string;
}

const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.04,
        },
    },
};

const charVariants: Variants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
        y: '0%',
        opacity: 1,
        transition: {
            duration: 0.8,
            ease: [0.2, 0.65, 0.3, 0.9],
        },
    },
};

const AnimatedTitle: React.FC<AnimatedTitleProps> = ({ text, className }) => {
    const words = text.split(' ');

    return (
        <motion.h1
            className={`font-heading tracking-wider ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            aria-label={text}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
                    {word.split('').map((char, charIndex) => (
                        <span key={charIndex} className="inline-block overflow-hidden align-bottom">
                            <motion.span
                                className="inline-block"
                                variants={charVariants}
                            >
                                {char}
                            </motion.span>
                        </span>
                    ))}
                </span>
            ))}
        </motion.h1>
    );
};

export default AnimatedTitle;
