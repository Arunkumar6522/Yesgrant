import React from 'react';
import { FaRobot } from 'react-icons/fa';

const ChatbotButton = ({ openChat }) => {
  return (
    <button
      onClick={openChat}
      className="fixed bottom-4 right-4 bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center z-20 hover:bg-green-600 transition-all duration-300"
      aria-label="Open Chat"
    >
      <FaRobot className="text-3xl" />
    </button>
  );
};

export default ChatbotButton; 