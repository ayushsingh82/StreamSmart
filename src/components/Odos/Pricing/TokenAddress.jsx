import React, { useState } from 'react';

const TokenAddress = () => {
  const [chainId, setChainId] = useState('');
  const [currencyId, setCurrencyId] = useState('');
  const [tokenAddress, setTokenAddress] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const handleApiCall = async () => {
    try {
      const response = await fetch(
        `https://api.odos.xyz/pricing/token/${chainId}/${tokenAddress}?currencyId=${currencyId}`,
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
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Token Address API Fetcher</h2>
      
      <div className="mb-4">
        <label className="block mb-2">Chain ID:</label>
        <input
          type="text"
          value={chainId}
          onChange={(e) => setChainId(e.target.value)}
          className="border border-gray-400 p-2 w-full"
          placeholder="Enter Chain ID (e.g., 42161 for Arbitrum)"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Currency ID:</label>
        <input
          type="text"
          value={currencyId}
          onChange={(e) => setCurrencyId(e.target.value)}
          className="border border-gray-400 p-2 w-full"
          placeholder="Enter Currency ID (e.g., USD)"
        />
      </div>
      
      <div className="mb-4">
        <label className="block mb-2">Token Address:</label>
        <input
          type="text"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="border border-gray-400 p-2 w-full"
          placeholder="Enter Token Address"
        />
      </div>
      
      <button
        onClick={handleApiCall}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Fetch Data
      </button>
      
      {apiResponse && (
        <div className="mt-4 p-4 border border-gray-400 rounded">
          <h3 className="text-md font-semibold">API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TokenAddress;
