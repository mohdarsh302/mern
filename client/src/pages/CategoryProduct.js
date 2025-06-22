import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/CategoryProductStyles.css";
import axios from "axios";
const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getPrductsByCat();
  }, [params?.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>

      <div className="container-fluid pt-5 pb-3">
        <h2 className="position-relative text-uppercase mx-xl-5 mb-4">
          <span className="bg-secondary pr-3">Category - {category?.name}</span>
        </h2>
        <h6 className="position-relative text-uppercase mx-xl-5 mb-4">
        <span className="bg-secondary pr-3">{products?.length} result found </span> 
        </h6>
        <div className="row px-xl-5">
        {products?.map((p) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1"  key={p._id}>
            <div className="product-item bg-light mb-4">
              <div className="product-img position-relative overflow-hidden" style={{height: '300px'}}>
                <img className="img-fluid w-100" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}  alt={p.name} />
                <div className="product-action">
                  <Link className="btn btn-outline-dark btn-square" onClick={() => {
                              setCart([...cart, p]);
                              localStorage.setItem(
                                "cart",
                                JSON.stringify([...cart, p])
                              );
                              toast.success("Item Added to cart");
                            }}><i className="fa fa-shopping-cart" /></Link>
                  <Link className="btn btn-outline-dark btn-square"><i className="far fa-heart" /></Link>
                  <Link className="btn btn-outline-dark btn-square"><i className="fa fa-sync-alt" /></Link>
                  <Link className="btn btn-outline-dark btn-square"><i className="fa fa-search" /></Link>
                </div>
              </div>
              <div className="text-center py-4">
                <Link className="h6 text-decoration-none text-truncate" href>{p.name}</Link>
                <div className="d-flex align-items-center justify-content-center mt-2">
                  <h5>INR {p.price}</h5><h6 className="text-muted ml-2"><del>INR {p.price}</del></h6>
                </div>
                <div className="d-flex align-items-center justify-content-center mb-1">
                  <small className="fa fa-star text-primary mr-1" />
                  <small className="fa fa-star text-primary mr-1" />
                  <small className="fa fa-star text-primary mr-1" />
                  <small className="fa fa-star text-primary mr-1" />
                  <small className="fa fa-star text-primary mr-1" />
                  <small>(99)</small>
                </div>
                <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/new-product/${p.slug}`)}
                      >
                        More Details
                      </button>
                </div>
              </div>
            </div>
          </div>
          ))}
          
        </div>
            </div>
      <div className="container mt-3 category">
        <h4 className="text-center">Category - {category?.name}</h4>
        <h6 className="text-center">{products?.length} result found </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" key={p._id}>
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                  <div className="card-body">
                    <div className="card-name-price">
                      <h5 className="card-title">{p.name}</h5>
                      <h5 className="card-title card-price">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "USD",
                        })}
                      </h5>
                    </div>
                    <p className="card-text ">
                      {p.description.substring(0, 60)}...
                    </p>
                    <div className="card-name-price">
                      <button
                        className="btn btn-info ms-1"
                        onClick={() => navigate(`/product/${p.slug}`)}
                      >
                        More Details
                      </button>
                      {/* <button
                    className="btn btn-dark ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
