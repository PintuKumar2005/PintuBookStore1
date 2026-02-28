import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const ProfilePage = () => {
  const [cartBooks, setCartBooks] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("bookStoreCart") || "[]");
    setCartBooks(savedCart);
  }, []);

  const removeFromCart = (bookId) => {
    const updatedCart = cartBooks.filter((book) => book.id !== bookId);
    setCartBooks(updatedCart);
    localStorage.setItem("bookStoreCart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCartBooks([]);
    localStorage.removeItem("bookStoreCart");
  };

  const totalPrice = useMemo(() => {
    return cartBooks.reduce((sum, book) => {
      const value = Number(String(book.price || "").replace(/[^\d.]/g, ""));
      return sum + (Number.isNaN(value) ? 0 : value);
    }, 0);
  }, [cartBooks]);

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-lg bg-gray-100 p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/"
              className="inline-block rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Back to Home
            </Link>
            <button
              type="button"
              onClick={clearCart}
              disabled={cartBooks.length === 0}
              className={`rounded px-4 py-2 text-sm font-medium text-white ${
                cartBooks.length === 0 ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="mb-5 rounded bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Cart Summary</h2>
          <p className="mt-1 text-gray-700">Items: {cartBooks.length}</p>
          <p className="text-gray-700">Total: ₹{totalPrice.toFixed(2)}</p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold text-gray-900">Cart Section</h2>
          {cartBooks.length === 0 ? (
            <p className="rounded bg-white p-4 text-gray-600 shadow-sm">
              No books in cart. Open any book details page and click "Add to Cart".
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cartBooks.map((book) => (
                  <div key={book.id} className="rounded bg-white p-3 shadow-sm">
                    <div className="flex items-start gap-3 sm:block">
                      <Link
                        to={`/book/${book.id}`}
                        state={{ book, from: location.pathname }}
                        className="block shrink-0"
                      >
                        <div className="h-36 w-24 rounded bg-gray-100 p-1 sm:mx-auto sm:h-52 sm:w-36">
                          <img
                            src={book.src || book.cover}
                            alt={book.title}
                            className="h-full w-full rounded object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex-1 sm:mt-3 ml-5 mt-2">
                        <Link
                          to={`/book/${book.id}`}
                          state={{ book, from: location.pathname }}
                          className="block space-y-1 text-sm"
                        >
                          <p className="font-semibold text-gray-900 hover:text-orange-600">{book.title}</p>
                          <p className="text-gray-700">Category: {book.category}</p>
                          <p className="text-gray-700">Price: {book.price}</p>
                        </Link>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => removeFromCart(book.id)}
                            className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
