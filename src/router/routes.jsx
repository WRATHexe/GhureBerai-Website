import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AddPackages from "../pages/AddPackages";
import AllPackages from "../pages/AllPackages";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyBookings from "../pages/MyBookings";
import MyPackages from "../pages/MyPackages";
import PackageDetails from "../pages/PackageDetails";
import Register from "../pages/register";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/add-packages",
        element: (
          <PrivateRoute>
            <AddPackages />
          </PrivateRoute>
        ),
      },
      {
        path: "/packages",
        element: <AllPackages />,
      },
      {
        path: "/package/:id",
        element: (
          <PrivateRoute>
            <PackageDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-bookings",
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-packages",
        element: (
          <PrivateRoute>
            <MyPackages />
          </PrivateRoute>
        ),
      },
      {
        path:"/about",
        element:<About />
      }
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
