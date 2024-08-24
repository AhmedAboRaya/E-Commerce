import { NavLink,Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <nav className="container border-2 border-[#e274a9] flex justify-between font-sans text-[#e274a9] mt-7 py-3 rounded-xl mb-4">
        <div>
            <h1 className="text-2xl font-bold">Shop Now</h1>
        </div>

        <div className="mt-1">
            <Link className="mr-9 text-[#cb0c6b] no-underline text-lg font-semibold hover:text-[#39021d] duration-500" to="/admin">Products</Link>
            <NavLink className="mr-9 text-[#cb0c6b] no-underline text-lg font-semibold hover:text-[#39021d] duration-500" to="/admin/messages">User Messages</NavLink>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
