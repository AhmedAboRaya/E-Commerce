import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import CartProduct from "./CartProduct";

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:8000/products")
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setIsLoading(false);
        });
    }, 1000);
  }, []);

  const getLoggedInUserEmail = () => {
    const userEmail = localStorage.getItem("email");
    if (userEmail) {
      return userEmail;
    } else {
      console.error("No user email found in localStorage.");
      return null;
    }
  };

  const handleAddToCart = async () => {
    try {
      const email = getLoggedInUserEmail();
      if (!email) {
        console.error("No user email available");
        return;
      }

      const userResponse = await fetch(
        `http://localhost:7000/users?email=${encodeURIComponent(email)}`
      );
      const users = await userResponse.json();
      const user = users[0];
      const cartItems = user.cart ? user.cart.split(",") : [];

      const productsInCart = products.filter((product) =>
        cartItems.includes(product.id)
      );
      console.log(productsInCart);
      
    } catch {
      console.error("Error adding item to cart");
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-28">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div>
          <h1
            onClick={handleAddToCart}
            className="text-[#e274a9] text-center mt-4 animate-fadeIn"
          >
            Shopping Cart
          </h1>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4"
          >
            {products.map((product) => (
              <CartProduct
                key={product.id}
                title={product.name}
                id={product.id}
                brand={product.brand}
                price={product.price}
                battery={product.specs.battery}
                camera={product.specs.camera}
                image={product.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
