import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
//Used for formating the times of post to show post times like twitter / fb
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//Material UI
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Tooltip } from "@material-ui/core";
//Redux
import { connect } from "react-redux";
import {
  unlikeSnippetAction,
  likeSnippetAction,
} from "../../redux/actions/dataActions";

class LikeSnippetPost extends Component {
  userLikedSnippet = () => {
    //First checking to see if a user has likes and if there is a like with a matching snipid
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (userLike) => userLike.snipId === this.props.snipId
      )
    )
      return true;
    else return false;
  };

  likeSnippet = () => {
    this.props.likeSnippetAction(this.props.snipId);
  };
  unlikeSnippet = () => {
    this.props.unlikeSnippetAction(this.props.snipId);
  };
  render() {
    dayjs.extend(relativeTime);
    const {
      user: { userAuthenticated },
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

    return userLikeButton;
  }
}

LikeSnippetPost.propTypes = {
  unlikeSnippetAction: PropTypes.func.isRequired,
  likeSnippetAction: PropTypes.func.isRequired,
  snipId: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  unlikeSnippetAction,
  likeSnippetAction,
};
export default connect(mapStateToProps, mapActionsToProps)(LikeSnippetPost);
