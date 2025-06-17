import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "../shared/Footer";
import NavBar from "../shared/NavBar";
const RootLayout = () => {
  return (
    <div className="mx-auto">
      <NavBar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
