import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Our Book Store 📚
        </h1>
        <p className="max-w-2xl mx-auto text-indigo-100">
          Discover a world of knowledge, imagination, and inspiration.
          We bring the best books from around the world to your doorstep.
        </p>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          
          {/* Image */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
              alt="Book Store"
              className="rounded-2xl shadow-lg"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600 mb-4">
              Our mission is to make reading accessible and enjoyable for
              everyone. From academic textbooks to bestselling novels,
              we provide a wide variety of books for all readers.
            </p>
            <p className="text-gray-600">
              We believe books have the power to transform lives,
              spark creativity, and build knowledge.
            </p>
          </div>

        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-800">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Wide Collection</h3>
              <p className="text-gray-600">
                Thousands of books across different genres and categories.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Affordable Prices</h3>
              <p className="text-gray-600">
                Best prices and amazing discounts on popular books.
              </p>
            </div>

            <div className="p-6 shadow-lg rounded-2xl hover:shadow-xl transition">
              <h3 className="text-xl font-semibold mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                Quick and reliable delivery to your location.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-indigo-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-4">
          Start Your Reading Journey Today!
        </h2>
        <p className="mb-6 text-indigo-100">
          Explore our collection and find your next favorite book.
        </p>
        <a
          href="/"
          className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Browse Books
        </a>
      </section>

    </div>
  );
};

export default About;