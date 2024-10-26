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
    <div>
      <button 
        onClick={fetchCurrencies}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Fetch Currencies'}
      </button>
      
      {currencies.length > 0 && (
        <ul className="mt-4">
          {currencies.map(currency => (
            <li key={currency.id}>
              {currency.name} ({currency.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PricingCurrencies;
