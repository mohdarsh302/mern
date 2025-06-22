import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const Address = () => {
    //context
    const [auth, setAuth] = useAuth();

    //state
      const [fullName, setFullName] = useState("");
      const [phone, setPhone] = useState("");
      const [addressLine1, setAddressLine1] = useState("");
      const [addressLine2, setAddressLine2] = useState("");
      const [city, setCity] = useState("");
      const [state, setState] = useState("");
      const [country, setCountry] = useState("");
      const [postalCode, setPostalCode] = useState("");
      const [isDefault, setIsDefault] = useState("");

    // handle submit address
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API}/api/v1/auth/user-address`,
            {
              fullName,
              phone,
              addressLine1,
              addressLine2,
              city,
              state,
              country,
              postalCode,
              isDefault,
            }
          );
          if (data?.success) {
            toast.success("Address added successfully");
            // Clear form or redirect
          } else {
            toast.error(data?.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      };
  return (
    <Layout title={"Your Address"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">User Address</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Name"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Phone"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Address Line 1 "
                    
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                    className="form-control"
                    id="exampleInputPassword1"
                    placeholder="Enter Address Line 2"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your City"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your State"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Country"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Enter Your Postal Code"
                  />
                </div>

                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                        id="isDefault"
                    />
                    <label className="form-check-label" htmlFor="isDefault">
                        Set as Default Address
                    </label>
                    </div>

                <button type="submit" className="btn btn-primary">
                  Add Address
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Address
