import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("bookStoreUser")));
  const [statusMessage, setStatusMessage] = useState("");
  const statusTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);
  const closeProfile = () => setIsProfileOpen(false);
  const showStatusMessage = (message) => {
    setStatusMessage(message);
    if (statusTimerRef.current) {
      clearTimeout(statusTimerRef.current);
    }
    statusTimerRef.current = setTimeout(() => {
      setStatusMessage("");
    }, 2500);
  };

  const handleSearchInput = (value) => {
    onSearchChange(value);
    if (value.trim() && location.pathname !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(Boolean(localStorage.getItem("bookStoreUser")));
    syncAuth();
    window.addEventListener("authChange", syncAuth);
    window.addEventListener("storage", syncAuth);
    return () => {
      window.removeEventListener("authChange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    const pendingMessage = sessionStorage.getItem("bookStoreStatusMessage");
    if (pendingMessage) {
      sessionStorage.removeItem("bookStoreStatusMessage");
      showStatusMessage(pendingMessage);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("bookStoreUser");
    window.dispatchEvent(new Event("authChange"));
    showStatusMessage("Logout successfully");
    closeProfile();
    navigate("/");
  };

  return (
    <>
      <nav className="w-full bg-gray-800 text-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-3 sm:px-6 lg:px-8">

          {/* Top Row */}
          <div className="flex items-center justify-between gap-3">

            {/* Logo + Search */}
            <div className="flex min-w-0 items-center gap-3 md:flex-1">
              <h1 className="whitespace-nowrap text-xl font-semibold italic sm:text-2xl">
                BookStore 📚
              </h1>

              {/* Desktop Search */}
              <div className="hidden min-w-0 flex-1 md:block">
                <input
                  className="h-10 w-full rounded-full bg-white px-4 text-black outline-none ring-2 ring-transparent transition focus:ring-blue-400"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  placeholder="Search books..."
                />
              </div>
            </div>

            {/* Desktop Menu */}
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

                {/* Profile Button (Modal Open) */}
                <li
                  className="cursor-pointer hover:text-blue-400"
                  onClick={() => setIsProfileOpen(true)}
                >
                  Profile
                </li>
              </ul>
            </div>

            {/* Mobile Toggle */}
            <button
              className="flex items-center justify-center rounded p-2 text-2xl md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <input
              className="h-10 w-full rounded-full bg-white px-4 text-black outline-none ring-2 ring-transparent transition focus:ring-blue-400"
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              placeholder="Search books..."
            />
          </div>
        </div>

        {/* Mobile Menu */}
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

              {/* Mobile Profile Button */}
              <li
                className="cursor-pointer hover:text-blue-400"
                onClick={() => {
                  setIsProfileOpen(true);
                  closeMenu();
                }}
              >
                Profile
              </li>
            </ul>
          </div>
        )}
      </nav>
      {statusMessage ? (
        <div className="bg-green-100 px-4 py-2 text-center text-sm font-medium text-green-800">
          {statusMessage}
        </div>
      ) : null}

      {/* Profile Modal */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-70 rounded-xl bg-white p-6 text-black shadow-2xl relative">

            <button
              onClick={closeProfile}
              className="absolute right-3 top-3 text-lg font-bold"
            >
              ✕
            </button>

            <div className="flex flex-col items-center text-2xl *:">
              <div className="flex justify-center items-center hover:bg-gray-300 w-full rounded-2xl">
                <Link to="/cart" onClick={closeProfile}>
                  Cart
                </Link>
              </div>
              <div className="flex justify-center items-center hover:bg-gray-300 w-full rounded-2xl">
                <Link to="/account" onClick={closeProfile}>
                  Account
                </Link>
              </div>
              <div className="flex justify-center items-center hover:bg-gray-300 w-full rounded-2xl">
                {isLoggedIn ? (
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/login" onClick={closeProfile}>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
