import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { motion } from 'framer-motion';
import blogService from '../services/blogService';
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';

const POSTS_PER_PAGE = 6;

const BlogsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
    window.scrollTo(0, 0);
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await blogService.fetchPosts();
      setPosts(fetchedPosts);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  // Calculate pagination values
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light">
        <div className="container py-32 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-light">
        <div className="container py-32 flex flex-col items-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchPosts}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <div className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest scholarship opportunities, study abroad tips, 
            and success stories from our global community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link to={`/blog/${post.id}`}>
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </Link>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUser className="text-primary" />
                    <span>{post.author}</span>
                  </div>
                </div>

                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-xl font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                {post.labels && post.labels.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
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

                <Link
                  to={`/blog/${post.id}`}
                  className="inline-block text-primary font-semibold hover:text-secondary transition-colors"
                >
                  Read More →
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  currentPage === pageNumber
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 hover:bg-primary/10 text-gray-700'
                }`}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogsPage;
