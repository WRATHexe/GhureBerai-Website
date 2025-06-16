import Lottie from "lottie-react";
import { Link } from "react-router";
import travelErrorAnimation from "../assets/LottieAnimations/travel-error.json";
import { FaHome } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-yellow-100">
      <div className="w-72 mb-6">
        <Lottie animationData={travelErrorAnimation} loop={true} />
      </div>
      <h1 className="text-4xl font-bold text-teal-700 mb-2 text-center">
        Oops! You seem lost in the oceans of travel.
      </h1>
      <p className="text-lg text-gray-600 mb-6 text-center">
        The page you’re looking for doesn’t exist or has sailed away.
      </p>
      <Link
        to="/"
        className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold px-6 py-3 rounded-full shadow-lg transition"
      >
        <FaHome /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
