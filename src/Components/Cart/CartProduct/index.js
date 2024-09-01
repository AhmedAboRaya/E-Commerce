import React from 'react';

const CartProduct = ({ title, image, price, brand, screenSize, storage, camera, battery, ram, processor, id }) => {
  return (
    <div className=''>
      <h2>Cart Product</h2>
      {title && <p>{title}</p> }
      {image && <img src={image} /> }
      {price && <p>{price}</p> }
      {brand && <p>{brand}</p> }
      {screenSize && <p>{screenSize}</p> }
      {storage && <p>{storage}</p> }
      {camera && <p>{camera}</p> }
      {battery && <p>{battery}</p> }
      {ram && <p>{ram}</p> }
      {processor && <p>{processor}</p> }
    </div>
  );
};

export default CartProduct;
