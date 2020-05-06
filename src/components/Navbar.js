import React, { Component } from "react";
import { userLogout } from "../redux/actions/userActions";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
//MUI - Import 1 by 1 (tree shaking) to reduce sizes / speed up loading
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Set up like this as support for 'react-router-dom/link' will be removed in next major update
//Listed as an error in the console.
const Link = require("react-router-dom").Link;

class Navbar extends Component {
  logoutThisUser = () => {
    this.props.userLogout();
  };

  render() {
    const {
      user: {
        credentials: { userName, imageUrl },
        loading,
        userAuthenticated,
      },
    } = this.props;

    let userProfileCard = !loading ? (
      userAuthenticated ? (
        <AppBar>
          <Toolbar className="navbarContainer">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" onClick={this.logoutThisUser}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar className="navbarContainer">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      )
    ) : (
      <AppBar>
        <Toolbar className="navbarContainer"></Toolbar>
      </AppBar>
    );

    return userProfileCard;
  }
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
};

//Bringing in the user global
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { userLogout };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
