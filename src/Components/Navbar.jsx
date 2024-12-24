import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0f0c29] via-[#67a3b7] to-[#d8de57] shadow-lg text-white font-serif">
      <div className="container mx-auto flex flex-wrap items-center justify-between p-4">
        <h1 className="text-3xl font-extrabold  relative inline-block">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            DOWN
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            LOADER
          </span>
          <span className="absolute inset-0 text-gray-800 opacity-10 blur-lg transform scale-110">
            DOWNLOADER
          </span>
        </h1>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block lg:hidden text-3xl focus:outline-none"
        >
          ☰
        </button>
        <div
          className={`fixed top-0 left-0 h-full w-48 bg-gradient-to-r from-[#6c4b6d] via-[#4d6667] to-[#4f5235] shadow-lg transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-50`}
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-3xl"
          >
            ×
          </button>
          <ul className="flex flex-col space-y-6 p-6 text-lg font-bold">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
                onClick={handleLinkClick}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
                onClick={handleLinkClick}
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/images"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
                onClick={handleLinkClick}
              >
                Images
              </NavLink>
            </li>
          </ul>
          <div className="flex flex-col space-y-4 p-6 mt-auto">
            <NavLink
              to="/login"
              className="py-2 px-4 text-center hover:text-black border border-gold font-bold text-gold hover:bg-blue-500 rounded-lg shadow-lg"
              onClick={handleLinkClick}
            >
              Login
            </NavLink>
            <NavLink
              to="/getstarted"
              className="py-2 px-4 hover:text-black border font-bold rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-[#e4f374] hover:to-[#b0cb68] transition-colors duration-300"
              onClick={handleLinkClick}
            >
              Get Started
            </NavLink>
          </div>
        </div>
        <div className="lg:flex lg:items-center lg:space-x-12 hidden">
          <ul className="flex flex-col lg:flex-row lg:space-x-12 text-lg font-bold">
            <li>
              <NavLink
                to="/"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contacts"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/images"
                className="block py-2 px-4 hover:text-black transition-colors duration-300"
                activeClassName="text-black border-b-2 border-white"
              >
                Images
              </NavLink>
            </li>
          </ul>
          <div className="mt-4 lg:mt-0 flex flex-col lg:flex-row lg:space-x-8">
            <NavLink to="/login">
              <button className="py-2 px-4 hover:bg-[#0a8deb] hover:text-black rounded-lg shadow-lg">
                LOGIN
              </button>
            </NavLink>
            <NavLink
              to="/getstarted"
              className="uppercase py-2 px-4 mt-4 lg:mt-0 lg:ml-8 text-black font-bold rounded-lg shadow-lg hover:bg-[#37625e] hover:text-white"
            >
              Get Started
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
