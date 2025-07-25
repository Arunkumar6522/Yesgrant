import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaUserFriends, FaClipboardCheck, FaNetworkWired } from 'react-icons/fa';
import { MdOutlineLightbulb } from 'react-icons/md';
import Footer from '../components/Footer/Footer';
import ScholarshipFunnel from '../components/ScholarshipFunnel/ScholarshipFunnel';

// Import images
import bannerImg from '../assets/images/banner.png';
import educationIcon from '../assets/images/education.png';
import scholarshipIcon from '../assets/images/scholarship.png';
import supportIcon from '../assets/images/support-icon.svg';

const PillarCard = ({ icon: Icon, number, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
  >
    <div className="flex items-start gap-4">
      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
        <Icon className="text-primary text-2xl" />
      </div>
      <div>
        <div className="text-sm font-medium text-primary mb-1">Step {number}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  </motion.div>
);

const AboutPage = () => {
  const stats = [
    { number: "500+", label: "Students Supported" },
    { number: "₹50L+", label: "Scholarships Facilitated" },
    { number: "20+", label: "Partner Institutions" },
    { number: "85%", label: "Application Success" }
  ];

  const values = [
    {
      title: "Education for All",
      description: "Making quality education accessible to every deserving student.",
      icon: educationIcon
    },
    {
      title: "Personalized Support",
      description: "One-on-one guidance throughout your scholarship journey.",
      icon: supportIcon
    },
    {
      title: "Financial Freedom",
      description: "Helping students achieve their goals without financial burden.",
      icon: scholarshipIcon
    }
  ];

  const pillars = [
    {
      icon: MdOutlineLightbulb,
      number: 1,
      title: "Expert Guidance",
      description: "Connect with experienced mentors who provide invaluable insights on various fellowships. Get your application materials reviewed by experts who have successfully secured prestigious scholarships."
    },
    {
      icon: FaUserFriends,
      number: 2,
      title: "Comprehensive Support",
      description: "Access detailed information about application deadlines, top universities, and their specific requirements. Receive subject-specific and country-specific guidance tailored to your needs."
    },
    {
      icon: FaClipboardCheck,
      number: 3,
      title: "Application Ready",
      description: "Build a strong and compelling university application with confidence. Our structured approach ensures you meet all requirements and present yourself effectively."
    },
    {
      icon: FaNetworkWired,
      number: 4,
      title: "Success & Network",
      description: "Secure university admissions with scholarships, significantly reducing your financial burden. Join a growing network of successful scholars and expand your professional connections."
    }
  ];

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
              About YESGrant
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering students worldwide to achieve their academic dreams through expert guidance and comprehensive support.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Selection Process Section */}
      <ScholarshipFunnel />

      {/* Mission Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  At YESGrant, we're committed to making quality education accessible to talented students worldwide. Our mission is to bridge the gap between ambitious students and prestigious educational opportunities through comprehensive guidance and support.
                </p>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <FaGraduationCap className="text-primary text-2xl" />
                    </div>
                    <div className="text-xl font-bold text-gray-800">Our Impact</div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      500+ Students Supported
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      ₹50L+ in Scholarships Secured
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      20+ Countries Reached
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Scholarship Benefits</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-xl">•</span>
                      <div>
                        <span className="font-semibold">Living Expenses:</span>
                        <p className="text-gray-600">€10,000–€14,017 per year</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-xl">•</span>
                      <div>
                        <span className="font-semibold">Travel Costs:</span>
                        <p className="text-gray-600">€1,000 for international travel</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary text-xl">•</span>
                      <div>
                        <span className="font-semibold">Additional Support:</span>
                        <p className="text-gray-600">Research funding and conference attendance opportunities</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4">Core Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      Excellence in Education
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      Student Success First
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      Global Perspective
                    </li>
                    <li className="flex items-center gap-2 text-gray-600">
                      <span className="text-primary">•</span>
                      Continuous Support
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage; 