import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const readList = (key) => { try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; } };
const amount = (price) => Number(String(price || "").replace(/[^\d.]/g, "")) || 0;

const CartPage = () => {
  const [cartBooks, setCartBooks] = useState(() => readList("bookStoreCart"));
  const navigate = useNavigate();
  const totalPrice = useMemo(() => cartBooks.reduce((sum, book) => sum + amount(book.price), 0), [cartBooks]);
  const delivery = cartBooks.length ? 0 : 0;

  const saveCart = (next) => { setCartBooks(next); localStorage.setItem("bookStoreCart", JSON.stringify(next)); window.dispatchEvent(new Event("cartChange")); };
  const removeFromCart = (bookId) => saveCart(cartBooks.filter((book) => book.id !== bookId));

  const handleCheckout = () => {
    if (!localStorage.getItem("bookStoreUser")) { navigate("/login", { state: { from: "/address" } }); return; }
    if (!localStorage.getItem("bookStoreAddress")) { navigate("/address"); return; }
    if (!cartBooks.length) return;
    const oldOrders = readList("bookStoreOrders");
    const placedAt = new Date().toISOString();
    const newOrders = cartBooks.map((book, index) => ({ id: Date.now() + index, book: book.title, price: book.price, status: "Placed", placedAt, bookId: book.id, cover: book.src || book.cover }));
    localStorage.setItem("bookStoreOrders", JSON.stringify([...newOrders, ...oldOrders]));
    saveCart([]);
    navigate("/account", { state: { orderPlaced: true } });
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-10 sm:px-6 lg:px-8"><div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Your selection</p><h1 className="mt-2 text-3xl font-black text-slate-900 sm:text-4xl">Shopping cart</h1><p className="mt-2 text-sm text-slate-500">{cartBooks.length} {cartBooks.length === 1 ? "book" : "books"} ready for checkout</p></div>{cartBooks.length ? <button type="button" onClick={() => saveCart([])} className="text-sm font-bold text-red-500 hover:text-red-700">Clear cart</button> : null}</div>
      {cartBooks.length ? <div className="mt-8 grid items-start gap-6 lg:grid-cols-[1fr_360px]"><section className="space-y-3">{cartBooks.map((book) => <article key={book.id} className="flex gap-4 rounded-2xl border border-slate-200/70 bg-white p-4 shadow-sm sm:gap-6 sm:p-5"><Link to={`/book/${book.id}`} state={{ book, from: "/cart" }} className="flex h-32 w-24 shrink-0 items-center justify-center rounded-xl bg-[#f1efe9] p-2"><img src={book.src || book.cover} alt={book.title} className="h-full w-full object-contain"/></Link><div className="flex min-w-0 flex-1 flex-col"><p className="text-xs font-bold uppercase tracking-wider text-orange-600">{book.category}</p><Link to={`/book/${book.id}`} state={{ book, from: "/cart" }} className="mt-1 line-clamp-2 font-bold text-slate-800 hover:text-orange-600">{book.title}</Link><p className="mt-1 text-xs text-slate-400">{book.author}</p><div className="mt-auto flex items-end justify-between"><p className="text-lg font-black text-slate-900">{book.price}</p><button type="button" onClick={() => removeFromCart(book.id)} className="text-xs font-bold text-red-500 hover:text-red-700">Remove</button></div></div></article>)}</section>
        <aside className="sticky top-24 rounded-3xl bg-slate-900 p-6 text-white shadow-xl"><h2 className="text-xl font-black">Order summary</h2><div className="mt-6 space-y-3 text-sm text-slate-300"><div className="flex justify-between"><span>Subtotal</span><span>₹{totalPrice.toFixed(2)}</span></div><div className="flex justify-between"><span>Delivery</span><span className="font-bold text-emerald-400">Free</span></div><div className="flex justify-between border-t border-white/10 pt-4 text-lg font-black text-white"><span>Total</span><span>₹{(totalPrice + delivery).toFixed(2)}</span></div></div><button type="button" onClick={handleCheckout} className="mt-6 w-full rounded-full bg-orange-500 py-3.5 text-sm font-bold transition hover:bg-orange-400">Proceed to checkout</button><p className="mt-4 text-center text-xs text-slate-500">Secure local demo checkout</p></aside></div>
      : <section className="mt-8 flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-6 text-center"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-3xl">📚</div><h2 className="mt-5 text-xl font-black text-slate-800">Your cart is waiting</h2><p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">Add a few books and they’ll appear here, ready for your next reading adventure.</p><Link to="/" className="mt-6 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600">Browse books</Link></section>}
    </div></main>
  );
};

export default CartPage;
