import React, { Component } from "react";

//MUI - Import 1 by 1 (tree shaking) to reduce sizes / speed up loading
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
//Set up like this as support for 'react-router-dom/link' will be removed in next major update
//Listed as an error in the console.
const Link = require("react-router-dom").Link;

export class Navbar extends Component {
  render() {
    return (
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
    );
  }
}

export default Navbar;
