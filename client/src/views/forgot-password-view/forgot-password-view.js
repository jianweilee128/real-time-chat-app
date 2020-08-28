import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./forgot-password-view.scss";
import { connect } from "react-redux";
import { forgotPassword } from "../../redux/user/user.actions";

const ForgotPasswordView = ({ forgotPassword, forgotPasswordSuccess }) => {
  const emailInputRef = useRef();
  const handleSubmit = () => {
    forgotPassword(emailInputRef.current.value);
    emailInputRef.current.value = "";
  };
  return (
    <div className="forgot-password-view-container">
      <div className="forgot-password-border">
        {forgotPasswordSuccess ? (
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
                  ref={emailInputRef}
                  type="text"
                  className="email-input"
                  name="email"
                  placeholder="Enter your email address..."
                />
              </div>
              <div
                className="forgot-password-btn"
                onClick={() => handleSubmit()}
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

const mapStateToProps = (state) => {
  return {
    forgotPasswordSuccess: state.user.forgotPasswordSuccess,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordView);
