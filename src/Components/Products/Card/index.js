import Button from "./Button";

const Card = ({ brand, name, price, image }) => {
  return (
    <>
      <div className="flex flex-col p-3 w-[300px] rounded-lg shadow-md m-2 border-2 border-[#e274a9]">
        <img
          src={image}
          alt={`${name} image`}
          className="w-full h-2/3 object-cover rounded-md"
        />
        <h1 className="text-2xl text-center">{name}</h1>
        <h6 className="">
          <ol className="space-y-2 pl-2">
            <li>Brand: {brand}</li>
            <li>Price: {price}$</li>
          </ol>
        </h6>
        <Button
          txt={"Add to cart"}
          style={
            "bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
          }
        />
      </div>
    </>
  );
};

export default Card;
