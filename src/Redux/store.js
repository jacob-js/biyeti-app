import { combineReducers, createStore } from "redux";
import reducers from "./reducers";
import initialStates from "./states";

const store = createStore(combineReducers(reducers), initialStates);

export default store;