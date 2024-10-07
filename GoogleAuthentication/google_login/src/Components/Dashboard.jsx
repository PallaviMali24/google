// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Dashboard = () => {
//   const [userInfo, setUserInfo] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await axios.get("http://localhost/backend/api.php");
//       setUserInfo(response.data);
//     };
//     fetchData();
//   }, []);

//   const handleLogout = async () => {
//     await axios.get("http://localhost/backend/api.php?action=logout");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="container">
//       <h2>User Dashboard</h2>
//       <p>First Name: {userInfo.first_name}</p>
//       <p>Last Name: {userInfo.last_name}</p>
//       <p>Email: {userInfo.email}</p>
//       <p>Mobile No: {userInfo.mobile_no}</p>
//       <p>Country Code: {userInfo.country_code}</p>
//       <button onClick={handleLogout} className="btn btn-danger">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Dashboard;


import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; 
import './Dashboard.css'; 
const Dashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        {/* <h1 className="display-4 text-primary font-weight-bold">Dashboard</h1> */}
        <p className="display-4 text-primary font-weight-bold">Welcome   {userInfo.first_name}</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg rounded-lg border-0">
            <div className="card-body p-5">
              <div className="d-flex justify-content-between mb-4">
                <h2 className="text-secondary">User Information</h2>
                <button
                  onClick={() => {
                    localStorage.removeItem("userInfo"); 
                    window.location.href = "/"; 
                  }}
                  className="btn btn-danger btn-sm"
                >
                  Logout
                </button>
              </div>

              {userInfo ? (
                <div className="row text-left">
                  <div className="col-md-6 mb-3">
                    <h5 className="text-muted">First Name</h5>
                    <p className="font-weight-bold">{userInfo.first_name}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="text-muted">Last Name</h5>
                    <p className="font-weight-bold">{userInfo.last_name}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="text-muted">Email</h5>
                    <p className="font-weight-bold">{userInfo.email}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="text-muted">Mobile No</h5>
                    <p className="font-weight-bold">{userInfo.mobile_no}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <h5 className="text-muted">Country Code</h5>
                    <p className="font-weight-bold">{userInfo.country_code}</p>
                  </div>
                </div>
              ) : (
                <div className="alert alert-warning" role="alert">
                  No user information found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
