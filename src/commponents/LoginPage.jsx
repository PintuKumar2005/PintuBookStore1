import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [message, setMessage] = useState("");

  const sendOtp = () => {
    if (!/^\d{10}$/.test(phone)) { setMessage("Enter a valid 10-digit phone number."); return; }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code); setOtpSent(true); setMessage(`Demo OTP: ${code}`); setOtp("");
  };

  const verifyOtp = (event) => {
    event.preventDefault();
    if (!otpSent) { setMessage("Send an OTP first."); return; }
    if (otp !== generatedOtp) { setMessage("That OTP is incorrect. Please try again."); return; }
    const existing = (() => { try { return JSON.parse(localStorage.getItem("bookStoreUser")) || {}; } catch { return {}; } })();
    localStorage.setItem("bookStoreUser", JSON.stringify({ name: existing.name || "BookStore User", email: existing.email || "", phone, joined: existing.joined || new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric" }).format(new Date()) }));
    window.dispatchEvent(new Event("authChange"));
    sessionStorage.setItem("bookStoreStatusMessage", "Welcome back!");
    navigate(location.state?.from || "/", { state: location.state?.openAddress ? { openAddress: true } : undefined });
  };

  return <main className="min-h-screen bg-[#f7f6f2] px-4 py-12 sm:px-6"><div className="mx-auto grid max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60 md:grid-cols-[0.9fr_1.1fr]">
    <section className="hidden bg-slate-900 p-10 text-white md:flex md:flex-col md:justify-between"><Link to="/" className="text-xl font-black">Book<span className="text-orange-500">Store</span></Link><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-400">Welcome back</p><h1 className="mt-3 text-4xl font-black leading-tight">Your bookshelf remembers you.</h1><p className="mt-4 leading-7 text-slate-400">Sign in to check orders, manage your delivery address, and make checkout faster.</p></div><p className="text-xs text-slate-500">Secure demo sign-in with one-time password</p></section>
    <section className="p-6 sm:p-10"><Link to="/" className="text-sm font-bold text-slate-400 hover:text-orange-600">← Back to store</Link><h2 className="mt-8 text-3xl font-black text-slate-900">Sign in</h2><p className="mt-2 text-sm text-slate-500">We’ll send a six-digit demo code to your phone.</p>
      <form onSubmit={verifyOtp} className="mt-7 space-y-5"><div><label htmlFor="login-phone" className="mb-1.5 block text-sm font-bold text-slate-700">Phone number</label><div className="flex gap-2"><input id="login-phone" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" required placeholder="98765 43210" className="min-w-0 flex-1 rounded-xl border border-slate-200 px-3.5 py-3 outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/><button type="button" onClick={sendOtp} className="shrink-0 rounded-xl bg-slate-900 px-4 text-sm font-bold text-white hover:bg-slate-800">{otpSent ? "Resend" : "Send OTP"}</button></div></div>
        <div><label htmlFor="login-otp" className="mb-1.5 block text-sm font-bold text-slate-700">One-time password</label><input id="login-otp" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} inputMode="numeric" required disabled={!otpSent} placeholder="6-digit code" className="w-full rounded-xl border border-slate-200 px-3.5 py-3 tracking-[0.35em] outline-none disabled:bg-slate-50 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/></div>
        {message ? <p role="status" className={`rounded-xl px-3 py-2.5 text-sm font-semibold ${message.startsWith("Demo") ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-700"}`}>{message}</p> : null}<button type="submit" className="w-full rounded-full bg-orange-500 py-3.5 text-sm font-bold text-white hover:bg-orange-600">Verify and sign in</button></form>
    </section>
  </div></main>;
};

export default LoginPage;
