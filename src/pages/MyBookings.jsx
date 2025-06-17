import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (user?.email && user?.getIdToken) {
        setLoading(true);
        try {
          const idToken = await user.getIdToken();
          const res = await axios.get(
            `http://localhost:5000/bookings?email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          setBookings(res.data);
        } catch {
          toast.error("Failed to load bookings.");
          setBookings([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBookings();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-[#26b6bf] mb-6 text-center">
        My Bookings
      </h2>
      {loading ? (
        <div className="text-center text-gray-400">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center text-gray-500">No bookings found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white dark:bg-emerald-950 rounded-xl shadow p-4"
            >
              <div className="font-semibold text-lg">
                {booking.tourName || booking.packageName}
              </div>
              <div className="text-sm text-gray-500 dark:text-emerald-200">
                Date:{" "}
                {booking.bookingDate
                  ? new Date(booking.bookingDate).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="text-sm">Status: {booking.status}</div>
              {booking.specialNote && (
                <div className="text-xs mt-2 italic text-gray-400">
                  Note: {booking.specialNote}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
