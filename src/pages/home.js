import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
//Redux stuff
import { connect } from "react-redux";
import { getSnippetsAction } from "../redux/actions/dataActions";
//Components
import Snippet from "../components/snippetComps/Snippet.js";
import HintToLogin from "../components/layout-Util-Comps/HintToLogin.js";
import Loadingdots from "../components/layout-Util-Comps/Loadingdots.js";
import SearchBar from "../components/layout-Util-Comps/SearchBar.js";
import Navbar from "../components/layout-Util-Comps/Navbar";
import CreateSnippetPost from "../components/snippetComps/CreateSnippetPost";
//images
import symbolsBGlarge from "../images/BackgroundSymbols.png";

class home extends Component {
  //Getting the snippets from snippy database with axios, using the proxy set in package.json
  componentDidMount() {
    this.props.getSnippetsAction();
  }

  render() {
    const { snippets, loading } = this.props.data;
    //Checking for snips -> else loading...
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
                <SearchBar />
                {latestSnippets}
              </Grid>
              <Grid item sm={2} xs={2}>
                <HintToLogin />
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

// Bring in global data state
const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getSnippetsAction })(home);
