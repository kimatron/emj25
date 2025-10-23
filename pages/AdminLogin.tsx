import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Simple password check (you'll change this!)
    const ADMIN_PASSWORD = 'emjcamera2025'; // ← CHANGE THIS!

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password === ADMIN_PASSWORD) {
            // Store login in localStorage
            localStorage.setItem('emj_admin_auth', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Incorrect password');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
            <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center mb-8">
                    <h1 className="font-heading text-5xl tracking-wider mb-2">ADMIN</h1>
                    <p className="text-neutral-400 text-sm">Enter password to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError('');
                            }}
                            placeholder="Password"
                            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                            autoFocus
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
                        className="w-full py-3 bg-white text-black font-medium tracking-wider hover:bg-neutral-200 transition-colors"
                    >
                        LOGIN
                    </button>
                </form>

                <p className="text-center text-neutral-500 text-xs mt-8">
                    EMJCAMERA Admin Panel
                </p>
            </motion.div>
        </div>
    );
};

export default AdminLogin;