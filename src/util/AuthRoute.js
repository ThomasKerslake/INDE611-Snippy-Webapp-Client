import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

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

const mapStateToProps = (state) => ({
  userAuthenticated: state.user.userAuthenticated,
});

AuthRoute.propTypes = {
  user: PropTypes.object,
};
export default connect(mapStateToProps, {})(AuthRoute);
