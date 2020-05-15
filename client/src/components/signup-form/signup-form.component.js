import React from "react";
import "./signup-form.scss";
import { Link } from "react-router-dom";

const SignupForm = () => (
  <div className="signup-form">
    <h1>signup</h1>
    <div className="form-item">
      <label className="form-label">Name</label>
      <input
        type="text"
        className="signup-input"
        name="name"
        placeholder="Enter your name..."
      />
    </div>
    <div className="form-item">
      <label className="form-label">Email</label>
      <input
        type="text"
        className="signup-input"
        name="email"
        placeholder="Enter your email..."
      />
    </div>
    <div className="form-item">
      <label className="form-label">Password</label>
      <input
        type="password"
        className="signup-input"
        name="password"
        placeholder="Enter your password..."
      />
    </div>
    <div className="form-item">
      <label className="form-label">Confirm Password</label>
      <input
        type="password"
        className="signup-input"
        name="confirm-password"
        placeholder="Enter your password again..."
      />
    </div>
    <Link className="signup-btn" to="/chat">
      signup
    </Link>
  </div>
);

export default SignupForm;
