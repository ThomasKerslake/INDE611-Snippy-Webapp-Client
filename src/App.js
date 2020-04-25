import React, { Component } from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import "./css/main.css";
//Components
import Navbar from "./components/Navbar";

//My pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#daabfb",
      main: "#c06cfc",
      dark: "#a254d9",
      contrastText: "#fff",
    },
    secondary: {
      light: "#5393ff",
      main: "#2979ff",
      dark: "#2161cc",
      contrastText: "#fff",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={myTheme}>
        <div className="App">
          <BRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <Route exact path="/login" component={login} />
                <Route exact path="/signup" component={signup} />
              </Switch>
            </div>
          </BRouter>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
