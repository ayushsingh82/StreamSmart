import React, { useEffect, useState } from 'react';

const RetrieveStream = () => {
  const [streams, setStreams] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchStreams = async () => {
      var myHeaders = new Headers();
      myHeaders.append('accept', 'application/json');
      myHeaders.append('x-api-key', 'QN_80e7e07b977a4214ac78d108b61dd0f3'); // Replace with your actual API key

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      try {
        const response = await fetch('https://api.quicknode.com/streams/rest/v1/streams', requestOptions);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const result = await response.json();
        console.log("API Response:", result); // Log the full response

        setStreams(result.streams || []); // Adjust based on the structure of the response
        setError(null);
      } catch (error) {
        setError('Error fetching streams: ' + error.message);
        setStreams([]);
      }
    };

    fetchStreams();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Retrieve Streams</h2>

        {error && (
          <div className="mb-4 p-4 bg-red-700 border border-red-600 rounded-md">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {streams.length > 0 ? (
          <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-md max-h-48 overflow-y-auto">
            <h3 className="text-md font-semibold mb-2">Streams:</h3>
            <ul className="list-disc list-inside">
              {streams.map((stream) => (
                <li key={stream.id} className="text-sm text-gray-300">
                  {stream.name} - {stream.status} (Network: {stream.network})
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-4">No streams available.</p>
        )}
      </div>
    </div>
  );
};

export default RetrieveStream;
