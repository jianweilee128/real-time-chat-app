import React from "react";
import { withRouter } from "react-router-dom";
import "./navigation-bar.scss";
import { logout } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const NavigationBar = ({ name, history, logout }) => {
  function handleLogout() {
    logout();
    return history.push({
      pathname: `/`,
    });
  }
  return (
    <div className="navigation-bar-container">
      <h4>{name}</h4>
      <div className="logout-button" onClick={() => handleLogout()}>
        Logout
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});

export default withRouter(connect(null, mapDispatchToProps)(NavigationBar));
