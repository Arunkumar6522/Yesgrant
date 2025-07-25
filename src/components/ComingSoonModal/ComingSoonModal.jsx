import React from 'react';
import { FaTimes, FaRocket } from 'react-icons/fa';

const ComingSoonModal = ({ isOpen, onClose, featureName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 animate-fadeInUp">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Coming Soon!</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="mb-6">
            <FaRocket className="text-6xl text-primary mx-auto mb-4" />
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {featureName} is Coming Soon!
          </h3>
          
          <p className="text-gray-600 mb-6">
            We're working hard to bring you this amazing feature. Stay tuned for updates and be the first to experience it when it launches!
          </p>

          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Want to be notified when it's ready?
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={onClose}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Got it!
              </button>
              <button 
                onClick={() => {
                  window.open('https://wa.me/33755070540', '_blank');
                  onClose();
                }}
                className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal; 