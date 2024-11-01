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
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-6">Assemble API Call</h1>
        
        <button
          onClick={assembleTokens}
          disabled={loading}
          className={`w-full bg-blue-500 p-2 rounded text-white font-semibold ${
            loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'
          } transition-colors`}
        >
          {loading ? 'Fetching...' : 'Fetch Data'}
        </button>

        {error && (
          <div className="mt-4 bg-red-600 p-3 rounded text-white text-sm">
            Error: {error.message}
          </div>
        )}

        {data && (
          <div className="mt-6 bg-gray-700 p-4 rounded max-h-48 overflow-y-auto border border-gray-600 text-left">
            <h2 className="text-md font-semibold mb-2">Assemble Results:</h2>
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assemble;
