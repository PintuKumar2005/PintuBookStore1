import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { allBooks, childrenBooks, fictionBooks, nonFictionBooks } from "../data/booksData";
import BookCard from "./BookCard";

const collections = { Fiction: fictionBooks, "Non-Fiction": nonFictionBooks, Children: childrenBooks };

const HomePage = ({ searchQuery = "" }) => {
  const [selected, setSelected] = useState("Fiction");
  const navigate = useNavigate();
  const categories = ["Fiction", "Non-Fiction", "Children"];

  const visibleBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const source = query ? allBooks : collections[selected];
    return query ? source.filter((book) => [book.title, book.author, book.category].some((value) => String(value).toLowerCase().includes(query))) : source;
  }, [searchQuery, selected]);

  const openBook = (book) => navigate(`/book/${book.id}`, { state: { book, from: "/" } });

  return (
    <main className="min-h-screen bg-[#f7f6f2]">
      {!searchQuery.trim() ? (
        <section className="overflow-hidden bg-slate-900 px-4 py-14 text-white sm:px-6 sm:py-20 lg:px-8">
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-orange-500/15 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-orange-400">Books worth keeping</p>
              <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-6xl">Find the story that stays with you.</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">Explore thoughtful fiction, practical non-fiction, children’s favorites, and the books that help you ace your next exam.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })} className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold transition hover:bg-orange-400">Browse collection</button>
                <button type="button" onClick={() => navigate("/course")} className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-bold transition hover:bg-white/15">Shop academic books</button>
              </div>
              <div className="mt-10 flex gap-8 text-sm text-slate-400"><span><strong className="block text-xl text-white">50+</strong>curated titles</span><span><strong className="block text-xl text-white">6</strong>exam categories</span><span><strong className="block text-xl text-white">Easy</strong>checkout</span></div>
            </div>
            <div className="relative hidden min-h-96 lg:block">
              {fictionBooks.slice(0, 3).map((book, index) => (
                <img key={book.id} src={book.src} alt="" className={`absolute w-44 rounded-lg shadow-2xl transition hover:-translate-y-2 ${index === 0 ? "left-4 top-20 -rotate-12" : index === 1 ? "left-40 top-2 z-10 rotate-3" : "right-2 top-24 rotate-12"}`} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section id="collection" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Curated for you</p><h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900">{searchQuery.trim() ? `Results for “${searchQuery}”` : "Explore our shelves"}</h2></div>
          {!searchQuery.trim() ? <div className="flex gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} type="button" onClick={() => setSelected(category)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${selected === category ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-600 hover:border-orange-300"}`}>{category}</button>)}</div> : null}
        </div>
        {visibleBooks.length ? <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">{visibleBooks.map((book) => <BookCard key={book.id} book={book} onClick={openBook} />)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center"><p className="font-bold text-slate-800">No matching books</p><p className="mt-2 text-sm text-slate-500">Try a title, author, or category.</p></div>}
      </section>
    </main>
  );
};

export default HomePage;
