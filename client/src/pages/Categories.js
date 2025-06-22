import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      {/* <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories.map((c) => (
            <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
              <div className="card">
                <Link to={`/category/${c.slug}`} className="btn cat-btn">
                  {c.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr /> */}
      <div className="container-fluid pt-5">
        <h2 className="section-title position-relative text-uppercase mx-xl-5 mb-4"><span className="bg-secondary pr-3"> All Categories</span></h2>
        <div className="row px-xl-5 pb-3">
        {categories.map((c) => (
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1"  key={c._id}>
            <a className="text-decoration-none" href>
              <div className="cat-item d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="/img/cat-img.jpeg" alt />
                </div>
                <Link to={`/category/${c.slug}`}>
                <div className="flex-fill pl-3">
                  <h6>{c.name}</h6>
                  <small className="text-body">100 Products</small>
                </div>
                </Link>
              </div>
            </a>
          </div>
           ))}
          {/* <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-2.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-3.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-4.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-4.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-3.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-2.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-1.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-2.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-1.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-4.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div>
          <div className="col-lg-3 col-md-4 col-sm-6 pb-1">
            <a className="text-decoration-none" href>
              <div className="cat-item img-zoom d-flex align-items-center mb-4">
                <div className="overflow-hidden" style={{width: 100, height: 100}}>
                  <img className="img-fluid" src="img/cat-3.jpg" alt />
                </div>
                <div className="flex-fill pl-3">
                  <h6>Category Name</h6>
                  <small className="text-body">100 Products</small>
                </div>
              </div>
            </a>
          </div> */}
        </div>
        </div>
    </Layout>
  );
};

export default Categories;
