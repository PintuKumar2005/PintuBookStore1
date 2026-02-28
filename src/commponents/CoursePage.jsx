import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CoursePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const location = useLocation();
  

  const courseOptions = [
  ];

  const manualBooks = [
    // class 10th book
    {images: [
      "https://m.media-amazon.com/images/I/51E2xnsbFSL.jpg",
      "https://m.media-amazon.com/images/I/91gcjeazhvL._AC_UY436_FMwebp_QL65_.jpg",
      "https://m.media-amazon.com/images/I/41qXiRx1pzL.jpg",
    ],
      id: "a1",
      title: "NCERT Mathematics",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/51E2xnsbFSL.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a2",
      title: "NCERT Science",
      author: "NCERT",
      category: "Class 10th",
      price: "₹290",
      cover: "https://m.media-amazon.com/images/I/91gcjeazhvL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 420,
      edition: "Latest Edition",
    },
    {
      id: "a3",
      title: "NCERT History-II",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/41qXiRx1pzL.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a4",
      title: "NCERT Democratic Politics-II",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/31jSejWtvPL._AC_UY320_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a5",
      title: "NCERT Geography-Contemporary India-II",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/71PFrkXbMZL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a6",
      title: "NCERT English",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/31KamO8yuzL._AC_UY256_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a7",
      title: "NCERT Hindi",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/71LdJvsV0AL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "Hindi",
      pages: 392,
      edition: "Latest Edition",
    },
    {
      id: "a8",
      title: "NCERT Economics-Understanding Economics Developement",
      author: "NCERT",
      category: "Class 10th",
      price: "₹320",
      cover: "https://m.media-amazon.com/images/I/9169hGRPv1L._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "Hindi",
      pages: 392,
      edition: "Latest Edition",
    },

    // class 12th books
    {
      id: "b1",
      title: "NCERT Physics part-I",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/41a9ZxpM+kL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b2",
      title: "NCERT Physics part-II",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/91MGjnYsatL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 296,
      edition: "Part II",
    },
    {
      id: "b3",
      title: "NCERT Mathematics Part-I",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/41GZ7FPQEML._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b4",
      title: "NCERT Mathematics Part-II",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/31axt4KALFL._AC_UY256_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b5",
      title: "NCERT Biology",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/41pXwZbvI6L._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b6",
      title: "NCERT Computer Science",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/41a9ZxpM+kL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b7",
      title: "NCERT Chemistry Part-I",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/91O0KWIivdL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },
    {
      id: "b8",
      title: "NCERT Chemistry Part-II",
      author: "NCERT",
      category: "Class 12th",
      price: "₹340",
      cover: "https://m.media-amazon.com/images/I/71EbahdYuWL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "NCERT",
      language: "English",
      pages: 312,
      edition: "Part I",
    },

    // SSC books
    {
      id: "c1",
      title: "SSC General Studies",
      author: "Arihant",
      category: "SSC",
      price: "₹410",
      cover: "https://m.media-amazon.com/images/I/81reExTs42L._AC_UY436_QL65_.jpg",
      publisher: "Disha Publication",
      language: "English",
      pages: 640,
      edition: "2026 Edition",
    },
    {
      id: "c2",
      title: "SSC Mathematics",
      author: "Arihant",
      category: "SSC",
      price: "₹410",
      cover: "https://m.media-amazon.com/images/I/81a2lJwOnaL._AC_UY436_QL65_.jpg",
      publisher: "Disha Publication",
      language: "English",
      pages: 640,
      edition: "2026 Edition",
    },

    // Banking Books
    {
      id: "d1",
      title: "Banking Quantitative Aptitude",
      author: "R. S. Aggarwal",
      category: "Banking",
      price: "₹380",
      cover: "https://m.media-amazon.com/images/I/71QKQ9mwV7L._SY522_.jpg",
      publisher: "S. Chand",
      language: "English",
      pages: 704,
      edition: "Revised Edition",
    },
    
    // UPSC Books
    {
      id: "e1",
      title: "UPSC Polity",
      author: "M. Laxmikanth",
      category: "UPSC",
      price: "₹540",
      cover: "https://m.media-amazon.com/images/I/81lErh+IhdL._AC_SX416_CB1169409_QL70_.jpg",
      publisher: "McGraw Hill",
      language: "English",
      pages: 920,
      edition: "7th Edition",
    },

    // Railway Books
    {
      id: "f1",
      title: "Railway Exam Practice Set",
      author: "Arihant Experts",
      category: "Railway",
      price: "₹360",
      cover: "https://m.media-amazon.com/images/I/71kgWkFtipL._AC_UY436_FMwebp_QL65_.jpg",
      publisher: "Arihant",
      language: "English",
      pages: 560,
      edition: "2026 Edition",
    },
    {
      id: "f2",
      title: "Railway Exam Practice Set",
      author: "Arihant Experts",
      category: "Railway",
      price: "₹360",
      cover: "https://m.media-amazon.com/images/I/71TNjYLWT4L._AC_UL640_FMwebp_QL65_.jpg",
      publisher: "Arihant",
      language: "English",
      pages: 560,
      edition: "2026 Edition",
    },
    
  ];

  const bookCategories = ["Class 10th", "Class 12th", "SSC", "Banking", "UPSC", "Railway"];
  const categories = ["All", ...bookCategories];

  const visibleCourses = useMemo(() => {
    if (selectedCategory === "All") return courseOptions;
    return courseOptions.filter((course) => course.category === selectedCategory);
  }, [selectedCategory]);

  const visibleBooks = useMemo(() => {
    if (selectedCategory === "All") return manualBooks;
    return manualBooks.filter((book) => book.category === selectedCategory);
  }, [selectedCategory]);

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
            <h2 className="text-xl font-semibold text-gray-900">Books</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursePage;
