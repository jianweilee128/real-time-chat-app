import React from "react";
import { withRouter } from "react-router-dom";
import "./nav-setting-dropdown.scss";
import {
  setToggleDelete,
  setToggleDropdown,
} from "../../redux/room/room.actions";
import { logout } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const NavSettingDropdown = ({
  setToggleDelete,
  setToggleDropdown,
  history,
  logout,
}) => {
  const handleLogout = () => {
    logout();
    return history.push({
      pathname: `/`,
    });
  };

  return (
    <div className="nav-setting-dropdown-container">
      <li
        onClick={() => {
          setToggleDropdown();
          setToggleDelete();
        }}
      >
        delete room
      </li>
      <li className="logout-button" onClick={() => handleLogout()}>
        logout
      </li>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  setToggleDelete: () => dispatch(setToggleDelete()),
  setToggleDropdown: () => dispatch(setToggleDropdown()),
  logout: () => dispatch(logout()),
});

export default withRouter(
  connect(null, mapDispatchToProps)(NavSettingDropdown)
);
