import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const AllAddress = () => {
     const [auth, setAuth] = useAuth();
      const [address, setAddress] = useState([]);
      const location = useLocation(); // detects route changes
    
    const getAllAddresses = async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-addresses`);
          setAddress(data);
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
          if (auth?.token) getAllAddresses();
        }, [location.pathname]);
  return (
    <Layout title={"Your Address"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="row">
            {address?.map((add, i) => {
                return (
                    <div className="col-md-4">
              <div className="card">
                <div className="card-header">{add.isDefault? ('Default address'):('Other Address')}</div>
                <div className="card-body">
                  <h5 className="card-title">{add.fullName}</h5>
                  <p className="card-text"><strong>Phone:</strong> {add.phone}</p>
                  <p className="card-text"><strong>Address Line 1:</strong>  {add.addressLine1}</p>
                  <p className="card-text"><strong>Address Line 2:</strong> {add.addressLine2}</p>
                  <p className="card-text"><strong>City:</strong> {add.city}</p>
                  <p className="card-text"> <strong>State:</strong> {add.state}</p>
                  <p className="card-text"><strong>Country:</strong>  {add.country}</p>
                  <p className="card-text"> <strong>Postal Code:</strong> {add.postalCode}</p>
                  <Link to={`/dashboard/user/get-address/${add._id}`} className="btn btn-primary">
                   Update Address
                  </Link>
                </div>
              </div>
            </div>
                )
            }

        )}
            

            {/* <div className="col-md-4">
              <div className="card">
                <div className="card-header">Featured</div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllAddress
