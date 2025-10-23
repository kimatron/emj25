
import React from 'react';
import { motion } from 'framer-motion';
import { PRINTS } from '../constants';
import { Print } from '../types';
import PageTransition from '../components/PageTransition';
import AnimatedTitle from '../components/AnimatedTitle';

const PrintCard: React.FC<{ print: Print, index: number }> = ({ print, index }) => {
    return (
        <motion.div 
            className="group"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="overflow-hidden mb-4">
                <img 
                    src={print.src} 
                    alt={print.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                    decoding="async"
                />
            </div>
            <h3 className="text-xl font-medium tracking-wide">{print.title}</h3>
            <p className="text-neutral-400 mt-1 mb-2 text-sm">{print.description}</p>
            <div className="flex justify-between items-center">
                <p className="text-lg font-semibold">€{print.price.toFixed(2)}</p>
                <button 
                    className="px-6 py-2 border border-neutral-600 text-neutral-300 hover:bg-white hover:text-black transition-colors duration-300"
                    data-cursor-hover
                >
                    Add to Cart
                </button>
            </div>
        </motion.div>
    );
};

const Store: React.FC = () => {
    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div 
                    className="text-center mb-16 sm:mb-24"
                >
                    <AnimatedTitle text="Print Store" className="text-6xl sm:text-8xl md:text-9xl" />
                    <motion.p 
                        className="max-w-2xl mx-auto mt-4 text-neutral-400"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        A curated selection of fine art prints. Each photograph is printed on high-quality, archival paper to ensure longevity and vibrant colors.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {PRINTS.map((print, index) => (
                        <PrintCard key={print.id} print={print} index={index} />
                    ))}
                </div>
            </div>
        </PageTransition>
    );
};

export default Store;
