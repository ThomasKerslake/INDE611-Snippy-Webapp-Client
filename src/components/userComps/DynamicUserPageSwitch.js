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
      userPageProfile: { userName, createdAt, imageUrl, bio, website },
    } = this.props;

    let loggedInUser = this.props.user.credentials.userName;

    const userStaticOrDynamicProfile =
      loggedInUser === userName ? (
        <Userprofile />
      ) : (
        <div className="userProfileContainer">
          <div className="userProfileCard">
            <div className="userProfileBackgroundSlide"></div>
            <div className="userProfileImage">
              <Tooltip title="Change picture" placement="top">
                <img
                  src={imageUrl}
                  className="userImage"
                  alt="UserProfileImage"
                />
              </Tooltip>
            </div>
            <div className="userProfileName">
              <Link to={`/users/${userName}`} className="userName">
                {userName}
              </Link>
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
              </div>
            </div>
          </div>
        </div>
      );

    return userStaticOrDynamicProfile;
  }
}

DynamicUserPageSwitch.propTypes = {
  userPageProfile: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

//Bringing in the user global
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(DynamicUserPageSwitch);
