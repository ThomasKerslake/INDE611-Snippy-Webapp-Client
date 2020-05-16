import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Used for formating the times of post to show post times like twitter / fb
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { connect } from "react-redux";
import { userNotificationsAction } from "../../redux/actions/userActions";
//Material ui
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Tooltip } from "@material-ui/core";
import Badge from "@material-ui/core/Badge";
//Icons
import { IconButton } from "@material-ui/core";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

class UserNotifications extends Component {
  state = {
    menuPin: null,
  };

  openNotificationsMenu = (userEvent) => {
    this.setState({
      menuPin: userEvent.target,
    });
  };

  closeNotificationsMenu = () => {
    this.setState({
      menuPin: null,
    });
  };

  //Call to the backend to change the read on notification to true from false
  userOpensMenu = () => {
    let listOfUnreadNotifs = this.props.notifications
      .filter((notifs) => !notifs.read)
      .map((notifs) => notifs.notificationId);
    this.props.userNotificationsAction(listOfUnreadNotifs);
  };

  render() {
    dayjs.extend(relativeTime);
    let notificationTypeId;
    const notificationsOfUser = this.props.notifications;
    const menuPin = this.state.menuPin;
    //If there are stored notifications
    if (notificationsOfUser && notificationsOfUser.length > 0) {
      //filter for if there are any notification that have the read property of false
      notificationsOfUser.filter(
        (newNotifications) => newNotifications.read === false
      ).length > 0
        ? (notificationTypeId = ( //If there are notifications show badge with number of notifications
            <Badge
              badgeContent={
                notificationsOfUser.filter(
                  (newNotifications) => newNotifications.read === false
                ).length
              }
              color="primary"
            >
              <NotificationsIcon color="secondary" />
            </Badge>
          ))
        : (notificationTypeId = <NotificationsIcon color="secondary" />); //If there are no notifications show just button
    } else {
      //If there are no notifications thats read value is false show just button
      notificationTypeId = <NotificationsIcon color="secondary" />;
    }

    let listOfUserNotifications =
      notificationsOfUser && notificationsOfUser.length > 0 ? (
        notificationsOfUser.map((notifs) => {
          //Getting the 'type' that is sent with each notification to id what type action the notification is coresponding to
          // If equal to 'like' set label to 'liked'-> if its not 'like' then it can only be 'comment' -> set to 'commented'
          const labelType = notifs.type === "like" ? "liked" : "commented on";
          //If read -> dot will be grey : else dot will inherit colour from class
          const dotIconColour = notifs.read ? "secondary" : "inherit";
          //Time of the user action that created the notifiaction
          const timeOfAction = dayjs(notifs.createdAt).fromNow();
          //If its a like show dot with class "...like" : else "...comment"
          const dotIconColourType =
            notifs.type === "like" ? (
              <FiberManualRecordIcon
                className="dotIconLike"
                color={dotIconColour}
              />
            ) : (
              <FiberManualRecordIcon
                className="dotIconComment"
                color={dotIconColour}
              />
            );

          return (
            <MenuItem
              key={notifs.createdAt}
              onClick={this.openNotificationsMenu}
            >
              {dotIconColourType}
              <Link to={`/users/${notifs.recipient}/${notifs.snipId}`}>
                <span className="notificationText">
                  <span className="notificationSender">{notifs.sender}</span>{" "}
                  {labelType} your post {timeOfAction}
                </span>
              </Link>
            </MenuItem>
          );
        })
      ) : (
        <MenuItem onClick={this.closeNotificationsMenu}>
          No notifications!
        </MenuItem>
      );

    return (
      <>
        <Tooltip title="Notifications" placement="bottom">
          <IconButton
            aria-owns={menuPin ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.openNotificationsMenu}
          >
            {notificationTypeId}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={menuPin}
          open={Boolean(menuPin)}
          onClose={this.closeNotificationsMenu}
          onEntered={this.userOpensMenu}
          id="notificationMenu"
        >
          {listOfUserNotifications}
        </Menu>
      </>
    );
  }
}

UserNotifications.propTypes = {
  userNotificationsAction: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapActionsToProps = {
  userNotificationsAction,
};

export default connect(mapStateToProps, mapActionsToProps)(UserNotifications);
