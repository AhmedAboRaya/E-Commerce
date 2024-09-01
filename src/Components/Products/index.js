import Card from "./Card";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MyDialog from "../Modal";
import { useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { ShoppingCart } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setIsLoading(false);
        }, 500);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = (product) => {
    setIsOpen(true);
    setSelectedProduct(product);
  };

  const getLoggedInUserEmail = () => {
    const userEmail = localStorage.getItem("email");
    
    if (userEmail) {
      return userEmail;
    } else {
      console.error("No user email found in localStorage.");
      return null;
    }
  };

  const handleAddToCart = async (id) => {
    try {
      const email = getLoggedInUserEmail();
      if (!email) {
        console.error("No user email available");
        return;
      }

      const userResponse = await fetch(`http://localhost:7000/users?email=${encodeURIComponent(email)}`);
      const users = await userResponse.json();

      if (users.length > 0) {
        const user = users[0]; 
        const cartItems = user.cart ? user.cart.split(",") : [];

        if (cartItems.includes(id)) {
          toast.error("Product already in cart", { duration: 1600 });
          return;
        }

        const updatedCart = user.cart ? `${user.cart},${id}` : id;

        await fetch(`http://localhost:7000/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cart: updatedCart }),
        });
        toast.success("Product added to cart successfully", { duration: 1600 });
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const handleClickCart = () => {
    navigate(`/user/cart`);
  };

  const handleBuyNow = (id) => {
    console.log("Redirecting to checkout");
    console.log(id); 
    // navigate(`/user/checkout/${id}`);
  };

  const mobileProducts = products.filter(
    (product) => product.category === "Mobile"
  );
  const laptopProducts = products.filter(
    (product) => product.category === "Laptop"
  );

  return (
    <>
      <Toaster />
      {isLoading ? (
        <div className="d-flex justify-content-center mt-28">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div>
          <ShoppingCart onClick={handleClickCart} className="text-pink-500 size-16 absolute mt-2 left-[-8px] border-pink-500 border-1 p-2 rounded-r-full hover:left-0 hover:text-white hover:bg-pink-500 duration-300 "/>
          <h1 className="text-[#e274a9] text-center mt-4 animate-fadeIn">Smart Phones</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
            {mobileProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
                onClick={() => openModal(product)}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
              />
            ))}
          </div>
          <h1 className="text-[#e274a9] text-center mt-4 animate-fadeIn">Laptops</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-4">
            {laptopProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
                onClick={() => openModal(product)}
                handleAddToCart={handleAddToCart}
                handleBuyNow={handleBuyNow}
              />
            ))}
          </div>
        </div>
      )}
      <MyDialog closeModal={closeModal} openModal={openModal} isOpen={isOpen} selectedProduct={selectedProduct} handleAddToCart={handleAddToCart} handleBuyNow={handleBuyNow} />
    </>
  );
};

export default Shop;
