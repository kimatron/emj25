import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PRINTS } from '../constants';
import { PortfolioCategory, Print } from '../types';

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'portfolio' | 'prints' | 'hero'>('portfolio');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    // Check if user is authenticated
    useEffect(() => {
        const isAuth = localStorage.getItem('emj_admin_auth');
        if (!isAuth) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('emj_admin_auth');
        navigate('/');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create a preview
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target?.result as string;
            console.log(`Upload ${type}:`, file.name);
            console.log('Image preview:', imageUrl);
            
            // Here you would typically:
            // 1. Upload to your server/cloud storage
            // 2. Get back the URL
            // 3. Update your constants.ts file or database
            
            alert(`Image selected: ${file.name}\n\nTo complete:\n1. Upload to /public/images/\n2. Update constants.ts with the path`);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
            {/* Header */}
            <header className="border-b border-neutral-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="font-heading text-3xl tracking-wider">ADMIN DASHBOARD</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/')}
                            className="text-sm text-neutral-400 hover:text-white transition-colors"
                        >
                            View Site
                        </button>
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 border border-neutral-700 text-sm hover:bg-white hover:text-black transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto p-6">
                {/* Tabs */}
                <div className="flex space-x-4 mb-8 border-b border-neutral-800">
                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                            activeTab === 'portfolio'
                                ? 'text-white border-b-2 border-white'
                                : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        PORTFOLIO
                    </button>
                    <button
                        onClick={() => setActiveTab('prints')}
                        className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                            activeTab === 'prints'
                                ? 'text-white border-b-2 border-white'
                                : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        PRINTS
                    </button>
                    <button
                        onClick={() => setActiveTab('hero')}
                        className={`px-6 py-3 text-sm tracking-wider transition-colors ${
                            activeTab === 'hero'
                                ? 'text-white border-b-2 border-white'
                                : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        HERO IMAGES
                    </button>
                </div>

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-heading tracking-wider mb-6">Portfolio Categories</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {CATEGORIES.map((category) => (
                                <div
                                    key={category.id}
                                    className="border border-neutral-800 p-4 hover:border-neutral-600 transition-colors"
                                >
                                    <img
                                        src={category.coverImage}
                                        alt={category.title}
                                        className="w-full h-48 object-cover mb-4"
                                    />
                                    <h3 className="font-heading text-xl tracking-wide mb-2">{category.title}</h3>
                                    <p className="text-sm text-neutral-400 mb-4">{category.photos.length} photos</p>
                                    
                                    <div className="space-y-2">
                                        <label className="block">
                                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Update Cover Image</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleImageUpload(e, `portfolio-cover-${category.id}`)}
                                                className="block w-full text-sm text-neutral-400 mt-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700 file:cursor-pointer"
                                            />
                                        </label>
                                        
                                        <label className="block">
                                            <span className="text-xs text-neutral-500 uppercase tracking-wider">Add Gallery Photos</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                multiple
                                                onChange={(e) => handleImageUpload(e, `portfolio-gallery-${category.id}`)}
                                                className="block w-full text-sm text-neutral-400 mt-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700 file:cursor-pointer"
                                            />
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Prints Tab */}
                {activeTab === 'prints' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-heading tracking-wider">Print Shop</h2>
                            <button className="px-4 py-2 bg-white text-black text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors">
                                ADD NEW PRINT
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {PRINTS.map((print) => (
                                <div
                                    key={print.id}
                                    className="border border-neutral-800 p-4 hover:border-neutral-600 transition-colors"
                                >
                                    <img
                                        src={print.src}
                                        alt={print.title}
                                        className="w-full h-64 object-cover mb-4"
                                    />
                                    <h3 className="font-medium mb-1">{print.title}</h3>
                                    <p className="text-sm text-neutral-400 mb-2">{print.description}</p>
                                    <p className="text-lg font-light mb-4">€{print.price.toFixed(2)}</p>
                                    
                                    <label className="block">
                                        <span className="text-xs text-neutral-500 uppercase tracking-wider">Update Image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e, `print-${print.id}`)}
                                            className="block w-full text-sm text-neutral-400 mt-2 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-neutral-800 file:text-neutral-300 hover:file:bg-neutral-700 file:cursor-pointer"
                                        />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Hero Images Tab */}
                {activeTab === 'hero' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-heading tracking-wider mb-6">Hero Slider Images</h2>
                        <p className="text-neutral-400 text-sm mb-6">
                            Upload 4-5 landscape images for the homepage background slider
                        </p>
                        
                        <div className="border-2 border-dashed border-neutral-800 p-12 text-center hover:border-neutral-600 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => handleImageUpload(e, 'hero')}
                                className="hidden"
                                id="hero-upload"
                            />
                            <label
                                htmlFor="hero-upload"
                                className="cursor-pointer"
                            >
                                <div className="text-6xl mb-4">📸</div>
                                <p className="text-lg mb-2">Click to upload hero images</p>
                                <p className="text-sm text-neutral-500">Recommended: 1920x1080px, landscape orientation</p>
                            </label>
                        </div>

                        <div className="mt-8 bg-neutral-900 border border-neutral-800 p-6">
                            <h3 className="font-medium mb-4">Current Hero Images</h3>
                            <p className="text-sm text-neutral-400">
                                To update hero images, edit the HERO_IMAGES array in pages/Home.tsx
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Instructions */}
                <div className="mt-12 bg-neutral-900 border border-neutral-800 p-6">
                    <h3 className="font-heading text-xl tracking-wider mb-4">📋 HOW IT WORKS</h3>
                    <div className="space-y-3 text-sm text-neutral-400">
                        <p><strong className="text-white">1. Select Image:</strong> Click "Choose File" to select an image from your computer</p>
                        <p><strong className="text-white">2. Upload to Server:</strong> The image needs to be uploaded to /public/images/ folder</p>
                        <p><strong className="text-white">3. Update Code:</strong> Update the file path in constants.ts</p>
                        <p className="pt-4 border-t border-neutral-800">
                            <strong className="text-white">Note:</strong> This is a basic admin panel. For full functionality, you'll need to set up:
                            <br />• A backend server (Node.js/Express)
                            <br />• Cloud storage (Cloudinary, AWS S3)
                            <br />• Database (to store image URLs)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;