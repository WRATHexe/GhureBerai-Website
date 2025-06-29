import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import UpdatePackageModal from "../components/UpdatePackageModal";
import { AuthContext } from "../provider/AuthContext";

const MyPackages = () => {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      if (user?.email && user?.getIdToken) {
        try {
          const idToken = await user.getIdToken(true); // get fresh token
          const response = await axios.get(
            `https://wrath-ghureberai-server.vercel.app/my-tourPackages?email=${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${idToken}`,
              },
            }
          );
          setPackages(response.data);
        } catch (error) {
          console.error("Error fetching packages:", error);
          toast.error("Failed to fetch your tour packages.");
          setPackages([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPackages();
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This package will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#26b6bf",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const idToken = await user.getIdToken(true);
        await axios.delete(
          `https://wrath-ghureberai-server.vercel.app/tourPackages/${id}`,
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
        setPackages((prev) => prev.filter((pkg) => pkg._id !== id));
        toast.success("Package deleted successfully!");
      } catch (error) {
        console.error("Error deleting package:", error);
        toast.error("Failed to delete package.");
      }
    }
  };

  const handleEdit = (pkg) => setSelected(pkg);

  const handleUpdateSuccess = (updatedPkg) => {
    setPackages((prev) =>
      prev.map((pkg) => (pkg._id === updatedPkg._id ? updatedPkg : pkg))
    );
    setSelected(null);
    toast.success("Package updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-emerald-200 dark:from-[#152422] dark:via-[#1b2c28] dark:to-[#184a4e] py-12 px-2 sm:px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-emerald-900 dark:text-emerald-200 mb-8 text-center tracking-tight merinda">
          My Tour Packages
        </h2>

        {loading ? (
          <div className="text-center text-emerald-400 dark:text-emerald-200">
            Loading packages...
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
                    Destination
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Departure
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-emerald-700 dark:text-emerald-200 uppercase whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {packages.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-8 text-emerald-400 dark:text-emerald-200"
                    >
                      No packages found.
                    </td>
                  </tr>
                ) : (
                  packages.map((pkg) => (
                    <tr
                      key={pkg._id}
                      className="hover:bg-emerald-50 dark:hover:bg-emerald-900/40 transition"
                    >
                      <td className="px-4 py-3 font-semibold whitespace-nowrap">
                        {pkg.tourName}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {pkg.destination}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        ৳ {pkg.price}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {new Date(pkg.departureDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 flex flex-wrap justify-center gap-2">
                        <button
                          className="btn btn-xs rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold shadow transition"
                          onClick={() => handleEdit(pkg)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-xs rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold shadow transition"
                          onClick={() => handleDelete(pkg._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <UpdatePackageModal
            pkg={selected}
            onClose={() => setSelected(null)}
            onSuccess={handleUpdateSuccess}
          />
        )}
      </div>
    </div>
  );
};

export default MyPackages;
