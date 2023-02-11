import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { saveShippingAddress } from "../Redux/Actions/CartActions";

const ShippingPage = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="flex flex-col items-center xl:items-start">
      <h1 className="text-4xl font-bold mt-10 self-center">
        Shipping Information
      </h1>
      <div className="flex flex-col-reverse mt-10 items-center xl:flex-row">
        <div className="mx-12 px-8 my-4 mb-16 py-2">
          {cartItems.map((item) => (
            <div
              className="flex flex-col justify-between -my-0.5 border-solid border-gray-200 border-y-2 xl:flex-row"
              key={item.product}
            >
              <img
                className="h-56 object-contain my-2 rounded-md xl:mr-20"
                alt={item.name}
                src={item.image}
              />
              <div className="flex flex-col items-center my-10 md:flex-row md:items-start">
                <div className="mx-6 my-2 w-44 text-center xl:my-0 xl:text-start">
                  <p className="font-bold">{item.name}</p>
                  {item.countInStock > 0 ? (
                    <p className="text-gray-500">In Stock</p>
                  ) : (
                    <p className="text-gray-500">Out of Stock</p>
                  )}
                </div>
                <div className="mx-6 my-2 xl:my-0">${item.price} Each</div>
                <div className="flex mx-6 my-2 xl:my-0">
                  <p className="mr-1">Qnt {item.qty}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex mt-4 justify-between xl:mx-6">
            <p className="font-bold xl:ml-6">({cartItems.length}) Items</p>
            <div className="flex">
              <p>Subtotal:</p>
              <p className="font-bold ml-1">${total}</p>
            </div>
          </div>
        </div>
        <div>
          <form
            className="flex flex-col mx-20 mb-10 items-center"
            onSubmit={submitHandler}
          >
            <h1 className="text-xl font-bold text-center mb-4">
              Please Enter Your Shipping Information Bellow
            </h1>
            <input
              className="my-4 px-4 py-1 w-full rounded-md border-solid border-black border-2"
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              className="my-4 px-4 py-1 w-full rounded-md border-solid border-black border-2"
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <input
              className="my-4 px-4 py-1 w-full rounded-md border-solid border-black border-2"
              type="text"
              placeholder="Enter Postal Code"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
            <input
              className="my-4 px-4 py-1 w-full rounded-md border-solid border-black border-2"
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <button
              className="bg-red-500 text-white font-bold my-4 px-6 py-2 rounded-md hover:bg-red-600"
              type="submit"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
