import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../Home";
import Lab16 from "../Lab16";
import Products from "../Products";
import Contact from "../Contact";
// import MainComponent from "../Main";
import Login from "../Login";
import UserLayout from "../Layout/UserLayout";
import AdminLayout from "../Layout/AdminLayout";
import UserMessage from "../UserMessage";
import DashBoard from "../DashBoard";
import AddProduct from "../AddProduct";
import AddAdmin from "../AddAdmin";
import Accounts from "../Accounts";
import SignUp from "../SingUp";
import Cart from "../Cart";
import BuyNow from "../BuyNow";
const Router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} >
        <Route index element={<Login />} />
        <Route path="signup" element={<SignUp />} />
      </Route>

      <Route path="user" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="contact" element={<Contact />} />
        <Route path="buynow" element={<BuyNow />} />
        <Route path="cart" element={<Cart />} />
        <Route path="lab16" element={<Lab16 />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="messages" element={<UserMessage />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="addadmin" element={<AddAdmin />} />
        <Route path="admins" element={<Accounts />} />
      </Route>
    </>
  )
);

function Layout() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default Router;

