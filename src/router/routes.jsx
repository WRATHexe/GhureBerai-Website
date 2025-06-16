import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Register from "../pages/register";
import Login from "../pages/Login";

export const router= createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <h1>Home Page</h1>,
            },
            {
                path:"/signup",
                element: <Register />,
            },
            {
                path: "/login",
                element: <Login />,
            },


        ]
    },
    {
        path: "*",
        element: <h1>404 Not Found</h1>,
    }
]);