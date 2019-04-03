import { combineReducers } from "redux";

import authReducer from './authReducer'

import errorReducer from './errorReducer'
import navReducer from "./navReducer";
import profileReducer from "./profileReducer";

export default combineReducers({
    auth : authReducer,
    errors : errorReducer,
    nav: navReducer,
    userProfile: profileReducer
});
