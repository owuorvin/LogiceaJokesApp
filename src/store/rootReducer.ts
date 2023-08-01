import { combineReducers } from "@reduxjs/toolkit";
import Home from "../Sections/home-logic/homeSlice";
// import login from "../services/auth/auth-logic/login-logic";
// import subscription from "../services/subscription/subscription-logic/subscriptionSlice";
/**
 * @description Aggregate all reducers into a root reducer
 */
const rootReducer = combineReducers({
    Home
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
