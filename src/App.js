import "./App.css";
import HomePage from "./pages/HomePage.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmation from "./pages/OrderConfirmation";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ContactPage from "./pages/ContactPage";
import DoesNotExist from "./pages/DoesNotExist";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:keyword" element={<HomePage />} />
        <Route path="/page/:pagenumber" element={<HomePage />} />
        <Route
          path="/search/:keyword/page/:pagenumber"
          element={<HomePage />}
        />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/cart/:id?" element={<Cart />} />
        <Route path="/cart/:id?/page/:pagenumber" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/shipping" element={<ShippingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orderconfirmation/:id?" element={<OrderConfirmation />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/does-not-exist" element={<DoesNotExist />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
