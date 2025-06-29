import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import BookNowModal from "../components/BookNowModal";

const PackageDetails = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`https://wrath-ghureberai-server.vercel.app/tourPackages/${id}`)
      .then((res) => setPkg(res.data))
      .catch(() => setPkg(null));
  }, [id]);

  if (!pkg)
    return (
      <div className="text-center py-10 dark:text-emerald-200">Loading...</div>
    );

  return (
    <div className="max-w-lg mx-auto mt-14 mb-16 px-2 sm:px-0">
      {/* Minimal, elegant card */}
      <div className="bg-white dark:bg-emerald-950 rounded-xl shadow-lg border border-emerald-100 dark:border-emerald-800 overflow-hidden transition-colors duration-300">
        {/* Image */}
        <div>
          <img
            src={pkg.image}
            alt={pkg.tourName}
            className="w-full h-56 object-cover"
          />
        </div>
        {/* Details */}
        <div className="p-6">
          {/* Tour Name */}
          <h2 className="text-xl font-semibold mb-2 tracking-tight font-sans text-emerald-700 dark:text-emerald-200 text-left">
            {pkg.tourName}
          </h2>
          {/* Guide Info moved here */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={pkg.guidePhoto}
              alt={pkg.guideName}
              className="w-10 h-10 rounded-full border border-emerald-200 dark:border-emerald-700"
            />
            <div>
              <div className="font-medium text-emerald-800 dark:text-emerald-200">
                {pkg.guideName}
              </div>
              <div className="text-xs text-emerald-500 dark:text-emerald-300">
                {pkg.contactNo}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 text-xs font-semibold">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8c-1.657 0-3 1.343-3 3v1a3 3 0 006 0v-1c0-1.657-1.343-3-3-3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 21h14a2 2 0 002-2v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7a2 2 0 002 2z"
                />
              </svg>
              {pkg.duration}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e0f7fa] dark:bg-emerald-800 text-[#26b6bf] dark:text-emerald-300 text-xs font-bold">
              <svg
                className="w-4 h-4 text-[#26b6bf] dark:text-emerald-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3"
                />
                <circle cx="12" cy="12" r="10" />
              </svg>
              ${pkg.price}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-200 text-xs font-semibold">
              <svg
                className="w-4 h-4 text-emerald-400"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M9 20H4v-2a3 3 0 015.356-1.857M15 11a4 4 0 10-8 0 4 4 0 008 0z"
                />
              </svg>
              {pkg.booking_count ?? 0} Booked
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-200">
              Departure:
            </span>{" "}
            <span className="text-gray-700 dark:text-emerald-100">
              {pkg.departureLocation}
            </span>
            <span className="text-xs text-gray-500 dark:text-emerald-400 ml-2">
              {pkg.departureDate}
            </span>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-emerald-700 dark:text-emerald-200">
              Destination:
            </span>{" "}
            <span className="text-gray-700 dark:text-emerald-100">
              {pkg.destination}
            </span>
          </div>
          <div className="mb-4">
            <span className="font-semibold text-emerald-700 dark:text-emerald-200 block mb-1">
              Description
            </span>
            <p className="text-gray-700 dark:text-emerald-100 leading-relaxed text-base">
              {pkg.packageDetails}
            </p>
          </div>
          <button
            className="w-full mt-2 btn bg-gradient-to-r from-[#26b6bf] to-emerald-500 hover:from-emerald-500 hover:to-emerald-700 text-white font-semibold text-base rounded-full py-2 shadow transition-all duration-200 dark:bg-gradient-to-r dark:from-emerald-400 dark:to-emerald-700 dark:hover:from-emerald-300 dark:hover:to-emerald-800 dark:text-emerald-950"
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>
      </div>
      {showModal && (
        <BookNowModal
          pkg={pkg}
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            axios
              .get(
                `https://wrath-ghureberai-server.vercel.app/tourPackages/${id}`
              )
              .then((res) => setPkg(res.data));
          }}
        />
      )}
    </div>
  );
};

export default PackageDetails;
