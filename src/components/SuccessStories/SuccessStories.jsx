import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';
import successStoriesService from '../../services/successStoriesService';
import Footer from '../Footer/Footer';

const VideoTestimonial = ({ testimonial }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
  >
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${testimonial.youtubeId}`}
        title={`${testimonial.name}'s Success Story`}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    
    <div className="p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{testimonial.name}</h3>
      <p className="text-primary font-medium mb-1">{testimonial.fieldOfStudy}</p>
      <div className="flex justify-between items-center mb-1">
        <p className="text-gray-600">{testimonial.country}</p>
        {testimonial.university && (
          <p className="text-gray-700 font-semibold">{testimonial.university}</p>
        )}
      </div>
      {testimonial.testimonial && (
        <p className="italic text-gray-800 mb-4 text-center">“{testimonial.testimonial}”</p>
      )}
      <div className="bg-primary/5 px-4 py-2 rounded-full inline-block">
        <span className="text-primary font-semibold">Success Story</span>
      </div>
    </div>
  </motion.div>
);

const SuccessStories = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      setError(null);
      const videoTestimonials = await successStoriesService.getVideoTestimonials();
      setTestimonials(videoTestimonials);
    } catch (err) {
      setError('Failed to load testimonials. Please try again later.');
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={fetchTestimonials}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Student Success Stories</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our video testimonials will appear here once they are uploaded to the system.
            </p>
            <p className="text-gray-500">
              Check back soon for inspiring stories from our successful scholars!
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Student Success Stories</h2>
            <p className="text-xl text-gray-600">
              Hear directly from our scholars about their journey and achievements
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <VideoTestimonial key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-16"
          >
            <p className="text-2xl font-semibold text-gray-800 mb-6">
              Ready to Write Your Success Story?
            </p>
            <button className="primaryBtn text-lg px-8 py-3">
              Start Your Journey
            </button>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SuccessStories; 