import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { courseBooks } from "../data/courseBooksData";

const CoursePage = ({ searchQuery = "" }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();

  const bookCategories = ["Class 10th", "Class 12th", "SSC", "Banking", "UPSC", "Railway"];
  const categories = ["All", ...bookCategories];

  const visibleBooks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const categoryBooks =
      selectedCategory === "All"
        ? courseBooks
        : courseBooks.filter((book) => book.category === selectedCategory);

    if (!query) return categoryBooks;

    return categoryBooks.filter((book) => {
      return (
        String(book.title).toLowerCase().includes(query) ||
        String(book.author).toLowerCase().includes(query) ||
        String(book.category).toLowerCase().includes(query)
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleBookClick = (book) => {
    navigate(`/book/${book.id}`, {
      state: {
        book,
        from: location.pathname,
      },
    });
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-lg bg-gray-100 p-4 sm:p-6">
        <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
        <p className="mt-1 text-sm text-gray-600">Choose course and buy books.</p>

        <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>


        {(selectedCategory === "All" || bookCategories.includes(selectedCategory)) && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-900">
              {searchQuery.trim() ? "Search Results" : "Books"}
            </h2>
            {visibleBooks.length === 0 ? (
              <p className="mt-4 rounded bg-white p-4 text-gray-600 shadow-sm">
                No books found for "{searchQuery}".
              </p>
            ) : (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {visibleBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleBookClick(book)}
                    className="group flex h-full cursor-pointer flex-col rounded-lg bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="mx-auto w-full max-w-[180px] overflow-hidden rounded-md">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="aspect-[3/4] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-gray-900 sm:text-lg">{book.title}</h3>
                    <p className="mt-2 text-base font-semibold text-gray-900">{book.price}</p>
                    {/* <button
                      type="button"
                      onClick={(e) => e.stopPropagation()}
                      className="mt-4 w-full rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                      Add to Cart
                    </button> */}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
