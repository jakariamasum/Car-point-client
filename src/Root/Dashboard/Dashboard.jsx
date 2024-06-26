import { FaBars } from "react-icons/fa";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuthContext from "../../Hooks/useAuthContext/useAuthContext";
import { MdHome } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import useIsAdmin from "../../Hooks/useIsAdmin/useIsAdmin";
import { useEffect } from "react";
import useCurrentUser from "../../Hooks/useCurrentUser/useCurrentUser";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";

const Dashboard = () => {
  // hooks and custom hooks
  const { signOutUser, authLoading } = useAuthContext();
  const { isAdminPending, isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const { dbCurrentUserPending, dbCurrentUser } = useCurrentUser();
  const location = useLocation();

  // redirect the user to different route as per user type
  useEffect(() => {
    if (
      !dbCurrentUserPending &&
      dbCurrentUser.userType === "admin" &&
      location.pathname.slice(0, 11) !== "/dashboard/"
    ) {
      navigate("/dashboard/statistics");
    }
    if (
      !dbCurrentUserPending &&
      !isAdminPending &&
      !authLoading &&
      dbCurrentUser.userType !== "admin" &&
      location.pathname.slice(0, 11) !== "/dashboard/"
    ) {
      navigate("/dashboard/profile");
    }
  }, [
    dbCurrentUserPending,
    isAdminPending,
    navigate,
    authLoading,
    dbCurrentUser,
    location,
  ]);

  // website navigation links
  const navbarLinks = (
    <>
      <Link to="/" className="link-style flex justify-start items-center gap-2">
        <MdHome className="text-xl" /> Home
      </Link>
      <button
        onClick={() => signOutUser()}
        className="link-style flex justify-start items-start gap-2"
      >
        <BiLogOut className="text-xl" /> Log out
      </button>
    </>
  );

  // admin dashboard links
  const adminLinks = (
    <>
      {/* statistics */}
      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        Statiscs
      </NavLink>

      {/* all users */}
      <NavLink
        to="/dashboard/allUsers"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        All Users
      </NavLink>

      {/* all products */}
      <NavLink
        to="/dashboard/adminAllProducts"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        All Products
      </NavLink>
      {/* all bids */}
      <NavLink
        to="/dashboard/adminAllBids"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        All Bids
      </NavLink>
    </>
  );

  // user dashboard links
  const userLinks = (
    <>
      {/* user profile */}
      <NavLink
        to="/dashboard/profile"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        Profile
      </NavLink>

      {/* sell post */}
      <NavLink
        to="/dashboard/sellCar"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        Sell Your Car
      </NavLink>

      {/* my ads */}
      <NavLink
        to="/dashboard/myListings"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        My Listings
      </NavLink>

      {/* saved listings */}
      <NavLink
        to="/dashboard/savedListings"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        Saved Listings
      </NavLink>
      <NavLink
        to="/dashboard/my-biding"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        My Biding
      </NavLink>
      <NavLink
        to="/dashboard/my-blogs"
        className={({ isActive }) => {
          return isActive ? "active-link-style" : "link-style";
        }}
      >
        All Blogs
      </NavLink>
    </>
  );

  if (dbCurrentUserPending || authLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="font-heading">
      <div className="drawer lg:drawer-open ">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center p-5">
          {/* Page content here */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="drawer-button glass-background p-3 rounded-full text-white text-xl lg:hidden absolute top-4 left-5"
          >
            <FaBars />
          </label>
        </div>

        {/* drawer sidebar */}
        <div className="drawer-side h-full lg:min-h-[100vh]">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          {/* left side */}
          <div className="menu p-4 w-[250px] h-full lg:min-h-full bg-main text-white font-medium flex flex-grow flex-col justify-start items-start gap-5">
            {/* Sidebar links here */}
            <div className="w-full  flex flex-grow  flex-col content-between justify-between">
              {/* admin - user links */}
              <div className="w-full flex flex-col justify-start items-start gap-2">
                <div className="flex justify-center items-center mb-5 gap-4">
                  <div>
                    <img
                      src={dbCurrentUser?.photo}
                      alt=""
                      className="w-[40px] h-[40px] rounded-[50%]"
                    />
                  </div>
                  <div>
                    <p>{dbCurrentUser?.name}</p>
                    <p className="text-gray capitalize">
                      {dbCurrentUser?.userType}
                    </p>
                  </div>
                </div>

                {isAdmin ? adminLinks : userLinks}
              </div>

              {/* navbarLinks links */}
              <div className="w-full flex flex-col justify-start items-start gap-2">
                {navbarLinks}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
