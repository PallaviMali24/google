// src/components/CountryCodeSelect.jsx

import React, { useEffect, useState } from "react";

const CountryCodeSelect = ({ setCountryCode }) => {
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => {
        const codes = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountryCodes(codes);
      });
  }, []);

  return (
    <select onChange={(e) => setCountryCode(e.target.value)}>
      <option value="">Select Country Code</option>
      {countryCodes.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name} ({country.code})
        </option>
      ))}
    </select>
  );
};

export default CountryCodeSelect;
