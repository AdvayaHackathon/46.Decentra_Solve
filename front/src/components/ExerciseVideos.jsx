import React from 'react';

const trimesterVideos = {
  first: [
    {
      title: 'Month-by-Month Workout: 1st Trimester',
      description: 'Comprehensive workout tailored for the first trimester',
      url: 'https://www.youtube.com/watch?v=U5CwY4Lo4dg',
    },
    {
      title: '15-Minute Prenatal Yoga | First Trimester',
      description: 'Quick yoga session for hormonal changes and discomforts',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
  second: [
    {
      title: 'Second Trimester Prenatal Fitness HIIT Workout',
      description: 'HIIT workout with resistance bands and hand weights',
      url: 'https://theeverymom.com/best-pregnancy-workouts-on-youtube/',
    },
    {
      title: 'Yoga for Pregnancy in the Second Trimester',
      description: '30-minute yoga flow with breathing techniques',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
  third: [
    {
      title: '20-Minute Full-Body Pregnancy Workout',
      description: 'Full-body workout suitable for the third trimester',
      url: 'https://www.youtube.com/watch?v=jiZ3eqenywc',
    },
    {
      title: 'Prenatal Yoga Routine: Gift Of Life',
      description: 'Gentle yoga routine for childbirth preparation',
      url: 'https://www.happiestbaby.eu/blogs/pregnancy/prenatal-yoga-videos',
    },
  ],
};

const ExerciseVideos = () => {
  return (
    <div id="exercise-videos" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Exercise Videos by Trimester
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Safe and effective workout videos for each stage of your pregnancy.
          </p>
        </div>

        <div className="mt-20 space-y-16">
          {Object.entries(trimesterVideos).map(([trimester, videos]) => (
            <div key={trimester}>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center capitalize">
                {trimester} Trimester
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((video) => (
                  <div key={video.title} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="p-6">
                      <h4 className="text-xl font-semibold text-gray-900">{video.title}</h4>
                      <p className="mt-2 text-gray-600">{video.description}</p>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-rose-500 hover:text-rose-600"
                      >
                        Watch Video
                        <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExerciseVideos;