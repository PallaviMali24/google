import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost/backend/api.php");
      setUserInfo(response.data);
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await axios.get("http://localhost/backend/api.php?action=logout");
    window.location.href = "/login";
  };

  return (
    <div className="container">
      <h2>User Dashboard</h2>
      <p>First Name: {userInfo.first_name}</p>
      <p>Last Name: {userInfo.last_name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Mobile No: {userInfo.mobile_no}</p>
      <p>Country Code: {userInfo.country_code}</p>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
