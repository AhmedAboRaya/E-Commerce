import { Outlet, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../Home';
import Navbar from '../Navbar';
import Lab16 from '../Lab16';
import Products from '../Products';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="lab16" element={<Lab16 />} />
      <Route path="products" element={<Products />} />
    </Route>
  )
);

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default Router;
