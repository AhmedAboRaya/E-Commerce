import { Link } from "react-router-dom";
import Button from "../Products/Card/Button";

const MainComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <div className="flex flex-row space-x-2">
        <Link to="/user">
          <Button
            txt={"User"}
            style={
              "px-2 py-1 bg-[#e274a9] text-[#ffffff] hover:text-[#e274a9] hover:bg-[#ffffff] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
            }
          />
        </Link>

        <Link to="/admin">
          <Button
            txt={"Admin"}
            style={
              "px-2 py-1 bg-[#ffffff] text-[#e274a9] hover:text-[#ffffff] hover:bg-[#e274a9] border-2 border-[#e274a9] rounded-md duration-500 font-semibold"
            }
          />
        </Link>
      </div>
    </div>
  );
};

export default MainComponent;
