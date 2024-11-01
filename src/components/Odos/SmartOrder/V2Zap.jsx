import React, { useState } from 'react';

const V2Zap = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchZapData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.odos.xyz/sor/quote/v2/zap', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chainId: 1,
          compact: true,
          gasPrice: 20,
          inputTokens: [
            {
              amount: '189000000',
              tokenAddress: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
            },
          ],
          outputTokens: [
            {
              proportion: 1,
              tokenAddress: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
            },
          ],
          referralCode: 0,
          slippageLimitPercent: 0.3,
          sourceBlacklist: [],
          sourceWhitelist: [],
          userAddr: '0x47E2D28169738039755586743E2dfCF3bd643f86',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>V2 Zap API Call</h1>
      <button onClick={fetchZapData} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>

      {error && <div>Error: {error.message}</div>}

      {data && (
        <div>
          <h2>Zap Results</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default V2Zap;
