import React, { useState } from 'react';

const MultichainTransaction = () => {
  const [transactionData, setTransactionData] = useState(null);

  const fetchTransactionData = async () => {
    try {
      const response = await fetch(
        'https://api.quicknode.com/functions/rest/v1/namespaces/0f6812dd-a17f-4cbc-9ab4-7a529eb33940/functions/tx-translate/call?result_only=true',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'QN_80e7e07b977a4214ac78d108b61dd0f3', // Replace 'YOUR_API_KEY' with your actual QuickNode API key
          },
          body: JSON.stringify({
            user_data: {
              vm: 'evm',
              txhash: '0x1cd4d61b9750632da36980329c240a5d2d2219a8cb3daaaebfaed4ae7b4efa22',
              apiKey: 'NOVES_API_KEY', // Replace 'NOVES_API_KEY' with the appropriate API key if required
              chain: 'eth',
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTransactionData(data);
      console.log('Transaction Data:', data); // Logs the data for debugging
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    }
  };

  return (
    <div>
      <h2>Multichain Transaction</h2>
      <button onClick={fetchTransactionData} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Fetch Transaction Data
      </button>
      {transactionData && (
        <pre className="bg-gray-800 text-white p-4 mt-4 rounded-md">
          {JSON.stringify(transactionData, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default MultichainTransaction;
