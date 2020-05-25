import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
//Components
import Loadingdots from "../components/layout-Util-Comps/Loadingdots.js";
import LoginSVGs from "../components/pagesvgs/LoginSVGs.js";
//react/redux
import { connect } from "react-redux";
import { userSignup } from "../redux/actions/userActions";
//Getting images
import snipLogo from "../images/snippyLogoName.png";
import symbolBG from "../images/SmallBG.png";
//Icons
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

const overflowSET = "overflowSwitch";
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

  //Used to set the bodies overflow to hidden when signup mounts
  componentDidMount() {
    document.body.classList.add(overflowSET);
  }
  //Used to remove style overflowSet when signup unmounts so its not affecting other pages
  componentWillUnmount() {
    document.body.classList.remove(overflowSET);
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
      <div className="loginSignupBG">
        <Link to="/">
          <span className="backHomeBtn">
            <KeyboardBackspaceIcon className="backArrow" />
            Home
          </span>
        </Link>

        <div className="welcomeTextContainer">
          <span className="welcomeText-1">Hi</span>
          <span className="welcomeText-2">Nice to meet you,</span>
          <span className="welcomeText-3">welcome to Snippy.</span>
        </div>
        <img src={symbolBG} id="symbolBG" alt="background" />
        <div className="loginSignupContainer">
          <div className="spaceBlock"></div>
          <img src={snipLogo} id="snippyLogo" alt="Snippy Logo" />
          <div className="centerLogin">
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
                {loading && <Loadingdots />}
              </Button>

              <div className="bringForward">
                <span id="noAccountRedirect">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="redirectHint">Login</span>
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        <LoginSVGs />
      </div>
    );
  }
}

signup.propTypes = {
  userSignup: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

//Bringing in the user and UI from the global state
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

//should normally 'map actions to props' but as I'm only using 'userSignup' its not needed.
export default connect(mapStateToProps, { userSignup })(signup);
