import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import Button from "../../Card/Button";

export default function EditModal({
  openModal,
  closeModal,
  isOpen,
  selectedProduct,
  reload,
  setReload
}) {
  const [product, setProduct] = useState({
    name: selectedProduct?.name || "",
    price: selectedProduct?.price || "",
    brand: selectedProduct?.brand || "",
    screenSize: selectedProduct?.specs?.screenSize || "",
    storage: selectedProduct?.specs?.storage || "",
    camera: selectedProduct?.category === "Mobile" ? selectedProduct?.specs?.camera || "" : "",
    battery: selectedProduct?.category === "Mobile" ? selectedProduct?.specs?.battery || "" : "",
    ram: selectedProduct?.category === "Laptop" ? selectedProduct?.specs?.ram || "" : "",
    processor: selectedProduct?.category === "Laptop" ? selectedProduct?.specs?.processor || "" : "",
    image: selectedProduct?.image || "",
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending PUT request to:", `http://localhost:8000/products/${selectedProduct.id}`);
      console.log("Request Body:", {
        ...product,
        specs: {
          screenSize: product.screenSize,
          ram: product.ram,
          storage: product.storage,
          processor: product.processor,
          ...(selectedProduct.category === "Mobile" && {
            camera: product.camera,
            battery: product.battery,
          }),
          ...(selectedProduct.category === "Laptop" && {
            ram: product.ram,
            processor: product.processor,
          }),
        },
      });
      
      const response = await fetch(`http://localhost:8000/products/${selectedProduct.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...product,
          specs: {
            screenSize: product.screenSize,
            ram: product.ram,
            storage: product.storage,
            processor: product.processor,
            ...(selectedProduct.category === "Mobile" && {
              camera: product.camera,
              battery: product.battery,
            }),
            ...(selectedProduct.category === "Laptop" && {
              ram: product.ram,
              processor: product.processor,
            }),
          },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setReload(!reload);
      closeModal();
    } catch (error) {
      console.error("Failed to update product:", error);
    } 
  };

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        name: selectedProduct.name,
        price: selectedProduct.price,
        brand: selectedProduct.brand,
        screenSize: selectedProduct.specs?.screenSize || "",
        storage: selectedProduct.specs?.storage || "",
        category: selectedProduct.category,
        camera: selectedProduct.category === "Mobile" ? selectedProduct.specs?.camera || "" : "",
        battery: selectedProduct.category === "Mobile" ? selectedProduct.specs?.battery || "" : "",
        ram: selectedProduct.category === "Laptop" ? selectedProduct.specs?.ram || "" : "",
        processor: selectedProduct.category === "Laptop" ? selectedProduct.specs?.processor || "" : "",
        image: selectedProduct.image,
      });
    }
  }, [selectedProduct]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all flex justify-center">
                {
                  selectedProduct && (
                    <div className="flex flex-col p-3 space-y-5 w-full">
                      <h2 className="text-xl text-[#e274a9] text-center font-bold">
                        Edit Product
                      </h2>
                      {/* Form fields */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={product.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                          Price
                        </label>
                        <input
                          type="number"
                          id="price"
                          name="price"
                          value={product.price}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      <div>
                        <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">
                          Brand
                        </label>
                        <input
                          type="text"
                          id="brand"
                          name="brand"
                          value={product.brand}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      <div>
                        <label htmlFor="screenSize" className="block text-sm font-medium text-gray-700 mb-2">
                          Screen Size
                        </label>
                        <input
                          type="text"
                          id="screenSize"
                          name="screenSize"
                          value={product.screenSize}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      <div>
                        <label htmlFor="storage" className="block text-sm font-medium text-gray-700 mb-2">
                          Storage
                        </label>
                        <input
                          type="text"
                          id="storage"
                          name="storage"
                          value={product.storage}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      {selectedProduct.category === "Mobile" && (
                        <>
                          <div>
                            <label htmlFor="camera" className="block text-sm font-medium text-gray-700 mb-2">
                              Camera
                            </label>
                            <input
                              type="text"
                              id="camera"
                              name="camera"
                              value={product.camera}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                            />
                          </div>

                          <div>
                            <label htmlFor="battery" className="block text-sm font-medium text-gray-700 mb-2">
                              Battery
                            </label>
                            <input
                              type="text"
                              id="battery"
                              name="battery"
                              value={product.battery}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                            />
                          </div>
                        </>
                      )}

                      {selectedProduct.category === "Laptop" && (
                        <>
                          <div>
                            <label htmlFor="ram" className="block text-sm font-medium text-gray-700 mb-2">
                              RAM
                            </label>
                            <input
                              type="text"
                              id="ram"
                              name="ram"
                              value={product.ram}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                            />
                          </div>

                          <div>
                            <label htmlFor="processor" className="block text-sm font-medium text-gray-700 mb-2">
                              Processor
                            </label>
                            <input
                              type="text"
                              id="processor"
                              name="processor"
                              value={product.processor}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                            />
                          </div>
                        </>
                      )}

                      <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                          Image URL
                        </label>
                        <input
                          type="text"
                          id="image"
                          name="image"
                          value={product.image}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 text-sm text-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e274a9]"
                        />
                      </div>

                      <div className="flex justify-center space-x-2 mt-4 w-full">
                        <Button
                          txt="Save Changes"
                          onClick={handleEditProduct}
                          style="w-full bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
                        />
                        <Button
                          txt="Cancel"
                          onClick={closeModal}
                          style="w-full bg-[#ffffff] text-[#e274a9] hover:text-[#ffffff] hover:bg-[#e274a9] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
                        />
                      </div>

                      
                    </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
