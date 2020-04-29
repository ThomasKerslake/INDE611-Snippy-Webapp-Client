import React, { Component } from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";
//Getting snippy logo
import snipLogo from "../images/snippyLogoName.png";
//React-Redux
import { connect } from "react-redux";
import { userLogin } from "../redux/actions/userActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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
    //getting states
    const userInfo = {
      email: this.state.email,
      password: this.state.password,
    };
    //Taken from login props that has had the global props added to it (see more at bottom)
    this.props.userLogin(userInfo, this.props.history);
  };

  //Getting the value of field (name) and setting state (value)
  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  render() {
    const { errors } = this.state;
    // Setting UI loading prop that is no longer set in login state but is now a prop
    // taken from the mapping global props
    const {
      UI: { loading },
    } = this.props;

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

login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

//Bringing in the user and UI from the global state to be used within this login component
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

//should normally 'map actions to props' but as I'm only using 'userLogin' its not needed.
export default connect(mapStateToProps, { userLogin })(login);
