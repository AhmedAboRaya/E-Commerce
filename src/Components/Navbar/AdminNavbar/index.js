import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/", { replace: true });
      window.history.pushState(null, null, "/");
      window.onpopstate = () => {
        navigate("/", { replace: true });
      };
    }, 1000);
  };
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <Navbar
          bg="light"
          expand="lg"
          className="border-2 border-[#e274a9] rounded-xl mb-4 mt-4 container px-3 fixed"
        >
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-2xl font-bold text-[#e274a9]"
          >
            Shop Now
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto space-x-4">
              <Link
                as={NavLink}
                to="/admin"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Products
              </Link>
              <NavLink
                as={NavLink}
                to="/admin/messages"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                User Messages
              </NavLink>
              <NavLink
                as={NavLink}
                to="/admin/addproduct"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Add Product
              </NavLink>
              <NavLink
                as={NavLink}
                to="/admin/addadmin"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Add Admin
              </NavLink>
              <NavLink
                as={NavLink}
                to="/admin/admins"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Accounts
              </NavLink>
              <NavLink
                as={NavLink}
                to="/"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
                onClick={handleLogout}
              >
                Log Out
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      )}
    </>
  );
};

export default NavbarComponent;
