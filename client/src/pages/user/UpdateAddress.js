import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateAddress = () => {
    const navigate = useNavigate();
    const [auth] = useAuth();
    const params = useParams();
    const [addressData, setAddressData] = useState({
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      isDefault: false,
    });
  
    useEffect(() => {
      const fetchAddress = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/address/${params.id}`);
        if (data?.success) setAddressData(data.address);
      };
      fetchAddress();
    }, [params.id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setAddressData({
          ...addressData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/auth/update-address/${params.id}`,
            addressData
          );
          if (data?.success) {
            navigate("/dashboard/user/all-addresses")
            toast.success("Address updated successfully");

          } else {
            toast.error(data?.message);
          }
        } catch (err) {
          console.log(err);
          toast.error("Error updating address");
        }
      };
          
  return (
    <Layout title={"Update Address"}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-8">
          <div className="form-container" style={{ marginTop: "-40px" }}>
          <form onSubmit={handleSubmit}>
                {["fullName", "phone", "addressLine1", "addressLine2", "city", "state", "country", "postalCode"].map((field) => (
                  <div className="mb-3" key={field}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Enter ${field}`}
                      name={field}
                      value={addressData[field]}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="isDefault"
                    checked={addressData.isDefault}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Set as default</label>
                </div>

                <button className="btn btn-primary" type="submit">
                  Update Address
                </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateAddress
