import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      {/* <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1">More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <div className="container">
      <div className="container-fluid pt-5 pb-3">
      <h2 className="position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Search Resuts</span>
      </h2>
          <h6 className=" position-relative text-uppercase mx-xl-5 mb-4">
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} Product(s)`}
          </h6>
        {/* <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2> */}
        <div className="row px-xl-5">
        {values?.results.map((p) => (
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
      </div>
       
    </Layout>
  );
};

export default Search;
