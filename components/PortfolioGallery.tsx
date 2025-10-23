import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioCategory } from './types';
import Lightbox from './Lightbox';

declare var gsap: any;

const PortfolioGallery: React.FC<{ category: PortfolioCategory; onClose: () => void }> = ({ category, onClose }) => {
    const [lightboxState, setLightboxState] = useState<[number | null, number]>([null, 0]);
    const imageIndex = lightboxState[0];
    const direction = lightboxState[1];
    const galleryRef = useRef<HTMLDivElement>(null);

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

    const selectPhoto = (index: number) => {
        if (imageIndex !== null) {
            const newDirection = index > imageIndex ? 1 : -1;
            setLightboxState([index, newDirection]);
        }
    };

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

    // GSAP scroll animations for gallery items
    useEffect(() => {
        if (typeof gsap === 'undefined' || !galleryRef.current) return;

        const ScrollTrigger = (window as any).ScrollTrigger;
        if (!ScrollTrigger) return;

        gsap.registerPlugin(ScrollTrigger);

        const images = galleryRef.current.querySelectorAll('.gallery-item');

        images.forEach((image: Element, index: number) => {
            gsap.fromTo(
                image,
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                },
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: image,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse',
                    },
                    delay: (index % 4) * 0.05, // Stagger within each row
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        };
    }, [category]);

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
                        {/* Header */}
                        <motion.div
                            className="flex justify-between items-start mb-12"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div>
                                <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl tracking-wider mb-2">
                                    {category.title}
                                </h1>
                                <p className="text-neutral-400 mt-2 max-w-xl text-sm sm:text-base">{category.description}</p>
                                <p className="text-neutral-500 mt-4 text-sm">{category.photos.length} photos</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-neutral-400 hover:text-white transition-colors flex-shrink-0"
                                aria-label="Close gallery"
                                data-cursor-hover
                            >
                                <svg
                                    className="w-8 h-8"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </motion.div>

                        {/* Gallery Grid */}
                        <div ref={galleryRef} className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                            {category.photos.map((photo, index) => (
                                <div
                                    key={photo.id}
                                    className="gallery-item mb-4 break-inside-avoid cursor-pointer group relative overflow-hidden"
                                    onClick={() => openLightbox(index)}
                                    data-cursor-hover
                                >
                                    <div className="relative">
                                        {photo.type === 'video' ? (
                                            <div className="relative">
                                                <img src={photo.src} alt={photo.alt} className="w-full h-auto" loading="lazy" decoding="async" />
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                                        <svg className="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <img
                                                src={photo.src}
                                                alt={photo.alt}
                                                className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        )}
                                        {/* Overlay on hover */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
            <AnimatePresence>
                {imageIndex !== null && (
                    <Lightbox
                        photos={category.photos}
                        currentIndex={imageIndex}
                        direction={direction}
                        onClose={closeLightbox}
                        onNext={() => paginate(1)}
                        onPrev={() => paginate(-1)}
                        onSelectPhoto={selectPhoto}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default PortfolioGallery;
