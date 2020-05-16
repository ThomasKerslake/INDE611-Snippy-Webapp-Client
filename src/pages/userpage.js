import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
//images
import noSnippets from "../images/noSnippets.png";
//Redux stuff
import { connect } from "react-redux";
import { getUserPageDataAction } from "../redux/actions/dataActions";
//Components
import Snippet from "../components/snippetComps/Snippet.js";
import Loadingdots from "../components/layout-Util-Comps/Loadingdots.js";
import Navbar from "../components/layout-Util-Comps/Navbar";
import DynamicUserPageSwitch from "../components/userComps/DynamicUserPageSwitch";
//images
import symbolsBGlarge from "../images/BackgroundSymbols.png";
//icons
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

class userpage extends Component {
  state = {
    snippetParamId: null,
  };
  componentDidMount() {
    const snipId = this.props.match.params.snipId;

    if (snipId) {
      this.setState({ snippetParamId: snipId });
    }
    //app route for user page is /user/:userName, here we get that user name
    const userPageName = this.props.match.params.userName;
    this.props.getUserPageDataAction(userPageName);
  }

  //Checking for any possible outcome for data to come back as empty
  checkEmpty = (data) => {
    if (
      data === null ||
      data === undefined ||
      JSON.stringify(data) === "{}" ||
      (typeof data === "object" && Object.keys(data).length === 0)
    )
      return true;
    else return false;
  };

  render() {
    const { snippets, loading } = this.props.data;
    const { snippetParamId } = this.state;
    //Checking for loading to be true -> if no snippets in array -> show message : else show snippets
    const userSnippets = loading ? (
      <Loadingdots />
    ) : this.checkEmpty(snippets) ? (
      <>
        <h1 id="noSnippetsText">
          Sorry, this user seems to not have any Snippet posts.
        </h1>
        <div className="noSnippetImageContainer">
          <div id="noSnippetsImage">
            <img src={noSnippets} alt="no snippets image" id="imageScale" />
          </div>
        </div>
      </>
    ) : !snippetParamId ? (
      snippets.map((userPageSnippets) => (
        <Snippet key={userPageSnippets.snipId} snip={userPageSnippets} />
      ))
    ) : (
      snippets.map((userPageSnippets) => {
        if (userPageSnippets.snipId !== snippetParamId) {
          return (
            <Snippet key={userPageSnippets.snipId} snip={userPageSnippets} />
          );
        } else {
          return (
            <Snippet
              key={userPageSnippets.snipId}
              snip={userPageSnippets}
              openSnippetDialog
            />
          );
        }
      })
    );
    return (
      <>
        <Navbar />
        <div className="largeSymbolsBG">
          <img src={symbolsBGlarge} id="largeBG" alt="background" />
          <div className="container">
            <Grid container spacing={10}>
              <Grid item sm={2} xs={2} />
              <Grid item sm={8} xs={8}>
                <div className="backBtnContainer">
                  <Link to="/">
                    <span className="userBackHomeBtn">
                      <KeyboardBackspaceIcon className="userBackArrow" />
                      Home
                    </span>
                  </Link>
                </div>
                {this.checkEmpty(this.props.data) ? (
                  <Loadingdots />
                ) : (
                  <DynamicUserPageSwitch />
                )}
                {userSnippets}
              </Grid>
              <Grid item sm={2} xs={2} />
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

userpage.propTypes = {
  getUserPageDataAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

// data: found in store.js
const mapStateToProps = (state) => ({
  data: state.data,
  user: state.user,
});

const mapActionsToProps = {
  getUserPageDataAction,
};

export default connect(mapStateToProps, mapActionsToProps)(userpage);
