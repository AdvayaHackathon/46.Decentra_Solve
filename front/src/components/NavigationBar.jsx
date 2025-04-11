import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Menu } from 'lucide-react';

const NavigationBar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Baby className="h-8 w-8 text-rose-500" />
              <span className="ml-2 text-2xl font-semibold text-gray-900">MaatrCare</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rose-500">Home</Link>
            <Link to="/contact" className="text-gray-700 hover:text-rose-500">Contact Us</Link>
            <Link to="/emergency" className="text-gray-700 hover:text-rose-500">Emergency Contact</Link>
            <Link to="/personal-space" className="text-gray-700 hover:text-rose-500">Personal Space</Link>
            <button className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">
              Connect Wallet
            </button>
          </div>
          <div className="md:hidden">
            <Menu className="h-6 w-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;