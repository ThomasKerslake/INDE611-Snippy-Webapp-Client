import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  LIKE_SNIPPET,
  UNLIKE_SNIPPET,
} from "../types";

const initialState = {
  userAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
  loading: false,
};

export default function (state = initialState, action) {
  //types taken from type.js
  switch (action.type) {
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        userAuthenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        userAuthenticated: true,
        loading: false,
        ...action.payload, //spread info from payload to initalstate
      };
    case LIKE_SNIPPET:
      return {
        ...state,
        likes: [
          //spread likes
          ...state.likes,
          {
            userHandle: state.credentials.userName,
            snipId: action.payload.snipId,
          },
        ],
      };
    case UNLIKE_SNIPPET:
      return {
        //get likes, filter & match by incoming payload.snipId to get corresponding stored like
        ...state,
        likes: state.likes.filter(
          (userLike) => userLike.snipId !== action.payload.snipId
        ),
      };
    default:
      return state; //Retuern the state (initalState)
  }
}
