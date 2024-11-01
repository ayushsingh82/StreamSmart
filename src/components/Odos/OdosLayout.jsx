import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OdosLayout = () => {
  const [activeTab, setActiveTab] = useState('pricing');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('pricing')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'pricing' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pricing
          </button>
          <button 
            onClick={() => setActiveTab('smartOrder')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'smartOrder' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Smart Order
          </button>
        </div>

        <div className="space-y-3">
          {activeTab === 'pricing' && (
            <div className="flex flex-col space-y-2">
              <Link to="/chainId" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">Chain ID</Link>
              <Link to="/odos-pricing-currencies" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">Pricing Currency</Link>
              <Link to="/token-address" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">Token Address</Link>
            </div>
          )}

          {activeTab === 'smartOrder' && (
            <div className="flex flex-col space-y-2">
              <Link to="/assemble" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">Assemble</Link>
              <Link to="/quoteV2" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">Quote V2</Link>
              <Link to="/V2zap" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">V2 Zap</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OdosLayout;
