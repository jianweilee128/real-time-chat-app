import React from "react";
import "./auth-view.scss";
import LoginForm from "../../components/login-form/login-form.component";
import SignupForm from "../../components/signup-form/signup-form.component";

const AuthView = () => {
  return (
    <div className="auth-view-container">
      <div className="auth-form-container">
        <LoginForm />
      </div>
      <div className="auth-form-container">
        <SignupForm />
      </div>
    </div>
  );
};

export default AuthView;
