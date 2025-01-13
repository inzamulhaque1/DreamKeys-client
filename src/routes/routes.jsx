import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/login-register/Login";
import SIgnUp from "../Pages/login-register/SIgnUp";

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
  // {
  //   path: "login",
  //   element: <Login></Login>,
  // },
]);

export default router;
