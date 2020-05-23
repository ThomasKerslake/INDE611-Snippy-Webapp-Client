import React, { Component } from "react";
import PropTypes from "prop-types";
//Useractions
import { updateUserInfo } from "../../redux/actions/userActions";
//icons & MUI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { Tooltip } from "@material-ui/core";
//Redux
import { connect } from "react-redux";

class EdituserInfo extends Component {
  state = {
    dialogOpen: false,
    website: "",
  };

  mapUserInfo = (credentials) => {
    this.setState({
      website: credentials.website ? credentials.website : "",
    });
  };

  componentDidMount() {
    //creds to props
    const { credentials } = this.props;
    this.mapUserInfo(credentials);
  }

  openDialog = () => {
    this.setState({
      dialogOpen: true,
    });
    this.mapUserInfo(this.props.credentials);
  };

  closeDialog = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  takeChange = (eventChange) => {
    this.setState({
      [eventChange.target.name]: eventChange.target.value,
    });
  };

  //Using function for updating user info from user actions -> passing new info
  submitUserInfo = () => {
    const userInfo = {
      website: this.state.website,
    };
    this.props.updateUserInfo(userInfo);
    this.closeDialog();
  };

  render() {
    return (
      <>
        <div className="editInfoBtn" onClick={this.openDialog}>
          <Tooltip title="Update your details">
            <PostAddIcon />
          </Tooltip>
        </div>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDialog}
          fullWidth
          maxWidth="sm"
        >
          <div className="dialogWrapper">
            <DialogTitle className="dialogTitle">
              Add / Update your website link
            </DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  name="website"
                  type="text"
                  label="Show us what you make"
                  placeholder="http://myamazingwebsite.com"
                  className="standardTextInput"
                  value={this.state.website}
                  onChange={this.takeChange}
                  fullWidth
                />
              </form>
            </DialogContent>
            <div className="textFieldBreak"></div>
            <DialogActions>
              <Button onClick={this.closeDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.submitUserInfo} color="primary">
                Update
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  }
}

EdituserInfo.propTypes = {
  updateUserInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

export default connect(mapStateToProps, { updateUserInfo })(EdituserInfo);
