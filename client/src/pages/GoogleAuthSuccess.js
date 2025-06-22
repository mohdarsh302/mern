import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import axios from "axios";

const GoogleAuthSuccess = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/v1/auth/me", {
        headers: {
          Authorization: token
        }
      });

      const user = res.data.user;
      console.log("user data===>", user);

      localStorage.setItem("auth", JSON.stringify({ token, user }));
      setAuth({ token, user });

      toast.success("Logged in with Google!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch user data.");
    }
  };

  if (token) {
    fetchUser();
  } else {
    toast.error("Google login failed.");
  }
}, []);

  return <p>Logging you in...</p>;
};

export default GoogleAuthSuccess;
