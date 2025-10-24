import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SocialLink: React.FC<{ href: string; icon: React.ReactNode; label: string }> = ({ href, icon, label }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-neutral-400 hover:text-white transition-colors duration-300"
        aria-label={label}
    >
        {icon}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0a0a0a] py-16 border-t border-neutral-800">
            <div className="container mx-auto px-6">
                {/* Top Section with Logo */}
                <div className="flex flex-col items-center mb-12 pb-12 border-b border-neutral-800">
                    <img 
                        src="/emjlogo-removebg-preview.png" 
                        alt="EMJ Camera" 
                        className="h-16 w-auto mb-6 opacity-80"
                    />
                    <p className="text-neutral-500 text-sm text-center max-w-md">
                        Professional photography services in Galway, Ireland. 
                        Specializing in theatre, music, landscapes, and events.
                    </p>
                </div>

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Navigation */}
                    <div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-4">Navigate</h3>
                        <nav className="flex flex-col space-y-2">
                            <Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm">Home</Link>
                            <Link to="/portfolio" className="text-neutral-400 hover:text-white transition-colors text-sm">Portfolio</Link>
                            <Link to="/store" className="text-neutral-400 hover:text-white transition-colors text-sm">Store</Link>
                            <Link to="/about" className="text-neutral-400 hover:text-white transition-colors text-sm">About</Link>
                            <Link to="/admin" className="text-neutral-400 hover:text-white transition-colors text-sm">Admin</Link>
                        </nav>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-4">Services</h3>
                        <ul className="flex flex-col space-y-2 text-sm text-neutral-400">
                            <li>Live Music Photography</li>
                            <li>Theatre & Events</li>
                            <li>Drone Photography</li>
                            <li>Wedding Photography</li>
                            <li>Product Photography</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-4">Contact</h3>
                        <div className="flex flex-col space-y-2 text-sm">
                            <a 
                                href="mailto:INFO@EMJCAMERA.COM" 
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                INFO@EMJCAMERA.COM
                            </a>
                            <a 
                                href="tel:+353862226119" 
                                className="text-neutral-400 hover:text-white transition-colors"
                            >
                                +353 86 222 6119
                            </a>
                            <p className="text-neutral-500 pt-2">
                                Based in Galway, Ireland
                            </p>
                        </div>
                    </div>

                    {/* Newsletter / Social */}
                    <div>
                        <h3 className="font-heading text-lg text-white tracking-wider mb-4">Connect</h3>
                        <div className="flex space-x-4 mb-6">
                            <SocialLink href="https://www.instagram.com/emjcamera/" icon={<FaInstagram size={24} />} label="Instagram" />
                            <SocialLink href="https://www.facebook.com/emjcamera/" icon={<FaFacebook size={24} />} label="Facebook" />
                            <SocialLink href="https://www.linkedin.com/in/emilijajefremova/" icon={<FaLinkedin size={24} />} label="LinkedIn" />
                        </div>
                        <p className="text-neutral-500 text-xs">
                            Follow for latest work and updates
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 text-sm text-neutral-500">
                    <p className="mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} EMJCAMERA. All Rights Reserved.
                    </p>
                    <div className="flex space-x-6">
                        <button className="hover:text-white transition-colors">Privacy Policy</button>
                        <button className="hover:text-white transition-colors">Terms of Service</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;