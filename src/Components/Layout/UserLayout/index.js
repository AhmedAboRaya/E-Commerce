import Navbar from "../../Navbar";
import { Outlet } from "react-router";

const UserLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayout;
