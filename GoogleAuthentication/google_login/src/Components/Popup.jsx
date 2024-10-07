import React from 'react';
import './Popup.css'; // Optional: Custom styling for Popup

const Popup = ({ message, isSuccess, onClose }) => {
  return (
    <div className={`popup ${isSuccess ? 'success' : 'error'}`}>
      <div className="popup-content">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
