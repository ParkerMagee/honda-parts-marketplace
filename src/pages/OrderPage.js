import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import ErrorMessage from "../components/LoadingError/Error";
import {
  saveItemsPrice,
  saveShippingPrice,
  saveTaxPrice,
  saveTotalPrice,
} from "../Redux/Actions/CartActions";
import { createOrder } from "../Redux/Actions/OrderActions";
import { ORDER_CREATE_RESET } from "../Redux/Constants/OrderConstants";

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [orderHidden, setOrderHidden] = useState(true);

  const [itemsPrice, setItemsPrice] = useState();
  const [shippingPrice, setShippingPrice] = useState();
  const [taxPrice, setTaxPrice] = useState();
  const [totalPrice, setTotalPrice] = useState();

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  // Calculate Price
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    setItemsPrice(
      addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      )
    );
    setShippingPrice(addDecimals(itemsPrice > 100 ? 0 : 20));
    setTaxPrice(addDecimals(Number((0.15 * itemsPrice).toFixed(2))));
    setTotalPrice(
      (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)
    );
    if (success) {
      navigate(`/orderconfirmation/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [
    navigate,
    dispatch,
    success,
    order,
    cart,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  ]);

  const showOrder = () => {
    dispatch(saveItemsPrice(itemsPrice));
    dispatch(saveShippingPrice(shippingPrice));
    dispatch(saveTaxPrice(taxPrice));
    dispatch(saveTotalPrice(totalPrice));
    setOrderHidden(false);
  };

  const placeOrderHandler = async () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        user: cart.userInfo,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10">Order Details</h1>
      {orderHidden === true ? (
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
          <button
            className="bg-red-500 text-white font-bold my-4 mb-10 px-6 py-2 rounded-md hover:bg-red-600"
            onClick={showOrder}
          >
            Show Complete Order Details
          </button>
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row">
          <div className="flex flex-col-reverse mt-14 mx-12 px-8 mb-10 py-2 items-center xl:flex-row xl:mb-16">
            <div className="mt-1">
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
          </div>
          <div className="flex flex-col items-center rounded-md xl:mr-10 xl:mt-16">
            <div className="flex flex-col xl:flex-row">
              <div className="flex flex-col items-center px-4 py-2 border-solid border-gray-200 border-y-2 xl:border-r-2">
                <h1 className="text-2xl text-center font-bold">
                  User Information
                </h1>
                <div className="mt-4">
                  First Name: {cart.userInfo.firstName}
                </div>
                <div className="mt-2">Last Name: {cart.userInfo.lastName}</div>
                <div className="my-2 text-center">
                  Email: {cart.userInfo.email}
                </div>
              </div>
              <div className="flex flex-col items-center px-4 py-2 border-solid border-gray-200 border-b-2 xl:border-y-2">
                <h1 className="text-2xl text-center font-bold">
                  Shipping Information
                </h1>
                <div>Address: {cart.shippingAddress.address}</div>
                <div>City: {cart.shippingAddress.city}</div>
                <div>Postal Code: {cart.shippingAddress.postalCode}</div>
                <div>Country: {cart.shippingAddress.country}</div>
                <div>Shipping Price: ${cart.shippingPrice}</div>
              </div>
            </div>
            <div className="flex flex-col items-center px-4 py-2 border-solid border-gray-200 border-b-2">
              <h1 className="text-2xl text-center font-bold">
                Payment Information
              </h1>
              <div className="mt-2">Payment Method: {cart.paymentMethod}</div>
              <div>Tax Price: ${cart.taxPrice}</div>
            </div>
            <div>
              <h1 className="text-2xl text-center font-bold my-2">
                Total: ${cart.totalPrice}
              </h1>
            </div>
            {cart.cartItems.length === 0 ? null : (
              <button
                className="bg-red-500 text-white font-bold mt-2 mb-10 px-6 py-2 rounded-md hover:bg-red-600"
                type="submit"
                onClick={placeOrderHandler}
              >
                Place Order
              </button>
            )}
            {error && (
              <div>
                <ErrorMessage variant="alert">{error}</ErrorMessage>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
