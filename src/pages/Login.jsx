import Lottie from "lottie-react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import travelLoginAnimation from "../assets/LottieAnimations/travel-login.json";
import { AuthContext } from "../provider/AuthContext";

const Login = () => {
  const { login, googleLogin, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        setUser(result.user);
        toast.success("Login successful");
        navigate(from, { replace: true });
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      });
  };

  const handleGoogle = async () => {
    googleLogin()
      .then((result) => {
        setUser(result.user);
        toast.success("Google login successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Google login failed: ${error.message}`);
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
        {/* Login Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-teal-700 mb-4 text-center">
            Login to TourBuzz
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <div className="text-right mb-4">
              <Link
                to="/forgot-password"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-info w-full text-white font-bold"
            >
              Login
            </button>
          </form>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogle}
            className="btn btn-outline btn-success w-full"
            type="button"
          >
            Continue with Google
          </button>
          <p className="mt-4 text-center text-sm">
            New to TourBuzz?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
