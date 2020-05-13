import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
//Matireal UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { Tooltip } from "@material-ui/core";

class CommentSnippetPost extends Component {
  render() {
    const { comments } = this.props;
    return (
      <>
        {comments.map((userComment) => {
          const {
            body,
            createdAt,
            snipId,
            userHandle,
            userProfileImage,
          } = userComment;

          return (
            <div className="commentCard" key={createdAt}>
              <div className="commentInfoContainer">
                <Grid container spacing={0}>
                  <Grid item sm={2} xs={2}>
                    <Link to={`/users/${userHandle}`}>
                      <div className="commentImage">
                        <img
                          src={userProfileImage}
                          className="commentUserImage"
                          alt="UserProfileImage"
                        />
                      </div>
                    </Link>
                  </Grid>
                  <Grid item sm={10} xs={10}>
                    <p>{body}</p>
                  </Grid>
                </Grid>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

CommentSnippetPost.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default CommentSnippetPost;
