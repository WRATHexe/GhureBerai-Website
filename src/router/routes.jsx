import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import AddPackages from "../pages/AddPackages";
import Login from "../pages/Login";
import Register from "../pages/register";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage";
import AllPackages from "../pages/AllPackages";

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
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
