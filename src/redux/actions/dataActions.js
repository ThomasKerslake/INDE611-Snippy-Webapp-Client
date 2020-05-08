import {
  SET_SNIPPETS,
  LIKE_SNIPPET,
  UNLIKE_SNIPPET,
  LOADING_DATA,
} from "../types";
import axios from "axios";

//Get all snippets from database
export const getSnippetsAction = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/snips")
    .then((res) => {
      //Setting payload to hold the response data
      dispatch({ type: SET_SNIPPETS, payload: res.data });
    })
    .catch((err) => {
      //If error return empty object (no snippets)
      dispatch({
        type: SET_SNIPPETS,
        payload: [],
      });
    });
};

// User liking users snippet post
export const likeSnippetAction = (snipId) => (dispatch) => {
  axios
    .get(`/snip/${snipId}/like`)
    .then((res) => {
      dispatch({ type: LIKE_SNIPPET, payload: res.data });
    })
    .catch((err) => console.log(err));
};

// User unliking users snippet post
export const unlikeSnippetAction = (snipId) => (dispatch) => {
  axios
    .get(`/snip/${snipId}/unlike`)
    .then((res) => {
      dispatch({ type: UNLIKE_SNIPPET, payload: res.data });
    })
    .catch((err) => console.log(err));
};
