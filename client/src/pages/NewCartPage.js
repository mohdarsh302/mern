import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { Link, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import ErrorBoundary from "../components/ErrorBoundary"; // adjust path as needed

const NewCartPage = () => {
      const [auth, setAuth] = useAuth();
      const [cart, setCart] = useCart();
     // const [addresses, setAddresses] = useState([]);
     // const [defaultAddress, setDefaultAddress] = useState(null);
      const [clientToken, setClientToken] = useState("");
     const [instance, setInstance] = useState("");
      //const [loading, setLoading] = useState(false);
      //const [paymentMethod, setPaymentMethod] = useState("COD"); // or "Online"
      const navigate = useNavigate();

      //get all address
        // const getUserAddresses = async () => {
        //   try {
        //     const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-addresses`);
        //     console.log("All addresses "+data)
        //     setAddresses(data || []);
        //     const defaultAddr = data.find((addr) => addr.isDefault);
        //     //console.log("defaultAddress111111111====>"+defaultAddr)
        //     setDefaultAddress(defaultAddr || null);
        //     //console.log("defaultAddress====>"+defaultAddr);
      
        //     console.log("defaultAddress", defaultAddress);
        //     console.log("fullName typeof", typeof defaultAddress.fullName);
        //     console.log("Updated defaultAddress ===>", defaultAddress.addressLine1);
        //     console.log("fullName", defaultAddress.fullName, typeof defaultAddress.fullName);
        //   } catch (error) {
        //     console.log(error);
        //   }
        // };

         //total price
        const totalPrice = () => {
            try {
            let total = 0;
            // let shipping = 50;
            // let withShipping = 0;
            cart?.map((item) => {
                total = total + item.price;
            });
            // withShipping = total+shipping;
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
            });
            } catch (error) {
            console.log(error);
            }
        };
         //total price with shipping
         const totalPriceWithShipping = () => {
            try {
            const total = totalPrice();
            const shipping = 50;
            const withShipping = total + shipping;
        
            return withShipping.toLocaleString("en-US", {
                style: "currency",
                currency: "INR",
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
            //getUserAddresses();
           
          }, [auth?.token]);

          //handle payments
            // const handlePayment = async () => {
            //   try {
            //     setLoading(true);
            //     const { nonce } = await instance.requestPaymentMethod();
            //     const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
            //       nonce,
            //       cart,
            //     });
            //     setLoading(false);
            //     localStorage.removeItem("cart");
            //     setCart([]);
            //     navigate("/dashboard/user/orders");
            //     toast.success("Payment Completed Successfully ");
            //   } catch (error) {
            //     console.log(error);
            //     setLoading(false);
            //   }
            // };

            // const handleCODOrder = async () => {
            //     try {
            //       setLoading(true);
            //       const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-cod-order`, {
            //         cart,
            //         // address: defaultAddress, // or send ID if required by backend
            //         // paymentMethod: "COD",
            //       });
            //       if (data?.success) {
            //         toast.success("COD order placed successfully!");
            //         localStorage.removeItem("cart");
            //         setCart([]);
            //         navigate("/dashboard/user/orders"); // Redirect to orders page
            //       } else {
            //         toast.error("Failed to place order");
            //       }
            //     } catch (error) {
            //       console.error(error);
            //       setLoading(false);
            //       toast.error("Failed to place COD order.");
            //     }
            //   };
              
  return (
    <>
     <Layout>
     <div className="container-fluid">
            <div className="row px-xl-5">
            <div className="col-12">
                <nav className="breadcrumb bg-light mb-30">
                <a className="breadcrumb-item text-dark" href="#">Home</a>
                <a className="breadcrumb-item text-dark" href="#">Shop</a>
                <span className="breadcrumb-item active">Shopping Cart</span>
                </nav>
            </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-light table-borderless table-hover text-center mb-0">
                <thead className="thead-dark">
                    <tr>
                    <th>Products</th>
                    <th>Price</th>
                    {/* <th>Quantity</th> */}
                    <th>Total</th>
                    <th>Remove</th>
                    </tr>
                </thead>
                <tbody className="align-middle">
                {cart?.map((p) => (
                    <tr  key={p._id}>
                    <td className="align-middle"><img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{width: 50}} /> {p.name}</td>
                    <td className="align-middle">INR {p.price}</td>
                    <td className="align-middle">
                        {/* <div className="input-group quantity mx-auto" style={{width: 100}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={1} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div> */}
                    </td>
                    <td className="align-middle">INR {p.price}</td>
                    <td className="align-middle"><button className="btn btn-sm btn-danger" onClick={() => removeCartItem(p._id)}><i className="fa fa-times" /></button></td>
                    </tr>
                ))}
                    {/* <tr>
                    <td className="align-middle"><img src="img/product-2.jpg" alt style={{width: 50}} /> Product Name</td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{width: 100}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={1} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div>
                    </td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                    </tr>
                    <tr>
                    <td className="align-middle"><img src="img/product-3.jpg" alt style={{width: 50}} /> Product Name</td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{width: 100}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={1} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div>
                    </td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                    </tr>
                    <tr>
                    <td className="align-middle"><img src="img/product-4.jpg" alt style={{width: 50}} /> Product Name</td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{width: 100}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={1} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div>
                    </td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                    </tr>
                    <tr>
                    <td className="align-middle"><img src="img/product-5.jpg" alt style={{width: 50}} /> Product Name</td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle">
                        <div className="input-group quantity mx-auto" style={{width: 100}}>
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-minus">
                            <i className="fa fa-minus" />
                            </button>
                        </div>
                        <input type="text" className="form-control form-control-sm bg-secondary border-0 text-center" defaultValue={1} />
                        <div className="input-group-btn">
                            <button className="btn btn-sm btn-primary btn-plus">
                            <i className="fa fa-plus" />
                            </button>
                        </div>
                        </div>
                    </td>
                    <td className="align-middle">$150</td>
                    <td className="align-middle"><button className="btn btn-sm btn-danger"><i className="fa fa-times" /></button></td>
                    </tr> */}
                </tbody>
                </table>
            </div>
            <div className="col-lg-4">
                <form className="mb-30" action>
                <div className="input-group">
                    <input type="text" className="form-control border-0 p-4" placeholder="Coupon Code" />
                    <div className="input-group-append">
                    <button className="btn btn-primary">Apply Coupon</button>
                    </div>
                </div>
                </form>
                <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Cart Summary</span></h5>
                <div className="bg-light p-30 mb-5">
                <div className="border-bottom pb-2">
                    <div className="d-flex justify-content-between mb-3">
                    <h6>Subtotal</h6>
                    <h6>INR {totalPrice()}</h6>
                    </div>
                    <div className="d-flex justify-content-between">
                    <h6 className="font-weight-medium">Shipping</h6>
                    <h6 className="font-weight-medium">Free</h6>
                    </div>
                </div>
               
                {/* <div className="pt-2">
                    {cart?.length > 0 ? (
                        <>
                       
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>INR {totalPrice()}</h5>
                        </div>

                       
                        {!clientToken && !auth?.token ? (
                            <button
                            className="btn btn-outline-warning"
                            onClick={() =>
                                navigate("/login", {
                                state: "/cart",
                                })
                            }
                            >
                            Please Login to checkout
                            </button>
                        ) : (
                            <Link className="btn btn-outline-warning mt-2" to={"/checkout"}>
                            Checkout
                            </Link>
                        )}
                        </>
                    ) : (
                        <button className="alert alert-warning text-center w-100" onClick={() => navigate("/")}>
                        Cart is empty, Continue shopping
                        </button>
                    )}
                </div> */}
                <div className="pt-2">
                    {cart?.length > 0 ? (
                        <>
                        {/* Total Price */}
                        <div className="d-flex justify-content-between mt-2">
                            <h5>Total</h5>
                            <h5>INR {totalPrice()}</h5>
                        </div>

                        {/* Login check */}
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
                            <Link className="btn btn-outline-warning mt-2" to={"/checkout"}>
                            Checkout
                            </Link>
                        )}
                        </>
                    ) : (
                        <button className="alert alert-warning text-center w-100" onClick={() => navigate("/")}>
                        Cart is empty, Continue shopping
                        </button>
                    )}
                    </div>


                </div>
            </div>
            </div>
        </div>
     </Layout>
        

      
    </>
  )
}

export default NewCartPage
