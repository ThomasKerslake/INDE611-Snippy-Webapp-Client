import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LOADING_USER,
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
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state; //Retuern the state (initalState)
  }
}
