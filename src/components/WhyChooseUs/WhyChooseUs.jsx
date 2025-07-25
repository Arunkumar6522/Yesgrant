import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaTimes, FaGraduationCap, FaUserFriends, FaFileAlt, FaClock, FaMoneyBillWave, FaNetworkWired } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Get into your top-choice of school</h2>
          <p className="text-lg text-gray-600">
            See how YESGrant transforms your graduate education journey
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Conventional Approach */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-700">Conventional approach</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaClock className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Tired</h4>
                  <p className="text-gray-600">Spending countless hours gathering information</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaTimes className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Frustrated</h4>
                  <p className="text-gray-600">With complex application processes and requirements</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaGraduationCap className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Difficult to succeed</h4>
                  <p className="text-gray-600">Without proper guidance and mentorship</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaMoneyBillWave className="text-red-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Expensive education</h4>
                  <p className="text-gray-600">Missing out on scholarship opportunities</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* YESGrant Approach */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-6 text-primary">YESGrant approach</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaClock className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Save time</h4>
                  <p className="text-gray-600">Step-by-step guidance by experts</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaUserFriends className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Expert mentorship</h4>
                  <p className="text-gray-600">Mentorship for zero-cost education!</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaMoneyBillWave className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Save money</h4>
                  <p className="text-gray-600">Templates and resources for success!</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <FaNetworkWired className="text-green-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Build your career</h4>
                  <p className="text-gray-600">With the right network</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 