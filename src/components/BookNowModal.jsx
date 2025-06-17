import axios from "axios";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

const BookNowModal = ({ pkg, user, onClose }) => {
  const [loading, setLoading] = useState(false);
  const noteRef = useRef();

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    const booking = {
      tourPackageId: pkg._id,
      tourName: pkg.tourName,
      price: pkg.price,
      buyerName: user.displayName,
      buyerEmail: user.email,
      bookingDate: new Date(),
      specialNote: noteRef.current.value,
      status: "pending",
    };
    try {
      await axios.post("http://localhost:5000/bookings", booking);
      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
        text: "Your booking is pending approval.",
        timer: 1000,
        showConfirmButton: false,
      });
      setTimeout(onClose, 1000);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "Please try again.",
        timer: 1100,
        showConfirmButton: false,
      });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-[#26b6bf]">
          Book Tour Package
        </h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="font-semibold">Tour Package</label>
            <input
              className="input input-bordered w-full"
              value={pkg.tourName}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold">Price</label>
            <input
              className="input input-bordered w-full"
              value={pkg.price}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold">Your Name</label>
            <input
              className="input input-bordered w-full"
              value={user.displayName}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold">Your Email</label>
            <input
              className="input input-bordered w-full"
              value={user.email}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold">Booking Date</label>
            <input
              className="input input-bordered w-full"
              value={new Date().toLocaleDateString()}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold">Special Note</label>
            <textarea
              className="textarea textarea-bordered w-full"
              ref={noteRef}
              placeholder="Optional"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-[#26b6bf] text-white rounded-full flex-1"
              disabled={loading}
            >
              {loading ? "Booking..." : "Confirm"}
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

export default BookNowModal;
