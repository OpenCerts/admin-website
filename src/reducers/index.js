import { combineReducers } from "redux";

import application from "./application";
import admin from "./admin";
import api from "./api";

export default combineReducers({
  application,
  admin,
  api
});
