import React, { useState } from 'react';

const nutritionData = {
  first: {
    recommended: [
      {
        category: 'Folate-rich foods',
        items: ['Spinach', 'Lentils', 'Chickpeas', 'Fortified cereals'],
        benefits: 'Essential for neural tube development',
        image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin B6 foods',
        items: ['Bananas', 'Potatoes', 'Poultry'],
        benefits: 'Helps reduce nausea',
        image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Iron-rich foods',
        items: ['Lean meats', 'Beans', 'Tofu', 'Leafy greens'],
        benefits: 'For oxygen supply',
        image: 'https://images.unsplash.com/photo-1625937286074-9ca519d5d9df?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Omega-3 fatty acids',
        items: ['Chia seeds', 'Flaxseeds', 'Walnuts'],
        benefits: 'For brain development',
        image: 'https://images.unsplash.com/photo-1514575110897-1253ff7b2ccb?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Hydrating foods',
        items: ['Coconut water', 'Watermelon', 'Cucumber'],
        benefits: 'Maintains hydration',
        image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  second: {
    recommended: [
      {
        category: 'Protein-rich foods',
        items: ['Eggs', 'Dairy', 'Fish'],
        benefits: 'For fetal muscle & tissue growth',
        image: 'https://images.unsplash.com/photo-1598965402089-897ce52e8355?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Calcium-rich foods',
        items: ['Milk', 'Yogurt', 'Cheese', 'Sesame seeds'],
        benefits: 'For bone development',
        image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin C foods',
        items: ['Oranges', 'Bell peppers', 'Tomatoes'],
        benefits: 'Helps iron absorption',
        image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Whole grains',
        items: ['Brown rice', 'Quinoa', 'Whole wheat bread'],
        benefits: 'Sustained energy',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Magnesium foods',
        items: ['Almonds', 'Cashews', 'Pumpkin seeds'],
        benefits: 'Prevents leg cramps',
        image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
  third: {
    recommended: [
      {
        category: 'Fiber-rich foods',
        items: ['Oats', 'Apples', 'Pears', 'Lentils'],
        benefits: 'Prevents constipation',
        image: 'https://images.unsplash.com/photo-1584473457406-6240486418e9?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Healthy fats',
        items: ['Avocado', 'Olive oil', 'Ghee'],
        benefits: 'Supports brain & nervous system',
        image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Vitamin K-rich foods',
        items: ['Leafy greens', 'Broccoli'],
        benefits: 'Helps with blood clotting during labor',
        image: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Iron & protein sources',
        items: ['Lean red meat', 'Spinach', 'Eggs'],
        benefits: 'Prevents anemia',
        image: 'https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?auto=format&fit=crop&q=80&w=800',
      },
      {
        category: 'Hydration & digestion support',
        items: ['Herbal teas', 'Ginger', 'Fennel seeds'],
        benefits: 'Supports digestion',
        image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=800',
      },
    ],
  },
};

const foodsToAvoid = [
  {
    category: 'Raw or undercooked foods',
    items: ['Raw meat', 'Raw eggs', 'Raw fish'],
    reason: 'Risk of salmonella & toxoplasmosis',
  },
  {
    category: 'High-mercury fish',
    items: ['Shark', 'Swordfish', 'King mackerel'],
    reason: 'Harms fetal brain development',
  },
  {
    category: 'Unpasteurized products',
    items: ['Raw milk', 'Soft cheeses', 'Unpasteurized juices'],
    reason: 'Risk of listeria infection',
  },
  {
    category: 'Caffeine & stimulants',
    items: ['Excess coffee', 'Energy drinks'],
    reason: 'More than 200mg/day linked to low birth weight',
  },
  {
    category: 'Other items to avoid',
    items: ['Alcohol', 'Raw sprouts', 'Processed foods', 'Artificial sweeteners'],
    reason: 'Various risks to fetal development',
  },
];

const NutritionSection = () => {
  const [selectedTrimester, setSelectedTrimester] = useState('first');
  const { recommended } = nutritionData[selectedTrimester];

  return (
    <div id="nutrition" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Pregnancy Nutrition Guide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Essential nutrients for a healthy pregnancy and baby development.
          </p>
        </div>

        <div className="mt-12">
          <div className="flex justify-center space-x-4 mb-12">
            {['first', 'second', 'third'].map((trimester, index) => (
              <button
                key={trimester}
                onClick={() => setSelectedTrimester(trimester)}
                className={`px-6 py-2 rounded-full text-sm font-medium ${
                  selectedTrimester === trimester
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {`Trimester ${index + 1} (${trimester.charAt(0).toUpperCase() + trimester.slice(1)})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">✅ Recommended Foods</h3>
                <div className="space-y-6">
                  {recommended.map((category) => (
                    <div key={category.category} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img
                        src={category.image}
                        alt={`${category.category} - recommended foods`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-2 mb-2">
                            {category.items.map((item) => (
                              <span
                                key={item}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium break-words bg-rose-100 text-rose-800"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">{category.benefits}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">❌ Foods to Avoid</h3>
                <div className="space-y-6">
                  {foodsToAvoid.map((category) => (
                    <div key={category.category} className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-gray-900">{category.category}</h4>
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {category.items.map((item) => (
                            <span
                              key={item}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium break-words bg-red-100 text-red-800"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{category.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionSection;
