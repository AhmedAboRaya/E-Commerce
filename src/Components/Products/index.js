import Card from "./Card";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setIsLoading(false);
        }, 3000);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, []);

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
          <Spinner animation="border" style={{ color: "#e274a9" }}/>
        </div>
      ) : (
        <div>
          <h1 className="text-[#e274a9] text-center mt-4">Smart Phones</h1>
          <div className="flex flex-row flex-wrap justify-center">
            {mobileProducts.map((product) => (
              <Card
                key={product.id} // Add a key prop for each item in the list
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
              />
            ))}
          </div>
          <h1 className="text-[#e274a9] text-center mt-4">Laptops</h1>{" "}
          {/* Corrected spelling from 'Labtops' to 'Laptops' */}
          <div className="flex flex-row flex-wrap justify-center">
            {laptopProducts.map((product) => (
              <Card
                key={product.id} // Add a key prop for each item in the list
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Shop;
