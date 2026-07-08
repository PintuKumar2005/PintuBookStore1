import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-slate-950 px-4 py-10 text-slate-300 sm:px-6">
    <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <Link to="/" className="text-xl font-black text-white">Book<span className="text-orange-500">Store</span></Link>
        <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">Stories, knowledge, and exam essentials—carefully gathered for every kind of reader.</p>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-white">Explore</p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <Link to="/" className="hover:text-orange-400">Books</Link>
          <Link to="/course" className="hover:text-orange-400">Academic books</Link>
          <Link to="/about" className="hover:text-orange-400">Our story</Link>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-white">Help</p>
        <div className="mt-3 flex flex-col gap-2 text-sm">
          <Link to="/contact" className="hover:text-orange-400">Contact us</Link>
          <Link to="/account" className="hover:text-orange-400">My account</Link>
          <Link to="/cart" className="hover:text-orange-400">Shopping cart</Link>
        </div>
      </div>
    </div>
    <div className="mx-auto mt-9 max-w-7xl border-t border-white/10 pt-5 text-xs text-slate-500">© {new Date().getFullYear()} BookStore. Made for readers.</div>
  </footer>
);

export default Footer;
