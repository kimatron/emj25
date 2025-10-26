import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

// Mock data for demonstration
const MOCK_GALLERY = {
    id: '1',
    title: 'Sarah & Michael - Wedding',
    eventDate: 'October 15, 2024',
    clientName: 'Sarah Thompson',
    expirationDate: 'January 15, 2025',
    downloadLimit: 50,
    photos: [
        { id: 1, src: '/images/portfolio/beautiful-people/people1.jpg', thumbnail: '/images/portfolio/beautiful-people/people1.jpg', isFavorite: false, downloadCount: 0 },
        { id: 2, src: '/images/portfolio/beautiful-people/people2.jpg', thumbnail: '/images/portfolio/beautiful-people/people2.jpg', isFavorite: false, downloadCount: 0 },
        { id: 3, src: '/images/portfolio/beautiful-people/people3.jpg', thumbnail: '/images/portfolio/beautiful-people/people3.jpg', isFavorite: false, downloadCount: 0 },
        { id: 4, src: '/images/portfolio/festival-gigs/music1.jpg', thumbnail: '/images/portfolio/festival-gigs/music1.jpg', isFavorite: false, downloadCount: 0 },
        { id: 5, src: '/images/portfolio/festival-gigs/music2.jpg', thumbnail: '/images/portfolio/festival-gigs/music2.jpg', isFavorite: false, downloadCount: 0 },
        { id: 6, src: '/images/portfolio/festival-gigs/music3.jpg', thumbnail: '/images/portfolio/festival-gigs/music3.jpg', isFavorite: false, downloadCount: 0 },
        { id: 7, src: '/images/portfolio/theatre/theatre1.jpg', thumbnail: '/images/portfolio/theatre/theatre1.jpg', isFavorite: false, downloadCount: 0 },
        { id: 8, src: '/images/portfolio/theatre/theatre2.jpg', thumbnail: '/images/portfolio/theatre/theatre2.jpg', isFavorite: false, downloadCount: 0 },
        { id: 9, src: '/images/portfolio/galway/galway.jpg', thumbnail: '/images/portfolio/galway/galway.jpg', isFavorite: false, downloadCount: 0 },
        { id: 10, src: '/images/portfolio/galway/galway2.jpg', thumbnail: '/images/portfolio/galway/galway2.jpg', isFavorite: false, downloadCount: 0 },
        { id: 11, src: '/images/portfolio/galway/galway3.jpg', thumbnail: '/images/portfolio/galway/galway3.jpg', isFavorite: false, downloadCount: 0 },
        { id: 12, src: '/images/portfolio/travel-gems/hero1.jpg', thumbnail: '/images/portfolio/travel-gems/hero1.jpg', isFavorite: false, downloadCount: 0 },
    ]
};

const ClientPortal: React.FC = () => {
    const { token } = useParams();
    const [gallery, setGallery] = useState(MOCK_GALLERY);
    const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');
    const [showDownloadModal, setShowDownloadModal] = useState(false);

    const toggleFavorite = (photoId: number) => {
        setGallery({
            ...gallery,
            photos: gallery.photos.map(p => 
                p.id === photoId ? { ...p, isFavorite: !p.isFavorite } : p
            )
        });
    };

    const favoriteCount = gallery.photos.filter(p => p.isFavorite).length;
    const filteredPhotos = filter === 'favorites' 
        ? gallery.photos.filter(p => p.isFavorite)
        : gallery.photos;

    const handleDownloadSelected = () => {
        if (favoriteCount === 0) {
            alert('Please select some favorites first!');
            return;
        }
        setShowDownloadModal(true);
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-neutral-800 sticky top-0 bg-black/95 backdrop-blur-sm z-40">
                <div className="container mx-auto px-4 sm:px-6 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-heading tracking-wider mb-1">
                                {gallery.title}
                            </h1>
                            <p className="text-sm text-neutral-400">
                                {gallery.eventDate} • {gallery.photos.length} Photos
                            </p>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            {/* Filter Toggle */}
                            <div className="flex gap-2 bg-neutral-900 rounded-lg p-1">
                                <button
                                    onClick={() => setFilter('all')}
                                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                                        filter === 'all' 
                                            ? 'bg-white text-black' 
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    All ({gallery.photos.length})
                                </button>
                                <button
                                    onClick={() => setFilter('favorites')}
                                    className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                                        filter === 'favorites' 
                                            ? 'bg-white text-black' 
                                            : 'text-neutral-400 hover:text-white'
                                    }`}
                                >
                                    ★ Favorites ({favoriteCount})
                                </button>
                            </div>

                            {/* Download Button */}
                            <button
                                onClick={handleDownloadSelected}
                                disabled={favoriteCount === 0}
                                className={`px-6 py-2 border-2 font-medium tracking-wider uppercase text-sm transition-all ${
                                    favoriteCount > 0
                                        ? 'border-white text-white hover:bg-white hover:text-black'
                                        : 'border-neutral-700 text-neutral-600 cursor-not-allowed'
                                }`}
                            >
                                Download ({favoriteCount})
                            </button>
                        </div>
                    </div>

                    {/* Info Banner */}
                    <motion.div 
                        className="mt-4 p-4 bg-neutral-900/50 rounded-lg border border-neutral-800"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-neutral-400">Gallery expires: <span className="text-white">{gallery.expirationDate}</span></span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    <span className="text-neutral-400">Download limit: <span className="text-white">{gallery.downloadLimit} photos</span></span>
                                </div>
                            </div>
                            <div className="text-neutral-400">
                                💡 Click the heart icon to mark your favorites
                            </div>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Gallery Grid */}
            <div className="container mx-auto px-4 sm:px-6 py-12">
                {filteredPhotos.length === 0 ? (
                    <div className="text-center py-20">
                        <svg className="w-16 h-16 mx-auto mb-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <p className="text-neutral-400 text-lg">No favorites selected yet</p>
                        <p className="text-neutral-500 text-sm mt-2">Click the heart icon on photos to add them to your favorites</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredPhotos.map((photo, index) => (
                            <motion.div
                                key={photo.id}
                                className="relative aspect-square group cursor-pointer overflow-hidden bg-neutral-900"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                {/* Image */}
                                <img
                                    src={photo.thumbnail}
                                    alt=""
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    onClick={() => setSelectedPhoto(photo)}
                                />

                                {/* Overlay on Hover */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <button
                                        onClick={() => setSelectedPhoto(photo)}
                                        className="text-white text-sm font-medium tracking-wider uppercase"
                                    >
                                        View Full Size
                                    </button>
                                </div>

                                {/* Favorite Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(photo.id);
                                    }}
                                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all z-10 ${
                                        photo.isFavorite
                                            ? 'bg-red-500 text-white scale-110'
                                            : 'bg-black/30 text-white hover:bg-black/50'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill={photo.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>

                                {/* Photo Number */}
                                <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded text-xs text-white">
                                    #{index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button
                            onClick={() => setSelectedPhoto(null)}
                            className="absolute top-6 right-6 text-white text-4xl hover:text-neutral-400 transition-colors z-10"
                        >
                            ×
                        </button>

                        <motion.div
                            className="relative max-w-5xl w-full"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedPhoto.src}
                                alt=""
                                className="w-full h-auto max-h-[85vh] object-contain"
                            />

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4 mt-6">
                                <button
                                    onClick={() => toggleFavorite(selectedPhoto.id)}
                                    className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                                        selectedPhoto.isFavorite
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-white text-black hover:bg-neutral-200'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill={selectedPhoto.isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {selectedPhoto.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </button>

                                <button
                                    className="px-6 py-3 bg-neutral-800 text-white rounded-lg font-medium hover:bg-neutral-700 transition-all flex items-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download This Photo
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Download Modal */}
            <AnimatePresence>
                {showDownloadModal && (
                    <motion.div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowDownloadModal(false)}
                    >
                        <motion.div
                            className="bg-neutral-900 rounded-lg p-8 max-w-md w-full border border-neutral-800"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-2xl font-heading tracking-wider mb-4">Download Your Photos</h3>
                            
                            <div className="space-y-4 mb-6">
                                <p className="text-neutral-300">
                                    You've selected <span className="text-white font-bold">{favoriteCount} photos</span> to download.
                                </p>

                                <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                                    <p className="text-sm text-neutral-400 mb-2">Choose download option:</p>
                                    
                                    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer mb-2">
                                        <input type="radio" name="download" defaultChecked className="mt-1" />
                                        <div>
                                            <p className="text-white font-medium">Web Optimized</p>
                                            <p className="text-xs text-neutral-400">Perfect for sharing online (smaller file size)</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800 cursor-pointer">
                                        <input type="radio" name="download" className="mt-1" />
                                        <div>
                                            <p className="text-white font-medium">High Resolution</p>
                                            <p className="text-xs text-neutral-400">Full quality for printing (larger file size)</p>
                                        </div>
                                    </label>
                                </div>

                                <p className="text-xs text-neutral-500">
                                    💡 For larger selections (100+ photos), we'll send you a Dropbox link via email.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowDownloadModal(false)}
                                    className="flex-1 px-6 py-3 border-2 border-neutral-700 text-white rounded-lg font-medium hover:bg-neutral-800 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="flex-1 px-6 py-3 bg-white text-black rounded-lg font-medium hover:bg-neutral-200 transition-all"
                                >
                                    Start Download
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ClientPortal;