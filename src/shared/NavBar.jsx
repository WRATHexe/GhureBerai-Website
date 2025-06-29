import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { AuthContext } from "../provider/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Close dropdown/drawer on navigation
  const handleNav = (path) => {
    setDropdownOpen(false);
    setDrawerOpen(false);
    navigate(path);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl shadow-md border-b border-[#b2ebf2] dark:border-emerald-900 transition-all duration-300">
      <div className="max-w-5/6 mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
            alt="Logo"
            className="w-10 h-10 rounded-full shadow-lg border-2 border-[#26b6bf] bg-white object-cover"
          />
          <span className="text-2xl font-extrabold text-[#26b6bf] merinda tracking-tight drop-shadow">
            GhureBerai
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link
            to="/"
            className="font-semibold text-[#184a4e] dark:text-emerald-100 hover:text-[#26b6bf] dark:hover:text-[#b2ebf2] transition px-2 py-1 rounded"
          >
            Home
          </Link>
          <Link
            to="/packages"
            className="font-semibold text-[#184a4e] dark:text-emerald-100 hover:text-[#26b6bf] dark:hover:text-[#b2ebf2] transition px-2 py-1 rounded"
          >
            All Packages
          </Link>
          {user && (
            <Link
              to="/my-bookings"
              className="font-semibold text-[#184a4e] dark:text-emerald-100 hover:text-[#26b6bf] dark:hover:text-[#b2ebf2] transition px-2 py-1 rounded"
            >
              My Bookings
            </Link>
          )}
          <Link
            to="/about"
            className="font-semibold text-[#184a4e] dark:text-emerald-100 hover:text-[#26b6bf] dark:hover:text-[#b2ebf2] transition px-2 py-1 rounded"
          >
            About Us
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-7 h-7 text-[#26b6bf]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Right Side: Theme + Profile */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative">
                <img
                  src={
                    user?.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt="User"
                  className="w-10 h-10 rounded-full cursor-pointer object-cover"
                  onClick={() => setDropdownOpen((prev) => !prev)}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-base-100 dark:bg-emerald-950 rounded-xl shadow-lg border border-primary dark:border-emerald-700 z-50">
                    <div className="px-4 py-3 border-b border-primary dark:border-emerald-700">
                      <div className="font-bold text-primary dark:text-emerald-300">
                        {user.displayName}
                      </div>
                      <div className="text-xs text-secondary dark:text-emerald-400">
                        {user.email}
                      </div>
                    </div>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-primary hover:text-base-100 dark:hover:bg-emerald-700 dark:hover:text-white transition"
                      onClick={() => handleNav("/add-packages")}
                    >
                      Add Package
                    </button>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-primary hover:text-base-100 dark:hover:bg-emerald-700 dark:hover:text-white transition"
                      onClick={() => handleNav("/my-packages")}
                    >
                      Manage My Packages
                    </button>
                    <button
                      className="w-full text-left px-4 py-3 hover:bg-error hover:text-base-100 dark:hover:bg-red-700 dark:hover:text-white transition text-error"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm rounded-full shadow font-bold text-base-100"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[999] flex md:hidden">
          {/* Solid Overlay */}
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer - open from right */}
          <div className="relative ml-auto w-80 max-w-full h-full bg-white dark:bg-emerald-950 shadow-2xl flex flex-col animate-slideInRight rounded-tl-3xl rounded-bl-3xl">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-5 border-b border-emerald-100 dark:border-emerald-800 bg-white dark:bg-emerald-950 rounded-tl-3xl">
              <Link
                to="/"
                className="flex items-center gap-2"
                onClick={() => setDrawerOpen(false)}
              >
                <img
                  src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
                  alt="Logo"
                  className="w-10 h-10 rounded-full border-2 border-[#26b6bf] bg-white object-cover shadow"
                />
                <span className="text-xl font-extrabold text-[#26b6bf] merinda tracking-tight">
                  GhureBerai
                </span>
              </Link>
              <button
                className="p-2 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900 transition"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-6 h-6 text-[#26b6bf]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Nav Links */}
            <nav className="flex flex-col gap-2 px-6 py-6 bg-white dark:bg-emerald-950">
              <Link
                to="/"
                className="py-3 px-4 rounded-xl font-semibold text-[#184a4e] dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition text-base"
                onClick={() => setDrawerOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/packages"
                className="py-3 px-4 rounded-xl font-semibold text-[#184a4e] dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition text-base"
                onClick={() => setDrawerOpen(false)}
              >
                All Packages
              </Link>
              {user && (
                <Link
                  to="/my-bookings"
                  className="py-3 px-4 rounded-xl font-semibold text-[#184a4e] dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition text-base"
                  onClick={() => setDrawerOpen(false)}
                >
                  My Bookings
                </Link>
              )}
              <Link
                to="/about"
                className="py-3 px-4 rounded-xl font-semibold text-[#184a4e] dark:text-emerald-100 hover:bg-emerald-100 dark:hover:bg-emerald-900 transition text-base"
                onClick={() => setDrawerOpen(false)}
              >
                About Us
              </Link>
            </nav>
            {/* User & Theme */}
            <div className="mt-auto border-t border-emerald-100 dark:border-emerald-800 px-6 py-6 bg-white dark:bg-emerald-950 rounded-bl-3xl">
              <ThemeToggle />
              {user ? (
                <div className="flex flex-col gap-3 mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        user?.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt="User"
                      className="w-11 h-11 rounded-full border-2 border-primary object-cover shadow"
                    />
                    <div>
                      <div className="font-bold text-primary dark:text-emerald-300">
                        {user.displayName}
                      </div>
                      <div className="text-xs text-secondary dark:text-emerald-400">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <button
                    className="w-full text-left px-4 py-3 rounded-xl bg-emerald-100 dark:bg-emerald-900 hover:bg-primary hover:text-base-100 dark:hover:bg-emerald-700 dark:hover:text-white transition font-semibold"
                    onClick={() => handleNav("/add-packages")}
                  >
                    Add Package
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 rounded-xl bg-emerald-100 dark:bg-emerald-900 hover:bg-primary hover:text-base-100 dark:hover:bg-emerald-700 dark:hover:text-white transition font-semibold"
                    onClick={() => handleNav("/my-packages")}
                  >
                    Manage My Packages
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 rounded-xl bg-red-100 dark:bg-red-900 hover:bg-error hover:text-base-100 dark:hover:bg-red-700 dark:hover:text-white transition font-semibold text-error"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-6">
                  <Link
                    to="/login"
                    className="btn btn-primary w-full rounded-full shadow font-bold text-base-100"
                    onClick={() => setDrawerOpen(false)}
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Drawer animation */}
      <style>
        {`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .animate-slideInRight {
            animation: slideInRight 0.3s cubic-bezier(.4,0,.2,1) both;
          }
        `}
      </style>
    </nav>
  );
};

export default NavBar;
