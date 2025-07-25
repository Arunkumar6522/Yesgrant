import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose } from 'react-icons/ai';
import { FaUser, FaGraduationCap, FaTrophy, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import applicationService from '../../services/applicationService';

const EligibilityForm = ({ onClose, mode = 'eligibility' }) => {
  const [currentPhase, setCurrentPhase] = useState(1);
  const [formData, setFormData] = useState({
    // Phase 1: Personal Information
    name: '',
    email: '',
    number: '',
    yearOfStudy: '',
    
    // Phase 2: Academic Background
    gpa: '',
    fieldOfStudy: '',
    testScores: '',
    researchPapers: '',
    coursesCompleted: '',
    
    // Phase 3: Experience & Goals
    internshipExperience: '',
    extracurricular: '',
    workExperience: '',
    scholarshipApplications: '',
    awards: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [phaseErrors, setPhaseErrors] = useState({});

  const phases = [
    {
      id: 1,
      title: "Personal Information",
      icon: FaUser,
      description: "Let's start with your basic details"
    },
    {
      id: 2,
      title: "Academic Background",
      icon: FaGraduationCap,
      description: "Tell us about your academic journey"
    },
    {
      id: 3,
      title: "Experience & Goals",
      icon: FaTrophy,
      description: "Share your experiences and achievements"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear phase error when user starts typing
    if (phaseErrors[currentPhase]) {
      setPhaseErrors(prev => ({
        ...prev,
        [currentPhase]: null
      }));
    }
  };

  const validatePhase = (phase) => {
    const errors = [];
    
    switch (phase) {
      case 1:
        if (!formData.name.trim()) errors.push('Name is required');
        if (!formData.email.trim()) errors.push('Email is required');
        if (!formData.number.trim()) errors.push('Phone number is required');
        if (!formData.yearOfStudy) errors.push('Year of study is required');
        break;
      case 2:
        if (!formData.gpa.trim()) errors.push('GPA is required');
        if (!formData.fieldOfStudy.trim()) errors.push('Field of study is required');
        break;
      case 3:
        // Phase 3 can be optional, but at least one field should be filled
        const phase3Fields = [
          formData.internshipExperience,
          formData.extracurricular,
          formData.workExperience,
          formData.scholarshipApplications,
          formData.awards
        ];
        if (phase3Fields.every(field => !field.trim())) {
          errors.push('Please fill at least one field in this section');
        }
        break;
    }
    
    return errors;
  };

  const nextPhase = () => {
    const errors = validatePhase(currentPhase);
    if (errors.length > 0) {
      setPhaseErrors(prev => ({
        ...prev,
        [currentPhase]: errors
      }));
      return;
    }
    
    setPhaseErrors(prev => ({
      ...prev,
      [currentPhase]: null
    }));
    
    if (currentPhase < 3) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 1) {
      setCurrentPhase(currentPhase - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate final phase
    const errors = validatePhase(currentPhase);
    if (errors.length > 0) {
      setPhaseErrors(prev => ({
        ...prev,
        [currentPhase]: errors
      }));
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await applicationService.submitApplication(formData);
      
      if (result.status === 'success') {
        setSubmitStatus('success');
        // Show success alert
        alert('🎉 Application submitted successfully! We will contact you soon.');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus('error');
        // Show error alert with detailed message
        alert(`❌ Error: ${result.message || 'Application submission failed. Please try again.'}`);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
      // Show error alert
      alert(`❌ Error: ${error.message || 'Failed to submit application. Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderPhase1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="number"
            value={formData.number}
                    onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="Enter your phone number"
          />
                </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year of Study Currently *
          </label>
                  <select
            name="yearOfStudy"
            value={formData.yearOfStudy}
                    onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="">Select year</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
            <option value="Master's 1st Year">Master's 1st Year</option>
            <option value="Master's 2nd Year">Master's 2nd Year</option>
            <option value="PhD">PhD</option>
            <option value="Graduated">Graduated</option>
                  </select>
        </div>
                </div>
    </motion.div>
  );

  const renderPhase2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GPA or Percentage *
          </label>
                  <input
                    type="text"
            name="gpa"
            value={formData.gpa}
                    onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., 3.8/4.0 or 85%"
                  />
                </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Field of Study *
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
                    onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="e.g., Computer Science, Engineering"
          />
        </div>
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Standardized Test Scores
        </label>
        <textarea
          name="testScores"
          value={formData.testScores}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="e.g., IELTS: 7.5, TOEFL: 105, GRE: 320, SAT: 1450"
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Published Research Papers, Reviews, or Conference Presentations
        </label>
        <textarea
          name="researchPapers"
          value={formData.researchPapers}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="List your publications, conference presentations, or research work"
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Courses, Certifications, or Online Programs Completed
        </label>
        <textarea
          name="coursesCompleted"
          value={formData.coursesCompleted}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="List relevant courses, certifications, or online programs you've completed"
        />
                </div>
    </motion.div>
  );

  const renderPhase3 = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Internship or Practical Training Experience
        </label>
        <textarea
          name="internshipExperience"
          value={formData.internshipExperience}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe your internship experiences, company names, duration, and key responsibilities"
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Extracurricular Activities
        </label>
        <textarea
          name="extracurricular"
          value={formData.extracurricular}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe your involvement in clubs, sports, volunteering, leadership roles, etc."
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Work Experience
        </label>
        <textarea
          name="workExperience"
          value={formData.workExperience}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="Describe your work experience, including part-time jobs, freelancing, or full-time positions"
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Previous Scholarship or Financial Aid Applications
        </label>
        <textarea
          name="scholarshipApplications"
          value={formData.scholarshipApplications}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="List any scholarships or financial aid you've applied for or received"
        />
                </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          National or International Awards, Honors, or Recognitions
                  </label>
        <textarea
          name="awards"
          value={formData.awards}
                    onChange={handleChange}
          rows="3"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
          placeholder="List any awards, honors, or special recognitions you've received"
                  />
      </div>
    </motion.div>
    );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with Progress */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {mode === 'journey' ? 'Start Your Journey' : 'Application Form'}
      </h2>
              <p className="text-gray-600 mt-1">
                Phase {currentPhase} of 3: {phases[currentPhase - 1].description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            {phases.map((phase, index) => {
              const PhaseIcon = phase.icon;
              const isActive = currentPhase === phase.id;
              const isCompleted = currentPhase > phase.id;
              
              return (
                <React.Fragment key={phase.id}>
                  <div className="flex flex-col items-center">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                      ${isActive ? 'bg-primary text-white' : 
                        isCompleted ? 'bg-green-500 text-white' : 
                        'bg-gray-200 text-gray-500'}
                    `}>
                      <PhaseIcon size={20} />
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${isActive ? 'text-primary' : isCompleted ? 'text-green-600' : 'text-gray-500'}`}>
                        {phase.title}
                      </div>
                    </div>
                  </div>
                  
                  {index < phases.length - 1 && (
                    <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-300 ${
                      currentPhase > phase.id ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Phase Errors */}
          {phaseErrors[currentPhase] && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <ul className="text-red-800 text-sm">
                {phaseErrors[currentPhase].map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentPhase === 1 && renderPhase1()}
              {currentPhase === 2 && renderPhase2()}
              {currentPhase === 3 && renderPhase3()}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center pt-8">
              <button
                type="button"
                onClick={prevPhase}
                disabled={currentPhase === 1}
                className="flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaArrowLeft size={16} />
                Previous
              </button>

              <div className="text-sm text-gray-500">
                Phase {currentPhase} of 3
              </div>

              {currentPhase < 3 ? (
            <button
              type="button"
                  onClick={nextPhase}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
                  Next
                  <FaArrowRight size={16} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </button>
          )}
        </div>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 font-medium">
                  ✅ Application submitted successfully! We'll contact you soon.
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 font-medium">
                  ❌ Error submitting application. Please try again.
                </p>
      </div>
        )}
      </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EligibilityForm; 