import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { Link } from "react-router-dom";
//Getting snippy logo
import snipLogo from "../images/snippyLogoName.png";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      errors: {},
    };
  }

  takeSubmit = (eventSub) => {
    eventSub.preventDefault();
    this.setState({
      loading: true,
    });

    //getting states
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post("/login", userInfo)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        //send user to '/' directory
        this.props.history.push("/");
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
      });
  };

  //Getting the value of field (name) and setting state (value)
  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  render() {
    const { errors, loading } = this.state;

    return (
      <Grid container id="formContainer">
        <Grid item sm />
        <Grid item sm>
          <img src={snipLogo} id="snippyLogo" alt="Snippy Logo" />
          <form noValidate onSubmit={this.takeSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false} //if error in errors.email -> true : 'else' false
              value={this.state.email}
              onChange={this.takeChange}
              fullWidth
            />

            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false} //if error in errors.password -> true : 'else' false
              value={this.state.password}
              onChange={this.takeChange}
              fullWidth
            />

            {errors.general && (
              <span id="incorrectError">{errors.general}</span>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              id="loginButton"
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  id="loadingSpin"
                  color="secondary"
                />
              )}
            </Button>
            <span id="noAccountRedirect">
              Dont have an account? <Link to="/signup">Sign up</Link>
            </span>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

login.propTypes = {};

export default login;
