import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    screenSize: "",
    storage: "",
    camera: "",
    battery: "",
    image: "",
    category: "Mobile", // Default to "Mobile"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addProduct = (product) => {
    const productData = {
      ...product,
      specs: {
        screenSize: product.screenSize,
        storage: product.storage,
        camera: product.category === "Mobile" ? product.camera : undefined,
        battery: product.category === "Mobile" ? product.battery : undefined,
        ram: product.category === "Laptop" ? product.ram : undefined,
        processor:
          product.category === "Laptop" ? product.processor : undefined,
      },
    };

    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addProduct(formData);
    setFormData({
      name: "",
      brand: "",
      price: "",
      screenSize: "",
      storage: "",
      camera: "",
      battery: "",
      image: "",
      category: "Mobile",
    });
    toast.success("Added", { duration: 2000 });
  };

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="bg-white shadow-md rounded-lg p-6 animate-fadeIn">
        <Toaster />
        <form onSubmit={handleSubmit}>
          {/* Category */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
            >
              <option value="Mobile">Mobile</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
              required
            />
          </div>

          {/* Brand */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
              required
            />
          </div>

          {/* Screen Size */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Screen Size
            </label>
            <input
              type="text"
              name="screenSize"
              value={formData.screenSize}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
              required
            />
          </div>

          {/* Storage */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Storage
            </label>
            <input
              type="text"
              name="storage"
              value={formData.storage}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
              required
            />
          </div>

          {/* Camera (for Mobile) */}
          {formData.category === "Mobile" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Camera
              </label>
              <input
                type="text"
                name="camera"
                value={formData.camera}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full"
                required
              />
            </div>
          )}

          {/* Battery (for Mobile) */}
          {formData.category === "Mobile" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Battery
              </label>
              <input
                type="text"
                name="battery"
                value={formData.battery}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full"
                required
              />
            </div>
          )}

          {/* RAM (for Laptop) */}
          {formData.category === "Laptop" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                RAM
              </label>
              <input
                type="text"
                name="ram"
                value={formData.ram}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full"
                required
              />
            </div>
          )}

          {/* Processor (for Laptop) */}
          {formData.category === "Laptop" && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Processor
              </label>
              <input
                type="text"
                name="processor"
                value={formData.processor}
                onChange={handleChange}
                className="border rounded py-2 px-3 w-full"
                required
              />
            </div>
          )}

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="border rounded py-2 px-3 w-full"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#e274a9] text-white py-2 px-4 rounded hover:bg-[#c25888]"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
