import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBrowserHistory } from "history";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/Actions/CartActions";
import ErrorMessage from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { Pagination } from "@mui/material";
import { listPorduct } from "../Redux/Actions/ProductActions";

const Cart = () => {
  const { keyword } = useParams();
  const { pagenumber } = useParams();

  let history = createBrowserHistory();
  let location = history.location;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const productId = id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2);

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const checkoutHandler = () => {
    navigate("/checkout");
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const changePageHandler = async (e, value) => {
    if (keyword) {
      navigate(`/cart/search/${keyword}/page/${value}`);
    } else {
      navigate(`/cart/page/${value}`);
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
    dispatch(listPorduct(keyword, pagenumber));
  }, [dispatch, productId, qty, keyword, pagenumber]);

  return (
    <div className="flex flex-col items-center max-w-screen">
      {cartItems.length === 0 ? (
        <div className="flex flex-col w-screen items-center">
          <div className="flex flex-col w-4/5 items-center mt-20 mb-16 border-solid border-gray-200 border-b-2">
            <h1 className="text-4xl font-bold mb-10">Your Cart is Empty</h1>
            <Link to="/">
              <button className="bg-red-500 text-white text-xl font-bold my-4 mb-10 px-6 py-2 rounded-md hover:bg-red-600">
                Return to Home Page
              </button>
            </Link>
          </div>
          <div className="flex flex-col w-full items-center">
            {loading ? (
              <Loading className="self-center" />
            ) : error ? (
              <ErrorMessage className="self-center" variant="alert">
                {error}
              </ErrorMessage>
            ) : (
              <div className="flex flex-col bg-gray-200 mb-16 mx-10 pt-6 rounded-md lg:w-2/3 lg:mx-20">
                <div className="flex flex-col items-center content-center justify-center lg:flex-row">
                  {products.map((product) => (
                    <Link
                      className="flex flex-col w-64 h-48 mx-10 my-4 items-center justify-center rounded-md bg-white md:w-96 md:h-64 lg:px-2"
                      to={`/products/${product._id}`}
                    >
                      <div
                        className="flex flex-col items-center h-full"
                        key={product._id}
                      >
                        <img
                          className="object-cover h-36 w-52 mb-3 mt-3 rounded-md md:w-64 md:h-48"
                          alt={product.name}
                          src={product.image}
                        />
                        <p>{product.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex justify-center">
                  <Pagination
                    className="rounded-lg px-10 py-2 mb-2"
                    count={pages}
                    page={page ? page : 1}
                    onChange={changePageHandler}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center xl:items-start">
          <h1 className="text-4xl font-bold my-10 self-center">Your Cart</h1>
          <div className="flex flex-col items-center xl:flex-row">
            <div className="mx-6 px-8 my-4 mb-16 py-2 md:mx-12">
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
                      <p className="mr-1">Qnt</p>
                      <select
                        className="self-start mt-0.5"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mx-6 my-2 xl:my-0">
                      <button
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        Remove from Cart
                      </button>
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
            <div className="my-4 mx-20 pb-8 xl:my-16 xl:pb-16">
              {total > 0 && (
                <div className="flex flex-col items-center">
                  <p className="my-4">Shipping Price: TBD</p>
                  <p className="my-4">Tax Price: TBD</p>
                  <button
                    className="bg-red-500 text-white font-bold my-4 px-6 py-2 rounded-md hover:bg-red-600"
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
