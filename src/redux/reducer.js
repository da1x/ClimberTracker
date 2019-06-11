import { combineReducers } from "redux";

//Import actions
import {
  LOG_IN_SENT,
  LOG_IN_SUCCESS,
  LOG_IN_FAILED,
  ADD_BOULDER_ROUTE,
  FETCH_FIREBASE_DATA
} from "./actions";

const merge = (prev, next) => Object.assign({}, prev, next);

const boulderReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_BOULDER_ROUTE:
      console.log("1");
      return [...state, action.payload];
    // case FETCH_FIREBASE_DATA:
    //   console.log(action.payload);
    //   return [...state, action.payload];
    default:
      console.log("2");
      return state;
  }
};

const fetchFirebaseDateReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FIREBASE_DATA:
      console.log("3");
      return action.payload;
    default:
      console.log("4");
      return state;
  }
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_IN_SENT:
      // return state when sent
      break;
    case LOG_IN_SUCCESS:
      // return state when success and token
      break;
    case LOG_IN_FAILED:
      //return state when failed and error message
      break;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  boulderList: boulderReducer,
  fetchFirebaseDate: fetchFirebaseDateReducer
});

export default rootReducer;
