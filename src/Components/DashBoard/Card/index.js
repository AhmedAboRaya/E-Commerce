import Button from "./Button";

const Card = ({
  brand,
  name,
  price,
  image,
  confirmation,
  category,
  specs,
  editDialog,
}) => {
  return (
    <>
      <div className="flex flex-col p-3 w-[300px] rounded-lg shadow-md m-2 border-2 border-[#e274a9] cursor-pointer">
        <div className="h-full">
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
              {category === "Mobile" ? (
                <>
                  <li>Camera: {specs.camera}</li>
                  <li>Battery: {specs.battery}</li>
                </>
              ) : (
                <>
                  <li>Ram: {specs.ram}</li>
                  <li>Processor: {specs.processor}</li>
                </>
              )}
            </ol>
          </h6>
        </div>

        <div className="flex flex-row space-x-2 mt-3">
          <div onClick={() => confirmation()} className="w-full">
            <Button
              txt={"Delete"}
              style={
                "w-full bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
              }
            />
          </div>

          <div onClick={() => editDialog()} className="w-full">
            <Button
              txt={"Edit"}
              style={
                "w-full bg-[#ffffff] text-[#e274a9] hover:text-[#ffffff] hover:bg-[#e274a9] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
