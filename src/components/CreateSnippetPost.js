import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import {
  postSnippetAction,
  emptyErrorsFromState,
} from "../redux/actions/dataActions";
//Components
import Loadingdots from "../components/Loadingdots.js";
//Material UI
import AddIcon from "@material-ui/icons/Add";
import { Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

const options = [
  "Other",
  "Angular",
  "C",
  "C#",
  "C++",
  "CSS",
  "Django",
  "HTML/CSS",
  "Java",
  "JavaScript",
  "jQuery",
  "Nodejs",
  "PHP",
  "Python",
  "Ruby",
  "Objective-C",
  "React/Redux",
  "React-Native",
  "SQL",
  "SASS",
  "TypeScript",
  "Unity",
  "Vue",
];

class CreateSnippetPost extends Component {
  state = {
    dialogOpen: false,
    snipTitle: "",
    snipDescription: "",
    body: "",
    snipType: "",
    errors: {},
  };

  //seting the errors we get to the local errors so they show to the user
  componentWillReceiveProps(newProps) {
    if (newProps.UI.errors) {
      //if errors exist
      this.setState({ errors: newProps.UI.errors });
    }
    //If there are no errors and its not loading -> close dialog window -> clear field states
    if (!newProps.UI.errors && !newProps.UI.loading) {
      this.setState({
        dialogOpen: false,
        errors: {},
        snipTitle: "",
        snipDescription: "",
        body: "",
        snipType: "",
      });
    }
  }

  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };
  //Open & close dialog window
  openSnippetPostDialog = () => {
    this.setState({ dialogOpen: true });
  };
  //Close dialog and clear errors
  closeSnippetPostDialog = () => {
    this.props.emptyErrorsFromState();
    this.setState({ dialogOpen: false, errors: {} });
  };
  //using the post snippet action from data actions
  submitUserPost = (eventSub) => {
    eventSub.preventDefault();
    const userPost = {
      snipTitle: this.state.snipTitle,
      snipDescription: this.state.snipDescription,
      body: this.state.body,
      snipType: this.state.snipType,
    };
    this.props.postSnippetAction(userPost);
  };

  render() {
    const {
      UI: { loading },
      user: { userAuthenticated },
    } = this.props;
    const { errors } = this.state;

    const userPostButton = !userAuthenticated ? (
      <div className="postSnippetContainer">
        <Tooltip title="Post a snippet" placement="top">
          <Link to="/login">
            <div className="postSnippetBtn">
              <AddIcon className="postSnippetIcon" />
            </div>
          </Link>
        </Tooltip>
      </div>
    ) : (
      <div className="postSnippetContainer">
        <Tooltip title="Post a snippet" placement="top">
          <div className="postSnippetBtn" onClick={this.openSnippetPostDialog}>
            <AddIcon className="postSnippetIcon" />
          </div>
        </Tooltip>
      </div>
    );

    return (
      <>
        {userPostButton}

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeSnippetPostDialog}
          fullWidth
          maxWidth="sm"
        >
          <div className="dialogWrapper">
            <DialogTitle className="dialogTitle">
              Tell us about your code snippet!
            </DialogTitle>
            <DialogContent>
              <form onSubmit={this.submitUserPost}>
                <TextField
                  name="snipTitle"
                  type="text"
                  label="Title of your snippet post"
                  placeholder="example... 'CSS Rounded Buttons pack'"
                  className="standardTextInput"
                  helperText={errors.snipTitle}
                  error={errors.snipTitle ? true : false}
                  value={this.state.snipTitle}
                  onChange={this.takeChange}
                  fullWidth
                />
                <div className="textFieldBreak"></div>
                <TextField
                  name="snipDescription"
                  type="text"
                  label="Description"
                  placeholder="Whats does it do, any extra details..."
                  className="standardTextInput"
                  helperText={errors.snipDescription}
                  error={errors.snipDescription ? true : false}
                  value={this.state.snipDescription}
                  onChange={this.takeChange}
                  fullWidth
                />
                <div className="textFieldBreak"></div>
                <FormControl error={errors.snipType ? true : false}>
                  <InputLabel htmlFor="snippet-type">Snippet type</InputLabel>
                  <NativeSelect
                    value={this.state.snipType}
                    onChange={this.takeChange}
                    inputProps={{
                      name: "snipType",
                      id: "snippet-type",
                    }}
                  >
                    <option key="emptyVal" value=""></option>
                    {options.map((typeOption) => (
                      <option key={typeOption} value={typeOption}>
                        {typeOption}
                      </option>
                    ))}
                  </NativeSelect>
                  <FormHelperText>{errors.snipType}</FormHelperText>
                </FormControl>
                <div className="textFieldBreak"></div>
                <TextField
                  name="body"
                  type="text"
                  label="Your code snippet"
                  multiline
                  rows="5"
                  placeholder="console.log('This is some amazing code');"
                  className="standardTextInput"
                  helperText={errors.body}
                  error={errors.body ? true : false}
                  value={this.state.body}
                  onChange={this.takeChange}
                  fullWidth
                />

                <DialogActions className="postBtnContainer">
                  <Button onClick={this.closeSnippetPostDialog} color="primary">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="postBtn"
                    disabled={loading}
                    color="primary"
                  >
                    Post
                    {loading && <Loadingdots />}
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </div>
        </Dialog>
      </>
    );
  }
}

CreateSnippetPost.propTypes = {
  postSnippetAction: PropTypes.func.isRequired,
  emptyErrorsFromState: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  user: state.user,
});

const mapActionsToProps = {
  postSnippetAction,
  emptyErrorsFromState,
};

export default connect(mapStateToProps, mapActionsToProps)(CreateSnippetPost);
