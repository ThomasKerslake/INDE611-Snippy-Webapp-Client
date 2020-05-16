import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Used for formating the times of post to show post times like twitter / fb
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Components
import DeleteUserSnippet from "../../components/snippetComps/DeleteUserSnippet";
import SnippetExpandDetails from "../../components/snippetComps/SnippetExpandDetails";
import LikeSnippetPost from "../../components/snippetComps/LikeSnippetPost";
//Material UI
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { Tooltip } from "@material-ui/core";
//Redux
import { connect } from "react-redux";

class Snippet extends Component {
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

    const userDeleteButton =
      userAuthenticated && userHandle == userName ? (
        <DeleteUserSnippet snipId={snipId} />
      ) : null;

    return (
      <div className="postCard">
        <div className="userInteraction">
          <ul className="interactionSelection">
            {userDeleteButton}
            <LikeSnippetPost snipId={snipId} />
            <SnippetExpandDetails
              snipId={snipId}
              userHandle={userHandle}
              openSnippetDialog={this.props.openSnippetDialog}
            />
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
              <Link to={`/users/${userHandle}`}>
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
              </Link>
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
  snip: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  openSnippetDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(Snippet);
