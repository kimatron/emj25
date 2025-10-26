import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ClientLogin: React.FC = () => {
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        // Simulate API call
        setTimeout(() => {
            if (accessCode.toLowerCase() === 'demo' || accessCode.length > 5) {
                // Navigate to gallery (this would validate the token in real app)
                navigate(`/gallery/${accessCode}`);
            } else {
                setError('Invalid access code. Please check your email and try again.');
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <motion.div 
                className="relative max-w-md w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Logo/Branding */}
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <svg className="w-16 h-16 mx-auto mb-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h1 className="text-3xl font-heading tracking-wider mb-2">EMJ CAMERA</h1>
                        <p className="text-neutral-400 text-sm">Private Gallery Access</p>
                    </motion.div>
                </div>

                {/* Access Form */}
                <motion.div 
                    className="bg-neutral-900 rounded-lg border border-neutral-800 p-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="text-xl font-medium mb-2">Access Your Gallery</h2>
                    <p className="text-neutral-400 text-sm mb-6">
                        Enter the access code from your email to view your photos
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="accessCode" className="block text-sm font-medium mb-2">
                                Access Code
                            </label>
                            <input
                                id="accessCode"
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                placeholder="Enter your access code"
                                className="w-full bg-black border border-neutral-700 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:border-white focus:outline-none transition-colors"
                                required
                            />
                            {error && (
                                <motion.p 
                                    className="text-red-400 text-sm mt-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    {error}
                                </motion.p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || accessCode.length === 0}
                            className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-neutral-200 transition-all disabled:bg-neutral-700 disabled:text-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verifying...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                    </svg>
                                    Access Gallery
                                </>
                            )}
                        </button>

                        {/* Demo hint */}
                        <div className="text-center pt-4 border-t border-neutral-800">
                            <p className="text-xs text-neutral-500">
                                Demo: Use access code <span className="text-neutral-300 font-mono">"demo"</span>
                            </p>
                        </div>
                    </form>
                </motion.div>

                {/* Help Text */}
                <motion.div 
                    className="mt-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-neutral-500 text-sm mb-2">
                        Can't find your access code?
                    </p>
                    <a 
                        href="mailto:info@emjcamera.com?subject=Gallery Access Help"
                        className="text-white hover:text-neutral-300 transition-colors text-sm inline-flex items-center gap-1"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Contact Support
                    </a>
                </motion.div>

                {/* Features Preview */}
                <motion.div 
                    className="mt-12 grid grid-cols-3 gap-6 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div>
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <p className="text-xs text-neutral-400">Select Favorites</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                        </div>
                        <p className="text-xs text-neutral-400">Download</p>
                    </div>
                    <div>
                        <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
                            <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <p className="text-xs text-neutral-400">Order Prints</p>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ClientLogin;