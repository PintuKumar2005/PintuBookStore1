import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleSendOtp = () => {
    const isValidPhone = /^\d{10}$/.test(phone);
    if (!isValidPhone) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    const otpCode = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(otpCode);
    setOtpSent(true);
    setMessage(`Demo OTP: ${otpCode}`);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    if (!otpSent) {
      setMessage("Please send OTP first.");
      return;
    }

    if (otp !== generatedOtp) {
      setMessage("Invalid OTP. Please try again.");
      return;
    }

    const user = {
      name: "BookStore User",
      phone,
      joined: "March 2026",
    };

    localStorage.setItem("bookStoreUser", JSON.stringify(user));
    window.dispatchEvent(new Event("authChange"));
    sessionStorage.setItem("bookStoreStatusMessage", "Login successfully");
    const nextPath = location.state?.from || "/";
    const nextState = location.state?.openAddress ? { openAddress: true } : undefined;
    navigate(nextPath, { state: nextState });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">Login</h1>
        <p className="mt-1 text-sm text-gray-600">Login with your phone number and OTP.</p>

        <form className="mt-6 space-y-4" onSubmit={handleVerifyOtp}>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 10-digit number"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSendOtp}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
          >
            {otpSent ? "Resend OTP" : "Send OTP"}
          </button>

          <div>
            <label htmlFor="otp" className="mb-1 block text-sm font-medium text-gray-700">
              OTP
            </label>
            <input
              id="otp"
              name="otp"
              type="text"
              required
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-orange-500"
            />
          </div>

          {message ? <p className="text-sm text-gray-700">{message}</p> : null}

          <button
            type="submit"
            className="w-full rounded-lg bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
          >
            Verify OTP & Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
