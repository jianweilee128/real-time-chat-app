import React, { useState } from "react";
import "./signup-form.scss";
import { withRouter } from "react-router-dom";
import { signup } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const SignupForm = ({ history, signup }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  function handleSignup() {
    signup(name, email, password, passwordConfirm).payload.then((data) => {
      if (data && data.status === "success") {
        return history.push({
          pathname: "/chat",
          state: { user: data.user },
        });
      }
      return;
    });
  }
  return (
    <div className="signup-form">
      <h1>signup</h1>
      <div className="form-item">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="signup-input"
          name="name"
          placeholder="Enter your name..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="signup-input"
          name="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="signup-input"
          name="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="signup-input"
          name="confirm-password"
          placeholder="Enter your password again..."
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </div>
      <div className="signup-btn" onClick={() => handleSignup()}>
        signup
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signup: (name, email, password, passwordConfirm) =>
    dispatch(signup(name, email, password, passwordConfirm)),
});

export default withRouter(connect(null, mapDispatchToProps)(SignupForm));
