import React from 'react';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white text-lg font-semibold">
          <Link to="/">Home</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/register" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
