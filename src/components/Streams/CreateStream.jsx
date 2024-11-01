import React, { useState } from 'react';

const CreateStream = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  
  // State variables for form inputs
  const [streamName, setStreamName] = useState('My Stream');
  const [network, setNetwork] = useState('ethereum-mainnet');
  const [dataset, setDataset] = useState('block');
  const [startRange, setStartRange] = useState(100);
  const [endRange, setEndRange] = useState(200);
  
  const createStream = async () => {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('x-api-key', 'QN_80e7e07b977a4214ac78d108b61dd0f3'); // Your API key

    const updatedFilterFunction = `
      function main(pdata) {
        if (pdata && pdata.number) {
          return true; // Include this data point if it has a 'number' property
        }
        return false; // Exclude this data point otherwise
      }
    `;

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: JSON.stringify({
        name: streamName,
        network: network,
        dataset: dataset,
        filter_function: btoa(updatedFilterFunction), // Base64 encode the filter function
        region: 'usa_east',
        start_range: startRange,
        end_range: endRange,
        dataset_batch_size: 1,
        include_stream_metadata: 'body',
        destination: 'webhook',
        fix_block_reorgs: 0,
        keep_distance_from_tip: 0,
        destination_attributes: {
          url: 'https://webhook.site',
          compression: 'none',
          headers: {
            'Content-Type': 'Test',
            Authorization: 'again'
          },
          max_retry: 3,
          retry_interval_sec: 1,
          post_timeout_sec: 10
        },
        status: 'active'
      })
    };

    try {
      const response = await fetch('https://api.quicknode.com/streams/rest/v1/streams', requestOptions);
      const result = await response.json();
      setResponse(result);
      setError(null);
    } catch (error) {
      setError('Error creating stream: ' + error.message);
      setResponse(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Create a Stream</h2>
        
        {/* Stream Name Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Stream Name:</label>
          <input
            type="text"
            value={streamName}
            onChange={(e) => setStreamName(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Stream Name"
          />
        </div>
        
        {/* Network Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Network:</label>
          <input
            type="text"
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Network (e.g., ethereum-mainnet)"
          />
        </div>
        
        {/* Dataset Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Dataset:</label>
          <input
            type="text"
            value={dataset}
            onChange={(e) => setDataset(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Dataset (e.g., block)"
          />
        </div>

        {/* Start Range Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">Start Range:</label>
          <input
            type="number"
            value={startRange}
            onChange={(e) => setStartRange(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter Start Range"
          />
        </div>

        {/* End Range Input */}
        <div className="mb-6">
          <label className="block mb-2 text-lg font-semibold">End Range:</label>
          <input
            type="number"
            value={endRange}
            onChange={(e) => setEndRange(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="Enter End Range"
          />
        </div>

        <button
          onClick={createStream}
          className="bg-blue-600 w-full text-white p-3 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Stream
        </button>
        
        {/* Display API Response or Error */}
        {response && (
          <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-md max-h-48 overflow-y-auto w-full">
            <h3 className="text-md font-semibold mb-2">API Response:</h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-300">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-red-700 border border-red-600 rounded-md w-full">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateStream;
