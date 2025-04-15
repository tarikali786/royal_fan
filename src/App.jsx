import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
import { Home } from "./pages/home";
import {
  Address,
  Cart,
  Order,
  OrderItem,
  ProductDetails,
  ProductsCategory,
} from "./pages";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route
          path="/products-category/:category"
          element={<ProductsCategory />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/address" element={<Address />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-item" element={<OrderItem />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
