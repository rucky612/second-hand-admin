import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import mockAuth from "./Login/constants";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      mockAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object,
    PropTypes.node
  ]).isRequired,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
