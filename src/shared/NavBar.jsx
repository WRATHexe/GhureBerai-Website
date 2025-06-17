import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import ThemeToggle from "../components/ThemeToggle";
import { AuthContext } from "../provider/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
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

        {/* Main nav links */}
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

        {/* Right Side: Theme + Profile */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user && (
            <div className="relative ml-10">
              <button
                className=" flex items-center gap-2 rounded-full"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-label="Open user menu"
              >
                <img
                  src={
                    user.photoURL ||
                    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  }
                  alt={user.displayName || "User"}
                  className="w-10 h-10 rounded-full  object-cover "
                />
              </button>

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-emerald-950 rounded-2xl shadow-2xl py-2 z-50 transition-all duration-150 border border-[#b2ebf2] dark:border-emerald-900">
                  {/* Profile Info */}
                  <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100 dark:border-emerald-900">
                    <img
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                      alt={user.displayName || "User"}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-[#184a4e] dark:text-emerald-100 text-base">
                        {user.displayName}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-emerald-300">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  {/* Actions */}

                  <Link
                    to="/add-packages"
                    className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900 text-[#184a4e] dark:text-emerald-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Add Package
                  </Link>
                  <Link
                    to="/my-packages"
                    className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-emerald-900 text-[#184a4e] dark:text-emerald-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Manage My Packages
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setDropdownOpen(false);
                    }}
                    className="block px-4 py-3 hover:bg-red-50 dark:hover:bg-emerald-900 text-[#d32f2f] font-semibold w-full text-left transition rounded-b-2xl"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
