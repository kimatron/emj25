import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (featured) {
    // Large featured card
    return (
      <Link to={`/blog/${post.slug}`}>
        <motion.article
          className="group cursor-pointer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative overflow-hidden aspect-[16/10] mb-6">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white text-black px-3 py-1 text-xs uppercase tracking-wider font-medium">
                Featured
              </span>
            </div>
          </div>
          <div>
            <span className="text-xs text-neutral-500 uppercase tracking-wider">
              {post.category}
            </span>
            <h2 className="text-3xl md:text-4xl font-heading tracking-wide mt-3 mb-4 group-hover:text-neutral-300 transition-colors">
              {post.title}
            </h2>
            <p className="text-neutral-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </motion.article>
      </Link>
    );
  }

  // Regular card
  return (
    <Link to={`/blog/${post.slug}`}>
      <motion.article
        className="group cursor-pointer h-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden aspect-[4/3] mb-4">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div>
          <span className="text-xs text-neutral-500 uppercase tracking-wider">
            {post.category}
          </span>
          <h3 className="text-xl font-heading tracking-wide mt-2 mb-3 group-hover:text-neutral-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-neutral-400 text-sm mb-3 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span>{formatDate(post.date)}</span>
            <span>•</span>
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default BlogCard;