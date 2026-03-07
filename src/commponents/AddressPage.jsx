import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const emptyAddress = {
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pinCode: "",
  };
  const [address, setAddress] = useState(emptyAddress);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedAddress = JSON.parse(localStorage.getItem("bookStoreAddress") || "null");
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();
    localStorage.setItem("bookStoreAddress", JSON.stringify(address));
    setMessage("Address saved successfully.");
  };

  const handleSavedAddress = () => {
    const isFormComplete = Object.values(address).every((value) => String(value).trim() !== "");
    if (!isFormComplete) {
      setMessage("Please fill all fields.");
      return;
    }
    localStorage.setItem("bookStoreAddress", JSON.stringify(address));
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-6 shadow-md sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Address Section</h1>
        <p className="mt-1 text-sm text-gray-600">Add your address and then continue with Buy Now.</p>

        <form onSubmit={handleSaveAddress} className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            name="fullName"
            value={address.fullName}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            name="phone"
            value={address.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            name="street"
            value={address.street}
            onChange={handleChange}
            required
            placeholder="Street Address"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 sm:col-span-2"
          />
          <input
            name="city"
            value={address.city}
            onChange={handleChange}
            required
            placeholder="City"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            placeholder="State"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
          />
          <input
            name="pinCode"
            value={address.pinCode}
            onChange={handleChange}
            required
            placeholder="PIN Code"
            className="rounded border border-gray-300 px-3 py-2 outline-none focus:border-orange-500 sm:col-span-2"
          />

          <div className="flex gap-2 sm:col-span-2">
            <button
              type="submit"
              onClick={handleSavedAddress}
              className="rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Saved Address
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddressPage;
