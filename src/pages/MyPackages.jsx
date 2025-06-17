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

  // Fetch only the logged-in guide's packages
  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:5000/tourPackages?guideEmail=${user.email}`)
        .then((res) => setPackages(res.data))
        .catch(() => setPackages([]));
    }
  }, [user]);

  // Delete handler with SweetAlert confirmation
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
        setPackages(packages.filter((pkg) => pkg._id !== id));
        toast.success("Package deleted successfully!");
      } catch {
        toast.error("Failed to delete package.");
      }
    }
  };

  // Update handler (opens modal)
  const handleEdit = (pkg) => setSelected(pkg);

  // After update, refresh list
  const handleUpdateSuccess = (updatedPkg) => {
    setPackages(
      packages.map((pkg) => (pkg._id === updatedPkg._id ? updatedPkg : pkg))
    );
    setSelected(null);
    toast.success("Package updated successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-[#26b6bf] mb-6 text-center">
        My Tour Packages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No packages found.
          </div>
        )}
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
