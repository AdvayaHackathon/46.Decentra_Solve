import React from 'react';
import { Link } from 'react-router-dom';
import { Stethoscope, Heart, Utensils, Pill, Activity, AlertTriangle } from 'lucide-react';

const features = [
  {
    name: 'Pain Diagnosis',
    description: 'Get accurate diagnosis for your pain symptoms with our AI-powered system.',
    icon: Stethoscope,
    link: '/pain-diagnosis'
  },
  {
    name: 'Exercise Guide',
    description: 'Access curated exercise videos for each trimester of your pregnancy.',
    icon: Activity,
    link: '/exercise-videos'
  },
  {
    name: 'Nutrition Guide',
    description: 'Get personalized nutrition advice and meal plans for a healthy pregnancy.',
    icon: Utensils,
    link: '/nutrition'
  },
  {
    name: 'Common Symptoms',
    description: 'Learn about common pregnancy symptoms and how to manage them.',
    icon: AlertTriangle,
    link: '/symptoms'
  },
  {
    name: 'Health Problems',
    description: 'Information about common health problems during pregnancy and their solutions.',
    icon: Heart,
    link: '/health-problems'
  },
  {
    name: 'Medication Guide',
    description: 'Safe medication information and guidelines for pregnancy.',
    icon: Pill,
    link: '/medication'
  }
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Services
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Explore our comprehensive range of pregnancy care services
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Link
                key={feature.name}
                to={feature.link}
                className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-rose-500 rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <div>
                  <span className="rounded-lg inline-flex p-3 bg-rose-50 text-rose-700 ring-4 ring-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    {feature.description}
                  </p>
                </div>
                <span
                  className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-rose-500"
                  aria-hidden="true"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;