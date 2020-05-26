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

//This is essentially for checking if there is the redux dev tools extension
const constructEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//Without this, if you try to view the app without the redux dev tools it will run into an error -> not show app
const getEnhancer = constructEnhancers(applyMiddleware(...middleware));

const store = createStore(reducersState, startingState, getEnhancer);

export default store;
