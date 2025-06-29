import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const onViewDetails = async (id) => {
    await fetch(
      `https://wrath-ghureberai-server.vercel.app/tourPackages/${id}`
    );
    navigate(user ? `/package/${id}` : "/login");
  };

  return (
    <div className="w-full max-w-xs min-h-[480px] flex flex-col rounded-3xl overflow-hidden shadow-lg border border-slate-100 dark:border-emerald-300/20 bg-white/90 dark:bg-emerald-100/10 hover:shadow-2xl transition-all duration-300 group">
      {/* Image Section */}
      <div className="relative h-56 w-full">
        <img
          src={pkg?.image}
          alt={pkg?.tourName || "Tour Destination"}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {/* Soft overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/5 to-transparent dark:from-emerald-900/60 dark:via-emerald-900/30" />

        {/* Duration badge */}
        <span className="absolute top-4 left-4 bg-emerald-500/90 text-white text-xs font-semibold px-4 py-1 rounded-full shadow border border-white dark:border-emerald-300/40 dark:bg-emerald-300/90 dark:text-emerald-900">
          {pkg?.duration}
        </span>

        {/* Price badge */}
        <span className="absolute bottom-4 right-4 bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-100 text-sm font-bold px-4 py-1 rounded-full shadow border border-white dark:border-emerald-300/30">
          ৳ {pkg?.price}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-6 gap-3 h-full bg-white/95 dark:bg-emerald-950/70">
        {/* Tour Name */}
        <h3
          className="flex items-center gap-2 text-lg md:text-xl font-bold mb-1
            text-emerald-800 dark:text-emerald-100
            tracking-wide uppercase drop-shadow-sm font-sans"
        >
          {pkg?.tourName}
        </h3>

        {/* Guide Info */}
        <div className="flex items-center gap-3">
          <img
            src={pkg?.guidePhoto}
            alt={pkg?.guideName || "Tour Guide"}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-400 dark:border-emerald-200 shadow"
          />
          <div>
            <p className="text-emerald-700 dark:text-emerald-100 font-semibold text-base">
              {pkg?.guideName}
            </p>
            <p className="text-xs text-gray-500 dark:text-emerald-200/80">
              Tour Guide
            </p>
          </div>
        </div>

        {/* Departure Date */}
        <div className="flex items-center gap-2 mt-1 text-sm text-gray-700 dark:text-emerald-100/90">
          <svg
            className="w-5 h-5 text-emerald-500 dark:text-emerald-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            Departure: {new Date(pkg?.departureDate).toLocaleDateString()}
          </span>
        </div>

        {/* View Button */}
        <div className="mt-auto">
          <button
            onClick={() => onViewDetails(pkg?._id)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-emerald-200 dark:text-emerald-900 dark:hover:bg-emerald-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
