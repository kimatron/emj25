import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, PRINTS } from '../constants';
import { Photo, Print } from '../types';

// This will be replaced with actual API calls when backend is ready
const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue];
};

interface EditPhotoModalProps {
    photo: Photo;
    onSave: (photo: Photo) => void;
    onClose: () => void;
}

const EditPhotoModal: React.FC<EditPhotoModalProps> = ({ photo, onSave, onClose }) => {
    const [caption, setCaption] = useState(photo.caption || '');
    const [alt, setAlt] = useState(photo.alt);

    const handleSave = () => {
        onSave({ ...photo, caption, alt });
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-[#0a0a0a] border border-neutral-800 max-w-2xl w-full p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="font-heading text-2xl tracking-wider mb-6">Edit Photo Details</h2>

                <div className="mb-6">
                    <img src={photo.src} alt={photo.alt} className="w-full h-64 object-cover mb-4" />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Alt Text (SEO)
                        </label>
                        <input
                            type="text"
                            value={alt}
                            onChange={(e) => setAlt(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white transition-colors"
                            placeholder="Describe the image..."
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Caption (Optional)
                        </label>
                        <textarea
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white transition-colors resize-none"
                            rows={3}
                            placeholder="Add a caption for viewers..."
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-neutral-700 text-sm hover:bg-neutral-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

interface EditPrintModalProps {
    print: Print;
    onSave: (print: Print) => void;
    onClose: () => void;
}

const EditPrintModal: React.FC<EditPrintModalProps> = ({ print, onSave, onClose }) => {
    const [title, setTitle] = useState(print.title);
    const [description, setDescription] = useState(print.description);
    const [price, setPrice] = useState(print.price.toString());

    const handleSave = () => {
        onSave({ 
            ...print, 
            title, 
            description, 
            price: parseFloat(price) || 0 
        });
        onClose();
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-[#0a0a0a] border border-neutral-800 max-w-2xl w-full p-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="font-heading text-2xl tracking-wider mb-6">Edit Print Details</h2>

                <div className="mb-6">
                    <img src={print.src} alt={print.title} className="w-full h-64 object-cover mb-4" />
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white transition-colors resize-none"
                            rows={2}
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Base Price (€)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 text-white focus:outline-none focus:border-white transition-colors"
                        />
                        <p className="text-xs text-neutral-500 mt-1">
                            Customers can add size/framing options (which add to this price)
                        </p>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-neutral-700 text-sm hover:bg-neutral-900 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-white text-black text-sm font-medium hover:bg-neutral-200 transition-colors"
                    >
                        Save Changes
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AdminDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'portfolio' | 'prints' | 'orders'>('portfolio');
    const [categories, setCategories] = useLocalStorage('emj_categories', CATEGORIES);
    const [prints, setPrints] = useLocalStorage('emj_prints', PRINTS);
    const [orders, setOrders] = useLocalStorage('emj_orders', []);
    const [editingPhoto, setEditingPhoto] = useState<{ categoryId: string; photo: Photo } | null>(null);
    const [editingPrint, setEditingPrint] = useState<Print | null>(null);

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

    const handleSavePhoto = (categoryId: string, updatedPhoto: Photo) => {
        const updatedCategories = categories.map((cat: any) => {
            if (cat.id === categoryId) {
                return {
                    ...cat,
                    photos: cat.photos.map((p: Photo) => 
                        p.id === updatedPhoto.id ? updatedPhoto : p
                    )
                };
            }
            return cat;
        });
        setCategories(updatedCategories);
    };

    const handleSavePrint = (updatedPrint: Print) => {
        const updatedPrints = prints.map((p: Print) => 
            p.id === updatedPrint.id ? updatedPrint : p
        );
        setPrints(updatedPrints);
    };

    const handleImageUpload = () => {
        alert('Cloudinary integration coming next! This will allow you to:\n\n1. Upload images directly\n2. Auto-optimize images\n3. Store in cloud (fast CDN)\n4. No manual file management');
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
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
                        onClick={() => setActiveTab('orders')}
                        className={`px-6 py-3 text-sm tracking-wider transition-colors relative ${
                            activeTab === 'orders'
                                ? 'text-white border-b-2 border-white'
                                : 'text-neutral-400 hover:text-white'
                        }`}
                    >
                        ORDERS
                        {orders.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
                                {orders.length}
                            </span>
                        )}
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
                        
                        <div className="space-y-8">
                            {categories.map((category: any) => (
                                <div key={category.id} className="border border-neutral-800 p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h3 className="font-heading text-xl tracking-wide">{category.title}</h3>
                                            <p className="text-sm text-neutral-400">{category.photos.length} photos</p>
                                        </div>
                                        <button
                                            onClick={handleImageUpload}
                                            className="px-4 py-2 bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                                        >
                                            ADD PHOTOS
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                        {category.photos.map((photo: Photo) => (
                                            <div key={photo.id} className="group relative">
                                                <img
                                                    src={photo.src}
                                                    alt={photo.alt}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all flex items-center justify-center">
                                                    <button
                                                        onClick={() => setEditingPhoto({ categoryId: category.id, photo })}
                                                        className="opacity-0 group-hover:opacity-100 px-3 py-1 bg-white text-black text-xs font-medium"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                                {photo.caption && (
                                                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-1 text-xs truncate">
                                                        {photo.caption}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
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
                            <button 
                                onClick={handleImageUpload}
                                className="px-4 py-2 bg-white text-black text-sm font-medium tracking-wider hover:bg-neutral-200 transition-colors"
                            >
                                ADD NEW PRINT
                            </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {prints.map((print: Print) => (
                                <div
                                    key={print.id}
                                    className="border border-neutral-800 p-4 hover:border-neutral-600 transition-colors group"
                                >
                                    <div className="relative mb-4">
                                        <img
                                            src={print.src}
                                            alt={print.title}
                                            className="w-full h-64 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all flex items-center justify-center">
                                            <button
                                                onClick={() => setEditingPrint(print)}
                                                className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-white text-black text-sm font-medium"
                                            >
                                                Edit Details
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="font-medium mb-1">{print.title}</h3>
                                    <p className="text-sm text-neutral-400 mb-2 line-clamp-2">{print.description}</p>
                                    <p className="text-lg font-light">€{print.price.toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl font-heading tracking-wider mb-6">Recent Orders</h2>
                        
                        {orders.length === 0 ? (
                            <div className="border border-neutral-800 p-12 text-center">
                                <p className="text-neutral-400 mb-2">No orders yet</p>
                                <p className="text-sm text-neutral-500">
                                    Orders will appear here when customers make purchases through Stripe
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map((order: any, index: number) => (
                                    <div key={index} className="border border-neutral-800 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <p className="font-medium">Order #{order.id}</p>
                                                <p className="text-sm text-neutral-400">{order.date}</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium">
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="text-sm space-y-1 mb-4">
                                            <p><strong>Customer:</strong> {order.customer.name}</p>
                                            <p><strong>Email:</strong> {order.customer.email}</p>
                                            <p><strong>Address:</strong> {order.customer.address}</p>
                                        </div>
                                        <div className="border-t border-neutral-800 pt-4">
                                            <p className="font-medium mb-2">Items:</p>
                                            <ul className="text-sm text-neutral-400 space-y-1">
                                                {order.items.map((item: any, i: number) => (
                                                    <li key={i}>{item.name} - €{item.price}</li>
                                                ))}
                                            </ul>
                                            <p className="mt-4 text-lg font-medium">Total: €{order.total}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* Info Box */}
                <div className="mt-12 bg-neutral-900 border border-neutral-800 p-6">
                    <h3 className="font-heading text-xl tracking-wider mb-4">🚀 NEXT: CLOUDINARY + STRIPE SETUP</h3>
                    <div className="space-y-3 text-sm text-neutral-400">
                        <p><strong className="text-white">✅ What works now:</strong> Edit captions, prices, view interface</p>
                        <p><strong className="text-white">🔜 Coming next (30 min):</strong></p>
                        <ul className="list-disc list-inside pl-4 space-y-1">
                            <li>Cloudinary upload widget (drag & drop images)</li>
                            <li>Automatic image optimization & hosting</li>
                            <li>Stripe checkout integration</li>
                            <li>Collect customer delivery addresses</li>
                            <li>Email notifications for orders</li>
                            <li>Order management dashboard</li>
                        </ul>
                        <p className="pt-4 border-t border-neutral-800">
                            <strong className="text-white">Changes save to localStorage</strong> (temporary). 
                            With Cloudinary setup, everything will save permanently to the cloud.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {editingPhoto && (
                    <EditPhotoModal
                        photo={editingPhoto.photo}
                        onSave={(photo) => handleSavePhoto(editingPhoto.categoryId, photo)}
                        onClose={() => setEditingPhoto(null)}
                    />
                )}
                {editingPrint && (
                    <EditPrintModal
                        print={editingPrint}
                        onSave={handleSavePrint}
                        onClose={() => setEditingPrint(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;