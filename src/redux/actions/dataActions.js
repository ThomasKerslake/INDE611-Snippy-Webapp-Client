import {
  SET_SNIPPETS,
  SET_SNIPPET,
  DELETE_SNIPPET,
  LIKE_SNIPPET,
  UNLIKE_SNIPPET,
  LOADING_DATA,
  LOADING_UI,
  END_UI_LOADING,
  POST_SNIPPET,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

//Used for removing error messages out of the state so they dont popup unnecessarily
export const emptyErrorsFromState = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

//Used for when a user posts a new code snippet
export const postSnippetAction = (newSnippetPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/snip", newSnippetPost)
    .then((res) => {
      dispatch({ type: POST_SNIPPET, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      //As set up prior, if user causes an error posting, error must be shown via UI
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

export const getSingleSnippetAction = (snipId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/snip/${snipId}`)
    .then((res) => {
      dispatch({ type: SET_SNIPPET, payload: res.data });
      dispatch({ type: END_UI_LOADING });
    })
    .catch((err) => console.log(err));
};

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

//Deleting a users snippet
export const deleteSnippetAction = (snipId) => (dispatch) => {
  axios
    .delete(`/snip/${snipId}`)
    .then(() => {
      dispatch({ type: DELETE_SNIPPET, payload: snipId });
    })
    .catch((err) => console.log(err));
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
