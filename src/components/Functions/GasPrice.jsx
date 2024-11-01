import React, { useState } from 'react';

const GasPrice = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGasPrice = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.quicknode.com/functions/rest/v1/namespaces/0f6812dd-a17f-4cbc-9ab4-7a529eb33940/functions/gas-price-estimator/call", {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'QN_80e7e07b977a4214ac78d108b61dd0f3', // Your actual API key here
        },
        body: JSON.stringify({
          network: "ethereum-mainnet",
          dataset: "block",
          block: "latest",
          user_data: {
            noOfTX: 100,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setData(result.response?.result); // Adjusted based on API response structure
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message || 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold mb-8 text-center">Gas Price Estimator</h2>

        <button
          onClick={fetchGasPrice}
          disabled={loading}
          className="bg-blue-600 w-full text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          {loading ? 'Fetching...' : 'Get Gas Price'}
        </button>

        {error && (
          <div className="mt-8 p-4 bg-red-700 border border-red-600 rounded-md w-full">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {data && (
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-md max-h-48 overflow-y-auto w-full">
            <h3 className="text-md font-semibold mb-2">Gas Price Results:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-300">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default GasPrice;
