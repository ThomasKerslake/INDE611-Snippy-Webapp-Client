import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
//Redux stuff
import { connect } from "react-redux";
import { getSnippetsAction } from "../redux/actions/dataActions";
//Components
import Snippet from "../components/Snippet.js";
import Userprofile from "../components/Userprofile.js";
import Loadingdots from "../components/Loadingdots.js";
import Navbar from "../components/Navbar";
import CreateSnippetPost from "../components/CreateSnippetPost";
//images
import symbolsBGlarge from "../images/BackgroundSymbols.png";

class home extends Component {
  //Getting the snippets from snippy database with axios, using the proxy set in package.json
  componentDidMount() {
    this.props.getSnippetsAction();
  }

  render() {
    const { snippets, loading } = this.props.data;
    //Checking for snips -> else say loading...
    let latestSnippets = !loading ? (
      snippets.map((snippet) => <Snippet key={snippet.snipId} snip={snippet} />)
    ) : (
      <Loadingdots />
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
                {latestSnippets}
              </Grid>
              <Grid item sm={2} xs={2}>
                <Userprofile />
                <CreateSnippetPost />
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

home.propTypes = {
  getSnippetsAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

// data: found in store.js that has dataReducer attached -> to home
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSnippetsAction })(home);
