// import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import ErrorMessage from "../components/LoadingError/Error";
import { getOrderDetails } from "../Redux/Actions/OrderActions";
import { ORDER_PAY_RESET } from "../Redux/Constants/OrderConstants";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderConfirmation = () => {
  const { id } = useParams();
  const orderId = id;
  const dispatch = useDispatch();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // const { data: clientId } = axios.get("/api/config/paypal");

  useEffect(() => {
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      setSdkReady(true);
    }
  }, [dispatch, orderId, successPay, order]);

  // const successPaymentHandler = (paymentResult) => {
  //   console.log(paymentResult);
  //   dispatch(payOrder(orderId, paymentResult));
  // };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <ErrorMessage variant="alert">{error}</ErrorMessage>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold mt-16 mb-4 mx-10">
            Order Confirmation
          </h1>
          <h1 className="text-2xl text-center font-bold my-6 mx-10">
            Your Order Number is: {order._id}
          </h1>
          {!order.isPaid && (
            <div className="flex flex-col items-center">
              <h1 className="bg-gray-200 text-xl text-center px-6 py-2 mb-10 mx-10 rounded-md">
                Your order will be submitted upon successful payment
              </h1>
              <h1 className="bg-red-500 text-white text-center w-2/3 mb-6 px-4 py-2 rounded-md xl:w-1/2">
                As this is a demonstration website, none of the information
                entered will be used and therefore you will not recieve a
                confirmation email. If you would like to contact me personally
                you can visit my personal website {""}
                <a
                  className="font-bold text-gray-200 hover:text-gray-900"
                  href="https://parker-magee.vercel.app"
                >
                  Here
                </a>
                .
              </h1>
              {/* <PayPalScriptProvider options={{ "client-id": clientId }}> */}
              {loadingPay && <div>Loading</div>}
              {!sdkReady ? (
                <div>Loading</div>
              ) : (
                <h1 className="bg-red-500 text-white text-center w-2/3 mb-20 px-4 py-2 rounded-md xl:w-1/2">
                  The PayPal payment option that would normally be displayed
                  here has been removed as this is a demonstration website which
                  currently does not have any real products available for sale.
                </h1>
                // <PayPalButtons
                //   style={{ layout: "horizontal" }}
                //   onSuccess={successPaymentHandler}
                // />
              )}
              {/* </PayPalScriptProvider> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderConfirmation;
