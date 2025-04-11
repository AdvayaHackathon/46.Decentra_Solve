import React from 'react';
import ChatBox from '../components/ChatBox';
import BackButton from '../components/BackButton';

const ChatPage = () => {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <ChatBox />
      </div>
    </div>
  );
};

export default ChatPage; 