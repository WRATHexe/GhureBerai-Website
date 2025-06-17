import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PackageCard from "./PackageCard";

const Featured = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/tourPackages")
      .then((res) => setPackages(res.data.slice(0, 6)))
      .catch(() => setPackages([]));
  }, []);

  return (
    <section className="py-14 bg-green-900 bg-opacity-90">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-100 mb-8 text-center merinda">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="px-8 py-3 rounded-full bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-green-900 font-bold text-lg shadow-lg transition-all duration-200 border-2 border-green-300 merinda"
            onClick={() => navigate("/packages")}
          >
            Show All
          </button>
        </div>
      </div>
    </section>
  );
};

export default Featured;
