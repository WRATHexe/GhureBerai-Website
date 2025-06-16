import Lottie from "lottie-react";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import travelLoginAnimation from "../assets/LottieAnimations/travel-login.json";
import { AuthContext } from "../provider/AuthContext";

const Register = () => {
  const { createUser, setUser, googleLogin, updateProfileInfo } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterHandler = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photo = form.photo.value;

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        updateProfileInfo(name, photo);
        toast.success("Registration successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message || "Registration failed.");
        console.error(error);
      });
  };

  const googleLoginHandler = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate("/");
        toast.success("Login successful");
      })
      .catch((error) => {
        toast.error("Google login failed.");
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-yellow-100">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row items-center p-8 gap-8 max-w-3xl w-full">
        {/* Lottie Animation */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Lottie
            animationData={travelLoginAnimation}
            loop={true}
            style={{ height: "260px", width: "260px" }}
          />
        </div>
        {/* Register Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
            Register for TourBuzz
          </h2>
          <form onSubmit={RegisterHandler} className="space-y-3">
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Photo URL
              </label>
              <input
                type="text"
                name="photo"
                placeholder="Photo URL"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-semibold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  required
                  className="input input-bordered w-full pr-10"
                />
                <span
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-teal-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={0}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Must be at least 6 characters, include upper & lower case.
              </p>
            </div>
            <button
              type="submit"
              className="btn btn-info w-full text-white font-bold"
            >
              Register
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={googleLoginHandler}
            className="btn btn-outline btn-success w-full flex items-center justify-center gap-2"
            type="button"
          >
            <FaGoogle /> Sign up with Google
          </button>
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
