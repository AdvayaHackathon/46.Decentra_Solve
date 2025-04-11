import React from 'react';
import BackButton from '../components/BackButton';

const ContactPage = () => {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Get in touch with our support team
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Email Support</h3>
            <p className="mt-2 text-gray-600">support@maatrcare.com</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Phone Support</h3>
            <p className="mt-2 text-gray-600">+1 (555) 123-4567</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Office Hours</h3>
            <p className="mt-2 text-gray-600">Monday - Friday: 9AM - 5PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 