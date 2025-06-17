import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const PackageCard = ({ pkg }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const onViewDetails = async (id) => {
    await fetch(`http://localhost:5000/tourPackages/${id}`);
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/package/${id}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-[#b2ebf2] flex flex-col">
      <img
        src={pkg.image}
        alt={pkg.tourName}
        className="h-48 w-full object-cover rounded-t-2xl"
      />
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-[#26b6bf] mb-2">
          {pkg.tourName}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <img
            src={pkg.guidePhoto}
            alt={pkg.guideName}
            className="w-8 h-8 rounded-full border border-[#b2ebf2]"
          />
          <span className="text-sm text-gray-700">{pkg.guideName}</span>
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Duration:</span> {pkg.duration}
        </div>
        <div className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Price:</span> ${pkg.price}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          <span className="font-semibold">Departure:</span> {pkg.departureDate}
        </div>
        <button
          onClick={() => onViewDetails(pkg._id)}
          className="mt-auto btn bg-[#26b6bf] hover:bg-[#388e3c] text-white font-semibold rounded-full transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
