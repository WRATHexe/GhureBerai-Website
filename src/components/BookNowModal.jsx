import axios from "axios";
import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthContext";

const POLL_INTERVAL = 500;
const POLL_TIMEOUT = 5000; // 5 seconds for better reliability

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
        // Check if the booking with this packageId exists
        const exists = res.data.some(
          (b) =>
            b.packageId === bookingObj.packageId &&
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
    const formData = new FormData(e.target);
    const booking = {
      ...Object.fromEntries(formData.entries()),
      packageId: pkg._id,
      packageName: pkg.tourName,
      buyerEmail: user.email,
      buyerName: user.displayName,
      bookingDate: new Date(),
      status: "pending",
      specialNote: noteRef.current.value || "",
    };
    try {
      // Always get the latest Firebase ID token
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
      // Await polling for booking update before closing
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
