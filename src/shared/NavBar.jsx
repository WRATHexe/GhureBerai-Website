import { useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();
  const logoutHandler = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");

        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo & Site Name */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.postimg.cc/bvP5QYXf/eco-tourism-concept-with-travelers-23-2148617986.avif"
            alt="TourBuzz Logo"
            className="w-10 h-10 rounded-full border-2 border-teal-400 shadow"
          />
          <span className="font-extrabold text-2xl text-teal-700 tracking-wide font-sans">
            TourBuzz
          </span>
        </Link>
        {/* Nav Links */}
        <ul className="flex gap-4 items-center font-medium text-teal-700">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-500 transition"
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
                  ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-500 transition"
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
                  ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                  : "hover:text-blue-500 transition"
              }
            >
              About Us
            </NavLink>
          </li>
          {user && (
            <>
              <li>
                <NavLink
                  to="/my-bookings"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                      : "hover:text-blue-500 transition"
                  }
                >
                  My Bookings
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-package"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                      : "hover:text-blue-500 transition"
                  }
                >
                  Add Package
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/manage-packages"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-400 pb-1"
                      : "hover:text-blue-500 transition"
                  }
                >
                  Manage My Packages
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {/* Profile/Logout */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-teal-400"
              >
                {user ? (
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <FaUserCircle className="w-8 h-8 text-teal-600" />
                )}
              </label>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-52"
              >
                <li>
                  <span className="font-semibold text-teal-700">
                    {user.displayName || "User"}
                  </span>
                </li>
                <li>
                  <button onClick={logoutHandler} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-info btn-sm rounded-full shadow font-bold text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
