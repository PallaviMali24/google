import React, { useState } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    country_code: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle User Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost/backend/api.php", {
        ...formData,
        action: "register",
      });
      alert(response.data.message);
      if (response.data.status === "success") {
        navigate("/dashboard");
      }
    } catch (error) {
      alert("Registration error: " + error.response?.data?.message || "An error occurred");
      console.error("Registration error", error);
    }
  };

  // Google Login Logic
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const mobile_no = prompt("Enter your mobile number"); // You might want to replace this with a proper input
        const country_code = prompt("Enter your country code"); // Same as above

        const data = {
          ...profile.data,
          given_name: profile.data.given_name,
          family_name: profile.data.family_name,
          email: profile.data.email,
          mobile_no,
          country_code,
          action: "google_login",
        };

        const response = await axios.post("http://localhost/backend/api.php", data);
        alert(response.data.message);
        if (response.data.status === "success") {
          navigate("/dashboard");
        }
      } catch (error) {
        alert("Google login failed: " + error.response?.data?.message || "An error occurred");
        console.error("Google login failed", error);
      }
    },
    onError: () => {
      alert("Google login failed");
      console.error("Google login failed");
    }
  });

  return (
    <div className="container">
      <form onSubmit={handleRegister} className="form-signin">
        <h2>Register</h2>
        <div className="form-group">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="First Name"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Last Name"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="mobile_no"
            value={formData.mobile_no}
            onChange={handleChange}
            placeholder="Mobile No"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="country_code"
            value={formData.country_code}
            onChange={handleChange}
            placeholder="Country Code"
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
        <button
          type="button"
          onClick={() => googleLogin()}
          className="btn btn-danger"
        >
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
