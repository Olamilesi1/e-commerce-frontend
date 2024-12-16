import {  Routes, Route } from "react-router-dom";
import Product from '../pages/Product'
import ProductDetails from '../pages/ProductDetails'
import Cart from "../pages/Cart";
import ErrorPage from "../pages/ErrorPage";

function Pages() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Product/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="*" element = {<ErrorPage/>}/>
      </Routes>
    </div>
  );
}
 
export default Pages;
