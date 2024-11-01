import React, { useEffect, useState } from 'react';

const NotificationById = () => {
  const [id, setId] = useState('');
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const fetchNotification = async (notificationId) => {
    const myHeaders = new Headers();
    myHeaders.append('accept', 'application/json');
    myHeaders.append('x-api-key', 'QN_80e7e07b977a4214ac78d108b61dd0f3'); // Replace with your actual API key

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    try {
      console.log(`Fetching notification from: https://api.quicknode.com/streams/rest/v1/streams/${notificationId}`);
      const response = await fetch(`https://api.quicknode.com/streams/rest/v1/streams/${notificationId}`, requestOptions);
      
      if (!response.ok) {
        const errorBody = await response.text(); // Read the response body for more details
        console.error('Fetch error:', errorBody);
        throw new Error('Network response was not ok: ' + errorBody);
      }
      
      const result = await response.json();
      console.log("API Response:", result); // Log the response for debugging
      setNotification(result); // Assuming result contains the notification data
      setError(null);
    } catch (error) {
      console.error('Error fetching notification:', error);
      setError('Error fetching notification: ' + error.message);
      setNotification(null);
    }
  };

  const handleFetch = () => {
    if (id.trim()) {
      fetchNotification(id);
    } else {
      setError('Please enter a notification ID.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-xl p-8 bg-gray-900 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Notification Details</h2>
        
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="Enter Notification ID"
          className="w-full p-2 mb-4 bg-gray-800 border border-gray-700 rounded-md text-gray-300"
        />
        
        <button
          onClick={handleFetch}
          className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-md text-white font-semibold"
        >
          Fetch Notification
        </button>

        {error && (
          <div className="mb-4 p-4 bg-red-700 border border-red-600 rounded-md">
            <h3 className="text-md font-semibold mb-2">Error:</h3>
            <p>{error}</p>
          </div>
        )}

        {notification && (
          <div className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-md max-h-96 overflow-y-auto">
            <h3 className="text-md font-semibold mb-2">Notification ID: {notification.id}</h3>
            <p className="text-sm text-gray-300">Title: {notification.title || 'N/A'}</p>
            <p className="text-sm text-gray-300">Message: {notification.message || 'N/A'}</p>
            <p className="text-sm text-gray-300">Status: {notification.status || 'N/A'}</p>
            <p className="text-sm text-gray-300">Created At: {notification.createdAt || 'N/A'}</p>

            {/* Add additional fields here */}
            <p className="text-sm text-gray-300">Start Range: {notification.start_range || 'N/A'}</p>
            <p className="text-sm text-gray-300">End Range: {notification.end_range || 'N/A'}</p>
            <p className="text-sm text-gray-300">Dataset Batch Size: {notification.dataset_batch_size || 'N/A'}</p>
            <p className="text-sm text-gray-300">Include Stream Metadata: {notification.include_stream_metadata || 'N/A'}</p>
            <p className="text-sm text-gray-300">Destination: {notification.destination || 'N/A'}</p>
            <p className="text-sm text-gray-300">Fix Block Reorgs: {notification.fix_block_reorgs !== undefined ? notification.fix_block_reorgs : 'N/A'}</p>
            <p className="text-sm text-gray-300">Keep Distance from Tip: {notification.keep_distance_from_tip || 'N/A'}</p>
            <p className="text-sm text-gray-300">Destination Attributes: {JSON.stringify(notification.destination_attributes) || 'N/A'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationById;
