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

//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

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
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
              </Switch>
            </div>
          </BRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
