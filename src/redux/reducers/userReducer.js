import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  userAuthenticated: false,
  credentials: {},
  likes: [],
  notifications: [],
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
        ...action.payload, //spread info from payload to initalstate
      };
    default:
      return state; //Retuern the state (initalState)
  }
}
