import React, { useState } from "react";
import Navbar from "./commponents/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./commponents/HomePage";
import CoursePage from "./commponents/CoursePage";
import AboutPage from "./commponents/AboutPage";
import ProfilePage from "./commponents/ProfilePage";
import ContactPage from "./commponents/ContactPage";
import BookDetailsPage from "./commponents/BookDetailsPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book/:bookId" element={<BookDetailsPage />} />
      </Routes>
    </>
  );
};

export default App;
