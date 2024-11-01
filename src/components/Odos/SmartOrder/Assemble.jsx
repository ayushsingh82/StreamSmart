import React, { useState } from 'react';

const Assemble = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assembleTokens = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.odos.xyz/sor/assemble', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pathId: '95bb963d193cd229a0b4087f34382ea2',
          simulate: false,
          userAddr: '0x47E2D28169738039755586743E2dfCF3bd643f86',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get error text from response
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
      <h1>Assemble API Call</h1>
      <button onClick={assembleTokens} disabled={loading}>
        {loading ? 'Fetching...' : 'Fetch Data'}
      </button>
      
      {error && <div>Error: {error.message}</div>}
      
      {data && (
        <div>
          <h2>Assemble Results</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Assemble;
