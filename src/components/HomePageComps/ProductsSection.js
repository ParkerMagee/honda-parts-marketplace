import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listPorduct } from "../../Redux/Actions/ProductActions";
import ErrorMessage from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { Pagination } from "@mui/material";

const ProductsSection = (props) => {
  const { keyword, pagenumber } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listPorduct(keyword, pagenumber));
  }, [dispatch, keyword, pagenumber]);

  const changePageHandler = async (e, value) => {
    if (keyword) {
      navigate(`/search/${keyword}/page/${value}`);
    } else {
      navigate(`/page/${value}`);
    }
  };
  return (
    <div className="flex flex-col bg-gray-900">
      {loading ? (
        <Loading className="self-center" />
      ) : error ? (
        <ErrorMessage className="self-center" variant="alert">
          {error}
        </ErrorMessage>
      ) : (
        <div className="flex flex-col bg-gray-200 my-16 mx-10 pt-6 rounded-md lg:mx-20">
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
  );
};

export default ProductsSection;
