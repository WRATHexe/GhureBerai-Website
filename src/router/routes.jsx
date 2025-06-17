import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AddPackages from "../pages/AddPackages";
import AllPackages from "../pages/AllPackages";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import MyBookings from "../pages/MyBookings";
import MyPackages from "../pages/MyPackages";
import PackageDetails from "../pages/packageDetails";
import Register from "../pages/register";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home Page</h1>,
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
        path: "/add-package",
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
        path: "/manage-packages",
        element: (
          <PrivateRoute>
            <MyPackages />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
