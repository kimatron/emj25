import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import AnimatedTitle from '../components/AnimatedTitle';
import BlogCard from '../components/BlogCard';
import { blogPosts, getFeaturedPosts, categories } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const featuredPosts = getFeaturedPosts();
  
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <PageTransition>
      <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <AnimatedTitle text="Journal" className="text-6xl sm:text-8xl mb-4" />
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Stories from behind the lens—documenting life, art, and moments that matter
          </p>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Main featured post - larger */}
              <div className="lg:col-span-2">
                <BlogCard post={featuredPosts[0]} featured={true} />
              </div>
              
              {/* Secondary featured posts */}
              {featuredPosts.slice(1, 3).map(post => (
                <div key={post.id}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="border-t border-neutral-800 pt-12 mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'border border-neutral-700 text-neutral-400 hover:border-white hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* All Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <BlogCard post={post} />
            </motion.div>
          ))}
        </div>

        {/* No posts message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-lg">
              No posts found in this category.
            </p>
          </div>
        )}

      </div>
    </PageTransition>
  );
};

export default Blog;