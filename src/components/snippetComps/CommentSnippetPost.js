import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
//Matireal UI
import { Tooltip } from "@material-ui/core";

class CommentSnippetPost extends Component {
  render() {
    //Getting postowner via drilled prop
    const { comments, postowner } = this.props;
    return (
      <>
        {comments.map((userComment, index) => {
          const { body, createdAt, userHandle, userProfileImage } = userComment;

          //if the comment is from the posts owner, colour background of comment purple, text to white
          const userOrPostOwnerComment =
            postowner === userHandle ? (
              <div key={createdAt + index}>
                <div className="commentCard">
                  <div className="commentInfoContainer">
                    <Grid container spacing={0}>
                      <Grid item sm={2} xs={2}>
                        <Link
                          to={`/users/${userHandle}`}
                          onClick={() =>
                            (window.location.href = `/users/${userHandle}`)
                          }
                        >
                          <Tooltip
                            title={`Poster: ${userHandle}`}
                            placement="bottom"
                          >
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
                        <p className="ownerCommentBodyContent">{body}</p>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </div>
            ) : (
              <div key={createdAt + index}>
                <div className="commentCard">
                  <div className="commentInfoContainer">
                    <Grid container spacing={0}>
                      <Grid item sm={2} xs={2}>
                        <Link
                          to={`/users/${userHandle}`}
                          onClick={() =>
                            (window.location.href = `/users/${userHandle}`)
                          }
                        >
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
          //return either a user comment or a owners comnment
          return userOrPostOwnerComment;
        })}
      </>
    );
  }
}

CommentSnippetPost.propTypes = {
  comments: PropTypes.array,
};

export default CommentSnippetPost;
