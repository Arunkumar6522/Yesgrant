import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">You will be redirected to the home page in {countdown} second{countdown !== 1 ? 's' : ''}.</p>
      <button
        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        onClick={() => navigate('/')}
      >
        Go to Home Now
      </button>
    </div>
  );
};

export default NotFound; 