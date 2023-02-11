import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  porductCreateReviewsReducer,
  porductDetailsReducer,
  porductListReducer,
} from "./Reducers/PorductReducers";
import { cartReducer } from "./Reducers/CartReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
} from "./Reducers/OrderReducers";

const reducer = combineReducers({
  productList: porductListReducer,
  productDetails: porductDetailsReducer,
  productCreateReview: porductCreateReviewsReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
});

// Cart Items
const cartItemsFromLocalStorge = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

// User Info
const userInfoFromLocalStorge = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

// Shipping Address
const shippingAddressFromLocalStorge = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromLocalStorge,
    shippingAddress: shippingAddressFromLocalStorge,
    userInfo: userInfoFromLocalStorge,
  },
};

const store = configureStore({
  reducer,
  initialState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: false,
});

export default store;
