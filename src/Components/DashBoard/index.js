import Card from "./Card";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DeleteModal from "./Modal/Confirmation";
import EditModal from "./Modal/EditDialog";
import toast, { Toaster } from "react-hot-toast";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();
  const [reload, setReload] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

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
  }, [reload]);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(product) {
    setIsOpen(true);
    setSelectedProduct(product);
  }

  function openEditModal(product) {
    setEditModalOpen(true);
    setSelectedProduct(product);
  }

  function closeEditModal() {
    setEditModalOpen(false);
  }

  const handleDeleteProduct = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setProducts(products.filter((product) => product.id !== id));
        closeModal();
        toast.success("Deleted", { duration: 2000 });
      })
      .catch((error) => console.error("Error deleting product:", error));
  };

  const mobileProducts = products.filter(
    (product) => product.category === "Mobile"
  );
  const laptopProducts = products.filter(
    (product) => product.category === "Laptop"
  );

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center mt-28 animate-fadeIn">
          <Spinner animation="border" style={{ color: "#e274a9" }} />
        </div>
      ) : (
        <div>
          <div>
            <Toaster />
          </div>
          <h1 className="text-[#e274a9] text-center mt-4 animate-fadeIn">
            Smart Phones
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 animate-fadeIn">
            {mobileProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
                category={product.category}
                specs={product.specs}
                confirmation={() => openModal(product)}
                editDialog={() => openEditModal(product)}
                className="transition-transform transform hover:scale-105"
              />
            ))}
          </div>
          <h1 className="text-[#e274a9] text-center mt-4 animate-fadeIn">
            Laptops
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 animate-fadeIn">
            {laptopProducts.map((product) => (
              <Card
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                brand={product.brand}
                image={product.image}
                category={product.category}
                specs={product.specs}
                confirmation={() => openModal(product)}
                editDialog={() => openEditModal(product)}
                className="transition-transform transform hover:scale-105"
              />
            ))}
          </div>
        </div>
      )}
      <DeleteModal
        closeModal={closeModal}
        isOpen={isOpen}
        selectedProduct={selectedProduct}
        deleteProduct={handleDeleteProduct}
        className="animate-fadeIn"
      />
      <EditModal
        closeModal={closeEditModal}
        isOpen={editModalOpen}
        selectedProduct={selectedProduct}
        deleteProduct={handleDeleteProduct}
        reload={reload}
        setReload={setReload}
        className="animate-fadeIn"
      />
    </>
  );
};

export default Shop;
