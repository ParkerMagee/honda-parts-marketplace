import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ITEMS_PRICE,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_SHIPPING_PRICE,
  CART_SAVE_TAX_PRICE,
  CART_SAVE_TOTAL_PRICE,
  CART_SAVE_USER_INFO,
} from "../Constants/CartConstants";

// Add Items to Cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Remove Items From Cart
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// Save User Info
export const saveUserInfo = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_USER_INFO,
    payload: data,
  });
  localStorage.setItem("userInfo", JSON.stringify(data));
};

// Save Shipping Address
export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

// Save Payment Method
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(data));
};

// Save Items Price
export const saveItemsPrice = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ITEMS_PRICE,
    payload: data,
  });
  localStorage.setItem("itemsPrice", JSON.stringify(data));
};

// Save Shipping Price
export const saveShippingPrice = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_PRICE,
    payload: data,
  });
  localStorage.setItem("shippingPrice", JSON.stringify(data));
};

// Save Tax Price
export const saveTaxPrice = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_TAX_PRICE,
    payload: data,
  });
  localStorage.setItem("taxPrice", JSON.stringify(data));
};

// Save Total Price
export const saveTotalPrice = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_TOTAL_PRICE,
    payload: data,
  });
  localStorage.setItem("totalPrice", JSON.stringify(data));
};
