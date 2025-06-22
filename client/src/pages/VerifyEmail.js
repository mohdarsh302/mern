import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying...");
  const navigate = useNavigate();
  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("Invalid verification link.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/verify-email?token=${token}`
        );
        setStatus(response.data.message || "Email verified!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        setStatus(error.response?.data?.message || "Verification failed.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <Layout title={"Contact us"}>
      <div className="row contactus ">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2>{status}</h2>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyEmail;
