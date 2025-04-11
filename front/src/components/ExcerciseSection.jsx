import React from 'react';

const exercises = [
  {
    trimester: 'First Trimester',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800',
    exercises: ['Walking', 'Pelvic Tilts', 'Cat-Cow Stretch', 'Seated Leg Lifts'],
  },
  {
    trimester: 'Second Trimester',
    image: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=800',
    exercises: ['Swimming', 'Prenatal Pilates', 'Squats', 'Kegel Exercises'],
  },
  {
    trimester: 'Third Trimester',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    exercises: ['Pelvic Rocking', 'Butterfly Stretch', 'Deep Breathing', 'Gentle Walking'],
  },
];

const ExerciseSection = () => {
  return (
    <div id="exercise" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Safe Pregnancy Exercises
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Trimester-specific exercises to keep you and your baby healthy.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {exercises.map((item) => (
              <div key={item.trimester} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={item.image} alt={item.trimester} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900">{item.trimester}</h3>
                  <ul className="mt-4 space-y-2">
                    {item.exercises.map((exercise) => (
                      <li key={exercise} className="flex items-center text-gray-600">
                        <span className="h-2 w-2 bg-rose-500 rounded-full mr-2"></span>
                        {exercise}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseSection;