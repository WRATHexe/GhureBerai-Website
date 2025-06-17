import axios from "axios";
import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://wrath-ghureberai-server.vercel.app/tourPackages?search=${search}`
      )
      .then((res) => setPackages(res.data))
      .catch(() => setPackages([]));
  }, [search]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] py-12 px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-8 text-center tracking-tight merinda">
          All Tour Packages
        </h2>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            placeholder="Search by tour name or destination..."
            className="w-full max-w-lg px-5 py-3 rounded-full bg-white/90 dark:bg-emerald-950/80 border-2 border-emerald-200 dark:border-emerald-800 focus:border-emerald-500 dark:focus:border-emerald-400 text-lg text-emerald-900 dark:text-emerald-100 shadow transition-all duration-200 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {packages.length === 0 && (
            <div className="col-span-full text-center text-emerald-400 dark:text-emerald-200 text-lg py-12">
              No packages found.
            </div>
          )}
          {packages.map((pkg) => (
            <div key={pkg._id} className="flex justify-center">
              <div className="w-full max-w-[410px]">
                <PackageCard pkg={pkg} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPackages;
