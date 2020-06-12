import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import "./login-form.scss";
import { login, setCurrentUser } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LoginForm = ({ history, login, setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login(email, password).payload.then((data) => {
      if (data && data.status === "success") {
        setCurrentUser(data.user);
        return history.push({
          pathname: "/chat",
        });
      }
      return;
    });
  }

  return (
    <div className="login-form">
      <h1>Login</h1>
      <div className="form-item">
        <label className="form-label">Email</label>
        <input
          type="text"
          className="login-input"
          name="email"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-item">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="login-input"
          name="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Link to="/forgotPassword" className="forgot-password-button">
        Forgot Password?
      </Link>
      <div className="login-btn" onClick={() => handleLogin()}>
        login
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
