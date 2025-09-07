import React, { useState } from 'react';
import Logo from '../../assets/images/new logo.svg';
import PolicyModal from '../PolicyModal/PolicyModal';
import ComingSoonModal from '../ComingSoonModal/ComingSoonModal';
import { policyContent } from '../../data/policyContent.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [comingSoonModal, setComingSoonModal] = useState({ isOpen: false, featureName: '' });
  const navigate = useNavigate();

  const openModal = (modalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const openPolicyModal = (modalType) => {
    openModal(modalType);
  };

  const openComingSoonModal = (featureName) => {
    setComingSoonModal({ isOpen: true, featureName });
  };

  const closeComingSoonModal = () => {
    setComingSoonModal({ isOpen: false, featureName: '' });
  };

  return (
    <>
      <footer className="bg-dark text-white py-12">
        <div className="container mx-auto px-4">
            {/* Logo and Description */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={Logo}
                    alt="YESGrant Logo"
                    className="h-16 cursor-pointer bg-white p-2 rounded-lg"
                    onClick={() => {
                      navigate('/');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                  <span className="text-gray-400 text-xs" style={{ opacity: 0.00625 }}>6N</span>
                </div>
                <p className="text-gray-300 max-w-2xl">
                    YESGrant is your trusted partner in achieving your academic dreams through fully funded scholarships. 
                    We provide expert guidance and resources to help you succeed in your educational journey.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Company Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Company</h3>
                    <ul className="space-y-2">
                        <li>
                          <Link
                            to="/"
                            className="text-gray-300 hover:text-primary transition-colors"
                            onClick={() => {
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }, 0);
                            }}
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/about"
                            className="text-gray-300 hover:text-primary transition-colors"
                            onClick={() => {
                              setTimeout(() => {
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }, 0);
                            }}
                          >
                            About
                          </Link>
                        </li>
                        <li><Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">Blog</Link></li>
                        <li><Link to="/mentors" className="text-gray-300 hover:text-primary transition-colors">Mentors</Link></li>
                        <li><Link to="/testimonials" className="text-gray-300 hover:text-primary transition-colors">Testimonials</Link></li>
                    </ul>
                </div>

                {/* Tools */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Tools</h3>
                    <ul className="space-y-2">
                        <li><button onClick={() => openComingSoonModal('Resume Eligibility')} className="text-gray-300 hover:text-primary transition-colors text-left">Resume Eligibility</button></li>
                        <li><button onClick={() => openComingSoonModal('Scholarship Eligibility Quiz')} className="text-gray-300 hover:text-primary transition-colors text-left">Scholarship Eligibility Quiz</button></li>
                        <li><button onClick={() => openComingSoonModal('Study Budget Calculator')} className="text-gray-300 hover:text-primary transition-colors text-left">Study Budget Calculator</button></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Success Stories</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Blog Articles</a></li>
                        <li><a href="#" className="text-gray-300 hover:text-primary transition-colors">Scholarship Updates</a></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center space-x-3">
                            <FaEnvelope className="text-primary" />
                            <a href="mailto:sales@yesgrant.com" className="text-gray-300 hover:text-primary transition-colors">sales@yesgrant.com</a>
                        </li>
                        <li className="flex items-center space-x-3">
                            <FaWhatsapp className="text-primary" />
                            <a href="https://wa.me/33755070540" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">+33755070540</a>
                        </li>
                    </ul>
                    <div className="mt-4 flex space-x-4">
                        <a href="https://www.facebook.com/profile.php?id=61578297291046" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                            <FaFacebook className="text-2xl" />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                            <FaTwitter className="text-2xl" />
                        </a>
                        <a href="https://www.linkedin.com/in/yes-grant-43ba31370/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors">
                            <FaLinkedin className="text-2xl" />
                        </a>
                        <a href="#" className="text-gray-300 hover:text-primary transition-colors">
                            <FaInstagram className="text-2xl" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright and Policy Links */}
            <div className="mt-12 pt-8 border-t border-gray-700">
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <p className="text-gray-400 text-sm">© 2025 Wise tutors all rights reserved</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <button onClick={openPolicyModal} className="text-gray-400 hover:text-primary text-sm transition-colors">Privacy Policy</button>
                        <span className="text-gray-400">|</span>
                        <button onClick={openPolicyModal} className="text-gray-400 hover:text-primary text-sm transition-colors">Terms of Service</button>
                    </div>
                </div>
            </div>
        </div>
      </footer>

      {/* Policy Modals */}
      <PolicyModal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title="Privacy Policy"
        content={policyContent.privacy}
      />
      <PolicyModal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title="Terms of Service"
        content={policyContent.terms}
      />
      <PolicyModal
        isOpen={activeModal === 'cookie'}
        onClose={closeModal}
        title="Cookie Policy"
        content={policyContent.cookie}
      />

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={closeComingSoonModal}
        featureName={comingSoonModal.featureName}
      />
    </>
  );
};

export default Footer;