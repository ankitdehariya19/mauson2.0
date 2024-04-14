import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="w-full max-w-7xl py-4 bg-black border-b rounded-t-md  shadow-md flex  items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-white text-start px-5 sm:mb-0 flex w-full">
        M
        <span className="text-violet-500">auson</span>
      </Link>
      {children}
    </header>
  );
};

export default Header;
