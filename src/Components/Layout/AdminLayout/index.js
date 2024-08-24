import AdminNavbar from "../../Navbar/AdminNavbar";
import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
    </>
  );
};

export default AdminLayout;