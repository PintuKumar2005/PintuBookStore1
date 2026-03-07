import React, { useState } from "react";
import Navbar from "./commponents/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./commponents/HomePage";
import CoursePage from "./commponents/CoursePage";
import AboutPage from "./commponents/AboutPage";
import ProfilePage from "./commponents/ProfilePage";
import ContactPage from "./commponents/ContactPage";
import BookDetailsPage from "./commponents/BookDetailsPage";
import CartPage from "./commponents/CartPage";
import AccountPage from "./commponents/AccountPage";
import LoginPage from "./commponents/LoginPage";
import AddressPage from "./commponents/AddressPage";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <Routes>
        <Route path="/" element={<HomePage searchQuery={searchQuery} />} />
        <Route path="/course" element={<CoursePage searchQuery={searchQuery} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book/:bookId" element={<BookDetailsPage />} />
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/address" element={<AddressPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </>
  );
};

export default App;
