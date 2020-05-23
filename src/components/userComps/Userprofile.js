import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Dayjs for user joined since
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { connect } from "react-redux";
import { imageUpload, userLogout } from "../../redux/actions/userActions";
//Material UI
import { Tooltip } from "@material-ui/core";
//ICONS
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import TodayIcon from "@material-ui/icons/Today";
//Images / Other
import Loadingdots from "../layout-Util-Comps/Loadingdots.js";
import EditUserInfoBtn from "../../components/userComps/EdituserInfo";

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
        credentials: { userName, imageUrl, createdAt, website },
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
            <div className="userProfileNameBG">
              <span className="userNameBG">{userName}</span>
            </div>
            <div className="userProfileName">
              <Link to={`/users/${userName}`} className="userName">
                {userName}
              </Link>
            </div>
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
            <div className="userProfileInfo">
              <div className="userExtraInfo">
                <ul>
                  <li>
                    {website && (
                      <a
                        href={website}
                        className="userLinks"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <InsertLinkIcon
                          color="secondary"
                          className="linkIcon"
                        />
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
      ) : null
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
