import React, { useState } from "react";
import "./signup-form.scss";
import { Redirect } from "react-router-dom";
import { signup, toggleLoginOrSignup } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignupForm = ({ signup, toggleLoginOrSignup, isAuthenticated }) => {
  const [formData, setFormData] = useState({});

  const handleSignup = () => {
    signup(
      formData.name,
      formData.email,
      formData.password,
      formData.passwordConfirm
    );
  };
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <Redirect to="/chat" />
      ) : (
        <div className="signup-form">
          <div className="form-options">
            <h1 className="login" onClick={() => toggleLoginOrSignup()}>
              login
            </h1>
            <h1>signup</h1>
          </div>
          <div className="form-item">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="signup-input"
              name="name"
              placeholder="Enter your name..."
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="signup-input"
              name="email"
              placeholder="Enter your email..."
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="signup-input"
              name="password"
              placeholder="Enter your password..."
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className="form-item">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="signup-input"
              name="confirm-password"
              placeholder="Enter your password again..."
              onChange={(e) =>
                setFormData({ ...formData, passwordConfirm: e.target.value })
              }
            />
          </div>
          <div className="signup-btn" onClick={() => handleSignup()}>
            signup
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signup: (name, email, password, passwordConfirm) =>
    dispatch(signup(name, email, password, passwordConfirm)),
  toggleLoginOrSignup: () => dispatch(toggleLoginOrSignup()),
});

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
