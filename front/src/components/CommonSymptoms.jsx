import React, { useState } from 'react';

const symptoms = [
  {
    title: 'Constipation',
    description: 'Hormonal changes can cause constipation early in pregnancy.',
    remedies: [
      'Eat high-fiber foods (wholemeal breads, cereals, fruits, vegetables, pulses)',
      'Exercise regularly to maintain muscle tone',
      'Drink plenty of water',
      'Avoid iron supplements unless prescribed'
    ]
  },
  {
    title: 'Cramps',
    description: 'Sudden, sharp pain, usually in calf muscles or feet, most common at night.',
    remedies: [
      'Perform regular gentle exercises',
      'Bend and stretch foot up and down 30 times',
      'Rotate foot 8 times each way',
      'Pull toes up towards ankle when cramp occurs',
      'Massage the affected muscle'
    ]
  },
  {
    title: 'Feeling Faint',
    description: 'Common due to hormonal changes affecting blood flow to the brain.',
    remedies: [
      'Stand up slowly from sitting or lying down',
      'Sit down immediately if feeling faint while standing',
      'Lie on your side if feeling faint while lying down',
      'Avoid lying flat on your back after 28 weeks'
    ]
  },
  {
    title: 'Feeling Hot',
    description: 'Increased warmth due to hormonal changes and increased blood supply to skin.',
    remedies: [
      'Wear loose, natural fiber clothing',
      'Keep room cool with electric fan',
      'Wash frequently to stay fresh',
      'Stay hydrated'
    ]
  },
  {
    title: 'Incontinence',
    description: 'Common during pregnancy due to relaxed pelvic floor muscles.',
    remedies: [
      'Practice pelvic floor exercises',
      'Consult healthcare provider if concerned',
      'Empty bladder regularly',
      'Avoid lifting heavy objects'
    ]
  },
  {
    title: 'Frequent Urination',
    description: 'Common throughout pregnancy, especially in later stages.',
    remedies: [
      'Reduce evening fluid intake',
      'Stay hydrated during the day',
      'Rock back and forth while urinating in later pregnancy',
      'Seek medical attention if experiencing pain or blood in urine'
    ]
  },
  {
    title: 'Skin Changes',
    description: 'Hormonal changes can cause darkening of nipples, skin patches, and development of linea nigra.',
    remedies: [
      'Use high-factor sunscreen',
      'Limit sun exposure',
      'Keep skin moisturized',
      'Remember changes usually fade post-pregnancy'
    ]
  },
  {
    title: 'Varicose Veins',
    description: 'Swollen veins that can be uncomfortable but are generally harmless.',
    remedies: [
      'Avoid standing for long periods',
      'Don\'t sit with crossed legs',
      'Maintain healthy weight',
      'Elevate legs when sitting or sleeping',
      'Wear compression stockings',
      'Stay active with walking and swimming'
    ]
  }
];

const CommonSymptoms = () => {
  const [selectedSymptom, setSelectedSymptom] = useState(symptoms[0]);

  return (
    <div id="common-symptoms" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Common Pregnancy Symptoms
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Understanding and managing common discomforts during pregnancy.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-2">
            {symptoms.map((symptom) => (
              <button
                key={symptom.title}
                onClick={() => setSelectedSymptom(symptom)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                  selectedSymptom.title === symptom.title
                    ? 'bg-rose-500 text-white'
                    : 'bg-white hover:bg-rose-50 text-gray-900'
                }`}
              >
                {symptom.title}
              </button>
            ))}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedSymptom.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedSymptom.description}
              </p>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Recommended Remedies:
                </h4>
                <ul className="space-y-2">
                  {selectedSymptom.remedies.map((remedy, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-rose-100 text-rose-500 mr-3">
                        ✓
                      </span>
                      <span className="text-gray-600">{remedy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 italic">
            Always consult with your healthcare provider about any concerns during pregnancy.
            This information is for general guidance only.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommonSymptoms;