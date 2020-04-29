import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

//react/redux
import { connect } from "react-redux";
import { userSignup } from "../redux/actions/userActions";
//Getting snippy logo
import snipLogo from "../images/snippyLogoName.png";

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      userName: "",
      errors: {},
    };
  }

  //seting the errors we get to the local errors so they show to the user
  componentWillReceiveProps(newProps) {
    if (newProps.UI.errors) {
      //if errors exist
      this.setState({ errors: newProps.UI.errors });
    }
  }

  takeSubmit = (eventSub) => {
    eventSub.preventDefault();
    this.setState({
      loading: true,
    });

    //getting states
    const newUserInfo = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      userName: this.state.userName,
    };
    //Using the signup function from userActions that is added here from the global state (see bottem)
    this.props.userSignup(newUserInfo, this.props.history);
  };

  //Getting the value of field (name) and setting state (value)
  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  render() {
    const {
      UI: { loading },
    } = this.props;
    const { errors } = this.state;

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

            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false} //if error in errors.confirmPassword -> true : 'else' false
              value={this.state.confirmPassword}
              onChange={this.takeChange}
              fullWidth
            />

            <TextField
              id="userName"
              name="userName"
              type="text"
              label="Username"
              helperText={errors.userName}
              error={errors.userName ? true : false} //if error in errors.userName -> true : 'else' false
              value={this.state.userName}
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
              Signup
              {loading && (
                <CircularProgress
                  size={30}
                  id="loadingSpin"
                  color="secondary"
                />
              )}
            </Button>
            <span id="noAccountRedirect">
              Already have an account?<Link to="/login">Login</Link>
            </span>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.propTypes = {
  userSignup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

//Bringing in the user and UI from the global state to be used within this signup component
//This is due to needing to use the states for users signing up
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

//should normally 'map actions to props' but as I'm only using 'userSignup' its not needed.
export default connect(mapStateToProps, { userSignup })(signup);
