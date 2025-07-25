import React from 'react';
import { motion } from 'framer-motion';
import './ScholarshipFunnel.css';

const ScholarshipFunnel = () => {
  const stages = [
    {
      count: "1000",
      label: "See scholarship posts online",
    },
    {
      count: "250",
      label: "Submit application",
    },
    {
      count: "60",
      label: "Pass first screening",
    },
    {
      count: "4-6",
      label: "Pass second screening",
    },
    {
      count: "1-2",
      label: "Receive offer",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <h2 className="text-4xl font-bold mb-4">Understanding our selection process</h2>
          <p className="text-lg text-gray-600">
            Your journey from discovery to acceptance
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Card-based Visualization */}
          <div className="space-y-6">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6"
              >
                <div className="flex items-center justify-center text-center">
                  <div className="flex-1">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-lg font-bold mr-4">
                        {index + 1}
                      </div>
                      <div className="text-2xl font-bold text-primary">
                        {stage.count} Students
                      </div>
                    </div>
                    <p className="text-gray-700 text-lg font-medium">
                      {stage.label}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <p className="text-2xl">
              <span className="font-bold text-green-600">YesGrant</span> course helps{' '}
              <motion.span
                animate={{ 
                  scale: [1, 1.1, 1],
                  color: ['#059669', '#047857', '#059669']
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
                className="font-bold"
              >
                Persuade
              </motion.span>
              {' '}them you are that{' '}
              <motion.span
                animate={{ 
                  scale: [1, 1.2, 1],
                  color: ['#059669', '#047857', '#059669']
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 1
                }}
                className="font-bold text-green-600"
              >
                ONE!
              </motion.span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ScholarshipFunnel; 