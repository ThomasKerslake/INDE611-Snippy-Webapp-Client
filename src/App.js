import React, { Component } from "react";
import { BrowserRouter as BRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
import "./css/main.css";

//React-Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { userLogout, getUserInfo } from "./redux/actions/userActions";

//Util
import AuthRoute from "./util/AuthRoute";

//My pages
import home from "./pages/home";
import userpage from "./pages/userpage";
import landingpage from "./pages/landingpage";
import login from "./pages/login";
import signup from "./pages/signup";

//Setting the baseURL for axios to work when hosted on firebase
axios.defaults.baseURL =
  "https://europe-west1-snippy-929af.cloudfunctions.net/api";

//To be used for setting the color for most Material UI elements
const myTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#daabfb",
      main: "#c06cfc",
      dark: "#a254d9",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4b4b4b",
      contrastText: "#fff",
    },
  },
});

//Checking for local user token from a logged in user
const userToken = localStorage.userTokenId;
if (userToken) {
  const decodedUserToken = jwtDecode(userToken);
  //Get the user token expire time (which is stored in seconds) * 1000 to convert time from seconds
  //If less than (now) -> expired -> send user to login
  if (decodedUserToken.exp * 1000 < Date.now()) {
    store.dispatch(userLogout());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = userToken;
    store.dispatch(getUserInfo());
  }
}
//Wrap app in provider so everything has access to the store for G state management
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={myTheme}>
        <Provider store={store}>
          <BRouter>
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/landing" component={landingpage} />
              <Route exact path="/search/:snipType" component={home} />
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              <Route exact path="/users/:userName" component={userpage} />
              <Route
                exact
                path="/users/:userName/:snipId"
                component={userpage}
              />
            </Switch>
          </BRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
