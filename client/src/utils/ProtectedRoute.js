import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...otherProps
}) => {
  return (
    <Route
      {...otherProps}
      render={(props) => {
        if (isAuthenticated) {
          return <Component {...otherProps} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          );
        }
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.user.isAuthenticated,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
