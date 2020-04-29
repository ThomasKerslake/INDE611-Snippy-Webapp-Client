import { CLEAR_ERRORS, SET_ERRORS, LOADING_UI } from "../types";

//User interface inital state
const initialState = {
  loading: false,
  errors: null,
};

//Used to check and show errors / loading across the application
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: null,
      };
    default:
      return state;
  }
}
