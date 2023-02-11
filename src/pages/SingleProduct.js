import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listPorductDetails,
} from "../Redux/Actions/ProductActions";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/LoadingError/Loading";
import ErrorMessage from "../components/LoadingError/Error";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";
import { Rating } from "@mui/material";

const SingleProduct = () => {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();
  const productId = id;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      alert("Review Submitted");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listPorductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const addToCartHandler = (e) => {
    e.preventDefault();
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(productId, {
        name,
        rating,
        comment,
      })
    );
  };

  return (
    <div className="bg-gray-200">
      <div>
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage variant="alert">{error}</ErrorMessage>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center mt-20 mx-10 lg:flex-row lg:mx-36">
              <img
                className="mx-10 object-cover w-96 max-h-screen rounded-sm"
                alt={product.name}
                src={product.image}
              />
              <div className="flex flex-col mx-10 mt-10 items-center lg:mt-0 lg:items-start">
                <div className="flex">
                  <Rating className="mr-6" value={product.rating} readOnly />
                  <p>Reviews ({product.numReviews})</p>
                </div>
                <h1 className="text-4xl font-bold">{product.name}</h1>
                <div>
                  {product.countInStock > 0 ? (
                    <p className="flex">
                      Availability (<p className="font-bold">In Stock</p>)
                    </p>
                  ) : (
                    <p className="flex">
                      Availability (<p className="font-bold">Out of Stock</p>)
                    </p>
                  )}
                </div>
                <h1 className="text-3xl font-bold my-8">${product.price}</h1>
                <p className="mb-4">{product.description}</p>
                {product.countInStock > 0 ? (
                  <div className="flex">
                    <div className="flex px-3 py-1 mr-6 border-solid border-white border-2 rounded-md">
                      <p className="mx-2">Qnt</p>
                      <select
                        className="mx-2 bg-gray-200 cursor-pointer"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      className="bg-red-500 px-4 rounded-md hover:bg-red-600"
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="my-4">
                      Get notified when this product is back in stock
                    </p>
                    <form className="h-8">
                      <input
                        className="h-full w-60 pl-2 pr-8 rounded-l-md"
                        placeholder="Enter your e-mail address"
                      />
                      <button className="bg-red-500 h-full px-4 rounded-r-md hover:bg-red-600">
                        Sign Up
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-5/6 items-center">
              <div className="flex flex-col my-10 items-center w-full border-solid border-white border-y-2">
                <h1 className="text-2xl my-4">Reviews</h1>
                <div className="my-4">
                  {product.reviews.length === 0 ? (
                    <div>This Product has no Reviews</div>
                  ) : (
                    product.reviews.map((review) => (
                      <div className="mb-8" key={review._id}>
                        <div className="flex">
                          <div className="mr-8">{review.name}</div>
                          <div>{moment(review.createdAt).calendar()}</div>
                        </div>
                        <div>
                          <Rating readOnly value={review.rating} />
                        </div>
                        <div className="max-w-2xl">{review.comment}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center w-full mb-10">
                <h1 className="text-2xl font-bold">Write a Review</h1>
                {loadingCreateReview ? (
                  <div>Loading</div>
                ) : errorCreateReview ? (
                  <ErrorMessage variant="alert">
                    {errorCreateReview}
                  </ErrorMessage>
                ) : (
                  <form
                    className="flex flex-col w-full items-center"
                    onSubmit={submitReviewHandler}
                  >
                    <div className="flex flex-col w-full items-center">
                      <h3>Rating</h3>
                      <select
                        className="px-2 rounded-md"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="">Select...</option>
                        <option value="1">1 - Not Good</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </select>
                    </div>
                    <input
                      className="my-4 px-2 rounded-md"
                      type="text"
                      placeholder="Enter Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <textarea
                      className="w-3/4 rounded-md lg:w-1/2"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    >
                      {comment}
                    </textarea>
                    <button
                      className="bg-white px-4 py-2 my-4 rounded-md hover:bg-gray-900 hover:text-white"
                      type="submit"
                    >
                      Submit Review
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
