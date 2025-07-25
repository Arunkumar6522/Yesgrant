import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import BlogsPage from './pages/BlogsPage';
import BlogPostPage from './pages/BlogPostPage';
import MentorsPage from './pages/MentorsPage';
import NavBar from './components/Navbar/NavBar';
import EligibilityModal from './components/EligibilityModal/EligibilityForm';
import PolicyModal from './components/PolicyModal/PolicyModal';
import ResumeUpload from './components/ResumeUpload/ResumeUpload';
import Chatbot from './components/Chatbot/Chatbot';
import SuccessStories from './components/SuccessStories/SuccessStories';
import NotFound from './pages/NotFound';
import { AnalyticsProvider } from './context/AnalyticsContext';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('eligibility');
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const openModal = (mode = 'eligibility') => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openPolicyModal = () => {
    setIsPolicyModalOpen(true);
  };

  const closePolicyModal = () => {
    setIsPolicyModalOpen(false);
  };

  const openResumeModal = () => {
    setIsResumeModalOpen(true);
  };

  const closeResumeModal = () => {
    setIsResumeModalOpen(false);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(prev => !prev);
  };

  return (
    <AnalyticsProvider>
      <div className="min-h-screen bg-white">
        <NavBar 
          openModal={openModal} 
          openPolicyModal={openPolicyModal}
          openResumeModal={openResumeModal}
        />
        
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:postId" element={<BlogPostPage />} />
          <Route path="/mentors" element={<MentorsPage />} />
          <Route path="/testimonials" element={<SuccessStories />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Modals */}
        {isModalOpen && (
          <EligibilityModal onClose={closeModal} mode={modalMode} />
        )}
        {isPolicyModalOpen && (
          <PolicyModal onClose={closePolicyModal} />
        )}
        {isResumeModalOpen && (
          <ResumeUpload onClose={closeResumeModal} />
        )}

        {/* Chatbot */}
        {isChatbotOpen && <Chatbot closeChat={() => setIsChatbotOpen(false)} />}
        
        {/* Chatbot Toggle Button */}
        <button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-primary/90 transition-colors z-30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isChatbotOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-4 4z"
              />
            )}
          </svg>
        </button>
      </div>
    </AnalyticsProvider>
  );
}

export default App;
