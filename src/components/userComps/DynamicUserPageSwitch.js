import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Userprofile from "./Userprofile.js";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Tooltip } from "@material-ui/core";
//ICONS
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import TodayIcon from "@material-ui/icons/Today";

class DynamicUserPageSwitch extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      userpage: { userName, createdAt, imageUrl, website },
    } = this.props.data;

    //Check if the logged in user is same as userName coming from getting the users data
    //If they match, show button to edit website / allow users to change the profile images via clicking on image
    let loggedInUser = this.props.user.credentials.userName;
    const userStaticOrDynamicProfile =
      loggedInUser === userName ? (
        <Userprofile />
      ) : (
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
              <Tooltip title={`${userName}'s picture`} placement="top">
                <img
                  src={imageUrl}
                  className="userImage"
                  alt="UserProfileImage"
                />
              </Tooltip>
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
              </div>
            </div>
          </div>
        </div>
      );

    return userStaticOrDynamicProfile;
  }
}

DynamicUserPageSwitch.propTypes = {
  user: PropTypes.object.isRequired,
};

//Bringing in the user global
const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
});

export default connect(mapStateToProps)(DynamicUserPageSwitch);
