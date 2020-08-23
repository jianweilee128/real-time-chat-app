import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import "./login-form.scss";
import { login, toggleLoginOrSignup } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LoginForm = ({ login, toggleLoginOrSignup, isAuthenticated }) => {
  const [formData, setFormData] = useState({});

  const handleLogin = () => {
    login(formData.email, formData.password);
  };
  return (
    <React.Fragment>
      {isAuthenticated ? (
        <Redirect to="/chat" />
      ) : (
        <div className="login-form">
          <div className="form-options">
            <h1>login</h1>
            <h1 className="signup" onClick={() => toggleLoginOrSignup()}>
              signup
            </h1>
          </div>
          <div className="form-item">
            <label className="form-label">Email</label>
            <input
              type="text"
              className="login-input"
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
              className="login-input"
              name="password"
              placeholder="Enter your password..."
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <Link to="/forgotPassword" className="forgot-password-button">
            Forgot Password?
          </Link>
          <div className="login-btn" onClick={() => handleLogin()}>
            login
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  toggleLoginOrSignup: () => dispatch(toggleLoginOrSignup()),
});

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
