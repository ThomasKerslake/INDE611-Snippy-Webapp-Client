import {
  POST_SNIPPET,
  POST_SNIPPET_COMMENT,
  SET_SNIPPETS,
  SET_SNIPPET,
  DELETE_SNIPPET,
  LIKE_SNIPPET,
  UNLIKE_SNIPPET,
  LOADING_DATA,
} from "../types";

const startingState = {
  snippets: [],
  snippet: {},
  loading: false,
};

export default function (state = startingState, action) {
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
    case SET_SNIPPET:
      return {
        ...state,
        snippet: action.payload,
      };
    case POST_SNIPPET:
      //Within the snippets array add the new post first (action.payload)
      //Then spread the rest of the snippets after so the newest posts are always first
      return {
        ...state,
        snippets: [action.payload, ...state.snippets],
      };

    case POST_SNIPPET_COMMENT:
      return {
        ...state,
        //when a user opens a snippet dialog window (comment window) spread the snippet
        //in the comments array pertaining to snippet -> add new comment (action.payload)
        // -> spread rest of original comments within the array after new comment
        snippet: {
          ...state.snippet,
          comments: [action.payload, ...state.snippet.comments],
        },
      };
    case DELETE_SNIPPET:
      index = state.snippets.findIndex(
        (userSnippet) => userSnippet.snipId === action.payload
      );
      //remove instance of snippet from array with splice
      state.snippets.splice(index, 1);
      return {
        ...state,
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
