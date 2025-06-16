import { Outlet } from "react-router";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div className="mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </div>
  );
};

export default RootLayout;
