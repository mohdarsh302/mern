import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/CartStyles.css";
import ErrorBoundary from "../components/ErrorBoundary"; // adjust path as needed

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [addresses, setAddresses] = useState([]);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //get all address
  const getUserAddresses = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-addresses`);
      console.log("All addresses "+data)
      setAddresses(data || []);
      const defaultAddr = data.find((addr) => addr.isDefault);
      //console.log("defaultAddress111111111====>"+defaultAddr)
      setDefaultAddress(defaultAddr || null);
      //console.log("defaultAddress====>"+defaultAddr);

      console.log("defaultAddress", defaultAddress);
      console.log("fullName typeof", typeof defaultAddress.fullName);
      console.log("Updated defaultAddress ===>", defaultAddress.addressLine1);
      console.log("fullName", defaultAddress.fullName, typeof defaultAddress.fullName);
    } catch (error) {
      console.log(error);
    }
  };
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
    getUserAddresses();
    if (auth?.token) {
      // getToken();
      // getUserAddresses(); // fetch addresses on mount
    }
  }, [auth?.token]);

  useEffect(() => {
    if (defaultAddress) {
      // console.log("Updated defaultAddress ===>", defaultAddress.addressLine1);
      // console.log("fullName", defaultAddress.fullName, typeof defaultAddress.fullName);

    }
  }, [defaultAddress]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className=" cart-page">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h1>
          </div>
        </div>
        <div className="container ">
          <div className="row ">
            <div className="col-md-7  p-0 m-0">
              {cart?.map((p) => (
                <div className="row card flex-row" key={p._id}>
                  <div className="col-md-4">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      alt={p.name}
                      width="100%"
                      height={"130px"}
                    />
                  </div>
                  <div className="col-md-4">
                    <p>{p.name}</p>
                    <p>{p.description.substring(0, 30)}</p>
                    <p>Price : {p.price}</p>
                  </div>
                  <div className="col-md-4 cart-remove-btn">
                    <button
                      className="btn btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-5 cart-summary ">
              <h2>Cart Summary</h2>
              <p>Total | Checkout | Payment</p>
              <hr />
              <h4>Total : {totalPrice()} </h4>
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Default Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    {/* <ErrorBoundary> */}
                      {/* {setAddresses ? (
                        <div className="mb-3">
                          <h4>Shipping Address</h4>
                          <h5>{typeof defaultAddress.fullName === 'string' ? defaultAddress.fullName : 'N/A'}</h5>
                          <p>
                            {[defaultAddress.addressLine1, defaultAddress.addressLine2]
                              .filter((line) => typeof line === 'string')
                              .join(", ")}
                          </p>
                          <p>
                            {[defaultAddress.city, defaultAddress.state, defaultAddress.country]
                              .filter((line) => typeof line === 'string')
                              .join(", ")}{" "}
                            - {defaultAddress.postalCode || ""}
                          </p>
                          <p>Phone: {defaultAddress.phone || "N/A"}</p>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/all-addresses")}
                          >
                            Change Address
                          </button>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <p className="text-danger">
                            <AiFillWarning /> No default address found.
                          </p>
                          <button
                            className="btn btn-outline-warning"
                            onClick={() => navigate("/dashboard/user/all-addresses")}
                          >
                            Add/Update Address
                          </button>
                        </div>
                      )} */}
                      {/* {addresses
                      ?.filter((add) => add.isDefault === true) // ✅ Only default address
                      .map((add, i) => {
                        return (
                          <div className="card" key={i}>
                            <div className="card-header">Default Address</div>
                            <div className="card-body">
                              <h5 className="card-title">{add.fullName}</h5>
                              <p className="card-text"><strong>Phone:</strong> {add.phone}</p>
                              <p className="card-text"><strong>Address Line 1:</strong> {add.addressLine1}</p>
                              <p className="card-text"><strong>Address Line 2:</strong> {add.addressLine2}</p>
                              <p className="card-text"><strong>City:</strong> {add.city}</p>
                              <p className="card-text"><strong>State:</strong> {add.state}</p>
                              <p className="card-text"><strong>Country:</strong> {add.country}</p>
                              <p className="card-text"><strong>Postal Code:</strong> {add.postalCode}</p>
                            </div>
                          </div>
                        );
                      })} */}
                      
                    {/* </ErrorBoundary> */}


                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
              <div className="mt-2">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
