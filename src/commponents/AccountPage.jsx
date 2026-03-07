import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fallbackUser = null;
  const [user, setUser] = useState(fallbackUser);
  const [orders, setOrders] = useState([]);
  const [savedAddress, setSavedAddress] = useState(null);
  const [accountMessage, setAccountMessage] = useState("");
  const addressSectionRef = useRef();
  const totalPayable = orders.reduce((sum, order) => {
    const value = Number(String(order.price || "").replace(/[^\d.]/g, ""));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  useEffect(() => {
    const syncAccount = () => {
      const address = JSON.parse(localStorage.getItem("bookStoreAddress") || "null");
      const savedUser = JSON.parse(localStorage.getItem("bookStoreUser") || "null");
      const savedOrders = JSON.parse(localStorage.getItem("bookStoreOrders") || "[]");
      setSavedAddress(address);
      setUser(savedUser);
      setOrders(savedOrders);
    };

    syncAccount();
    window.addEventListener("authChange", syncAccount);
    return () => {
      window.removeEventListener("authChange", syncAccount);
    };
  }, []);

  useEffect(() => {
    if ((location.state?.openAddress || location.state?.orderPlaced) && addressSectionRef.current) {
      addressSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (location.state?.openAddress) {
      setAccountMessage("Please select address for your order.");
    }
    if (location.state?.orderPlaced) {
      setAccountMessage("Order placed successfully.");
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("bookStoreUser");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    setAccountMessage("Logout successfully");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 pt-10">
      <div className="w-full max-w-[700px] rounded-2xl bg-white p-8 shadow-lg">

          {/* Profile Section */}
          <div className="border-b pb-6">
            <h1 className="mb-4 text-center text-2xl font-bold">My Account</h1>
            {accountMessage ? (
              <p className="mb-3 rounded bg-green-100 px-3 py-2 text-sm text-green-800">{accountMessage}</p>
            ) : null}

            {user ? (
              <>
                <p className="text-gray-700"><span className="font-semibold">Name:</span> {user.name}</p>
                {user.phone ? (
                  <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone}</p>
                ) : null}
                {user.email ? (
                  <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                ) : null}
                <p className="text-gray-700"><span className="font-semibold">Member Since:</span> {user.joined}</p>
              </>
            ) : (
              <p className="text-gray-500">No user logged in.</p>
            )}
          </div>

          <div ref={addressSectionRef} className="mt-6 border-t pt-6">
            <h2 className="mb-4 text-center text-xl font-semibold">Saved Address</h2>
            {savedAddress ? (
              <div className="bg-gray-50 p-4 rounded-lg text-gray-700">
                <p><span className="font-semibold">Name:</span> {savedAddress.fullName}</p>
                <p><span className="font-semibold">Phone:</span> {savedAddress.phone}</p>
                <p><span className="font-semibold">Address:</span> {savedAddress.street}</p>
                <p><span className="font-semibold">City:</span> {savedAddress.city}</p>
                <p><span className="font-semibold">State:</span> {savedAddress.state}</p>
                <p><span className="font-semibold">PIN:</span> {savedAddress.pinCode}</p>
              </div>
            ) : (
              <p className="text-gray-500">No address saved yet. Go to Cart and click Buy Now.</p>
            )}
            <button
              type="button"
              onClick={() => navigate("/address")}
              className="mt-4 rounded bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
            >
              Select Address
            </button>
          </div>
        </div>

      <div className="mt-6 w-full max-w-[700px] rounded-2xl bg-white p-8 shadow-lg">
          {/* Orders Section */}
          <div>
            <h2 className="mb-4 text-center text-xl font-semibold">My Orders</h2>

            {orders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center bg-gray-50 p-4 rounded-lg mb-3"
              >
                <div>
                  <p className="font-medium">{order.book}</p>
                  <p className="text-sm text-gray-500">{order.price}</p>
                </div>

                <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded">
                  {order.status}
                </span>
              </div>
            ))}
            <div className="mt-3 rounded bg-gray-100 p-3 text-right">
              <p className="text-sm text-gray-600">Total Payable Amount</p>
              <p className="text-lg font-bold text-gray-900">₹{totalPayable.toFixed(2)}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-6 text-right">
            <button
              onClick={handleLogout}
              disabled={!user}
              className={`px-5 py-2 rounded-lg text-white ${user ? "bg-red-500 hover:bg-red-600" : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Logout
            </button>
          </div>
        </div>
    </div>
  );
};

export default AccountPage;
