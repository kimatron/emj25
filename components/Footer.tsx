import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin } from 'react-icons/fa';

const SocialLink: React.FC<{ href: string; icon: React.ReactNode }> = ({ href, icon }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition-colors duration-300">
        {icon}
    </a>
);

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#0a0a0a] py-12 border-t border-neutral-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                    <div className="text-neutral-400">
                        <h3 className="font-heading text-lg text-white tracking-wider mb-2">Contact</h3>
                        <a href="mailto:INFO@EMJCAMERA.COM" className="block hover:text-white transition-colors">INFO@EMJCAMERA.COM</a>
                        <a href="tel:+353862226119" className="block hover:text-white transition-colors">+353 86 222 6119</a>
                    </div>
                    
                    <div className="text-neutral-500 order-first md:order-none">
                        <p>&copy; {new Date().getFullYear()} EMJCAMERA</p>
                        <p>Emilija Jefremova. All Rights Reserved.</p>
                        <p className="text-sm mt-1">Based in Galway, Ireland.</p>
                    </div>

                    <div className="flex justify-center md:justify-end space-x-6">
                        <SocialLink href="https://instagram.com" icon={<FaInstagram size={24} />} />
                        <SocialLink href="https://facebook.com" icon={<FaFacebook size={24} />} />
                        <SocialLink href="https://linkedin.com" icon={<FaLinkedin size={24} />} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;