import React from 'react';

interface MenuProps {
  setView: (view: string) => void;
}

const Menu: React.FC<MenuProps> = ({ setView }) => {
  return (
    <nav className="mb-4">
      <button
        onClick={() => setView('list')}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
      >
        List Properties
      </button>
      <button
        onClick={() => setView('register')}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Register Property
      </button>
    </nav>
  );
};

export default Menu;
