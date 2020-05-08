import {
  SET_SNIPPETS,
  LIKE_SNIPPET,
  UNLIKE_SNIPPET,
  LOADING_DATA,
} from "../types";

const initialState = {
  snippets: [],
  snippet: {},
  loading: false,
};

export default function (state = initialState, action) {
  //types taken from type.js
  let index;
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SNIPPETS:
      return {
        ...state,
        snippets: action.payload,
        loading: false,
      };
    case LIKE_SNIPPET:
      //Getting the snippet we got back from liking and setting to index
      index = state.snippets.findIndex(
        (snippet) => snippet.snipId === action.payload.snipId
      );
      state.snippets[index] = action.payload;
      return {
        ...state,
      };
    case UNLIKE_SNIPPET:
      index = state.snippets.findIndex(
        (snippet) => snippet.snipId === action.payload.snipId
      );
      state.snippets[index] = action.payload;
      return {
        ...state,
      };
    default:
      return state; //Retuern the state (initalState)
  }
}
