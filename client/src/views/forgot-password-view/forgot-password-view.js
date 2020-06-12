import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./forgot-password-view.scss";
import { connect } from "react-redux";
import { forgotPassword } from "../../redux/user/user.actions";

const ForgotPasswordView = ({ forgotPassword }) => {
  const [forgotPasswordSubmit, toggleForgotPasswordSubmit] = useState(false);
  const [emailInput, setEmailInput] = useState("");

  const handleForgotSubmit = (email) => {
    forgotPassword(email).payload.then((res) => {
      if (res.data && res.data.status === "success") {
        toggleForgotPasswordSubmit(true);
      } else {
        alert("Something happened. Please try again!");
      }
    });
  };

  return (
    <div className="forgot-password-view-container">
      <div className="forgot-password-border">
        {forgotPasswordSubmit ? (
          <div className="forgot-received-container">
            <span className="forgot-received-message">
              We have received your request to reset your password. <br />
              An email has been sent to the email provided.
            </span>
            <Link to="/" className="back-to-login-btn">
              back to login
            </Link>
          </div>
        ) : (
          <React.Fragment>
            <h1>forgot password</h1>
            <span>
              Don't worry! Resetting your password is easy. Just enter the email
              you used to register.
            </span>
            <div className="forgot-password-form">
              <div className="form-item">
                <label className="form-label">Email</label>
                <input
                  type="text"
                  className="email-input"
                  name="email"
                  placeholder="Enter your email address..."
                  onChange={(e) => setEmailInput(e.target.value)}
                />
              </div>
              <div
                className="forgot-password-btn"
                onClick={() => handleForgotSubmit(emailInput)}
              >
                send
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email) => dispatch(forgotPassword(email)),
});

export default connect(null, mapDispatchToProps)(ForgotPasswordView);
