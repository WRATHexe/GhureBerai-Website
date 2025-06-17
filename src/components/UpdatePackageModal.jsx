import axios from "axios";
import { useRef, useState } from "react";

const UpdatePackageModal = ({ pkg, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  // Use refs for form fields
  const nameRef = useRef();
  const imageRef = useRef();
  const durationRef = useRef();
  const priceRef = useRef();
  const departureDateRef = useRef();
  const departureLocationRef = useRef();
  const destinationRef = useRef();
  const detailsRef = useRef();
  const contactNoRef = useRef();

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updated = {
      tourName: nameRef.current.value,
      image: imageRef.current.value,
      duration: durationRef.current.value,
      price: priceRef.current.value,
      departureDate: departureDateRef.current.value,
      departureLocation: departureLocationRef.current.value,
      destination: destinationRef.current.value,
      packageDetails: detailsRef.current.value,
      contactNo: contactNoRef.current.value,
    };
    try {
      const res = await axios.put(
        `https://wrath-ghureberai-server.vercel.app/tourPackages/${pkg._id}`,
        updated
      );
      onSuccess(res.data);
    } catch {
      alert("Failed to update package.");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4 text-[#26b6bf]">
          Update Tour Package
        </h2>
        <form onSubmit={handleUpdate} className="space-y-3">
          <input
            ref={nameRef}
            defaultValue={pkg.tourName}
            className="input input-bordered w-full"
            placeholder="Tour Name"
            required
          />
          <input
            ref={imageRef}
            defaultValue={pkg.image}
            className="input input-bordered w-full"
            placeholder="Image URL"
            required
          />
          <input
            ref={durationRef}
            defaultValue={pkg.duration}
            className="input input-bordered w-full"
            placeholder="Duration"
            required
          />
          <input
            ref={priceRef}
            defaultValue={pkg.price}
            type="number"
            className="input input-bordered w-full"
            placeholder="Price"
            required
          />
          <input
            ref={departureDateRef}
            defaultValue={pkg.departureDate}
            type="date"
            className="input input-bordered w-full"
            required
          />
          <input
            ref={departureLocationRef}
            defaultValue={pkg.departureLocation}
            className="input input-bordered w-full"
            placeholder="Departure Location"
            required
          />
          <input
            ref={destinationRef}
            defaultValue={pkg.destination}
            className="input input-bordered w-full"
            placeholder="Destination"
            required
          />
          <textarea
            ref={detailsRef}
            defaultValue={pkg.packageDetails}
            className="textarea textarea-bordered w-full"
            placeholder="Package Details"
            rows={3}
            required
          />
          <input
            ref={contactNoRef}
            defaultValue={pkg.contactNo}
            className="input input-bordered w-full"
            placeholder="Contact No."
            required
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="btn bg-[#26b6bf] text-white rounded-full flex-1"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              className="btn bg-gray-200 rounded-full flex-1"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePackageModal;
