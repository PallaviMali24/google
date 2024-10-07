
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import './AuthForm.css'; // Assuming you create a custom CSS file

// const AuthForm = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     mobile_no: "",
//     country_code: "",
//     password: "",
//   });

//   const [isNewUser, setIsNewUser] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false); // State to control dropdown visibility
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         const countryData = response.data.map((country) => ({
//           name: country.name.common,
//           code: country.cca2,
//           dialCode: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
//         }));
//         setCountries(countryData);
//         setFilteredCountries(countryData); // Initialize filteredCountries
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSearchChange = (e) => {
//     const searchValue = e.target.value;
//     setSearchTerm(searchValue);
//     setSelectedCountry(null); // Reset selected country when typing
//     const filtered = countries.filter(country =>
//       country.name.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   };

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setFormData({ ...formData, country_code: country.dialCode });
//     setSearchTerm(country.name); // Set the input value to the selected country name
//     setFilteredCountries([]); // Clear the dropdown options
//     setShowDropdown(false); // Hide the dropdown after selection
//   };

//   const checkUserExists = async (email) => {
//     try {
//       const response = await axios.post("http://localhost/backend/api.php", {
//         email,
//         action: "check_user",
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error checking user:", error);
//       return null;
//     }
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const userCheckResponse = await checkUserExists(formData.email);
//     if (userCheckResponse && userCheckResponse.status === "success") {
//       localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
//       navigate("/dashboard");
//     } else {
//       try {
//         const response = await axios.post("http://localhost/backend/api.php", {
//           ...formData,
//           action: "register",
//         });
//         alert(response.data.message);
//         if (response.data.status === "success") {
//           localStorage.setItem("userInfo", JSON.stringify(formData));
//           navigate("/dashboard");
//         }
//       } catch (error) {
//         alert("Error registering user: " + error.response?.data?.message || "An error occurred");
//         console.error("Error registering user", error);
//       }
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const profile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//         });

//         const email = profile.data.email;
//         const userCheckResponse = await checkUserExists(email);

//         if (userCheckResponse && userCheckResponse.status === "success") {
//           localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
//           navigate("/dashboard");
//           return;
//         } else {
//           setFormData({
//             ...formData,
//             email: profile.data.email,
//             first_name: profile.data.given_name,
//             last_name: profile.data.family_name,
//           });
//           setIsNewUser(true);
//         }
//       } catch (error) {
//         alert("Google login failed: " + error.response?.data?.message || "An error occurred");
//         console.error("Google login failed", error);
//       }
//     },
//     onError: () => {
//       alert("Google login failed");
//       console.error("Google login failed");
//     }
//   });

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">{isNewUser ? "Complete Your Registration" : "Registration"}</h2>
//               <form onSubmit={handleRegisterSubmit} className="form-signin">
//                 {isNewUser && (
//                   <>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         placeholder="First Name"
//                         required
//                         className="form-control"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         placeholder="Last Name"
//                         required
//                         className="form-control"
//                       />
//                     </div>
//                   </>
//                 )}
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="mobile_no"
//                     value={formData.mobile_no}
//                     onChange={handleChange}
//                     placeholder="Mobile No"
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group position-relative">
//                   <input
//                     type="text"
//                     placeholder="Type Country..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     onFocus={() => setShowDropdown(true)} // Show dropdown on focus
//                     className="form-control"
//                   />
//                   {showDropdown && filteredCountries.length > 0 && (
//                     <ul className="list-group position-absolute" style={{ zIndex: 1000 }}>
//                       {filteredCountries.map(country => (
//                         <li 
//                           key={country.code} 
//                           className="list-group-item" 
//                           onClick={() => handleCountrySelect(country)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {country.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="country_code"
//                     value={formData.country_code}
//                     readOnly
//                     className="form-control"
//                     placeholder="Country Code"
//                   />
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Register</button>
//               </form>
//               <button onClick={() => googleLogin()} className="btn btn-secondary btn-block mt-3">
//                 Continue with Google
//               </button>
//               {/* <div className="text-center mt-3">
//                 <small>
//                   Already have an account? 
//                   <button className="btn btn-link" onClick={() => setIsNewUser(false)}>Log In</button>
//                 </small>
//               </div> */}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useGoogleLogin } from "@react-oauth/google";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import './AuthForm.css'; // Custom CSS file

// const AuthForm = () => {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     mobile_no: "",
//     country_code: "",
//     password: "",
//   });

//   const [isNewUser, setIsNewUser] = useState(false);
//   const [countries, setCountries] = useState([]);
//   const [filteredCountries, setFilteredCountries] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showDropdown, setShowDropdown] = useState(false); 
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await axios.get("https://restcountries.com/v3.1/all");
//         const countryData = response.data.map((country) => ({
//           name: country.name.common,
//           code: country.cca2,
//           dialCode: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
//         }));
//         setCountries(countryData);
//         setFilteredCountries(countryData); 
//       } catch (error) {
//         console.error("Error fetching countries:", error);
//       }
//     };

//     fetchCountries();
//   }, []);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSearchChange = (e) => {
//     const searchValue = e.target.value;
//     setSearchTerm(searchValue);
//     setSelectedCountry(null); 
//     const filtered = countries.filter(country =>
//       country.name.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   };

//   const handleCountrySelect = (country) => {
//     setSelectedCountry(country);
//     setFormData({ ...formData, country_code: country.dialCode });
//     setSearchTerm(country.name); 
//     setFilteredCountries([]); 
//     setShowDropdown(false); 
//   };

//   const checkUserExists = async (email) => {
//     try {
//       const response = await axios.post("http://localhost/backend/api.php", {
//         email,
//         action: "check_user",
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error checking user:", error);
//       return null;
//     }
//   };

//   const handleRegisterSubmit = async (e) => {
//     e.preventDefault();
//     const userCheckResponse = await checkUserExists(formData.email);
//     if (userCheckResponse && userCheckResponse.status === "success") {
//       localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
//       navigate("/dashboard");
//     } else {
//       try {
//         const response = await axios.post("http://localhost/backend/api.php", {
//           ...formData,
//           action: "register",
//         });
//         alert(response.data.message);
//         if (response.data.status === "success") {
//           localStorage.setItem("userInfo", JSON.stringify(formData));
//           navigate("/dashboard");
//         }
//       } catch (error) {
//         alert("Error registering user: " + error.response?.data?.message || "An error occurred");
//         console.error("Error registering user", error);
//       }
//     }
//   };

//   const googleLogin = useGoogleLogin({
//     onSuccess: async (tokenResponse) => {
//       try {
//         const profile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
//         });

//         const email = profile.data.email;
//         const userCheckResponse = await checkUserExists(email);

//         if (userCheckResponse && userCheckResponse.status === "success") {
//           localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
//           navigate("/dashboard");
//           return;
//         } else {
//           setFormData({
//             ...formData,
//             email: profile.data.email,
//             first_name: profile.data.given_name,
//             last_name: profile.data.family_name,
//           });
//           setIsNewUser(true);
//         }
//       } catch (error) {
//         alert("Google login failed: " + error.response?.data?.message || "An error occurred");
//         console.error("Google login failed", error);
//       }
//     },
//     onError: () => {
//       alert("Google login failed");
//       console.error("Google login failed");
//     }
//   });

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow">
//             <div className="card-body">
//               <h2 className="text-center mb-4">{isNewUser ? "Complete Your Registration" : "Registration"}</h2>
//               <form onSubmit={handleRegisterSubmit} className="form-signin">
//                 {isNewUser && (
//                   <>
//                     <div className="form-group mb-2">
//                       <input
//                         type="text"
//                         name="first_name"
//                         value={formData.first_name}
//                         onChange={handleChange}
//                         placeholder="First Name"
//                         required
//                         className="form-control"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <input
//                         type="text"
//                         name="last_name"
//                         value={formData.last_name}
//                         onChange={handleChange}
//                         placeholder="Last Name"
//                         required
//                         className="form-control"
//                       />
//                     </div>
//                   </>
//                 )}
//                 <div className="form-group">
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="Email"
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="mobile_no"
//                     value={formData.mobile_no}
//                     onChange={handleChange}
//                     placeholder="Mobile No"
//                     required
//                     className="form-control"
//                   />
//                 </div>
//                 <div className="form-group position-relative">
//                   <input
//                     type="text"
//                     placeholder="Type Country..."
//                     value={searchTerm}
//                     onChange={handleSearchChange}
//                     onFocus={() => setShowDropdown(true)} 
//                     className="form-control"
//                   />
//                   {showDropdown && filteredCountries.length > 0 && (
//                     <ul className="list-group position-absolute" style={{ zIndex: 1000 }}>
//                       {filteredCountries.map(country => (
//                         <li 
//                           key={country.code} 
//                           className="list-group-item" 
//                           onClick={() => handleCountrySelect(country)}
//                           style={{ cursor: "pointer" }}
//                         >
//                           {country.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     name="country_code"
//                     value={formData.country_code}
//                     readOnly
//                     className="form-control"
//                     placeholder="Country Code"
//                   /><br></br>
//                 </div>
//                 <button type="submit" className="btn btn-primary btn-block">Register</button>
//               </form>
//               <button onClick={() => googleLogin()} className="google-btn btn-block mt-3">
//                 <img
//                   src="https://img.icons8.com/color/48/000000/google-logo.png"
//                   alt="Google logo"
//                 />
//                 Continue with Google
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import './AuthForm.css'; 

const AuthForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_no: "",
    country_code: "",
    password: "",
  });

  const [isNewUser, setIsNewUser] = useState(false);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countryData = response.data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
          dialCode: country.idd?.root + (country.idd?.suffixes ? country.idd.suffixes[0] : ''),
        }));
        setCountries(countryData);
        setFilteredCountries(countryData); 
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setSelectedCountry(null); 
    const filtered = countries.filter(country =>
      country.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setFormData({ ...formData, country_code: country.dialCode });
    setSearchTerm(country.name); 
    setFilteredCountries([]); 
    setShowDropdown(false); 
  };

  const checkUserExists = async (email) => {
    try {
      const response = await axios.post("http://localhost/backend/api.php", {
        email,
        action: "check_user",
      });
      return response.data;
    } catch (error) {
      console.error("Error checking user:", error);
      return null;
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const userCheckResponse = await checkUserExists(formData.email);
    if (userCheckResponse && userCheckResponse.status === "success") {
      localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
      navigate("/dashboard");
    } else {
      try {
        const response = await axios.post("http://localhost/backend/api.php", {
          ...formData,
          action: "register",
        });
        alert(response.data.message);
        if (response.data.status === "success") {
          localStorage.setItem("userInfo", JSON.stringify(formData));
          navigate("/dashboard");
        }
      } catch (error) {
        alert("Error registering user: " + error.response?.data?.message || "An error occurred");
        console.error("Error registering user", error);
      }
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const profile = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        const email = profile.data.email;
        const userCheckResponse = await checkUserExists(email);

        if (userCheckResponse && userCheckResponse.status === "success") {
          localStorage.setItem("userInfo", JSON.stringify(userCheckResponse.data));
          navigate("/dashboard");
          return;
        } else {
          setFormData({
            ...formData,
            email: profile.data.email,
            first_name: profile.data.given_name,
            last_name: profile.data.family_name,
          });
          setIsNewUser(true);
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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">{isNewUser ? "Complete Your Registration" : "Registration"}</h2>
              <form onSubmit={handleRegisterSubmit} className="form-signin">
                <div className="form-group mb-2">
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
                <div className="form-group mb-2">
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
                <div className="form-group mb-2">
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
                <div className="form-group mb-2">
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
                <div className="form-group position-relative mb-2">
                  <input
                    type="text"
                    placeholder="Type Country..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onFocus={() => setShowDropdown(true)} 
                    className="form-control"
                  />
                  {showDropdown && filteredCountries.length > 0 && (
                    <ul className="list-group position-absolute" style={{ zIndex: 1000 }}>
                      {filteredCountries.map(country => (
                        <li 
                          key={country.code} 
                          className="list-group-item" 
                          onClick={() => handleCountrySelect(country)}
                          style={{ cursor: "pointer" }}
                        >
                          {country.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="form-group mb-2">
                  <input
                    type="text"
                    name="country_code"
                    value={formData.country_code}
                    readOnly
                    className="form-control"
                    placeholder="Country Code"
                  />
                </div>
                {/* <div className="form-group mb-2">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                    className="form-control"
                  />
                </div> */}
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
              <button onClick={() => googleLogin()} className="google-btn btn-block mt-3">
                <img
                  src="https://img.icons8.com/color/48/000000/google-logo.png"
                  alt="Google logo"
                />
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
