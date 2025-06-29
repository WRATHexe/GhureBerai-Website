import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const POLL_INTERVAL = 500;
const POLL_TIMEOUT = 5000;

const BookNowModal = ({ pkg, onClose, onSuccess }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const noteRef = useRef();

  // Poll bookings to check for the new booking
  const pollForBooking = async (bookingIdToken, bookingObj) => {
    const start = Date.now();
    let found = false;

    while (!found && Date.now() - start < POLL_TIMEOUT) {
      try {
        const res = await axios.get(
          `https://wrath-ghureberai-server.vercel.app/bookings?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${bookingIdToken}`,
            },
          }
        );
        // Check if the booking with this tour_id exists
        const exists = res.data.some(
          (b) =>
            b.tour_id === bookingObj.tour_id &&
            b.buyerEmail === bookingObj.buyerEmail
        );
        if (exists) {
          found = true;
          onSuccess && onSuccess();
          break;
        }
      } catch {
        // ignore errors during polling
      }
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    const booking = {
      tour_id: pkg._id,
      tour_name: pkg.tourName,
      guide_name: pkg.guideName,
      guide_email: pkg.guideEmail,
      buyerEmail: user.email,
      buyer_name: user.displayName,
      booking_date: new Date(),
      departure_date: pkg.departureDate,
      departure_location: pkg.departureLocation,
      destination: pkg.destination,
      notes: noteRef.current.value || "",
      status: "pending",
    };

    try {
      const idToken = user && user.getIdToken ? await user.getIdToken() : null;

      await axios.post(
        "https://wrath-ghureberai-server.vercel.app/bookings",
        booking,
        idToken
          ? {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          : {}
      );

      toast.success("Booking successful!");
      await pollForBooking(idToken, booking);
      onClose && onClose();
    } catch {
      Swal.fire({
        icon: "error",
        title: "Booking Failed!",
        text: "Please try again.",
        timer: 1100,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-emerald-950 rounded-xl p-8 max-w-md w-full transition-colors duration-300">
        <h2 className="text-xl font-bold mb-4 text-[#26b6bf] dark:text-emerald-300">
          Book Tour Package
        </h2>
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="font-semibold dark:text-emerald-100">
              Tour Package
            </label>
            <input
              className="input input-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              value={pkg.tourName}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold dark:text-emerald-100">Price</label>
            <input
              className="input input-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              value={pkg.price}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold dark:text-emerald-100">
              Your Name
            </label>
            <input
              className="input input-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              value={user.displayName}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold dark:text-emerald-100">
              Your Email
            </label>
            <input
              className="input input-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              value={user.email}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold dark:text-emerald-100">
              Departure Date
            </label>
            <input
              className="input input-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              value={pkg.departureDate}
              disabled
            />
          </div>
          <div>
            <label className="font-semibold dark:text-emerald-100">
              Special Note
            </label>
            <textarea
              className="textarea textarea-bordered w-full dark:bg-emerald-900 dark:text-emerald-100"
              ref={noteRef}
              placeholder="Optional"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="btn bg-[#26b6bf] text-white rounded-full flex-1 dark:bg-emerald-400 dark:text-emerald-950"
              disabled={loading}
            >
              {loading ? "Booking..." : "Book Now"}
            </button>
            <button
              type="button"
              className="btn bg-gray-200 rounded-full flex-1 dark:bg-emerald-800 dark:text-emerald-100"
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
