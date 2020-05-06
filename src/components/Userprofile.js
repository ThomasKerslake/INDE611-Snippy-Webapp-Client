import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Dayjs for user joined since
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { connect } from "react-redux";
import { imageUpload, userLogout } from "../redux/actions/userActions";
//MUI
import Button from "@material-ui/core/Button";
import { Tooltip } from "@material-ui/core";
//ICONS
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import TodayIcon from "@material-ui/icons/Today";
import CloseIcon from "@material-ui/icons/Close";
//Images / Other
import NotaMember from "../images/NotaMember.png";
import Loadingdots from "../components/Loadingdots.js";
import EditUserInfoBtn from "../components/EdituserInfo";

class Userprofile extends Component {
  //Profile image uploading for a user
  userUploadsImage = (event) => {
    //Get the first file selected
    const userImage = event.target.files[0];
    const userFormData = new FormData();
    userFormData.append("image", userImage, userImage.name);
    this.props.imageUpload(userFormData);
  };

  initiatePictureChange = () => {
    const userInput = document.getElementById("imageUpload");
    userInput.click();
  };

  render() {
    //Used for getting relative time since users joined
    dayjs.extend(relativeTime);
    const {
      user: {
        credentials: { userName, imageUrl, createdAt, website, bio },
        loading,
        userAuthenticated,
      },
    } = this.props;

    //If the page is not loading check if authenticated : else show loading animation ->
    // If authenticated ->
    let userProfileCard = !loading ? (
      userAuthenticated ? (
        <div className="userProfileContainer">
          <div className="userProfileCard">
            <div className="userProfileBackgroundSlide"></div>
            <div className="userProfileImage">
              <Tooltip title="Change picture" placement="top">
                <img
                  src={imageUrl}
                  className="userImage"
                  alt="UserProfileImage"
                  onClick={this.initiatePictureChange}
                />
              </Tooltip>
              <input
                type="file"
                id="imageUpload"
                hidden="hidden"
                onChange={this.userUploadsImage}
              />
            </div>
            <div className="userProfileName">
              <a
                className="userName"
                component={Link}
                to={`/users/${userName}`}
              >
                {userName}
              </a>
            </div>
            <div className="userProfileInfo">
              <div className="userExtraInfo">
                <ul>
                  <li>{bio && <h4 className="userBio">{bio}</h4>}</li>
                  <li>
                    {website && (
                      <a
                        href={website}
                        className="userLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InsertLinkIcon color="primary" className="linkIcon" />
                        {website}
                      </a>
                    )}
                  </li>
                  <li>
                    <h4 className="userJoinDate">
                      <TodayIcon color="secondary" className="linkIcon" />
                      Member since: {dayjs(createdAt).fromNow()}
                    </h4>
                  </li>
                </ul>
                <EditUserInfoBtn />
              </div>
            </div>
          </div>
        </div>
      ) : (
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
    ) : (
      <Loadingdots />
    );

    return userProfileCard;
  }
}

Userprofile.propTypes = {
  user: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
  imageUpload: PropTypes.func.isRequired,
};

//Bringing in the user global
const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = { imageUpload, userLogout };

export default connect(mapStateToProps, mapActionsToProps)(Userprofile);
