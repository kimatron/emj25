import React from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from '../constants';
import { PortfolioCategory } from '../types';
import PageTransition from '../components/PageTransition';
import PortfolioGallery from '../components/PortfolioGallery';
import AnimatedTitle from '../components/AnimatedTitle';

const textOverlayVariants = {
    rest: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1 },
};

const CategoryCard: React.FC<{ category: PortfolioCategory; index: number }> = ({ category, index }) => {
    return (
        <motion.div
            className="relative overflow-hidden group aspect-[4/3]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover="hover"
            data-cursor-hover
        >
            <Link to={`/portfolio?category=${category.id}`} className="block w-full h-full">
                <img
                    src={category.coverImage}
                    alt={category.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                />

                <motion.div 
                    className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-8"
                    initial="rest"
                    variants={{
                        rest: { background: 'rgba(0,0,0,0.4)'},
                        hover: { background: 'rgba(0,0,0,0.6)'}
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-white relative w-full">
                         <h2 className="font-heading text-5xl md:text-6xl tracking-wide">{category.title}</h2>
                        <motion.div
                             variants={textOverlayVariants}
                             transition={{ duration: 0.3, ease: 'easeOut' }}
                        >
                             <p className="max-w-md mt-2">{category.description}</p>
                        </motion.div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}

const Portfolio: React.FC = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const selectedCategoryId = searchParams.get('category');

    const selectedCategory = selectedCategoryId
        ? CATEGORIES.find(c => c.id === selectedCategoryId)
        : null;

    const handleClose = () => {
        navigate('/portfolio');
    };

    return (
        <PageTransition>
            <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
                <div className="text-center mb-16 sm:mb-24">
                    <AnimatedTitle text="Portfolio" className="text-6xl sm:text-8xl md:text-9xl" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {CATEGORIES.map((category, index) => (
                        <CategoryCard key={category.id} category={category} index={index} />
                    ))}
                </div>
            </div>
            <AnimatePresence>
                {selectedCategory && (
                    <PortfolioGallery category={selectedCategory} onClose={handleClose} />
                )}
            </AnimatePresence>
        </PageTransition>
    );
};

export default Portfolio;
