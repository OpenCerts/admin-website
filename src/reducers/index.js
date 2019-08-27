import { combineReducers } from "redux";

import application from "./application";
import admin from "./admin";
import revoke from "./revoke";

export default combineReducers({
  application,
  admin,
  revoke
});
