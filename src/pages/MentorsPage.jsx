import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { SiGooglescholar, SiResearchgate } from 'react-icons/si';
import { HiLocationMarker } from 'react-icons/hi';
import Footer from '../components/Footer/Footer';
import { featuredMentors, allMentors } from '../data/mentorsData';

const MentorCard = ({ mentor, isFeatured }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
      isFeatured ? 'border-2 border-primary/20' : ''
    }`}
  >
    <div className="relative h-80 overflow-hidden">
      <img 
        src={mentor.image} 
        alt={mentor.name} 
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-6 px-6">
        <h3 className="text-2xl font-bold text-white mb-2">{mentor.name}</h3>
        <p className="text-white/90 flex items-center gap-2 mb-2">
          <span>{mentor.title}</span>
          {mentor.location && (
            <>
              <span className="text-white/60">•</span>
              <span className="flex items-center gap-1">
                <HiLocationMarker className="inline" />
                {mentor.location}
              </span>
            </>
          )}
        </p>
        <p className="text-white/80 text-sm">{mentor.description}</p>
      </div>
    </div>
    
    <div className="p-6">
      <div className="mb-6">
        <p className="text-primary font-semibold">{mentor.achievement}</p>
      </div>
      
      {mentor.education && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaGraduationCap className="text-primary" />
            Education
          </h4>
          <ul className="text-sm text-gray-600 space-y-2">
            {mentor.education.map((edu, i) => (
              <li key={i} className="flex flex-col">
                <span className="font-medium">{edu.degree}</span>
                <span className="text-gray-500">{edu.institution}, {edu.location} • {edu.year}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {mentor.positions && (
        <div className="mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaBriefcase className="text-primary" />
            Experience
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            {mentor.positions.slice(0, 3).map((position, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-1.5">•</span>
                <span>{position}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {mentor.links && (
        <div className="flex space-x-4 pt-4 border-t border-gray-100">
          {mentor.links.linkedin && mentor.links.linkedin !== '#' && (
            <a href={mentor.links.linkedin} target="_blank" rel="noopener noreferrer" 
               className="text-2xl text-blue-600 hover:text-blue-700 transition-colors">
              <FaLinkedin />
            </a>
          )}
          {mentor.links.scholar && mentor.links.scholar !== '#' && (
            <a href={mentor.links.scholar} target="_blank" rel="noopener noreferrer"
               className="text-2xl text-gray-600 hover:text-gray-700 transition-colors">
              <SiGooglescholar />
            </a>
          )}
          {mentor.links.researchgate && mentor.links.researchgate !== '#' && (
            <a href={mentor.links.researchgate} target="_blank" rel="noopener noreferrer"
               className="text-2xl text-blue-500 hover:text-blue-600 transition-colors">
              <SiResearchgate />
            </a>
          )}
        </div>
      )}
    </div>
  </motion.div>
);

const MentorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Learn from Expert Mentors
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Connect with successful scholars who have secured prestigious scholarships and are now leading experts in their fields. Our mentors provide personalized guidance to help you achieve your academic goals.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Featured Mentors Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">Featured Mentors</h2>
            <p className="text-xl text-gray-600">Meet our most experienced scholarship mentors</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {featuredMentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MentorCard mentor={mentor} isFeatured={true} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* All Mentors Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-4">All Mentors</h2>
            <p className="text-xl text-gray-600">Explore our complete network of expert mentors</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {allMentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <MentorCard mentor={mentor} isFeatured={false} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MentorsPage; 