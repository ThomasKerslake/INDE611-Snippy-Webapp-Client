import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
//Material UI ICONS
import CloseIcon from "@material-ui/icons/Close";
//Images / Other
import NotaMember from "../../images/NotaMember.png";
import Loadingdots from "../layout-Util-Comps/Loadingdots.js";

class Userprofile extends Component {
  render() {
    const {
      user: { loading, userAuthenticated },
    } = this.props;

    let userHintCard = !loading ? (
      userAuthenticated ? null : (
        <>
          <input type="checkbox" id="checkboxToggle" />
          <div className="hintCard" id="closeHint">
            <label className="closeBtn" htmlFor="checkboxToggle">
              <CloseIcon color="secondary" />
            </label>
            <div className="hintContainer">
              <img
                src={NotaMember}
                className="notMemberImage"
                alt="Not a member of snippy?"
              />
            </div>
            <div className="hintContainer">
              <h3 className="joinUsText">Come and join us!</h3>
            </div>
            <div className="hintContainer">
              <ul className="memberLoginOrSignup">
                <li className="hintLoginBtn">
                  <Link to="/login">Login</Link>
                </li>
                <li className="orBreak">or</li>
                <li className="hintSignupBtn">
                  <Link to="/signup">Signup</Link>
                </li>
              </ul>
            </div>
          </div>
        </>
      )
    ) : null;

    return userHintCard;
  }
}

Userprofile.propTypes = {
  user: PropTypes.object.isRequired,
};

//Bringing in the user global
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Userprofile);
