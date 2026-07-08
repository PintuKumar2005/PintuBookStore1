import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const emptyAddress = { fullName: "", phone: "", street: "", city: "", state: "", pinCode: "" };
const fields = [{ name: "fullName", label: "Full name", placeholder: "Recipient name" }, { name: "phone", label: "Phone number", placeholder: "10-digit number", inputMode: "numeric" }, { name: "street", label: "Street address", placeholder: "House number, street, area", wide: true }, { name: "city", label: "City", placeholder: "City" }, { name: "state", label: "State", placeholder: "State" }, { name: "pinCode", label: "PIN code", placeholder: "6-digit PIN", inputMode: "numeric" }];

const AddressPage = () => {
  const navigate = useNavigate(); const location = useLocation();
  const [address, setAddress] = useState(() => { try { return JSON.parse(localStorage.getItem("bookStoreAddress") || "null") || emptyAddress; } catch { return emptyAddress; } });
  const [error, setError] = useState("");
  const returnTo = location.state?.returnTo || "/cart";
  const change = (event) => { const { name } = event.target; let { value } = event.target; if (name === "phone") value = value.replace(/\D/g, "").slice(0, 10); if (name === "pinCode") value = value.replace(/\D/g, "").slice(0, 6); setAddress((current) => ({ ...current, [name]: value })); setError(""); };
  const save = (event) => { event.preventDefault(); if (!/^\d{10}$/.test(address.phone)) { setError("Enter a valid 10-digit phone number."); return; } if (!/^\d{6}$/.test(address.pinCode)) { setError("Enter a valid 6-digit PIN code."); return; } localStorage.setItem("bookStoreAddress", JSON.stringify(Object.fromEntries(Object.entries(address).map(([key, value]) => [key, value.trim()])))); window.dispatchEvent(new Event("authChange")); navigate(returnTo, { state: returnTo === "/account" ? { addressSaved: true } : undefined }); };

  return <main className="min-h-screen bg-[#f7f6f2] px-4 py-10 sm:px-6"><div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/70 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-10"><button type="button" onClick={() => navigate(returnTo)} className="text-sm font-bold text-slate-400 hover:text-orange-600">← Cancel and go back</button><div className="mt-7"><p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Delivery details</p><h1 className="mt-2 text-3xl font-black text-slate-900">Where should we send your books?</h1><p className="mt-2 text-sm text-slate-500">Use an address where someone can receive your order.</p></div>
    <form onSubmit={save} className="mt-8 grid gap-5 sm:grid-cols-2">{fields.map((field) => <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}><label htmlFor={`address-${field.name}`} className="mb-1.5 block text-sm font-bold text-slate-700">{field.label}</label><input id={`address-${field.name}`} name={field.name} value={address[field.name]} onChange={change} inputMode={field.inputMode} required placeholder={field.placeholder} className="w-full rounded-xl border border-slate-200 px-3.5 py-3 text-sm outline-none focus:border-orange-400 focus:ring-4 focus:ring-orange-100"/></div>)}{error ? <p role="alert" className="rounded-xl bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700 sm:col-span-2">{error}</p> : null}<div className="flex flex-wrap gap-3 pt-2 sm:col-span-2"><button type="submit" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white hover:bg-orange-600">Save and continue</button><button type="button" onClick={() => navigate(returnTo)} className="rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50">Cancel</button></div></form>
  </div></main>;
};

export default AddressPage;
