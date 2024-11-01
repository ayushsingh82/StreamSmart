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
      <h1>Gas Price Estimator</h1>
      <button onClick={fetchGasPrice} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Gas Price'}
      </button>

      {error && <div>Error: {error.message}</div>}

      {data && (
        <div>
          <h2>Gas Price Results</h2>
          <pre>{JSON.stringify(data.response.result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default GasPrice;
