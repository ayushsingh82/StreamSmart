import React, { useState } from 'react';

const DeleteId = () => {
  const [id, setId] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleDeleteStream = async () => {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('x-api-key', 'QN_80e7e07b977a4214ac78d108b61dd0f3'); // Replace with your actual API key

    const requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        `https://api.quicknode.com/streams/rest/v1/streams/${id}`,
        requestOptions
      );

      if (!response.ok) {
        const errorBody = await response.text(); // Read the response body for more details
        console.error('Fetch error:', errorBody);
        throw new Error('Network response was not ok: ' + errorBody);
      }

      const result = await response.json();
      console.log("API Response:", result); // Log the response for debugging
      setMessage(`Stream deleted successfully: ${JSON.stringify(result)}`);
      setError(null);
    } catch (error) {
      console.error('Error deleting stream:', error);
      setError('Error deleting stream: ' + error.message);
      setMessage(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Delete Stream</h2>

        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Stream ID"
          className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
        />

        <button
          onClick={handleDeleteStream}
          className="w-full py-2 bg-red-600 hover:bg-red-500 rounded-md text-white font-semibold"
        >
          Delete Stream
        </button>

        {message && (
          <div className="mt-4 p-4 bg-green-700 border border-green-600 rounded-md">
            <h3 className="text-md font-semibold mb-2">Success:</h3>
            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-700 border border-red-600 rounded-md">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteId;
