import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Used for formating the times of post to show post times like twitter / fb
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Components
import DeleteUserSnippet from "../components/DeleteUserSnippet";
import SnippetExpandDetails from "../components/SnippetExpandDetails";
//Material UI
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Tooltip } from "@material-ui/core";
//Redux
import { connect } from "react-redux";
import {
  unlikeSnippetAction,
  likeSnippetAction,
} from "../redux/actions/dataActions";

class Snippet extends Component {
  userLikedSnippet = () => {
    //First checking to see if a user has likes and if there is a like with a matching snipid
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (userLike) => userLike.snipId === this.props.snip.snipId
      )
    )
      return true;
    else return false;
  };

  likeSnippet = () => {
    this.props.likeSnippetAction(this.props.snip.snipId);
  };
  unlikeSnippet = () => {
    this.props.unlikeSnippetAction(this.props.snip.snipId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      snip: {
        body,
        createdAt,
        snipDescription,
        snipTitle,
        snipType,
        userHandle,
        userProfileImage,
        numOfLikes,
        numOfComments,
        snipId,
      },
      user: {
        userAuthenticated,
        credentials: { userName },
      },
    } = this.props;

    //Checking if a user is logged in (authenticated) and if the user has liked this snippet
    const userLikeButton = !userAuthenticated ? (
      <Tooltip title="Like" placement="top">
        <Link to="/login">
          <li className="interactionItemLike">
            <FavoriteBorderIcon className="likeIcon" />
          </li>
        </Link>
      </Tooltip>
    ) : this.userLikedSnippet() ? (
      <Tooltip title="un-like" placement="top">
        <li className="interactionItemLike" onClick={this.unlikeSnippet}>
          <FavoriteIcon className="likeIcon" />
        </li>
      </Tooltip>
    ) : (
      <Tooltip title="like" placement="top">
        <li className="interactionItemLike" onClick={this.likeSnippet}>
          <FavoriteBorderIcon className="likeIcon" />
        </li>
      </Tooltip>
    );

    const userDeleteButton =
      userAuthenticated && userHandle == userName ? (
        <DeleteUserSnippet snipId={snipId} />
      ) : null;

    return (
      <div className="postCard">
        <div className="userInteraction">
          <ul className="interactionSelection">
            {userDeleteButton}
            {userLikeButton}
            <SnippetExpandDetails snipId={snipId} userHandle={userHandle} />
            <Tooltip title="Copy code!" placement="top">
              <li className="interactionItemCopy">
                <FileCopyIcon className="copyIcon" />
              </li>
            </Tooltip>
          </ul>
        </div>
        <div className="postInfoContainer">
          <div className="postDetails">
            <div className="postOverflowWrap">
              <h3 className="postTitle">{snipTitle}</h3>
              <div className="postType-TimeContainer">
                <span className="postType">{snipType}</span>
                <span className="postRelativeTime">
                  {dayjs(createdAt).fromNow()}
                </span>
              </div>
              <div className="postLowerDetials">
                <p className="postDescription">{snipDescription}</p>
              </div>
            </div>
            <div className="userImage-NameContainer">
              <div className="postImage">
                <img
                  src={userProfileImage}
                  className="userImage"
                  alt="UserProfileImage"
                />
              </div>
              <div className="postUser">
                <h4 className="postUserName">{userHandle}</h4>
              </div>
              <div className="postInteractionCounters">
                <span className="userLikes">
                  <FavoriteBorderIcon className="postLikeCount" />
                  {numOfLikes}
                </span>
                <span className="userComments">
                  <ChatBubbleOutlineIcon className="postCommentCount" />
                  {numOfComments}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown">
          <input type="checkbox" className="codeDropdown" id={snipId} />
          <label htmlFor={snipId} className="dropDownBtn">
            <div className="tempArrow">
              <ExpandMoreIcon />
            </div>
          </label>
          <ul className="codeSnippetList">
            <div className="listSpaceBreak"></div>
            <li className="codeSnippetItem">
              <pre>{body}</pre>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Snippet.propTypes = {
  unlikeSnippetAction: PropTypes.func.isRequired,
  likeSnippetAction: PropTypes.func.isRequired,
  snip: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  unlikeSnippetAction,
  likeSnippetAction,
};
export default connect(mapStateToProps, mapActionsToProps)(Snippet);
