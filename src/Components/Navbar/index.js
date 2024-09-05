import { NavLink, Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import { useState } from "react";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.removeItem("email");
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
            className="text-2xl font-bold text-[#e274a9] me-auto"
            style={{color: "#e274a9"}}
          >
            Shop Now
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto space-x-4">
              <Link
                as={NavLink}
                to="/user"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Home
              </Link>
              <NavLink
                as={NavLink}
                to="/user/products"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Products
              </NavLink>
              <NavLink
                as={NavLink}
                to="/user/contact"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Contact
              </NavLink>
              <NavLink
                as={NavLink}
                to="/user/purchases"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Purchases
              </NavLink>
              {/* <NavLink
                as={NavLink}
                to="/user/lab16"
                className="text-[#cb0c6b] font-semibold hover:text-[#39021d] duration-500 no-underline"
              >
                Lab16
              </NavLink> */}
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
