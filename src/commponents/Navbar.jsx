import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("bookStoreUser")));
  const [cartCount, setCartCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");
  const statusTimerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const showStatusMessage = (message) => {
    setStatusMessage(message);
    clearTimeout(statusTimerRef.current);
    statusTimerRef.current = setTimeout(() => setStatusMessage(""), 2500);
  };

  useEffect(() => {
    const sync = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("bookStoreUser")));
      try { setCartCount(JSON.parse(localStorage.getItem("bookStoreCart") || "[]").length); } catch { setCartCount(0); }
    };
    sync();
    window.addEventListener("authChange", sync);
    window.addEventListener("cartChange", sync);
    window.addEventListener("storage", sync);
    return () => { window.removeEventListener("authChange", sync); window.removeEventListener("cartChange", sync); window.removeEventListener("storage", sync); };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const message = sessionStorage.getItem("bookStoreStatusMessage");
      if (message) { sessionStorage.removeItem("bookStoreStatusMessage"); showStatusMessage(message); }
      setIsOpen(false);
      setIsProfileOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  useEffect(() => () => clearTimeout(statusTimerRef.current), []);

  const handleSearch = (value) => {
    onSearchChange(value);
    if (value.trim() && location.pathname !== "/") navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("bookStoreUser");
    window.dispatchEvent(new Event("authChange"));
    showStatusMessage("You have been logged out.");
    navigate("/");
  };

  const navClass = ({ isActive }) => `rounded-full px-3 py-2 text-sm font-bold transition ${isActive ? "bg-orange-50 text-orange-600" : "text-slate-600 hover:text-slate-900"}`;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0 text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Book<span className="text-orange-500">Store</span></Link>
          <div className="relative hidden min-w-0 flex-1 md:block lg:max-w-md">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"><circle cx="11" cy="11" r="7" strokeWidth="2"/><path d="m20 20-4-4" strokeWidth="2"/></svg>
            <input value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search title, author, or category" aria-label="Search books" className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-orange-300 focus:bg-white focus:ring-4 focus:ring-orange-100" />
          </div>
          <nav className="ml-auto hidden items-center gap-1 md:flex">
            <NavLink to="/" className={navClass}>Books</NavLink><NavLink to="/course" className={navClass}>Academic</NavLink><NavLink to="/about" className={navClass}>About</NavLink><NavLink to="/contact" className={navClass}>Contact</NavLink>
          </nav>
          <Link to="/cart" aria-label={`Cart with ${cartCount} items`} className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700 transition hover:border-orange-200 hover:text-orange-600">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><path d="M3 3h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 7H6" strokeWidth="1.8"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></svg>
            {cartCount > 0 ? <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">{cartCount}</span> : null}
          </Link>
          <div className="relative hidden md:block">
            <button type="button" onClick={() => setIsProfileOpen((value) => !value)} aria-expanded={isProfileOpen} className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white transition hover:bg-orange-500">{isLoggedIn ? "BS" : <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-5 w-5"><circle cx="12" cy="8" r="4" strokeWidth="1.8"/><path d="M4 21a8 8 0 0 1 16 0" strokeWidth="1.8"/></svg>}</button>
            {isProfileOpen ? <div className="absolute right-0 top-12 w-52 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"><Link to="/account" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">My account</Link><Link to="/cart" className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">Shopping cart</Link><div className="my-1 border-t border-slate-100"/>{isLoggedIn ? <button type="button" onClick={handleLogout} className="w-full rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-red-50">Log out</button> : <Link to="/login" className="block rounded-xl bg-orange-500 px-3 py-2.5 text-center text-sm font-bold text-white">Sign in</Link>}</div> : null}
          </div>
          <button type="button" onClick={() => setIsOpen((value) => !value)} aria-label="Toggle navigation" aria-expanded={isOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-xl md:hidden">{isOpen ? "×" : "☰"}</button>
        </div>
        <div className="px-4 pb-3 md:hidden"><input value={searchQuery} onChange={(e) => handleSearch(e.target.value)} placeholder="Search books…" aria-label="Search books" className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-orange-300" /></div>
        {isOpen ? <nav className="border-t border-slate-100 bg-white px-4 py-3 md:hidden"><div className="grid grid-cols-2 gap-2"><NavLink to="/" className={navClass}>Books</NavLink><NavLink to="/course" className={navClass}>Academic</NavLink><NavLink to="/about" className={navClass}>About</NavLink><NavLink to="/contact" className={navClass}>Contact</NavLink><NavLink to="/account" className={navClass}>Account</NavLink>{isLoggedIn ? <button type="button" onClick={handleLogout} className="rounded-full px-3 py-2 text-left text-sm font-bold text-red-600">Log out</button> : <NavLink to="/login" className={navClass}>Sign in</NavLink>}</div></nav> : null}
      </header>
      {statusMessage ? <div role="status" className="fixed left-1/2 top-22 z-50 -translate-x-1/2 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg">{statusMessage}</div> : null}
    </>
  );
};

export default Navbar;
