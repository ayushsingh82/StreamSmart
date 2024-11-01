import React from 'react';
import { Link } from 'react-router-dom';

const StreamLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-200 text-white">
      <div className="w-full max-w-3xl p-10 bg-gray-900 rounded-lg shadow-2xl">
        <h2 className="text-3xl font-semibold mb-8 text-center">Stream Management Options</h2>

        <div className="flex justify-center flex-wrap">
          <Link
            to="/create-stream"
            className="flex items-center px-5 py-3 m-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <span className="material-icons mr-2"></span>
            Create Stream
          </Link>
          <Link
            to="/pause-id"
            className="flex items-center px-5 py-3 m-2 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <span className="material-icons mr-2"></span>
            Pause Stream
          </Link>
          <Link
            to="/activate-id"
            className="flex items-center px-5 py-3 m-2 rounded-lg bg-green-600 hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <span className="material-icons mr-2"></span>
            Activate Stream
          </Link>
          <Link
            to="/terminate-id"
            className="flex items-center px-5 py-3 m-2 rounded-lg bg-red-600 hover:bg-red-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <span className="material-icons mr-2"></span>
            Terminate Stream
          </Link>
          <Link
            to="/notification-id"
            className="flex items-center px-5 py-3 m-2 rounded-lg bg-purple-600 hover:bg-purple-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
          >
            <span className="material-icons mr-2"></span>
            Notification by ID
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StreamLayout;
