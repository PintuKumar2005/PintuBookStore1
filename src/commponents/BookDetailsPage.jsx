import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { allBooks } from "../data/booksData";

const readCart = () => { try { return JSON.parse(localStorage.getItem("bookStoreCart") || "[]"); } catch { return []; } };

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const book = location.state?.book || allBooks.find((item) => String(item.id) === String(bookId));
  const backPath = location.state?.from || "/";
  const images = book ? [...new Set([...(book.images || []), book.src || book.cover].filter(Boolean))].slice(0, 4) : [];
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isAdded, setIsAdded] = useState(() => book ? readCart().some((item) => item.id === book.id) : false);

  const handleAddToCart = () => {
    if (!book || isAdded) return;
    const cart = readCart();
    localStorage.setItem("bookStoreCart", JSON.stringify([...cart, book]));
    setIsAdded(true);
    window.dispatchEvent(new Event("cartChange"));
  };

  if (!book) return <main className="min-h-[70vh] bg-[#f7f6f2] px-4 py-16"><div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm"><h1 className="text-2xl font-black">Book not found</h1><p className="mt-2 text-slate-500">This title may no longer be available.</p><Link to={backPath} className="mt-6 inline-block rounded-full bg-orange-500 px-5 py-2.5 font-bold text-white">Return to books</Link></div></main>;

  const details = [["Author", book.author], ["Publisher", book.publisher], ["Language", book.language], ["Format", book.format], ["Pages", book.pages], ["Edition", book.edition], ["ISBN", book.isbn]].filter(([, value]) => value);

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl"><Link to={backPath} className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-orange-600">← Back to collection</Link>
        <div className="grid overflow-hidden rounded-3xl border border-slate-200/70 bg-white shadow-xl shadow-slate-200/50 lg:grid-cols-2">
          <div className="bg-[#eeece6] p-6 sm:p-10">
            <div className="mx-auto flex max-w-md flex-col-reverse gap-4 sm:flex-row">
              {images.length > 1 ? <div className="flex gap-3 sm:flex-col">{images.map((image, index) => <button key={image} type="button" onClick={() => setSelectedImage(image)} aria-label={`View image ${index + 1}`} className={`h-20 w-14 overflow-hidden rounded-lg bg-white p-1 transition ${selectedImage === image ? "ring-2 ring-orange-500 ring-offset-2" : "opacity-70 hover:opacity-100"}`}><img src={image} alt="" className="h-full w-full object-contain"/></button>)}</div> : null}
              <div className="flex min-h-96 flex-1 items-center justify-center rounded-2xl bg-white/60 p-7"><img src={selectedImage} alt={book.title} className="max-h-[470px] w-full object-contain drop-shadow-2xl" /></div>
            </div>
          </div>
          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <span className="w-fit rounded-full bg-orange-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-orange-600">{book.category}</span>
            <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl">{book.title}</h1>
            <p className="mt-2 text-sm text-slate-500">by <span className="font-semibold text-slate-700">{book.author}</span></p>
            <p className="mt-6 text-3xl font-black text-slate-900">{book.price}</p>
            {book.description ? <p className="mt-6 leading-7 text-slate-600">{book.description}</p> : null}
            <dl className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-slate-100 py-6">{details.map(([label, value]) => <div key={label}><dt className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</dt><dd className="mt-1 text-sm font-semibold text-slate-700">{value}</dd></div>)}</dl>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={handleAddToCart} disabled={isAdded} className={`flex-1 rounded-full px-6 py-3.5 text-sm font-bold text-white transition ${isAdded ? "bg-emerald-600" : "bg-orange-500 hover:bg-orange-600"}`}>{isAdded ? "✓ Added to cart" : "Add to cart"}</button><Link to="/cart" className="rounded-full border border-slate-200 px-6 py-3.5 text-center text-sm font-bold text-slate-700 hover:bg-slate-50">View cart</Link></div>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-400"><span>✓ Secure checkout</span><span>✓ Saved delivery address</span><span>✓ Easy ordering</span></div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookDetailsPage;
