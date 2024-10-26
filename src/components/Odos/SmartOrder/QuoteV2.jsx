import React, { useState } from 'react';

const QuoteV2 = () => {
  const [response, setResponse] = useState(null);

  const handleApiCall = async () => {
    const requestBody = {
      chainId: 1,
      compact: true,
      gasPrice: 20,
      inputTokens: [
        {
          amount: "189000000",
          tokenAddress: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
        },
      ],
      outputTokens: [
        {
          proportion: 1,
          tokenAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
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
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Quote V2 API Fetcher</h2>

      <button
        onClick={handleApiCall}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Fetch Quote
      </button>

      {response && (
        <div className="mt-4 p-4 border border-gray-400 rounded">
          <h3 className="text-md font-semibold">API Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QuoteV2;
