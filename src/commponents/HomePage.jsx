import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { allBooks, childrenBooks, fictionBooks, nonFictionBooks } from "../data/booksData";

const HomePage = ({ searchQuery }) => {
  const [selected, setSelected] = useState("Fiction");
  const navigate = useNavigate();

  const categories = ["Fiction", "Non-Fiction", "Children", "Young Adult", "Business"];

  const openBookDetails = (book) => {
    navigate(`/book/${book.id}`);
  };

  const renderBooks = (books) => {
    const query = searchQuery.trim().toLowerCase();
    const filteredBooks = query
      ? books.filter((book) => {
          return (
            String(book.title).toLowerCase().includes(query) ||
            String(book.author).toLowerCase().includes(query) ||
            String(book.category).toLowerCase().includes(query)
          );
        })
      : books;

    return (
      <div className="w-full pt-4 sm:pt-5">
        {filteredBooks.length === 0 ? (
          <p className="text-gray-600">No books found for "{searchQuery}".</p>
        ) : (
          <div className="grid grid-cols-2 place-items-center gap-10 sm:grid-cols-3 lg:grid-cols-5">
            {filteredBooks.map((book) => (
              <div
                key={book.id}
                onClick={() => openBookDetails(book)}
                className="mx-auto h-[260px] w-36 cursor-pointer rounded-md bg-gray-200 p-1 sm:h-[290px] sm:w-40 md:w-44"
              >
                <img
                  className="mx-auto h-44 w-28 pt-2 rounded-md object-cover transition-all duration-300 hover:scale-105 sm:h-48 sm:w-32 md:h-52 md:w-36"
                  src={book.src}
                  alt={book.title}
                />
                <p className="mt-2 min-h-10 pt-3 px-2 text-center text-0.5xl font-medium leading-4 text-gray-800">
                  {book.title}
                </p>
                <p className="mt-1 text-center text-sm font-semibold text-gray-700">{book.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const sectionData = {
    Fiction: renderBooks(fictionBooks),
    "Non-Fiction": renderBooks(nonFictionBooks),
    Children: renderBooks(childrenBooks),
    "Young Adult": <p className="pt-6 text-gray-600">Books coming soon.</p>,
    Business: <p className="pt-6 text-gray-600">Books coming soon.</p>,
  };

  const hasSearch = searchQuery.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto mt-2 flex max-w-7xl flex-wrap gap-3 sm:gap-4">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setSelected(item)}
            className={`h-10 w-30 rounded-2xl cursor-pointer transition-all duration-300 ${
              selected === item ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-orange-400"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mx-auto mt-5 h-auto max-w-7xl">
        {(selected || hasSearch) && (
          <div className="w-full rounded-xl bg-white p-4 shadow-sm sm:p-5 lg:p-5">
            <h2 className="text-xl font-bold">{hasSearch ? "Search Results" : `${selected} Books`}</h2>
            <div>{hasSearch ? renderBooks(allBooks) : sectionData[selected]}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
