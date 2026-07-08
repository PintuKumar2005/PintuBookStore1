import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Icon = ({ children, className = "h-5 w-5" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const UserIcon = () => (
  <Icon><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Icon>
);
const PackageIcon = () => (
  <Icon><path d="m21 8-9 5-9-5 9-5 9 5Z" /><path d="m3 8 9 5 9-5v8l-9 5-9-5V8Z" /><path d="M12 13v8" /></Icon>
);
const PinIcon = () => (
  <Icon><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></Icon>
);
const WalletIcon = () => (
  <Icon><path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h13" /><path d="M16 11h4v4h-4a2 2 0 0 1 0-4Z" /></Icon>
);
const MailIcon = () => (
  <Icon className="h-4 w-4"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></Icon>
);
const PhoneIcon = () => (
  <Icon className="h-4 w-4"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" /></Icon>
);
const CalendarIcon = () => (
  <Icon className="h-4 w-4"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></Icon>
);
const ArrowIcon = () => (
  <Icon className="h-4 w-4"><path d="M5 12h14M13 6l6 6-6 6" /></Icon>
);
const LogoutIcon = () => (
  <Icon className="h-4 w-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" /></Icon>
);
const EditIcon = () => (
  <Icon className="h-4 w-4"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z" /></Icon>
);
const CloseIcon = () => (
  <Icon><path d="m6 6 12 12M18 6 6 18" /></Icon>
);

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
  } catch {
    return fallback;
  }
};

const AccountPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [savedAddress, setSavedAddress] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState({ name: "", email: "", phone: "" });
  const [profileError, setProfileError] = useState("");
  const [accountMessage, setAccountMessage] = useState(() => {
    if (location.state?.openAddress) return "Please select an address for your order.";
    if (location.state?.orderPlaced) return "Your order was placed successfully.";
    if (location.state?.addressSaved) return "Your delivery address was saved successfully.";
    return "";
  });
  const addressSectionRef = useRef(null);

  const totalPayable = orders.reduce((sum, order) => {
    const value = Number(String(order.price || "").replace(/[^\d.]/g, ""));
    return sum + (Number.isNaN(value) ? 0 : value);
  }, 0);

  const initials = user?.name
    ? user.name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase()
    : "BS";

  useEffect(() => {
    const syncAccount = () => {
      const storedUser = readStorage("bookStoreUser", null);
      setSavedAddress(readStorage("bookStoreAddress", null));
      setUser(storedUser);
      setOrders(readStorage("bookStoreOrders", []));
      if (storedUser) {
        setProfileDraft({
          name: storedUser.name || "",
          email: storedUser.email || "",
          phone: storedUser.phone || "",
        });
      }
    };

    syncAccount();
    window.addEventListener("authChange", syncAccount);
    window.addEventListener("storage", syncAccount);
    return () => {
      window.removeEventListener("authChange", syncAccount);
      window.removeEventListener("storage", syncAccount);
    };
  }, []);

  useEffect(() => {
    if ((location.state?.openAddress || location.state?.orderPlaced) && addressSectionRef.current) {
      addressSectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [location.state]);

  const handleLogout = () => {
    localStorage.removeItem("bookStoreUser");
    setUser(null);
    window.dispatchEvent(new Event("authChange"));
    setAccountMessage("You have been logged out successfully.");
  };

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setProfileDraft((current) => ({ ...current, [name]: nextValue }));
    setProfileError("");
  };

  const handleProfileSave = (event) => {
    event.preventDefault();
    const name = profileDraft.name.trim();
    const email = profileDraft.email.trim();

    if (name.length < 2) {
      setProfileError("Please enter a name with at least 2 characters.");
      return;
    }
    if (profileDraft.phone && !/^\d{10}$/.test(profileDraft.phone)) {
      setProfileError("Phone number must contain exactly 10 digits.");
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setProfileError("Please enter a valid email address.");
      return;
    }

    const updatedUser = { ...user, name, email, phone: profileDraft.phone };
    localStorage.setItem("bookStoreUser", JSON.stringify(updatedUser));
    setUser(updatedUser);
    window.dispatchEvent(new Event("authChange"));
    setIsEditingProfile(false);
    setAccountMessage("Your profile was updated successfully.");
  };

  const openProfileEditor = () => {
    setProfileDraft({ name: user?.name || "", email: user?.email || "", phone: user?.phone || "" });
    setProfileError("");
    setIsEditingProfile(true);
  };

  return (
    <main className="min-h-screen bg-[#f7f6f2] px-4 py-8 text-slate-900 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-600">Your bookshelf</p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My account</h1>
            <p className="mt-2 text-sm text-slate-500">Manage your profile, deliveries, and recent orders.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
          >
            Continue shopping <ArrowIcon />
          </button>
        </div>

        {accountMessage ? (
          <div role="status" className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">✓</span>
            {accountMessage}
          </div>
        ) : null}

        <section className="mb-6 overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl shadow-slate-200/70">
          <div className="relative p-6 sm:p-8">
            <div className="absolute -right-14 -top-20 h-56 w-56 rounded-full bg-orange-500/20 blur-2xl" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-xl font-bold shadow-lg shadow-orange-950/30 sm:h-20 sm:w-20 sm:text-2xl">
                  {initials}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Welcome back</p>
                  <h2 className="mt-1 text-2xl font-bold">{user?.name || "Book lover"}</h2>
                  <p className="mt-1 text-sm text-slate-400">{user ? "Your next great read is waiting." : "Sign in to keep your account details together."}</p>
                </div>
              </div>
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/15"
                >
                  <LogoutIcon /> Log out
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => navigate("/login", { state: { from: "/account" } })}
                  className="w-fit rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold transition hover:bg-orange-400"
                >
                  Sign in
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: "Orders", value: user ? orders.length : "—", icon: <PackageIcon />, color: "bg-blue-50 text-blue-600" },
            { label: "Total spent", value: user ? `₹${totalPayable.toFixed(2)}` : "—", icon: <WalletIcon />, color: "bg-emerald-50 text-emerald-600" },
            { label: "Saved address", value: user ? (savedAddress ? "Ready" : "Not added") : "—", icon: <PinIcon />, color: "bg-orange-50 text-orange-600" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.color}`}>{item.icon}</span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="mt-1 text-lg font-bold text-slate-800">{item.value}</p>
              </div>
            </div>
          ))}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.5fr]">
          <div className="space-y-6">
            <section className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"><UserIcon /></span>
                <div>
                  <h2 className="font-bold">Personal details</h2>
                  <p className="text-xs text-slate-400">Your account information</p>
                </div>
                </div>
                {user ? (
                  <button type="button" onClick={openProfileEditor} aria-label="Edit personal details" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-orange-600">
                    <EditIcon />
                  </button>
                ) : null}
              </div>
              {user ? (
                <div className="space-y-3 text-sm">
                  {user.email ? <div className="flex items-center gap-3 text-slate-600"><MailIcon /><span className="break-all">{user.email}</span></div> : null}
                  {user.phone ? <div className="flex items-center gap-3 text-slate-600"><PhoneIcon /><span>{user.phone}</span></div> : null}
                  <div className="flex items-center gap-3 text-slate-600"><CalendarIcon /><span>Member since {user.joined || "recently"}</span></div>
                </div>
              ) : (
                <p className="text-sm leading-6 text-slate-500">Sign in to see your saved personal details here.</p>
              )}
            </section>

            <section ref={addressSectionRef} className="scroll-mt-6 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600"><PinIcon /></span>
                  <div>
                    <h2 className="font-bold">Delivery address</h2>
                    <p className="text-xs text-slate-400">Where your books arrive</p>
                  </div>
                </div>
              </div>
              {user && savedAddress ? (
                <address className="not-italic text-sm leading-6 text-slate-600">
                  <p className="font-bold text-slate-800">{savedAddress.fullName}</p>
                  <p>{savedAddress.street}</p>
                  <p>{savedAddress.city}, {savedAddress.state} {savedAddress.pinCode}</p>
                  <p className="mt-2 text-slate-500">{savedAddress.phone}</p>
                </address>
              ) : user ? (
                <p className="text-sm leading-6 text-slate-500">No delivery address yet. Add one now for a faster checkout.</p>
              ) : (
                <p className="text-sm leading-6 text-slate-500">Sign in to view and manage your delivery address.</p>
              )}
              <button
                type="button"
                onClick={() => user
                  ? navigate("/address", { state: { returnTo: "/account" } })
                  : navigate("/login", { state: { from: "/account" } })}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                {user ? (savedAddress ? "Edit address" : "Add address") : "Sign in"} <ArrowIcon />
              </button>
            </section>
          </div>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">Recent orders</h2>
                <p className="mt-1 text-sm text-slate-400">Track the books you have purchased.</p>
              </div>
              {user && orders.length > 0 ? <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{orders.length} total</span> : null}
            </div>

            {user && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order, index) => (
                  <article key={order.id ?? `${order.book}-${index}`} className="group flex flex-col gap-4 rounded-xl border border-slate-100 bg-slate-50/70 p-4 transition hover:border-orange-100 hover:bg-orange-50/40 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 items-center gap-4">
                      <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-white shadow-sm"><PackageIcon /></span>
                      <div className="min-w-0">
                        <h3 className="truncate font-bold text-slate-800">{order.book}</h3>
                        <p className="mt-1 text-xs text-slate-400">Order #{String(order.id ?? index + 1).slice(-6)}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <p className="font-bold text-slate-800">{order.price}</p>
                      <span className="rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-bold text-emerald-700">{order.status || "Placed"}</span>
                    </div>
                  </article>
                ))}
                <div className="mt-5 flex items-center justify-between border-t border-dashed border-slate-200 pt-5">
                  <p className="text-sm font-medium text-slate-500">Total order value</p>
                  <p className="text-xl font-bold text-slate-900">₹{totalPayable.toFixed(2)}</p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 text-center">
                <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-500 shadow-sm"><PackageIcon /></span>
                <h3 className="font-bold text-slate-800">{user ? "No orders yet" : "Sign in to see your orders"}</h3>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">{user ? "Your reading journey is waiting. Browse the store and find your next favorite book." : "Your purchases and order history will appear here after you sign in."}</p>
                <button type="button" onClick={() => user ? navigate("/") : navigate("/login", { state: { from: "/account" } })} className="mt-5 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500">{user ? "Explore books" : "Sign in"}</button>
              </div>
            )}
          </section>
        </div>
      </div>

      {isEditingProfile ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsEditingProfile(false);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="profile-dialog-title" className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="profile-dialog-title" className="text-xl font-bold text-slate-900">Edit personal details</h2>
                <p className="mt-1 text-sm text-slate-500">Keep your account information up to date.</p>
              </div>
              <button type="button" onClick={() => setIsEditingProfile(false)} aria-label="Close profile editor" className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"><CloseIcon /></button>
            </div>

            <form onSubmit={handleProfileSave} className="mt-6 space-y-4">
              <div>
                <label htmlFor="profile-name" className="mb-1.5 block text-sm font-semibold text-slate-700">Full name</label>
                <input id="profile-name" name="name" value={profileDraft.name} onChange={handleProfileChange} autoFocus required className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
              </div>
              <div>
                <label htmlFor="profile-phone" className="mb-1.5 block text-sm font-semibold text-slate-700">Phone number</label>
                <input id="profile-phone" name="phone" type="tel" inputMode="numeric" value={profileDraft.phone} onChange={handleProfileChange} placeholder="10-digit phone number" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
              </div>
              <div>
                <label htmlFor="profile-email" className="mb-1.5 block text-sm font-semibold text-slate-700">Email address <span className="font-normal text-slate-400">(optional)</span></label>
                <input id="profile-email" name="email" type="email" value={profileDraft.email} onChange={handleProfileChange} placeholder="you@example.com" className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100" />
              </div>
              {profileError ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{profileError}</p> : null}
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setIsEditingProfile(false)} className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-orange-600">Save changes</button>
              </div>
            </form>
          </section>
        </div>
      ) : null}
    </main>
  );
};

export default AccountPage;
