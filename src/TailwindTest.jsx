import React from 'react';

const TailwindTest = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🌞 Sunshine Enterprises
        </h1>
        <p className="text-lg text-gray-600">Tailwind CSS is working perfectly!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">✓</span>
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-800">Colors</h3>
          </div>
          <p className="text-gray-600">
            Beautiful color palette with gradients and hover effects.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">📱</span>
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-800">Responsive</h3>
          </div>
          <p className="text-gray-600">
            Grid layout that adapts to different screen sizes.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">⚡</span>
            </div>
            <h3 className="ml-3 text-xl font-semibold text-gray-800">Animations</h3>
          </div>
          <p className="text-gray-600">
            Smooth transitions and hover effects with ease.
          </p>
        </div>
      </div>

      {/* Interactive Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg">
          Primary Button
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg">
          Success Button
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg">
          Danger Button
        </button>
      </div>

      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Progress Example</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full w-3/4 transition-all duration-1000 ease-out"></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">75% Complete</p>
      </div>

      {/* Utility Classes Demo */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Utility Classes Demo</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 w-20">Spacing:</span>
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-red-400 rounded"></div>
              <div className="w-4 h-4 bg-yellow-400 rounded"></div>
              <div className="w-4 h-4 bg-green-400 rounded"></div>
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 w-20">Typography:</span>
            <div className="space-x-4">
              <span className="text-xs">Extra Small</span>
              <span className="text-sm">Small</span>
              <span className="text-base">Base</span>
              <span className="text-lg">Large</span>
              <span className="text-xl">Extra Large</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700 w-20">Shadows:</span>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white shadow-sm rounded"></div>
              <div className="w-8 h-8 bg-white shadow-md rounded"></div>
              <div className="w-8 h-8 bg-white shadow-lg rounded"></div>
              <div className="w-8 h-8 bg-white shadow-xl rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TailwindTest;
