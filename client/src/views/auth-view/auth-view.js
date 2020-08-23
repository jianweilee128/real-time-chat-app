import React from "react";
import "./auth-view.scss";
import LoginForm from "../../components/login-form/login-form.component";
import SignupForm from "../../components/signup-form/signup-form.component";
import { connect } from "react-redux";

const AuthView = ({ loginOrSignup }) => {
  return (
    <div className="auth-view-container">
      {loginOrSignup ? <SignupForm /> : <LoginForm />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loginOrSignup: state.user.loginOrSignup,
  };
};

export default connect(mapStateToProps)(AuthView);
