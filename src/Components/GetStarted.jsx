import React from 'react';

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">Get Started</h1>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Use This Website</h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 space-y-4">
          <li className="flex items-start">
            <span className="font-semibold text-blue-500 mr-2">1.</span>
            <span>Visit our website to Home Page.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-500 mr-2">2.</span>
            <span>Enter your desired image or video keyword in the search bar.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-500 mr-2">3.</span>
            <span>Select whether you want to search for images or videos using the dropdown menu.</span>
          </li>
          <li className="flex items-start">
            <span className="font-semibold text-blue-500 mr-2">4.</span>
            <span>Click on the <strong>Search</strong> button to fetch and view the results.</span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default GetStarted;
