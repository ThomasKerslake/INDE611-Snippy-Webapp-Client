import React, { Component } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

//Components
import Snippet from "../components/Snippet.js";

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
      <p>loading</p>
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {latestSnippets}
        </Grid>
        <Grid item sm={4} xs={12}>
          <p>profile.....</p>
        </Grid>
      </Grid>
    );
  }
}

export default home;
