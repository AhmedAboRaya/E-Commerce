import React from 'react';

const CartProduct = ({
  title,
  image,
  price,
  brand,
  screenSize,
  storage,
  camera,
  battery,
  ram,
  processor,
  id
}) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-xl w-80">
      {image && (
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover rounded-lg mb-3 transition-opacity duration-300 hover:opacity-80"
        />
      )}
      {title && <p className="text-lg font-medium text-pink-500 mb-1 text-center ">{title}</p>}
      {price && <p className="text-md text-gray-600 mb-1">Price: ${price}</p>}
      {brand && <p className="text-md text-gray-600 mb-1">Brand: {brand}</p>}
      {screenSize && <p className="text-md text-gray-600 mb-1">Screen Size: {screenSize}</p>}
      {storage && <p className="text-md text-gray-600 mb-1">Storage: {storage}</p>}
      {camera && <p className="text-md text-gray-600 mb-1">Camera: {camera}</p>}
      {battery && <p className="text-md text-gray-600 mb-1">Battery: {battery}</p>}
      {ram && <p className="text-md text-gray-600 mb-1">RAM: {ram}</p>}
      {processor && <p className="text-md text-gray-600 mb-1">Processor: {processor}</p>}
    </div>
  );
};

export default CartProduct;
