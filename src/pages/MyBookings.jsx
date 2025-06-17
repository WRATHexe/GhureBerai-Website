import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../provider/AuthContext";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for the logged-in user
  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/bookings?userEmail=${user.email}`)
        .then((res) => setBookings(res.data))
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Confirm booking handler
  const handleConfirm = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:5000/bookings/${bookingId}`, {
        status: "completed",
      });
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "completed" } : b
        )
      );
      toast.success("Booking marked as completed!");
    } catch {
      toast.error("Failed to confirm booking.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 bg-fixed py-12 px-4">
      <div className="max-w-5xl mx-auto bg-green-950 bg-opacity-90 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-green-100 mb-8 text-center jungle-title">
          My Bookings
        </h2>
        {loading ? (
          <div className="text-center text-green-200 py-10">Loading...</div>
        ) : bookings.length === 0 ? (
          <div className="text-center text-green-200 py-10">
            No bookings found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-green-100 jungle-table">
              <thead>
                <tr className="bg-green-800 bg-opacity-80">
                  <th className="py-3 px-4 text-left">Tour Name</th>
                  <th className="py-3 px-4 text-left">Guide Name + Contact</th>
                  <th className="py-3 px-4 text-left">Departure Date</th>
                  <th className="py-3 px-4 text-left">Departure Location</th>
                  <th className="py-3 px-4 text-left">Destination</th>
                  <th className="py-3 px-4 text-left">Special Note</th>
                  <th className="py-3 px-4 text-center">Confirm</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className="border-b border-green-700 hover:bg-green-800/40 transition"
                  >
                    <td className="py-3 px-4">{b.tourName}</td>
                    <td className="py-3 px-4">
                      {b.guideName}
                      <br />
                      <span className="text-green-300 text-sm">
                        {b.guideContact}
                      </span>
                    </td>
                    <td className="py-3 px-4">{b.departureDate}</td>
                    <td className="py-3 px-4">{b.departureLocation}</td>
                    <td className="py-3 px-4">{b.destination}</td>
                    <td className="py-3 px-4">
                      {b.specialNote || (
                        <span className="text-green-400">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {b.status === "completed" ? (
                        <span className="px-4 py-1 rounded-full bg-green-700 text-green-100 font-semibold">
                          Completed
                        </span>
                      ) : (
                        <button
                          className="px-4 py-1 rounded-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-green-50 font-bold shadow jungle-btn transition-all duration-200 border-2 border-green-300"
                          onClick={() => handleConfirm(b._id)}
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
      {/* Jungle themed custom styles */}
      <style>{`
        .jungle-title {
          font-family: 'Merienda', cursive, 'Segoe UI', sans-serif;
          letter-spacing: 2px;
        }
        .jungle-table th, .jungle-table td {
          font-family: 'Segoe UI', 'Merienda', cursive, sans-serif;
        }
        .jungle-btn {
          font-family: 'Merienda', cursive, 'Segoe UI', sans-serif;
          letter-spacing: 1px;
        }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Merienda:wght@700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
};

export default MyBookings;
