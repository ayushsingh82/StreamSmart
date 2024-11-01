import React, { useState } from 'react';

const ChainId = () => {
  const [chainId, setChainId] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiCall = async () => {
    try {
      const response = await fetch(
        `https://api.odos.xyz/pricing/token/${chainId}?currencyId=${currencyId}`,
        {
          headers: { 'accept': 'application/json' }
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApiResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setApiResponse(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">ChainId API Fetcher</h2>
        <div className="mb-4">
          <label className="block mb-2">Chain ID:</label>
          <input
            type="text"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Chain ID (e.g., 42161 for Arbitrum)"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Currency ID:</label>
          <input
            type="text"
            value={currencyId}
            onChange={(e) => setCurrencyId(e.target.value)}
            className="border border-gray-600 bg-gray-700 text-white p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Currency ID (e.g., USD)"
          />
        </div>
        <button
          onClick={handleApiCall}
          className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-500 transition-colors"
        >
          Fetch Data
        </button>
        {apiResponse && (
          <div className="mt-6 p-4 bg-gray-700 border border-gray-600 rounded max-h-48 overflow-y-auto">
            <h3 className="text-md font-semibold mb-2">API Response:</h3>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChainId;
