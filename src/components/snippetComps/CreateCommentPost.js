import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { commentSnippetAction } from "../../redux/actions/dataActions";
//components
import Loadingdots from "../layout-Util-Comps/Loadingdots.js";
//Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class CreateCommentPost extends Component {
  state = {
    body: "",
    errors: {},
  };

  componentWillReceiveProps(newProps) {
    if (newProps.UI.errors) {
      //if errors exist
      this.setState({ errors: newProps.UI.errors });
    }
    //If there are no errors and its not loading -> close dialog window -> clear field states
    if (!newProps.UI.errors && !newProps.UI.loading) {
      this.setState({
        errors: {},
        body: "",
      });
    }
  }

  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  //using the post snippet action from data actions
  submitUserComment = (eventSub) => {
    eventSub.preventDefault();
    const userComment = {
      body: this.state.body,
    };
    this.props.commentSnippetAction(this.props.snipId, userComment);
  };

  render() {
    const errors = this.state.errors;
    const {
      user: { userAuthenticated },
      UI: { loading },
    } = this.props;

    //If the user is logged in, show comment form else show message
    const userCommentForm = userAuthenticated ? (
      <>
        <div className="commentForm">
          <div className="commentFormContainer">
            <form onSubmit={this.submitUserComment}>
              <div className="textFieldBreak"></div>
              <TextField
                name="body"
                type="text"
                label="Post a comment"
                placeholder="Wow, sweet code snippet!"
                className="standardTextInput"
                helperText={errors.comment}
                error={errors.comment ? true : false}
                value={this.state.body}
                onChange={this.takeChange}
                fullWidth
              />
              <Button
                type="submit"
                id="commentBtn"
                disabled={loading}
                color="primary"
              >
                Comment
                {loading && <Loadingdots />}
              </Button>
            </form>
          </div>
        </div>
      </>
    ) : (
      <div className="commentCard">
        <div className="commentInfoContainer">
          <p className="commentFormLoginHint">
            You must be logged in to post a comment.
          </p>
          <Link to="/login">
            <Button id="commentBtn" disabled={loading} color="primary">
              Login
              {loading && <Loadingdots />}
            </Button>
          </Link>
        </div>
      </div>
    );

    return userCommentForm;
  }
}

CreateCommentPost.propTypes = {
  commentSnippetAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  snipId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  commentSnippetAction,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateCommentPost);
