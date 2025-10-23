import React from 'react';
// FIX: Import `Variants` type from framer-motion to correctly type the variants object.
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Photo } from '../types';

interface LightboxProps {
    photo: Photo;
    direction: number;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

// FIX: Explicitly type `imageVariants` with `Variants` to prevent TypeScript from widening the `ease` property to a generic `string`.
const imageVariants: Variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 30 : -30,
        opacity: 0,
        scale: 0.98
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 30 : -30,
        opacity: 0,
        scale: 0.98,
        transition: { duration: 0.4, ease: 'easeIn' }
    })
};

const Lightbox: React.FC<LightboxProps> = ({ photo, direction, onClose, onNext, onPrev }) => {
    
    const isVideo = photo.type === 'video';

    return (
        <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-90"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Main Media Display */}
            <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <AnimatePresence initial={false} custom={direction}>
                    {isVideo ? (
                         <motion.div
                            key={photo.id}
                            className="w-full h-full flex items-center justify-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                        >
                            <video
                                className="object-contain max-w-[90vw] max-h-[80vh]"
                                src={photo.videoSrc}
                                controls
                                autoPlay
                                loop
                            />
                        </motion.div>
                    ) : (
                        <motion.img
                            key={photo.id}
                            className="absolute object-contain max-w-[90vw] max-h-[90vh]"
                            src={photo.src}
                            alt={photo.alt}
                            custom={direction}
                            variants={imageVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                         />
                    )}
                </AnimatePresence>
            </div>
            
            {/* Caption */}
            {photo.caption && (
                <motion.div 
                    className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent text-center pointer-events-none"
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1, transition: { delay: 0.3 } }}
                    exit={{ y: '100%', opacity: 0 }}
                >
                    <p className="text-white text-base">{photo.caption}</p>
                </motion.div>
            )}


            {/* Close Button */}
            <button
                className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10 transition-colors z-10"
                onClick={onClose}
                aria-label="Close"
                data-cursor-hover
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* Prev Button */}
            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-colors opacity-50 hover:opacity-100 z-10"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous image"
                data-cursor-hover
            >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            </button>

            {/* Next Button */}
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full hover:bg-white/10 transition-colors opacity-50 hover:opacity-100 z-10"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next image"
                data-cursor-hover
            >
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
        </motion.div>
    );
};

export default Lightbox;