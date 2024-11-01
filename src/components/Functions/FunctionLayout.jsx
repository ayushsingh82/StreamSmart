import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FunctionLayout = () => {
  const [activeTab, setActiveTab] = useState('blockMetrix');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-center space-x-4 mb-6">
          <button 
            onClick={() => setActiveTab('blockMetrix')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'blockMetrix' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Block Metrix
          </button>
          <button 
            onClick={() => setActiveTab('gasPrice')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'gasPrice' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Gas Price
          </button>
          <button 
            onClick={() => setActiveTab('multichainTxn')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'multichainTxn' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Multichain transactions
          </button>
          <button 
            onClick={() => setActiveTab('whaleTxn')} 
            className={`px-4 py-2 rounded-md font-semibold transition-colors ${
              activeTab === 'whaleTxn' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Whale transaction
          </button>
        </div>

        <div className="space-y-3">
          {activeTab === 'blockMetrix' && (
            <div className="flex flex-col space-y-2">
              <Link to="/blockmetrix" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">View Block Metrix</Link>
            </div>
          )}

          {activeTab === 'gasPrice' && (
            <div className="flex flex-col space-y-2">
              <Link to="/gasprice" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">View Gas Price</Link>
            </div>
          )}

          {activeTab === 'multichainTxn' && (
            <div className="flex flex-col space-y-2">
              <Link to="/multichain-txn" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">View Multichain Transactions</Link>
            </div>
          )}

          {activeTab === 'whaleTxn' && (
            <div className="flex flex-col space-y-2">
              <Link to="/whale-txn" className="p-2 bg-gray-700 rounded hover:bg-gray-600 transition">View Whale Transactions</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FunctionLayout;
