import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedTitle from '../components/AnimatedTitle';

// Declare global GSAP type
declare global {
    interface Window {
        gsap: any;
        ScrollTrigger: any;
    }
}

const gsap = typeof window !== 'undefined' ? window.gsap : null;

// Publication logos
const PUBLICATIONS = [
  { name: 'Irish Independent', logo: '/images/logos/irish-independent.png' },
  { name: 'The Irish Times', logo: '/images/logos/irishtimes.png' },
  { name: 'Reuters', logo: '/images/logos/reuters1.png' },
  { name: 'RTÉ News', logo: '/images/logos/rte.jpg' },
  { name: 'The Irish Examiner', logo: '📄' },
  { name: 'Galway Now', logo: '/images/logos/galwaynow.jpg' },
  { name: 'Food & Wine', logo: '/images/logos/foodwine.jpg' },
];

// Featured work - newspaper/magazine clippings
const FEATURED_WORK = [
  {
    id: 1,
    title: 'Irish Independent Front Page',
    publication: 'Irish Independent',
    date: 'January 2025',
    image: '/images/featured/news1.jpg',
    description: 'Snow storm coverage - front page feature',
  },
  {
    id: 2,
    title: 'Weather Warning Coverage',
    publication: 'National Newspaper',
    date: 'January 2025',
    image: '/images/featured/news2.jpg',
    description: 'Featured weather photography',
  },
  {
    id: 3,
    title: 'Zelensky Martin Meeting in Shannon',
    publication: 'Irish Independent',
    date: 'February 2025',
    image: '/images/featured/news4.jpg',
    description: 'Zelensky Martin Meeting in Shannon',
  },
  {
    id: 4,
    title: 'Irish Times Front Page',
    publication: 'Irish Times',
    date: 'October 2022',
    image: '/images/featured/news3.jpg',
    description: 'Macnas Con Mor - front page feature',
  },
];

interface ContactFormData {
  name: string;
  email: string;
  eventType: string;
  date: string;
  budget: string;
  message: string;
}

const About: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
        name: '',
        email: '',
        eventType: '',
        date: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [selectedWork, setSelectedWork] = useState<typeof FEATURED_WORK[0] | null>(null);

    useEffect(() => {
        // GSAP scroll animations
        if (!gsap) return;
        
        const ScrollTrigger = window.ScrollTrigger;
        if (ScrollTrigger) {
            gsap.registerPlugin(ScrollTrigger);

            // Parallax effect on hero image
            gsap.to('.about-portrait', {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.about-hero',
                    scrub: 1,
                },
            });

            // Stagger publication logos
            gsap.from('.publication-logo', {
                scrollTrigger: {
                    trigger: '.publications-section',
                    start: 'top center+=100',
                },
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
            });

            // Featured work items
            gsap.from('.featured-item', {
                scrollTrigger: {
                    trigger: '.featured-section',
                    start: 'top center+=100',
                },
                y: 50,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
            });
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // TODO: Implement email API
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            setSubmitMessage('Thank you! I\'ll get back to you soon.');
            setFormData({
                name: '',
                email: '',
                eventType: '',
                date: '',
                budget: '',
                message: '',
            });
        } catch (error) {
            setSubmitMessage('Something went wrong. Please email me directly.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 5000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
                
                {/* Hero Section - Bio */}
                <div className="about-hero flex flex-col lg:flex-row items-center gap-12 lg:gap-24 mb-32">
                    <motion.div 
                        className="w-full lg:w-1/2 overflow-hidden group"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img 
                            src="/images/about/portrait.jpeg"
                            alt="Emilija Jefremova" 
                            className="about-portrait object-cover w-full h-auto transition-transform duration-[5000ms] ease-out group-hover:scale-105"
                        />
                    </motion.div>
                    <motion.div 
                        className="w-full lg:w-1/2"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        <AnimatedTitle text="About Me" className="text-6xl sm:text-8xl" />
                        <h2 className="text-2xl font-medium mt-2 text-neutral-300">Emilija Jefremova</h2>
                        <div className="prose prose-invert mt-6 text-neutral-300 max-w-none space-y-4">
                            <p>
                                Originally from Lithuania and now based in the vibrant city of Galway, Ireland, I am a passionate photographer with a keen eye for capturing fleeting moments and transforming them into lasting visual narratives. My work is a blend of documentary honesty and artistic expression.
                            </p>
                            <p>
                                I specialize in a wide range of photography, including theatre, live music, corporate events, and evocative landscapes. My goal is to tell a story with every shot, whether it's the raw energy of a concert, the dramatic tension of a stage play, or the serene beauty of the Irish countryside.
                            </p>
                            <p>
                                My work has been featured in major publications including the Irish Independent, The Irish Times, and Reuters, covering everything from breaking news to cultural events across Ireland.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* As Seen In - Publications */}
                <div className="publications-section mb-32 border-t border-neutral-800 pt-16">
                    <h3 className="font-heading text-4xl tracking-wider text-center mb-12">AS SEEN IN</h3>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                        {PUBLICATIONS.map((pub, index) => (
                            <div 
                                key={pub.name}
                                className="publication-logo text-center"
                            >
                                {pub.logo.startsWith('/') || pub.logo.startsWith('http') ? (
                                    <img 
                                        src={pub.logo} 
                                        alt={pub.name}
                                        className="h-12 w-auto mx-auto mb-2 object-contain transition-opacity hover:opacity-90"
                                    />
                                ) : (
                                    <div className="text-5xl mb-2">{pub.logo}</div>
                                )}
                                <p className="text-xs text-neutral-400 tracking-wider">{pub.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Work */}
                <div className="featured-section mb-32">
                    <div className="text-center mb-16">
                        <h3 className="font-heading text-4xl tracking-wider mb-4">FEATURED WORK</h3>
                        <p className="text-neutral-400 max-w-2xl mx-auto">
                            A selection of published work from national newspapers and international news agencies
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FEATURED_WORK.map((work) => (
                            <div
                                key={work.id}
                                className="featured-item group cursor-pointer transition-transform hover:-translate-y-2 duration-300"
                                onClick={() => setSelectedWork(work)}
                            >
                                <div className="relative overflow-hidden aspect-[3/4] mb-4">
                                    <img
                                        src={work.image}
                                        alt={work.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500 mb-1">{work.publication} • {work.date}</p>
                                    <h4 className="font-medium text-lg mb-2">{work.title}</h4>
                                    <p className="text-sm text-neutral-400">{work.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Contact Form - MINIMAL VERSION */}
                <div className="max-w-2xl mx-auto border-t border-neutral-800 pt-16">
                    <div className="text-center mb-8">
                        <h3 className="font-heading text-3xl tracking-wider mb-3">GET IN TOUCH</h3>
                        <p className="text-neutral-400 text-sm mb-6">
                            Available for commissions and collaborations
                        </p>
                        
                        {/* Contact Information */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-8">
                            <a 
                                href="mailto:info@emjcamera.com" 
                                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span>info@emjcamera.com</span>
                            </a>
                            <a 
                                href="tel:+353862226119" 
                                className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <span>+353 86 222 6119</span>
                            </a>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-neutral-700 px-1 py-3 focus:border-white focus:outline-none transition-colors placeholder:text-neutral-500"
                                placeholder="Your Name"
                            />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-neutral-700 px-1 py-3 focus:border-white focus:outline-none transition-colors placeholder:text-neutral-500"
                                placeholder="Email Address"
                            />
                        </div>

                        {/* Event Type and Date Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full bg-transparent border-b border-neutral-700 px-1 py-3 focus:border-white focus:outline-none transition-colors text-neutral-200 appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right center',
                                    backgroundSize: '1.2rem'
                                }}
                            >
                                <option value="" disabled style={{ backgroundColor: '#171717', color: '#a3a3a3' }}>Event Type</option>
                                <option value="theatre" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Theatre</option>
                                <option value="music" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Music / Concert</option>
                                <option value="wedding" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Wedding</option>
                                <option value="corporate" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Corporate</option>
                                <option value="editorial" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Editorial / Press</option>
                                <option value="portrait" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Portrait</option>
                                <option value="landscape" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Landscape</option>
                                <option value="other" style={{ backgroundColor: '#171717', color: '#e5e5e5' }}>Other</option>
                            </select>

                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full bg-transparent border-b border-neutral-700 px-1 py-3 focus:border-white focus:outline-none transition-colors text-neutral-200 cursor-pointer"
                                style={{ colorScheme: 'dark' }}
                            />
                        </div>

                        {/* Message */}
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            placeholder="Tell me about your project..."
                            className="w-full bg-transparent border-b border-neutral-700 px-1 py-3 focus:border-white focus:outline-none transition-colors resize-none placeholder:text-neutral-500"
                        />

                        {/* Submit Button - Minimal */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full md:w-auto px-12 py-3 border-2 border-white text-white font-medium tracking-widest uppercase transition-all duration-300 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'SENDING...' : 'SEND'}
                        </button>

                        {/* Success Message */}
                        {submitMessage && (
                            <p className="text-sm text-green-400">{submitMessage}</p>
                        )}
                    </form>

                    <p className="text-center mt-6 text-xs text-neutral-500">
                        Or email{' '}
                        <a href="mailto:hello@emjcamera.com" className="text-neutral-300 hover:text-white transition-colors">
                            hello@emjcamera.com
                        </a>
                    </p>
                </div>

            </div>

            {/* Featured Work Lightbox */}
            {selectedWork && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedWork(null)}
                >
                    <motion.div
                        className="relative max-w-5xl w-full"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedWork(null)}
                            className="absolute -top-12 right-0 text-white text-4xl hover:text-neutral-400 transition-colors"
                        >
                            ×
                        </button>
                        <img
                            src={selectedWork.image}
                            alt={selectedWork.title}
                            className="w-full h-auto"
                        />
                        <div className="mt-6 text-center">
                            <p className="text-sm text-neutral-400 mb-2">
                                {selectedWork.publication} • {selectedWork.date}
                            </p>
                            <h4 className="text-2xl font-medium mb-2">{selectedWork.title}</h4>
                            <p className="text-neutral-300">{selectedWork.description}</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </PageTransition>
    );
};

export default About;