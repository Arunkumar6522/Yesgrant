import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaCalendarAlt, FaUser, FaTags } from 'react-icons/fa';
import blogService from '../../services/blogService';
import 'swiper/css';
import 'swiper/css/pagination';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedPosts = await blogService.fetchPosts();
      setPosts(fetchedPosts.slice(0, 6)); // Only show first 6 posts
    } catch (err) {
      setError('Failed to load blog posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-light">
        <div className="container">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-light">
        <div className="container">
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Latest Blog Posts</h2>
          <p className="text-gray-600">Stay updated with our latest articles and insights</p>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {posts.map((post) => (
            <SwiperSlide key={post.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
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
                    <h3 className="text-xl font-semibold mb-3 hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                  {post.labels && post.labels.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <FaTags className="text-primary mt-1" />
                      {post.labels.slice(0, 3).map((label, idx) => (
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
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="text-center mt-8">
          <Link
            to="/blog"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Blog; 