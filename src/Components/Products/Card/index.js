import Button from "./Button";

const Card = ({ id, brand, name, price, image, onClick, handleAddToCart, handleBuyNow }) => {
  return (
    <div className="flex flex-col p-4 w-[300px] rounded-lg shadow-lg m-3 border border-[#e274a9] cursor-pointer transition-transform transform hover:scale-105">
      <div onClick={onClick} className="h-full">
        <img
          src={image}
          alt={`${name} image`}
          className="w-full h-2/3 object-cover rounded-md mb-3"
        />
        <h1 className="text-2xl text-center font-semibold mb-2">{name}</h1>
        <h6 className="text-gray-600">
          <ol className="space-y-2 pl-2">
            <li>Brand: {brand}</li>
            <li>Price: {price}$</li>
          </ol>
        </h6>
      </div>

      <div className="flex flex-row space-x-2 mt-4">
        <Button
          txt={"Buy Now"}
          style={
            "w-full bg-[#e274a9] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#e274a9] border-2 border-[#e274a9] rounded-md transition-colors duration-300 font-semibold"
          }
          onClick={() => handleBuyNow(id)}
        />

        <Button
          txt={"Add to cart"}
          style={
            "w-full bg-[#ffffff] text-[#e274a9] hover:bg-[#e274a9] hover:text-[#ffffff] border-2 border-[#e274a9] rounded-md transition-colors duration-300 font-semibold"
          }
          onClick={() => handleAddToCart(id)}
        />
      </div>
    </div>
  );
};

export default Card;
