import Card from "./Card";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import MyDialog from "../Modal";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);

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

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(product) {
    setIsOpen(true);
    setSelectedProduct(product);
  }

  const mobileProducts = products.filter(
    (product) => product.category === "Mobile"
  );
  const laptopProducts = products.filter(
    (product) => product.category === "Laptop"
  );

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-28">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div>
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
                className="transition-transform transform hover:scale-105 animate-fadeIn"
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
                className="transition-transform transform hover:scale-105 animate-fadeIn"
              />
            ))}
          </div>
        </div>
      )}
      <MyDialog closeModal={closeModal} openModal={openModal} isOpen={isOpen} selectedProduct={selectedProduct} />
    </>
  );
};

export default Shop;
