import axios from "axios";
import { useEffect, useState } from "react";
import PackageCard from "../components/PackageCard";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tourPackages?search=${search}`)
      .then((res) => setPackages(res.data))
      .catch(() => setPackages([]));
  }, [search]);

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#26b6bf] mb-6 text-center">
          All Tour Packages
        </h2>
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            placeholder="Search by tour name or destination..."
            className="input input-bordered w-full max-w-md bg-white border-[#b2ebf2] focus:border-[#26b6bf] transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.length === 0 && (
            <div className="col-span-full text-center text-gray-500">
              No packages found.
            </div>
          )}
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPackages;
