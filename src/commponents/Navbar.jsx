import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="w-full bg-gray-800 text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3 md:flex-1">
            <h1 className="whitespace-nowrap text-xl font-semibold italic sm:text-2xl">BookStore</h1>
            <div className="hidden min-w-0 flex-1 md:block">
              <input
                className="h-10  w-full rounded-full bg-white px-4 text-black outline-none ring-2 ring-transparent transition focus:ring-blue-400"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search books..."
              />
            </div>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6 font-medium">
              <li className="cursor-pointer hover:text-blue-400">
                <Link to="/" onClick={closeMenu}>Home</Link>
              </li>
              <li className="cursor-pointer hover:text-blue-400">
                <Link to="/course" onClick={closeMenu}>Course</Link>
              </li>
              <li className="cursor-pointer hover:text-blue-400">
                <Link to="/contact" onClick={closeMenu}>Contact</Link>
              </li>
              <li className="cursor-pointer hover:text-blue-400">
                <Link to="/about" onClick={closeMenu}>About</Link>
              </li>
              <li className="cursor-pointer hover:text-blue-400">
                <Link to="/profile" onClick={closeMenu}>Profile</Link>
              </li>
            </ul>
          </div>

          <button
            className="flex items-center justify-center rounded p-2 text-2xl md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        <div className="mt-3 md:hidden">
          <input
            className="h-10 w-full rounded-full bg-white px-4 text-black outline-none ring-2 ring-transparent transition focus:ring-blue-400"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books..."
          />
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-gray-700 bg-gray-700 px-4 pb-4 pt-3 md:hidden">
          <ul className="flex flex-col gap-3 font-medium">
            <li className="cursor-pointer hover:text-blue-400">
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to="/course" onClick={closeMenu}>Course</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to="/contact" onClick={closeMenu}>Contact</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to="/about" onClick={closeMenu}>About</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to="/profile" onClick={closeMenu}>Profile</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
