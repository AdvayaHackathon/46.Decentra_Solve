import React from 'react';
import BackButton from '../components/BackButton';

const PersonalSpacePage = () => {
  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <BackButton />
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Personal Space
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Your private area for personal health records and preferences
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Medical Records</h3>
            <p className="mt-2 text-gray-600">View and manage your medical history</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Appointment History</h3>
            <p className="mt-2 text-gray-600">Track your past and upcoming appointments</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-medium text-gray-900">Preferences</h3>
            <p className="mt-2 text-gray-600">Customize your experience and notifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalSpacePage; 