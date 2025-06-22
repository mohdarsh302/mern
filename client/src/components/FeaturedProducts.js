import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AiOutlineReload } from "react-icons/ai";

const FeaturedProducts = () => {
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [total, setTotal] = useState(0);
   const [page, setPage] = useState(1);
   //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

   //getTOtal COunt
    const getTotal = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
        setTotal(data?.total);
      } catch (error) {
        console.log(error);
      }
    };
     useEffect(() => {
        // getAllCategory();
        getTotal();
      }, []);
    
    useEffect(() => {
        if (page === 1) return;
        loadMore();
      }, [page]);
      //load more
      const loadMore = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
          setLoading(false);
          setProducts([...products, ...data?.products]);
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
      };
  return (
    <>
   <div className="container-fluid pt-5 pb-3">
  <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3">Featured Products</span></h2>
  <div className="row px-xl-5">
  {products?.map((p) => (
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1"  key={p._id}>
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}  alt={p.name} />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>{p.name}</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    ))}
     <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-2.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star-half-alt text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-3.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star-half-alt text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-4.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    {/*<div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-5.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-6.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star-half-alt text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-7.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star-half-alt text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
      <div className="product-item bg-light mb-4">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/product-8.jpg" alt />
          <div className="product-action">
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-shopping-cart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="far fa-heart" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-sync-alt" /></a>
            <a className="btn btn-outline-dark btn-square" href><i className="fa fa-search" /></a>
          </div>
        </div>
        <div className="text-center py-4">
          <a className="h6 text-decoration-none text-truncate" href>Product Name Goes Here</a>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <h5>$123.00</h5><h6 className="text-muted ml-2"><del>$123.00</del></h6>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-1">
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="fa fa-star text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small className="far fa-star text-primary mr-1" />
            <small>(99)</small>
          </div>
        </div>
      </div>
    </div> */}
  </div>

  {/* <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn loadmore"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? (
                    "Loading ..."
                  ) : (
                    <>
                      {" "}
                      Loadmore <AiOutlineReload />
                    </>
                  )}
                </button>
              )}
  </div> */}
</div>

      
    </>
  )
}

export default FeaturedProducts
