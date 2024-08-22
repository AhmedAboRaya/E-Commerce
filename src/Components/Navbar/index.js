import { NavLink } from "react-router-dom";
import '../../App.css'
const Navbar = () => {
  return (
    <>
      <nav className="container border-2 border-[#e274a9] flex justify-between font-sans text-[#e274a9] mt-7 py-3 rounded-xl mb-4">
        <div>
            <h1 className="text-2xl font-bold">Shop Now</h1>
        </div>

        <div className="mt-1">
            <NavLink className="mr-9 text-[#cb0c6b] no-underline text-lg font-semibold hover:text-[#39021d] duration-500" to="/">Home</NavLink>
            <NavLink className="mr-9 text-[#cb0c6b] no-underline text-lg font-semibold hover:text-[#39021d] duration-500" to="/products">Products</NavLink>
            <NavLink className="mr-9 text-[#cb0c6b] no-underline text-lg font-semibold hover:text-[#39021d] duration-500" to="/lab16">Lab16</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
