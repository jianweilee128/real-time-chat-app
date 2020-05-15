import React from "react";
import { Link } from "react-router-dom";
import "./login-form.scss";

const LoginForm = () => (
  <div className="login-form">
    <h1>Login</h1>
    <div className="form-item">
      <label className="form-label">Email</label>
      <input
        type="text"
        className="login-input"
        name="email"
        placeholder="Enter your email..."
      />
    </div>
    <div className="form-item">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="login-input"
        name="password"
        placeholder="Enter your password..."
      />
    </div>
    <Link className="login-btn" to="/chat">
      Login
    </Link>
  </div>
);

export default LoginForm;
