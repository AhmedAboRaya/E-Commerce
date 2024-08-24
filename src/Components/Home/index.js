import { NavLink } from "react-router-dom";
import homeImage from "../../Assets/Images/home.png";
import Button from "../Products/Card/Button";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center  mt-28">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div className="flex flex-row flex-wrap px-10 py-10 items-center justify-center">
          <div className="md:w-[50%]">
            <img src={homeImage} alt="Home" />
          </div>
          <div className="flex items-center flex-col justify-center text-center">
            <h1 className="font-sans text-[#e274a9]">Easy Shopping</h1>
            <p className="font-sans text-[#2f2e43] text-lg font-semibold">
              Welcome to our online store! Shop your favorite items here.
            </p>
            <NavLink to="/user/products">
              <Button
                txt={"Shop Now"}
                style={
                  "bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold px-2 py-1"
                }
              />
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
