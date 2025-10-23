import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioCategory } from '../types';
import Lightbox from './Lightbox';

const PortfolioGallery: React.FC<{ category: PortfolioCategory; onClose: () => void }> = ({ category, onClose }) => {
    const [lightboxState, setLightboxState] = useState<[number | null, number]>([null, 0]);
    const imageIndex = lightboxState[0];
    const direction = lightboxState[1];

    const openLightbox = (index: number) => {
        setLightboxState([index, 0]);
    };
    
    const closeLightbox = () => {
        setLightboxState([null, 0]);
    };

    const paginate = (newDirection: number) => {
        if (imageIndex !== null) {
            let newIndex = imageIndex + newDirection;
            if (newIndex < 0) {
                newIndex = category.photos.length - 1;
            } else if (newIndex >= category.photos.length) {
                newIndex = 0;
            }
            setLightboxState([newIndex, newDirection]);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeLightbox();
            }
            if (e.key === 'ArrowRight') paginate(1);
            if (e.key === 'ArrowLeft') paginate(-1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [imageIndex]);
    
    useEffect(() => {
        if (imageIndex !== null) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [imageIndex]);


    return (
        <>
            <motion.div
                key="gallery-backdrop"
                className="fixed inset-0 bg-black bg-opacity-80 z-50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />
            <motion.div
                key="gallery-content"
                className="fixed inset-0 z-50 overflow-y-auto"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                exit={{ y: '100%' }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                <div className="relative min-h-screen bg-[#0a0a0a] px-4 sm:px-6 py-24 sm:py-32">
                    <div className="container mx-auto">
                        <div className="flex justify-between items-start mb-12">
                            <div>
                                <h1 className="font-heading text-6xl sm:text-8xl tracking-wider">{category.title}</h1>
                                <p className="text-neutral-400 mt-2 max-w-xl">{category.description}</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-white transition-colors"
                                aria-label="Close gallery"
                                data-cursor-hover
                            >
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>

                        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                            {category.photos.map((photo, index) => (
                                <motion.div
                                    key={photo.id}
                                    className="mb-4 break-inside-avoid cursor-pointer"
                                    onClick={() => openLightbox(index)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    data-cursor-hover
                                >
                                    <img 
                                        src={photo.src} 
                                        alt={photo.alt} 
                                        className="w-full h-auto" 
                                        loading="lazy" 
                                        decoding="async" 
                                    />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {imageIndex !== null && (
                    <Lightbox
                        photo={category.photos[imageIndex]}
                        direction={direction}
                        onClose={closeLightbox}
                        onNext={() => paginate(1)}
                        onPrev={() => paginate(-1)}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioGallery;