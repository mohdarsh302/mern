import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useCart } from "../context/cart";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "./../components/Layout/Layout";
import { AiOutlineReload } from "react-icons/ai";
import "../styles/Homepage.css";
import BannerCarousel from "../components/BannerCarousel";
import Featured from "../components/Featured";
import HomeCategory from "../components/HomeCategory";
import FeaturedProducts from "../components/FeaturedProducts";
import OfferProducts from "../components/OfferProducts";
import RecentProducts from "../components/RecentProducts";
import OurVendors from "../components/OurVendors";

const FilterShop = () => {
    const navigate = useNavigate();
      const [cart, setCart] = useCart();
      const [products, setProducts] = useState([]);
      const [categories, setCategories] = useState([]);
      const [checked, setChecked] = useState([]);
      const [radio, setRadio] = useState([]);
      const [total, setTotal] = useState(0);
      const [page, setPage] = useState(1);
      const [loading, setLoading] = useState(false);
    //get all cat
      const getAllCategory = async () => {
        try {
        //   const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-product-count`);
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
          if (data?.success) {
            setCategories(data?.category);
          }
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
          getAllCategory();
          getTotal();
        }, []);

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

       const handleFilter = (value, id) => {
          let all = [...checked];
          if (value) {
            all.push(id);
          } else {
            all = all.filter((c) => c !== id);
          }
          setChecked(all);
        };
        useEffect(() => {
          if (!checked.length || !radio.length) getAllProducts();
        }, [checked.length, radio.length]);
      
        useEffect(() => {
          if (checked.length || radio.length) filterProduct();
        }, [checked, radio]);
      
        //get filterd product
        const filterProduct = async () => {
          try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, {
              checked,
              radio,
            });
            setProducts(data?.products);
          } catch (error) {
            console.log(error);
          }
        };
  return (
    <>
    <Layout title={"ALl Products - Best offers "}>
    <div className="container-fluid">
  <div className="row px-xl-5">
    {/* Shop Sidebar Start */}
    <div className="col-lg-3 col-md-4">
      {/* Price Start */}
      <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by price</span></h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {/* <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" defaultChecked id="price-all" />
            <label className="custom-control-label" htmlFor="price-all">All Price</label>
            <span className="badge border font-weight-normal">1000</span>
          </div> */}
          {/* <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="price-1" />
            <label className="custom-control-label" htmlFor="price-1">$0 - $100</label>
            <span className="badge border font-weight-normal">150</span>
          </div> */}
          <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                        {Prices?.map((p) => (
                          <div key={p._id}>
                            <Radio value={p.array}>{p.name}</Radio>
                          </div>
                        ))}
            </Radio.Group>
        </form>
      </div>
      {/* Price End */}
      {/* Color Start */}
      <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by category</span></h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {/* <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" defaultChecked id="color-all" />
            <label className="custom-control-label" htmlFor="price-all">All Color</label>
            <span className="badge border font-weight-normal">1000</span>
          </div> */}
          {categories?.map((c) => (
        //   <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
        //     <input  key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} type="checkbox" className="custom-control-input" id="color-1" />
        //     <label className="custom-control-label" htmlFor="color-1">{c.name}</label>
        //     {/* <span className="badge border font-weight-normal">{c.productCount}</span> */}
        //   </div>
        <Checkbox
            key={c._id}
            onChange={(e) => handleFilter(e.target.checked, c._id)}
            >
            {c.name}
            </Checkbox>
          ))}
         
        </form>
      </div>
      {/* Color End */}
      {/* Size Start */}
      {/* <h5 className="section-title position-relative text-uppercase mb-3"><span className="bg-secondary pr-3">Filter by size</span></h5>
      <div className="bg-light p-4 mb-30">
        <form>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" defaultChecked id="size-all" />
            <label className="custom-control-label" htmlFor="size-all">All Size</label>
            <span className="badge border font-weight-normal">1000</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-1" />
            <label className="custom-control-label" htmlFor="size-1">XS</label>
            <span className="badge border font-weight-normal">150</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-2" />
            <label className="custom-control-label" htmlFor="size-2">S</label>
            <span className="badge border font-weight-normal">295</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-3" />
            <label className="custom-control-label" htmlFor="size-3">M</label>
            <span className="badge border font-weight-normal">246</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
            <input type="checkbox" className="custom-control-input" id="size-4" />
            <label className="custom-control-label" htmlFor="size-4">L</label>
            <span className="badge border font-weight-normal">145</span>
          </div>
          <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
            <input type="checkbox" className="custom-control-input" id="size-5" />
            <label className="custom-control-label" htmlFor="size-5">XL</label>
            <span className="badge border font-weight-normal">168</span>
          </div>
        </form>
      </div> */}
      {/* Size End */}
      <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => window.location.reload()}
            >
              RESET FILTERS
            </button>
          </div>
    </div>
    
    {/* Shop Sidebar End */}
    {/* Shop Product Start */}
    <div className="col-lg-9 col-md-8">
      <div className="row pb-3">
        {/* <div className="col-12 pb-1">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <button className="btn btn-sm btn-light"><i className="fa fa-th-large" /></button>
              <button className="btn btn-sm btn-light ml-2"><i className="fa fa-bars" /></button>
            </div>
            <div className="ml-2">
              <div className="btn-group">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Sorting</button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">Latest</a>
                  <a className="dropdown-item" href="#">Popularity</a>
                  <a className="dropdown-item" href="#">Best Rating</a>
                </div>
              </div>
              <div className="btn-group ml-2">
                <button type="button" className="btn btn-sm btn-light dropdown-toggle" data-toggle="dropdown">Showing</button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">10</a>
                  <a className="dropdown-item" href="#">20</a>
                  <a className="dropdown-item" href="#">30</a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {products?.map((p) => (
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1"  key={p._id}>
          <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden" style={{height: '300px'}}>
              <img className="img-fluid w-100" src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}  alt={p.name}  />
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
        {/* <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
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
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 pb-1">
          <div className="product-item bg-light mb-4">
            <div className="product-img position-relative overflow-hidden">
              <img className="img-fluid w-100" src="img/product-9.jpg" alt />
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
        <div className="col-12">
          <nav>
            <ul className="pagination justify-content-center">
              <li className="page-item disabled"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item active"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    {/* Shop Product End */}
  </div>
    </div>
    </Layout>
   

      
    </>
  )
}

export default FilterShop
