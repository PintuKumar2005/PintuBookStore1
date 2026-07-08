import React from "react";

const BookCard = ({ book, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(book)}
    className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl hover:shadow-slate-200/60 focus:outline-none focus:ring-4 focus:ring-orange-100"
  >
    <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f1efe9] p-4 sm:p-5">
      <img src={book.src || book.cover} alt={book.title} className="h-full w-full object-contain drop-shadow-lg transition duration-500 group-hover:scale-105" />
      <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600 shadow-sm backdrop-blur">{book.category}</span>
    </div>
    <div className="flex flex-1 flex-col p-4">
      <h3 className="line-clamp-2 font-bold leading-snug text-slate-800 transition group-hover:text-orange-600">{book.title}</h3>
      <p className="mt-1 truncate text-xs text-slate-400">by {book.author || "BookStore author"}</p>
      <div className="mt-auto flex items-end justify-between gap-2 pt-4">
        <span className="font-bold text-slate-900">{book.price}</span>
        <span className="text-xs font-bold text-orange-600">View book →</span>
      </div>
    </div>
  </button>
);

export default BookCard;
