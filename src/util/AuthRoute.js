import React from "react";
import { Redirect, Route } from "react-router-dom";

//If user is authenticated -> send to home ('/' currently) : else render Component
const AuthRoute = ({ component: Component, userAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      userAuthenticated === true ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

export default AuthRoute;
