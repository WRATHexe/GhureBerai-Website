import axios from "axios";
import Lottie from "lottie-react";
import { useContext } from "react";
import { toast } from "react-toastify";
import travelAddAnimation from "../assets/LottieAnimations/travel-login.json";
import { AuthContext } from "../provider/AuthContext";

const AddPackages = () => {
  const { user } = useContext(AuthContext);

  const tourHandler = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const tourPackage = Object.fromEntries(formData.entries());

    tourPackage.guideName = user.displayName;
    tourPackage.guideEmail = user.email;
    tourPackage.guidePhoto = user.photoURL;
    tourPackage.bookingCount = 0;

    try {
      const idToken = await user.getIdToken(true); // Get fresh token
      const response = await axios.post(
        "https://wrath-ghureberai-server.vercel.app/tourPackages",
        tourPackage,
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      if (response.data) {
        toast.success("Tour package added successfully!");
        form.reset();
      } else {
        toast.error("Failed to add tour package.");
      }
    } catch (error) {
      console.error("Error adding tour package:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0f4f8] via-[#e0f7fa] to-[#fffaf3] dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] py-10 relative overflow-hidden transition-colors duration-300">
      {/* Decorative shapes */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-[#b2ebf2] dark:bg-emerald-900 rounded-full opacity-20 blur-2xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#b2ebf2] dark:bg-emerald-900 rounded-full opacity-20 blur-2xl -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-[#c8e6c9] dark:bg-emerald-800 rounded-full opacity-10 blur-2xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>

      <div className="bg-white/95 dark:bg-emerald-950/90 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col md:flex-row items-center p-0 md:p-0 gap-0 md:gap-0 max-w-5xl w-full border-2 border-[#b2ebf2] dark:border-emerald-800">
        {/* Illustration */}
        <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-gradient-to-b from-[#e0f7fa]/60 to-[#b2ebf2]/30 dark:from-emerald-900/40 dark:to-emerald-800/10 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none p-8">
          <Lottie
            animationData={travelAddAnimation}
            loop={true}
            style={{ height: "200px", width: "200px" }}
          />
          <h2 className="text-2xl font-bold text-[#26b6bf] dark:text-emerald-300 mt-4 mb-2 text-center">
            Plan & Share Your Next Trip!
          </h2>
          <p className="text-[#184a4e] dark:text-emerald-100 font-medium text-center">
            Make your adventure unforgettable.
          </p>
        </div>

        {/* Form */}
        <div className="w-full md:w-3/5 p-8">
          <h3 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#26b6bf] via-[#b2ebf2] to-[#26b6bf] dark:from-emerald-300 dark:via-emerald-400 dark:to-emerald-500 mb-6 text-center tracking-tight">
            Add Travel Package
          </h3>
          <form onSubmit={tourHandler} className="space-y-5">
            <div className="flex flex-col md:flex-row gap-3">
              <input
                name="tourName"
                placeholder="Tour Name"
                className="input input-bordered w-full md:w-1/2 bg-[#e0f7fa] dark:bg-emerald-900 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
                required
              />
              <input
                name="image"
                placeholder="Image URL"
                className="input input-bordered w-full md:w-1/2 bg-[#fffaf3] dark:bg-emerald-950 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#b2ebf2] dark:focus:border-emerald-400 transition shadow"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                name="duration"
                placeholder="Duration"
                className="input input-bordered w-full md:w-1/2 bg-[#c8e6c9] dark:bg-emerald-800 focus:bg-white dark:focus:bg-emerald-700 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Price"
                className="input input-bordered w-full md:w-1/2 bg-[#e0f7fa] dark:bg-emerald-900 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <input
                name="departureLocation"
                placeholder="Departure Location"
                className="input input-bordered w-full md:w-1/2 bg-[#fffaf3] dark:bg-emerald-950 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#b2ebf2] dark:focus:border-emerald-400 transition shadow"
                required
              />
              <input
                name="destination"
                placeholder="Destination"
                className="input input-bordered w-full md:w-1/2 bg-[#c8e6c9] dark:bg-emerald-800 focus:bg-white dark:focus:bg-emerald-700 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
                required
              />
            </div>

            <input
              name="departureDate"
              type="date"
              className="input input-bordered w-full bg-[#e0f7fa] dark:bg-emerald-900 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
              required
            />

            <textarea
              name="packageDetails"
              placeholder="Package Details"
              className="textarea textarea-bordered w-full bg-[#c8e6c9] dark:bg-emerald-800 focus:bg-white dark:focus:bg-emerald-700 focus:border-[#26b6bf] dark:focus:border-emerald-400 transition shadow"
              rows={3}
              required
            />

            <input
              name="contactNo"
              placeholder="Contact No."
              className="input input-bordered w-full bg-[#fffaf3] dark:bg-emerald-950 focus:bg-white dark:focus:bg-emerald-800 focus:border-[#b2ebf2] dark:focus:border-emerald-400 transition shadow"
              required
            />

            <button
              type="submit"
              className="btn w-full bg-[#26b6bf] hover:bg-[#388e3c] dark:bg-emerald-400 dark:hover:bg-emerald-500 text-white dark:text-emerald-950 font-bold border-none shadow-xl hover:scale-105 transition-all duration-200 py-3 text-lg rounded-full tracking-wide"
            >
              <span className="inline-block mr-2">🌤️</span>
              Add Tour Package
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPackages;
