import { createStore, combineReducers } from "redux";

// Reducers
import token from "./reducers/token";

export default createStore(combineReducers({ token }));
