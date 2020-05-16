import React from "react";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

const NavigationBar = () => (
  <div className="navigation-bar-container">
    <h4>Sam Smith</h4>
    <Link className="logout-button" to="/">
      Logout
    </Link>
  </div>
);

export default NavigationBar;
