import React from 'react';
import Hero from '../components/Hero/Hero';
import ScholarshipInfo from '../components/ScholarshipInfo/ScholarshipInfo';
import Blog from '../components/Blog/Blog';
import Footer from '../components/Footer/Footer';
import Mentors from '../components/Mentors/Mentors';
import ProcessFlow from '../components/ProcessFlow/ProcessFlow';

const Home = ({ posts, loading, openModal }) => {
  const handleOpenModal = (mode) => {
    if (typeof openModal === 'function') {
      openModal(mode);
    }
  };

  return (
    <>
      <Hero openModal={handleOpenModal} />
      <ProcessFlow />
      <ScholarshipInfo />
      <Mentors />
      <Blog posts={posts} loading={loading} />
      <Footer />
    </>
  );
};

export default Home; 