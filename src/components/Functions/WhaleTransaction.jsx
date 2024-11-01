import React, { useState } from 'react';
import axios from 'axios';

const WhaleTransaction = () => {
  const [transactionData, setTransactionData] = useState(null);

  const fetchWhaleTransaction = async () => {
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
    }
  };

  return (
    <div>
      <h2>Whale Transaction</h2>
      <button onClick={fetchWhaleTransaction} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Fetch Whale Transactions
      </button>

      {transactionData && (
        <div className="bg-gray-800 text-white p-4 mt-4 rounded-md">
          <h3>Whale Transaction Details</h3>
          <p><strong>Block:</strong> {transactionData.block}</p>
          <p><strong>Network:</strong> {transactionData.network}</p>
          <p><strong>Result:</strong> {transactionData.result}</p>

          <h4 className="mt-4">Transactions Cleaned:</h4>
          <ul>
            {transactionData.transactions_clean.map((tx, index) => (
              <li key={index} className="mb-2">
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
  );
};

export default WhaleTransaction;
