import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Products/Card/Button";

export default function MyModal({
  openModal,
  closeModal,
  isOpen,
  selectedProduct,
  handleAddToCart,
  handleBuyNow,
}) {
  return (
    <>
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
                  {selectedProduct && (
                    <div className="flex flex-col p-3 ">
                      <img
                        src={selectedProduct.image}
                        alt={`${selectedProduct.name} image`}
                        className="w-full h-2/3 object-cover rounded-md"
                      />
                      <h1 className="text-2xl text-center text-[#e274a9]">
                        {selectedProduct.name}
                      </h1>
                      <h6 className="">
                        <ol className="space-y-2 pl-2">
                          <li>Brand: {selectedProduct.brand}</li>
                          <li>Price: {selectedProduct.price}$</li>
                          <li>
                            Screen Size: {selectedProduct.specs.screenSize}
                          </li>
                          <li>Storage: {selectedProduct.specs.storage}</li>
                          {selectedProduct.category === "Mobile" ? (
                            <>
                              <li>Camera: {selectedProduct.specs.camera}</li>
                              <li>Battery: {selectedProduct.specs.battery}</li>
                            </>
                          ) : (
                            <>
                              <li>Ram: {selectedProduct.specs.ram}</li>
                              <li>
                                Processor: {selectedProduct.specs.processor}
                              </li>
                            </>
                          )}
                        </ol>
                      </h6>
                      <div className="flex flex-row space-x-2">
                        <Button
                          txt={"Buy Now"}
                          style={
                            "w-full bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
                          }
                          onClick={() => handleBuyNow(selectedProduct.id)}
                        />

                        <Button
                          txt={"Add to cart"}
                          style={
                            "w-full bg-[#ffffff] text-[#e274a9] hover:text-[#ffffff] hover:bg-[#e274a9] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
                          }
                          onClick={() => handleAddToCart(selectedProduct.id)}
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
    </>
  );
}
