import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/login-register/Login";
import SIgnUp from "../Pages/login-register/SIgnUp";
import Dashboard from "../layouts/Dashboard";
import MyProfile from "../Pages/Dashboard/User/MyProfile";
import MyReviews from "../Pages/Dashboard/User/MyReviews";
import PropertyBought from "../Pages/Dashboard/User/PropertyBought";
import Wishlist from "../Pages/Dashboard/User/Wishlist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "sign-up",
        element: <SIgnUp></SIgnUp>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [

      // Users
      {
        path: 'my-profile',
        element:<MyProfile></MyProfile>
      },
      {
        path: 'my-reviews',
        element:<MyReviews></MyReviews>
      },
      {
        path: 'property-bought',
        element:<PropertyBought></PropertyBought>
      },
      {
        path: 'wishlist',
        element:<Wishlist></Wishlist>
      },
    ]
  },
]);

export default router;
