import React, { useRef, useState } from 'react';
import { FiUpload, FiFile, FiX } from 'react-icons/fi';

const ResumeUpload = ({ closeModal }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('File size should not exceed 5MB');
        return;
      }
      if (!['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
        alert('Please upload a PDF or Word document');
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please upload your resume');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Here you would typically send the file to your server
      // For now, we'll simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // After successful upload, close modal and show success message
      alert('Thank you! We will review your resume and get back to you shortly.');
      closeModal();
    } catch (error) {
      alert('There was an error uploading your resume. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary">Check Your Eligibility</h2>
        <button 
          onClick={closeModal}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>
      </div>

      <p className="text-gray-600 mb-8">
        Upload your resume for a quick eligibility check. Our team will review your qualifications and get back to you with personalized scholarship opportunities.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${selectedFile ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          {selectedFile ? (
            <div className="flex items-center justify-center gap-3">
              <FiFile className="w-6 h-6 text-primary" />
              <span className="text-primary font-medium">{selectedFile.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = '';
                }}
                className="text-red-500 hover:text-red-700"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <FiUpload className="w-10 h-10 mx-auto text-gray-400" />
              <div>
                <p className="text-gray-600">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF or Word (max 5MB)</p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={closeModal}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedFile || isSubmitting}
            className={`primaryBtn ${(!selectedFile || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Uploading...' : 'Submit Resume'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResumeUpload; 