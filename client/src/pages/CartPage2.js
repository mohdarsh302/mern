import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
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
      <div className="container mt-4">
  <div className="row">
    {/* Left: Cart Items */}
    <div className="col-md-7 mb-4 mt-4">
    <h3 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest gjgjhgjjhgjhhjghjghjg"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h3>

      {cart.map((item, index) => (
        <div className="card mb-3" key={index}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={item.image} className="img-fluid rounded-start" alt={item.name} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Price: ${item.price}</p>
                <button className="btn btn-danger btn-sm">Remove</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Right: Cart Summary */}
    <div className="col-md-5">
      <div className="card mb-3">
        <div className="card-header text-center fw-bold">Cart Summary</div>
        <div className="card-body" style={{ height: '375px' }}>

          <p className="fw-bold">Total: ${totalPrice}</p>

          {/* <h5 className="mt-3">Default Address</h5> */}
          {addresses
            ?.filter((add) => add.isDefault === true) // ✅ Only default address
            .map((add, i) => {
            return (
            <div className="border rounded p-3 bg-light">
              <p><strong>{defaultAddress.fullName}</strong></p>
              <p><strong>Phone:</strong> {defaultAddress.phone}</p>
              <p><strong>Address Line 1:</strong> {defaultAddress.addressLine1}</p>
              <p><strong>Address Line 2:</strong> {defaultAddress.addressLine2}</p>
              <p><strong>City:</strong> {defaultAddress.city}</p>
              <p><strong>State:</strong> {defaultAddress.state}</p>
              <p><strong>Postal Code:</strong> {defaultAddress.postalCode}</p>
            </div>
          );
        })}
         <button
            className="btn btn-outline-warning"
            onClick={() => navigate("/dashboard/user/all-addresses")}
            >
            Change Address
            </button>

          <h6 className="mt-4">Choose a way to pay</h6>
          <div className="d-flex flex-column gap-2">
            <button className="btn btn-outline-secondary">💳 Card</button>
            <button className="btn btn-outline-primary">🅿️ PayPal</button>
          </div>

          <button className="btn btn-primary mt-3 w-100">Make Payment</button>
        </div>
      </div>
    </div>
  </div>
</div>

    </Layout>
  );
};

export default CartPage;
