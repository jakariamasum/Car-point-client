import { createBrowserRouter } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import SignUp from "../Authentication/SignUp/SignUp";
import LogIn from "../Authentication/LogIn/LogIn";
import UserProfile from "../Dashboards/UserDashboard/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Dashboard from "../Root/Dashboard/Dashboard";
import AllListings from "../Pages/AllListings/AllListings";
import SellYourCar from "../Dashboards/UserDashboard/SellYourCar/SellYourCar";
import MyListings from "../Dashboards/UserDashboard/MyListings/MyListings";
import SavedListings from "../Dashboards/UserDashboard/SavedListings/SavedListings";
import UpdateListing from "../Dashboards/UserDashboard/UpdateListing/UpdateListing";
import BidsForAListing from "../Dashboards/UserDashboard/BidsForAListing/BidsForAListing";
import ListingDetails from "../Pages/ListingDetails/ListingDetails";
import AdminRoute from "./AdminRoute/AdminRoute";
import Statistics from "../Dashboards/AdminDashboard/Statistics/Statistics";
import AllUsers from "../Dashboards/AdminDashboard/AllUsers/AllUsers";
import AdminAllProducts from "../Dashboards/AdminDashboard/AdminAllProducts/AdminAllProducts";
import AllBids from "../Dashboards/AdminDashboard/AllBids/AllBids";
import MyBiding from "../Dashboards/UserDashboard/MyBiding";
import Blogs from "../Pages/MyBlogs/MyBlogs";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/allListings",
        element: <AllListings />,
      },
      {
        path: "/all-blogs",
        element: <AllBlogs />,
      },
      {
        path: "/details/:id",
        element: (
          <PrivateRoute>
            <ListingDetails />
          </PrivateRoute>
        ),
      },
    ],
  },
  // sign up and login route
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "statistics",
        element: (
          <AdminRoute>
            <Statistics />
          </AdminRoute>
        ),
      },
      {
        path: "allUsers",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "adminAllProducts",
        element: (
          <AdminRoute>
            <AdminAllProducts />
          </AdminRoute>
        ),
      },
      {
        path: "adminAllBids",
        element: (
          <AdminRoute>
            <AllBids />
          </AdminRoute>
        ),
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "my-biding",
        element: <MyBiding />,
      },
      {
        path: "my-blogs",
        element: <Blogs />,
      },
      {
        path: "sellCar",
        element: <SellYourCar />,
      },
      {
        path: "myListings",
        element: <MyListings />,
      },
      {
        path: "savedListings",
        element: <SavedListings />,
      },
      {
        path: "updateListing/:id",
        element: <UpdateListing />,
      },
      {
        path: "bids/:id",
        element: <BidsForAListing />,
      },
    ],
  },
]);

export default router;
