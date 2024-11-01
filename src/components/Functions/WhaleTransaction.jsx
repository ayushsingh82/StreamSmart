import React, { useState } from 'react';
import axios from 'axios';

const WhaleTransaction = () => {
  const [transactionData, setTransactionData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWhaleTransaction = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'https://api.quicknode.com/functions/rest/v1/namespaces/0f6812dd-a17f-4cbc-9ab4-7a529eb33940/functions/whale-transactions/call',
        {
          network: 'ethereum-mainnet',
          dataset: 'block',
          block: 'latest',
          user_data: {
            minTxSize: 5,
          },
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'QN_80e7e07b977a4214ac78d108b61dd0f3', // Replace with your actual API key
          },
        }
      );

      setTransactionData(response.data.response.result); // Accessing nested result data
      console.log('Whale Transaction Data:', response.data.response.result);
    } catch (error) {
      console.error('Error fetching whale transaction data:', error);
      setError('Error fetching whale transaction data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center">Whale Transactions</h2>

        <button
          onClick={fetchWhaleTransaction}
          disabled={loading}
          className="bg-blue-600 w-full text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? 'Fetching...' : 'Fetch Whale Transactions'}
        </button>

        {error && (
          <div className="mt-8 p-4 bg-red-700 border border-red-600 rounded-md w-full">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {transactionData && (
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-md max-h-72 overflow-y-auto w-full">
            <h3 className="text-md font-semibold mb-2">Whale Transaction Details</h3>
            <p><strong>Block:</strong> {transactionData.block}</p>
            <p><strong>Network:</strong> {transactionData.network}</p>
            
            <h4 className="mt-4">Transactions Cleaned:</h4>
            <ul className="space-y-4 mt-2">
              {transactionData.transactions_clean.map((tx, index) => (
                <li key={index} className="bg-gray-900 p-4 rounded-md">
                  <p><strong>From:</strong> {tx.from}</p>
                  <p><strong>To:</strong> {tx.to}</p>
                  <p><strong>Value:</strong> {tx.value} {tx.units}</p>
                  <p><strong>Hash:</strong> {tx.hash}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhaleTransaction;
