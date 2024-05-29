import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Root = () => {
  return (
    <div className="font-heading">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Root;
