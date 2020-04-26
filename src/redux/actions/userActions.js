import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../types";
import axios from "axios";
//Taken from the login.js -> logging in a user
export const userLogin = (userInfo, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/login", userInfo)
    .then((res) => {
      //Token created upon user login
      const userTokenId = `Bearer ${res.data.token}`;
      //Saving it to local storage
      localStorage.setItem("userTokenId", userTokenId);
      //Setting the header value in axios
      axios.defaults.headers.common["Authorization"] = userTokenId;
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
