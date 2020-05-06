import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

//Components
import Snippet from "../components/Snippet.js";
import Userprofile from "../components/Userprofile.js";
import Loadingdots from "../components/Loadingdots.js";
import Navbar from "../components/Navbar";
//images
import symbolsBGlarge from "../images/BackgroundSymbols.png";

class home extends Component {
  //Setting the sates for the snippets
  state = {
    snips: null,
  };
  //Getting the snippets from snippy database with axios, using the proxy set in package.json
  componentDidMount() {
    axios
      .get("/snips")
      .then((res) => {
        //console.log(res.data);
        this.setState({
          snips: res.data,
        });
      })
      .catch((err) => console.log(err));
  }

  render() {
    //Checking for snips -> else say loading...
    let latestSnippets = this.state.snips ? (
      this.state.snips.map((snip) => <Snippet key={snip.snipId} snip={snip} />)
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
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    );
  }
}

export default home;
