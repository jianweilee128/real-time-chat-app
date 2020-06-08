import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import "./login-form.scss";
import { login } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const LoginForm = ({ history, login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() {
    login(email, password).payload.then((data) => {
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
      <div className="login-btn" onClick={() => handleLogin()}>
        login
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
});

export default withRouter(connect(null, mapDispatchToProps)(LoginForm));
