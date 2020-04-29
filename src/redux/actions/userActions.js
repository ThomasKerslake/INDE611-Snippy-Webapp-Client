import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
} from "../types";
import axios from "axios";
//Taken from the login.js -> logging in a user
export const userLogin = (userInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userInfo)
    .then((res) => {
      setHeaderForAuthorization(res.data.token);
      dispatch(getUserInfo());
      dispatch({ type: CLEAR_ERRORS });
      //send user to '/' directory
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const userSignup = (newUserInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/signup", newUserInfo)
    .then((res) => {
      setHeaderForAuthorization(res.data.token);
      dispatch(getUserInfo());
      dispatch({ type: CLEAR_ERRORS });
      //send user to '/' directory
      history.push("/");
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserInfo = () => (dispatch) => {
  axios
    .get("/user")
    .then((res) => {
      //Data to send back to reducer
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

//For logging out a user we need only remove the users login token from local storage
// and remove the header from axios that was set
export const userLogout = () => (dispatch) => {
  localStorage.removeItem("userTokenId");
  delete axios.defaults.headers.common["Authorization"];
  //Send back (dispatch) a type of 'state' for when the user is logged out
  //See userReducer.js for case when type is set to SET_UNAUTH...
  dispatch({ type: SET_UNAUTHENTICATED });
};

const setHeaderForAuthorization = (userToken) => {
  //Token created upon user login / user signup
  const userTokenId = `Bearer ${userToken}`;
  //Saving it to local storage
  localStorage.setItem("userTokenId", userTokenId);
  //Setting the header value for axios
  axios.defaults.headers.common["Authorization"] = userTokenId;
};
