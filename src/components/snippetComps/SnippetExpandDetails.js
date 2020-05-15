import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Redux
import { connect } from "react-redux";
import {
  getSingleSnippetAction,
  emptyErrorsFromState,
} from "../../redux/actions/dataActions";
//Components
import Loadingdots from "../layout-Util-Comps/Loadingdots.js";
import CommentSnippetPost from "../snippetComps/CommentSnippetPost";
import CreateCommentPost from "../snippetComps/CreateCommentPost";
//Material UI
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import AddCommentIcon from "@material-ui/icons/AddComment";
import { Tooltip } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";

class SnippetExpandDetails extends Component {
  state = {
    dialogOpen: false,
  };
  //Open & close dialog window
  openPostsDialog = () => {
    this.setState({ dialogOpen: true });
    this.props.getSingleSnippetAction(this.props.snipId);
  };
  //Close dialog and clear errors
  closePostsDialog = () => {
    this.setState({ dialogOpen: false });
    this.props.emptyErrorsFromState();
  };

  //This component share styles from _snippetExpanded.css and snippet.css
  //(any class with Expanded or dialog added front or back is found in _snippetExpanded.css)
  render() {
    dayjs.extend(relativeTime);
    const {
      snip: {
        createdAt,
        body,
        snipDescription,
        snipTitle,
        snipType,
        userHandle,
        userProfileImage,
        numOfLikes,
        numOfComments,
        comments,
        snipId,
      },
      UI: { loading },
    } = this.props;

    const postDialogContent = loading ? (
      <div className="loadingDialogContainer">
        <Loadingdots />
      </div>
    ) : (
      <>
        <div className="postCardExpanded">
          <div className="postInfoContainer">
            <div className="postDetailsExpanded">
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
                  <Link to={`/users/${userHandle}`}>
                    <h4 className="postUserName">{userHandle}</h4>
                  </Link>
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
            <input
              type="checkbox"
              className="codeDropdown"
              id={snipId + "alt"}
            />
            <label htmlFor={snipId + "alt"} className="dropDownBtnDialog">
              <div className="tempArrow">
                <ExpandMoreIcon />
              </div>
            </label>
            <ul className="codeSnippetList">
              <div className="listSpaceBreak"></div>
              <li className="dialogCodeSnippetItem">
                <pre>{body}</pre>
              </li>
            </ul>
          </div>
        </div>
        <CreateCommentPost snipId={snipId} />
        <hr id="commentBreaker" />
        <CommentSnippetPost comments={comments} />
      </>
    );

    return (
      <>
        <Tooltip title="Comment" placement="top">
          <li className="interactionItemComment" onClick={this.openPostsDialog}>
            <AddCommentIcon className="commentIcon" />
          </li>
        </Tooltip>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closePostsDialog}
          fullWidth
          maxWidth="sm"
        >
          <div className="dialogWrapper">
            <DialogContent>{postDialogContent}</DialogContent>
          </div>
        </Dialog>
      </>
    );
  }
}

SnippetExpandDetails.propTypes = {
  getSingleSnippetAction: PropTypes.func.isRequired,
  emptyErrorsFromState: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  snipId: PropTypes.string.isRequired,
  snip: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  snip: state.data.snippet, //'snippet' from data reducer
});

const mapActionsToProps = {
  getSingleSnippetAction,
  emptyErrorsFromState,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(SnippetExpandDetails);
