import React from "react";

import './LoginModal.css'

function LoginModal({ onClose }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={onClose}>X</button>
        <div className="title">
          <h1>Admin Login</h1>
        </div>
        <div className="inputs">
          <input className="username" type="text" placeholder="Username" />
          <input className="password" type="password" placeholder="Password" />
        </div>
        <div className="footer">
          <button>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;