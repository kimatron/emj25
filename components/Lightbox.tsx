import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Photo } from '../types';

interface LightboxProps {
    photos: Photo[];
    currentIndex: number;
    direction: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    onSelectPhoto: (index: number) => void;
}

const imageVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 20 : -20,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 20 : -20,
        opacity: 0,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
    })
};

const Lightbox: React.FC<LightboxProps> = ({ photos, currentIndex, direction, onClose, onNext, onPrev, onSelectPhoto }) => {
    const photo = photos[currentIndex];
    const isVideo = photo.type === 'video';
    const thumbnailsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (thumbnailsRef.current) {
            const thumbnail = thumbnailsRef.current.children[currentIndex] as HTMLElement;
            if (thumbnail) {
                thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        }
    }, [currentIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                onNext();
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                onPrev();
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onNext, onPrev, onClose]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 sm:p-6 z-10">
                <div className="text-white text-sm font-light">
                    {currentIndex + 1} / {photos.length}
                </div>
                <button
                    className="text-white hover:text-neutral-400 transition-colors"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            {/* Main Image Area */}
            <div 
                className="relative flex-1 flex items-center justify-center px-4 sm:px-16 pt-16 pb-32"
                onClick={onClose}
            >
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    {isVideo ? (
                        <motion.div
                            key={photo.id}
                            className="flex items-center justify-center max-w-full max-h-full"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                className="max-w-full max-h-[calc(100vh-200px)] object-contain"
                                src={photo.videoSrc}
                                controls
                                autoPlay
                                loop
                            />
                        </motion.div>
                    ) : (
                        <motion.img
                            key={photo.id}
                            className="max-w-full max-h-[calc(100vh-200px)] object-contain"
                            src={photo.src}
                            alt={photo.alt}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                            draggable={false}
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* Caption */}
            {photo.caption && (
                <div className="absolute bottom-28 left-0 right-0 px-4 text-center pointer-events-none">
                    <p className="text-white text-sm max-w-2xl mx-auto font-light">{photo.caption}</p>
                </div>
            )}

            {/* Thumbnail Strip */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/95 border-t border-neutral-800 p-4">
                <div
                    ref={thumbnailsRef}
                    className="flex gap-2 overflow-x-auto pb-1"
                    style={{ 
                        scrollbarWidth: 'thin',
                        scrollbarColor: '#404040 transparent'
                    }}
                >
                    {photos.map((thumb, index) => (
                        <button
                            key={thumb.id}
                            onClick={() => onSelectPhoto(index)}
                            className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 overflow-hidden transition-all duration-200 ${
                                index === currentIndex
                                    ? 'ring-1 ring-white opacity-100'
                                    : 'opacity-40 hover:opacity-70'
                            }`}
                        >
                            {thumb.type === 'video' ? (
                                <div className="relative w-full h-full">
                                    <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" draggable={false} />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                            ) : (
                                <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" draggable={false} />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 transition-colors rounded-full"
                onClick={(e) => {
                    e.stopPropagation();
                    onPrev();
                }}
                aria-label="Previous"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>

            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:bg-white/10 transition-colors rounded-full"
                onClick={(e) => {
                    e.stopPropagation();
                    onNext();
                }}
                aria-label="Next"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </motion.div>
    );
};

export default Lightbox;