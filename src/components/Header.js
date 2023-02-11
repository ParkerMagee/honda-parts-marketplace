import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col bg-gray-900 py-6 max-w-screen">
      <div className="flex justify-between mx-8 items-center lg:mx-20">
        <Link className="text-4xl text-white font-bold" to="/">
          V-MOD Performance
        </Link>

        <div className="flex lg:flex-col ">
          <div className="flex items-center">
            <Link className="hidden mx-2 text-white md:flex" to="/">
              Products
            </Link>
            <Link className="hidden mx-2 text-white md:flex" to="/contact">
              Contact
            </Link>
            <p className="hidden mx-2 text-white md:flex">
              Cart Items: {cartItems.length}
            </p>
            <Link className="mx-2" to="/cart">
              <ShoppingCartOutlinedIcon className="text-white" />
            </Link>
          </div>
          <div className="hidden justify-center h-8 mt-4 lg:flex">
            <form className="h-8" onSubmit={searchHandler}>
              <input
                className="px-4 h-full rounded-l-md"
                type="search"
                placeholder="Search"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                className="bg-red-500 px-2 h-full rounded-r-md hover:bg-red-600 "
                type="submit"
              >
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
