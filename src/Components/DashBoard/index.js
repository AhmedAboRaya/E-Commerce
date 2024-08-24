import Card from "./Card";
import { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import DeleteModal from "./Modal/Confirmation";
import EditModal from "./Modal/EditDialog";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState();

  const [reload, setReload] = useState(false);

  let [isOpen, setIsOpen] = useState(false);
  let [editModalOpen, setEditModalOpen] = useState(false);

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
        console.error("Error fetching users:", error);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  },[reload]);

  function closeModal() {
    setIsOpen(false)
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


  const handleDeleteProduct = (id)=> {
    fetch(`http://localhost:8000/products/${id}`, {
      method: 'DELETE',
    })
   .then(response => response.json());
    setProducts(products.filter(product => product.id!== id));
    console.log(id);
    closeModal();
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
          <Spinner animation="border" style={{ color: "#e274a9" }}/>
        </div>
      ) : (
        <div>
          <h1 className="text-[#e274a9] text-center mt-4">Smart Phones</h1>
          <div className="flex flex-row flex-wrap justify-center">
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
              />
            ))
            }
            
          </div>
          <h1 className="text-[#e274a9] text-center mt-4">Laptops</h1>{" "}
          <div className="flex flex-row flex-wrap justify-center">
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
              />
            ))}
          </div>
        </div>
      )}
      <DeleteModal closeModal={closeModal} openModal={openModal} isOpen={isOpen} selectedProduct={selectedProduct} deleteProduct={handleDeleteProduct}/>
      <EditModal closeModal={closeEditModal} openModal={openEditModal} isOpen={editModalOpen} selectedProduct={selectedProduct} deleteProduct={handleDeleteProduct} reload={reload} setReload={setReload}/>
    </>
  );
};

export default Shop;
