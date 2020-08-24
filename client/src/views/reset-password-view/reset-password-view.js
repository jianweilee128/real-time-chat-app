import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../redux/user/user.actions";
import "./reset-password-view.scss";
import { connect } from "react-redux";

const ResetPasswordView = ({ match, resetPassword, resetPasswordSuccess }) => {
  const token = match.params.token;
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  const handleSubmit = () => {
    let passwordInput = passwordInputRef.current.value;
    let confirmPasswordInput = confirmPasswordInputRef.current.value;
    resetPassword(token, passwordInput, confirmPasswordInput);
    passwordInput = "";
    confirmPasswordInput = "";
  };

  return (
    <div className="reset-password-view-container">
      <div className="reset-password-border">
        {resetPasswordSuccess ? (
          <div className="reset-received-container">
            <span className="reset-received-message">
              Your password has been changed.
            </span>
            <Link to="/" className="back-to-login-btn">
              Back to login
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <h1>reset password</h1>
            <div className="reset-password-form">
              <div className="form-item">
                <label className="form-label">new password</label>
                <input
                  ref={passwordInputRef}
                  type="password"
                  className="password-input"
                  name="password"
                  placeholder="Enter your password..."
                />
              </div>
              <div className="form-item">
                <label className="form-label">new password confirm</label>
                <input
                  ref={confirmPasswordInputRef}
                  type="password"
                  className="password-input"
                  name="password"
                  placeholder="Enter your password again..."
                />
              </div>
              <div
                className="reset-password-btn"
                onClick={() => handleSubmit()}
              >
                reset password
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (token, newPassword, newPasswordConfirm) =>
    dispatch(resetPassword(token, newPassword, newPasswordConfirm)),
});

const mapStateToProps = (state) => {
  return {
    resetPasswordSuccess: state.user.resetPasswordSuccess,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordView);
