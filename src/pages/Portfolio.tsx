import React from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../../constants';
import { PortfolioCategory } from '../../types';
import PageTransition from '../components/PageTransition';
import PortfolioGallery from '../components/PortfolioGallery';
import AnimatedTitle from '../components/AnimatedTitle';
import BackToTop from '../components/BackToTop';

const CategoryCard: React.FC<{ category: PortfolioCategory; index: number }> = ({ category, index }) => {
    return (
        <motion.div
            className="relative overflow-hidden group aspect-[4/3]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover="hover"
        >
            <Link to={`/portfolio?category=${category.id}`} className="block w-full h-full">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.img
                        src={category.coverImage}
                        alt={category.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        variants={{
                            hover: { scale: 1.1 }
                        }}
                        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    />
                </div>

                <motion.div
                    className="absolute inset-0 bg-black/40 flex items-end p-6 sm:p-8"
                    variants={{
                        hover: { backgroundColor: 'rgba(0,0,0,0.65)' }
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-white relative w-full">
                        <motion.h2
                            className="font-heading text-4xl sm:text-5xl lg:text-6xl tracking-wide"
                            variants={{
                                hover: { y: -5 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {category.title}
                        </motion.h2>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            variants={{
                                hover: { y: 0, opacity: 1 }
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="max-w-md mt-2 text-sm sm:text-base">{category.description}</p>
                            <div className="flex items-center mt-4 text-sm">
                                <span className="mr-2">View Gallery</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
};

const Portfolio: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const selectedCategoryId = searchParams.get('category');

    const selectedCategory = selectedCategoryId ? CATEGORIES.find((c) => c.id === selectedCategoryId) : null;

    const handleClose = () => {
        navigate('/portfolio');
    };

    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <motion.div 
                    className="text-center mb-16 sm:mb-24"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <AnimatedTitle text="Portfolio" className="text-6xl sm:text-8xl md:text-9xl" />
                    <motion.p
                        className="max-w-2xl mx-auto mt-6 text-neutral-400 text-sm sm:text-base"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Explore my work across various genres - from live music to landscapes.
                        Each collection tells its own story.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {CATEGORIES.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>

                <motion.div
                    className="mt-24 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="font-heading text-3xl sm:text-4xl tracking-wider mb-4">
                        Looking for Something Specific?
                    </h3>
                    <p className="text-neutral-400 mb-8 max-w-xl mx-auto text-sm">
                        Available for commissions, events, and collaborations.
                    </p>
                    <Link
                        to="/about"
                        className="inline-block px-8 py-3 border border-white text-white text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:bg-white hover:text-black"
                    >
                        Get In Touch
                    </Link>
                </motion.div>
            </div>
            <AnimatePresence mode="wait">
                {selectedCategory && <PortfolioGallery category={selectedCategory} onClose={handleClose} />}
            </AnimatePresence>
            <BackToTop />
        </PageTransition>
    );
};

export default Portfolio;