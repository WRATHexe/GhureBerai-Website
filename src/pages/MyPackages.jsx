import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import PackageCard from "../components/PackageCard";
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
            `http://localhost:5000/tourPackages?email=${user.email}`,
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
        await axios.delete(`http://localhost:5000/tourPackages/${id}`);
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
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-[#26b6bf] mb-6 text-center">
        My Tour Packages
      </h2>

      {loading ? (
        <div className="text-center text-gray-500">Loading packages...</div>
      ) : packages.length === 0 ? (
        <div className="text-center text-gray-500">No packages found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg._id} className="relative">
              <PackageCard pkg={pkg} onViewDetails={() => {}} />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  className="btn btn-xs bg-[#26b6bf] text-white"
                  onClick={() => handleEdit(pkg)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-xs bg-red-500 text-white"
                  onClick={() => handleDelete(pkg._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
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
  );
};

export default MyPackages;
