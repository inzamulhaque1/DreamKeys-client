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
import AllUsers from "../Pages/Dashboard/Admin/Allusers";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile";
import ManageProperties from "../Pages/Dashboard/Admin/ManageProperties";
import ManageReviews from "../Pages/Dashboard/Admin/ManageReviews";
import AgentProfile from "../Pages/Dashboard/Agent/AgentProfile";
import AddProperty from "../Pages/Dashboard/Agent/AddProperty";
import MyAddedProperties from "../Pages/Dashboard/Agent/MyAddedProperties";
import AllProperties from "../Pages/AllProperties";
import PropertyDetails from "../Pages/PropertyDetails";
import MakeOffer from "../Pages/Dashboard/User/MakeOffer";
import RequestedProperties from "../Pages/Dashboard/Agent/RequestedProperties";
import UpdateProperty from "../Pages/Dashboard/Agent/UpdateProperty";
import MySoldProperties from "../Pages/Dashboard/Agent/MySoldProperties";

import PrivateRoute from "./PrivateRoute";
import AdvertiseProperty from "../Pages/Dashboard/Admin/AdvertiseProperty";
import Payment from "../Pages/Payment/Payment";



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
        path: "all-properties",
        element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>,
      },
      {
        path: "property-details/:id",
        element: <PropertyDetails></PropertyDetails>,
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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

      // Admin
      {
        path: 'all-users',
        element:<AllUsers></AllUsers>
      },
      {
        path: 'admin-profile',
        element:<AdminProfile></AdminProfile>
      },
      {
        path: 'manage-properties',
        element: <ManageProperties></ManageProperties>
      },
      {
        path: 'manage-reviews',
        element:<ManageReviews></ManageReviews>
      },
      {
        path: 'advertise-property',
        element:<AdvertiseProperty></AdvertiseProperty>
      },
      // Agent
      {
        path: 'agent-profile',
        element: <AgentProfile></AgentProfile>
      },
      {
        path: 'add-property',
        element: <AddProperty></AddProperty>
      },
      {
        path: 'my-added-property',
        element: <MyAddedProperties></MyAddedProperties>
      },
      {
        path: 'update-property/:id',
        element: <UpdateProperty></UpdateProperty>
      },

      {
        path: 'requested-property',
        element: <RequestedProperties></RequestedProperties>
      },
      {
        path: 'my-sold-property',
        element: <MySoldProperties></MySoldProperties>
      },
      // User
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
      {
        path: `make-offer/:id`,
        element:<MakeOffer></MakeOffer>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      
    ]
  },
]);

export default router;
