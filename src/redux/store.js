import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";

//Setting up my redux store for global app state managment
const startingState = {};
const middleware = [thunk];

//Holds reducers linked in the imports above
const reducersState = combineReducers({
  user: userReducer,
  data: dataReducer,
  UI: uiReducer,
});

const store = createStore(
  reducersState,
  startingState,
  compose(applyMiddleware(...middleware))
);

export default store;
