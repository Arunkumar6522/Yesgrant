import React from 'react';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const steps = [
    {
      stage: "Scholarship Posts Online",
      count: "1000",
      color: "from-blue-500 to-blue-600"
    },
    {
      stage: "Submit Application",
      count: "250",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      stage: "First Screening",
      count: "60",
      color: "from-violet-500 to-violet-600"
    },
    {
      stage: "Second Screening",
      count: "4-6",
      color: "from-purple-500 to-purple-600"
    },
    {
      stage: "Offer",
      count: "1-2",
      color: "from-pink-500 to-pink-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Does It Work?
          </h2>
          <p className="text-xl text-gray-600">
            Understanding Our Selection Process
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative mb-4 last:mb-0"
              style={{
                width: `${85 - (index * 15)}%`,
                marginLeft: `${7.5 + (index * 7.5)}%`
              }}
            >
              <div className={`
                bg-gradient-to-r ${step.color} 
                rounded-lg 
                shadow-lg 
                transform hover:scale-102 transition-transform duration-300
              `}>
                <div className="relative px-6 py-4">
                  {/* Triangle shapes for funnel effect */}
                  {index < steps.length - 1 && (
                    <>
                      <div 
                        className="absolute bottom-0 left-0 w-8 h-8 transform translate-y-1/2 -translate-x-4"
                        style={{
                          background: `linear-gradient(45deg, transparent 50%, rgb(var(--background-end-rgb)) 50%)`,
                          zIndex: 1
                        }}
                      />
                      <div 
                        className="absolute bottom-0 right-0 w-8 h-8 transform translate-y-1/2 translate-x-4"
                        style={{
                          background: `linear-gradient(-45deg, transparent 50%, rgb(var(--background-end-rgb)) 50%)`,
                          zIndex: 1
                        }}
                      />
                    </>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h3 className="text-white text-lg font-semibold">
                        {index + 1}. {step.stage}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <div className="bg-white/20 rounded-full px-4 py-1">
                        <span className="text-white font-bold">{step.count}</span>
                        <span className="text-white/80 ml-1 text-sm">Students</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connecting lines */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                    className="w-px h-4 bg-gradient-to-b from-gray-400 to-transparent mx-auto"
                  />
                </div>
              )}
            </motion.div>
          ))}

          {/* Side lines to show funnel shape */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-gray-300 to-transparent" 
               style={{ transform: 'rotate(5deg)', transformOrigin: 'top' }} />
          <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-gray-300 to-transparent"
               style={{ transform: 'rotate(-5deg)', transformOrigin: 'top' }} />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 