import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const FloatingChatButton = () => {
  return (
    <Link
      to="/chat"
      className="fixed bottom-8 right-8 bg-rose-500 text-white p-4 rounded-full shadow-lg hover:bg-rose-600 transition-all duration-300 group"
    >
      <MessageSquare className="h-6 w-6" />
      <div className="absolute bottom-0 right-16 bg-white text-gray-800 text-sm px-4 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
        <div className="font-semibold text-rose-500">Sakhi cares</div>
        <div>How can she help today?</div>
      </div>
    </Link>
  );
};

export default FloatingChatButton; 