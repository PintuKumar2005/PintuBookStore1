import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { allBooks } from "../data/booksData";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const location = useLocation();
  const bookFromState = location.state?.book;
  const book = bookFromState || allBooks.find((item) => item.id === bookId);
  const backPath = location.state?.from || "/";
  const [isAdded, setIsAdded] = useState(false);
  const defaultImages = [
    
  ];
  const imageOptions = book
    ? [
        ...(Array.isArray(book.images) ? book.images : [book.src || book.cover]).filter(Boolean),
        ...defaultImages,
      ].slice(0, 3)
    : defaultImages;
  const [selectedImage, setSelectedImage] = useState(imageOptions[0]);

  useEffect(() => {
    if (!book) return;
    const cart = JSON.parse(localStorage.getItem("bookStoreCart") || "[]");
    setIsAdded(cart.some((item) => item.id === book.id));
  }, [book]);

  useEffect(() => {
    setSelectedImage(imageOptions[0]);
  }, [bookId]);

  const handleAddToCart = () => {
    if (!book) return;
    const cart = JSON.parse(localStorage.getItem("bookStoreCart") || "[]");
    if (!cart.some((item) => item.id === book.id)) {
      cart.push(book);
      localStorage.setItem("bookStoreCart", JSON.stringify(cart));
    }
    setIsAdded(true);
  };

  if (!book) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-10">
        <div className="rounded-lg bg-gray-100 p-6 text-center">
          <p className="text-lg font-semibold text-gray-700">Book details not available.</p>
          <Link to={backPath} className="mt-4 inline-block rounded bg-orange-500 px-4 py-2 text-white">
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl h-120 rounded-lg bg-gray-100 p-6 shadow-sm">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="mx-auto h-80 w-56 rounded-md bg-gray-200 p-2">
            <div className="h-full w-full overflow-hidden rounded-md">
              <img
                src={selectedImage}
                alt={book.title}
                className="h-full w-full rounded-md object-cover transition-transform duration-300 ease-out hover:scale-110"
              />
            </div>

            {/*  for change images */}
            <div className="mt-6 grid grid-cols-3 gap-3 rounded-md bg-gray-100 p-3 sm:grid-cols-3">
              {imageOptions.map((image, index) => (
                <button
                  key={`${book.id}-${index}`}
                  type="button"
                  onClick={() => setSelectedImage(image)}
                  className={`h-16 overflow-hidden rounded border text-sm font-semibold ${
                    selectedImage === image ? "border-orange-500 ring-2 ring-orange-300" : "border-black"
                  }`}
                >
                  <img src={image} alt={`${book.title} preview ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>


          </div>

          <div className="mt-35 sm:mt-5 md:mt-2">
            <p className="text-sm font-medium text-orange-600">{book.category}</p>
            <h1 className="mt-2 text-2xl font-bold text-gray-900">{book.title}</h1>
            <p className="mt-4 text-xl font-semibold text-gray-800">{book.price}</p>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p><span className="font-semibold">Author:</span> {book.author}</p>
              {book.publisher && <p><span className="font-semibold">Publisher:</span> {book.publisher}</p>}
              {book.language && <p><span className="font-semibold">Language:</span> {book.language}</p>}
              {book.format && <p><span className="font-semibold">Format:</span> {book.format}</p>}
              {book.pages && <p><span className="font-semibold">Pages:</span> {book.pages}</p>}
              {book.isbn && <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>}
              {book.edition && <p><span className="font-semibold">Edition:</span> {book.edition}</p>}
            </div>

            {book.description && <p className="mt-4 text-gray-600">{book.description}</p>}
            <div className="mt-6 flex gap-3 mb-4">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`rounded px-4 py-2 text-white ${isAdded ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isAdded ? "Added to Cart" : "Add to Cart"}
              </button>
              <Link to={backPath} className="inline-block rounded bg-orange-500 px-4 py-2 text-white">
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
