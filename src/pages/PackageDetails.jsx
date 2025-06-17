import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import BookNowModal from "../components/BookNowModal";
import { AuthContext } from "../provider/AuthContext";

const PackageDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [pkg, setPkg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tourPackages/${id}`)
      .then((res) => setPkg(res.data))
      .catch(() => setPkg(null));
  }, [id]);

  if (!pkg) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 mt-10">
      <img
        src={pkg.image}
        alt={pkg.tourName}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h2 className="text-2xl font-bold text-[#26b6bf] mb-2">{pkg.tourName}</h2>
      <div className="flex items-center gap-3 mb-2">
        <img
          src={pkg.guidePhoto}
          alt={pkg.guideName}
          className="w-10 h-10 rounded-full border border-[#b2ebf2]"
        />
        <div>
          <div className="font-semibold">{pkg.guideName}</div>
          <div className="text-sm text-gray-600">{pkg.contactNo}</div>
        </div>
      </div>
      <div className="mb-2">
        <span className="font-semibold">Duration:</span> {pkg.duration}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Price:</span> ${pkg.price}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Booking Count:</span> {pkg.bookingCount}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Departure:</span>{" "}
        {pkg.departureLocation} on {pkg.departureDate}
      </div>
      <div className="mb-2">
        <span className="font-semibold">Destination:</span> {pkg.destination}
      </div>
      <div className="mb-4">
        <span className="font-semibold">Description:</span> {pkg.packageDetails}
      </div>
      <button
        className="btn bg-[#26b6bf] hover:bg-[#388e3c] text-white font-semibold rounded-full"
        onClick={() => setShowModal(true)}
      >
        Book Now
      </button>
      {showModal && (
        <BookNowModal
          pkg={pkg}
          user={user}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default PackageDetails;
