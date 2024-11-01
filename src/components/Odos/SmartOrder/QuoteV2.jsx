import React, { useState } from 'react';

const QuoteV2 = () => {
  const [chainId, setChainId] = useState('');
  const [inputTokenAddress, setInputTokenAddress] = useState('');
  const [outputTokenAddress, setOutputTokenAddress] = useState('');
  const [response, setResponse] = useState(null);

  const handleApiCall = async () => {
    const requestBody = {
      chainId: parseInt(chainId),
      compact: true,
      gasPrice: 20,
      inputTokens: [
        {
          amount: "189000000",
          tokenAddress: inputTokenAddress,
        },
      ],
      outputTokens: [
        {
          proportion: 1,
          tokenAddress: outputTokenAddress,
        },
      ],
      referralCode: 0,
      slippageLimitPercent: 0.3,
      sourceBlacklist: [],
      sourceWhitelist: [],
      userAddr: "0x47E2D28169738039755586743E2dfCF3bd643f86",
    };

    try {
      const response = await fetch('https://api.odos.xyz/sor/quote/v2', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResponse(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Quote V2 API Fetcher</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-left mb-1">Chain ID:</label>
            <input
              type="text"
              value={chainId}
              onChange={(e) => setChainId(e.target.value)}
              placeholder="Enter Chain ID (e.g., 1 for Ethereum)"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-left mb-1">Input Token Address:</label>
            <input
              type="text"
              value={inputTokenAddress}
              onChange={(e) => setInputTokenAddress(e.target.value)}
              placeholder="Enter Input Token Address"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
          
          <div>
            <label className="block text-left mb-1">Output Token Address:</label>
            <input
              type="text"
              value={outputTokenAddress}
              onChange={(e) => setOutputTokenAddress(e.target.value)}
              placeholder="Enter Output Token Address"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
            />
          </div>
        </div>

        <button
          onClick={handleApiCall}
          className="w-full mt-4 bg-blue-500 p-2 rounded text-white font-semibold hover:bg-blue-600 transition-colors"
        >
          Fetch Quote
        </button>

        {response && (
          <div className="mt-6 bg-gray-700 p-4 rounded max-h-48 overflow-y-auto border border-gray-600 text-left">
            <h3 className="text-md font-semibold mb-2">API Response:</h3>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteV2;




// input   -   0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
// output  -    0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2