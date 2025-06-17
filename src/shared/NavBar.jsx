import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import ThemeToggle from "../components/ThemeToggle"; // <-- import here
import { AuthContext } from "../provider/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
        setDropdownOpen(false);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo & Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
            alt="TourBuzz Logo"
            className="w-10 h-10 rounded-full border-2 border-primary shadow"
          />
          <span className="font-extrabold text-2xl text-primary tracking-wide font-sans">
            TourBuzz
          </span>
        </Link>
        {/* Nav Links */}
        <ul className="flex gap-4 items-center font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-base-100 px-3 py-1 rounded-lg shadow"
                  : "hover:text-primary transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/packages"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-base-100 px-3 py-1 rounded-lg shadow"
                  : "hover:text-primary transition"
              }
            >
              All Packages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "bg-primary text-base-100 px-3 py-1 rounded-lg shadow"
                  : "hover:text-primary transition"
              }
            >
              About Us
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink
                to="/my-bookings"
                className={({ isActive }) =>
                  isActive
                    ? "bg-primary text-base-100 px-3 py-1 rounded-lg shadow"
                    : "hover:text-primary transition"
                }
              >
                My Bookings
              </NavLink>
            </li>
          )}
        </ul>
        {/* Profile/Logout & Theme Toggle */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                }
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-primary cursor-pointer object-cover"
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-base-100 rounded-xl shadow-lg border border-primary z-50">
                  <div className="px-4 py-3 border-b border-primary">
                    <div className="font-bold text-primary">
                      {user.displayName}
                    </div>
                    <div className="text-xs text-secondary">{user.email}</div>
                  </div>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-primary hover:text-base-100 transition"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/add-package");
                    }}
                  >
                    Add Package
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-primary hover:text-base-100 transition"
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/my-packages");
                    }}
                  >
                    Manage My Packages
                  </button>
                  <button
                    className="w-full text-left px-4 py-3 hover:bg-error hover:text-base-100 transition text-error"
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
          {/* Theme Toggle Button */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
