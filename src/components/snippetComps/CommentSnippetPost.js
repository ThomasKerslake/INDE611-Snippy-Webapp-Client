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
        {comments.map((userComment, index) => {
          const {
            body,
            createdAt,
            snipId,
            userHandle,
            userProfileImage,
          } = userComment;

          //Use createdAt and index to provide a reliable unqie key
          return (
            <div key={createdAt + index}>
              <div className="commentCard">
                <div className="commentInfoContainer">
                  <Grid container spacing={0}>
                    <Grid item sm={2} xs={2}>
                      <Link to={`/users/${userHandle}`}>
                        <Tooltip title={userHandle} placement="bottom">
                          <div className="commentImage">
                            <img
                              src={userProfileImage}
                              className="commentUserImage"
                              alt="UserProfileImage"
                            />
                          </div>
                        </Tooltip>
                      </Link>
                    </Grid>
                    <Grid item sm={10} xs={10}>
                      <p className="commentBodyContent">{body}</p>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

CommentSnippetPost.propTypes = {
  comments: PropTypes.array,
};

export default CommentSnippetPost;
