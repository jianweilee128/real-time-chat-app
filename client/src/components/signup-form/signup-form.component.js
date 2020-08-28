import React, { useRef } from "react";
import "./signup-form.scss";
import { Redirect } from "react-router-dom";
import { signup, toggleLoginOrSignup } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignupForm = ({ signup, toggleLoginOrSignup, isAuthenticated }) => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleSignup = () => {
    signup(
      nameInputRef.current.value,
      emailInputRef.current.value,
      passwordInputRef.current.value,
      confirmPasswordInputRef.current.value
    );
    nameInputRef.current.value = "";
    emailInputRef.current.value = "";
    passwordInputRef.current.value = "";
    confirmPasswordInputRef.current.value = "";
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
              ref={nameInputRef}
              type="text"
              className="signup-input"
              name="name"
              placeholder="Enter your name..."
            />
          </div>
          <div className="form-item">
            <label className="form-label">Email</label>
            <input
              ref={emailInputRef}
              type="text"
              className="signup-input"
              name="email"
              placeholder="Enter your email..."
            />
          </div>
          <div className="form-item">
            <label className="form-label">Password</label>
            <input
              ref={passwordInputRef}
              type="password"
              className="signup-input"
              name="password"
              placeholder="Enter your password..."
            />
          </div>
          <div className="form-item">
            <label className="form-label">Confirm Password</label>
            <input
              ref={confirmPasswordInputRef}
              type="password"
              className="signup-input"
              name="confirm-password"
              placeholder="Enter your password again..."
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
