import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PackageCard from "./PackageCard";

const Featured = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://wrath-ghureberai-server.vercel.app/tourPackages")
      .then((res) => setPackages(res.data.slice(0, 6)))
      .catch(() => setPackages([]));
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] transition-colors duration-300">
      <div className="max-w-5/6 mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-10 text-center merinda tracking-wide">
          Featured Packages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10 justify-items-center">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            className="px-10 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-lg shadow-xl transition-all duration-200 border-2 border-emerald-300 dark:border-emerald-700 merinda dark:bg-gradient-to-r dark:from-emerald-700 dark:to-emerald-900 dark:hover:from-emerald-600 dark:hover:to-emerald-800"
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
