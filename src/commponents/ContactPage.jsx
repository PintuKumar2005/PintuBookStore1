import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl grid md:grid-cols-2 overflow-hidden">
        
        {/* Left Side Info */}
        <div className="bg-indigo-600 text-white p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Get in Touch 📚</h2>
          <p className="mb-6 text-indigo-100">
            Have questions about books, orders, or recommendations?
            We'd love to hear from you!
          </p>

          <div className="space-y-4">
            <p>📍 Bhopal, India</p>
            <p>📞 +91 6206758647</p>
            <p>📧 support@bookstore.com</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Contact Form
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-600">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-600">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;