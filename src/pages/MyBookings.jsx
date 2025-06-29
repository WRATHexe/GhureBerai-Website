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
            `https://wrath-ghureberai-server.vercel.app/bookings?email=${user.email}`,
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

  const handleConfirm = async (id) => {
    try {
      const idToken = await user.getIdToken();
      const res = await axios.patch(
        `https://wrath-ghureberai-server.vercel.app/bookings/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );
      if (res.data.modifiedCount > 0 || res.data.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === id ? { ...b, status: "completed" } : b))
        );
        toast.success("Booking marked as completed!");
      } else {
        toast.error("Failed to update booking status.");
      }
    } catch {
      toast.error("Failed to update booking status.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] py-12 px-2 sm:px-4 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-8 text-center tracking-tight merinda">
          My Bookings
        </h2>
        {loading ? (
          <div className="text-center text-emerald-400 dark:text-emerald-200">
            Loading...
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-emerald-400 dark:text-emerald-200">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl shadow bg-white dark:bg-emerald-950/80 border border-emerald-100 dark:border-emerald-800">
            <table className="min-w-full divide-y divide-emerald-100 dark:divide-emerald-800">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Tour Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Guide Name + Contact
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Departure Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Departure Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Special Note
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Status / Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition"
                  >
                    <td className="px-4 py-3 font-semibold whitespace-nowrap">
                      {booking.tour_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-medium">{booking.guide_name}</div>
                      <div className="text-xs text-emerald-500 dark:text-emerald-300">
                        {booking.guide_email}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.departure_date
                        ? new Date(booking.departure_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.departure_location || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {booking.destination || "-"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs text-emerald-400 dark:text-emerald-300">
                      {booking.notes || "-"}
                    </td>
                    <td className="px-4 py-3 text-center whitespace-nowrap">
                      {booking.status === "completed" ? (
                        <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 font-semibold text-xs">
                          Completed
                        </span>
                      ) : (
                        <button
                          className="btn btn-xs rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow transition"
                          onClick={() => handleConfirm(booking._id)}
                        >
                          Confirm
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
