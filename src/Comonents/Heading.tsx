import React from 'react';

const Header: React.FC = () => {
  return (
    <>
    <header className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl text-white font-semibold text-center">My To-Do App</h1>
      </div>
    </header>
    </>
  );
};

export default Header;
