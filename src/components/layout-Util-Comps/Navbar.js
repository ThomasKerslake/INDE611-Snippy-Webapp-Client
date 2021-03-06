import React, { Component } from "react";
import { userLogout } from "../../redux/actions/userActions";
import PropTypes from "prop-types";
//Redux
import { connect } from "react-redux";
//Components
import UserNotifications from "../userComps/UserNotifications";
import Loadingdots from "../layout-Util-Comps/Loadingdots.js";
//Material UI - Import separatly (tree shaking) to reduce sizes / speed up loading
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
//Icons
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
//images
import snipLogo from "../../images/snippyLogoName.png";

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
            <div className="navLogoContainer">
              <Link to="/" onClick={() => (window.location.href = "/")}>
                <Tooltip title="Home" placement="bottom">
                  <img src={snipLogo} id="navLogo" alt="Snippy Logo" />
                </Tooltip>
              </Link>
            </div>
            <div className="navActionsContainer">
              <div className="navButtons">
                <ul className="navActions">
                  <li className="notificationBtn">
                    <UserNotifications />
                  </li>
                  <li className="navUserProfile">
                    <Link
                      to={`/users/${userName}`}
                      onClick={() =>
                        (window.location.href = `/users/${userName}`)
                      }
                    >
                      <div className="navUserContainer">
                        <Tooltip
                          title={`Profile: ${userName}`}
                          placement="bottom"
                        >
                          <img
                            src={imageUrl}
                            className="navUserImage"
                            alt="UserProfileImage"
                            onClick={this.initiatePictureChange}
                          />
                        </Tooltip>
                      </div>
                    </Link>
                  </li>
                  <li className="logoutBtn" onClick={this.logoutThisUser}>
                    <Tooltip title="Logout" placement="bottom">
                      <ExitToAppIcon color="secondary" />
                    </Tooltip>
                  </li>
                </ul>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar>
          <Toolbar className="navbarContainer">
            <div className="navLogoContainer">
              <Link to="/">
                <img src={snipLogo} id="navLogo" alt="Snippy Logo" />
              </Link>
            </div>
            <div className="navActionsContainer">
              <div className="navButtons">
                <ul className="navActions">
                  <li className="login-signup-Btn">
                    <Link to="/login">Login</Link>
                  </li>
                  <li className="login-signup-Btn">
                    <Link to="/signup">Sign up</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      )
    ) : (
      <AppBar>
        <Toolbar className="navbarContainer">
          <div className="navLogoContainer">
            <Link to="/">
              <img src={snipLogo} id="navLogo" alt="Snippy Logo" />
            </Link>
          </div>
          <div className="navActionsContainer">
            <div id="navbarLoadingContainer">
              <Loadingdots />
            </div>
          </div>
        </Toolbar>
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
