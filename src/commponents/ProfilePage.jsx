import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="bg-gray-400 h-50 w-40 ml-310 text-2xl rounded-1xl">
      <div className="flex justify-center items-center">
          <Link to="/cart">
         <button > Cart </button>
          </Link>
      </div>
      <div className="flex justify-center items-center">
        <button>Account</button>
      </div>
    </div>
  );
};

export default ProfilePage;