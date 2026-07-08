import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseBooks } from "../data/courseBooksData";
import BookCard from "./BookCard";

const CoursePage = ({ searchQuery = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  const categories = ["All", "Class 10th", "Class 12th", "SSC", "Banking", "UPSC", "Railway"];
  const visibleBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return courseBooks.filter((book) => (selectedCategory === "All" || book.category === selectedCategory) && (!query || [book.title, book.author, book.category].some((value) => String(value).toLowerCase().includes(query))));
  }, [searchQuery, selectedCategory]);
  const openBook = (book) => navigate(`/book/${book.id}`, { state: { book, from: location.pathname } });

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">Learn with confidence</p><h1 className="mt-3 text-3xl font-black sm:text-5xl">Books for every ambition.</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">School textbooks and focused exam preparation, all in one dependable shelf.</p>
        </section>
        <div className="mt-8 flex gap-2 overflow-x-auto pb-2">{categories.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`shrink-0 rounded-full px-4 py-2.5 text-sm font-bold transition ${selectedCategory === category ? "bg-orange-500 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300"}`}>{category}</button>)}</div>
        <div className="mt-7 flex items-end justify-between"><div><h2 className="text-2xl font-black text-slate-900">{searchQuery.trim() ? "Search results" : selectedCategory === "All" ? "All academic books" : selectedCategory}</h2><p className="mt-1 text-sm text-slate-500">{visibleBooks.length} {visibleBooks.length === 1 ? "book" : "books"} available</p></div></div>
        {visibleBooks.length ? <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{visibleBooks.map((book) => <BookCard key={book.id} book={book} onClick={openBook} />)}</div> : <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-white py-16 text-center text-slate-500">No books match your filters.</div>}
      </div>
    </main>
  );
};

export default CoursePage;
