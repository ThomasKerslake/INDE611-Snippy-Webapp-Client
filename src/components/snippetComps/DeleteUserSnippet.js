import React, { Component } from "react";
import PropTypes from "prop-types";
//Material UI
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { Tooltip } from "@material-ui/core";
//redux
import { connect } from "react-redux";
import { deleteSnippetAction } from "../../redux/actions/dataActions";

class DeleteUserSnippet extends Component {
  state = {
    dialogOpen: false,
  };
  //Open & close dialog window
  openDeleteDialog = () => {
    this.setState({ dialogOpen: true });
  };
  closeDeleteDialog = () => {
    this.setState({ dialogOpen: false });
  };
  //using the delete snippet action from data actions
  deleteSnippet = () => {
    //Delete and close dialog window
    this.props.deleteSnippetAction(this.props.snipId);
    this.closeDeleteDialog();
  };
  render() {
    return (
      <>
        <Tooltip title="Delete Snippet" placement="top">
          <li className="interactionItemDelete" onClick={this.openDeleteDialog}>
            <DeleteIcon className="deleteIcon" />
          </li>
        </Tooltip>

        <Dialog
          open={this.state.dialogOpen}
          onClose={this.closeDeleteDialog}
          fullWidth
          maxWidth="sm"
        >
          <div className="dialogWrapper">
            <DialogTitle className="dialogTitle">
              Delete this code snippet post?
            </DialogTitle>
            <DialogContent>
              <p className="deleteDialogText">
                (are you sure you want to do this?)
              </p>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.closeDeleteDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={this.deleteSnippet} id="deleteDialogBtn">
                Delete
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </>
    );
  }
}

DeleteUserSnippet.propTypes = {
  deleteSnippetAction: PropTypes.func.isRequired,
  snipId: PropTypes.string.isRequired,
};

const mapActionsToProps = {
  deleteSnippetAction,
};

//Dont need to map state as snipId is passed to this component within snippet.js
export default connect(null, mapActionsToProps)(DeleteUserSnippet);
