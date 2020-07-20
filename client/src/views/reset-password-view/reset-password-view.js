import React, { useState } from "react";
import { Link } from "react-router-dom";
import { resetPassword } from "../../redux/user/user.actions";
import "./reset-password-view.scss";
import { connect } from "react-redux";

const ResetPasswordView = ({ match, resetPassword }) => {
  const token = match.params.token;
  const [resetPasswordSubmit, toggleResetPasswordSubmit] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  const handleResetSubmit = (passwordInput, passwordConfirmInput) => {
    resetPassword(token, passwordInput, passwordConfirmInput).payload.then(
      (res) => {
        if (res.data && res.data.status === "success") {
          toggleResetPasswordSubmit(true);
        } else {
          alert("Something happened. Please try again!");
        }
      }
    );
  };

  return (
    <div className="reset-password-view-container">
      <div className="reset-password-border">
        {resetPasswordSubmit ? (
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
                  type="password"
                  className="password-input"
                  name="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>
              <div className="form-item">
                <label className="form-label">new password confirm</label>
                <input
                  type="password"
                  className="password-input"
                  name="password"
                  placeholder="Enter your password again..."
                  onChange={(e) => setPasswordConfirmInput(e.target.value)}
                />
              </div>
              <div
                className="reset-password-btn"
                onClick={() =>
                  handleResetSubmit(passwordInput, passwordConfirmInput)
                }
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

export default connect(null, mapDispatchToProps)(ResetPasswordView);