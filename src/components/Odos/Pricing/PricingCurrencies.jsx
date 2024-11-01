import React, { useState } from 'react';

const PricingCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCurrencies = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.odos.xyz/pricing/currencies', {
        headers: {
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setCurrencies(data.currencies);
    } catch (error) {
      console.error('Error fetching currencies:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] text-white">
      <div className="w-full max-w-lg p-6 bg-gray-800 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-6">Pricing Currencies</h2>
        <button 
          onClick={fetchCurrencies}
          className={`px-4 py-2 w-full text-white rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-500 hover:bg-blue-600 transition-colors'}`}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch Currencies'}
        </button>
        
        {currencies.length > 0 && (
          <ul className="mt-6 max-h-48 overflow-y-auto bg-gray-700 p-4 rounded border border-gray-600">
            {currencies.map(currency => (
              <li key={currency.id} className="py-1">
                {currency.name} ({currency.id})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PricingCurrencies;
