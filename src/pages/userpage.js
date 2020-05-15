import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import axios from "axios";
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

class userpage extends Component {
  state = {
    userPageProfile: null,
  };

  componentDidMount() {
    //app route for user page is /user/:userName, here we get that user name
    const userPageName = this.props.match.params.userName;
    this.props.getUserPageDataAction(userPageName);
    axios
      .get(`/user/${userPageName}`)
      .then((res) => {
        this.setState({
          userPageProfile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { snippets, loading } = this.props.data;

    const userSnippets = loading ? (
      <Loadingdots />
    ) : snippets === null ? (
      <h1>Sorry, this user seems to not have any Snippet posts.</h1>
    ) : (
      snippets.map((userPageSnippets) => (
        <Snippet key={userPageSnippets.snipId} snip={userPageSnippets} />
      ))
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
                {this.state.userPageProfile === null ? (
                  <Loadingdots />
                ) : (
                  <DynamicUserPageSwitch
                    userPageProfile={this.state.userPageProfile}
                  />
                )}
                {userSnippets}
              </Grid>
              <Grid item sm={2} xs={2}></Grid>
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
