import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
const RootLayout = () => {
  return (
    <div className="mx-auto max-w-[1920px] min-h-screen bg-base-100 text-base-content mb-0 pb-0">
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
