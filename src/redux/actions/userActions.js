import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_NOTIFICATIONS_AS_READ,
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

//Used to obtain a users info and be called apon in other functions that require this info
export const getUserInfo = () => (dispatch) => {
  dispatch({ type: LOADING_USER }); //Set to loading
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

export const userNotificationsAction = (userNotification) => (dispatch) => {
  axios
    .post("/notifications", userNotification)
    .then((res) => {
      dispatch({ type: SET_NOTIFICATIONS_AS_READ });
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

//Handling user image uploading to be used in userprofile.js
export const imageUpload = (userFormData) => (dispatch) => {
  dispatch({ type: LOADING_USER }); //Set to loading
  axios
    .post("/user/image", userFormData)
    .then((res) => {
      dispatch(getUserInfo()); //Get the users profile data again
    })
    .catch((err) => console.log(err));
};

//Used for when a user wants to change there profile data
export const updateUserInfo = (userInfo) => (dispatch) => {
  dispatch({ type: LOADING_USER }); //Set to loading
  axios
    .post("/user", userInfo)
    .then(() => {
      dispatch(getUserInfo());
    })
    .catch((err) => console.log(err));
};
