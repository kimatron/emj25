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
                        className="w-full lg:w-1/2 overflow-hidden"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                    >
                        <img 
                            src="/images/about/portrait.jpeg"
                            alt="Emilija Jefremova" 
                            className="about-portrait object-cover w-full h-auto"
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
                                        className="h-12 w-auto mx-auto mb-2 object-contain grayscale hover:grayscale-0 transition-all"
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
                                <div className="relative overflow-hidden aspect-[3/4] bg-neutral-900 mb-4">
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

                {/* Contact Form */}
                <div className="max-w-3xl mx-auto border-t border-neutral-800 pt-16">
                    <div className="text-center mb-12">
                        <h3 className="font-heading text-4xl tracking-wider mb-4">GET IN TOUCH</h3>
                        <p className="text-neutral-400 max-w-xl mx-auto">
                            Available for commissions, editorial assignments, and collaborations. 
                            Fill out the form below and I'll get back to you within 24 hours.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Name and Email Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300"
                                    placeholder="Your Name *"
                                />
                                <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                            <div className="relative group">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300"
                                    placeholder="Email Address *"
                                />
                                <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                        </div>

                        {/* Event Type Dropdown - NO EMOJIS */}
                        <div className="relative group">
                            <select
                                name="eventType"
                                value={formData.eventType}
                                onChange={handleChange}
                                required
                                className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300 text-neutral-200 appearance-none cursor-pointer"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 1rem center',
                                    backgroundSize: '1.5rem'
                                }}
                            >
                                <option value="" disabled>Select Event Type *</option>
                                <option value="theatre">Theatre Performance</option>
                                <option value="music">Music / Concert</option>
                                <option value="wedding">Wedding</option>
                                <option value="corporate">Corporate Event</option>
                                <option value="editorial">Editorial / Press</option>
                                <option value="portrait">Portrait Session</option>
                                <option value="landscape">Landscape / Travel</option>
                                <option value="other">Other</option>
                            </select>
                            <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                        </div>

                        {/* Date and Budget Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative group">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300 text-neutral-200"
                                />
                                <p className="text-xs text-neutral-500 mt-2 ml-1">Event Date (optional)</p>
                                <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                            <div className="relative group">
                                <input
                                    type="text"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                    placeholder="Budget Range (optional)"
                                    className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300"
                                />
                                <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                            </div>
                        </div>

                        {/* Message Textarea */}
                        <div className="relative group">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={6}
                                placeholder="Tell me about your project... *"
                                className="w-full bg-neutral-900/50 border-2 border-neutral-700 px-4 py-4 focus:border-white focus:bg-neutral-900 focus:outline-none transition-all duration-300 resize-none"
                            />
                            <div className="absolute left-0 bottom-0 h-0.5 bg-white w-0 group-focus-within:w-full transition-all duration-500"></div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="relative w-full px-8 py-5 bg-white text-black font-bold tracking-widest uppercase overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                {isSubmitting ? 'SENDING...' : 'SEND INQUIRY'}
                            </span>
                            <div className="absolute inset-0 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        </button>

                        {/* Success Message */}
                        {submitMessage && (
                            <motion.div 
                                className="text-center p-4 bg-green-900/20 border border-green-500/50"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <p className="text-green-400">{submitMessage}</p>
                            </motion.div>
                        )}
                    </form>

                    <div className="text-center mt-8 text-sm text-neutral-400">
                        Or email me directly at{' '}
                        <a href="mailto:hello@emjcamera.com" className="text-white hover:underline transition-all">
                            hello@emjcamera.com
                        </a>
                    </div>
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