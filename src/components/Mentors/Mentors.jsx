import React, { useState } from 'react';
import { FaLinkedin, FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { SiGooglescholar, SiResearchgate } from 'react-icons/si';
import { HiLocationMarker } from 'react-icons/hi';
import { featuredMentors, additionalMentors } from '../../data/mentorsData';

const Mentors = () => {
  const [activeTab, setActiveTab] = useState('featured');

  return (
    <section id="mentors" className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">Meet Our Mentors</h2>
        <p className="text-lg text-gray-600 text-center mb-8">Learn from successful scholars who've walked the path before you</p>
        <p className="text-xl text-primary font-semibold text-center mb-12">More than 20 mentors from different fields of research around the globe!</p>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <button 
            className={`px-6 py-2 mx-2 rounded-full transition-all ${activeTab === 'featured' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured Mentors
          </button>
          <button 
            className={`px-6 py-2 mx-2 rounded-full transition-all ${activeTab === 'all' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            onClick={() => setActiveTab('all')}
          >
            All Mentors
          </button>
        </div>

        {/* Featured Mentors View */}
        {activeTab === 'featured' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map((mentor, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className="relative h-[28rem] overflow-hidden">
                  <img 
                    src={mentor.image} 
                    alt={mentor.name} 
                    className="w-full h-full object-cover object-[center_15%] group-hover:scale-105 transition-transform duration-300"
                  />
                  {mentor.badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 text-xs md:text-sm font-semibold bg-white/90 text-primary rounded-full shadow-[0_0_15px_rgba(34,197,94,0.8)] ring-1 ring-primary/30">
                        {mentor.badge}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-24 pb-4 px-4">
                    <h3 className="text-2xl font-semibold text-white mb-1">{mentor.name}</h3>
                    <p className="text-white/90 flex items-center gap-2">
                      <span>{mentor.title}</span>
                      <span className="text-white/60">•</span>
                      <span className="flex items-center gap-1">
                        <HiLocationMarker className="inline" />
                        {mentor.location}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-600">{mentor.description}</p>
                    <p className="text-primary font-medium mt-2">{mentor.achievement}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaGraduationCap className="text-primary" />
                      Education Abroad
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-2">
                      {mentor.education.filter(edu => edu.location !== 'India').map((edu, i) => (
                        <li key={i} className="flex flex-col">
                          <span className="font-medium">{edu.degree}</span>
                          <span className="text-gray-500">{edu.institution}, {edu.location} • {edu.year}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <FaBriefcase className="text-primary" />
                      Current Role
                    </h4>
                    <p className="text-sm text-gray-600">{mentor.positions[0]}</p>
                  </div>
                  
                  <div className="flex space-x-4 pt-4 border-t">
                    {mentor.links.linkedin && (
                      <a href={mentor.links.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="text-2xl text-blue-600 hover:text-blue-700 transition-colors">
                        <FaLinkedin />
                      </a>
                    )}
                    {mentor.links.scholar && (
                      <a href={mentor.links.scholar} target="_blank" rel="noopener noreferrer"
                         className="text-2xl text-gray-600 hover:text-gray-700 transition-colors">
                        <SiGooglescholar />
                      </a>
                    )}
                    {mentor.links.researchgate && (
                      <a href={mentor.links.researchgate} target="_blank" rel="noopener noreferrer"
                         className="text-2xl text-blue-500 hover:text-blue-600 transition-colors">
                        <SiResearchgate />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* All Mentors View */}
        {activeTab === 'all' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {additionalMentors.map((mentor, index) => (
              <div key={index} className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                  {mentor.image ? (
                    <img 
                      src={mentor.image} 
                      alt={mentor.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${mentor.color} flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}>
                      <span className="text-4xl font-bold text-white">
                        {mentor.initials}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-1 text-gray-800">{mentor.name}</h3>
                  <p className="text-primary font-medium">{mentor.field}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Mentors; 