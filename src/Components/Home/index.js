import { NavLink, useNavigate } from "react-router-dom";
import homeImage from "../../Assets/Images/home.png";
import Button from "../Products/Card/Button";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import '../../App.css'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    navigate("/user/products");
  };

  return (
    <div className="relative">
      {isLoading ? (
        <div className="d-flex justify-content-center mt-28 animate-pulse">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap px-10 py-10 items-center justify-center">
          <div className="md:w-[50%] animate-fadeIn">
            <img
              src={homeImage}
              alt="Home"
              className="transition-transform transform"
            />
          </div>
          <div className="flex items-center flex-col justify-center text-center animate-slideIn">
            <h1 className="font-sans text-[#e274a9] text-4xl font-bold mb-4 transition-transform transform hover:scale-105">
              Easy Shopping
            </h1>
            <p className="font-sans text-[#2f2e43] text-lg font-semibold mb-4 transition-opacity duration-500">
              Welcome to our online store! Shop your favorite items here.
            </p>
            <NavLink to="/user/products">
              <Button
                txt={"Shop Now"}
                style={
                  "bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md transition-transform duration-300 transform hover:scale-105 px-4 py-2 font-semibold"
                }
                onClick={handleClick}
              />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
