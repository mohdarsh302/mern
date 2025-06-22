import React, { useEffect, useState } from 'react';
import Layout from "./../components/Layout/Layout";
import axios from 'axios';
import { useAuth } from '../context/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import DropIn from 'braintree-web-drop-in-react';

const Checkout = () => {
    const [auth] = useAuth();
     const [cart, setCart] = useCart();
     const [paymentMethod, setPaymentMethod] = useState("COD"); // or "Online"
     const [loading, setLoading] = useState(false);
     const [clientToken, setClientToken] = useState("");
     const [instance, setInstance] = useState("");

     const navigate = useNavigate();
    
    const [address, setAddress] = useState({
        fullName: "",
        // email: "",
        phone: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "India",
        postalCode: "",
      });

      const fetchDefaultAddress = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/default-address`);
          if (data) {
            setAddress(prev => ({
              ...prev,
              ...data.address,
            }));
          }
        } catch (error) {
          console.error("Failed to fetch default address", error);
        }
      };

      useEffect(() => {
        if (auth?.token) {
          fetchDefaultAddress();
        }
      }, [auth?.token]);

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
      }, [auth?.token]);

      const handleCODOrder = async () => {
        try {
          setLoading(true);
          const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-cod-order`, {
            cart,
            // address: defaultAddress, // or send ID if required by backend
            // paymentMethod: "COD",
          });
          if (data?.success) {
            toast.success("COD order placed successfully!");
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders"); // Redirect to orders page
          } else {
            toast.error("Failed to place order");
          }
        } catch (error) {
          console.error(error);
          setLoading(false);
          toast.error("Failed to place COD order.");
        }
      };

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
        //total price
        const totalPrice = () => {
            try {
            let total = 0;
            
            cart?.map((item) => {
                total = total + item.price;
            });
          
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
            } catch (error) {
            console.log(error);
            }
        };
  return (
    <>
    <Layout >
    <div className="container-fluid">
    <div className="row px-xl-5">
      <div className="col-12">
        <nav className="breadcrumb bg-light mb-30">
          <a className="breadcrumb-item text-dark" href="#">Home</a>
          <a className="breadcrumb-item text-dark" href="#">Shop</a>
          <span className="breadcrumb-item active">Checkout</span>
        </nav>
      </div>
    </div>
  </div>
  <div className="container-fluid">
    <div className="row px-xl-5">
      <div className="col-lg-8">
        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Default Address</span></h5>
        <div className="bg-light p-30 mb-5">
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Full Name</label>
              <input className="form-control" type="text" value={address.fullName} readOnly placeholder="Full Name" />
            </div>
            
            {/* <div className="col-md-6 form-group">
              <label>E-mail</label>
              <input className="form-control" type="text" placeholder="example@email.com" />
            </div> */}
            <div className="col-md-6 form-group">
              <label>Mobile No</label>
              <input className="form-control" type="text" value={address.phone} readOnly placeholder="+123 456 789" />
            </div>
            <div className="col-md-6 form-group">
              <label>Address Line 1</label>
              <input className="form-control" type="text"value={address.addressLine1} readOnly  placeholder="123 Street" />
            </div>
            <div className="col-md-6 form-group">
              <label>Address Line 2</label>
              <input className="form-control" type="text" value={address.addressLine2} readOnly placeholder="123 Street" />
            </div>
            <div className="col-md-6 form-group">
              <label>Country</label>
              <select className="custom-select">
                <option selected>India</option>
              </select>
            </div>
            <div className="col-md-6 form-group">
              <label>City</label>
              <input className="form-control" type="text" value={address.city} readOnly placeholder="Your City" />
            </div>
            <div className="col-md-6 form-group">
              <label>State</label>
              <input className="form-control" type="text" value={address.state} readOnly placeholder="Your state" />
            </div>
            <div className="col-md-6 form-group">
              <label>ZIP Code</label>
              <input className="form-control" type="text" value={address.postalCode} readOnly placeholder={123} />
            </div>
            
             {/*<div className="col-md-12 form-group">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="newaccount" />
                <label className="custom-control-label" htmlFor="newaccount">Create an account</label>
              </div>
            </div>
            <div className="col-md-12">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="shipto" />
                <label className="custom-control-label" htmlFor="shipto" data-toggle="collapse" data-target="#shipping-address">Ship to different address</label>
              </div>
            </div> */}
          </div>
          {auth?.token ? ( 
            <Link className="btn btn-block btn-primary font-weight-bold py-3" to={"/dashboard/user/all-addresses"}>Change Default Address</Link>
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
        
      </div>
      <div className="col-lg-4">
        <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Order Total</span></h5>
        <div className="bg-light p-30 mb-5">
          <div className="border-bottom">
            <h6 className="mb-3">Products</h6>
            {cart?.map((p) => (
            <div className="d-flex justify-content-between">
              <p>{p.name}1</p>
              <p>INR {p.price}</p>
            </div>
            ))}
            {/* <div className="d-flex justify-content-between">
              <p>Product Name 2</p>
              <p>$150</p>
            </div>
            <div className="d-flex justify-content-between">
              <p>Product Name 3</p>
              <p>$150</p>
            </div> */}
          </div>
          <div className="border-bottom pt-3 pb-2">
            <div className="d-flex justify-content-between mb-3">
              <h6>Subtotal</h6>
              <h6>INR {totalPrice()} </h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6 className="font-weight-medium">Shipping</h6>
              <h6 className="font-weight-medium">Free</h6>
            </div>
          </div>
          <div className="pt-2">
            <div className="d-flex justify-content-between mt-2">
              <h5>Total</h5>
              <h5>INR {totalPrice()}</h5>
            </div>
          </div>
        </div>
        <div className="mb-5">
          <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Payment</span></h5>
          <div className="bg-light p-30">
          {cart?.length > 0 ? (
                <>
                {!auth?.token ? (
                        <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                            navigate("/login", {
                            state: "/cart",
                            })
                        }
                        >
                        Please login to checkout
                        </button>
                    ) : (
                        <>
                        <h6>Select Payment Method:</h6>
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="cod"
                            value="COD"
                            checked={paymentMethod === "COD"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="cod">
                            Cash on Delivery (COD)
                        </label>
                        </div>
                        <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="paymentMethod"
                            id="online"
                            value="Online"
                            checked={paymentMethod === "Online"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="online">
                            Pay Online (Braintree)
                        </label>
                        </div>
    
                        <div className="mt-2">
                        {paymentMethod === "Online" && clientToken ? (
                            <>
                            <DropIn
                                options={{
                                authorization: clientToken,
                                paypal: { flow: "vault" },
                                }}
                                onInstance={(instance) => setInstance(instance)}
                            />
                            <button
                                className="btn btn-primary"
                                onClick={handlePayment}
                                disabled={loading || !instance}
                            >
                                {loading ? "Processing ..." : "Pay Now"}
                            </button>
                            </>
                        ) : (
                            <button
                            className="btn btn-primary"
                            onClick={handleCODOrder}
                            disabled={loading}
                            >
                            {loading ? "Processing ..." : "Place Order (COD)"}
                            </button>
                        )}
                        </div>
                    </>
                    )}
                    </>
                ) : (
                <button className="alert alert-warning text-center w-100" onClick={() => navigate("/")}>
                Cart is empty, Continue shopping khkhkhkhkhk
                </button>
                
            )}

                   
            
             {/* <h6>Select Payment Method:</h6>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="cod">Cash on Delivery (COD)</label>
                </div>
                <div className="form-check">
                    <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="online"
                    value="Online"
                    checked={paymentMethod === "Online"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="online">Pay Online (Braintree)</label>
                </div>

                <div className="mt-2">
                {paymentMethod === "Online" && clientToken && auth?.token && cart?.length > 0 ? (
                    <>
                    <DropIn
                        options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={loading || !instance}
                    >
                        {loading ? "Processing ..." : "Pay Now"}
                    </button>
                    </>
                ) : (
                    <button
                    className="btn btn-primary"
                    onClick={handleCODOrder}
                    disabled={loading || !auth?.token}
                    >
                    {loading ? "Processing ..." : "Place Order (COD)"}
                    </button>
                )}
                </div> */}
            
          </div>
        </div>
      </div>
    </div>
  </div>
    </Layout>
  

      
    </>
  )
}

export default Checkout
