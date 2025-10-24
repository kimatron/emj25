import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import BlogCard from '../components/BlogCard';
import { getPostBySlug, getRelatedPosts } from '../data/blogPosts';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : null;

  if (!post) {
    return (
      <PageTransition>
        <div className="container mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <h1 className="text-4xl font-heading mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-neutral-400 hover:text-white transition-colors">
            ← Back to Journal
          </Link>
        </div>
      </PageTransition>
    );
  }

  const relatedPosts = getRelatedPosts(post);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IE', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <PageTransition>
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <article className="container mx-auto px-4 sm:px-6 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          
          {/* Post Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Journal
            </Link>

            <div className="mb-6">
              <span className="inline-block bg-white text-black px-3 py-1 text-xs uppercase tracking-wider font-medium">
                {post.category}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl tracking-wide mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-neutral-400">
              <span>{formatDate(post.date)}</span>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </div>
          </motion.div>

          {/* Post Content */}
          <motion.div
            className="prose prose-invert prose-lg max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {post.content.map((block, index) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2 key={index} className="text-3xl font-heading tracking-wide mt-12 mb-6">
                      {block.content}
                    </h2>
                  );
                
                case 'text':
                  return (
                    <p key={index} className="text-neutral-300 leading-relaxed mb-6 text-lg">
                      {block.content}
                    </p>
                  );
                
                case 'image':
                  return (
                    <figure key={index} className={`my-12 ${
                      block.imageSize === 'full' ? '-mx-4 sm:-mx-12' : 
                      block.imageSize === 'small' ? 'max-w-md mx-auto' : ''
                    }`}>
                      <img
                        src={block.content}
                        alt={block.imageCaption || ''}
                        className="w-full h-auto"
                      />
                      {block.imageCaption && (
                        <figcaption className="text-center text-sm text-neutral-500 mt-4 px-4">
                          {block.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  );
                
                case 'quote':
                  return (
                    <blockquote key={index} className="border-l-4 border-white pl-6 my-10 italic text-2xl text-neutral-200">
                      {block.content}
                    </blockquote>
                  );
                
                default:
                  return null;
              }
            })}
          </motion.div>

          {/* Share Section */}
          <motion.div
            className="border-t border-neutral-800 pt-8 mt-16 mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm text-neutral-500 text-center">
              Share this story
            </p>
          </motion.div>

        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-neutral-900/50 py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-heading text-3xl tracking-wider mb-12 text-center">
                Related Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map(relatedPost => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageTransition>
  );
};

export default BlogPost;