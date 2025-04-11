import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  return (
    <Link 
      to="/"
      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Home
    </Link>
  );
};

export default BackButton; 