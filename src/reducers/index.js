import { combineReducers } from "redux";

import application from "./application";
import admin from "./admin";

export default combineReducers({
  application,
  admin
});
