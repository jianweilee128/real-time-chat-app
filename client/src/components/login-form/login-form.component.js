import React, { useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import "./login-form.scss";
import { login, toggleLoginOrSignup } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LoginForm = ({ login, toggleLoginOrSignup, isAuthenticated }) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleLogin = () => {
    login(emailInputRef.current.value, passwordInputRef.current.value);
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
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
              ref={emailInputRef}
              type="text"
              className="login-input"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="form-item">
            <label className="form-label">Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              className="login-input"
              name="password"
              placeholder="Enter your password..."
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
