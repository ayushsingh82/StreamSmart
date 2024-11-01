import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AvailCalculator = () => {
  const [blobSize, setBlobSize] = useState(1); // Blob size in kilobytes
  const [frequency, setFrequency] = useState(1); // Frequency in days
  const [costs, setCosts] = useState(null);

  // Simple example cost calculator function
  const calculateCosts = (blobSize, frequency) => {
    const availCostPerKB = 0.0001;
    const ethereumCostPerKB = 0.01;
    const solanaCostPerKB = 0.001;

    return {
      Avail: blobSize * frequency * availCostPerKB,
      Ethereum: blobSize * frequency * ethereumCostPerKB,
      Solana: blobSize * frequency * solanaCostPerKB,
    };
  };

  const handleCalculate = () => {
    const calculatedCosts = calculateCosts(blobSize, frequency);
    setCosts(calculatedCosts);
  };

  const chartData = {
    labels: costs ? Object.keys(costs) : [],
    datasets: [
      {
        label: 'Cost in USD',
        data: costs ? Object.values(costs) : [],
        backgroundColor: ['rgba(75,192,192,0.6)', 'rgba(255,99,132,0.6)', 'rgba(54,162,235,0.6)'],
        borderColor: ['rgba(75,192,192,1)', 'rgba(255,99,132,1)', 'rgba(54,162,235,1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-500 text-white p-4">
      <h1 className="text-2xl font-bold mb-4">Avail DA Cost Calculator</h1>
      <div className="mb-4">
        <label className="block mb-2">Blob Size (KB):</label>
        <input
          type="number"
          value={blobSize}
          onChange={(e) => setBlobSize(Number(e.target.value))}
          className="p-2 rounded-md bg-gray-700 border border-blue-400"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Frequency (days):</label>
        <input
          type="number"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="p-2 rounded-md bg-gray-700 border border-blue-400"
        />
      </div>
      <button onClick={handleCalculate} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
        Calculate Costs
      </button>

      {costs && (
        <div className="mt-6 w-full max-w-md bg-gray-800 p-4 rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Cost Comparison</h2>
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <ul className="mt-4">
            {Object.entries(costs).map(([chain, cost]) => (
              <li key={chain}>
                {chain}: ${cost.toFixed(4)}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AvailCalculator;
