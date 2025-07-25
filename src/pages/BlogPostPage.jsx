import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { FaCalendarAlt, FaClock, FaUser, FaTags, FaArrowLeft, FaShare } from 'react-icons/fa';
import blogService from '../services/blogService';

const BlogPostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPost();
    window.scrollTo(0, 0);
  }, [postId]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPost = await blogService.fetchPostById(postId);
      if (!fetchedPost) {
        throw new Error('Post not found');
      }
      setPost(fetchedPost);
    } catch (err) {
      setError('Failed to load blog post. Please try again later.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex flex-col">
        <div className="flex-grow container py-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-light flex flex-col">
        <div className="flex-grow container py-32 flex flex-col items-center text-center">
          <p className="text-red-600 mb-6">{error || 'Blog post not found'}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light flex flex-col">
      <article className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative h-full flex flex-col justify-end pb-12 text-white">
            <div className="max-w-4xl">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <FaUser className="text-primary" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-primary" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-primary" />
                  <span>{blogService.getReadingTime(post.content)} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            {/* Labels */}
            {post.labels && post.labels.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                <FaTags className="text-primary mt-1" />
                {post.labels.map((label, idx) => (
                  <span 
                    key={idx}
                    className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
            
            {/* Content */}
            <div 
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Navigation */}
            <div className="mt-12 pt-6 border-t flex justify-between items-center">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
              >
                <FaArrowLeft />
                Back to Blog
              </Link>
              
              {navigator.share && (
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                >
                  <FaShare />
                  Share Article
                </button>
              )}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
};

export default BlogPostPage; 